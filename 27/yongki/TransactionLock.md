# 트랜잭션 락

- [트랜잭션 락](#트랜잭션-락)
  - [DBMS의 락](#dbms의-락)
    - [락을 수동으로 거냐 vs 자동으로 거냐](#락을-수동으로-거냐-vs-자동으로-거냐)
    - [Shared Lock vs Exclusive Lock](#shared-lock-vs-exclusive-lock)
    - [잠금 비용 & 동시성 비용](#잠금-비용--동시성-비용)
  - [InnoDB엔진의 락과 트랜잭션 격리 수준의 연관성](#innodb엔진의-락과-트랜잭션-격리-수준의-연관성)
    - [Record lock과 READ COMMITTED](#record-lock과-read-committed)
    - [Gap lock과 REPEATABLE READ](#gap-lock과-repeatable-read)
    - [Dead lock과 SERIALIZABLE](#dead-lock과-serializable)
  - [참고 문헌](#참고-문헌)

## DBMS의 락

> 지난 스터디때 등장했던 mutex는 POSIX 환경에서 락을 의미해 동의어라고 생각한다.
>
>     스레드간에 상호 배제(mutual exclustion) 기능을 하기 때문

락은 일종의 변수다.

```c
lock_t mutex;

lock(&mutex);
share += 1;
unlock(&mutex);
```

락 변수는 락의 상태를 나타낸다.

    a. 어떤 스레드도 락을 소유하고 있지 않아 사용 가능한 상태

    b. 정확히 하나의 스레드가 락을 획득한 상태이다.

락은 트랜잭션이 커밋되거나 롤백될때 함께 unlock 된다.

### 락을 수동으로 거냐 vs 자동으로 거냐

일반적으로 스레드는 프로그래머가 생성하고 운영체제가 제어하는데, 

스레드에 대한 제어권을 락을 통해 일부 프로그래머가 가질 수 있는 것이다.

    프로그래머는 락을 통해 프로세스들의 혼란스런 실행 순서에 어느 정도 질서를 부여할 수 있다.

이렇듯 락을 쿼리마다 사용자가 수동적으로 걸어 줄 수도 있지만

일반적으로 트랜잭션 격리 수준에 따라 락을 DBMS가 자동으로 걸어준다.

후자를 다뤄보겠다.

### Shared Lock vs Exclusive Lock

InnoDB엔진은 락 타입을 나누어 사용한다.

    Shared lock은 검색에서 경쟁에서 자유롭게 하고

    Exclusive lock은 갱신에서 경쟁을 제한하고자 하기 때문이다.

다음은 락 타입별 경쟁 여부 관계이다.

|                | Shared lock | Exclusive lock |
|:--------------:|:-----------:|:--------------:|
|   Shared lock  |      O      |        X       |
| Exclusive lock |      X      |        X       |

여기서 Shared lock이 걸린 상태에서 Exclusive lock이 접근하지 못하는 것이

레코드에 Shared Lock을 거는 것과 아무것도 걸지 않은 것의 차이이다.

### 잠금 비용 & 동시성 비용

락을 걸어야할 페이지가 많다면, 그럴바에 테이블 전체에 락을 걸어 한번에 처리하여 

    잠금 비용이 낮아져 효율적이다.

반면에, 락의 범위가 넓어질수록 동시에 접근할 수 없는 자원이 많아지므로 

    동시성 측면에서 비효율적이다.

## InnoDB엔진의 락과 트랜잭션 격리 수준의 연관성

c1컬럼이 있는 t테이블에는 `t.c1 = 13`인 레코드와 `t.c1 = 17`인 레코드가 존재한다.

```sql
(Transaction A)
(1) SELECT c1 FROM t WHERE c1 BETWEEN 10 and 20 FOR UPDATE;
(2) SELECT c1 FROM t WHERE c1 BETWEEN 10 and 20 FOR UPDATE;
(3) COMMIT;
```

```sql
(Transaction B)
(1) INSERT INTO t VALUES(15);
(2) COMMIT;
```

### Record lock과 READ COMMITTED    

두 트랜잭션이 다음과 같은 순서가 실행됬다면

```sql
(Transaction A, B - READ COMMITTED)

(A-1) SELECT c1 FROM t WHERE c1 BETWEEN 10 and 20 FOR UPDATE;  -- 13, 17 (lock with 13, 17)
(B-1) INSERT INTO t VALUES(15);                                -- no lock wait
(B-2) COMMIT;
(A-2) SELECT c1 FROM t WHERE c1 BETWEEN 10 and 20 FOR UPDATE;  -- 13, 15, 17 (phantom read)
(A-3) COMMIT;
```

### Gap lock과 REPEATABLE READ

두 트랜잭션이 다음과 같은 순서가 실행됬다면

```sql
(Transaction A, B - REPEATABLE READ)

(A-1) SELECT c1 FROM t WHERE c1 BETWEEN 10 and 20 FOR UPDATE;  -- 13, 17 (lock with 10 - 20)
(B-1) INSERT INTO t VALUES(15);                                -- lock wait
(B-2) COMMIT;
(A-2) SELECT c1 FROM t WHERE c1 BETWEEN 10 and 20 FOR UPDATE;  -- 13, 17
(A-3) COMMIT;

                                                               -- (B-1) query execute
```    

지난 스터디때 InnoDB의 REPETABLE READ는 phantom read가 걸리지 않는 이유이다.

### Dead lock과 SERIALIZABLE

데드락에 걸림으로써 레코드를 안전하게 보호할 수 있다.

```sql
(Transaction A)
(1) SELECT COUNT(c1) FROM t WHERE c1 = 'xyz';                       
(2) DELETE FROM t WHERE c1 = 'xyz';
(3) COMMIT;
```

```sql
(Transaction B)
(1) INSERT INTO t(c1, c2) VALUES('xyz', 1), ('xyz', 2), ('xyz', 3);
(2) COMMIT;
```

```sql
(Transaction A, B - READ COMMITTED)

(A-1) SELECT COUNT(c1) FROM t WHERE c1 = 'xyz';                       -- 0 
(B-1) INSERT INTO t(c1, c2) VALUES('xyz', 1), ('xyz', 2), ('xyz', 3); 
(B-2) COMMIT;
(A-2) DELETE FROM t WHERE c1 = 'xyz';                                 -- 3 rows deleted
(A-3) COMMIT;
```

```sql
(Transaction A, B - SERIALIZABLE)

(A-1) SELECT COUNT(c1) FROM t WHERE c1 = 'xyz';                       -- 0 (0 record is s lock)
(B-1) INSERT INTO t(c1, c2) VALUES('xyz', 1), ('xyz', 2), ('xyz', 3);
(B-2) COMMIT;
(A-2) DELETE FROM t WHERE c1 = 'xyz';                                 -- 1 rows deleted
(A-3) COMMIT;
```

<hr/>

## 참고 문헌

[잠금 비용 & 동시성 비용](https://jeong-pro.tistory.com/94) ━ *Tistory*

[Lock으로 이해하는 Transaction의 Isolation Level](https://suhwan.dev/2019/06/09/transaction-isolation-level-and-lock/) ━ *Taes-k DevLog*
