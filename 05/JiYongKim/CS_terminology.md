# CS 용어 정리
## 목차

## 1. DP(Dynamic Programming)

## 2. 동기/비동기, 블로킹/논블로킹

## 3. 동시성(Concurrency), 병렬성(Parallelism)

## 4. CPU 코어와 스레드

## 5. 프로세스/스레드 생성비용

## 6. 메모리 계층 구조

## 7. HTTP 버전별 특징

## 8. Exponential Back Off Retry

## 9. 브라우저에 Domain 주소 입력시
* * *
<br>

## DP(Dynamic Programming)

<br>

DP, 다이나믹 프로그래밍( = 동적 계획법)은 기본적인 아이디어로

>⇒  하나의 큰 문제를 여러 개의 작은 문제로 나누어 그 결과를 저장하고 다시 큰 문제를 해결할때 사용하는 것

>⇒ 특정 알고리즘이 아닌 **문제 해결 패러다임**으로 볼 수 있다.

 

- 주요 개념
    
    **큰 문제를 작은 문제로 쪼개어 그 답을 저장해두고 재활용한다.**
    
    <br>

- 사용하는 이유?
    
    일반 적 재귀를 단순히 사용할 때 동일한 작은 문제들이 여러번 반복 되어 비효율적인 계산이 될 수 있다.
    
    >⇒ 이를 해결하고자 동적 계획법을 통해 개선하여 문제 해결하기 위함에 있다.
    
    <br>

- 예시
    
    <img width="488" alt="피보나치" src="https://user-images.githubusercontent.com/81874493/149670293-3fca44ed-b2b3-4f48-9706-9b312358d40b.png">

    - 피보나치 수열을 재귀를 통해 구성할때
        - `fibo(4)`의 연산이 두 번
        - `fibo(3)`의 연산이 세 번
        
        ⇒ 동일 연산이 여러번 진행되게 된다.
        
    
    >⇒ 이러한 연산이 반복되는 결점을 보완하기 위해 동적 계획법을 이용한다.
    
    <br>

- DP 개념
    
    동적 계획법
    
    1. 문제를 풀때 하나의 문제를 여러 하위 문제로 나누어 풀고
    2. 이미 푼 문제들을 저장해 두고
    3. 그것들을 결합하여 최종 목적에 도달하는 방식
    
    <br>

    - 메모이제이션 ( Memoization )
        - 메모이제이션은 동일한 문제를 반복해야 할 경우,
            
            >⇒ 계산 결과를 저장해 두었다가 활용하는 방식으로
            
            >⇒ 중복 계산을 줄이는 방식을 메모이제이션 이라고 한다.
        
        <br>    
        
- DP의 구현 방법
    - Bottom-Up
        
        >⇒ Bottom-Up은 작은 부분문제(Sub Problem)를 미리 계산해두고, 이 문제들을 모아 큰 문제를 해결하는 방식
        
        (주로 반복문을 이용해 구현한다.)
        
        <br>

        - 피보나치 구현
            
            ```java
            
            int finbo(int n){
            int[] dp;
            dp[0] = 0;
            dp[1] = 1;
            	for(int i=2; i<=n ; i++)
            		dp[i] = dp[i-1] + dp[i-2]
            
            return dp[n];
            }
            ```
            
            - 장점 :  함수를 재귀 호출하지 않기 때문에 시간과 메모리 사용량을 줄일 수 있다
        
        <br>

    - Top-Down
        
        >⇒ Top-Down은 뜻 그대로 큰 문제(Main Problem)에서 작은 부분 문제(Sub Problem)를 재귀적으로 호출하여 리턴된 값으로 문제를 해결하는 방식
        
        ( 주로 재귀 호출을 통해 구현한다.)
        
        <br>

        - 피보나치 구현
            
            ```java
            int[] dp;
            
            int finbo(int n){
            	if(n==0) return 0;
            	if(n==1) return 1;
            
            	if(dp[n] != -1) return dp[n];
            
            	dp[n] = fibo(n-1) + fibo(n-2);
            	return dp[n];
            }
            
            ```
            
            - 장점 : 점화식을 이해하기 쉽다, Memoization을 잘 활용하면 Bottom-Up보다 훨씬 빠르게 동작한다.
            
    <br>
    
    DP 문제 종류
    
    1. Coin Change Problem
    2. KnapSack
    3. LCS
    4. LIS
    5. Edit Distance
    6. Matrix Chain Multiplication
    
    >⇒ 알고리즘 공부할 때 DP 개념을 다시 확인하고 풀어보자!

<br>

 * * *
 
<br>

## 동기/비동기, 블로킹/논블로킹

<br>

### 동기(Synchronous) vs 비동기(Asynchronous)

<br>

동기와 비동기의 관심사

- 동기/비동기의 관심사는 **작업 수행의 시간**에 있다
    
    <br>

    - 여러개의 작업(Task)들이 서로 작업 시간을 맞춰 수행 되느냐, 되지 않느냐 에 따라 구분된다.

        <br>

        - 서로 작업 시간을 맞춰 수행 : 동기
            
            ⇒ 즉 동기는 작업을 요청할때 작업이 완료 시간만 기다리는것
            
            <br>

        - 서로 작업 시간과는 무관 : 비동기
            
            ⇒ 즉 비동기는 작업 요청시 작업이 언제끝나던 말던 관심 없고 자기일 하는것
            
<br>

### 동기 (Synchronous)

<img width="523" alt="동기1" src="https://user-images.githubusercontent.com/81874493/149670304-b22771bb-d853-44a8-b178-c80cc7106597.png">

<br>

동기( Synchronous)는 직렬적으로 태스크(Task)를 수행

>⇒ 즉 테스크는 순차적으로 실행되며 어떠한 작업이 수행 중이라면 다음 작업은 대기하게 되는 데이터의 처리 방식

<br>

- 개념
    
    동기 작업이란 두 개 이상의 주체가 
    
    <br>

    - 서로 동시에 작업을 수행
    - 서로 동시에 작업이 종료
    - 작업이 끝나는 동시에 작업이 시작할때
    
    <img width="500" alt="동기2" src="https://user-images.githubusercontent.com/81874493/149670308-7f0df7a1-e79b-4319-a752-ece52d355b22.png">

    >⇒ 즉 서로 다른 주체가 하는 작업의 시작, 종료 작업에 관계가 있을때 
    
    <br>

<동기식 동작 코드>

```java
public class synchro(){
	public void main(String[] args){
			method1();
			method2();
			method3();
		}
		
		public static void method1(){
			System.out.println("method1");
		}
		public static void method2(){
			System.out.println("method2");
		}
		public static void method3(){
			System.out.println("method3");
		}
	}

// 결과
/*
method1
method2
method3
*/
```

- 순차적으로 실행
- 프로그램을 다시 시작해도 순서가 변하지 않는다.

<br>

- 동기식 처리의 장점
    - 설계가 매우 간단하고 직관적이다.
    
    <br>

- 동기식 처리의 단점
    - 요청에 따른 결과가 반환되기 전까지 어떠한 작업도 못하고 대기해야 한다.
    

>⇒ 동기식 처리에서는 요청에 따른 시간에 중점을 맞추고 있음

>⇒ 다시 말해 동기식 처리는 요청한 함수가 끝나는 시간만 기다리고 있는것

<br>

### 비동기식 처리 (Asynchronous)

<img width="524" alt="비동기1" src="https://user-images.githubusercontent.com/81874493/149670313-7aa12856-d014-47fa-9712-cb1946b6c72d.png">

비동기 ( Asynchronous)는 병렬적으로 태스크(Task)를 수행

>⇒ 즉 작업 수행중인 테스크가 완료되지 않더라도 다음 테스크를 실행시키는  데이터 처리 방식이다.

<br>

- 개념
    
    비동기 작업이란 두 개 이상의 주체가 
    
    - 서로의 작업의 시작, 종료 시간과 관계가 없음
    - 별도의 작업 수행 시작/종료 시간을 가지고 있음
    
    <img width="485" alt="비동기2" src="https://user-images.githubusercontent.com/81874493/149670322-d1965f23-45d9-4748-9a3e-d1b6c4f3d45d.png">

    >⇒ 즉 서로 다른 주체가 하는 작업의 시작,종료 시간과 관계가 없을 때
    
    <br>

<비동기식 동작 코드>

⇒ 자바에서는 Multi Thread 동작이 비동기식으로 작동한다.

```java
public class Asynch(){
	public void main(String[] args){

	Thread t1 = new Thread(()=>{
		method1();
	});

	Thread t2 = new Thread(()=>{
		method2();
	});

	Thread t3 = new Thread(()=>{
		method3();
	});

	t1.start();
	t2.start();
	t3.start();

	}
	public static void method1() {
		System.out.println("method1");
	}
	public static void method2() {
		System.out.println("method2");
	}
	public static void method3() {
		System.out.println("method3");
	}
}

// 결과
/*
method3
method1
method2
*/
```

- 각 메소드를 Thread 객체에 담아 Thread 실행 메소드 start를 통해 각 메소드를 실행
- 처리 순서가 보장되지 않는다.

<br>

- 참고) Java에서 Thread는 자바의 스레드 스케쥴러에 의해 제어된다.

- 비동기식 처리의 장점
    - 요청에 따른 결과가 반환되는 동안 다른 작업을 수행 할 수 있어 자원을 효율적으로 사용할 수 있다.
    
    <br>

- 비동기식 처리의 단점
    - 동기식 처리보다 설계가 복잡하다.
    

>⇒ 즉 비동기는 작업 요청시 작업이 언제끝나던 말던 관심 없고 자기일 하는것

<br>

### 블로킹(Blocking) vs 논블로킹(non-Blocking)

<br>

주로 IO R/W 에서 블로킹과 논블로킹의 개념이 사용된다.

<br>

블로킹과 논블로킹의 관심사

- 블로킹/논블로킹의 관심사는 **한 작업이 처리되는 동안 다른 작업도 처리가 가능하냐** 에 있다
    - 블로킹/논블로킹의 구분은 ‘**제어권의 처리 방법**’으로 구분된다.
        - 다른 함수 호출시 제어권을 넘기고 작업완료시까지 대기 : 블로킹
        - 다른 함수 호출시 제어권을 넘기지만 바로 돌려받고 다른작업을 진행 : 논블로킹
        
<br>

### 블로킹(Blocking)

<img width="522" alt="블로킹" src="https://user-images.githubusercontent.com/81874493/149670334-2e937caa-8ec6-4c4a-80d2-601c125765a1.png">

블로킹은 A함수에서 B함수를 호출 하였을 경우

<br>

- A함수는 제어권을 B함수에게 넘긴다.
    - A함수는 제어권을 넘겼기 때문에 대기한다.
    
    <br>

- B함수가 실행되고 완료 되었을경우 리턴을 통해 제어권을 돌려준다.

<br>

즉 블로킹은 다른 함수를 호출할 때, 제어권을 넘겨 작업이 완료된후 돌려받는 방식

>⇒ 제어권을 돌려받기 전까지 작업을 진행 할 수 없다.

<br>

### 논블로킹(non-Blocking)

<br>

논블로킹은 A함수에서 B함수를 호출 하였을 경우

- A함수는 제어권을 B함수에게 넘긴다.
    - B함수는 요청 작업을 즉시 마칠수 없다면 바로 return 한다.
        
        >⇒ 이후 B함수는 요청 작업 계속 진행
        
        >⇒ 완료시 콜백 함수를 통해 완료를 알림
        
- A함수는 바로 제어권을 돌려받아 다른 작업을 진행한다.

<br>

### 동기/비동기 & 블로킹/논블로킹 조합



<img width="503" alt="동기 블로킹 조합" src="https://user-images.githubusercontent.com/81874493/149670342-6802de61-49a4-45ae-af3c-ea0b34565826.png">

동기/비동기 & 블로킹/논블로킹 조합은 참고 자료를 통해 확인 해보자

<br>

[동기/비동기 & 블로킹/논블로킹 조합은 참고 자료](https://velog.io/@nittre/%EB%B8%94%EB%A1%9C%ED%82%B9-Vs.-%EB%85%BC%EB%B8%94%EB%A1%9C%ED%82%B9-%EB%8F%99%EA%B8%B0-Vs.-%EB%B9%84%EB%8F%99%EA%B8%B0)

<br>

 * * *
 
<br>

## 동시성(Concurrency), 병렬성(Parallelism)

<br>

### 동시성 ( Concurrency )

<img width="503" alt="동시성" src="https://user-images.githubusercontent.com/81874493/149670347-9311df76-b00b-4629-991f-87bcaefc4141.png">

정의 : '독립적으로 실행할 수 있는 것들의 조합’이다.

>⇒ 마우스 입력, 키보드 입력, 화면 조정 등 여러 가지 일을 동시에 처리하기 위해 여러 스레드를 두고 콘텍스트 스위칭을 하며 번갈아 작업한다

<br>

- 개념
    - 동시성은 여러 일을 한꺼번에 다루는 데 관한 것이다.
    - 싱글 코어에서 멀티 스레드를 동작시키는 방법
        
        >⇒ 싱글 코어에서 여러 스레드를 번갈아가며 처리하여 동시에 처리 하는 것 처럼 보임
        
        <br>

### 병렬성 ( Parallelism)

<img width="525" alt="병렬성" src="https://user-images.githubusercontent.com/81874493/149670352-e0303f99-cd2c-4b34-8977-490eece35467.png">

정의 : 멀티 코어에서 멀티 스레드를 동작시키기 위한 방식으로, 한 개 이상의 스레드를 포함하는 각 코어들이 동시에 실행되는 성질을 말한다.

>⇒ CPU에서 물리적 동일 시간내 여러 작업이 동시에 처리되는 것

<br>

- 개념
    - 병렬성은 여러 일을 한꺼번에 실행하는 데 관한 것이다.
    - 멀티 코어에서 멀티 스레드를 동작시키기 위한 방식
        
        >⇒ 멀티 코어에서 여러 스레드가 물리적 동일 시간에 작업 되어지는 것
        
<br>    

### 동시성 vs 병렬성

| 동시성 | 병렬성 |
| --- | --- |
| 독립적으로 실행할 수 있는 것들의 조합 | 물리적 동일 시간에 여러 작업이 처리 되는 것 |
| 싱글 코어에서 멀티 스레드 동작 시키는 방식 | 멀티 코어에서 멀티 스레드를 동작시키는 방식 |

<br>

- 필충조건    
    >동시성은 병렬성 이기 위해 필요한 조건 이지만 충분조건은 아니다.
    
    - 병렬성을 만족하면, 동시성도 만족하게 된다.
    - 동시성을 만족한다고 병렬성을 만족하는 것은 아니다.

<br>

 * * *
 
<br>

## CPU 코어와 스레드

<br>

<4Core 8Thread 이미지>

<img width="531" alt="cpu 코어" src="https://user-images.githubusercontent.com/81874493/149670360-a2bfe281-b1dd-431c-91e8-a95b6683d9ef.png">


CPU : 컴퓨터의 중앙처리장치로 컴퓨터 시스템을 통제하고 프로그램의 연산을 실행 처리하는 컴퓨터의 가장 핵심적인 제어 장치를 말한다.

<br>

Core : CPU내부의 코어는 물리적인 CPU 프로세서를 의미한다

>⇒ 즉 프로그램을 실행시켰을때 실제로 작업을 수행하는 역할을 한다.

- 원래 코어는 한번에 한가지만 작업할수 있다
    
    >⇒ 하이퍼스레딩 기술의 도입으로 단일 프로세서 코어가 두개의 작업을 동시 실행할 수 있게 됨
    
    >⇒ 여기서 작업이 쓰레드
    
<br>

Thread : 하이퍼 스레딩 기술의 도입으로 코어가 하나의 작업을 여러 작업으로 분할하여 빠르게 처리할 때, 

>⇒ 여기서 코어가 수행하는 논리적 작업의 단위를 스레드라고 말한다.

<br>

 * * *
 
<br>

## 프로세스/스레드 생성비용

<br>

간단히 개념 정의

### Process

프로세스는 운영체제로부터 자원을 할당받아 프로그램이 메모리 상으로 올라갔을 때의 상태를 의미한다.

>⇒ 즉 운영체제의 작업 단위라고도 할 수 있다.

<br>


### Thread

스레드는 프로세스가 운영체제로부터 할당받은 자원을 이용하여 작업을 수행하는 단위를 의미한다.

<br>

### Process 의 생성

Process 생성에는 크게 두가지 방식으로 구분

- Directed Process Creation (직접 생성)
    - 운영체제가 Disk에 있는 프로그램을 memory에 올려서 process로 만들고 process image(PCB)를 만든다.

        <br>
        
        1.  new process를 위한 메모리공간 확보
        
        2. 새로운 메모리 공간에 Load (code,data를 메모리로 load, call stack 생성)
        
        3. PCB 초기화 (pid 할당받고,,, 등등)
        
        4. new process를 ready state 로 전환 (준비 큐에 넣는다.)
        
        >⇒ 일반 OS에서 첫 번째 Process는 이런식으로 만든다.
        
        >⇒ *init process = first process = pid가 1인 프로세스*
        
        <br>

- Cloning ( 복제 )
    - 부모프로세스에서 복제하여 자식 프로세스 생성하는 방법
        - 부모프로세스와 PCB의 상당부분 값이 비슷하다

        <br>

    - unix/Linux 에서 fork() 시스템 호출(System call)를 통해 새로운 프로세스를 생성한다.

        <br>

        1. 부모 프로세스 PCB에서 text,data,stack 복사
        2. 반드시 필요한 부분만 수정
            
            >⇒ 새로운 프로세스 생성시 fork()를 통해 복제 이후,
            
            >⇒ exec() 시스템 콜을 통해 child의 메모리 공간을 모두 새로 할당
            
            >⇒ code, data, bss 영역을 새로 할당
            
            >⇒ 동적 영역인 heap, stack은 리셋 된다. 
            
        3. new process를 ready state 로 전환 (준비 큐에 넣는다.)
        
        <br>


### 프로세스와 스레드 생성의 비용 차이

<br>

프로세스 생성시 ( fork() → exec()방식 )

- 메모리
    - Code
    - Data
    - Bss
    - 동적 영역
        - heap
        - stack
    
    >⇒ 위의 메모리의 자원을 OS를 통해 모두 할당받아 새로운 프로세스를 생성한다.

<br>

스레드 생성시

<img width="518" alt="프로세스 스레드 이미지" src="https://user-images.githubusercontent.com/81874493/149670376-f4f5d09a-a9e7-4ecc-a5fd-45d799dc0da4.png">


<br>

- 메모리
    - 각 스레드에 필요한 스택영역 생성
    - 프로세스의 Code, Data, Heap영역은 공유하게 된다.
    
<br>

결론)

프로세스 생성시 메모리 영역별 자원을 새로 할당해줘야 하는 반면,

스레드 생성시, 각 스레드에 필요한 Stack영역만 생성하고 프로세스의Code, Data, Heap영역을 공유한다

>⇒ 위의 근거를 통해 **프로세스 생성보다  스레드 생성비용이 더 적게 든다는 결과**가 도출된다.

<br>

### 스택을 독립적으로 할당하는 이유?

스택은 함수 호출 시 전달되는 인자, 되돌아갈 주소값 및 함수 내에서 선언하는 변수 등을 저장하기 위해 사용되는 메모리 공간이다.

>⇒  따라서 스택 메모리 공간이 독립적이라는 것은 독립적인 함수 호출이 가능하다는 것이고, 이는 독립적인 실행 흐름이 추가되는 것이다. 결과적으로 실행 흐름의 추가를 위한 최소 조건이 독립된 스택을 제공하는 것이다

>⇒ 또한, 스택영역을 공유하게 된다면 각 스레드별 함수 호출의 복귀 주소가 꼬여버릴 수 있다.

<br>

 * * *
 
<br>

## 메모리 계층 구조

<br>

메모리 즉 저장장치의 계층 구조로 구분되어진 원초적인 이유

>⇒ 접근 속도에 따른 비용 문제

<img width="507" alt="메모리 계층 구조" src="https://user-images.githubusercontent.com/81874493/149670384-19be1113-2ab2-409a-a0ff-3df56192ff49.png">

>⇒ 위의 그림과 CPU가 메모리에 더 빠르게 접근할 수 있는 장치일수록 가격이 비싸진다.

<br>

- 컴퓨터 설계
    
    각각의 특징이 있는 서로 다른 여러 종류의 저장 장치를 함께 사용하여 비용을 줄이고 최적의 효율을 낼 수 있게 하는 것

<br>    

- 저장 장치 구분
    
    
    | 명칭 | 위치 | 접근 속도 |
    | --- | --- | --- |
    | 레지스터 | CPU 내부 | 빠름 |
    | 캐시 | CPU 내부 | 빠름 |
    | 메모리 | CPU 외부 | 레지, 캐시 보다 느림 |
    | 하드디스크 | CPU 직접 접근 불가 | 제일 느림, 데이터를 메모리에 이동시켜 접근가능 |

<br>

 * * *
 
<br>

## HTTP 버전별 특징

<br>

### HTTP버전

- 1.0
- 1.0+
- 1.1
- SPDY
- 2.0

<br>

### HTTP/1.0

- HTTP는 원래 0.9v 부터 시작되었다고 하지만, 사실상 1.0 버전이 상용화 되어 1996년부터 사용되기 시작.
  
<br>

- HTTP 1.0에서는 GET, HEAD, POST의 method가 사용된다.
    - GET : Request-URI에서 지정한 정보를 Entity Body로 전달해달라는 요청
    - HEAD : Header의 정보만 요구
    - POST : Request 메시지의 body에 포함된 자원을 Request-URI로 넘겨주는 경우 사용

<br>

- 단점
    - TCP Connection당 하나의 URL만 fetch
    - 매번 request/response가 끝나면 연결이 끊기므로 필요할 때마다 다시 연결해야하는 단점이 있어 속도가 현저히 느리다.
    - URL의 크기가 작고 한번에 가져올 수 있는 데이터의 양이 제한
    - HTTP 1.0에서는 open/close를 위한 flow의 제한으로 **대역폭이 적게 할당**되어 연결되는데, 이로 인해 congestion information이 자주 발생하고 disconnect가 반복적으로 나타나게 된다.
        
        >⇒ disconnect 현상으로 인해 한 서버에 계속해서 접속을 시도하게 되면 과부하가 걸리고 성능이 떨어지게 되는 문제가 발생한다.
        

<br>


### HTTP/1.1

<br>

- HTTP/1.0 의 단점을 보완하여 나온 버전
- 오늘날 가장 많이 사용되는 HTTP 버전

<br>

- 1.1 버전의 가장 큰 특징
    
    >⇒ Persistent Coneection, Pipelining
    
    - 커넥션 유지 (Persistent Connection)
        
        >⇒ HTTP를 이용한 데이터 전달은 TCP 세션 기반에서 이루어진다.
        
        - Http/1.1 은 connection 헤더를 통해 커넥션을 유지한다.
            
            <img width="450" alt="http1" src="https://user-images.githubusercontent.com/81874493/149670390-510c2839-178c-4cdd-baac-ff4953e5c61f.png">

            - 1.0 버전 : 요청/응답이 완료되면 커넥션을 종료하여 다시 요청시 TCP 세션을 맺어야 한다.
            - 1.1 버전 : 요청/응답이 완료되어도 커넥션을 유지하여 다시 TCP 세션을 맺을 필요가 없다.
                
                >⇒ 이를 통해 TCP 세션 처리 부하와 클라이언트의 응답 속도 개선
                
                <br>

                참고) Connection header
                
                Connection : keep-alive ( 커넥션 유지 )
                
                Connection : close (커넥션 유지하지 않음)
                
                <br>

        - 파이프 라이닝(Pipelining)
            
            HTTP/1.1은 persistent 기능과 함께 파이프라이닝 또한 지원한다.
            
            <img width="442" alt="http2" src="https://user-images.githubusercontent.com/81874493/149670395-e9ca2aef-3879-48d7-8c89-3ac6de59eb3b.png">

            - 파이프라이닝은 최초의 요청이 완료되기 전 다음 요청을 보내는 기술
            - 다음 요청까지의 대기 시간을 없애, 네트워크 가동율을 높이고 성능을 향상시킨다.
            - Keep-Alive를 전제로 한다.
            - 서버는 요청이 들오온 순서대로 응답을 반환한다.


<br>


- 1.1 버전의 단점
  
    <br>

    - **HOLB (Head of Line blocking) : 특정 응답의 지연**
        
        <img width="397" alt="http3" src="https://user-images.githubusercontent.com/81874493/149670400-52e8604f-909e-4889-84c7-652e241d7bfa.png">

        - connection 당 하나의 요청 처리를 개선하는 방법 중 파이프라이닝이 존재,
            - connection을 통해 다수개의 파일을 요청/응답 받는 기법
        
        >⇒ TCP 연결에서 3개의 이미지 (a.png, b.png, c.png)를 요청한 경우,
        
        >⇒  첫 번째 이미지를 요청하고 **응답이 지연**되면 2, 3번째 이미지는 대기하게 되는데 이런 현상을 **HTTP의 HOLB (head of line blocking)**이라고 부른다.
        
        >⇒ 파이프 라이닝의 큰 문제점 중 하나
        
        <br>
    
    - **RTT (round trip time) 증가**
        - RTT **(round trip time)**
            - 클라이언트가 보낸 요청을 서버가 처리한 후 다시 클라이언트로 응답해주는 사이클의 시간을 RTT(Round Trip Time)이라고 한다.
        <br>

        - 매 요청별 connection이 연결되기 때문에 TCP 상에서 동작하는 HTTP 특성상
            
            >⇒  3-way handshake가 반복적으로 일어나 불필요한 RTT 증가와 네트워크 지연을 일으켜 성능을 저하시킨다
            
            <br>
    
    - **무거운 header 구조 (ex. 쿠키)**
        - 헤더에 많은 메타 정보를 저장한다
        - **매 요청시마다 중복된 header값을 전송하게 되며 해당 domain에 설정된 cookie 정보도 매 요청시 마다 헤더에 포함되어 전송된다**
        - 전송하는 값보다 헤더 값이 더 큰 경우도 있다.

<br>

### SPDY

<br>

구글은 더 빠른 Web을 실현하기 위해 Latency(지연 시간) 관점에서 HTTP를 고속화한 SPDY(스피디) 라 불리는 새로운 프로토콜을 구현했다.

SPDY는 HTTP를 대체하는 프로토콜이 아님

>⇒  HTTP를 통한 전송을 재 정의하는 형태로 구현.

<img width="523" alt="http4" src="https://user-images.githubusercontent.com/81874493/149670413-3dff5e32-edfb-4ef3-ad13-f0ebb9c3b328.png">

SPDY는 실제로 HTTP/1.1에 비해 상당한 성능 향상과 효율성을 보여줬고, 이는 HTTP/2 초안의 참고 규격이 되었다. 


<br>


## HTTP/2

HTTP/2 는 완전히 새로운 프로토콜이 아닌

>⇒ SPDY의 개선사항을 적용해 수정된 성능향상에 초점을 맞춘 프로토콜 이다.

<br>

- HTTP/2 특징
    - **Binary Framework**
        
        <img width="463" alt="http5" src="https://user-images.githubusercontent.com/81874493/149670417-a1f77276-522e-49e4-ad88-43281a9c9c7f.png">

        - 기존에 Plain Text(평문)를 사용하고, 개행으로 구별되면 HTTP/1.x 프로토콜과 달리,
            
            >⇒  2.0에서는 바이너리 포멧으로 인코딩 된 Message, Frame으로 구성된다.
            
            >⇒ 이로인해  HTTP/1.1 버전의 클라이언트는 HTTP/2 버전의 서버와 통신이 불가능하다
            
            <br>

    - **Multiplexed Stream**
        
        <img width="441" alt="http6" src="https://user-images.githubusercontent.com/81874493/149670423-876557aa-a3ba-4468-9fb1-c2dbab702ed7.png">

        - 한 커넥션으로 동시에 여러 개의 메세지를 주고 받을 있으며, 응답은 순서에 상관없이 stream으로 주고 받음
            
            >⇒ HTTP/1.1의 Connection Keep-Alive, Pipelining의 개선
            
            <br>
            
    - **Stream Prioritization ( 스트림 우선순위 )**
        - 클라이언트가 요청한 HTML문서 안에 CSS파일 1개와 Image파일 2개가 존재하고 이를 클라이언트가 각각 요청하고 난 후 Image파일보다 CSS파일의 수신이 늦어지는 경우 브라우저의 렌더링이 늦어지는 문제가 발생
            
            >⇒  HTTP/2의 경우 **리소스간 의존관계(우선순위)를 설정하여 이런 문제를 해결**했다.

            <br>
            
    - **Server Push**
        
        <img width="487" alt="http7" src="https://user-images.githubusercontent.com/81874493/149670433-fef89dd7-ac57-4067-bd1b-7cb6fd5a7e55.png">

        - 클라이언트(브라우저)가 HTML문서를 요청

            <br>

            - HTTP/1.1 에서는 응답받은 HTML에 여러 개의 리소스(CSS, Image...) 가 포함되어 있는 경우 HTTP/1.1에서 클라이언트는 요청한 HTML문서를 수신한 후 HTML문서를 해석하면서 필요한 리소스를 재 요청하여 처리하게 된다.

            <br>

            - 반면 HTTP/2에서는 **Server Push기법**을 통해서 클라이언트가 요청하지 않은 (HTML문서에 포함된 리소스) 리소스를 Push 해주는 방법으로 **클라이언트의 요청을 최소화** 해서 성능 향상을 이끌어 냈다.
            
            >⇒ PUSH_PROMISE 라고 부르며 PUSH_PROMISE를 통해서 서버가 전송한 리소스에 대해선 클라이언트는 요청 하지 않는다.
            
            <br>

    - **Header Compression**
        - HTTP/2는 무거운 Header 정보를 압축하기 위해 HPACK 압축방식을 이용한다
            
            >⇒ HTTP/2에선 Header에 중복값이 존재하는 경우 Static/Dynamic Header Table 개념을 사용하여 중복 Header를 검출하고
            
            >⇒ 중복된 Header는 index값만 전송하고 중복되지 않은 Header정보의 값은 Huffman Encoding 기법으로 인코딩 처리 하여 전송한다.
            
            <br>

- HTTP/2 단점
    - HTTP2는 여전히 TCP를 이용하기 때문에
        
        >⇒  Handshake의 RTT(Round Trip Time)로 인한 Latency(지연시간),
        
        <br>

    - TCP의 HOLB 문제
        - **TCP에서의 Head-Of-Line Blocking**
            
            ⇒ TCP에서의 HOLB는 HTML/2에서도 나타나는 단점으로서 TCP의 고질적인 문제다.
            
            - TCP의 경우 패킷 LOSS가 발생하면 패킷을 재 전송하게 되는데,
                
                상황)  패킷 전송 후 상대방으로부터 ACK 신호를 받지 못하면
                
                진행) 전송한 다음 번에 패킷들을 전송하지 않고 모두 대기 상태로 두고 이전에 보냈던 패킷을 재전송한다.
                
                결론) 이러한 특성 때문에 TCP를 사용하게 될 경우 어쩔 수 없이 Head-Of-Line Blocking 문제가 발생하게 된다.
                
    
    ⇒ 위의 문제는 해결 할 수 없다.
    
    <br>

### QUIC

<img width="522" alt="http8" src="https://user-images.githubusercontent.com/81874493/149670444-cad33a6f-10a0-4af8-bc6e-a68b68198e2e.png">

정의 : QUIC은 Quick UDP Internet Connections 의 약자이며, UDP를 기반으로 **TCP + TLS + HTTP 의 기능을 모두 구현하는 프로토콜**이다.

>⇒  구글에서 개발했던 SPDY 기술이 HTTP/2의 기반 기술이었다

>⇒  역시 구글에서 개발한 QUIC이 HTTP/3의 기반 기술이 되었다.


<br>


## HTTP/3

HTTP/3는 HTTP(Hypertext Transfer Protocol)의 세 번째 메이저 버전으로,

>⇒ 기존의 HTTP/1, HTTP/2와는 다르게 **UDP** 기반의 프로토콜인 **QUIC** 을 사용하여 통신하는 프로토콜이다.


<br>

- 특징
    
    - **특징 1.** **HTTP/3는 TCP가 아닌 UDP 기반의 통신을 한다**
        
        >⇒ UDP를 사용하지만 **그렇다고 기존의  신뢰성 있는 통신이라는 타이틀을 포기한 것은 아니다.**
        
        <br>

        구글이 QUIC을 만들 때 UDP를 선택한 이유에는 
        
        1. 기존의 TCP를 수정 하기가 어렵다
        2. 백지 상태나 다름 없는 UDP를 사용함으로써 QUIC의 기능을 확장하기 쉬웠기 때문
        
        <br>

    - **특징 2. RTT 감소로인한 지연시간 단축**
        
        >⇒ QUIC은 TCP를 사용하지 않기 때문에 통신을 시작할 때 번거로운 3 Way Handshake 과정을 거치지 않아도 된다

        - TCP는 연결을 생성하기 위해 기본적으로 1 RTT가 필요하고, 여기에 TLS를 사용한 암호화까지 하려고 한다면 TLS의 자체 핸드쉐이크까지 더해져 총 3 RTT가 필요하다.
            
            <img width="241" alt="http9" src="https://user-images.githubusercontent.com/81874493/149670451-c6342ead-6db8-4457-9e9a-0cca1eaf0dc6.png">

            <br>
        
        - 반면 QUIC은 첫 연결 설정에 1 RTT만 소요된다.
            
            <img width="240" alt="http10" src="https://user-images.githubusercontent.com/81874493/149670475-8eb8c516-0ec6-4d10-bcaf-8b06994ebdf3.png">

            >⇒ 그 이유는 **연결 설정에 필요한 정보와 함께 데이터도 보내버리기 때문**이다.
            
            >⇒  클라이언트가 서버에 어떤 신호를 한번 주고, 서버도 거기에 응답하기만 하면 바로 본 통신을 시작할 수 있다는 것이다.
            
            <br>

            참고)
            
            QUIC은 클라이언트가 서버로 첫 요청을 보낼 때는 서버의 세션 키를 모르는 상태이기 때문에
            
            1. 목적지인 서버의 Connection ID를 사용하여 생성한 특별한 키인 초기화 키(Initial Key)를 사용하여 통신을 암호화 한다.
            2. 한번 연결에 성공했다면 서버는 그 설정을 캐싱해놓고 있다가, 다음 연결 때는 캐싱해놓은 설정을 사용하여 바로 연결을 성립시킬 수 있다.
                
                >⇒ 캐싱을통하여 **0 RTT**만으로 바로 통신을 시작할 수도 있다
                
            
            ⇒ 이런 점들 때문에 QUIC은 기존의 TCP+TLS 방식에 비해 지연시간을 더 줄일 수 있다.
            
            <br>

    - **특징 3.패킷 손실 감지에 걸리는 시간 단축**
        - QUIC도 TCP와 마찬가지로 전송하는 패킷에 대한 흐름 제어를 한다.
            
            >⇒  통신과정에서 발생한 에러를 재전송을 통해 에러를 복구하는 ARQ 방식을 사용
            
            <br>

            >- 사전 지식
                - 재전송 기반 에러 제어 ( Retransmission Error Control )
                    
                    ⇒ 통신 회선상에서 신뢰성 있는 데이터 전달을 위해, 에러검출 이후 재전송하는 에러 제어 방식
                    
                    ⇒ ARQ(Automatic Repeat Request) 방식 이라고도 한다
                    
                - ARQ 방식 종류
                    - Stop and Wait ( 정지 대기 방식 )
                        - 한번에 하나씩 긍정 확인 응답 ACK을 받고, 그 후 데이터 전송 방식
                        - NAK(부정응답)를 받거나, Timeout 이 날경우 다시 데이터 전송
                            
                            ⇒ TCP가 사용하는 방식
                            
                    - GBN ( Go Back N ) ARQ 방식
                        - 한번에 여러 데이터를 보내고 하나의 긍정응답을 받고, 그 후 후속 데이터 전송
                        - 에러 발생시 에러 발생 블록 이후 모든 블록을 재전송
                        - 슬라이딩 윈도우 방식이라고도 한다.
                    
                    - Selective ARQ 방식
                        - 연속적으로 데이터 프레임을 전송, 수신측은 전송받은 데이터 오류 검증 후 오류 있을시 NAK(부정 응답) 신호를 전송
                        - NAK(부정 응답)을 받은 송신측은 에러발생한 데이터 프레임만 재전송

            <br>

        - QUIC의 패킷 손실 감지
            
            패킷 손실 감지 에 대한 대표적인 문제는 송신 측이 패킷을 수신측으로 보내고 난 후 얼마나 기다려줄 것인가,
            
            >⇒  즉 타임 아웃을 언제 낼 것인가를 동적으로 계산해야한다는 것.
            
            >⇒  이때 이 시간을 RTO(Retransmission Time Out)라고 한다.
            
            <br>

            QUIC는 헤더에 별도의 패킷 번호 공간을 부여해 패킷 고유의 번호를 가지고 
            
            1. 송신측에서 1, 2, 3, 4 .. 번호로 패킷 번호를 부여하여 데이터를 전송한다.
            2. 도중에 패킷이 손실 되었을경우
                
                >⇒ 송신측에서는 확인 응답의 가장 작은 패킷 번호와 가장 큰 패킷번호의 차이가 3이상 날 경우
                
                >⇒ 패킷의 손실이라고 감지한다.
                
            
            ⇒ 이러한 방식으로 패킷 번호를 통해 패킷 손실 감지에 걸리는 시간을 단축한다.
            
            (이외 다른 방법도 이용한다.)
            
            <br>

    - **특징 4.멀티플렉싱을 지원**
        
        HTTP/3도 HTTP/2와 같은 멀티플렉싱을 지원한다.
        
        >⇒ QUIC 또한 HTTP/2와 동일하게 멀티플렉싱을 지원하기 때문에, 멀티 플렉싱의 이점을 그대로 가지고 있다.
        
        <br>

    - **특징 5. 클라이언트의 IP가 바뀌어도 연결이 유지됨**
        
        TCP의 경우 소스의 IP 주소와 포트, 연결 대상의 **IP 주소와 포트로 연결을 식별**하기 때문에 클라이언트의 IP가 바뀌는 상황이 발생하면 연결이 끊어져 버린다.
        
        >⇒  연결이 끊어졌으니 다시 연결을 생성하기 위해 결국 Handshake 과정을 다시 거쳐야한다는 것이고, 이 과정에서 다시 레이턴시가 발생한다.(모바일의 경우 Wi-fi , 셀룰러 전환으로 인해 ip 변경이 잦음)
        
        <br>

        반면, QUIC은 Connection ID를 사용하여 서버와 연결을 생성한다.
        
        >⇒ Connection ID는 랜덤한 값일 뿐, 클라이언트의 IP와는 전혀 무관한 데이터이기 때문에 클라이언트의 IP가 변경되더라도 기존의 연결을 계속 유지할 수 있다.
        
        >⇒  이는 새로 연결을 생성할 때 거쳐야하는 핸드쉐이크 과정을 생략할 수 있다는 의미이다.


<br>

 * * *
 
<br>

## Exponential Back Off Retry


### back-off-retry

Back-off란?

- 데이터 충돌과 같은 이유로 데이터를 재전송시
    
    >⇒ 데이터를 재전송하기 이전, 컴퓨터가 일정 시간을 대기하는 시간을 백오프(Back-off)라고 한다.
    
<br>

### Exponential Back Off( 지수 백 오프 )

**지수 백오프** 는 수용 가능한 속도를 점진적으로 찾기 위해 피드백 을 사용 하여 일부 프로세스의 속도를 곱셈적으로 줄이는 알고리즘 이다.

>⇒ 이러한 알고리즘은 무선 네트워크와 컴퓨터 네트워크와 함께 광범위한 시스템 및 프로세스에서 사용된다.

<br>

특히, CSMA/CD 방식에서 충돌시 백오프 시간 결정에 2진 지수 백오프 (binary Exponential Back off)가 사용된다.

<br>

- CSMA/CD
    - **CSMA/CD 정의**
        - 브로드캐스트 채널로 보내진 다수의 프레임이 충돌(collision)하는 현상을 막기 위해 타 노드에서 전송된 프레임을 감지(carrier sensing)하고, 전송 중 충돌을 검출(detection)하면 전송을 중단하는 random access 프로토콜.

            >⇒ CSMA/CD 방식의 근거리망에서 버스 상의 충돌이 일어나면 재전송을 위하여 Latency(지연시간)을 계산하기 위해 지수 백 오프 알고리즘을 사용하며,  충돌이 있을 때마다 임의로 지연 시간을 늘여간다.
            
            <br>

    - 동작과정
        - jam 신호 전송 후, 지수 백오프(exponential backoff) 단계로 들어감. 지수 백오프 알고리즘을 통해 값(K)를 얻어 K * 512 bit time을 기다렸다가 다시 데이터를 재전송 한다.
    
    <br>

    **용어 설명**
    
    - bit time : 채널 상에서 1bit가 송신되는 시간
    - exponential backoff : K를 선택하기 위한 알고리즘.
        
        >⇒  K를 선택하는 양의 정수 집합 크기는 0부터 시작하여 **충돌회수에 따라 지수적으로 증가**.
        
        >⇒  지수적으로 K값 선택 범위를 변경하는 이유는 충돌에 관련된 노드의 개수를 알수 없기 때문임.

<br>

 * * *
 
<br>

## 9. 브라우저에 Domain 주소 입력시

1) 브라우저 주소창에 도메인 주소 입력 + 엔터

<br>

2) 브라우저는 DNS 서버에 도메인에 상응하는 IP를 요청한다.

    >⇒ 처음으로 캐시에게 요청

    >⇒ 없다면 단계별 DNS 서버를 거치며 IP 요청

<br>

3) DNS 를 통해 IP 주소를 응답받으면 브라우저는 IP주소와 일치하는 서버와 TCP 연결을 요청한다

    >⇒ **three-way handshake**과정을 통해 TCP 연결

<br>

4) TCP연결이 완료되면 브라우저는 클라이언트의 HTTP 요청 메시지를 만들어 서버에게 요청한다

    >⇒ GET, POST, ... etc

<br>

5) 서버는 요청된 HTTP 메시지를 읽고 요청된 처리를 완료하여 HTTP 응답 메시지를 만들어 클라이언트에게 응답한다.

    >⇒ Status code : 1xx, 2xx, 3xx, 4xx, 5xx 

<br>

6) 브라우저는 서버로부터 받은 HTTP 응답 메시지의 HTML 컨텐츠 클라이언트 에게 표시한다.

<br>

 * * *
 
<br><br>

# 참고자료

[DP 참고 자료](https://hongjw1938.tistory.com/47)

[동시성(Concurrency), 병렬성(Parallelism) 참고 자료](https://roseline.oopy.io/dev/concurrency-and-parallelism)

[프로세스 스레드 참고 자료](https://3dmpengines.tistory.com/2003)

[HTTP 버전별 특징 참고 자료](https://velog.io/@ziyoonee/HTTP1-%EB%B6%80%ED%84%B0-HTTP3-%EA%B9%8C%EC%A7%80-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0)

[Exponential Back Off Retry 참고 자료](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=rapkuma&logNo=220046550606)
