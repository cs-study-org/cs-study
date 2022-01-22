# 프로그래밍 언어 처리

- [프로그래밍 언어 처리](#프로그래밍-언어-처리)
  - [Javascript 언어와 프로토타입 기반 프로그래밍](#javascript-언어와-프로토타입-기반-프로그래밍)
    - [Javascript에서 사용되는 프로토타입](#javascript에서-사용되는-프로토타입)
  - [Javascript 구현체](#javascript-구현체)
  - [Javascript 특징](#javascript-특징)
  - [참고 문헌](#참고-문헌)

## Javascript 언어와 프로토타입 기반 프로그래밍

**Javascript 언어의 정의**

    객체지향-프로토타입 프로그래밍 언어이다.

Javascript는 객체지향 언어인데, 클래스 개념이 없다.

상속이라는 기능이 없음을 의미하는데, 이를 구현하기 위해 프로토타입을 사용한다.

프로토타입을 이용해 **복사**와 **객체 특성을 확장**해 나가는 방식을 통해 새로운 객체를 생성한다.
    
### Javascript에서 사용되는 프로토타입

Javascript에서 사용하는 프로토타입의 의미는

    자기 자신을 생성하기 위해 사용된 객체 원형이다.

먼저, 인지해야할 2가지 주체가 있다.

`프로토타입 원형`이 객체를 만들어내기 위한 원형 주체이고,

`프로토타입 객체`는 프로토타입 원형의 분신이며, 자신을 원형으로 만들어질 다른 객체가 참조할 주체이다.

이제, 아래 코드를 돌려보자.

```js
function foo() {};

var bar = new foo();
console.log(bar);
```
결과값을 확인해보자.

```node
foo {}
  [[Prototype]]: Object
    constructor: ƒ foo()
      ...
      prototype: ...

      [[Prototype]]: Object
        constructor: ƒ Object()
          ...
          prototype: ...
```

상속된 흐름을 도식화해보자.

![prototype](assets/prototype.drawio.svg)

위에 인지해야할 2가지를 통해 결과값을 풀이하자면,

`[[Prototype]]`은 `프로토타입 객체`간의 숨겨진 연결이다.

모든 객체의 `constructor`는 `prototype`이란 프로퍼티를 가지고 있다.

`prototype` 프로퍼티는 `프로토타입 객체`를 가리킨다.

`Prototype Link`는 `프로토타입 원형`를 의미 한다.


## Javascript 구현체

Javascript를 구현한 구현체들은 다양하다. 이 구현체들을 Javascript 엔진이라고 한다.

익숙한 구글의 v8이 Javascript 엔진이고, C++로 구현하였다.

다양한 엔진이 존재하는데, ECMAScript 표준을 중시해서 구현하기 때문에 획일성을 유지할 수 있었다고 판단한다.

Javascript 엔진은 런타임[^런타임] 환경에서 돌아간다.

[^런타임]: 특정 언어로 만든 프로그램들을 실행할 수 있는 환경

Javascript 런타임의 종류에는 노드가 있다.

## Javascript 특징

**런타임 연산**

- 산술 연산 시, 정수형과 실수형을 구분하지 않고 8byte를 확보한다.

**객체**

- 런타임에 빈 객체를 오버라이딩하여 메소드와 프로퍼티를 연결하는 프로그래밍 방식으로 생성한다.

<hr/>

## 참고 문헌

[프로토타입](http://insanehong.kr/post/javascript-prototype/) -- Insanehong
