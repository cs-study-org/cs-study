# Java Collection

<br>

## 자바 컬렉션별 빌트인 시간복잡도

<br>

> Array (데이터 중복 가능, 순서 O)

⇒ 동일한 자료형을 순차적으로 관리하는 가장 기본적인 자료 구조

**배열 선언**

```java
// Type [ ] 식별자 = new Type [/*몇개의 인덱스 만들 건지*/ ];
int [] arr = new int [10]; // 인덱스가 0~9 까지의 크기가 10인 배열

//초기값을 설정한 배열
int [] arr1 = {1,2,3,4,5};

//초기값과 타입을 함께 지정
int [] arr2 = new int[] {10,9,8,7,6,5};
```

**배열의 시간 복잡도**

```
시간복잡도
접근(Access)     : O(1) => n번째 인덱스 접근 ( 접근할 인덱스를 알고 있음)
Add             : O(n)
Remove          : O(n)
탐색(순차 탐색)    : O(n) => 배열 하나 하나 확인
할당 (assign).   : O(1) => 이전 인덱스에 값 덮어씌우기

특징
-Add 경우 추가할 값이 배열의 맨뒤의 인덱스 번호로 추가시 O(1)
-Remobe 경우 삭제할 인덱스 번호를 알고 있다면 O(1)
- 연속된 자료구조
- 배열에 저장되는 값은 모두 같은 데이터 유형
- 배열은 행 우선으로 데이터가 기억장소에 할당
- 배열은 물리적인 위치와 논리적인 위치가 동일
- 배열의 값을 요소(element)라 하고 그 순서를 인덱스(index)라고 함
- 초기 Int 형은 0, String 형은 Null로 초기화 된다.
```

<br>

* * *

<br>

> LIST 
#ArrayList 

List 인터페이스를 상속받은 클래스중 하나의 컬렉션

**ArrayList 선언**

```java
import java.util.ArrayList;

// 타입 생략 가능
ArrayList<Integer> arrList1 = new ArrayList<>();

// 초기 용량 설정 => 크기가 가늠하다면 미리 크기를 구성해놓는 편이 좋다
// => 가용량 이상 저장시 새로운 배열를 생성하여 복사 과정이 들어가기때문
ArrayList<Integer> arrList2 = new ArrayList<>(10);

// 선언과 동시에 기본값 추가
ArrayList<Integer> arrList3 = new ArrayList(Arrays.asList(1,2));

```

**ArrayList 시간복잡도**

```
시간복잡도
add             : O(1) => 마지막에 데이터 추가 (중간추가는 O(n))
remove          : O(n) => 삭제후 인덱스 이동이 생김 
get             : O(1) => 인덱스로 접근
set             : O(n) => 중간 데이터 공간을 만들고 뒤 한칸씩 이동
Contains        : O(n)

특징
-java 1.2에 추가, thread-safe 보장 안함
- 배열은 크기가 고정이지만 ArrayList는 크기가 가변적으로 변한다.
  ⇒ 내부적 저장 가능 메모리 용량이 있으며 현재 가용량 이상 저장시 더 큰 공간.   의 메모리를 새롭게 할당한다.
    
- 데이터 추가,삭제를 위해 임시 배열을 생성해 데이터를 복사
- 대량의 자료를 추가/삭제시 복사가 일어 나게 되어 성능 저하를 일이킴
- 데이터의 인덱스를 가지고 있어 데이터 검색시 빠름
```


<br>


#LinkedList 

⇒ 각 노드가 데이터와 포인터를 가지고 한 줄로 연결되어 있는 방식의 자료구조

**Linked List 선언**

```java
//선언
LinkedList list = new LinkedList();
LinkedList<Integer> list = new LinkedList<>();
LinkedList<Student> list = new LinkedList<>();

//추가
list.addFirst(1);
list.addLast(1);
list.add(new Student("kim"));
list.add(new Student("kim"));

//제거
list.removeFirst(); //가장 앞 데이터 제거
list.removeLast(); // 가장 뒤 데이터 제거
list.remove(); // 0번째 인덱스 제거
list.remove(1);
list.clear(); // 모든 값 삭제
```

**Linked List 시간복잡도**

```
시간복잡도
add             : O(1) => head/tail 참조하고 있기때문에 순회 X
remove          : O(n) => 데이터 삭제를 위해 순회 ( get = O(n)) 
get             : O(n) => 순차 접근하여 값 얻어온다.
set             : O(n) => 순차 접근하여 값 얻어온다.
Contains        : O(n)

java 1.2에 추가, thread-safe 보장 안함
특징 : 데이터를 저장하는 각 노드가 이전 노드와 다음 노드의 상태만 알고 있다.
   - 데이터 추가/삭제시 빠름
   - 데이터 검색시 처음부터 노드를 순화해야 되기 때문에 느림

```


<br>


#CopyOnWriteArrayList 

**CopyOnWriteArrayList란?**

여러 스레드에서 접근시 문제 없도록 구성한 ArrayList

```
시간복잡도
add             : O(n)
remove          : O(n)
get             : O(1)
Contains        : O(n)
iterator.remove : O(n)
java 1.5 추가 thread-safe 보장, 병렬처리

- add는 ArrayList, LinkedList 보다 느리지만 get은 LinkedList보단 빠르고 ArrayList보단 살짝 느리다.

-CopyOnWriteArrayList의 데이터  접근시 복사된 데이터를 접근하게 하여 읽기/쓰기를 진행하고 원본 리스트에 값을 갱신한다. 
```


<br>

* * *

<br>

> SET ( 중복 허용 X, 순서 X)
> 

#HashSet

**HashSet 선언**

```java
//생성
HashSet<Integer> set1 = new HashSet<>();
HashSet<Integer> set1 = new HashSet<>(Arrays.asList(1,2));

//복사
HashSet<Integer> set2 = new HashSet<>(set1);

//추가
set.add(1);

//제거
set.remove(1);
set.clear();
```

```
시간복잡도
add         :   O(1)
contains    :   O(1)
next        :   o(h/n) h는 테이블 용량
java 1.2 thread-safe 보장 안함
특징 : 객체들을 순서없이 저장하고 동일한 객체를 중복 저장하지 않는다.
    - 비선형 구조
		- 중복되지 않는 값을 등록할때 용의
    - 순서없이 저장
    - null을 허용한다.
		- 중복 제거 과정
			1. hashCode() 호출
			2. 해시 코드를 얻어 저장 되어있는 객체들의 해시코드와 비교
			3. 동일 코드가 있다면 equals()를 통해 비교
			4. 동일시 동일객체 판단 중복저장하지 않음
```


<br>


#LinkedHashSet

```
시간복잡도
add       : O(1)
contains  : O(1)
next      : O(1)
java 1.4 thread-safe 보장 안함
특징 : 속도는 hashSet에 비해 느리지만 좋은 성능을 보장한다.
    - 등록한 순으로 정렬을 한다.
    - null을 허용한다.

```


<br>


#CopyOnWriteArraySet

```
시간복잡도
add       : O(1)
contains  : O(1)
next      : O(1)
Java 1.5 에서 나옴
특징 : 적은 메모리를 사용
      - 빠르다
      - null을 사용 할 수 없다.

```


<br>


#TreeSet

```
시간복잡도
add       : O(log n)
contains  : O(log n)
next      : O(long n)
java 1.2 에서 나옴 thread-safe 보장 안함
특징 : 객체기준으로 정렬을 한다. 느리다.
    - null을 허용하지 않는다.

```


<br>


#ConcurrentSkipListSet

```
시간복잡도
add       : O(log n)
contains  : O(log n)
next      : O(1)
java 1.6 병렬처리, thread-safe 보장, 병렬 보장
특징 : Null을 허용하지 않는다.
  - Tree set 처럼 정렬을 한다.

```


<br>

* * *

<br>

> Map
> 

#HashMap

HashMap 선언

```java
//선언
HashMap<String,Integer> map =new HashMap<>();

// 추가
map.put("hi",2);

//제거
map.remove("hi");
map.clear();
```

```
시간복잡도
get           : O(1)
containsKey   : O(1)
next          : O(h/n) h는 테이블 용량
java 1.2 에서 나옴
특징 : 순서에 상관없이 저장됨, Null을 허용한다. thread-safe 보장하지 않는다.
	-값은 중복저장 가능하지만, 키는 중복 저장이 불가능하다.
```


<br>


#LinkedHashMap

```
시간복잡도
get           : O(1)
containsKey   : O(1)
next          : O(1)
java 1.4 에서 나옴
특징 : 순서대로 등록한다. Null을 허용한다. thread-safe 보장하지 않는다.

```


<br>


#IdentityHashMap

```
시간복잡도
get           : O(1)
containsKey   : O(1)
next          : O(h/n) H는 테이블
java 1.4 에서 나옴
특징 : Map 형식에 부합되지 않음

```


<br>


#EnumMap

```
시간복잡도
get           : O(1)
containsKey   : O(1)
next          : O(1)
java 1.5 에서 나옴

```


<br>


#TreeMap

```
시간복잡도
get           : O(log n)
containsKey   : O(log n)
next          : O(log n)
java 1.2 에서 나옴
특징 : 정렬이 되면서 추가가 됨
     -  null은 허용하지 않음
     -  thread-safe 보장하지 않는다.

```


<br>


#ConcurrentHashMap

```
시간복잡도
get           : O(1)
containsKey   : O(1)
next          : O(h/n) h는 테이블
java 1.5 에서 나옴
특징 :  thread-safe 보장하면서 SynchronizedMap 보다 속도가 빠르다
      - null을 허용하지 않음

```


<br>


#ConcurrentSkipListMap

```
시간복잡도
get           : O(log n)
containsKey   : O(log n)
next          : O(1)
java 1.6 에서 나옴
특징 : thread-safe 보장하면서 SynchronizedMap 보다 속도가 빠르다
       - 메모리를 사용하여 O(log n)으로 데이터를 검색, 삽입, 삭제가 가능하다
       - lock이 적게 사용되어야 하는 병렬 처리 시스템에 용의

```


<br>

* * *

<br>
> Queue
> 

#Queue

```java
import java.util.LinkedList;
import java.util.Queue;
// LinkedList 활용하여 생성해야 한다.

//선언
Queue<Integer> queue = new LinkedList<>();

// 추가
queue.add(1);

//제거
queue.remove(1); //해당 값 삭제
```


<br>


#PriorityQueue

```
시간복잡도
offer(입력)   : O(log n)
peek(get)     : O(1)
poll(반환)    : O(log n)
size          : O(1)
natural order : JVM에서 제공하는 일반적인거와 다를수 있음 순서 ex) 문자는 ASCII 순서로 정렬
java 1.5 에서 나옴
특징 : 일반적은 큐는 FIFO의 구조를 가지지만 자연 네추럴 오더에 따라 정렬
      - Null을 허용하지 않는다.

```


<br>


#ConcurrentLinkedQueue

```
시간복잡도
offer     : O(1)
peek     : O(1)
poll     : O(1)
size     : O(n)
java 1.5 에서 나옴 thread-safe 보장(결과에 문제가 발생할 여지 있음)
특징 : FIFO 방식 Queue
 - 데이터/추가/삭제가 빠름
- size는 O(1)이 아니다.
- null을 허용하지 않는다.

```


<br>


#ArrayBlockingQueue

```
시간복잡도
offer     : O(1)
peek     : O(1)
poll     : O(1)
size     : O(1)
java 1.5에서 나옴
특징 - 고정배열에 일반적인 Queue(FIFO)
- 배열이 고정된 사이즈, 생성되면 변경 안됨

```


<br>


#LinkedBlockingQueue

```
시간복잡도
offer     : O(1)
peek     : O(1)
poll     : O(1)
size     : O(1)
java 1.5 에서 나옴
특징 : FIFO 정렬
- 크기를 지정하지 않을 경우 Integer.MAX_VALUE와 동일하게 생성됨
- 삽입이 동적임

```


<br>


#PriorityBlockingQueue

```
시간복잡도
offer     : O(log n)
peek     : O(1)
poll     : O(log n)
size     : O(1)
java 1.5 에서 나옴
특징 : PriorityQueue 와 같은 정렬식으로 저장
- 논리적으로 한대로 추가 가능
- 자원이 고갈되면 OOM 발생

```


<br>


#DelayQueue

```
시간복잡도
offer     : O(log n)
peek     : O(1)
poll     : O(log n)
size     : O(1)
java 1.5 에서 나옴
특징 : 지연이 만료 되었을 때문 요소를 가져올수있다.

```


<br>


#ArrayDeque

```
시간복잡도
offer     : O(1)
peek     : O(1)
poll     : O(1)
size     : O(1)
java 1.6에서 나옴
특징 : 양 측면에서 요소를 추가하거나 제거 할수 있는 확장 가능한 배열의 특별한 종류

```


<br>


#LinkedBlockingDeque

```
시간복잡도
offer     : O(1)
peek     : O(1)
poll     : O(1)
size     : O(1)
java 1.6
특징 : 무제한으로 인스턴스화 할수 있음
```