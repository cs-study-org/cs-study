# 자료구조
## 목차

## 1. 자료구조란?

## 2. 자료구조가 필요한 이유

## 3. 자료구조 선택 기준

## 4. 자료구조 특징

## 5. 자료구조 종류

## 6. 선형 자료구조

## 7. 비선형 자료구조

## 8. 파일 구조

<br>

* * *

<br>

## 자료구조란?

자료구조(Data Structure)는 컴퓨터 과학에서 효율적인 접근 및 수정을 가능케 하는 자료의 집합을 의미하며,

각 원소들 사이 관계가 논리적으로 정의된 일정한 규칙에 의해 나열되며 자료에 대한 처리를 효율적으로 수행 할 수 있도록 자료를 조직적, 체계적으로 구분하여 표현한 것을 말한다.

<br>

* * *

<br>

## 자료구조가 필요한 이유?

데이터를 효율적으로 저장 / 관리 하며 메모리를 효율적으로 사용함에 있으며 적절한 자료구조의 사용은 메모리의 용량 절약과 실행 시간을 단축할 수 있다.

자료구조의 목적)

- 메모리 절약
- 실행 시간 단축
- 프로그램의 구현 단순화

<br>

* * *

<br>

## 자료구조의 선택 기준

자료구조의 선택이 중요한 이유는

>⇒ 적은 양에 데이터 처리에 어떤 자료구조를 사용하든 큰 차이는 나지 않음

>⇒ 하지만 대량의 데이터를 처리함에 있어 어떠한 자료구조를 사용하는 가에 따라 효율성면에서 굉장한 차이가 있다.

자료구조 선택 기준

- 자료의 처리 시간
- 자료의 크기
- 자료의 활용 빈도
- 자료의 갱신 정도
- 프로그램의 용이성

<br>

* * *

<br>

## 자료구조의 특징

1. 효율성
    - 자료구조를 사용하는 목적은 효율적인 데이터 관리 및 사용
        
        ⇒ 그 목적에 맞게 문제에 알맞은 자료구조 사용으로 업무의 효율의 증가를 가능케 한다.
        
        <br>

2. 추상화
    - 추상화(Abstraction)은 복잡한 자료, 모듈, 시스템 등으로 부터 핵심 개념이나 기능을 간추려 내는 것을 의미한다
    - 자료구조를 통해 데이터를 처리할때
        - 어느 시점에 데이터를 삽입할 것인가
        - 어느 시점에 데이터를 추출할 것인가
            
            >⇒ 위의 두가지 초점에 집중한다
            
        
        ⇒ 이말은 곧 데이터를 어떻게 삽입, 추출, 사용 하는지에 대한 알고리즘에 중점 을 두지 않는다.
        
        <br>
    
    결론)
    
    데이터를 처리하는 관점에서 각 자료구조의 내부 구현을 알아야 할 필요 없이 어떻게 사용하는 지에 대한 인터페이스를 알면 사용이 가능
    
    >⇒ 이를 통해 자료구조의 추상화는 구현 언어에 따른 직접 사용 코드는 다르지만, 자료구조에 대한 추상적 개념만 알고 있으면 사용 할 수 있기에 언어의 종속적이지 않다는 특징을 가진다.
    
    <br>

3. 재사용성
    
    자료구조 설계에 있어서, 특정 프로그램에서만 동작하게 설계하지 않기 때문에
    
    >⇒ 다양한 프로그램에서 적용할 수 있도록 설계되어 있어 범용적으로 자료구조를 사용할 수 있다.

<br>

* * *

<br>

## 자료구조의 종류

<br>

자료의 특성, 크기, 주요 사용법, 수행하는 연산의 종류, 구현에 필요한 기억 공간의 크기 등에 따라 여러가지 종류의 자료구조로 나뉘게 되며

>⇒ 작업에 알맞은 자료구조를 선택하여 사용할 수 있다.

![스크린샷 2022-01-17 오전 1.09.20.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4e40deb0-b4ee-47a5-a617-3c2319841166/스크린샷_2022-01-17_오전_1.09.20.png)

<br>

자료구조의 분류

- 자료형에 따라 분류하는 단순구조
- 자료 간 관계가 1:1 선형구조
- 자료 간 관계가 1:N 비선형구조
- 파일구조
    
    >⇒ 로 나눌 수 있다.

<br>

* * *

<br>

## 단순 구조

단순 구조란 프로그램 언어에서 제공하는 기본적인 자료형(Data Type)

- 정수(int)
- 실수(double, float)
- 문자( char)
    
    ⇒ 등이 있다.

<br>

* * *

<br>    

## 선형 구조

![스크린샷 2022-01-17 오전 3.29.12.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cba4565e-7a7e-495e-a579-f3169479c29c/스크린샷_2022-01-17_오전_3.29.12.png)

선형 구조란? 

>⇒ 자료를 구성하는 데이터를 순차적으로 나열시킨 형태의 자료구조

<br>

### 선형구조의 자료구조

<br>

### 순차 리스트 (ArrayList)

순차리스트 (ArrayList)

>⇒ 구현할 자료들을 논리적 순서대로 메모리에 연속적으로 저장하는 자료구조

- 특징
    - 데이터를 논리적인 순서대로 메모리에 연속하여 저장하는 구현하는 방식
    - 데이터의 논리적인 순서와 기억 장소에 저장되는 물리적 순서가 일치하는 구조다.
    - 배열을 이용해 구현한다.
    
    <br>

- 장점
    - 인덱스로 랜덤하게 접근할 수 있기 때문에 접근 속도가 매우 빠름
        
        ⇒ **탐색에서 효율적인 자료구조**
        
    - 연속된 메모리 공간에 존재하기 때문에 관리가 편리하다.

    <br>

- 단점
    - 배열을 통해 구현하기 때문에 배열의 메모리 사용의 비효율성 문제를 가지고 있다.
        - 배열의 크기 > 데이터 수 : 메모리 공간의 낭비
        - 배열의크기 < 데이터 수 : 데이터 저장이 불가능
        - 삽입 & 삭제 연산 후 연속적 물리 주소를 유지하기 위해 원소들을 이동시키는 추가 작업과 시간이 소요된다.
            
            >⇒ 원소의 개수가 많고 삽입 & 삭제 연산이 많은 경우 원소들의 이동 작업으로 인한 오버헤드가 증가한다.
            
            <br>

- 삽입 연산
    - 새로운 원소 삽입 과정
        1. 원소를 삽입할 빈 자리를 만들기 ( 삽입할 자리 이후 원소들을 한 칸씩 뒤로 이동)
        2. 빈자리에 원소 삽입하기

        <br>

    - 삽입 자리를 만들기 위한 자리 이동 횟수
        
        ![스크린샷 2022-01-17 오전 4.10.31.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/536aa9b5-1cc8-45e7-ad24-c618f3c836f1/스크린샷_2022-01-17_오전_4.10.31.png)
        
        - N - K +1
            - N : 마지막 원소의 인덱스
            - K : 삽입할 인덱스 번호

            <br>

- 삭제
    - 원소 삭제 과정
        1. 원소 삭제하기
        2. 삭제한 빈 자리 채우기 ( 삭제한 자리 이후 원소들을 한 칸씩 앞으로 이동)
        
        <br>

    - 삽입 자리를 만들기 위한 자리 이동 횟수
        
        ![스크린샷 2022-01-17 오전 4.12.47.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bc349c9f-41f4-473c-97d2-4cb3acfab8b1/스크린샷_2022-01-17_오전_4.12.47.png)
        
        - N - K
            - N : 마지막 원소의 인덱스
            - K : 삭제한 원소의 인덱스
            
    
    <br>

### 연결 리스트 (Linked List)

- 연결 리스트 ( Linked list )
    
    >⇒ 데이터에 저장되어 있는 다음 데이터의 주소에 의해 연결되는 방식
    
    <br>

    - 특징
        - 데이터의 물리적인 순서와 상관없이 포인터를 사용하여 논리적인 순서대로 연결하는 구조다.
            
            >⇒ **노드**라는 각각의 독립된 공간을 사용해 데이터를 담는다.
            
        - 데이터의 논리적인 순서와 물리적인 순서가 일치하지 않아도 된다.
        - 포인터를 이용해 구현한다.
        - 연결리스트는 자신과 인접해있는 데이터에 접근할 수 있는 자료구조로써, 주로 데이터를 순회할 때 사용한다.
        
        <br>

    - 장점
        - 물리적 순서를 맞추기 위한 오버헤드가 발생하지 않는다.
        - 크기 변경이 유연하고, 효율적으로 메모리를 사용할 수 있다
            
            >⇒ 순차 리스트는 고정적인 크기에 비해 연결리스트는 가변적이기 때문에 순차 리스트의 단점 보완이 가능하다.
            
        <br>

        - 삽입 & 삭제가 용이하다
            
            >⇒ **데이터 추가 삭제에 효율적인 자료구조**
            
            <br>

    - 단점
        - 임의의 즉 랜덤한 데이터에 접근시 오래걸린다.
            
            >⇒ 순차 탐색을 통해서만 접근이 가능하다.
            
        - 포인터를 통해 다음 노드를 참조하므로 추가적인 메모리 공간이 발생한다.
            
            >⇒ 참조 주소를 담을 메모리 공간이 추가 필요하다.
            
            <br>
        
    - 연결 리스트 구조
        - 노드
            
            ![스크린샷 2022-01-17 오전 4.30.10.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/53b8f3bb-b270-42ef-aaf5-54da96718408/스크린샷_2022-01-17_오전_4.30.10.png)
            
            - 연결리스트는 노드라는 객체로 구성된다.
                
                >⇒ 실제 데이터가 저장되는 데이터 공간
                
                >⇒ 다음 주소를 가리키는 주소 공간
                
            
            ```c
            // 노드 구조체
            typedef struct Node{
            	int data;
            	Node *next;
            }Node;
            ```
            
            <br>
        
        - 구조
            
            ![스크린샷 2022-01-17 오전 4.32.40.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f307a2c6-9104-4120-aff8-cb05b8297dc7/스크린샷_2022-01-17_오전_4.32.40.png)
            
            - 각 노드는 연속된 공간에 저장되어 있지 않고 메모리의 여러 부분에 분포되어 있다.
            - 각 노드에 다음 노드 주소를 저장하여 다음 노드를 탐색할 수 있다.
                
                >⇒ 다음 주소를 가리켜야 하기 때문에 포인터를 사용해 구현
                
            - 노드가 가리키는 주소가 NULL이면 마지막 노드
            
            <br>

    - 연결리스트 종류
        
        
        - 단순 연결 리스트
            
            ![스크린샷 2022-01-18 오후 10.48.22.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/44ab515e-7798-4acf-8de0-833051323776/스크린샷_2022-01-18_오후_10.48.22.png)
            
            - 단순 연결 리스트(Singly Linked List)는 리스트의 가장 기본적인 사진과 같은 형태이며, 테일의 포인터 변수가 NULL을 가리키는게 특징이다.
            - 현재 노드에서 다음 노드로 넘어갈 수 있지만, 현재노드에서 이전 노드로 넘어갈 수 없다.
            
            <br>

            - 삽입
                
                <details>
                <summary> 삽입 </summary>
                
                **○ 삽입**
                
                ① 공백 노드를 생성한다. 포인터 변수가 가리키게 하고, 새 노드의 데이터 필드에 값을 저장한다.
                
                ![https://blog.kakaocdn.net/dn/G4JxL/btq8eH084Y9/Zi5WXJ2k5lc45HI9AbjX4K/img.png](https://blog.kakaocdn.net/dn/G4JxL/btq8eH084Y9/Zi5WXJ2k5lc45HI9AbjX4K/img.png)
                
                ---
                
                ② 새 노드의 링크값을 저장한다. <- 새 노드의 링크 필드에 다음 노드의 주소 값을 저장한다.
                
                ![https://blog.kakaocdn.net/dn/epiBjO/btq8jdyfqI7/c4VV39tNPokzaICG7HK8yk/img.png](https://blog.kakaocdn.net/dn/epiBjO/btq8jdyfqI7/c4VV39tNPokzaICG7HK8yk/img.png)
                
                ---
                
                ③ 앞 노드와 새 노드를 연결한다. <- 앞 노드의 링크 필드에 새 노드의 주소 값을 저장한다.
                
                ![https://blog.kakaocdn.net/dn/bt4tSx/btq8lDp11bz/rpGXRwPPTFa02TjS0MRxB1/img.png](https://blog.kakaocdn.net/dn/bt4tSx/btq8lDp11bz/rpGXRwPPTFa02TjS0MRxB1/img.png)
                
                </div> 
                </details>

            <br>

            - 삭제
                
                <details>
                <summary> 삭제 </summary>

                **○ 삭제**
                
                ① 삭제할 노드의 앞 노드를 찾는다.
                
                ![https://blog.kakaocdn.net/dn/bBbk2H/btq8mlbldO7/iTbTAXp6R05EId2aCKPsI1/img.png](https://blog.kakaocdn.net/dn/bBbk2H/btq8mlbldO7/iTbTAXp6R05EId2aCKPsI1/img.png)
                
                ---
                
                ② 삭제할 노드의 앞 노드와 삭제한 노드의 다음 노드를 연결한다. <- 앞 노드에 삭제할 노드의 링크 필드값을 저장한다.
                
                ![https://blog.kakaocdn.net/dn/GYDfV/btq8mkXPyFT/BKxe4TPAUQzv0xGkVM1TG1/img.png](https://blog.kakaocdn.net/dn/GYDfV/btq8mkXPyFT/BKxe4TPAUQzv0xGkVM1TG1/img.png)

                </div> 
                </details>

            <br>
            
        - 이중 연결 리스트
            
            ![스크린샷 2022-01-18 오후 10.48.34.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/160777c8-667f-45c0-b530-e49e66b97aa1/스크린샷_2022-01-18_오후_10.48.34.png)
            
            - Doubly linked list의 핵심은 노드와 노드가 서로 연결되어 있다는 점 이다.
            - 그림을 보면 단순 연결 리스트(linked list)와는 다르게 노드가 이전 노드(previous)와 다음 노드(next)로 구성되어 있다.
            
            - 단순 연결리스트 대비 장단점
                - 장점: 연속적인 탐색&액세스가 이루어져야 하는 경우 탐색 시간 절감
                - 단점: 포인터를 위한 공간이 2배로 사용됨
            
            - 삽입

                <details>
                <summary> 삽입 </summary>
                
                **○ 삽입**
                ① 공백 노드를 생성한다. 포인터 변수가 가리키게 하고, 새 노드의 데이터 필드에 값을 저장한다.
                
                ![https://blog.kakaocdn.net/dn/dlyN0C/btq8kIE7d2u/XBN43fezbsh99m94KSjxn0/img.png](https://blog.kakaocdn.net/dn/dlyN0C/btq8kIE7d2u/XBN43fezbsh99m94KSjxn0/img.png)
                
                ---
                
                ② 새 노드의 링크값을 저장한다.
                
                - > 새 노드의 왼쪽 링크 필드에 앞 노드의 주소 값, 오른쪽 링크 필드에 다음 노드의 주소 값을 저장한다.
                
                ![https://blog.kakaocdn.net/dn/brECY1/btq8mmBiIUO/RkraGKQ2OcDRWifnvQPC61/img.png](https://blog.kakaocdn.net/dn/brECY1/btq8mmBiIUO/RkraGKQ2OcDRWifnvQPC61/img.png)
                
                ---
                
                ③ 앞 노드와 새 노드, 새 노드와 다음 노드를 연결한다.
                
                - > 앞 노드의 오른쪽 링크 필드에 새 노드의 주소 값, 다음 노드의 왼쪽 링크 필드에 새 노드의 주소 값을 저장한다.
                
                ![https://blog.kakaocdn.net/dn/sxVTw/btq8hp6LpoQ/P2ksHU0LArk3ViT2WbXs00/img.png](https://blog.kakaocdn.net/dn/sxVTw/btq8hp6LpoQ/P2ksHU0LArk3ViT2WbXs00/img.png)
                
                </div> 
                </details>

            - 삭제
                
                <details>
                <summary> 삭제 </summary>
                **○ 삭제**
                
                ① 삭제할 노드를 찾는다.
                
                ![https://blog.kakaocdn.net/dn/zWvVN/btq8oj4WQTF/IK97LxjEEDEOQ80jXu8ie0/img.png](https://blog.kakaocdn.net/dn/zWvVN/btq8oj4WQTF/IK97LxjEEDEOQ80jXu8ie0/img.png)
                
                ---
                
                ② 삭제할 노드의 앞 노드와 삭제한 노드의 다음 노드를 연결한다.
                
                - > 앞 노드의 오른쪽 링크 필드에 삭제할 노드의 오른쪽 링크 필드값을 저장한다.
                - > 다음 노드의 왼쪽 링크 필드에 삭제할 노드의 왼쪽 링크 필드값을 저장한다.
                
                ![https://blog.kakaocdn.net/dn/Z8r2j/btq8hqq335G/vB7b3dGkpA2uLGIGem8wHk/img.png](https://blog.kakaocdn.net/dn/Z8r2j/btq8hqq335G/vB7b3dGkpA2uLGIGem8wHk/img.png)
                
                </div> 
                </details>
            
            <br>

        - 원형 연결 리스트
            
            ![스크린샷 2022-01-18 오후 10.48.45.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/46283250-ee22-4b9f-a7e9-85e99b02fea5/스크린샷_2022-01-18_오후_10.48.45.png)
            
            - 단순 연결 리스트에서 마지막 노드가 리스트의 첫 번째 노드를 가리키게 하여 리스트의 구조를 원형으로 만든 리스트 이다.
            - 마지막 노드와 첫 노드를 **O(1)** 시간에 방문할 수 있는 장점
            
            

            - 삽입
                

                <details>
                <summary> 삽입 </summary>
                **○ 삽입**
                
                ① 공백 노드를 생성한다. 포인터 변수가 가리키게 하고, 새 노드의 데이터 필드에 값을 저장한다.
                
                ![https://blog.kakaocdn.net/dn/G4JxL/btq8eH084Y9/Zi5WXJ2k5lc45HI9AbjX4K/img.png](https://blog.kakaocdn.net/dn/G4JxL/btq8eH084Y9/Zi5WXJ2k5lc45HI9AbjX4K/img.png)
                
                ---
                
                ② 새 노드의 링크값을 저장한다. <- 새 노드의 링크 필드에 다음 노드의 주소 값을 저장한다.
                
                ![https://blog.kakaocdn.net/dn/bfOW4s/btq8iv0xn4D/HiuOJHxMFhEeUIn1abGLI1/img.png](https://blog.kakaocdn.net/dn/bfOW4s/btq8iv0xn4D/HiuOJHxMFhEeUIn1abGLI1/img.png)
                
                ---
                
                ③ 앞 노드와 새 노드를 연결한다. <- 앞 노드의 링크 필드에 새 노드의 주소 값을 저장한다.
                
                ![https://blog.kakaocdn.net/dn/bTi0bG/btq8dxEsfw3/pHYr5KWIzJaE9XDEJPD7A0/img.png](https://blog.kakaocdn.net/dn/bTi0bG/btq8dxEsfw3/pHYr5KWIzJaE9XDEJPD7A0/img.png)

                </div> 
                </details>
            

            - 삭제
                
                <details>
                <summary> 삭제 </summary>

                **○ 삭제**
                
                ① 삭제할 노드의 앞 노드를 찾는다.
                
                ![https://blog.kakaocdn.net/dn/OzpoT/btq8ntfEW41/X80hOPxa91wpFoqvgsY4oK/img.png](https://blog.kakaocdn.net/dn/OzpoT/btq8ntfEW41/X80hOPxa91wpFoqvgsY4oK/img.png)
                
                ---
                
                ② 삭제할 노드의 앞 노드와 삭제한 노드의 다음 노드를 연결한다. <- 앞 노드에 삭제할 노드의 링크 필드값을 저장한다.
                
                ![https://blog.kakaocdn.net/dn/bVJ9bT/btq8mmg0tqz/6ZOSv5gU0WLQqK78I8vjKK/img.png](https://blog.kakaocdn.net/dn/bVJ9bT/btq8mmg0tqz/6ZOSv5gU0WLQqK78I8vjKK/img.png)

                </div> 
                </details>
            
        - 이중 순환 연결 리스트
            
            ![스크린샷 2022-01-18 오후 10.51.57.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/45b11e3d-f375-405c-9eb6-5cf769376f4b/스크린샷_2022-01-18_오후_10.51.57.png)
            
            - 원형 연결 리스트의 특성과, 이중 연결 리스트를 결합한 구조
            - 삽입
                 
                <details>
                <summary> 삽입 </summary>
                **○ 삽입**
                
                ① 공백 노드를 생성한다. 포인터 변수가 가리키게 하고, 새 노드의 데이터 필드에 값을 저장한다.
                
                ![https://blog.kakaocdn.net/dn/cbDNj0/btq8lEoSP25/bxkpaqWOdqVqX49dsMJVuk/img.png](https://blog.kakaocdn.net/dn/cbDNj0/btq8lEoSP25/bxkpaqWOdqVqX49dsMJVuk/img.png)
                
                ---
                
                ② 새 노드의 링크값을 저장한다.
                
                - > 새 노드의 왼쪽 링크 필드에 앞 노드의 주소 값, 오른쪽 링크 필드에 다음 노드의 주소 값을 저장한다.
                
                ![https://blog.kakaocdn.net/dn/DsoFh/btq8mlCnP3Z/vfCbwjjO0o8MskHfMTnD20/img.png](https://blog.kakaocdn.net/dn/DsoFh/btq8mlCnP3Z/vfCbwjjO0o8MskHfMTnD20/img.png)
                
                ---
                
                ③ 앞 노드와 새 노드, 새 노드와 다음 노드를 연결한다.
                
                - > 앞 노드의 오른쪽 링크 필드에 새 노드의 주소 값, 다음 노드의 왼쪽 링크 필드에 새 노드의 주소 값을 저장한다.
                
                ![https://blog.kakaocdn.net/dn/dx3L6F/btq8jKiUVP1/miVYlHSdkElB8vm16PPBu0/img.png](https://blog.kakaocdn.net/dn/dx3L6F/btq8jKiUVP1/miVYlHSdkElB8vm16PPBu0/img.png)
                
                </div> 
                </details>

            - 삭제
                <details>
                <summary> 삭제 </summary>

                **○ 삭제**
                
                ① 삭제할 노드를 찾는다.
                
                ![https://blog.kakaocdn.net/dn/v12eI/btq8iwSLtwU/KEdCPY4iFKW7fCnOCT7lk0/img.png](https://blog.kakaocdn.net/dn/v12eI/btq8iwSLtwU/KEdCPY4iFKW7fCnOCT7lk0/img.png)
                
                ---
                
                ② 삭제할 노드의 앞 노드와 삭제한 노드의 다음 노드를 연결한다.
                
                - > 앞 노드의 오른쪽 링크 필드에 삭제할 노드의 오른쪽 링크 필드값을 저장한다.
                - > 다음 노드의 왼쪽 링크 필드에 삭제할 노드의 왼쪽 링크 필드값을 저장한다.
                
                ![https://blog.kakaocdn.net/dn/8zmmv/btq8nEBmqF3/1xmdWiI3YQjbPJTFFqfcV1/img.png](https://blog.kakaocdn.net/dn/8zmmv/btq8nEBmqF3/1xmdWiI3YQjbPJTFFqfcV1/img.png)
                
                </div> 
                </details>
    
    <br>

    - 순차 리스트(배열) vs 연결리스트
        
        ![스크린샷 2022-01-17 오전 4.28.31.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3e04111d-2551-4ad8-b60d-984feca582ea/스크린샷_2022-01-17_오전_4.28.31.png)
        
        - 탐색에 있어 배열의 시간복잡도 = O(1)
        - 탐색에 있어 n개의 노드를 가진 연결리스트 = O(n)


<br>

### 스택( stack )

**스택(Stack)..(선형 자료구조)**

![스크린샷 2022-01-04 오전 1.17.40.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/563bdead-6e5a-416a-9bd5-0fa91569c6b2/스크린샷_2022-01-04_오전_1.17.40.png)

스택은 컴퓨터의 기본 자료구조 중 하나로 한쪽 끝에서만 자료를 넣거나 뺄 수 있는 LIFO 형식의 자료 구조

- 특징
    - 가장 최근에 들어온 자료가 가장 먼저 나가게 되는 ***LIFO(Last-In First-Out)*** 형태를 갖는다.
    - 스택의 입출력은 맨 위에서만 일어나기 때문에 스택의 **중간에서는 데이터를 삭제하는 것이 *불가능***
    - 스택이 입출력이 이루어지는 부분을 *스택 상단(Stack top)* , 바닥 부분을 *스택 하단(Stack bottom)* , 스택에 저장되는 것을 *요소(Element)* 라 부르며 스택에 요소가 하나도 없을 때 그러한 스택을 *공백 스택(Empty stack)* 이라고 합니다.
    - 택에 요소를 *삽입하는 연산* 을 **Push** , *삭제 연산* 을 **Pop** 이라고 한다.

    <br>

- 장점
    - 구조가 단순해 구현이 쉽다
    - 데이터 저장/읽기 속도가 빠르다
    
    <br>

- 단점
    - TOP 위치 이외의 데이터에 접근할 수 없기 때문에 탐색이 불가능하다.
        
        >⇒  탐색하려면 모든 데이터를 꺼내면서 진행해야 한다.
        
    - 데이터 최대 갯수를 미리 정해야한다
        
        >⇒ 예를 들어 재귀함수의 최대 호출 수가 지정되어 있다.
        
    - 미리 최대 갯수를 정하여 저장공간의 낭비가 발생할 수 있다.

<br>

- 사용 사례
    - 재귀 알고리즘
    - 실행 취소 (undo)
    - 웹 브라우저 뒤로가기
    - 문자열의 역순 출력 등

<br>

### 큐 (Queue)

**큐(QUEUE) ..(선형 자료구조)**

![스크린샷 2022-01-04 오전 1.23.11.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/520f56ed-f35b-4d1c-8b47-bd0fdf696a86/스크린샷_2022-01-04_오전_1.23.11.png)

⇒ 큐란 컴퓨터의 기본 자료구조 중 하나로 먼저 들어온 데이터가 먼저 나가는 구조로 되어 있는 자료구조 이다.

- 가장 최근 들어온 자료가 가장 먼저 나가는 *FIFO(First-In First-Out) 선입선출 형태를 갖는다.*
- 큐는 한쪽에서는 데이터가 추가되고 한쪽에서는 데이터가 삭제되는 구조를 가지고 있다.
- 큐에서 **삽입(Enqueue)** 이 일어나는 곳을 **Rear** 라고 하며 **삭제(Dequeue)** 가 일어나는 곳을 **Front** 라고 한다.
- 큐의 종류
    - Linear Queue(선형 **큐**)
        
        ![스크린샷 2022-01-19 오전 12.22.20.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dd7f9486-4772-442c-99bd-d7a8efea3801/스크린샷_2022-01-19_오전_12.22.20.png)
        
    - Circular Queue (원형 **큐**)
        
        ![스크린샷 2022-01-19 오전 12.22.38.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0f045679-d148-4f94-8956-bb27dd831880/스크린샷_2022-01-19_오전_12.22.38.png)
        
    - Priority Queue(우선순위 **큐**)
        
        >⇒ 들어간 순서에 상관 없이 우선순위가 높은 데이터가 먼저 나오는 큐
        
        >⇒ heap이라는 완전 이진트리 자료구조를 가지고 구현할 수 있다.

<br>        

- 장점
    - 데이터 접근 삽입 삭제가 빠르다.
- 단점
    - 중간에 위치한 데이터에 대한 접근이 불가능

<br>

- 사용
    - 캐시(Cache) 구현
    - 우선순위가 같은 작업 예약 (인쇄 대기열)
    - 선입선출이 필요한 대기열 (티켓 카운터)
    - 프린터의 출력 처리 등

<br>

### 덱 ( Deque)

![스크린샷 2022-01-19 오전 12.05.06.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8224de8f-9fbc-4da6-95d9-16e63c5d1da6/스크린샷_2022-01-19_오전_12.05.06.png)

Deque 는 **Double - Ended Queue** 의 줄임말

>⇒ 한쪽에서만 삽입, 다른 한쪽에서만 삭제가 가능했던 큐와 달리 양쪽 front, rear 에서 삽입 삭제가 모두 가능한 큐를 의미하는 자료구조이다.

<br>

- 특징
    - Stack과 Queue의 장점만 따서 구성
    - 양쪽에서 삽입과 삭제가 가능한 구조이며 스택과 큐의 연산을 모두 지원

<br>   

- 장점
    - 개별 원소들을 position index로 접근이 가능하다.
    - 원소를 컨테이너의 끝 뿐 아니라, 앞에서도 삽입/제거 하는 것이 빠르다.
    - 어떠한 순서로도 원소들을 순회할 수 있다.

<br>

- 단점
    - 컨테이너의 시작 / 끝 위치가 아닌 곳에서 삽입/제거 수행시 그 성능은 list에 비해 현저히 떨어진다.

<br>

- 사용
    - 데이터를 앞, 뒤 모두 삽입 삭제 과정이 필요한 경우
    - 데이터의 크기가 가변적일 때


<br>

## 비선형 구조

![스크린샷 2022-01-17 오전 3.30.03.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/94375fd1-1bb5-44c0-aa80-d51097cfea19/스크린샷_2022-01-17_오전_3.30.03.png)

비선형 구조란?

>⇒ 하나의 자료 뒤 여러개의 자료가 존재할 수 있는 형태의 자료구조를 의미한다.

- 특징
    - 자료들의 순서가 불규칙하고, 자료 간의 연결이 1:N의 관계를 가질 수 있음.
    - 자료 간의 관계가 계층구조이거나, 망구조와 같이 복잡한 경우에 사용.
    
    ⇒ 특히 컴퓨터는 자료에 대한 탐색 시간을 줄이고자 할 때 비선형 구조를 많이 활용한다
    

<br>

### 비선형 구조 자료구조

- 트리
    
    **트리(Tree) .. (비선형 자료구조)**
    
    ![스크린샷 2022-01-04 오전 1.36.48.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/360e154b-751d-4520-9ff6-e8cbbcbd0ff7/스크린샷_2022-01-04_오전_1.36.48.png)
    
    트리는 노드들이 나무 가지 처럼 연결된 비선형 계층적 자료구조이다.
    
    - 트리는 트리내에 다른 하위 트리가 있고 그 하위 트리안에 다른 하위 트리가 있는 재귀적 자료구조 이기도 하다.
    - 컴퓨터 구조가 트리의 대표적인 예시이다.
        
        ![스크린샷 2022-01-04 오전 1.38.15.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ef19f810-8b3d-4e7c-931e-7ef1998a687f/스크린샷_2022-01-04_오전_1.38.15.png)

    <br>
        
    - 트리구조 용어
        <details>
        <summary> 트리 구조 용어 </summary> 

        ![스크린샷 2022-01-04 오전 1.39.14.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/63c8dec8-1051-40ef-b123-a3055a6e505a/스크린샷_2022-01-04_오전_1.39.14.png)
        
        - Node
            - 트리를 구성하고 있는 기본 요소
            - 노드에는 키 또는 값과 하위 노드에 대한 포인터를 가진다.
        - Edge
            - 노드와 노드 간의 연결선
        - Root Node
            - 트리 구조에서 부모가 없는 최상위 노드
        - Parent Node
            - 자식 노드를 가진 노드
        - Child Node
            - 부모 노드의 하위 노드
        - Sibling Node
            - 같은 부모를 가지는 노드
        - Branch Node
            - 자식 노드가 하나 이상 가진 노드
        - Leaf Node
            - 자식 노드가 없는 노드
        - depth
            - 루트에서 어떤 노드까지의 간선의 수
            - 루트 노드의 깊이 : 0
        - height
            - 어떤 노드에서 리프 노드까지 가장 긴 경로의 간선(Edge) 수
        - Level
            - 루트에서 어떤 노드까지의 간선(Edge) 수
        - Degree
            - 노드의 자식 수
        - Path
            - 한 노드에서 다른 한 노드에 이르는 길 사이에 놓여있는 노드들의 순서
        - Path Length
            - 해당 경로에 있는 총 노드의 수
        - Size
            - 자신을 포함한 자손의 노드 수
        - Width
            - 레벨에 있는 노드 수
        - Breadth
            - 리프 노드의 수
        - Distance
            - 두 노드 사이의 최단 경로에 있는 간선(Edge)의 수
        - Order
            - 부모 노드가 가질 수 있는 최대 자식의 수
        
        </div> 
        </details>

    <br>

    - 특징
        - 하나의 루트 노드와 0개 이상의 하위 트리로 구성되어 된다.
        - 데이터를 순차적으로 저장하지 않기 때문에 비선형 자료구조 이다.
        - 트리내에 또 다른 트리가 있는 재귀적 자료구조이다.
        - 단순 순환(Loop)을 갖지 않고, 연결된 무방향 그래프 구조이다.
        - 노드 간에 부모 자식 관계를 갖고 있는 계층형 자료구조이며 모든 자식 노드는 하나의 부모 노드만 갖는다.
        - 노드가 n개인 트리는 항상 n-1개의 간선(edge)을 갖는다.
        
        <br>

    - 트리구조 탐색 방식 3가지
        - 전위 순회(Pre-Order), 중위 순회(In-order), 후위 순회(Post-order)가 존재
            
            ⇒ 어떠한 순서로 탐색을 진행할 것인지에 따른 분류
            
            ![스크린샷 2022-01-19 오전 1.08.54.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3da2e783-7d93-4a0a-a599-0629eac48327/스크린샷_2022-01-19_오전_1.08.54.png)
            
            - 전위는 루트 노드를 첫 번째로 봄. [ 중간 -> 왼쪽 -> 오른쪽 ]
            - 중위는 루트 노드를 두 번째로 봄. [ 왼쪽 -> 중간 -> 오른쪽 ]
            - 후위는 루트노드를 세 번째로 봄. [ 왼쪽 -> 오른쪽 -> 중간 ]
        
        <br>

        - 트리 종류
            
            
            **트리의 종류 1 : 이진트리 ( binary tree )**
            
            ⇒  이름에서 알 수 있듯이 최대 2개의 자식 노드를 가질 수 있는 트리이다.
            
            1. 완전 이진트리( complete binary tree )
            
            - 왼쪽 자식 노드부터 채워지며 마지막 레벨을 제외하고는 모든 자식 노드가 채워져 있는 트리
            
            ![https://blog.kakaocdn.net/dn/VKi38/btqAzxJQ7mo/VJwgOEzFlamdrPewoFlvSK/img.png](https://blog.kakaocdn.net/dn/VKi38/btqAzxJQ7mo/VJwgOEzFlamdrPewoFlvSK/img.png)
            
            - 완전 이진트리를 사용한 힙(Heap) 트리 자료구조.
            - 여러 개의 값 중에서 가장 크거나 작은 값을 빠르게 찾기 위해 존재.
            - 우선순위 큐 ( PriorityQueue )에 활용되는 개념.
            - 부모의 값은 항상 자식의 값보다 크거나(Max heap 최대 힙), 작아야(Min heap) 함
                
                >⇒ 따라서 루트에는 가장 크거나 작은 값이 저장되어있음.
                
            <br>

            2. 포화 이진트리 ( perfect binary tree )
            
            - 모든 노드가 0개 혹은 2개의 자식 노드를 가짐.
            - 모든 리프 노드가 똑같은 레벨에 있는 경우의 트리.
            
            ![https://blog.kakaocdn.net/dn/cwbayD/btqABDWdNsd/yu8CVxAPfZHpSllGPLVxM0/img.jpg](https://blog.kakaocdn.net/dn/cwbayD/btqABDWdNsd/yu8CVxAPfZHpSllGPLVxM0/img.jpg)
            
            <br>

            3. 정 이진트리 ( full binary tree )
            
            - 모든 노드가 0개 혹은 2개의 자식 노드를 가지는 트리
            - 포화 이진트리의 하위 종류.
            
            ![https://blog.kakaocdn.net/dn/XpKlN/btqAz6d0UpS/wOijcKA515UsKShYjrmKt0/img.png](https://blog.kakaocdn.net/dn/XpKlN/btqAz6d0UpS/wOijcKA515UsKShYjrmKt0/img.png)
            
            <br>

            4. 편향 이진트리 ( skwed binary tree )
            
            - 노드들이 전부 한 방향으로 편향된 트리
                
                ![https://blog.kakaocdn.net/dn/b1IWuq/btqAz6yfvNz/RakHueoo6R734QFAQIp0U0/img.png](https://blog.kakaocdn.net/dn/b1IWuq/btqAz6yfvNz/RakHueoo6R734QFAQIp0U0/img.png)

            <br>

            
            1. 이진 탐색 트리 ( binary search tree )
            - 이진트리의 종류중 하나
            - 중요하기 때문에 따로 정리.
            - 왼쪽 자식 노드가 루트보다 작고, 오른쪽 자식 노드가 루트보다 큰 트리.
            
            ![https://blog.kakaocdn.net/dn/SWNUB/btqAAtfJtd1/eFNd62yVsyHkwN2kG9FqnK/img.jpg](https://blog.kakaocdn.net/dn/SWNUB/btqAAtfJtd1/eFNd62yVsyHkwN2kG9FqnK/img.jpg)
            
            - 여기서 중위 순회하면 오름차순 정렬이 된다.
            
            <br>

        - 트리 사용 사례
            
            계층 적 데이터 저장
            
            - 트리는 데이터를 계층 구조로 저장하는 데 사용됩니다.
            - 예를 들어 파일 및 폴더는 계층적 트리 형태로 저장됩니다.
            
            <br>

            효율적인 검색 속도
            
            - 효율적인 삽입, 삭제 및 검색을 위해 트리 구조를 사용합니다.
            
            <br>

            힙(Heap)
            
            - 힙도 트리로 된 자료 구조입니다.
            
            <br>

            데이터 베이스 인덱싱
            
            - 데이터베이스 인덱싱을 구현하는데 트리를 사용합니다.
            - 예) B-Tree, B+Tree, AVL-Tree..
            
            <br>

            Trie
            
            - 사전을 저장하는 데 사용되는 특별한 종류의 트리입니다


<br>

- 그래프
    
    ![스크린샷 2022-01-19 오전 12.27.30.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/353d2617-a628-4735-86d0-39278511b6ff/스크린샷_2022-01-19_오전_12.27.30.png)
    
    그래프란?
    
    단순히 노드(N, node)와 그 노드를 연결하는 간선(E, edge)을 하나로 모아 놓은 자료 구조
    
    - 그래프(Graph)의 특징
        - 그래프는 네트워크 모델 이다.
        - 2개 이상의 경로가 가능하다.
        ⇒ 즉, 노드들 사이에 무방향/방향에서 양방향 경로를 가질 수 있다.
        - 부모-자식 관계라는 개념이 없다.
        - 순회는 DFS나 BFS로 이루어진다.
        - 그래프는 순환(Cyclic) 혹은 비순환(Acyclic)이다.
        - 그래프는 크게 방향 그래프와 무방향 그래프가 있다.
    
    <br>

    - 그래프(Graph)의 종류
        - 무방향 그래프(Undirected Graph)
            
            ![스크린샷 2022-01-19 오전 12.30.31.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/15152dff-66f4-4c4c-892d-9bc670623fd2/스크린샷_2022-01-19_오전_12.30.31.png)
            
            >⇒무방향 그래프의 간선은 간선을 통해서 양 방향으로 갈 수 있다.
        
        <br>        

        - 방향 그래프(Directed Graph)
            
            ![스크린샷 2022-01-19 오전 12.31.12.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ff3a352a-ca52-423a-8b01-64c42e13cbda/스크린샷_2022-01-19_오전_12.31.12.png)
            
            >⇒ 간선에 방향성이 존재하는 그래프
            
<br>

* * *

<br>

## 파일 구조

- 데이터를 논리적인 순서대로 메모리에 연속하여 저장하는 구현하는 방식
- 데이터의 논리적인 순서와 기억 장소에 저장되는 물리적 순서가 일치하는 구조다.
- 배열을 이용해 구현한다.
- 서로 관련있는 필드(Field)로 구성된 레코드(record) 집합인 파일에 대한 자료구조로 보조 기억장치에 데이터가 실제로 기록되는 형태
- 메모리에 한번에 올릴 수 없는 대용량을 다룬다.
- 순차적 파일구조(sequential file structure), 색인 파일구조(indexed sequential file structure), 직접파일(direct file) 등이 있다.

<br>


# 참고자료
[자료구조 참고 자료](https://velog.io/@jha0402/Data-structure-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%9D%BC%EB%A9%B4-%EA%BC%AD-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-7%EA%B0%80%EC%A7%80-%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0)

[자료구조 종류 참고 자료](https://ko.wikipedia.org/wiki/%EC%9E%90%EB%A3%8C_%EA%B5%AC%EC%A1%B0)