# 트랜잭션과 무결성·무정지성

- [트랜잭션과 무결성·무정지성](#트랜잭션과-무결성무정지성)
  - [개요](#개요)
    - [사용 이유](#사용-이유)
    - [ACID 특성](#acid-특성)
  - [트랜잭션 격리수준](#트랜잭션-격리수준)
  - [MySQL의 트랜잭션과 locking](#mysql의-트랜잭션과-locking)
  - [참고 문헌](#참고-문헌)

## 개요

<center>
<img width="40%" src="assets/rollback&commit.png"/>
</center>

트랜잭션은 Script 이다.ㅎ

    즉, 절차적이란 말이고 Script 내에 1 → 2 → 3 각 단위가 절차적으로 수행된다.

### 사용 이유

데이터 부정합을 방지하고자 사용한다.

    즉, 원자성(Atomicity: All or Nothing)을 유지하기 위해

    트랜잭션 내의 모든 단위는 수행이 모두 성공적이거나, 반대로 모두 실패해야한다.

롤백(Rollback)은

    단위 중에 장애가 발생한 경우, 트랜잭션의 첫 단위로 돌아오는 것을 말한다.

커밋(Commit)은

    트랜잭션 내 모든단위가 성공적이면 디스크에 반영하는 것을 말한다.

### ACID 특성

 **Atomicity 보장**

    트랜잭션에 의해 변경된 내용은 잠시 메모리에 유지하는데 

    트랜잭션에 오류가 발생하면 메모리를 날려버림으로써 이전 커밋된 디스크에는 간섭하지 않는다.

**Consistency 보장**

    트랜잭션 수행 전, 후에 데이터 모델의 제약 조건을 만족하는 것을 보장한다.

    cf. 칼럼 타입을 바꾼다고 하였을 때 이를 참조하는 테이블도 변경이 되어야한다.

**Isolation 보장**

<table>
    <tr>
        <td>
<p>

    성능을 위해 병렬로 처리할 수 밖에 없는 상황에서 
    
    여러 트랜잭션이 공통된 데이터를 조작할 때 locking으로 보장한다.
</p>
        </td>
        <td align="center">        
            <img width="60%" src="assets/transaction-isolation-example.jpg"/>
        </td>
    </tr>
</table>

locking 이란

    데이터를 읽거나 쓸때는 문을 잠궈서 다른 트랜잭션이 접근하지 못하도록한다.

    조작을 마치면 unlock을 통해 다른 트랜잭션이 접근할 수 있도록 허용한다.

> 트랜잭션 격리 수준에서 첨언해서 기술하겠다.

**Durability 보장**

    성공적인 트랜잭션은 커밋을 통해 영속성을 보장받는다.

## 트랜잭션 격리수준

트랜잭션에서는

    데이터를 쓸 때는 exclusive_lock을 통해 locking 그대로 동작하며

    데이터를 읽을 때는 shared_lock을 통해 여러 트랜잭션이 접근할 수 있도록 한다.

lock과 unlock을 잘못 사용하여 deadlock 상태에 빠지지 않도록 주의해야한다.

트랜잭션 격리수준은

    동시에 여러 트랜잭션이 처리될 때

    T1이 T2에서 변경하거나 조회하는 데이터를 볼 수 있도록 허용하는 정도를 결정함을 말한다.

**READ UNCOMMITTED**

    메모리에 있는 T1으로 인해 변경된 내용을 
    
    커밋과 롤백 여부에 상관 없이 T2에서 읽을 수 있다. (Dirty Read)

**READ COMMITTED**

    메모리에 있는 T1으로 인해 변경된 내용을 T2에서 읽지 않고

    디스크에 있는 이전 커밋된 내용을 읽는다.
    
장점은

    Dirty Read가 없지만

단점으로는

    하나의 트랜잭션 내에서 똑같은 SELECT 쿼리에 대해 같은 결과를 가져올 수 없다.

    🤔 23주차 스터디때 이 부분을 Phantom Read라고 기술하였다. 정확한 정의 필요

**REPEATABLE READ (MVCC: Multi Version Concurrency Control)**

> 🤔 추가 교재로 첨언 필요

MySQL에서 사용하는 방식으로

    트랜잭션마다 트랜잭션 ID를 부여하여 현 ID보다 작은 ID에서 변경한 것만 읽게 한다.

단점으로

    Phantom Read가 발생한다.    

    이를 방지하기 위해 쓰기 locking이 필요하다.

## MySQL의 트랜잭션과 locking

    ...

<hr/>

## 참고 문헌

[트랜잭션 개요](https://www.youtube.com/watch?v=7yuGlqPo8XQ&list=PLXvgR_grOs1DEoZFABFCjo7dsXt1BhVih&index=6) ━ *Youtube 「널널한 개발자」*

[트랜잭션 개요](https://victorydntmd.tistory.com/129?category=687930) ━ *Tistory 「victolee」*

[트랜잭션 격리수준](https://nesoy.github.io/articles/2019-05/Database-Transaction-isolation) ━ *「Nesoy 블로그」*