# 추상화

### 목차

- 서양철학의 사고방식과 OOP
- 분류(Classification)
- 추상화(Abstraction)
- 추상화의 한계
- 위임(Delegation)으로 극복

### 서양철학의 사고방식과 OOP

서양철학은 이분법적 세계관을 갖고 있다. (`추상적` / `구체적`)

「_눈앞에 구체적으로 존재하는 사물이 있다면 반드시 그것의 본질이 존재한다_」라고 플라톤은 주장한다.
의자를 예로, 수많은 여러 가지 형태의 의자가 존재한다면 반드시 그 `본질의 의자`라는 것이 존재한다.

영어권의 사고방식에는 이 이분법적 세계관을 기본으로 가지고 있다.

추상적인 의자를 얘기할때, `chair`라고 말하며,

현실에 존재하는 의자를 얘기할때, `a chair`, `the chair` 와 같이 존재 대상을 지칭한다.

이러한 사고방식이 자연스레 프로그래밍 언어에 녹아든다. OOP가 대표적이다.

```csharp
class Chair{
  ...
}
Chair aChair = new Chair();
Chair theChair = new Chair();
```

위 사고방식을 프로그래밍으로 서술하자면,

코드상으로 존재하는 (추상적) Chair 클래스가 메모리로 (구체적 존재) 인스턴스화 하게 된다.

### Classification

서양철학의 사고방식은 분류란 개념으로 정립된다.

분류의 정의는「개체의 속성이 동일한 경우 개체 그룹이 같은 범주에 속한다」란 뜻이다.

분류란 개념을 프로그래밍적으로 클래스 키워드를 사용하게되었고,

개체의 속성을 클래스의 프로퍼티라 하여, 서술하자면

「프로퍼티가 유사한 객체가 있다면 일반화 과정을 통해 클래스로 추상화된다」라고 할수 있다.

즉, 분류하기 위함이다.

### Abstraction

프로그래밍에서 분류를 한다라면, 대표적으로 학부수업에서 경험해본 것중에 어떤 것이 있을까

바로 이번 학기 네트워크 프로그래밍 수업을 통한 `나만의 프로토콜 설계` 프로젝트이다.

어떠한 원칙을 만들어 기능이 추가되거나 하는 확장의 행위가 있어도, 원칙을 지키면 프로그램 내에서 통신이 가능할 수 있는 프로젝트이다.

나만의 프로토콜을 토대로 클라이언트-서버간에 메세지를 만들 수 있는 클래스를 먼저 확인해보자.

```csharp
public interface Body{
  byte[] GetBytes();
  int GetSize();
}

public class Message{
  public Header Header { get; set; }
  public Body Body { get; set; }

  public static Message Receive(Stream reader){
    // +++ header receive
    // +++ body receive

    // make message
    Body body;
    switch (header.MSGTYPE){
      case PROTOCOL.REQ_MSG_SEND:
        body = new BodyRequest(buffer);
        break;
      case PROTOCOL.REP_MSG_SEND:
        body = new BodyResponse(buffer);
        break;
      default:
        return;
    }
  }
}
```

다음은 Body 클래스를 살펴보자. Body 클래스는 위 코드에서 보았듯이 Hedaer에서 명시해준 타입에 따라 요청에 대한 Body 인지 응답에 대한 Body인지 선별된다.

```csharp
public class BodyRequest : Body{
  // +++ field
  // +++ constructor
  public byte[] GetBytes(){ ... };
  public int GetSize() { ... };
}

public class BodyResponse: Body{
  // +++ field
  // +++ constructor
  public byte[] GetBytes(){ ... };
  public int GetSize() { ... };
}
```

여기서 주목할 점은 Body 인터페이스를 상속받은 클래스들이 Body 인터페이스로 분류되었다는 점이다. 쉽게 분류되었음을 통해 클라이언트-서버간에 메시징을 만드는 작업에서 프로그래밍적으로 명시적이게 되었다.

### 추상화의 한계

추상화를 사용한 분류는 유연성이 없다.

예로, 개체의 속성을 토대로 돌고래라는 개체를 포유류로 분류해버렸지만, 내가 종(species)이라는 분류 매커니즘이 아닌 다른 분류 매커니즘에서 돌고래를 사용하고 싶을때는 어떨까?

불필요한 포유류라는 상위 클래스에 정의된 필드와 메서드들을 그대로 사용해야되기 때문이다.

위임은 이 한계를 극복한다.

### 위임으로 극복

> 예시로 올린 코드 `issue.js`와 해결방안된 `solution.js`를 참고해주기 바란다.

<hr/>

**참고문헌**

[자바스크립트는 왜 프로토타입을 선택했을까](https://medium.com/@limsungmook/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%99%9C-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85%EC%9D%84-%EC%84%A0%ED%83%9D%ED%96%88%EC%9D%84%EA%B9%8C-997f985adb42)

[리팩토링 2판](http://www.yes24.com/Product/Goods/89649360)