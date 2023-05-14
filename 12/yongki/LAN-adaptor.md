# LAN 어댑터

- [LAN 어댑터](#lan-어댑터)
  - [들어가며](#들어가며)
  - [패킷의 이동 시나리오](#패킷의-이동-시나리오)
  - [참고 문헌](#참고-문헌)

## 들어가며

TCP의 메시지 송·수신 동작의 다음 동작을 다뤄보겠다.

다음 동작은 네트워크 계층에서 이루어진다.

네트워크 계층은 다음과 같다.

    TCP에서 받은 패킷에 IP 헤더를 부가한다.

    이더넷을 통해 MAC 주소를 조사하여 MAC 헤더를 부가하고, LAN 드라이버에 건네준다.

네트워크 계층에 언급된 **이더넷**[^1]이란 다음과 같다.

    장치의 고유 주소를 가지고 장치 간 데이터를 주고 받을 수 있는 방식이다.

    모든 장치에게 ARP 패킷을 전달함으로써 장치 간 패킷의 목적지를 판단할 수 있다.
    이때, ARP 캐시로 ARP 패킷의 수를 줄일 수 있다.

    ※ ARP: IP 주소를 MAC 주소와 매칭 시키기 위한 프로토콜

[^1]: LAN을 구축하는 방법 중 하나가 이더넷이다.

다음으로, **LAN 드라이버**는 다음과 같다.

    IP에서 송신 패킷을 받고, 이것을 LAN 어댑터에 건네주어 송신하도록 지시한다.

    ※ LAN 어댑터: 이더넷이 송신 가능한 상태가 되는 것을 보아서 송신 패킷을 전기 신호로 변환한 후, 케이블에 내보내는 장치

이더넷, LAN 드라이버는 각자의 동작에 신경쓰지 않는다.

이를 통해 각자의 하드웨어가 바뀌어도 유연성을 유지할 수 있고, 이는 거대한 네트워크를 구축하는데 도움을 준다.

## 패킷의 이동 시나리오

패킷 중계 장치는

    송신처의 PC에서 수신처의 PC까지 거치는 라우터와 허브를 말한다.

    ※ 라우터의 역할: 다음 중계 장치를 선정
    ※ 허브의 역할: 이더넷을 통해 패킷을 운반

패킷의 이동 시나리오는 다음과 같다.

먼저, 송신 패킷을 보낼 때를 시각적으로 확인해보자.

> [_발표자료 확인하러 가기_](https://slides.com/yongki150/week12/fullscreen)

수신 패킷을 받았을 때의 대본은 다음과 같으며, 발표자료에는 반영되어 있지 않다.

```
1. 허브-라우터-허브를 경유해 수신처의 케이블로 신호가 들어온다.
2.  (주체)  수신처의 파형 계산기는 
    (동작)  신호의 프리엠블 & SFD로 패킷으로 변환할 부분을 찾는다.
3.  (주체)  수신처의 MAC 회로는 
    (동작)  패킷으로 변환하여 버퍼 메모리에 저장한다.
4.  (주체)  수신처의 MAC 회로는 
    (동작)  FCS를 검사하여 오류 검출한다.
5.  (주체)  수신처의 MAC 회로는 
    (동작)  자신의 MAC 주소와 패킷의 수신처 MAC 주소를 확인하여 자신에게 오는 패킷인지 판단한다.
6.  (주체)  수신처의 MAC 회로는 
    (동작)  패킷 수신을 인터럽트를 통해 수신처 CPU에게 알려준다.
7.  (주체)  수신처 CPU는 
    (동작)  OS의 인터럽트 처리용 프로그램을 통해 수신처 LAN 드라이버를 호출하고 패킷을 프로토콜 스택에게 전달한다.
8.  (주체)  수신처의 네트워크 계층은 
    (동작)  IP 헤더의 수신처 IP 주소로 자신에게 오는 패킷인지 판단하고, 
            회신되는 패킷이면 수신처의 MAC 회로에서 MAC 주소를 판단한 여부로 skip 가능하다.
9.  (주체)  수신처의 네트워크 계층은 
    (동작)  송신처의 데이터가 분할된 패킷으로 왔다면 원래의 모습으로 맞춘다.
            또는 원래의 모습으로 맞춰질 때까지 기다린다.
10. (주체)  수신처의 전송 계층은 
    (동작)  IP 헤더와 TCP 헤더의 송·수신 정보를 통해 소켓을 찾는다.
11. 수신처의 소켓의 상태를 확인하여 상태에 맞는 다음 동작을 실행한다.
```

## 참고 문헌

[이더넷의 정의](https://handreamnet.tistory.com/496) ━ *한드림넷 블로그*

[MAC 주소 저장 위치](https://aws-hyoh.tistory.com/entry/ARP-쉽게-이해하기) ━ *환영의 블로그*