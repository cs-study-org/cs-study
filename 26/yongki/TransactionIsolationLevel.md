# [트랜잭션 격리수준](https://slides.com/kimyongki/deck-221254/fullscreen)

- [트랜잭션 격리수준](#트랜잭션-격리수준)
  - [본문](#본문)
  - [REDO vs UNDO vs 바이너리 로그](#redo-vs-undo-vs-바이너리-로그)
    - [REDO 로그](#redo-로그)
    - [UNDO 로그](#undo-로그)
    - [바이너리 로그](#바이너리-로그)
  - [참고 문헌](#참고-문헌)

## 본문

`MySQL5.5(InnoDB)`에는 격리 수준을 `MVCC(Multi Version Concurrency Control)`로 구현하였다.

    locking을 사용하지 않아, 지속된 작업이 가능하게 한다.

    하나의 레코드에 대해 2개의 버전이 디스크와 메모리(Undo 로그)에 유지되고, 격리 수준에 따라 달라진다.

소개하는 순서대로 `격리 수준`이 높아지며, 그만큼 `동시 처리 성능`도 떨어진다.

|                  | DIRTY READ | NON-REPEATABLE READ |    PHANTOM READ    |
| :--------------: | :--------: | :-----------------: | :----------------: |
| READ UNCOMMITTED |    발생    |        발생         |        발생        |
|  READ COMMITTED  |     X      |        발생         |        발생        |
| REPEATABLE READ  |     X      |          X          | 발생<br>(InnoDB X) |
|   SERIALIZABLE   |     X      |          X          |         X          |

<table>
    <tr>
        <th>DIRTY READ</th>
        <th>PHANTOM READ</th>
    </tr>
    <tr>
        <td>
            <img src="assets/dirty-read.png">
        </td>
        <td>
            <img src="assets/phantom-read.png">
        </td>
    </tr>
    <tr>
        <td>
<p>

    롤백 이전에 데이터를 조회하는 경우이다.

    즉, 진행중인 데이터를 의미하며 

    재개된 트랜잭션이 커밋되어 온전해질수도, 

    커밋되지 않아 온전해지지 않을 수도 있다.
</p>
        </td>
        <td>
<p>

    트랜잭션 동안 조회한 레코드가 변하지는 않지만

    다른 레코드가 추가되거나 삭제될 수 있다.
</p>
        </td>
    </tr>
</table>

**READ UNCOMMITTED**

    T1으로 인해 변경된 내용을 커밋과 롤백 여부에 상관 없이 T2에서 읽을 수 있다.

1. 사용자 A는 Lara를 INSERT 한다.
2. 사용자 A의 변경된 내용을 커밋하기 이전에, 사용자 B는 SELECT 하고 있다.
3. 사용자 B는 사용자 A의 커밋되지 않은 상태의 테이블에 SELECT가 가능하다.
4. 사용자 A가 롤백을 한다면, 사용자 B는 여전히 Lara를 정상적인 데이터라고 생각한다.

**READ COMMITTED**

    T1으로 변경된 내용을 커밋되기 전까지 T2에서 조회할 수 없다.

1. 사용자 A는 Lara를 Toto로 변경하였다.
2. Toto는 디스크에 즉시 기록되고, Lara는 Undo 로그로 백업된다.
3. 사용자 A가 커밋되기 이전에, 사용자 B의 SELECT는 Lara로 조회된다.
4. 커밋 이후는 사용자 B의 SELECT는 Toto로 조회된다.

**REPEATABLE READ**

MySQL에서 사용하는 방식이다.

    트랜잭션마다 트랜잭션 ID를 부여하여 현 ID보다 작은 ID에서 변경한 것만 읽게 한다.   

## REDO vs UNDO vs 바이너리 로그

복구지점을 어떻게 식별하는가

> 지난 스터디 때 레플리카가 구성된 구조에서 온라인 백업이 가능하단걸 봤고,
> 
> 단일 서버로 구성된 구조에서 RAID로 온라인 백업이 가능한가에 대해 결론을 짓지 못했다.
> 
> RAID만 봤을시, 잘못된 데이터를 복제 해둘 수 있어 정상적인 복구는 할 수 없을 가능성이 있기 때문이다.

`MySQL5.5(InnoDB)`를 기준으로 가능함을 기술한다.

### REDO 로그

데이터베이스 내용 자체가 손상된 경우에 사용한다.

<div align="center">
<img width="60%" src="assets/recovery.jpg">
</div>

완료상태의 트랜잭션이 생기면, 그때마다 LSN(Log Sequence Number)이 증가한다.    

완료상태의 트랜잭션, LSN, 갱신 대상의 데이터 블록을 REDO 로그에 기록한다.

    REDO 로그 파일에는 최신 커밋 정보가, 

    데이터 파일에는 커밋이 반영되기 전 정보를 가진다.

장애 발생 시점 이후

    데이터 파일에 가장 오래된 LSN을 가진 데이터 블록부터 

    REDO 로그 파일의 완료상태의 트랜잭션을 순서대로 대응하여 디스크에 저장한다.    

### UNDO 로그

데이터베이스 내용 자체가 손상되지 않는다.

장애 발생 시점에 진행중이던 미완료상태의 트랜잭션이 단위이다.

미완료상태의 트랜잭션을 취소하여 이전 값으로 다시 돌아간다.

### 바이너리 로그

    ...

<hr/>

## 참고 문헌

[트랜잭션 격리수준](https://nesoy.github.io/articles/2019-05/Database-Transaction-isolation) ━ *「Nesoy 블로그」*

[REDO 로그 vs UNDO 로그](https://velog.io/@pk3669/Mysql-Redo-Undo-Log) ━ *velog*

[REDO 로그 vs UNDO 로그](https://www.topcit.or.kr/upload/edubox/essence/ess_ko_02/index.html) ━ *「TOPCIT 2영역: Ch12. 데이터베이스 복구」*

[REDO 로그 vs 바이너리 로그](http://jongguheo.blogspot.com/2019/10/binary-log-redo-log.html) ━ *Blogger*