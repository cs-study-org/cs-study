# 트랜잭션 락

- [트랜잭션 락](#트랜잭션-락)
  - [DBMS의 락](#dbms의-락)
    - [수동 vs 자동](#수동-vs-자동)
    - [Shared Lock vs Exclusive Lock](#shared-lock-vs-exclusive-lock)
    - [잠금 비용 & 동시성 비용](#잠금-비용--동시성-비용)
  - [InnoDB엔진의 레코드 락](#innodb엔진의-레코드-락)
    - [인덱스 레코드에 락이 걸리는 이유](#인덱스-레코드에-락이-걸리는-이유)
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

### 수동 vs 자동

일반적으로 스레드는 프로그래머가 생성하고 운영체제가 제어하는데, 

스레드에 대한 제어권을 락을 통해 일부 프로그래머가 가질 수 있는 것이다.

프로그래머는 락을 통해 프로세스들의 혼란스런 실행 순서에 어느 정도를 질서를 부여할 수 있다.

이렇듯 락을 쿼리마다 사용자가 명시적으로 걸어 줄 수도 있지만

일반적으로 트랜잭션 격리 수준에 따라 락을 DBMS가 걸어준다.

### Shared Lock vs Exclusive Lock

락 타입을 나누어 사용한다.

    검색에서는 경쟁에서 자유롭게 하고

    갱신에서는 경쟁을 제한하고자 하기 때문이다.

다음은 락 타입별 경쟁 여부 관계이다.

|                | Shared Lock | Exclusive Lock |
|:--------------:|:-----------:|:--------------:|
|   Shared Lock  |      O      |        X       |
| Exclusive Lock |      X      |        X       |

> 🤔 Shared Lock을 거는 것과 걸지 않은 것의 차이

### 잠금 비용 & 동시성 비용

락을 걸어야할 페이지가 많다면, 그럴바에 테이블 전체에 락을 걸어버리는 편이 한번에 처리하여 잠금 비용이 낮아져 효율적이다.

반면에 락의 범위가 넓어질수록 동시에 접근할 수 없는 자원이 많아지므로 동시성 비용이 높아져 비효율적이다.

## InnoDB엔진의 레코드 락

InnoDB엔진은 레코드 락으로 뛰어난 동시성 처리를 제공한다.

레코드 락은 인덱스 레코드에 걸리는 락을 말한다.

### 인덱스 레코드에 락이 걸리는 이유

결국 갱신 또한 검색 이후 이뤄지기 때문에 검색 성능의 영향을 받는다고 생각한다.

인덱스 레코드는 일반 레코드에 락이 걸리는 것보다 현저히 적은 레코드에 락이 걸린다.

먼저 인덱스가 걸린 레코드에 락이 걸리는 상황이다.

23개의 레코드를 갱신할 것이다.

```sql
SELECT * FROM employees WHERE first_name="Mary" AND YEAR(hire_date) = 1990;
```

다음과 같이 현재 날짜로 고용 날짜를 갱신하면 450 레코드가 락이 걸린다.

```sql
SET SESSION AUTOCOMMIT=OFF;

UPDATE employees SET hire_date=DATE_FORMAT(NOW(), '%Y-%m-%d') WHERE first_name="Mary" AND YEAR(hire_date) = 1990;

SELECT LOCK_MODE, COUNT(*) FROM performance_schema.data_locks WHERE OBJECT_NAME='employees' GROUP BY LOCK_MODE;
```

다른 세션에서 관련 레코드 한개라도 갱신하면 락 대기가 걸린다.

```bash
Query 1: Lock wait timeout exceeded; try restarting transaction
```

이제 인덱스를 제거하고 위 과정을 그대로 진행하였을 때 즉, 일반 레코드에 락이 걸리는 상황이다.

300911 레코드가 락이 걸린다.

즉, 테이블의 모든 레코드가 락이 걸린 것이다.

<hr/>

## 참고 문헌

[잠금 비용 & 동시성 비용](https://jeong-pro.tistory.com/94) ━ *Tistory*

[REPEATABLE READ에서 락 대기](https://hoing.io/archives/4713) ━ *Taes-k DevLog*