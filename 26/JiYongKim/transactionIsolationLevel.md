# 트랜잭션 격리 수준 & log 비교 (Redo, Undo, Binary)

- 트랜잭션 격리수준
- REDO 로그, UNDO 로그, 바이너리 로그 비교

<br>

* * *

<br>

## 트랜잭션

트랜잭션은 **데이터의 정합성을 보장**하기 위한 기능이다.

트랜잭션은 꼭 여러 개의 변경 작업을 수행하는 쿼리가 조합됐을때만 의미있는 개념은 아니며 트랜잭션은 논리적인 작업 셋 자체가 **100% 적용되거나(COMMIT)** 또는 **아무것도 적용되지 않아야 함(ROLLBACK)**을 보장해주는 것입니다.

<br>

## 트랜잭션의 특징

이러한 트랜잭션은 **ACID**라 하는 **원자성(Atomicity), 일관성(Consistency), 격리성(Isolation), 지속성(Durability)**을 보장해야 합니다. ACID에 대한 설명은 다음과 같다.

- **원자성(Atomicity)**: 트랜잭션 내에서 실행한 작업들은 **마치 하나의 작업**인 것처럼 **모두 성공하거나 혹은 모두 실패**해야 한다.

<br>

- **일관성(Consistency)**: 모든 트랜잭션은 **일관성있는 데이터베이스 상태를 유지**해야 합니다. 예를 들면 데이터베이스에서 정한 무결성 제약 조건을 항상 만족해야 한다.

<br>

- **격리성(Isolation)**: 동시에 실행되는 트랜잭션들이 **서로에게 영향을 미치지 않도록 격리**해야 합니다. 예를 들면 동시에 같은 데이터를 수정하지 못하도록 해야 합니다. 격리성은 동시성과 관련된 성능 이슈로 인해 **격리 수준**을 선택할 수 있다.

<br>

- **지속성(Durability)**: 트랜잭션을 성공적으로 끝내면 **그 결과가 항상 기록**되어야 합니다. 중간에 시스템에 문제가 발생하더라도 데이터베이스 로그 등을 사용해서 성공한 트랜잭션 내용을 복구해야 한다.

<br>

>⇒ 트랜잭션은 원자성, 일관성, 지속성을 보장하는데 문제는 **격리성**입니다.

>⇒ 트랜잭션간에 격리성을 완벽히 보장하려면 동시에 처리되는 트랜잭션을 거의 차례대로 실행을 해야한다.

>⇒ 하지만 이렇게 처리를 하면 처리 성능이 매우 나빠지게 되며. 이러한 문제로 인해 ANSI 표준은 트랜잭션의 격리 수준을 4단계로 나누어 정의하고 있다.

<br>

## 트랜잭션에서 발생할 수 있는 문제들

**< Dirty Read >**

<img width="675" alt="스크린샷 2022-07-06 오후 11 03 16" src="https://user-images.githubusercontent.com/81874493/177568978-18554887-f1ac-4b97-a75a-00f1f87c54d2.png">

**Dirty Read는 다른 트랜잭션에 의해 수정됐지만 아직 커밋되지 않은 데이터를 읽는 것**을 말합니다.

위의 그림에서

T1이 아직 commit 하지 않은 시점에서 T2가 데이터를 읽게되고

만약 T1이 롤백하게 되었을 경우 T2가 읽었던 데이터의 일관성이 깨지기 시작합니다.

<br>

**< Non-Repeatable Read >**

<img width="705" alt="스크린샷 2022-07-06 오후 11 03 24" src="https://user-images.githubusercontent.com/81874493/177569010-17032509-362c-4375-a24b-d332951fe740.png">

**Non-Repeatable Read는 한 트랜잭션 내에서 같은 Key를 가진 Row를 두 번 읽었는데 그 사이에 값이 변경되거나 삭제되어 결과가 다르게 나타나는 현상**을 말한다.

<br>

**< Phantom Read >**

<img width="708" alt="스크린샷 2022-07-06 오후 11 03 30" src="https://user-images.githubusercontent.com/81874493/177569030-a429c90f-3b66-41e0-be0c-4adf04b467b7.png">

Phantom Read는**한 트랜잭션 내에서 같은 쿼리를 두 번 수행했는데, 첫 번째 쿼리에서 없던 유령(Phantom) 레코드가 두 번째 쿼리에서 나타나는 현상**을 말한다.

<br>

## **트랜잭션의 격리 수준(Isolation level)** 이란?

 동시에 여러 트랜잭션이 처리될 때, 특정 트랜잭션이 다른 트랜잭션에서 변경하거나 조회하는 데이터를 볼 수 있도록 허용할지 말지를 결정하는 것

격리 수준은 다음과 같이 4가지로 정의할 수 있다.

<br>

<details>
<summary>READ UNCOMMITTED(커밋되지 않은 읽기)<summary>

- **READ UNCOMMITTED(커밋되지 않은 읽기)**
    
    <img width="514" alt="스크린샷 2022-07-06 오후 11 03 40" src="https://user-images.githubusercontent.com/81874493/177569073-faaf14bc-cc5c-483c-b50a-c1655298bbad.png">

    - 각 트랜잭션에서의 변경 내용이 `COMMIT`이나 `ROLLBACK` 여부에 상관 없이 다른 트랜잭션에서 값을 읽을 수 있다.
    - 정합성에 문제가 많은 격리 수준이기 때문에 사용하지 않는 것을 권장한다.
    - 위의 그림과 같이 `Commit`이 되지 않는 상태지만 `Update`된 값을 다른 트랜잭션에서 읽을 수 있다.
    - `DIRTY READ`현상 발생

</details>

<br>

<details>
<summary>READ COMMITTED(커밋된 읽기)</summary>

- **READ COMMITTED(커밋된 읽기)**
    
    <img width="476" alt="스크린샷 2022-07-06 오후 11 03 48" src="https://user-images.githubusercontent.com/81874493/177569113-4d056ff2-bac5-4730-b8ae-d6c6cf80517f.png">

    READ COMMITTED는
    
    - 다른 트랜잭션에서 일어난 변경사항이 커밋되지 않았다면, 실제 테이블의 값을 가져오는 게 아니라 Undo 영역에 백업된 레코드에서 값을 가져오게 되는 격리수준 이다.
    - 즉, 커밋된 결과만 읽어오므로 Dirty Read가 발생하지 않는다.
    - 하지만 현재 트랜잭션이 아직 진행중인데 다른 트랜잭션이 커밋을 해버렸다면, 그 변경 결과가 트랜잭션 중에 반영되게 된다.
    - 즉, 한 트랜잭션 내에서 동일 쿼리문으로 동일 레코드를 두번 이상 조회했을 때, 상이한 결과를 얻을 수도 있다는 것이며 이러한 현상을 Non-repeatable Read라고 한다.
    - 또한 READ COMMITTED는 관계형 데이터베이스에서 대부분 기본적으로 사용되고 있는 격리 수준이다.

</details>

<br>

<details>
<summary>REPEATABLE READ(반복 가능한 읽기)</summary>

- **REPEATABLE READ(반복 가능한 읽기)**
    
    <img width="560" alt="스크린샷 2022-07-06 오후 11 03 57" src="https://user-images.githubusercontent.com/81874493/177569141-dccd4dcf-9826-4205-b4f0-61e35ac7cb75.png">

    - MySQL에서는 트랜잭션마다 트랜잭션 ID를 부여하여 트랜잭션 ID보다 작은 트랜잭션 번호에서 변경한 것만 읽게 된다.
    - Undo 공간에 백업해두고 실제 레코드 값을 변경한다.
        - 백업된 데이터는 불필요하다고 판단하는 시점에 주기적으로 삭제한다.
        - Undo에 백업된 레코드가 많아지면 MySQL 서버의 처리 성능이 떨어질 수 있다.
    - 이러한 변경방식은 MVCC(Multi Version Concurrency Control)라고 부른다.
    - PHANTOM READ가 발생
        - 다른 트랜잭션에서 수행한 변경 작업에 의해 레코드가 보였다가 안 보였다가 하는 현상
        - 이를 방지하기 위해서는 쓰기 잠금을 걸어야 한다.

</details>

<br>

<details>
<summary>SERIALIZABLE(직렬화 가능)</summary>

- **SERIALIZABLE(직렬화 가능)**
    - 가장 높은 수준의 격리 수준이다.
    - 레코드를 조회할 때 shared lock을 획득해야만 조회가 가능하다.
    - 레코드를 수정할 때 exclusive lock을 획득해야만 변경이 가능하다.
    - 한 트랜잭션에서 사용하는 데이터는 다른 트랜잭션에서 사용 불가능하다.
    - 격리 수준에 따른 문제는 발생하지 않지만 동시성이 저하되는 문제가 발생한다.
    - 가장 단순한 격리 수준이지만 가장 엄격한 격리 수준
    - 성능 측면에서는 동시 처리성능이 가장 낮다.
    - `SERIALIZABLE`에서는 `PHANTOM READ`가 발생하지 않는다.하지만.. 데이터베이스에서 거의 사용되지 않는다.

</details>

<br>

>⇒ 순서대로 **READ UNCOMMITTED의 격리 수준이 가장 낮고 SERIALIZABLE의 격리 수준이 가장 높다**.

<br>

* * *
<br>

## Undo Segment

**Undo Segment란?**

- Rollback과 Undo는 기본적으로는 동의어이다.
- Oracle 9i 이전엔 Rollback Segement라는 용어를 사용했는데, Oracle 9i 이후버전 부터는 Undo Segment라는 용어를 사용합니다.
- Rollback(Oracle 9i 이전 버전) = Undo(Oracle 9i 이후 버전)

<br>

**목적**

- **Undo Segments는**
    - **Transaction Rollback**
    - **읽기 일관성 유지(Read Consistency)**
    - **Transaction Recovery**
        
        >⇒ **를 위해 존재**
        
        <br>

- **Transaction Rollback란 Oracle 서버에서 Undo Segment에 저장된 값을 이용해서 원래의 값으로 복원하는 기능을 말합니다. Transaction Rollback이 실행되는 경우는 사용자가 Rollback command를 실행하거나, Transaction이 비정상 종료되어 PMON이 자동 Rollback 처리하는 경우**
- **읽기 일관성이란 Transaction이 진행되는 동안 Database의 다른 사용자는 이 Consistent Read에 의해 Commit되지 않은 변경 사항을 볼 수 없는 기능**
- **Transaction Recovery는 Transaction이 진행되는 동안 Instance가 실패한 경우 Database가 다시 열릴 때 Commit되지 않은 사항은 Rollback되어야 하는데 이때 Undo Segment정보가 사용**
- **Undo Segment의 변경사항은 리두로그 파일로 보호되므로 복구가 가능**

<br>

## Redo Log

- 리두 로그 버퍼는 데이터베이스에서 일어난 모든 변화를 저장하는 메모리 공간
- 리두 로그 버퍼에 저장된 리두 항목들은 LGWR에 의해 데이터베이스 복구에 사용되는 온라인 리두 로그 파일에 저장 된다.
- LOG_BUFFER 파라미터로 Redo Log Buffer의 크기를 결정 합니다.
- 리두 정보는 항상 실제 변경작업보다 먼저 보관되어야 어떤 상황에서도 복구가 가능해진다.
    
    >⇒ 따라서 트랜잭션을 수행하는(데이터베이스 블록에 변경을 가하는) 프로세스는 우선 자신의 메모리 영역 내에서 수행하고자 하는 작업에 대한 리두 레코드를 만들며, 이를 먼저 로그버퍼에 기록하고 난 후에 실제 버퍼블록에도 리두 레코드에 담긴 내용을 따라 적용하게 된다. 
    
    >⇒ 또한 같은 이유로 오라클은 변경된 버퍼 캐쉬 블록을 디스크에 기록하기 전에 먼저 관련된 로그버퍼를 로그파일에 기록하는 작업을 처리하게 된다.
    
    <br>

## Redo vs Undo

undo와 redo의 차이점은  **비슷하지만 전혀 다른 두가자의 개념이다.**

**기본적으로**

- **Redo는 re+do으 합성어 일듯하고  뜻풀이는 " 다시하다 "**
    
    >⇒ redo는 무언가를 다시하는것!
    
- **Undo는 un+do의 합성어 일듯하고 뜻풀이는 "원상태로 돌리다."**
    
    >⇒ undo는 무언가를 되돌리는것!
    
<br>

< **Redo는 오라클에서 무슨 역할을 하는가?** >

**기본적으로 복구의 역할을 하며, 오라클 서버에 무슨 작업을 하든지 모두 Redo Log에 기록이된다.**

<br>

< **undo는 오라클에서 무슨 역할을 하는가? >**

**작업 롤백, 읽기 일관성, 복구를 한다.**

undo 와 redo 둘의 공통점은 복구를 한다는것,

>⇒ **하지만 둘의 복구는 차이가 있다.**

<br>

**redo는 복구할때 사용자가 했던 작업을 그대로 다시 하지만**

**undo는 사용자가 했던 작업을 반대로한다.**

>⇒ 즉 사용자가 작업을 원상태로 돌린다.

<br>

< 예시 >

**예를 들어서 아래와같은 작업햇을때 세션이 비정상 종료가 되엇다고 가정**

update t1

set no = no+1

where id = 1;

**세션이 복구되는 과정에서  redo를 이용해서 아래의 작업을 한다**

update t1

set no = no+1

where id =1;

**하지만 만일 세션이 비정상 종료가 되기전에 commit하지않는다면**

**undo를 이용해서 아래와같은 작업을 이어서한다.**

update t1

**set no = no-1**

**where id = 1;**

이렇게 되면 마치 다시하지 않는것 처럼된다.

>⇒ **간단히 말하자면 복구와 되돌리기인 것**

<br>

undo                                    redo

되돌리기위한 변화                     재생하기 위한변화

**롤백, 읽기 일관성                      복구**

**언두 세그먼트                           리두로그파일**

**읽기 일관성을 보호                    데이터 손실을 방지**

<br>

## Binary Log

**바이너리 로그란?**

**정의** : MySQL 의 빈로그 혹은 바이너리 로그는 MySQL 서버 인스턴스의 데이터 변경사항들에 대한 정보를 포함하는 로그 파일의 세트이다.

>⇒ 여기에는 에러코드, 바이너리 로그 자체에 대한 메타데이터 등 다양한 데이터가 같이 포함 되어진다.

<br>

**사용 용도**

Binlog(Binary Log)는 데이터 변경 시, 변경 내역들을  저정해놓은 로그들로

- 특정 시점 데이터가 있다면, 그 이후부터 Binlog를 적용하여, 시점 복구시 사용된다.
- Replication 구성 시 데이터 동기화를 위한 목적으로도 사용된다.
