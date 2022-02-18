# 컴퓨터 시스템

## 목차
- 컴퓨터 시스템 구성
  - 컴퓨터 시스템 동작
    - 부트스트랩 프로그램(bootstrap program)
  - 저장장치 구조
  - 하드웨어 용어 정리(내 노트북에 비교설명)
  - 참고문헌

# 컴퓨터 시스템 구성
일반적으로 **하드웨어**(기본적인 계산에 필요한 자원을 제공), **운영체제**(사용자 시스템간의 인터페이스를 제공), **응용 프로그램**(사용자의 계산 문제를 시스템 자원을 통해 해결하기 위한 정의된 프로그램), 사용자로 나눌수 있다.

## 컴퓨터 시스템 동작(Computer-System Operation)
일반적인 현대의 컴퓨터 시스템은 공유 메모리의 접근을 지원하는 공용 버스(common bus)로 연결된 하나 이상의 프로세서(CPU)와 장치 제어기(Device Controls)들로 구성되어 있다.<br/> 프로세서와 장치 제어기들은 메모리 사이클을 얻기 위해 경쟁하면서 병행 실행 될 수 있다.
![컴퓨터 시스템 동작](asset/computer_system.PNG)

### 부트스트랩 프로그램(bootstrap program)
- 컴퓨터가 구동을 시작하기 위한 초기 프로그램
- 시스템 초기화
- 운영체제 로딩

부트스트랩이 완료되면 init와 같은 초기 프로세스를 실행한 후 시스템의 이벤트(interrupt)를 기다리는 상태가 된다. **하드웨어**는 시스템 버스를 통해 프로세서(CPU)로 신호를 보내 인터럽트를 발생 시킬 수 있으며 **소프트웨어**는 시스템 콜(System Call)을 통한 특별한 연산으로 인터럽트를 발생시킬 수 있다.

## 저장장치 구조
프로세서(CPU)는 **주기억장치(RAM)**을 통해서만 명령을 읽어들일 수 있으며, 실행 하려고하는 모든 프로그램은 반드시 메모리로 저장되어야 한다. 메모리는 워드(4byte)의 배열을 제공하며, 각 워드는 고유의 주소를 가진다.<br/>
기억장치 연산이 실행될 때 **Load는 RAM -> CPU Register** 이며, **Store은 CPU Register -> RAM**이 된다.<br/>

Q : 프로그램과 데이터들이 RAM에 저장되지 못하는 이유<br/>
A : RAM은 데이터를 저장할 수 있는 용량이 작다.<br/>
    RAM은 전원이 끊어지면 내용이 사라지는 **휘발성 메모리**이다.


## 하드웨어 용어 정리(내 노트북에 비교설명)
전에 페이스북을 하다가 컴퓨터 부품에 대한 쉬운 이해가 있어서 추가 하였다.<br/>
**노예로 비유해보는 컴퓨터의 성능**<br/>

- 코어의 수 = 니가 부릴 노예의 수
- 쓰레드  = 니가 부릴 노예의 손 갯수
- 오버클럭 = 노예가 발까지 써서 최대로 일할수 정도
- 캐쉬 메모리 = 노예가 짊어지고 있는 백팩
- 램 = 노예가 준비한 리어카
- 하드 디스크 = 수확한 옥수수의 저장창고
- 그래픽 카드 = gpu = 옥수수 말고 다른거 시킬 노예 = 옥수수는 잘못케는데 감자는 존나 잘캠
- 파워 = 노예에게 주는 월급
- ssd = 최신식 좋은 저장창고

![내 cpu 사양](asset/my_cpu.PNG)
![내 노트북 사양](asset/my_notebook.PNG)


내 노트북으로 계산을 해보면 16개의 손가락을 가지고 있는 8명의 노예이 있고 이 노예는 최대 4.2GHz까지 일할 수 있고 8MB짜리 백팩을 지고 있고 500GB자리 최신식 저장창고를 두개 가지고 있음


## 참고문헌
[컴퓨터 시스템 참고문헌](https://luckyyowu.tistory.com/128?category=751813)

[노예 비유 출처](https://blog.nachal.com/1567)