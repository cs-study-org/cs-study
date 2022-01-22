# 프로그래밍 언어 처리

- [프로그래밍 언어 처리](#프로그래밍-언어-처리)
  - [프로토타입 기반 OOP 언어: Javascript](#프로토타입-기반-oop-언어-javascript)
    - [OOP와 연결성](#oop와-연결성)
    - [클래스 기반과 차이점](#클래스-기반과-차이점)
    - [의미 사용 이론과 Javascript](#의미-사용-이론과-javascript)
    - [프로토타입의 2가지 주체](#프로토타입의-2가지-주체)
  - [Javascript 구현체](#javascript-구현체)
  - [Javascript 특징](#javascript-특징)
  - [참고 문헌](#참고-문헌)

## 프로토타입 기반 OOP 언어: Javascript

### OOP와 연결성

Javascirpt 언어가 OOP임은 가족 유사성 이론이 근거가 된다.

    "인간은 사물을 분류할 때 자연스럽게 가장 유사성 높은 것 순서대로 등급을 매긴다.

    이렇게 분류했을 때 가장 높은 등급을 가진 녀석이 원형(프로토타입)이다." -- 로쉬

<img width="70%" src="https://miro.medium.com/max/1050/1*ThdtLo8MUCQ2bcfII6AJcQ.png">

    i.e.  참새, 타조의 속성을 생각해볼때

            참새: 2점(2개의 날개, 비행여부)

            타조: 1점(2개의 날개)          

          프로토타입 기반으로 서술하면
          
          참새는 가장 전형적인 새이고,
          타조는 가장 비전형적인 새이다.

OOP의 특징은 상속을 활용한 확장이다.

클래스가 없는 Javascript에서 **확장의 행위는**

프로토타입을 복사하고, **인스턴스 수준에서 메소드와 변수를 추가하는 방식**을 통해 새로운 객체를 생성한다.

- 예시 코드로 이해를 돕자.

  ```js
  function 참새(){
      this.날개갯수 = 2;
      this.비행 = true;
  }
  const 참새1 = new 참새();

  function 타조(){
    this.긴다리 = true;
  }
  타조.prototype = 참새1;
  const 타조1 = new 타조();

  console.log(
    "타조1 날개 : ", 타조1.날개갯수, // 2
    "비행?: ", 타조1.비행           // true 
    ); 

  // +++ OOP's extension
  타조1.비행 = false;
  console.log(
    "날 수 있나? :", 타조1.비행     // false
    );
  ```
  `비행` 이라는 `참새`와 `타조`의 같은 속성을 
  `타조`에서 변경해도, `참새`는 영향을 받지 않았다.

  <br/>

- 도식화해보면 다음과 같다.

  <img width="50%" src="https://miro.medium.com/max/1050/1*EPvcWtTdkrM_vZHDwNNMJg.png">

### 클래스 기반과 차이점

속성에 따른 분류란

    속성이 동일한 경우 그 그룹은 같은 범주에 속한다.

      cf. 돌고래의 속성이 동일한 경우를 찾다보니 어류가 아닌 포유류 범주에 들었다.

프로토타입에 따른 분류 개념은 속성에 따른 분류 개념을 아래와 같이 반박한다.

    "속성의 관점에서 정의하기 어려운 분류가 있다." -- 비트겐슈타인

      cf. 예술을 속성의 관점으로 논할 수 없다.

의미 사용 이론이 근거가 된다.

      "「진정한 본래의 의미」란 존재하지 않고, 「상황과 맥락」에 의해서 결정된다. -- 비트겐슈타인"

      c.f. 아이는 참새를 새의 범주로 속하지만, 타조를 새의 범주로 속하지 못할 수 있다.
           아이가 생각할 때 타조는 매우 비전형적이기 떄문이다.

           다만, 조류학자가 생각할때 참새와 타조는 명확히 새의 범주에 속한다.'      

### 의미 사용 이론과 Javascript
    
의미 사용 이론

    분류는 맥락에 의해서 결정된다.

<details>
<summary>의미 사용 이론을 Javascript에 적용한 예시 A</summary>
<br/>

    변수의 의미는 실행 문맥(Execution Context)에서 결정된다.

`Execution Context`의 특징은

    Execution Context 내의 범위의 모든 선언을 참고(Hoisting)해서 맥락을 정의한다.
    
    Execution Context 생성 시, 변수의 의미가 통하는 곳(Lexical Scope)이 별도로 정의된다.

- 코드로 확인해보자.

  ```js
  var name = 'Kai';

  init();

  function init() {
      var name = "Steve";

      function displayName() {  
        console.log(name);      
      }

      displayName();
  }
  ```
- 다음은, 코드를 로드하여 전역 `Execution Context` 생성 시 코드의 변화이다.
  `Lexical Scope`는 `name`과 `init`이다.

  ```js
  var name;
  var init = function init() {
    var name = "Steve";

    function displayName() {  
      console.log(name); 
    }

    displayName();
  }

  name = 'Kai';
  ```

- 다음은, `init` 함수를 호출해서 `init`의 `Execution Context` 생성 시 코드의 변화이다.
  `Lexical Scope`는 `name`과 `displayName`이다.

  ```js
  var name;
  var init = function init() {
    var name;
    var displayName = function displayName() {  
      console.log(name); 
    }
    
    name = "Steve";

    displayName();
  }

  name = 'Kai';
  ```

이를 통해 전역 또는 `init`의 `Execution Context` 마다

`name`이란 단어가 존재 했지만, 각자 맥락이 다름을 발견할 수 있었다.

</details>
<br/>

<details>
<summary>의미 사용 이론을 Javascript에 적용한 예시 B</summary>
<br/>

앞선 목차에 아이와 조류학자에 따라 맥락이 달라졌다.

즉, 단어의 의미는 단어를 받아들이는 대상에 따라서 달라진다.

Javascript로 서술하면,

    this라는 단어가 정의된 메서드를 

    어떤 Execution Context가 받아들이고 사용(invoke)했는지에 따라 맥락이 달라진다.

다음은 이해를 돕는 코드 예시이다.

```js
var someValue = 'hello';

function outerFunc() {
    console.log(this.someValue);
    this.innerFunc();
}
const obj = {
    someValue : 'world',
    outerFunc,
    innerFunc : function() {
        console.log("innerFunc's this : ", this);
    }
}
obj.outerFunc();  /*
                      world
                      obj

                      +++ invoke by obj
                  */ 
outerFunc();      /*
                      hellow
                      error!

                      +++ invoke by global
                  */ 
```

</details>
<hr/>

### 프로토타입의 2가지 주체

`프로토타입 원형`이 객체를 만들어내기 위한 추상적 주체이고,

`프로토타입 객체`는 추상적 주체를 통해 만들어질 다른 객체가 참조하는 실질적 주체이다.

- 이제, 아래 코드를 돌려보자.

  ```js
  function foo() {};

  var bar = new foo();
  console.log(bar);
  ```
- 결과값을 확인해보자.

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

- 상속된 흐름을 도식화해보자.

  ![prototype](assets/prototype.drawio.svg)

위에 인지해야할 2가지를 통해 결과값을 풀이하자면,

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

[자바스크립트는 왜 프로토타입을 선택했을까](자바스크립트는-왜-프로토타입을-선택했을까-997f985adb42) -- Sungmook Lim