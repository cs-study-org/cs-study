### TCP의 신뢰성 있는 통신

**인터넷의 네트워크 계층 (IP 계층) 은 비신뢰적이다.**

>⇒ 데이터 그램 전달과 데이터 그램이 순서대로 전달된다는 것을 보장하지 않으며 데이터 그램에 포함된 데이터의 무결성을 보장하지 않는다.

<br>

**TCP는 IP의 비 신뢰적인 서비스에서 신뢰적인 데이터 전달 서비스를 제공한다**

그렇다면 신뢰적인 데이터 전달 서비스이기 위해 보장되어야 하는것

**<U>[프로세스가 자신이 수신 버퍼로부터 읽은]</U>** 

- 데이터 스트림이 손실이나 중복이 없어야 한다.
    
    <details>
    <summary>잘 받았으면 ACK, 못 받았으면 NAK</summary>

    - **잘 받았으면 ACK, 못 받았으면 NAK**
        
        기본적으로 TCP(전송 제어 프로토콜)에서 신뢰성 있는 네트워크를 구성하기 위해서, 오류가 났다면 보냈던 TCP Segment를 다시 보내주게 된다.
        
        >⇒  이를 위해 수신자는 잘 받았다면 ACK(Positive Acknowledge)를, 중간에 오류가 났다면 NACK, NAK(Negative Acknowlede)를 송신자에게 보내주게 된다. 
        
        >⇒ 또한, 이를 통해 송신자는 다시 TCP segment를 보낼지 말지 결정하게 된다. 
    </details>

    <details>
    <summary>만약 수신자가 송신자에게 ACK, NAK도 못 보낼 상황이라면?</summary>

    - **만약 수신자가 송신자에게 ACK, NAK도 못 보낼 상황이라면?**
        
        기본적으로 **수신자가 송신자에게 ACK, NAK도 못 보낼 상황** 같은 경우에서는 timer, timeout 개념을 이용한다. 
        
        일정 시간동안 ACK 또는 NAK가 오지 않는다면 timeout된 시점에서 다시 TCP Segment를 보내주게 된다.  
        
        - timer를 너무 길게 생성하면 timer로 인한 퍼포먼스의 하락이,
        - timer를 너무 짧게 설정하면 계속 다시 쓰기 때문에 역시 퍼포먼스의 하락을 가져온다
        
         그렇다면 어떻게 timer를 설정할까? 이를 위한 다양한 알고리즘들이 있다. 
        
        >⇒ 대표적으로 Kan's algorithm이 있으며 RTT(Round Trip Time)의 최근 추이를 통해 RTO(Retransmission Time Out)을 설정하는 알고리즘 이다.
    </details>
        
    <br>
        
- 데이터 스트림이 손상되지 않아야 한다
    <details>
    <summary>어떻게 수신자는 TCP Segment에 오류가 있는지 알 수 있지?</summary>

    - **어떻게 수신자는 TCP Segment에 오류가 있는지 알 수 있지?**
        
        <TCP Segment(TCP Header + Data Stream(일부분, as chunk))의 Header> 
        
        <img width="609" alt="스크린샷 2022-05-12 오후 4 55 28" src="https://user-images.githubusercontent.com/81874493/168023076-4027182e-87ca-473d-95d1-3303b43730ec.png">

        위 TCP Header에서 오류를 체크하는 부분은 128비트 부터 시작하는 Checksum부분이다.
        
        이 Checksum Error Detecting을 통해 수신자는 송신자가 보낸 데이터가 제대로 보내졌는지 확인 할수 있으며 
        
        - 잘 못보내졌을 경우 위 TCP Flag (NS, CWR, ECE, URG, ACK, PSH, RST, SYN, FIN)중에서 ACK flag를 reset(0)하여 보낸다.
        - 만일 잘 보내졌을 경우 ACK flag를 set(1)하고 Acknowledgment number에 수신자가 받았던 sequence number에 1을 더한 sequence number + 1의 값을 넣어 보내준다. 
        
        <br>

        이렇게 해야 순서가 뒤죽박죽인 TCP프로토콜에서 제대로 통신할 수 있는 부분이다.
        </details>

<br>

- 데이터 스트림의 순서가 유지되어야 한다.
    <details>
    <summary>순서가 뒤바뀐 TCP Segment는 어떻게 처리하지?</summary>

    - **순서가 뒤바뀐 TCP Segment는 어떻게 처리하지?**
        
        <img width="609" alt="스크린샷 2022-05-12 오후 4 55 28" src="https://user-images.githubusercontent.com/81874493/168023108-86a42790-79a0-49f7-bd77-00aebd5f39e0.png">

        순서가 뒤바뀐 TCP도 역시 전혀 문제가 되지 않는다.
        
        >⇒  왜냐하면 Sequence number가 있기 때문에 수신자 측에서 이러한 Sequence number순서대로 데이터 청크 (data chunks)들을 잘 붙여주기만 하면 되기 때문이다.

    </details>

    <br>
