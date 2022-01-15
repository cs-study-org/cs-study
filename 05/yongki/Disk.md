# 디스크

- [디스크](#디스크)
  - [계층적 파일 시스템](#계층적-파일-시스템)
    - [파일 공유](#파일-공유)
  - [비트맵을 사용한 디스크 공간 관리](#비트맵을-사용한-디스크-공간-관리)
    - [Journaling 파일 시스템](#journaling-파일-시스템)
  - [참고문헌](#참고문헌)

## 계층적 파일 시스템

파일은
    
    - byte 정보들의 연속이다.
     
    - 파일의 이름은 같을 수 있으나 저장된 디렉토리까지 같을 수 없다. 
      즉, 고유한 path name을 가지고 있다.    

디렉토리(디렉토리 파일)는
 
    - 파일과 형태과 동일하지만, 
      i.e. 컴포지션 패턴이라 한다.

    - 파일의 고유한 path name을 얻기 위한 역할을 해준다.

### 파일 공유

![file-share](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FzC9bc%2FbtqFjdUFXQE%2Fj4sa7iTo7sLKcVqFNGt7dk%2Fimg.png)

파일의 데이터와 속성은 하나인데, 이름이 두 개의 디렉토리에서 사용할 수 있다.

이러한 이름을 유닉스에서 link라고 한다.

link-count라는 값이 파일의 속성에 존재하는데, 공유하는 디렉토리가 없다면, 0이 된다.

## 비트맵을 사용한 디스크 공간 관리

![block](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb2MSQM%2FbtqFjc2CP8t%2F5Jv2MbqFws4bkKdk0EZpa1%2Fimg.png)

C의 조각난 모양을 섹터라고 한다.

파일 시스템은 이 섹터를 여러 개 모아서 블록이라는 단위를 사용한다.

블록에는 inode와 데이터 블록으로 이루어져 있다.

inode에는 파일 이름과 데이터가 들어 있는 하위 블록에 대한 인덱스가 있다.
      
### Journaling 파일 시스템

    [사진첨부]

사용하고 있는 블록을 기록해두는 비트맵과

인덱스 블록 안에 기록되어 있는 free block 번호를 매치시켜 일관성을 확인한다.

<hr/>

## 참고문헌

[파일시스템](https://hini7.tistory.com/88) -- 희은w