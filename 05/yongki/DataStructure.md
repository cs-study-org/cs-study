# 데이터 구조와 처리

- [데이터 구조와 처리](#데이터-구조와-처리)
  - [v8엔진의 가비지 컬렉터, Orinoco](#v8엔진의-가비지-컬렉터-orinoco)
    - [마이너 GC](#마이너-gc)
    - [메이저 GC](#메이저-gc)
  - [LinkedList vs DynamicArray](#linkedlist-vs-dynamicarray)
    - [LinkedList](#linkedlist)
  - [참고문헌](#참고문헌)


## v8엔진의 가비지 컬렉터, Orinoco

2개의 단계와 3개의 알고리즘

### 마이너 GC

마이너 GC는 New Space를 깨끗하게 유지시킨다.

New Space는 크기가 같은 To Space과 From Space로 나뉜다.

객체들은 New Space에 할당되는데, 대부분의 할당은 To Space에서 만들어진다.
또한, 객체에 대한 공간을 예약하려고 할 때마다 증가하는 할당 포인터가 있다.

할당 포인터가 To Space의 마지막에 도달하면, 마이너 GC가 발생한다.

<details>
<summary>아래 과정과 함께 <a href="https://slides.com/kimyongki/deck-eed754/embed">슬라이드</a>를 같이 띄워두고 확인하자.</summary>

<div markdown="1">
1. To Space에 가용 공간이 없는 상태에서, 새 객체를 생성하려할 때, v8은 마이너 GC를 발생시킨다.

2. 마이너 GC는 객체들을 To Space에서 From Space으로 이동시킨다. 이제 모든 객체는 From Space에 있고 To Space은 비워진다.

3. 마이너 GC는 스택 포인터부터 From Space까지 객체 그래프를 재귀적으로 순회하면서 메모리 사용을 유지하는 객체들을 찾는다. 
   
   <br/>
   
    3-1. 이 객체들은 To Space의 페이지로 이동되고, 할당 포인터는 갱신된다. From Space의 모든 객체들을 찾을 때까지 이 과정이 반복된다.

    3-2. 마지막 객체까지 찾으면 To Space는 자동으로 압축되어 조각화를 줄인다.

    3-3. 이제 To Space에 남아있는 객체는 가비지이므로 마이너 GC는 To Space을 비운다.

   <br/>

4. 새 객체는 To Space 메모리에 할당된다.
5. 다시, To Space에 가용 공간이 없는 상태에서, 새 객체를 생성하려할 때, v8은 두번째 마이너 GC를 발생시킨다.
6. 2-3번의 과정이 다시 반복되는데, 특이사항은 두번째 마이너 GC에도 살아남은 객체는 To Space가 아닌 Old Space로 이동한다.

</div>
</details>

### 메이저 GC

마이너 GC 주기를 거치고 Old Space이 거의 다 찾으며 v8이 메이저 GC를 발생한 경우이다.

1. 메이저 GC는 스택 포인터에서 시작해 재귀적으로 객체 그래프를 순회하면서, Old Space 내 메모리를 사용한 객체와 남아있는 객체를 가비지로 표시한다. (Marking)

2. 동시 마킹이 완료되거나 메모리 제한에 도달하면 메이저 GC는 메인 스레드를 사용하여 마킹의 마지막 단계를 수행한다. 
이때,  일시 정지 시간이 발생한다.

3. 메이저 GC는 동시 스위프 스레드를 사용해 모든 참조 없는 객체들의 메모리를 사용 가능한 상태로 표시한다.
또한 조각화를 피하기 위해 관련 메모리 블록을 동일한 페이지로 이동하도록 병렬 압축 작업도 발생한다.

스택 포인터들은 이 3단계로 갱신된다.

## LinkedList vs DynamicArray

### LinkedList

LinkedList는 재귀적으로 정의된 자료구조이다.

먼저 살펴볼 부분은 재귀 함수 호출시 **무한루프 방지 조건**이다.

1. 재귀로 호출한 함수가 끝날때까지 그 이후 명령문은 수행되지 않아야한다.
2. 종료조건이 포함되어야한다.

<hr/>

## 참고문헌

[Visualizing memory management in V8 Engine)](https://ui.toast.com/weekly-pick/ko_20200228) -- Deepu K Sasidharan

[V8 Minor GC](https://speakerdeck.com/deepu105/v8-minor-gc) -- Deepu K Sasidharan
