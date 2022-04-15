# Chapter6

<웹 서버에 도착하여 응답 데이터가 웹 브라우저로 돌아간다.>

## Story1 서버의 개요

### 1) 서버 애플리케이션의 구조

서버는 동시의 복수의 클라이언트와 통신 동작 실행한다

⇒ 하지만 하나의 프로그램으로 여러 클라이언트 처리는 쉽지 않다.

그렇기에 클라이언트 접속시 마다 새로운 서버 프로그램을 작동시켜 서버 애플리케이션와 클라이언트가 1대1 대화 방법을 선택하는 것이 일반적인 방식이다.

<서버 애플리케이션의 구조>

![스크린샷 2022-04-14 오후 4.46.55.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c50916db-3c8b-4b50-a73c-8ead26915baa/스크린샷_2022-04-14_오후_4.46.55.png)

1. 서버 프로그램 작동하여 설정 파일 읽기등의 초기화 동작 완료
2. 서버 애플리케이션의 접속을 기다리는 곳에서 소켓 작성하고 소켓을 클라이언트에서의 접속 동작을 기다리는 상태로 만들고 대기
3. 클라이언트 접속시 작동하여 클라이언트와 통신할 소켓을 건네주고 1:1 대화하고 끝나면 연결을 끊고 이부분을 종료한다.

<서버내의 프로그램들이 동시에 함께 동작되는 이유>

서버 OS는 

- 멀티태스크
    
    ⇒ os가 가지고 있는 기능으로 복수의 테스크(프로그램)을 동시에 함게 실행하는 기능을 의미
    
- 멀티 스레드
    
    ⇒ 프로그램내의 복수의 스레드를 동시에 함께 실행하는 기능을 의미
    

를 통해 다수의 프로그램을 동시에 작동할 수 있다.

### 2) 서버측의 소켓과 포트

<클라이언트 측의 Sokcet 라이브러리 호출 단계>

1) 소켓 생성 (소켓 작성 단계)

2) 서버측의 소켓과 파이프로 연결 (접속 단계)

3) 데이터 송 * 수신 (데이터 송수신 단계)

4) 파이프를 분리하고 소켓을 말소 (연결 끊기 단계)

<서버 측의 Socket 라이브러리 호출 단계>

1) 소켓 생성 (소켓 작성 단계)

2-1) 소켓을 접속 대기 상태로 만든다 (접속 대기 상태)

2-2) 접속을 접수한다 (접속 접수 단계)

3) 데이터 송수신 (데이터 송수신 단계)

4) 파이프를 분리하고 소켓을 말소 (연결 끊기 단계)

⇒ 위와 같이 Socket 라이브러리를 호출하는 부분은 서버와 클라이언트간 차이점이 존재한다.

⇒ 서버측의 구체적인 동작을 알아보자

<서버측의 동작 과정>

![스크린샷 2022-04-14 오후 5.16.20.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d4dcc1a8-1019-49b1-9e2e-b13c1b7c6deb/스크린샷_2022-04-14_오후_5.16.20.png)

1) 우선 서버 애플리케이션의 클라이언트의 접속을 기다리는 곳을 동작 시킨다.

2) 클라이언트와 연결할 소켓을 작성한다.

3) 소켓에 포트 번호와 디스크립터를 작성하여 소켓을 구성

4) Listen을 호출하여 클라이언트의 접속을 기다리는 상태로 만든다

5) 서버에서는 accept를 미리 호출하여 접속을 접수를 대기한다

⇒ 클라이언트의 접속 요청이 오지 않았지만 이전에 미리 accept를 호출하여 접속 접수 동작을 실행한다.

6) 클라이언트로부터 접속 요청이 들어올 경우

- 응답 패킷을 반송하여 접속 접수 동작 실행
- 접속 대기 소켓을 복사하여 새로운 소켓 생성
- 새로운 소켓에 접속 상대의 정보를 비롯 제어정보를 기록한다

⇒ 위 과정을 통해 접속을 접수

7) accept가 끝나면 접속을 접수하는 부분은 클라이언트와 대화하는 부분에게 제어권을 넘겨 가동시킨다.

8) 클라이언트와 대화하는 곳에서는 새로운 소켓을 이용한 파이프를 연결하여 서로 데이터 송수신 이후 종료한다.

<접속 동작시의 소켓과 새로운 소켓>

접속 동작할때의 소켓은 접속 대기 상태인 채로 계속 존재한다

⇒ 접속 접수 동작 후 대기상태의 소켓을 복사하여 접속 대상의 정보를 기록하여 사용한다.

<새로운 소켓을 만드는 이유?>

새 소켓을 만들지 않고 접속 대기 소켓에 그대로 접속시 접속 대기 소켓이 사라지기 때문에 다른 클라이언트가 접속할 수 가 없어진다.

⇒ 즉 접속 대기 소켓은 클라이언트들의 접속 받는 기능만 하는 소켓이면 접속시 새로운 소켓을 만들어 할당해주는 형식이다.

<새로운 소켓을 만들때의 포트 번호>

포트번호는 소켓 식별을 하기 위해 사용하는 것이다.

하지만 포트 번호는 소켓을 지정하기 위한 것이지만 같은 번호로 할당된 여러 소켓이 존재하여 포트 번호로 소켓을 지정할 수 없다는 문제가 있다

⇒ 이 문제를 위해 소켓을 지정할때 서버측의 소켓에 할당한 포트 번호 뿐 아니라 클라 측 포트번호와 Ip 주소를 통해 네가지 정보를 사용하여 구분한다.

- 클라이언트측의 IP
- 클라이언트 측의 포트 번호
- 서버측의 IP
- 서버측의 포트 번호

⇒ 소켓 식별시 이 네가지 정보를 사용하면 되지만 소켓을 만든 직후 아직 접속하지 않은 상태일때 상대측의 정보가 준비되어 있지 않을 수 있기 때문에

⇒ 접속 대기 소켓에 클라측의 정보가 기록되어있지 않을 수 있으며 한개의 정보로 식별하는 쪽이 간단하기 때문에 **디스크립터를 통해 소켓을 식별하여 사용한다.**

## Story2 서버의 수신동작

서버로부터의 패킷 수신 동작을 차례로 확인해 보자

1. Lan 어댑터 에서 수신 신호를 디지털 데이터로 변환한다.
    1. 패킷의 신호를 Lan 어댑터에서 수신하여 디지털 데이터로 변경한다.
    2. 변경 이후 패킷의 마지막 FCS를 통해 오류 유무를 검사한다.
        - 오류는 검사의 계산식에 따라 계산하고 FCS필드값과 비교하여 오류 유무를 판단
    3. 검사 이후 MAC주소를 조사하여 자신을 수신처로 보낸것인지 판단
    4. 이후 자신이 수신처일 경우 LAN어댑터의 내부의 버퍼 메모리에 저장한다.
    5. 저장 이후 인터럽트를 발생시켜 CPU에게 패킷 도착을 알린다.
    6. CPU는 LAN 드라이버로 실행을 전환하고 버퍼 메모리에서 수신 패킷을 추출한다
    7. 추출한 패킷의 MAC헤더의 타입 필드 값에 따라 프로토콜을 판별하고 프로토콜을 처리하는 소프트웨어를 호출하여 패킷을 건넨다.

1. IP 담당 부분이 패킷을 수신한다.
    1. 프로토콜 스택에 패킷이 전달되면 IP 담당 부분이 동작하여 IP 헤더를 검사한다.
    2. 수신처 IP가 자신인지 확인하고 패킷이 분할되었는지 확인한다 
        
        ⇒ 만약 패킷이 분할되어있다면 패킷 조각이 전부 도착할때까지 대기하고 전부 도착시 패킷을 복원하여 패킷을 검사한다.
        
    3. IP 담당 부분이 패킷 조사를 완료하면 다음 프로토콜을 조사하여 해당 담당 부분에 패킷을 건네준다.
    
2. TCP 담당 부분이 패킷을 수신한다.
    - 접속 단계의 패킷을 수신할 경우
        1. SYN =1 컨트롤 비트를 통해 접속을 접수하는 동작 실행전 수신처 포트번호를 조사하여 동일한 포트 번호가 할당된 소켓의 존재 여부를 확인
        2. 접속 대기 소켓을 복사하여 새 소켓을 만들고 상대측의 IP주소, 포트번호, 시퀀스 초기값 ,윈도우 값등의 필요 정보를 기록
        3. 송신 버퍼와 수신 버퍼로 사용하는 메모리 영역 확보
        4. 클라이언트에게 보내는 데이터에 관한 시퀀스 초기값, 수신 버퍼 용량, 윈도우 값 등을 기록한 TCP헤더를 작성하여 IP담당 부분에게 의뢰하여 클라이언트에게 반송한다.
        
    - 데이터 패킷을 수신할 경우
        1. 데이터 패킷이 도착한 경우 TC 담당 부분은 도착한 패킷이 어느 소켓에 해당되는지 확인
            - 송신처 IP주소, 수신처 IP주소 , 수신처 포트번호, 송신처 포트번호 4개의 정보를 통해 모드 합치되는 소켓을 확인
        2. 해당 소켓이 데이터를 잘 받고 있는지 즉 소켓을 통한 데이터 수신에 오류가 있는지 확인한다.
        3. 오류가 없을 시 수신 버퍼에 데이터를 저장하고 수신 확인 응답용 TCP 헤더를 만든다.
        4. 응답용 TCP 헤더를 구성한 후 IP 담당 부분에게 송신을 의뢰한다.
        
    
3. TCP 담당 부분의 연결 끊기
    1. TCP 프로토콜 규칙에 따르면 연결 끊기 동작은 클라와 서버중 어느 쪽이 먼저 실행해도 상관 없다.
    2. HTTP1.0 의 경우 서버에서 연결 끊기 동작을 시작한다.
    3. 이 경우 서버측에서 close를 호출하면 FIN = 1 컨트롤 비트를 설정하여 IP 담당 부분에게 의뢰한다.
        
        ⇒ 이후 클라이언트가 FIN=1로 한 헤더를 서버에게 보낸후 서버가 ACK 번호를 반송하면 연결 끊기 동작은 마무리 된다.
        
    4. 연결 끊기 동작이 끝나면 네트워크상 패킷이 소멸될 수 있는 시간을 기다린 후 소켓을 말소한다.

## 번외) HTTP

- HTTP
  
    <details>
    <summary>Http</summary>
    - HTTP
    
    ## HTTP
    
    HyperText Transfer Protocol
    
    ⇒ 문서간에  링크를 통해 연결할 수 있는 하이퍼텍스트 문서를 통해
    
    연결할 수 있는 HTML을 전송하는 프로토콜 ⇒ http의 시작
    
    ## 모든것이 HTTP
    
    지금은 모든것을 HTTP 메세지에 담아 전송한다!
    
    - HTML, TEXT
    - IMAGE, 음성, 영상, 파일
    - JSON, XML(API) ⇒ 보통 서버끼리 통신시 사용
    - 거의 모든 형태의 데이터 전송 가능
    - 서버간 데이터를 주고 받을 때도 대부분 HTTP 사용
    - 지금은 HTTP 시대!
        
        ⇒ TCP를 직접 연결해 통신하는 경우는 게임서버 등이 있음.
        
    
    ## HTTP 역사
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8dfa717f-88e7-4866-8659-55ae15d5d255/Untitled.png)
    
    ⇒ HTTP/1.1에 대부분의 기능이 들어있고 이후 버전은 성능개선에 초점
    
    ⇒ HTTP/1.1 에 대해서 공부하는 것이 중요
    
    ## 기반 프로토콜
    
    - HTTP/1.1, HTTP/2 ⇒ TCP 기반으로  개발 되어있음
    - HTTP/3 ⇒ UDP 기반으로 개발 되어있음
    
    ⇒ 현재 HTTP/1.1 주로 사용
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/85bf237b-0c55-4f40-968d-6abcba2ae91d/Untitled.png)
    
    ⇒ 2, 3 도 많이사용
    
    ⇒ 결국은 HTTP/1.1 스펙을 잘 알면 된다.
    
    ## HTTP 특징
    
    - 클라이언트 서버 구조로 동작
    - 무상태 프로토콜(Stateless) 지향, 비연결성
    - HTTP 메세지를 통해 통신
    - 단순함, 확장 가능
    
    ⇒ **각각 자세히 알아보자!!**
    
    ## 클라이언트 서버 구조
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2a658655-47af-4258-92cb-14b0ad26b6eb/Untitled.png)
    
    1. 클라이언트가 HTTP메세지를 통해 서버에 요청
    2. 클라이언트는 서버에서 응답이 올때까지 무작정 기다림
    3. 서버에서 응답 결과가 오면 그때 응답을 열어서 동작하게 됨
    
    **여기서 중요한 점**
    
    1. 개념적으로 서버와 클라이언트를 분리한다.
    2. 비지니스 로직과 데이터들을 모두 서버에 집중시켜 밀어넣음
    3. 클라이언트는 UI와 사용성등에 집중시킴
    
    ⇒ 이렇게 되면
    
    - 클라이언트와 서버가 각각 독립적으로 진화가 가능
    
    **정리)**
    
    - HTTP에서는 서버와 클라이언트 구조로 되어있음
    - 클라이언트는 요청을 보냄(서버가 응답이 올때까지 무작정 기다림)
    - 서버는 응답을 보냄
    - 클라는 응답이 오면 응답에 대한 동작을 실행
    
    ## 무상태 프로토콜 (Stateless)
    
    HTTP는 무상태 프로토콜을 지향한다.
    
    - 서버가 클라이언트의 상태를 보존하지 않는다
        
        ⇒ 이게 뭐지 ???
        
        ⇒ 예제
        
        <**Stateful 상태 유지**>
        
        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8f20f0c5-6e2e-419e-807c-ac07b4c5c984/Untitled.png)
        
        ⇒ Stateful ⇒ 서버가 클라이언트의 이전 상태를 보존
        
        (예시에서는 문맥(Context)을 보존한다)
        
        <**stateless 무상태**>
        
        (점원이 중간에 바뀜)
        
        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1c2630b5-a35f-4f18-b26d-b2fe000b65c6/Untitled.png)
        
        ⇒Stateless ⇒ 서버가 클라이언트의 이전 상태를 보존하지 않음
        
        (예시에서는 문맥을 보존하지 않는다)
        
        음 **상태를 유지하는것과 유지하지 않는것**을 stateful, stateless 라고 하는구나 ... 아직 확 와닿지 않는다...
        
        **다시 확인해보자**
        
        <**Stateful 상태 유지**>
        
        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bf1aefe4-6ded-4b73-b986-00818ebdbfe0/Untitled.png)
        
        1. 점원은 노트북이라는 문맥 상태를 유지
        2. 점원은 노트북, 2개 구매라는 상태 유지
        3. 점원은 노트북, 2개 구매, 신용카드 결재 상태를 유지
        
        <**stateless 무상태**>
        
        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3ea97daa-e3b7-4eff-ae9d-4d4546b170fc/Untitled.png)
        
        ⇒ 문맥 상태를 유지하지 않기때문에 이러한 대화를 해야된다.
        
        **여기서 중요한점 !!!** 
        
        **무상태 에서 점원이 중간에 변경되면???!?!?**
        
        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c35f7a9b-8b88-40f0-9241-ddda29662c38/Untitled.png)
        
    
    결론)
    
    <서비스 개발 입장관점에서>
    
    상태유지 stateful 에서 **중간에 점원이 바뀌면 장애/오류가 발생**
    
    ( 다른 점원으로 바뀌면 문맥상태가 사라짐)
    
    무상태 stateless 에서 **중간에 점원이 바뀌어도 정상 작동**
    
    ( 다른 점원으로 바뀌어도 그때그때 점원이 필요하는 정보를 넘김)
    
    (그래서 중간에 점원이 바뀌어도 정상 작동 됨)
    
    **Stateful, Stateless 차이 정리**
    
    - 상태 유지 : 중간에 다른 점원으로 변경되면 안된다
        
        ⇒ 중간 다른 점원으로 바뀔 때 상태 정보를 다른 점원에게 미리 알려주어야 한다.
        
    - 무상태 : 중간에 다른 점원으로 바뀌어도 된다
        
        ⇒ 갑자기 고객이 증가해도 점원을 대거 투입 가능
        
        ⇒ 갑자기 클라이언트 요청이 증가해도 서버를 대거 투입 가능
        
        ⇒ **무상태는 응답 서버를 쉽게 바꿀 수 있다. → 무한한 서버 증설 가능**
        
    
    **#상태 유지**
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2b04f671-144e-44fc-8a7d-293bcff15b7e/Untitled.png)
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1cc17df1-bbd6-478c-9b3f-42e32e3d3470/Untitled.png)
    
    ⇒ 따로 상태 유지된 정보가 사라져 결제를 처음부터 다시 시작해야함
    
    **#무상태** 
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2708980b-9266-4d83-9676-6a9570f9ed16/Untitled.png)
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4632799d-63cb-4640-99ec-4faa7ac7ed78/Untitled.png)
    
    ⇒ 장애시에도 다른 서버로 대체 가능 왜? 무상태이기 때문
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b4e2ff1e-ad22-42f5-9e2c-e9ca78160b88/Untitled.png)
    
    ⇒ 무상태 설계시 수평확장에 유리하게 작용할 수 있다.
    
    **마지막 stateless의 한계**
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4f49f64e-a588-4e18-93bc-163fc2745762/Untitled.png)
    
    ⇒ **웹 애플리케이션을 설계할 때에는 최대한 무상태로 설계한다**
    
    ⇒ **상태 유지는 어쩔 수 없는 경우(로그인)만 최소한으로 사용한다.**
    
    ## 비 연결성(Connectionless)
    
    **연결을 유지하는 모델** 
    
    ex) TCP /IP 연결 하는 경우
    
    #1
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/46451b0b-856f-4dd4-9e91-2c079f762b17/Untitled.png)
    
    #2
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/afdc3a9f-8fb7-4703-9b27-dd8667dbcc15/Untitled.png)
    
    #3
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/edb52791-4099-42d1-bc32-7257de00b973/Untitled.png)
    
    ⇒위 그림과 같이  클라이언트는 서버와 연결이 유지되어 있음
    
    ⇒ 연결을 유지하는 서버의 자원은 계속 소모 되고 있다.
    
    단점)
    
    - 요청/응답 이 없어도 연결을 유지를 해야한다.
        
        ⇒ 즉 무언가 실제 동작이 없어도 연결을 유지해야하는 비용이 든다.
        
    
    **연결을 유지하지 않는 모델**
    
    #1
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/452a1b50-f2d1-4e96-8f2f-a4aba722d802/Untitled.png)
    
    #2
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/455615ee-e58b-4755-9066-e32dd96a28cb/Untitled.png)
    
    ⇒ 위 그림은 요청이 올때 연결하고 응답이 완료되면 연결을 끊는다.
    
    장점)
    
    - 서버 연결 유지하지 않음
    - 최소한의 연결 자원 유지
    
    ⇒ 서버가 동시에 유지해야 하는 자원을
    
    ⇒ 요청시에만 연결하고 응답 보내고 끊어 버리기 때문에
    
    ⇒ 최소한의 자원으로 서버 유지가 가능
    
    **비 연결성**
    
    - HTTP는 기본이 연결을 유지하지 않는 모델
    - 일반적 초단위 이하의 빠른 속도로 응답
    - 1시간 동안 수천명이 서비스를 사용해도 실제 서버에서는 동시 처리하는 요청은 수십개 이하로 매우 작다
        
        ⇒ 예) 웹 브라우저에서 계속 연속해서 검색 버튼을 누르지 않는다.
        
    - 서버 자원을 매우 효율적으로 사용할 수 있다.
    
    **비 연결성의 한계와 극복**
    
    - TCP/IP 연결을 새로 맺어야 한다 - 3 way handshake 시간 추가
    - 웹 브라우저로 사이트를 요청시 html 뿐 아니라 js,css,추가 이미지 등 수많은 자원이 함께 다운로드 된다.
    
    - 지금은 HTTP 지속 연결(Persistent Connections)로 문제 해결
    - HTTP/2, HTTP/3 에서 더많은 최적화가 되어있다.
    
    **<초기>**
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2fc2506c-eb69-431e-98f2-329b7cf1a3f6/Untitled.png)
    
    **<지속 연결 사용>**
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7209064c-8927-481d-a01d-ce18b64e69ab/Untitled.png)
    
    ⇒ 내부 매커니즘에 따라 웬만한 HTML 페이지 하나를 다 받을 때까지는 지속연결을 유지 후 종료
    
    참고)
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/badc1ea8-7e3c-4185-ad60-a9353bcf2f1f/Untitled.png)
    
    ⇒ 수만면이 동시 접속시 대용량 트패픽
    
    ⇒ 이런경우 비연결성 소용이 없다.
    
    ⇒ 그래서 이렇게 동시에 몰려오는 경우는 !!
    
    ⇒ **최대한 어떻게든 STATELESS 하게 설계하는 것이 중요**
    
    ⇒ 동시 접근을 수를 줄이기, 동시 접근시 커버 가능 서버 구축 등 해결책
    
    ## HTTP 메세지
    
    <HTTP 요청 메세지 구조>
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9f1605f5-6b29-45c7-b267-193b5e88763b/Untitled.png)
    
    <HTTP 응답 메세지 구조>
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9d13dd18-4ebd-426f-a560-5eb31e0fa571/Untitled.png)
    
    ⇒ 구조가 약간 다르다 
    
    ⇒ 형식적 구조를 확인해 보자
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/269d1599-420e-439f-a323-bb3bfbf2cfbc/Untitled.png)
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7b9c1590-94a2-4bfe-b223-543f5c8cdcd1/Untitled.png)
    
    <요청>
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3a85aaca-73a5-4aeb-8e56-99d05b1ab5e0/Untitled.png)
    
    <응답>
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/620955aa-08eb-49a6-9b67-a142cd2e5ddb/Untitled.png)
    
    **이제 세세히 하나씩 확인해 보자**
    
    - 요청 메세지
        
        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a9dc523e-e408-4d57-b3cc-ad6d98938688/Untitled.png)
        
        - **시작 라인(START-LINE)**
            
            **종류** : **(request-line(요청) / status-line(응답))**
            
            형식) 
            
            **request-line =**
            
            **method SP(공백) request-target SP HTTP-version CRLF(엔터)**
            
            ⇒ 형식 : **메소드** (공백) **요청 대상** (/공백) **HTTP버전** (엔터)
            
            ⇒ 예) GET /search?q=hello&hl=ko HTTP/1.1
            
            ⇒ 메소드 : GET
            
            ⇒요청 대상 : /search?q=hello&hl=ko
            
            ⇒ HTTP 버전 : HTTP/1.1
            
            - HTTP 메소드
                
                -종류 : GET,POST,PUT,DELETE ... etc
                
                -서버가 수행해야할 동작을 지정
                
                -get : 서버에게 자신이 요청한 리소스를 내놔라
                
                -post : 서버에게 자신이 보낸 리소스를 처리해라
                
                -delete : 서버에게 자신이 보낸 리소스 삭제해라
                
            - 요청 대상
                
                -absolute-path[?query](절대경로[?쿼리]) 형식
                
                -절대경로 = "/" 로 시작하는 경로
                
            
            - HTTP 버전
                
                -HTTP 버전 작성
                
            
        - 응답 메세지
        
        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/26e4b631-556c-41c1-8997-502d1b026de4/Untitled.png)
        
        - **시작 라인(START-LINE)**
        
        **종류** :  **(request-line(요청) / status-line(응답))**
        
        형식)
        
        **status-line =**
        
        **HTTP-version** SP **status-code** SP **reason-phrase** CRLF
        
        ⇒ 형식 : **http버전** (공백) **상태 코드** (공백) **이유 구문** (엔터)
        
        예) HTTP /1.1 200 OK
        
        ⇒ http버전 : 1.1
        
        ⇒ 상태 코드 : 200
        
        ⇒ 이유 구문 : ok
        
        - HTTP버전
            
            -HTTP 버전 작성
            
        - 상태 코드
            - 요청 성공, 실패를 나타냄
            - 200 : 성공
            - 400 : 클라이언트 요청 오류
            - 500 : 서버 내부 오류
        - 이유 구문
            
            -사람이 이해할 수 있는 짧은 상태 코드 설명 글
            
    
    ===========================================
    
    **이제 요청 응답 공통 부분**
    
    - **HEADER 헤더**
        
        header-field =
        
        field-name ":" OWS field-value OWS (OWS : 띄어쓰기 허용)
        
        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/51931375-ed53-4711-8cae-09c1f0bfd6f9/Untitled.png)
        
        ⇒Host,Content-Type등 이부분은 대소문자 구분 안함
        
        ⇒ value값 즉 [www.google.com](http://www.google.com) 이부분은 대소문자 구분함
        
        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/01cb0778-6e03-45c8-9171-3d5e3539c494/Untitled.png)
        
        ⇒ 즉 **헤더에는 메세지 body 부분 빼고 필요한 모든 메타데이터 정보가 다 들어있는 곳**
        
    
    ==============================================
    
    - **HTTP 메세지 바디**
        
        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/445c1ddc-fb55-4517-93c4-574254e74680/Untitled.png)
        
    
    =============================================
    
    **HTTP 메세지 결론)**
    
    - HTTP 단순 , 스펙도 읽어볼만
    - HTTP 메세지도 매우 단순
    - 크게 성공하는 표준 기술은 단순하지만 확장 가능한 기술이다.
    
    ## HTTP 정리
    
    - HTTP메세지에 모든 것을 전송 가능
    - HTTP 역사 HTTP/1.1 기준으로 학습
    - 클라이언트 서버 구조
    - 무상태 프로토콜(Stateless)
    - HTTP 메세지
    - 단순함, 확장 가능
    - 지금은 HTTP 시대
    </details>