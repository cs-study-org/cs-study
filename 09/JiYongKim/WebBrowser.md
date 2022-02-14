# 목차

## Story 01.  HTTP 리퀘스트 메시지 작성

## Story 02. 웹 서버의 IP 주소를 DNS 서버에 조회

## Story 03. 전 세계의 DNS 서버가 연대한다.

## Story 04. 프로토콜 스택에 메시지 송신을 의뢰

<br>

* * *

<br>

## Story 01.  HTTP 리퀘스트 메시지 작성

### 1) URL의 이해

- URL 의 공통점
    - URL은 `[http://www.google.com](http://www.gmail.com)` 의 `http:` 와 같이 맨 앞 문자열에 Access 방법을 표시한다.
        
        ⇒ Access 대상에 따라 Access 방법을 명시하는 프로토콜을 나타내는 것
        
        ex) 액세스 대상이 Web server 라면 Http 프로토콜을 사용하여 Access 한다.
        
        - `http:` → 웹서버 Access
        - `ftp:`   → 파일 전송 서버 Access
        - `file:` → 클라이언트 PC 자체 파일 데이터 Access
        - ... etc
    
    <br>

    - URL 형식 예시
        - Http 프로토콜을 통한 웹 서버 Access
            
            
            | http:// | user: | password@ | www.google.com | :80 | /dir/file1.html |
            | --- | --- | --- | --- | --- | --- |
            | 프로토콜 | 사용자명
            (생략 가능) | 패 스워드 
            (생략 가능 ) | 웹 서버 도메인명 | 포트 번호 
            (생략 가능) | 파일 경로명 |

        - FTP 프로토콜로 파일 다운 및 업로드
            
            
            | ftp:// | user: | password@ | ftp.cyber.co.kr | :21 | /dir/file1.html |
            | --- | --- | --- | --- | --- | --- |
            | 프로토콜 | 사용자명
            (생략 가능) | 패 스워드 
            (생략 가능 ) | FTP 서버 도메인명 | 포트 번호 
            (생략 가능) | 파일 경로명 |
        - 클라이언트 PC 자체의 파일에서 데이터 Access
            
            
            | file:// | localhost/ | c:/path/file1.zip |
            | --- | --- | --- |
            | 프로토콜 | 컴퓨터명 (생략 가능) | 파일의 경로명 |
        - 메일 송신
            
            
            | mailto: | tone@cyber.co.kr |
            | --- | --- |
            | 프로토콜 | 메일 주소 |
        - 뉴스 그룹 기사 Access
            
            
            | news: | comp.protocols.tcp-ip |
            | --- | --- |
            | 프로토콜 | 뉴스 그룹명 |

<br>

### 2) URL의 해독

- 브라우저는 클라이언트가 작성한 URL을 해독한다.
    - 예시) `http://www.google.com/dir1/file1.html`
        
        `http:` + `//` + [`www.google.com`](http://www.google.com) + `/` + `dir1` + `/` + `file1.html`
        
        ⇒ 위와 같이 나누어 해독한다.
        
        <br>

        참고)
        
        - 만약 `[http://www.google.com/dir](http://www.google.com/dir)` 과 같이 파일명을 생략한 경우에는?
            - 위와 같이 파일명을 생략한 경우 어느 파일에 Access 해야할지 모른다.
                
                ⇒ 그렇기 때문에 파일명을 생략할 때 서버측에서 미리 설정을 해두어야 한다.
                
                - 파일명을 생략한 경우 서버에서 미리 설정된 파일을 응답하게 된다.
                    - `index.hml` 또는 `default.html`..(서버에 따라 다를 수 있다.)
         
         <br>

        - 만약 `[http://www.google.com](http://www.google.com)` 과 같이 `/dir` , `/` 을 생략한 경우에는 ?
            - 위와 같이 파일명 혹은 디렉토리까지 생략되는 경우
                
                ⇒ 서버측의  루트 디렉토리 아래에 미리 설정된 파일을 응답하게 된다.
        
        <br>       
        
        - 만약 `[http://www.google.com/kim](http://www.google.com/kim)` 에서 `kim` 이라는 디렉토리와 파일이 존재한다면?
            - 위와 같은 경우 `kim` 이 파일일 경우 확장자 명이 붙어야 하기 때문에 디렉토리로 취급하게 된다.