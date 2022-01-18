# Java 구조

## 목차

## 1. Compile vs interpret

## 2. JDK, JRE, JVM

## 3. JVM(Java Virtual Machine)

## 4. GC(Gabage Collector)

* * *
<br>

## Compile vs interpret

컴파일과 인터프릿은 고급 언어로 작성된 원시 코드(source code)를 목적 코드(object code)로 번역하고 실행시키는 방식이며, 프로그램 번역 방식에 따라 구분된다.

<br>

- Compiler
    - 고급언어를 실행 이전 기계어로 해석하는 작업 방식
        
        ⇒ 고급언어로 작성한 코드를 원시코드, 번역된 코드를 목적 코드라고 한다.
        
    - 실행 이전 기계어로 변환하기 때문에 구동 시간이 오래걸린다.
    - 기계어로 변환 이후 하나의 패키지로 매우 빠르게 동작한다.
    - 구동시 코드와 함께 시스템으로 부터 메모리를 할당 받아 사용하게 된다.
    - 실행 이전 이미 번역을 마치고 컴파일 결과물이 기계어로 전환되기 때문에 OS 및 빌드 환경에 종속적이다.
        
        ⇒ 그렇기에 OS 환경에 맞는 호환 라이브러리와 빌드 환경을 구분하여 구축해야 한다.
        
    - Compile 언어의 대표적으로 C, C++ ,Java
    
    <br>

- Interpretor
    - 인터프릿는은 런타임 이후 Row 단위로 해석하며 프로그램을 구동시키는 방식
    - 런타임에 직접 Row 단위로 변환하여 실행시키기 때문에 실행 시간은 느리다.
    - 런타임의 실시간 Debuging 및 코드 수정이 가능하다.
    - 메모리를 별도 할당받아 수행되지 않고 필요시에 할당하여 사용한다.
        
        >⇒ 실제 수행되어야 하는 시점에 코드가 실행되기 때문에 Duck Typing이 가능하다.
        
        <br>

- 컴파일러 vs 인터프리터
    
    
    | 구분 | 컴파일러 | 인터프리터 |
    | --- | --- | --- |
    | 번역 단위 | 전체 | 행(줄) |
    | 목적 프로그램 | 생성함 | 생성하지 않음 |
    | 실행 속도 | 빠름 | 느림 |
    | 번역 속도 | 느림 | 빠름 |
    | 관련 언어 | C, Java | Python, BASIC |

<br>

* * *

<br>

## JDK, JRE, JVM

JDK(Java Development Kit)

>⇒ 자바 개발 도구의 약자이며 JDK에서는 JRE 에서 개발을 위해 필요한 도구(Java, java, visualVM 등)들을 포함한다.

<br>

JRE(Java Runtime Environment)

>⇒ JRE는 자바 실행 환경의 약자이며 JVM이 자바 프로그램을 동작시킬때에 필요한 라이브러리 파일들과 기타 파일들을 가지고 있다

>⇒ JRE는 JVM의 실행 환경을 구현했다고 할 수 있다.

<br>

JVM(Java Virtual Machine)

>⇒ 바이트 코드를 실행하는 주체로, 자바 코드(.java)로부터 만들어지는 자바 바이너리파일(.class)을 실행 할 수 있고 컴파일된 바이너리 코드는 어떤 JVM에서도 동작시킬수 있다.

<br>

* * *

<br>

## JVM(Java Virtual Machine)

JVM은 자바 프로그램을(컴파일된 코드) 실행시키는 가상의 컴퓨터이다.

- JVM 역할
    - 바이너리 코드를 읽는다.
    - 바이너리 코드를 검증한다.
    - 바이너리 코드를 실행한다.
    - 실행환경(Runtime Environment)의 규격을 제공한다. (필요한 라이브러리 및 기타파일)
    
    <br>

- JVM 특징
    - JVM 특징 1) 스택 기반의 가상머신
        - 대표적 컴퓨터 아키텍처인 인텔x86 아키텍처, ARM 아키텍처와 같은 하드웨어가 레지스터 기반으로 동작하는 데 비해 JVM은 스택 기반으로 동작한다.

        <br>

        - 가상 머신의 구현체
            
            가상머신의 구현체는 명세서를 어떻게 구현하냐에 따라 여러 종류가 된다고 한다.
            >=> 일반적으로, 물리적인 CPU에 의해 처리되는 동작을 흉낼 수 있어야 하며, 아래와 같은 컨셉을 가진다고 한다.
            
            <br>

            [가상 머신이라면 구현해야할 컨셉]
            
            - 소스 코드를 VM이 실행가능한 바이트 코드로 변환한다.명령어와 피연산자를 포함하는 데이터구조를 가지고 있어야 한다
            - 함수를 실행하기 위한 콜 스택
            - IP(Instruection Pointer): 다음 실행할 곳을 지정하는 포인터
            - 가상 CPU: 다음 명령어를 패치&명령어를 해석&명령을 실행
            
                >⇒ 위와 같은 명세를 만족하는 가상머신을 구현하는 방법으로 2가지.
            
            <br>

            Stack / Register 기반이 있다.
            
            ***이 둘의 차이점은 피연산자를 저장하고 다시 가져오는 메커니즘이 다르다.***
            
            - Stack 기반 가상머신
                - Java VM,
                - 대다수의 가상머신이 스택 기반
                - 피연산자와 연산 후 결과를 스택에 저장
                - 예를 들어, 아래와 같이 덧셈을 할 경우, 스택구조라서 PUSH & POP이 필요하며 4단계의 명령이 필요하다.
                    
                    ![스크린샷 2022-01-10 오후 5.18.29.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c53fbd4c-e9cb-408b-90a3-7eaa7d1e9da4/스크린샷_2022-01-10_오후_5.18.29.png)
                    
                - 장점: **다음 피연산자의 메모리 위치를 기억할 필요가 없다.**
                    
                    >⇒ SP(stack pointer)가 다음 피연산자의 위치를 나타낸다. 즉 스택에서 POP만 하면 다음 피연산자가 나오기 때문에 피연산자의 메모리를 기억할 필요가 없다.

                   <br>

            - Register 기반 가상머신
                - Lua, Dalvik VM
                - 피연산자가 CPU의 레지스터에 저장
                - PUSH & POP연산자가 없다.
                - 명령어가 피연산자의 위치인 레지스터의 주소를 기억해야 한다.
                
                <br>

                장점 1) 아래와 같이 POP & PUSH 과정이 없기 떄문에 같은 덧셈이라도 하나의 명령으로 충분하다. 때문에 더 빠르다.
                
                ![스크린샷 2022-01-10 오후 5.20.59.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b802703c-4325-4291-97d3-615b8c89b2d9/스크린샷_2022-01-10_오후_5.20.59.png)
                
                <br>

                장점 2) 스택 기반에서는 할 수 없는 명령어 최적화를 적용할 수 있다. 예를 들어, 어떤 연산이 나중에 또 필요할 때, 레지스터에 저장하여 다시 계산하지 않고도 연산 결과를 활용할 수 있다.
                
                <br>

                단점) 스택기반보다 명령어의 길이가 길다. 피연산자의 주소를 명시해줘야 하므로 평균적으로 길 수 밖에 없다.
         
         <br>       

    - JVM 특징 2) 심볼릭 레퍼런스
        - 기본 자료현을 제외한 모든 타입을 명시적인 메모리 주소 기반의 레퍼런스가 아닌 심볼릭 레퍼런스를 통해 참조한다.
        - 심볼릭 레퍼런스란?
            
            >참고하는 클래스의 특정 메모리 주소를 참조 관계로 구성한 것이 아니라, 참조하는 대상의 이름만을 지칭한 것이다. Class 파일이 JVM에 올라가게 되면 Symbolic Reference는 그 이름에 맞는 객체의 주소를 찾아서 연결하는 작업을 수행한다. 그러므로, 실제 메모리 주소가 아니라 이름만을 가진다.
            
            <br>

    - JVM 특징 3) 가비지 컬렉션
        - 클래스 인스턴스는 사용자 코드에 의해 명시적으로 생성되며 가비지 컬렉션에 의해 자동으로 파괴된다.
        
        <br>

    - JVM 특징 4) 기본 자료형을 명확하게 정의하여 플렛폼 독립성 보장
        - C/C++ 등의 전통적인 언어는 플랫폼에 따라 int 형의 크기가 변한다. JVM은 기본 자료형을 명확하게 정의하여 호환성을 유지하고 플랫폼 독립성을 보장한다.
        
        <br>

    - JVM 특징 5) 네트워크 바이트 오더(network byte order)
        - 자바 클래스 파일은 네트워크 바이트 오더를 사용한다. 인텔 x86 아키텍처가 사용하는 리틀 엔디안이나, RISC 계열 아키텍처가 주로 사용하는 빅 엔디안 사이에서 플랫폼 독립성을 유지하려면 고정된 바이트 오더를 유지해야 하므로 네트워크 전송 시에 사용하는 바이트 오더인 네트워크 바이트 오더를 사용한다. 네트워크 바이트 오더는 빅 엔디안이다.
        
        <br>

        - 바이트 오더란?
            
            메모리 주소를 부여하는 방식으로, 점점 크게 부여하거나 점점 작게 부여하는 방식을 의미한다.  대표적인 예시로 빅엔디안, 리틀엔디안이라는 것이 있고, 이는 시스템이 내부적으로 데이터를 표현하는 방법을 의미한다.
            
            <br>

        - 네트워크 바이트 오더란?
            
            빅엔디안을 의미하고, 데이터가 상위 바이트부터 메모리에 적재하여, 가상 최상위 바이트(0A)가 가장 낮은 메모리 주소에 저장되는 방식을의미합니다.
            
            <br>


- 자바 프로그램 실행 과정
    
    ![스크린샷 2022-01-10 오후 5.11.39.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b859d0d7-7c9f-4a94-9ccc-d36ac59745de/스크린샷_2022-01-10_오후_5.11.39.png)
    
    1. 작성한 자바 소스(java source), 즉 확장자가 .java인 파일을 자바 컴파일러(Java Compiler)를 통해 자바 바이트 코드(Java Byte Code)로 컴파일 한다.
    2. 컴파일된 바이트 코드를 JVM 클래스 로더(Class Loader)에게 전달한다.
    3. 클래스 로더는 동적 로딩(Dynamic Loading)을 통해 필요한 클래스들을 로딩 및 링크하여 런타임 데이터 영역(Runtime Data area), 즉 JVM 메모리에 올린다.
    4. 실행 엔진(Execution Egine)은 JVM메모리에 올라온 바이트 코드들을 명령어 단위로 하나씩 가져와 실행한다.


    <br>
    
- JVM 의 서브 시스템 구분
    
    ![스크린샷 2022-01-10 오후 5.53.10.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/71e6ad9d-d3cc-4552-a2d1-4bdbfdec3135/스크린샷_2022-01-10_오후_5.53.10.png)
    
    - 클래스 로더
    - 런타임 데이터 영역
    - 실행 엔진
        
        ⇒ 하나씩 확인
        
        <br>

### 클래스 로더(Class Loader)

클래스 로더

'.class' 바이트 코드를 읽어 들여 class 객체를 생성하는 역할을 담당한다.

즉, 클래스가 요청될 때 class파일로부터 바이트 코드를 읽어 메모리로 로딩하는 역할

자바 클래스들은 한 번에 모든 클래스가 메모리에 올라가지 않는다.

각 클래스들은 필요할 때 애플리케이션에 올라가게 되며, 이 작업을 클래스로더가 해주게 된다.


<br>


- 클래스 로더 특징
    - 클래스 로더 특징 1) **계층구조 ( Hierarchical )**
        
        ![스크린샷 2022-01-10 오후 5.55.44.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d998f004-e0dc-4a72-9c71-265fa4d9a610/스크린샷_2022-01-10_오후_5.55.44.png)
        
        >⇒ 클래스 로더는 단순히 하나로 이루어져 있지 않다. 
        
        >⇒ 위의 그림 처럼 여러 클래스 로더 끼리 부모-자식 관계를 이루어 계층적 구조로 되어있다.
        
        - 부트스트랩 클래스 로더
            - 최상위 클래스로더로 유일하게 JAVA가 아니라 네이티브 코드로 구현되어 있다.
            - JVM이 실행될때 같이 메모리에 올라간다.
            - Object 클래스를 비롯 Java API들을 로드한다.

            <br>

        - 익스텐션 클래스 로더
            - 기본 Java API를 제외한 확장 클래스들을 로드한다.
                
                ( 다양한 보안 확장 기능 로드 )
            
            <br>

        - 시스템 클래스 로더
            - 부트 스트랩과 익스텐션 클래스로더가 JVM 자체의 구성요소들을 로드한다면, 시스템 클래스 로더는 어플리케이션 클래스들을 로드한다.
            - 사용자가 지정한 $CLASSPATH 내의 클래스들을 로드한다.
            
            <br>

        - 사용자 정의 클래스 로더
            - 어플리케이션 사용자가 직접 코드상에서 생성하여 사용하는 클래스 로더.
        
        <br>

        >⇒ 웹 어플리케이션 서버 (Web Application Server : WAS)와 같은 프레임 워크는 웹 어플리케이션, 엔터프라이즈 어플리케이션이 서로 독립적으로 동작하기 위해 사용자 정의 클래스 로더들을 사용하여 클래스 로더의 위임 모델을 통해 어플리케이션의 독립성을 보장한다.
        
        >⇒ 따라서 WAS의 클래스 로더 구조는 WAS 벤더마다 조금씩 다른 형태의 계층 구조를 사용하고 있다.
        
        <br>

    - 클래스 로더 특징 2) **Delegation 원칙**
        
        ![스크린샷 2022-01-10 오후 6.51.50.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9ddf4740-3545-4c57-8be3-68cd3265940d/스크린샷_2022-01-10_오후_6.51.50.png)
        
        어떠한 클래스 파일을 로딩할 때, 해당 로딩 요청이 부모 클래스 로더들로 거슬러 올라가 BootstrapClassLoader(최상위 ClassLoader)에 다다른 후 그 밑으로 로딩 요청을 수행
        
        >⇒ 로드를 요청받은 클래스 로더는 다음 순서대로 요청 받은 클래스가 있는지 확인한다.
        
        1. 클래스 로더 캐시
        2. 상위 클래스 로더
        3. 자기 자신
        
        <br>

        이전 로드된 클래스인지 클래스 로더 캐시를 확인
        
        >⇒ 없으면 상위 클래스 로더를 하나씩 거슬러 올라가며 확인
        
        >⇒ 이때 올라가는 도중 클래스를 발견하더라도 부트 스트랩 클래스 로더까지 꼭 확인해서 부트 스트랩 클래스 로더에 해당 클래스가 존재하면 부트스트랩 클래스 로더에 있는 클래스를 로드한다.
        
        >⇒ 만약 부트스트랩 클래스 로더에도 해당 클래스가 없으면 로드를 요청 받은 클래스 로더가 파일 시스템에서 해당 클래스를 찾는것으로 마무리 ⇒ 없으면 예외가 남
        
        <br>
    
    - 클래스 로더 특징 3) **가시성 제한( Visibility )**
        
        클래스 로더가 클래스 로드를 요청받았을때 위임 모델에 의해 클래스 로더 캐시를 확인하고 없으면 상위 클래스 로더를 확인하는데
        
        >⇒ 이때 클래스 로더에 있는 클래스는 확인이 불가능한 특성이 바로 가시성 제한이다.
        
        >⇒ class Loader는 일종의 scope rule을 제공하는데,
        
        Child Class Loader는 Parent Class Loader의 Class를 Delegation load request를 이용하여 찾을 수 있지만,
        
        그 반대로 Parent가 Child가 Loading한 Class를 사용할 수는 없다.
        
        <br>

    - 클래스 로더 특징 4) **언로드 불가 ( Unload Impossibility )**
        
        클래스를 로드하는 것은 가능하지만 반대로 언로드 하는것은 불가능하다는 특성
        
        >⇒ 클래스 로더에 의해 로딩된 클래스들은 JVM 상에서 삭제할 수 없다
        
        <br>

    - 클래스 로더 특징 5) **이름 공간(Name Space)**
        
        네임 스페이스는 각 클래스 로더들이 가지고 있는 공간으로써 로드된 클래스를 보관하는 공간으로 클래스 로드할 때 위임 모델을 통해 상위 클래스 로더들을 확인하는데 그 때 확인하는 공간이 바로 네임 스페이스 이다.
        
        <br>

- **클래스 로드 과정**
    
    ![스크린샷 2022-01-10 오후 6.19.14.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/63479ff7-ac43-47e4-aa28-d3c3e90b2677/스크린샷_2022-01-10_오후_6.19.14.png)
    
    로딩 단계로부터 생성된 바이너리 데이터를 JVM의 런타임 데이터로 합치는 과정
    
    이 단계는 3가지 단계로 나뉜다
    
    <br>

    ### **Loading**
    
    - .class 파일을 읽어 내용에 따라 적절한 바이너리 데이터를 생성하고, 메서드 영역에 저장
        - 메서드 영역: 추후에 jvm의 구성 중, 데이터 영역에서 다룰 내용으로 자세한 설명은 생략  Type정보(class, interface, enum) Method, 변수, FQCN(클래스가 속한 패키지명을 모두 포함한 이름)이 저장되는 영역
    
    <br>

    - 앞에서 설명한, ClassLoader의 계층구조 및 Delegation원칙에 따라서 Root ClassLoader에서부터 load가 필요한 class를 찾는다
    
    <br>

    - 로딩이 끝나면, Type 정보로 저장된 Class Type Object를 생성하여 Heap 영역에 저장
    
    <br>

    <details>
    <summary> 클래스 로드 타임  </summary>
    
    - 클래스 로드 타임
        
        <br>

        ClassLoader에서 **Class를 Load 하는 시점**에 따라
        
        Load-Time Dynamic Loading과, Run-Time Dynamic Loading으로 구분된다
        
        <br>

        ### **동적인 클래스 로딩 (dynamic loading)**
        
        런타임 시 JVM이 동적으로 참조할 클래스 로딩. JVM이 클래스에 대한 정보를 갖고 있지 않으므로 즉, 자바는 동적으로 클래스를 읽어온다
        
        <br>

        ### **Load Time Dynamic Loading**
        
        하나의 Class를 Loading 하는 과정에서 이와 관련된  Class들을 한꺼번에 Loading 한다. 
        
        ```java
        public class Hello { 
        	public static void main(String[] args) { 
        		System.out.println(“Hello Java”);  
        	}  
        }
        ```
        
        위의 예제를 보면 Hello라는 Class에서 String객체를 Parameter로 사용하고 있고System객체를 호출하고 있다 이 경우 Hello Class가 ClassLoader에 의해 JVM내로 Loading 될 때
        
        java.lang.String Class와 java.lang.System Class가 동시에 Loading이 이루어진다.
        
        Hello클래스 실행 시, 부트스트랩 클래스로더 생성> Object 클래스 읽음> Hello.class파일 읽음> Hello 클래스 로딩 시
        
        java.lang.String Class와 java.lang.System 클래스 필요즉, 하나의 클래스(Hello)를 로딩하는 과정에서 동적으로 클래스를 로딩하는 것
        
        <br>

        ### **Runtime Dynamic Loading**
        
        객체를 참조하는 순간에 동적으로 Loading 하는 방식이다
        
        => Class.forName()이 실행되기 전까지는 Hello클래스에서 어떤 클래스를 참조하는지 알 수 없다
        
        => Hello클래스의 main() 메서드가 실행되고 Class.forName(args[0])을 호출하는 순간에
        
        => args [0]에 해당하는 클래스를 읽어온다즉, 클래스를 로딩할 때가 아닌 코드를 실행하는 순간에 클래스를 로딩하는 것.
        
        ```java
        public class Hello {  
        	public static void main(String[] args) {  
        		Class c1 = Class.forName(args[0]); 
        	}  
        }
        ```
        
        <br>
    </div> 
    </details>
    
    ### **Linking**
    
    로딩 단계로부터 생성된 바이너리 데이터를 JVM의 런타임 데이터로 합치는 과정
    
    이 단계는 3가지 단계로 나뉜다
    
    - Verifying
        - .class 파일의 정확성을 보장하기 위한 단계
        - 파일이 적절한 포맷인지, 유효한 컴파일러에 의해 생성되었는지를 확인
        - 검증이 실패한 경우 런타임 에러 (java.lang.VerifyError) 발생
    
    <br>
    
    - Preparing
        - 클래스 변수(static 변수)와 기본값에 필요한 메모리를 준비하는 과정
    
    <br>
    
    - Resolving
        - 심볼릭 메모리 레퍼런스를 메모리 영역에 존재하는 실제 레퍼런스로 교체
        - optional 한 단계 ( 설정에 따라서 동작 유무가 정해짐)
    
    <br>


    ### **Initializing**
    
    - 윗 단계인 Linking의 Preparing 단계에서 확보한 메모리 영역에 static 값을 할당
    - 클래스의 static 값들을 할당
    
    <br>

- **런타임 데이터 영역**
    
    JVM은 Java **컴파일러**가 컴파일한 ByteCode를 **ClassLoader**를 이용해 메모리(**RuntimeDataArea**)에 실행 가능한 상태로 적재한다.
    
    >⇒ RuntimeDataArea는 JVM이 프로그램을 수행하기 위해 OS로부터 별도로 할당받은 메모리 영역이다.
    
    ![스크린샷 2022-01-10 오후 6.55.45.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/89521b82-a845-43c4-8987-ff5c2b8c7402/스크린샷_2022-01-10_오후_6.55.45.png)
    
    Runtime Data Area는 PC Registers, JVM Stacks, Method Area, Heap, Native Method Stacks으로 구성된다.
    
    >⇒ 이 중 PC Register, JVM Stack, Native Method Stack은 각 스레드 별로 존재한다.
    
    각 쓰레드마다 서로 다른 메모리가 할당된다.
    
    <br>

    ### **PC Register**
    
    - 현재 수행 중인 JVM 명령의 주소
    - Thread가 생성될 때마다 생기는 공간으로 Thread가 어떠한 명령을 실행하게 될지에 대한 부분을 기록
    - JVM은 Stacks-Base 방식으로 작동하는데, JVM은 CPU에 직접 Instruction을 수행하지 않고, Stack에서 Operand를 뽑아내 이를 PC Register에 저장
    
    <br>

    ### **JVM Stack**
    
    - 각각 스레드가 시작될 때 생성
    - Stack Frame을 저장하는 스택
    - 메서드가 수행될 때마다 하나의 스택 프레임이 생성되어 해당 스레드의 JVM stack에 추가되고메서드가 종료되면 스택 프레임이 제거
        - Stack Frame은 Local Variable Array, Operand Stack, Constant Pool의 레퍼런스를 갖는다.
    
    <br>

    ### **Native Method Stack**
    
    - 자바 외의 언어로 작성된 네이티브 코드를 위한 스택
    - Java Native Interface를 통해 호출하는 C/C++ 코드를 수행하기 위한 스택
    
    <br>

    ### Heap & Method Area
    
    - Heap과 Method Area는 각각의 스레드가 메모리를 공유한다.
    - Method Area는 클래스 데이터를 위한 공간이라면 Heap 영역이 객체를 위한 공간
    - Method Area는 변하지 않는 Constant 값들이 존재하기 때문에 각 스레드들이 메모리를 공유하더라도 문제가 없다.
    - Heap은 Garbage Collection의 대상이다.
    
    <br>

    **Method Area**
    
    모든 Thread들이 공유하는 메모리 영역
    
    프로그램 실행 중 클래스가 사용되면 JVM은 해당 클래스 파일을 읽어서 분석하여 클래스의 인스턴스 변수, 메서드 코드 등을 Method Area에 저장한다
    
    ![스크린샷 2022-01-10 오후 7.00.14.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5dab5a46-3b6a-4cbc-aeb8-231a904ae7de/스크린샷_2022-01-10_오후_7.00.14.png)
    
    - Type information
        - Type은 클래스와 인터페이스를 통칭하는 것으로 이해하면 된다
        - 클래스와 관련한 모든 정보
    
    <br>

    - Constant Pool
        - 문자열 상수와 같은 리터럴 상수
        - 메서드와 필드에 대한 모든 Reference를 담고 있음 (Symbolic Reference) 즉, 어떤 메서드나 필드를 참조할 때, JVM은 런타임 상수 풀을 통해 메소드나 필드의 실제 메모리 상 주소를 참조하여 중복을 막는 역할
    
    <br>

    - Field Information
        - Class 멤버 변수의 이름 및 데이터 타입, 접근 제어자에 대한 정보를 저장
    
    <br>

    - Method Information
        - Class 멤버 메서드의 이름, 리턴 타입, 매개변수, 접근제어자에 대한 정보
    
    <br>

    - Class Variable
        - static으로 선언되는 모든 클래스 변수
        - 이 변수는 모든 Instance에서 접근 가능하기 때문에 동기화 이슈가 발생할 수 있음Class Variable을 final로 선언할 경우에는 Constant Pool에 저장
    
    <br>

    - Reference to ClassLoader & class Class
        - 특정 클래스를 로드한 클래스로더의 정보를 관리
        - Class object와 서로 양방향 접근을 하기 대문에 Class Object에 대한 참조 주소 값을 가진다
    
    <br>

    - Method Table
        - Class의 Method에 대한 Direct Reference를 가진다고 보면 된다
        - Method Table을 이용해 Super Class에서 상속된 Method의 Reference까지 확인이 가능
    
    <br>    
    
    **Heap**
    
    - JVM이 관리하는 프로그램 상에서 데이터를 저장하기 위해 런타임 시 동적으로 할당하여 사용하는 영역
    - new 연산자로 생성된 객체 또는 인스턴스와 배열을 저장
    - 힙 영역에서 생성된 객체와 배열은 스택 영역의 변수나 다른 객체의 필드에서 참조
    - 참조하는 변수나 필드가 없다면 의미 없는 객체가 되어 GC의 대상이 된다
    
    >⇒ Heap의 구조는 JVM을 구현한 vender마다 다르다.
    
    ⇒ 대표적으로 Oracle의 Hotspot JVM Heap구조를 살펴보자
    
    <br>

    ![스크린샷 2022-01-10 오후 7.02.29.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/75652811-b876-4536-9025-1daeaa8433ef/스크린샷_2022-01-10_오후_7.02.29.png)
    
    GC가 발생하는 영역이며, 참조(레퍼런스)가 없는 객체들은 GC과정을 통해 메모리에서 제거된다.
    
    >=> Heap 영역 또한 내부적으로 여러 영역으로 나뉘어 있으며, 이는 객체의 lifecycle 및 GC와 연관
    
    <br>

    **Young Generation** : Eden 영역과 Survivor영역으로 구성
    
    - Eden 영역
        - Object(객체)가 최초로 Heap에 할당되는 장소
        - 만일 Eden 영역이 가득 찼다면, Object의 참조 여부를 파악하고 LiveObject는 Suvrvior 영역으로 넘긴다
        - 모든 LiveObject가 Survivor영역으로 넘어간다면 Eden영역을 청소 (참조가 사라진 GarbageObject)
    
    <br>

    - Survivor 영역
        - Survivor1 과 Survivor2로 구성
        - Eden영역에 살아남은 Object들이 잠시 머무르는 곳이며 LiveObject들은 하나의 Survivor 영역만 사용
        - 이러한 전반적인 과정을 Minor GC
    
    <br>

    **Old Generation**
    
    - Survivor1 또는 Survivor2 영역을 왔다 갔다 하는 과정에서 끝까지 살아남은 객체만이 Old 영역으로 이동
    - 보통 Old 영역은 Young 영역보다 크게 할당하며, 이러한 이유로 Old 영역의 GC는 Young 영역보다 적게 발생
    - Old Generation의 메모리가 충분하지 않으면 해당 영역에서 GC가 발생하는데 이를 Major GC
    
    <br>

    **Permanent Generation**
    
    - Class의 Meta정보나 Method의 Meta정보, Static변수와 상수 정보들이 저장되는 공간, 흔히 메타데이터 저장 영역
    - 객체의 생명 주가기 길다고 판단되는 객체들을 이 영역에 할당하여 GC대상에서 제외를 하기 위해서 만들어진 영역
    - 주로 자바의 Class 객체들이나 문자열에 속한 String 객체들이 위치
    
    <br>

    > 대략적인 설명만으로는 위에서 설명한 Method Area와 겹친다는 생각이 든다
    
    > 그래서 해당 내역을 찾아본 결과, Permanent Generation은 Method Area를 포함하고 있다
    
    > Permanent Gen이 부족할 경우 `java.lang.OutOfMemoryError : permGen space` 에러가 남
    
        에러 요인
    
        - static Object의 잘못된 사용
        - Class, Method Meta data의 증가
    
         ⇒ 이러한 문제를 해결 위해 Java 8 버전부터 Permanent Generation이 존재하지 않고 해당 영역을 MetaSpace로 대체함
    
    - Static Object 및 상수화된 String Object를 heap 영역으로 옮김으로써, 최대한 GC가 될 수 있도록 수정
    
    <br>

    - Metaspace 영역은 Heap이 아닌 Native 메모리 영역으로 취급(Heap 영역은 JVM에 의해 관리된 영역이며, Native 메모리는 OS 레벨에서 관리하는 영역으로 구분)
        
        ![스크린샷 2022-01-10 오후 7.28.33.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0186afc1-967d-4860-a4bd-8d44b921b3cc/스크린샷_2022-01-10_오후_7.28.33.png)
        
    <br>
    
- **실행 엔진(Execution Engine)**
    - 실행 엔진은 클래스 로더를 통해 런타임 데이터 영역에 배치된 바이트 코드를 명령어 단위로 읽어 실행한다
    - 바이트 코드의 각 명령어는 1바이트 크기의 OpCode(Operation Code)와 추가 피연산자로 구성되어 있다.
    - 실행 엔진은 하나의 OpCode를 가져와 피연산자와 작업 수행하고 다음 OpCode를 수행하는 식으로 동작
    
        >⇒ 이 수행 과정에서 실행 엔진은 바이트 코드를 기계가 실행할 수 있는 형태로 변경하는데 다음 두 가지 방식으로 동작한다.
    
    <br>

    1. 자바 인터프리터 : 바이트 코드 명령어를 하나씩 읽어서 해석하고 실행합니다. 하나하나의 실행은 빠르나, 전체적인 실행 속도가 느리다는 단점을 가집니다.
    
    <br>

    2. JIT 컴파일러(Just-In-Time Compiler) : 인터프리터의 단점을 보완하기 위해 도입된 방식으로 바이트 코드 전체를 컴파일하여 바이너리 코드로 변경하고 이후에는 해당 메서드를 더이상 인터프리팅 하지 않고, 바이너리 코드로 직접 실행하는 방식입니다. 하나씩 인터프리팅하여 실행하는 것이 아니라 바이트 코드 전체가 컴파일된 바이너리 코드를 실행하는 것이기 때문에 전체적인 실행속도는 인터프리팅 방식보다 빠릅니다.
    
    <br>

JVM 정리)

![스크린샷 2022-01-10 오후 9.03.47.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fd12897b-120a-4046-9149-a71b2644c6d6/스크린샷_2022-01-10_오후_9.03.47.png)

1. **작성한 자바 소스(.java)를 자바 컴파일러를 통해 자바 바이트 코드(.class)로 컴파일합니다.**
    - 자바 바이트 코드 : JVM이 이해할 수 있는 코드로 아직 컴퓨터는 읽을 수 없는 반기계어입니다. 자바 바이트 코드의 각 명령어는 1바이트 크기의 Opcode와 추가 피연산자로 이루어져 있습니다.
    
    <br>

2. **컴파일된 바이트코드를 JVM의 클래스 로더에게 전달합니다.**
    - 클래스 로더 세부 동작
        - 로드 : 클래스 파일을 가져와서 JVM의 메모리에 로드합니다.
        - 검증 : 자바 언어 명세(Java Language Specification) 및 JVM 명세에 명시된 대로 구성되어 있는지 검사합니다.
        - 준비 : 클래스가 필요로 하는 메모리를 할당합니다. (필드, 메서드, 인터페이스 등등)
        - 분석 : 클래스의 상수 풀 내 모든 심볼릭 레퍼런스를 다이렉트 레퍼런스로 변경합니다.
        - 초기화 : 클래스 변수들을 적절한 값으로 초기화합니다. (static 필드)
    
    <br>

3. **JVM의 클래스 로더는 동적 로딩(Dynamic Loading)을 통해 필요한 클래스들을 로딩 및 링크하여 런타임 데이터 영역(Runtime Data area), 즉 JVM의 메모리에 올립니다.**

<br>

4. **실행엔진(Execution Engine)은 JVM 메모리에 올라온 바이트 코드들을 명령어 단위로 하나씩 가져와서 실행합니다. 이때, 실행엔진은 2가지 방식으로 동작할 수 있습니다.**
    - 자바 인터프리터 : 바이트 코드 명령어를 하나씩 읽어서 해석하고 실행합니다. 하나하나의 실행은 빠르나, 전체적인 실행 속도가 느리다는 단점을 가집니다.
    - JIT 컴파일러(Just-In-Time Compiler) : 인터프리터의 단점을 보완하기 위해 도입된 방식으로 바이트 코드 전체를 컴파일하여 바이너리 코드로 변경하고 이후에는 해당 메서드를 더이상 인터프리팅 하지 않고, 바이너리 코드로 직접 실행하는 방식입니다. 하나씩 인터프리팅하여 실행하는 것이 아니라 바이트 코드 전체가 컴파일된 바이너리 코드를 실행하는 것이기 때문에 전체적인 실행속도는 인터프리팅 방식보다 빠릅니다.

<br>

* * *

<br>

## GC(Garbage Collector)

## Abstract

C/C++ 프로그래밍을 할 때 메모리 누수(Memory Leak)를 막기 위해 객체를 생성한 후 사용자하지 않는 객체의 메모리를 프로그래머가 직접 해제 해주어야 했다.

>⇒  하지만, JAVA에서는 JVM(Java Virtual Machine)이 구성된 JRE(Java Runtime Environment)가 제공되며, 그 구성 요소 중 하나인 Garbage Collection(이하 GC)이 자동으로 사용하지 않는 객체를 파괴한다.

<br>

GC에 대해서 알아보기 전에 'stop-the-world'라는 용어를 알아야한다.

>⇒  'stop-the-world'란, GC를 실행하기 위해 JVM이 애플리케이션 실행을 멈추는 것

>⇒ 어떤 GC 알고리즘을 사용하더라도 'stop-the-world'는 발생하게 되는데, 대개의 경우 GC 튜닝은 이 'stop-the-world' 시간을 줄이는 것이라고 한다.

<br>

GC를 해도 더이상 사용 가능한 메모리 영역이 없는데 계속 메모리를 할당하려고 하면, OutOfMemoryError가 발생하여 WAS가 다운될 수도 있다.

>⇒  행(Hang) 즉, 서버가 요청을 처리 못하고 있는 상태가 되는 것.

>⇒ 따라서 규모 있는 JAVA 애플리케이션을 효율적으로 개발하기 위해서는 GC에 대해 잘 알아야한다.

<br>

## Garbage Collection

C/C++ 언어와 달리 자바는 개발자가 명시적으로 객체를 해제할 필요가 없습니다. 자바 언어의 큰 장점이기도 합니다. 사용하지 않는 객체는 메모리에서 삭제하는 작업을 GC라고 부르며 JVM에서 GC를 수행합니다.

기본적으로 JVM의 메모리는 총 5가지 영역(class, stack, heap, native method, PC)으로 나뉘는데, **GC는 힙 메모리만 다룹니다.**

<br>

일반적으로 다음과 같은 경우에 GC의 대상이 됩니다.

1. 객체가 NULL인 경우 (ex. String str = null)
2. 블럭 실행 종료 후, 블럭 안에서 생성된 객체
3. 부모 객체가 NULL인 경우, 포함하는 자식 객체

>=> GC는 Weak Generational Hypothesis 에 기반합니다. 

<br>

### GC의 메모리 해제 과정

1. Marking
    
    ![스크린샷 2022-01-10 오후 9.08.19.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eb84aa6b-7b7f-42bb-8d51-1e62ec0c3dc5/스크린샷_2022-01-10_오후_9.08.19.png)
    
    프로세스는 마킹을 호출합니다. 이것은 GC가 메모리가 사용되는지 아닌지를 찾아냅니다. 참조되는 객체는 파란색으로, 참조되지 않는 객체는 주황색으로 보여집니다. 모든 오브젝트는 마킹 단계에서 결정을 위해 스캔되어집니다. 모든 오브젝트를 스캔하기 때문에 매우 많은 시간을 소모하게 됩니다.
    
    <br>

2. Normal Delection
    
    ![스크린샷 2022-01-10 오후 9.08.54.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/96e08e1d-50cb-452d-92a3-ed14b90dcda3/스크린샷_2022-01-10_오후_9.08.54.png)
    
    참조되지 않는 객체를 제거하고, 메모리를 반환합니다. 메모리 Allocator는 반환되어 비어진 블럭의 참조 위치를 저장해 두고 새로운 오브젝트가 선언되면 할당되도록 합니다.
    
    <br>

3. Compacting
    
    ![스크린샷 2022-01-10 오후 9.09.38.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/272e3f73-2334-4108-8d5c-8c5cac6ad348/스크린샷_2022-01-10_오후_9.09.38.png)
    
    1. 퍼포먼스를 향상시키기 위해, 참조되지 않는 객체를 제거하고 또한 남은 참조되어지는 객체들을 묶습니다. 이들을 묶음으로서 공간이 생기므로 새로운 메모리 할당 시에 더 쉽고 빠르게 진행 할 수 있습니다.
    
    <br>

<br>

## Weak Generational Hypothesis

신규로 생성한 객체의 대부분은 금방 사용하지 않는 상태가 되고, 오래된 객체에서 신규 객체로의 참조는 매우 적게 존재한다는 가설입니다.

이 가설에 기반하여 자바는 Young 영역과 Old 영역으로 메모리를 분할하고, 신규로 생성되는 객체는 Young 영역에 보관하고, 오랫동안 살아남은 객체는 Old 영역에 보관합니다.

<br>

### Generational Garbage Collection

![스크린샷 2022-01-10 오후 9.11.05.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1d4e951b-bfe7-49b1-b533-408f6f197ff6/스크린샷_2022-01-10_오후_9.11.05.png)

- Young 영역(Yong Generation 영역)
    
    새롭게 생성한 객체의 대부분이 여기에 위치합니다. 대부분의 객체가 금방 접근 불가능 상태가 되기 때문에 매우 많은 객체가 Young 영역에 생성되었다가 사라집니다. 이 영역에서 객체가 사라질때 **Minor GC** 가 발생한다고 말합니다.
    
    <br>

- Old 영역(Old Generation 영역)
    
    접근 불가능 상태로 되지 않아 Young 영역에서 살아남은 객체가 여기로 복사됩니다. 대부분 Young 영역보다 크게 할당하며, 크기가 큰 만큼 Young 영역보다 GC는 적게 발생합니다. 이 영역에서 객체가 사라질 때 **Major GC(혹은 Full GC)** 가 발생한다고 말합니다.
    
    <br>

- Permanet 영역
    
    Method Area라고도 합니다. JVM이 클래스들과 메소드들을 설명하기 위해 필요한 메타데이터들을 포함하고 있습니다. JDK8부터는 PermGen은 Metaspace로 교체됩니다.
    
<br>

### Generational Garbage Collection 과정

1. 어떠한 새로운 객체가 들어오면 Eden Space에 할당됩니다.
    
    ![스크린샷 2022-01-10 오후 9.13.10.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5e7b86f8-2f79-4846-a3b9-8b4a692a528d/스크린샷_2022-01-10_오후_9.13.10.png)
    
    <br>

1. Eden Space가 가득차게 되면, minor garbage Collection이 시작됩니다.
    
    ![스크린샷 2022-01-10 오후 9.13.58.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/80b18a83-a3a3-41d6-86bb-c66f90f6cc40/스크린샷_2022-01-10_오후_9.13.58.png)
    
    <br>

1. 참조되는 객체들은 첫 번째 survivor(S0)로 이동되어지고, 비 참조 객체는 Eden space가 clear 될 때 반환됩니다.
    
    ![스크린샷 2022-01-10 오후 9.14.23.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a82c1f27-7b4f-4fbd-a6d9-ed06dab8a3b2/스크린샷_2022-01-10_오후_9.14.23.png)
    
    <br>

1. 다음 minor GC 때, Eden space에서는 같은 일이 일어납니다. 비 참조 객체는 삭제되고 참조 객체는 survivor space로 이동하는 것 입니다.
    
    >⇒ 하지만 이 케이스에서 참조 객체는 두 번째 survivor space로 이동하게 됩니다. 또한 최근 minor GC에서 첫 번째 survivor space로 이동된 객체들도 age가 증가하고 S1 공간으로 이동하게 됩니다. 한번 모든 surviving 객체들이 S1으로 이동하게 되면 S0와 Eden 공간은 Clear 됩니다. 
    
    >⇒ 주의해야할 점은 이제 우리는 다른 aged 객체들을 서바이버 공간에 가지게 되었다는 것입니다.
    
    ![스크린샷 2022-01-10 오후 9.15.25.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/533f1c17-34a2-44a6-9031-e337e53f7c2e/스크린샷_2022-01-10_오후_9.15.25.png)
    
    <br>

2. 다음 minor GC 때, 같은 과정이 반복 됩니다. 그러나 이 번엔 survivor space들은 switch 됩니다. 참조되는 객체들은 S0로 이동합니다. 살아남은 객체들은 aged되죠. 그리고 Eden과 S1 공간은 Clear 됩니다.
    
    ![스크린샷 2022-01-10 오후 9.16.59.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8a2c6164-5636-479b-afa3-de91418684cc/스크린샷_2022-01-10_오후_9.16.59.png)
    
    <br>

3. 아래 그램은 promotion을 보여줍니다. minor GC 후 aged 오브젝트들이 일정한 age threshold(문지방)을 넘게 되면 그것들은 young generation에서 old로 promotion 되어집니다. 여기서는 8을 예로 들었습니다.
    
    ![스크린샷 2022-01-10 오후 9.17.58.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a317dab3-d0ae-45c1-a853-8047788bff62/스크린샷_2022-01-10_오후_9.17.58.png)
    
    <br>

1. minor GC가 계속되고 계속해서 객체들이 Old Generation으로 이동됩니다.
    
    ![스크린샷 2022-01-10 오후 9.19.15.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/545d931f-ed7c-4fca-a9b9-daf5a8d70414/스크린샷_2022-01-10_오후_9.19.15.png)
    
    <br>

1. 아래 그림은 전 과정을 보여주고 있습니다. 결국 major GC가 old Generation에 시행되고, old Generation은 Clear 되고, 공간이 Compact 되어집니다.
    
    ![스크린샷 2022-01-10 오후 9.19.52.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8c5b072c-5bf7-4526-8d92-8d6fd100f97c/스크린샷_2022-01-10_오후_9.19.52.png)
    

    <br>

[ Major GC 동작방식 ]

Yong 영역에서 오래 살아남은 객체는 → old 영역으로 promotion된다.

객체들이 계속 promotion되어 old영역에 메모리가 부족하게 되면 Major GC가 발생하게 된다. 

Young 영역은 일반적으로 Old 영역보다 크키가 작기 때문에 GC가 보통 0.5초에서 1초 사이에 끝난다. 

>⇒ 그렇기 때문에 Minor GC는 애플리케이션에 크게 영향을 주지 않는다. 

>⇒ 하지만 Old 영역은 Young 영역보다 크며 Young 영역을 참조할 수도 있다. 

>⇒ 그렇기 때문에 Major GC는 일반적으로 Minor GC보다 시간이 오래걸리며, 10배 이상의 시간을 사용한다.

<br>

|  | minor GC | major GC |
| --- | --- | --- |
| 대상 | Yong generation | Old Generation |
| 실행 시점 | Eden 영역이 꽉 찬경우 | Old 영역이 꽉 찬 경우 |
| 실행 속도 | 빠르다 | 느리다 |

<br>

>참고)

>GC에는 다양한 알고리즘이 사용되어지고 잇다.

>⇒ 나중에 알아보자.

# 참고

[ 함수형 프로그래밍 참고 자료](https://warpgate3.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%BD%94%EB%93%9C%EB%A1%9C-%EB%B3%B4%EB%8A%94-%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-Functional-Programming-in-Java)

[JVM 참고자료](https://jeong-pro.tistory.com/148) 

[JVM 참고자료](https://steady-coding.tistory.com/305) 

[JVM 참고자료](https://steady-snail.tistory.com/67) 

[jar, war 차이 참고](https://swk3169.tistory.com/181) 