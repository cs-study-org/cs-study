# 웹 서버

- [웹 서버](#웹-서버)
  - [들어가며](#들어가며)
  - [`Socket.accept()` 의 시점 정리](#socketaccept-의-시점-정리)
  - [같은 포트 번호, 여러 개 소켓의 의미](#같은-포트-번호-여러-개-소켓의-의미)
    - [서버 애플리케이션의 구조](#서버-애플리케이션의-구조)
    - [본문](#본문)
    - [여러 개 소켓 처리 방식](#여러-개-소켓-처리-방식)
  - [HTTP 버전별 특징](#http-버전별-특징)
  - [참고 문헌](#참고-문헌)

## 들어가며

이번 주차는 9주차 웹 브라우저와 동일한 내용이 많다.

웹 서버와 연관지으면서 놓친 부분과 챕터의 내용과 관련된 경험을 기술하였다.


## `Socket.accept()` 의 시점 정리

정리에 앞서 `소켓 연결 과정`의 서버측 메소드별 역할을 잠시 짚어보자.

    socket():         제어 정보를 기록한 메모리 영역(소켓)을 확보
    bind():           소켓에 포트 번호를 기록
    listen():         소켓에 기다리는 상태를 기록
    accept():         접속을 접수
    send() / recv():  데이터 송·수신
    close():          소켓 말소


네트워크 프로그래밍 수업에서 `소켓 연결 과정`에 대해 다음과 같은 질문을 교수님께 한 적이 있다.

<table>
  <tr>
    <th>교안</th>
    <th>이해된 자료</th>
  </tr>
  <tr>
    <td>
      <code>서버의 accept()</code>가 <code>클라이언트의 connect()</code> 이전이다.
    </td>
    <td>
      <code>서버의 accept()</code>가 <code>클라이언트의 connect()</code> 이후다.
    </td>
  </tr>
  <tr>
    <td><img src="assets/accept-point(1).jpg"/></td>
    <td><img src="assets/accept-point(2).jpg"/></td>
  </tr>  
</table>

교재를 통해 교안이 맞았음을 알게되었고, 해당 교안을 고도화시켰다.

<div align="center">
<img width="50%" src="assets/accept-point.drawio.svg"/>
</div>

`서버의 accept()` 호출 시점은 서버측이 패킷을 기다리는 상태를 의미한다.

 클라이언트측으로 부터 접속 패킷이 도착하는 시점 부터 응답 패킷을 반송하는 접속 접수 동작이 이루어지는 것이다.

## 같은 포트 번호, 여러 개 소켓의 의미

### 서버 애플리케이션의 구조

서버는 클라이언트의 접속을 기다리는 소켓과
 
`서버의 accept()`마다 전자를 복제하여 각 클라이언트의 통신을 담당하는 소켓들로 나눠진다.

이 구조는 여러 클라이언트의 접근에 대한 여러 프로그램의 처리를 `동시에 작업되 보이도록` 또는 `동시에 작업되도록` 한다.

### 본문

이번 챕터를 통해 새롭게 알게된 사실이다.

어떻게 보면 놓친 부분이라 할 수 있다.

<table>
<tr>
  <th colspan="2">포트 번호</th>
</tr>
<tr>
  <td>이전 이해한 정의</td>
  <td>재정립한 정의</td>
</tr>
<tr>
  <td>
<p>

    포트 번호는 소켓 한개를 담당

    포트 번호당 PC의 프로그램 한개를 담당
</p>
  </td>
  <td>
<p>
    
    클라이언트 측에서는 미사용 값당 소켓 한개를 담당하며,

    서버 측에서는 PC의 프로그램을 식별하는 요도며,
    
    프로토콜 스택이 포트 번호를 식별해 접속하는 클라이언트 별로 다른 소켓을 부여한다.
</p>
  </td>
</tr>
</table>
    
다음은 클라이언트 별 다른 소켓을 부여하는 기준이다.

| 서버 IP 주소 | 서버 포트 번호 | 클라이언트 IP 주소 | 클라이언트 포트 번호 | 프로그램 |
| :----------: | :------------: | :----------------: | :------------------: | :------: |
|  10.10.30.1  |       80       |     20.10.10.1     |       미사용값       | 웹 서버  |
|  10.10.30.1  |       80       |     30.10.10.1     |       미사용값       | 웹 서버  |

### 여러 개 소켓 처리 방식

이전 목차를 통해 학부 수업에서 사용해본 소켓 처리 방식을 떠올릴 수 있었다.

멀티스레드 방식에서 소켓당 하나의 스레드를 사용해 여러 스레드를 사용했고,

    10명의 클라이언트 / 10개의 스레드

비동기 방식에서는 스레드 한개에 여러 소켓을 사용했다.

    10명의 클라이언트 / 1개의 스레드 + 제한된 n개의 스레드

    1개의 스레드는 클라이언트의 접속을 담당하는 역할

    n개의 스레드는 클라이언트의 통신을 담당하는 역할

학부 수업에서 해본 비동기 방식은 "*대리자를 사용한 비동기 프로그래밍*"이다.

<div align="center">
<img width="60%" src="assets/apm-delegate.drawio.svg"/>
</div>

대리자를 사용하면 비동기 방식으로 동기 메서드를 호출할 수 있다.

스레드풀의 스레드를 사용하는 방식이다.

    스레드 개수에 제한을 둬서 한번에 만들어놓고, 

    비동기 작업이 생길 때마다 풀에서 스레드를 꺼내와 사용하고 작업이 끝나면 소멸하지 않고 스레드풀에 반납하는 방식이다.

    이는, 스레드의 생성, 소멸 비용을 최소화할 수 있다.

I/O 발생시, `BeginInvoke()`를 호출하여 백그라운드의 스레드풀에게 작업을 시작하게 한다.

백그라운드의 스레드풀은 `IAsyncResult 객체`를 즉시 리턴하고 다음 I/O를 바로 받을 수 있다.

`IAsyncResult 객체`는 어떤 스레드를 가리키는 지 알 수 있게 한다.

`IAsyncResult 객체`의 인스턴스는 비동기 작업의 상태를 알고 있으며,

비동기 작업의 결과값은 `EndInvoke()`에 매개변수를 담아 호출함으로써 받아올 수 있다.

> 🤔 큐에 등록된 콜백 함수를 받으면, HTTP 1버전에 해당한 것인가

> 🤔 실제 사용한 `BeginAccept()`와 `EndAccept()`를 같은 맥락으로 볼 수 있는가

##  HTTP 버전별 특징

<div align="center">
<table>
  <tr>
    <th colspan="2"></th>    
    <th>1.0</th>
    <th colspan="2">1.1</th>
    <th colspan="2">2.0</th>
  </tr>
  <tr>
    <td colspan="2"></td>
    <td><img src="assets/http-1.0.drawio.svg"/></td>
    <td><img src="assets/http-1.1-persistent.drawio.svg"/></td>
    <td><img src="assets/http-1.1-pipelining.drawio.svg"/></td>
    <td><img src="assets/http-2.0-multiplexed.drawio.svg"/></td>
    <td><img src="assets/http-2.0-server-push.drawio.svg"/></td>
  </tr>
  <tr>
    <td rowspan="4">특징</td>
    <td>요청별 응답 순서</td>
    <td colspan="3"><center>순차</center></td>    
    <td colspan="2"><center>랜덤</center></td>    
  </tr>
  <tr>
    <td>요청-응답</td>
    <td colspan="2">핑퐁</td>    
    <td>파이프라이닝</td>
    <td>멀티플렉싱 스트림</td>
    <td>서버 푸시</td>
  </tr>
  <tr>
    <td>동시 전송</td>
    <td>불가능</td>
    <td colspan="4"><center>가능</center></td>    
  </tr>
  <tr>
    <td>리소스 요청 예측</td>
    <td><center>-</center></td>
    <td colspan="2">리소스 인라인</td>
    <td><center>-</center></td>
    <td>서버 푸시</td>
  </tr>
  <tr>
    <td colspan="2">개선점</td>
    <td>HTTP 헤더 도입</td>
    <td colspan="2">
      Connection당 여러 요청 처리<br/>
      (HTTP 헤더 <code>keep-alive</code>필드)
    </td>    
    <td>
<p>

식별자가 있는 데이터(스트림) 형식으로 응답

데이터 간 우선순위 설정 가능

    cf. image파일은 css파일 이후에 렌더링되도록
</p>
    </td> 
    <td>요청당 연관된 여러 리소스 응답</td> 
  </tr>
  <tr>
    <td rowspan="2" colspan="2">단점</td>
    <td rowspan="2">Connection당 하나의 요청 처리</td>
    <td colspan="4">응답 병목현상</td>
  </tr>
  <tr>
    <td colspan="2">HTML 크기 증가</td>    
    <td colspan="2"><center>-</center></td>
  </tr>
</table>
</div>

<hr/>

## 참고 문헌

[소켓 프로그래밍 동기와 비동기 차이](https://okky.kr/article/562664) ━ *Okky*

[비동기 처리와 스레드풀](https://kukuta.tistory.com/371) ━ *진리는어디에*

[비동기 방식](https://www.csharpstudy.com/net/article/11-비동기-Socket-서버) ━ *예제로 배우는 C# 프로그래밍*

[비동기 델리게이트](https://www.csharpstudy.com/Threads/async-delegate.aspx) ━ *예제로 배우는 C# 프로그래밍*

[동기 메서드를 비동기 방식으로 호출](https://docs.microsoft.com/ko-kr/dotnet/standard/asynchronous-programming-patterns/calling-synchronous-methods-asynchronously#defining-the-test-method-and-asynchronous-delegate) ━ *MicrosoftDocs*

[HTTP 버전별 특징 TCP 연결](https://github.com/cs-study-org/cs-study/blob/master/05/JiYongKim/CS_terminology.md) ━ *Github*

[HTTP 버전별 특징](https://yceffort.kr/2021/05/http1-vs-http2) ━ *yceffort*
