# 데이터 구조와 처리

- [데이터 구조와 처리](#데이터-구조와-처리)
  - [Javascript 빌트인 자료형](#javascript-빌트인-자료형)
    - [객체](#객체)
      - [Indexed collections: 배열](#indexed-collections-배열)
      - [Keyed collections: Map](#keyed-collections-map)
      - [Keyed collections: Set](#keyed-collections-set)
  - [v8엔진의 가비지 컬렉터, Orinoco](#v8엔진의-가비지-컬렉터-orinoco)
    - [마이너 GC](#마이너-gc)
    - [메이저 GC](#메이저-gc)
    - [GC 컨텍스트](#gc-컨텍스트)
  - [LinkedList vs DynamicArray](#linkedlist-vs-dynamicarray)
    - [LinkedList](#linkedlist)
  - [참고문헌](#참고문헌)

## Javascript 빌트인 자료형

들어가기 앞서 기저 지식을 밟고 진행하자.

1. 시간 복잡도에서 계산 기준은 다음과 같다.

    > a. 최악의 상황을 고려한다.
    > b. 상수는 제거한다.

2. 공간 복잡도에 영향을 미치는 요소는 다음과 같다.

    > 변수, 자료구조, 함수 호출, 할당

3. 공간 복잡도를 계산할 때 입력 값은 중요한 부분이 아니다.

### 객체

#### Indexed collections: 배열

**정의**

    배열은 정수 키를 가진 속성과 length 속성 사이에 특별한 연관을 지어놓은 일반 객체이다.

**Time Complexity**

| Access | Search | Insertion | Deletion |
| :----: | :----: | :-------: | :------: |
|        |        |           |          |

#### Keyed collections: Map

**정의**

    Map은 

**Time Complexity**

| Access | Search | Insertion | Deletion |
| :----: | :----: | :-------: | :------: |
|        |  O(n)  |           |          |

#### Keyed collections: Set

**정의**

    Set은 

**Time Complexity**

| Access | Search | Insertion | Deletion |
| :----: | :----: | :-------: | :------: |
|        |        |           |          |

<hr/>

## v8엔진의 가비지 컬렉터, Orinoco

![GC](assets/gc.jpg)

### 마이너 GC

마이너 GC는 New Space를 깨끗하게 유지시킨다.

New Space는 크기가 같은 To Space과 From Space로 나뉜다.

객체들은 New Space에 할당되는데, 대부분의 할당은 To Space에서 만들어진다.

또한, 객체에 대한 공간을 예약하려고 할 때마다 증가하는 할당 포인터가 있다.
> 예시사진과 슬라이드에서는 제외됨

할당 포인터가 To Space의 마지막에 도달하면, 마이너 GC가 발생한다.

<details>
<summary>
  아래 과정과 함께 
  <a href="https://slides.com/kimyongki/deck-eed754/embed">슬라이드</a>를
    같이 띄워두고 확인하자.
</summary>

<div markdown="1">
<br/>

1. To Space에 가용 공간이 없는 상태에서, 새 객체를 생성하려할 때, v8은 마이너 GC를 발생시킨다.

2. 마이너 GC는 객체들을 To Space에서 From Space으로 이동시킨다. 이제 모든 객체는 From Space에 있고 To Space은 비워진다.

3. 마이너 GC는 GC 루트부터 From Space까지 객체 그래프를 재귀적으로 순회하면서 메모리 사용을 유지하는 객체들을 찾는다.
   
   <br/>
   
    3-1. 이 객체들은 To Space의 페이지로 이동되고, 할당 포인터는 갱신된다. From Space의 모든 객체들을 찾을 때까지 이 과정이 반복된다.

    3-2. 마지막 객체까지 찾으면 To Space는 자동으로 압축되어 조각화를 줄인다.

    3-3. 이제 From Space에 남아있는 객체는 가비지이므로 마이너 GC는 From Space을 비운다.

   <br/>

4. 새 객체는 To Space 메모리에 할당된다.

5. 다시, To Space에 가용 공간이 없는 상태에서, 새 객체를 생성하려할 때, v8은 두번째 마이너 GC를 발생시킨다.

6. 2-3번의 과정이 다시 반복되는데, 특이사항은 두번째 마이너 GC에도 살아남은 객체는 To Space가 아닌 Old Space로 이동한다.

</div>
</details>

### 메이저 GC

메이저 GC는 Old Space를 깨끗하게 유지시킨다.

<details>
<summary>
  아래 과정과 함께 
  <a href="https://slides.com/kimyongki/deck-15dbf8/embed">슬라이드</a>를
  같이 띄워두고 확인하자.
</summary>

<div markdown="1">
<br/>

1. 마이너 GC 주기를 거치고 Old Space가 거의 다 찾으면 v8이 메이저 GC를 발생한다.
   
2. 메이저 GC는 GC 루트부터 시작해 객체 그래프를 재귀적으로 순회하면서, 메모리 사용을 유지하는 객체들을 찾아 활성 상태로 표시(Marking)한다.
   
   > Marking은 힙 메모리를 방향 그래프로 간주해 깊이 우선 탐색을 수행한다.

3. 메이저 GC가 힙 메모리를 순회하면서 활성 상태로 표시되지 않은 객체들의 메모리 주소를 기록(Sweeping)한다. 이 공간은 이제 사용 가능하다고 표시되며 다른 객체들을 저장하는데 사용될 수 있다.

4. 메이저 GC는 모든 활성 상태의 객체들을 압축(Compacting)하여 조각화를 줄이고 새 객체들에 대한 메모리 할당 성능을 증가시킨다.

</div>
</details>

### GC 컨텍스트

위 목차들을 통해 우리는 의문을 제기할 수 있다.

🤔 *싱글스레드인 v8엔진에서 GC는 메인스레드의 작업을 일시중지 시키지 않을까?*

![GC](https://v8.dev/_img/trash-talk/01.svg)

다음은 여러 방안과 트레이드 오프를 알아보자.

<table style="text-align: left;">
  <tr>
    <th colspan="2">1. GC를 Parallel(병렬)처리
      <p style="float: right;">
        사용대상: 마이너 GC
      </p>
    </th>
  </tr>  
  <tr>
    <td>
      <img width="100%" src="https://v8.dev/_img/trash-talk/05.svg">
    </td>
    <td>      
      장점
      <blockquote>GC의 작업을 양분할 수 있다.
      </blockquote>
      단점
      <blockquote>
      a. 일시중지 문제는 해결되지 않았다.<br/>
      b. 스레드 간 동기화 작업이 필요하다.      
      <blockquote>
    </td>
  </tr>  
</table>
      
<table style="text-align: left;">
  <tr>
    <th colspan="2">2. 메인스레드가 GC 작업을 교차하며 처리</th>
  </tr>  
  <tr>
    <td>
      <img width="100%" src="https://v8.dev/_img/trash-talk/06.svg">
    </td>
  </tr>  
  <tr>
    <td>
      단점
      <blockquote>    
      <p>a. Javascript 작업도 교차되는데, GC에 의해 변경이 잦은 힙에서 이전 Javascript 작업이 무효화 될 경우가 존재한다.</p>
      <p>b. 일시중지 문제는 해결되지 않으며, 오히려 시간을 더 증가시킨다.</p>
      <blockquote>
    </td>
  </tr>
</table>
  
<table style="text-align: left;">
  <tr>
    <th colspan="2">3. GC의 작업을 온전히 별도의 스레드에서 처리</th>
  </tr>  
  <tr>
    <td>
      <img width="100%" src="https://v8.dev/_img/trash-talk/07.svg">
    </td>
  </tr>  
  <tr>
    <td>
      장점
      <blockquote>
      메인 스레드의 Javascript 작업이 자유롭다.
      </blockquote>
      단점
      <blockquote>          
      메인 스레드와 별도의 스레드가 같은 객체를 동시에 읽기/쓰기 경쟁이 이루어진다.
      <blockquote>
    </td>
  </tr>
</table>

<table style="text-align: left;">
  <tr>
    <th colspan="2">4. 메이저 GC
      <p style="float: right;">
        사용대상: 메이저 GC
      </p>
    </th>
  </tr>  
  <tr>
    <td>
      <img width="100%" src="https://v8.dev/_img/trash-talk/09.svg">
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <b>사진 설명</b>
      <p>
         1. Javascript 작업 때 별도의 스레드가 Marking 작업을 같이 합니다.
      </p>
      <p>
         2. 별도의 스레드가 Marking 작업을 완료된 시점에 Javascript 작업을 일시 중단하는데, 이때 메인 스레드가 Marking 작업을 최종적으로 빠르게 점검합니다.
      </p>
      <p>
        3. 메인 스레드는 별도의 스레드는 일시 중지 기간동안 함께 Sweeping,  Compacting작업과 할당 포인터(새 객체를 할당할 때 체킹하는 역할)를 업데이트합니다.
      </p>      
    </td>
  </tr>  
  <tr>
    <td>
      장점
      <blockquote>
      <p>a. Compacting 작업을 메인 스레드와 별도의 스레드가 병렬 작업한다.</p>
      <p>b. Sweeping 작업과 Javascript 작업을 동시 작업한다.</p>
      </blockquote>
      단점
      <blockquote>          
      일시중지 문제는 해결되지 않았다.
      <blockquote>
    </td>
  </tr>
</table>

## LinkedList vs DynamicArray

### LinkedList

LinkedList는 재귀적으로 정의된 자료구조이다.

먼저 살펴볼 부분은 재귀 함수 호출시 **무한루프 방지 조건**이다.

1. 재귀로 호출한 함수가 끝날때까지 그 이후 명령문은 수행되지 않아야한다.
2. 종료조건이 포함되어야한다.

<hr/>

## 참고문헌

[Visualizing memory management in V8 Engine](https://ui.toast.com/weekly-pick/ko_20200228) -- Deepu K Sasidharan

[V8 Minor GC](https://speakerdeck.com/deepu105/v8-minor-gc) -- Deepu K Sasidharan

[The Orinoco garbage collector](https://v8.dev/blog/trash-talk) -- Peter Marshall

[시간복잡도 with Javascript](https://overcome-the-limits.tistory.com/entry/자료구조-시간복잡도-with-JavaScript?category=910696#big-o-계산-규칙) -- const_p

[Javascript의 타입과 자료구조](https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures) -- MDN