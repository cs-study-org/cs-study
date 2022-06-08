# 목차
## 1. sql문 조작
## 2. 데이터형의 선택이 성능에 직결된다.
## 3. 한번 만든 테이블은 쉽게 바꿀 수 없다
## 4. JOIN
## 5. SQL 장단점

<br>

* * *

<br>

## sql문 조작

<img width="703" alt="스크린샷 2022-06-02 오후 2 38 18" src="https://user-images.githubusercontent.com/81874493/171560436-a69312b9-e9d4-422d-bbc0-9b64c9c6b7a7.png">

명령어 

- CREATE
    
    ```java
    CREATE TABLE emp_table
    (   emp_id      NUMBER           NOT NULL,
        emp_name    VARCHAR2(100)    NOT NULL,
        gender      VARCHAR2(10)         NULL,
        age         NUMBER               NULL,
        hire_date   DATE                 NULL,
        etc         VARCHAR2(300)        NULL,
        PRIMARY KEY (emp_id)                  );
    ```
    
    - Create 형식 지정자
        
        <img width="635" alt="스크린샷 2022-06-02 오후 2 38 27" src="https://user-images.githubusercontent.com/81874493/171560451-13faec3b-7306-430c-b7bb-2104380f43d9.png">

- DROP
    - DROP DATABASE 데이터베이스이름
    - DROP TABLE 테이블이름
- SELECT
    
    ```java
    SELECT 컬럼1, 컬럼2, ...
    FROM 테이블명
    WHERE 조건
    ORDER BY 정렬순서(ASC(기본 오름차순), DESC);
    
    SELECT *  -- 테이블 확인
      FROM emp_table;
    ```
    
- INSERT
    
    ```java
    INSERT INTO 테이블 명
    VALUES (값1, 값2, ...);
    
    --------------------------------------------------------------------
    
    INSERT INTO 	emp_table (emp_id, emp_name, gender, age, hire_date)
         VALUES 	(1, '홍길동', '남성', 33, '2018-01-01');
    INSERT INTO 	emp_table (emp_id, emp_name, gender, age, hire_date)
         VALUES 	(2, '김유신', '남성', 44, '2018-02-01');
    INSERT INTO 	emp_table (emp_id, emp_name, gender, age, hire_date)
         VALUES 	(3, '강감찬', '남성', 55, '2018-03-01');
    INSERT INTO 	emp_table (emp_id, emp_name, gender, age, hire_date)
         VALUES 	(4, '신사임당', '여성', 66, '2018-04-01');
    COMMIT;
    ```
    
- UPDATE
    
    ```java
    UPDATE 테이블이름
    
    SET 필드이름1=데이터값1, 필드이름2=데이터값2, ...
    
    WHERE 필드이름=데이터값
    ```
    
<br>

* * *

<br>

## 데이터형의 선택이 성능에 직결된다.

INTEGER UNSIGNED형은 4바이트로 약 40억까지의 값을 처리할 수 있다

반면, 10자리 숫자를 CHAR(10)으로 관리하면 10바이트를 소모하게 된다.

이와 같이 대용량의 레코드를 관리하는 테이블은 이러한 크기의 차이가 매우 큰 영향을 줄 수 있다.

**따라서 공간 효율이 좋은 데이터형을 선택하는 것이 매우 중요하다.**

<br>

* * *

<br>

## 한번 만든 테이블은 쉽게 바꿀 수 없다

테이블 제작에 소홀하게 되면 나중에 고생하게 된다

왜냐하면 **한번 생성한 테이블은 만든 후 쉽게 바꿀 수 없다**.

테이블 재구성 처리를 하게 되면 이에 따른 처 리 시간은 데이터 양에 비례되게 된다

따라서 데이터 양이 많으면 많을 수록 테이블 정의 변경을 어려워 지며 이에 따른 정지 시간으로 인해 좋지 않은 상황을 야기 시킬 수 있다.

그렇기 때문에 테이블 재구성이 적도록 구성하는게 중요하다.

<br>

* * *

<br>


## Join

JOIN 이란 두개 이상의 테이블을 결합하여 데이터를 검색하는 방법입니다.

자신이 검색하고 싶은 데이터가 한개의 테이블이 아니라 여러개의 테이블에 나누어져 있다면 <U>**각테이블의 컬럼을 한개씩 가져와서 그 컬럼을 접점으로 이용하여 여러 테이블에 나누어져 있는 데이터를 한번에 검색**</U>하는데 보통 접점으로 사용하는 컬럼은 Primary Key 혹은 Foreign Key로 두 테이블을 연결한다. 

- Inner join
    - 두 테이블의 교집합으로 공통된 값을 출력
        
        <img width="657" alt="스크린샷 2022-06-02 오후 2 38 34" src="https://user-images.githubusercontent.com/81874493/171560469-15e1a559-4617-4012-a5d7-6d955955e3f2.png">

        <br>

- full outer join
    - 두 테이블의 합집합으로 공통된 값은 공통 값 끼리 묶여 출력되며, 공통되지 않은 부분도 함께 출력
        
        <img width="647" alt="스크린샷 2022-06-02 오후 2 38 40" src="https://user-images.githubusercontent.com/81874493/171560479-5b9018e5-52cb-467d-800f-6238f3bc72fb.png">

        <br>

- left outer join
    - 두 테이블 중 오른쪽 테이블에 조인시킬 컬럼의 값이 없는 경우에 사용하게 되며
        
        왼쪽 테이블의 값은 모두 다 나오지만 오른 쪽 테이블의 값은 매칭이 되는게 없으면 출력 되지 않는다.
        
        <img width="643" alt="스크린샷 2022-06-02 오후 2 38 45" src="https://user-images.githubusercontent.com/81874493/171560490-88f94863-e0a2-4aa9-b7b4-8f50ebe3b75f.png">

        <br>

- right outer join
    - 두 테이블 중 오른 쪽 테이블에 조인시킬 컬럼의 값이 없는 경우 사용하게 되며
        
        오른쪽 테이블의 값은 모두 다 나오지만 왼쪽 테이블의 값은 매칭이 되는게 없으면 출력 되지 않는다.
        
        <img width="661" alt="스크린샷 2022-06-02 오후 2 38 49" src="https://user-images.githubusercontent.com/81874493/171560501-e64b0d5d-b8f1-40fb-a932-3e730ca50509.png">


<br>

* * *

<br>

## SQL 장단점

<br>

### **SQL 장점**

- 명확하게 정의된 스키마, 데이터 무결성 보장
- 관계는 각 데이터를 중복없이 한번만 저장

<br>

### **SQL 단점**

- 덜 유연함. 데이터 스키마를 사전에 계획하고 알려야 함. (나중에 수정하기 힘듬)
- 관계를 맺고 있어서 조인문이 많은 복잡한 쿼리가 만들어질 수 있음
- 대체로 수직적 확장만 가능함
