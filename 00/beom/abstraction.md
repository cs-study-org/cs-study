## 추상화(abstraction)

### 추상화란?
추상화는 여러 관점에서의 정의가 다른다.

#### 미술에서 추상화
추상화란 단어는 미술에서 파생되어 나온 단어이기에 조사해보았다.
정의 : 대상의 **구체적인 형상을 나타낸 것이 아니라** 점, 선, 면, 색과 같은 순수한 조형 요소로 표현한 미술의 한 가지 흐름이다.

#### 컴퓨터 과학에서 추상화
복잡한 자료, 모듈, 시스템 등으로부터 핵심적인 개념 또는 기능을 간추려 내는 것을 말함

#### 소프트웨어 개발 관점에서 추상화
구체적인 것을 감추고, 전체적인 특성을 들어내는 것을 의미한다.
보통 함수를 기본적인 추상화 방법으로 사용한다.
ex) printf() // 실제 출력에 대해 어떻게 동작하는지 알지 못하지만 무엇을 하는지 알고 사용한다.


### 추상화를 사용해야하는 이유
- 코드의 재사용성
- 가독성 향상
- 생산성 증가
- 에러감소

> 아래 예시 코드를 참고하면

> Ultimate 메서드를 추상화하여 재사용한다.
> attackHammer(), attackGun()을 Ultimate로 통합하였기 때문에 가독성이 증가한다.
> Ultimate 메서드는 궁국기라는 뜻을 포괄하기 때문에 에러를 줄일 수 있다.


#### 추상화 전
```
class Hero {
    public String name;
    Hero (String name) {
        this.name = name;
    }
}

class Reinhardt extends Hero {
    Reinhardt () {
        super("reinhardt");
    }

    public void attackHammer () {
        System.out.println("망치 나가신다!");
    }
}

class McCree extends Hero {
    McCree () {
        super("mccree");
    }
    public void attackGun () {
        System.out.println("석양이 진다. 빵야빵야");
    }
}

------------main

class Main {
    public static void main (String[] args) {
        Reinhardt myReinhardt = new Reinhardt();
        McCree myMcCree = new McCree();

        Main.doUltimate(myReinhardt);
        Main.doUltimate(myMcCree);
    }

    public static void doUltimate (Hero hero) {
        if (hero instanceof Reinhardt) {
            Reinhardt myHero = (Reinhardt)hero;
            myHero.attackHammer();
        }
        else if (hero instanceof McCree) {
            McCree myHero = (McCree)hero;
            myHero.attackGun();
        }
    }
}

```


#### 추상화 후
```
abstract class Hero {
    public String name;
    Hero (String name) {
        this.name = name;
    }

    // 내부 구현체가 없는 추상 메소드를 선언한다.
    public abstract void ultimate ();
}

class Reinhardt extends Hero {
    Reinhardt () {
        super("reinhardt");
    }

    public void ultimate () {
        System.out.println("망치 나가신다!");
    }
}

class McCree extends Hero {
    McCree () {
        super("mccree");
    }
    public void ultimate () {
        System.out.println("석양이 진다. 빵야빵야");
    }
}

-------------main
class Main {
    public static void main (String[] args) {
        Reinhardt myReinhardt = new Reinhardt();
        McCree myMcCree = new McCree();

        Main.doUltimate(myReinhardt);
        Main.doUltimate(myMcCree);
    }

    public static void doUltimate (Hero hero) {
        hero.ultimate();
    }
}
```


### 잘된 추상화의 조건
**강한 응집력과 약한 결합도**
- 타이어의 기능을 구현하는 기능들은 타이어의 기능으로 응집한다.
- 타이어와 핸들은 서로 존재를 모른다.

즉, 타이어끼리, 핸들끼리 비슷비슷한 기능들은 서로서로 뭉치는 것이다.
그리고 서로의 존재는 모르지만 누군가에 의해 각자 재 기능을 하며 자동차라는 기능을 구현하도록 누군가에 의해 통제되고 있는 것이다.
-> 이런 것을 잘구현한 것을 MVC, MVVM 등의 디자인 패턴이라고 함

### 정리
추상화의 개념은 구체적인 형상을 나타낸 것이 아닌 공통되는 핵심적인 개념 또는 기능을 추출하여 하위 시스템과 분리하는 것이다.
이를 잘하기 위해서는 공통되는 핵심적인 개념 또는 기능을 포괄하여 하위 시스템이 어떤 것인지 알지 못하더라도 추상화된 것을 보고
기능을 유추할 수 있어야한다.
