# 내장함수
[파이썬 공식문서](https://docs.python.org/ko/3/library/functions.html)
자세한 내용은 위 파이썬 공식문서를 확인하자

## abs(값)
수의 **절대 값**을 반환한다. 인수는 정수, 부동 소수점 복소수를 받아드린다.

```python3
>>> abs(10)
10
>>> abs(10.0)
10.0
>>> abs(-10)
10
>>> abs(complex(3,4))
5.0
```

## all(시퀀스), any(시퀀스)
시퀀스 자료형 : 각각의 요소들이 연속적으로 이어진 자료형
ex) list, tuple, range, 문자열

all()인수의 요소가 모든 True라면 True을 반환 하나라도 False라면 False를 반환
any인수 중 하나의 요소가 True라면 True 모두 False라면 False를 반환

```python3
>>> array = []
>>> 
>>> #빈 배열의 경우 all True
>>> all(array),any(array)
(True, False)
>>> 
>>> array = [0,1,2]
>>> all(array),any(array)
(False, True)
>>> array = [1,2,3]
>>> all(array),any(array)
(True, True)
>>> 
>>> array = [0,0,0]
>>> all(array),any(array)
(False, False)
```

## ascii(객체), repr(객체)
eval('문자열') 평가하는 인수와 같은 객체가 될 문자열을 생성한다.

- ascii(객체)는 ascii 문자열을 Unicode로 이스케이프.
- repr(객체)는 ascii 문자열을 이스케이프하지 않는다.

```python3
>>>  n  =  1 
>>>  ascii ( n ),  repr ( n )   # 숫자에 대한 거동 동일
( '1' ,  '1' ) 
>>>  eval ( ascii ( n )),  eval ( repr ( n )) 
( 1 ,  1 ) 

>>>  s  =  '문자열' 
>>>  ascii ( s ),  repr ( s )   # 문자열은 ascii 만 Unicode 로 이스케이프 된다
 ( " '\\u6587 \\ u5b57 \\ u5217 ' " ,  "'문자열 ' " ) 
>>>  eval ( ascii ( s )),  eval ( repr ( s )) 
( '문자열 ' ,  '문자열 ' )
```

## bin(정수), oct(정수), hex(정수)
- bin(정수)는 **정수를 2진수 문자열로 변환**한다.
- oct(정수)는 **정수를 8진수 문자열로 변환**한다.
- hex(정수)는 **정수를 16진수 문자열로 변환**한다.

```python3
>>> bin(2), oct(2), hex(2)
('0b10', '0o2', '0x2')
>>> bin(-10), oct(-10), hex(-10)
('-0b1010', '-0o12', '-0xa')
>>> bin(2) + bin(-10), oct(2) + oct(-10), hex(2) + hex(-10) #문자열이므로 + 연신자는 문자열 겹합으로 이동
('0b10-0b1010', '0o2-0o12', '0x2-0xa')
```

## bool(값)
인수에 대한 진리 값 판정 절차에 따라 True나 False를 반환

- False, 0, None은 False
- 빈 객체는 False
- 0이 아닌 값이면 True

```python3
>>> bool(None), bool(False), bool(0), bool([]),bool(12)
(False, False, False, False, True)
```

## breakpoint()
호출 지점에서 python 표준 디버거로 진입

```python3
>>> array = [1,2,3]
>>> total = sum(array)
>>> total
6
>>> breakpoint()
--Call--
> c:\users\user\appdata\local\programs\python\python38\lib\idlelib\rpc.py(614)displayhook()
-> def displayhook(value):
(Pdb) total
6
(Pdb) 1
1
(Pdb) int
<class 'int'>
```

## bytes(길이 or 반복가능한객체 or 바이트객체), bytearray(길이 or 반복가능한객체 or 바이트객체)
1바이트 단위의 값을 연속적으로 저장하는 시퀀스 자료형이다.
btyes로 바이트 객체를 만드는 방법은 3가지가 있다.

- bytes(길이) : 정해진 길이만큼 0으로 채워진 바이트 객체 생성
- bytes(반복가능한 객체) : 반복 가능한 객체로 바이트 객체 생성
- bytes(바이트 객체) : 바이트 객체로 바이트 객체 생성
bytearray도 위와 같이 사용한다.

- bytes()는 immutable(변경 불가능)
- bytearray()는 mutable(변경 가능)

```python3
>>> bytes(10)
b'\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
>>> bytes(10) #0이 10개 들어있는 바이트 객체 생성
b'\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
>>> 
>>> bytes([10,20,30,40,50]) #리스트로 바이트 객체 생성
b'\n\x14\x1e(2'
>>> 
>>> bytes(b'hello') #바이트 객체로 바이트 객체 생성
b'hello'
>>> 
>>> 
>>> x = bytearray(b'hello')
>>> x[0] = ord('a') #ord는 문자의 ASCII 코드를 반환
>>> x
bytearray(b'aello')
>>> 
>>>
>>> b1 = bytes('abc',encoding = 'utf-8')
>>> b1[0] = 110 #immutable 이므로 값을 변경 불가능
Traceback (most recent call last):
  File "<pyshell#48>", line 1, in <module>
    b1[0] = 110 #immutable 이므로 값을 변경 불가능
TypeError: 'bytes' object does not support item assignment
```

### 바이트 자료형 인코딩,디코딩
**바이트 자료형은 인코딩, 디코딩 메서드와 자주 쓰인다.**
잠깐 보고 가보자

파이썬에서 문자열(str)의 기본 인코딩은 UTF-8인데, b'hello'와 같이 문자열을 바이트 객체로 만들면 각문자를 ASCII 코드로 저장한다. 보통 **문자열을 UTF-8이 아닌 ASCII 코드로 처리하고 싶을때** 바이트객체를 사용한다.

- 문자열.encode() = 문자열 -> 바이트객체로

```python3
>>> 'hello'.encode()
b'hello'
>>> 
>>> '안녕'.encode('euc-kr') #문자열 -> EUC-KR인코딩된 바이트객체
b'\xbe\xc8\xb3\xe7'
>>> '안녕'.encode('utf-8') #문자열 -> UTF-8인코딩된 바이트객체
b'\xec\x95\x88\xeb\x85\x95'
```

- 바이트객체.decode() = 바이트객체 -> 문자열

```python3
>>> b'hello'.decode()
'hello'
```

## chr(아스키코드), ord(문자)
- chr(아스키코드)는 아스키코드에 해당하는 문자를 반환
- ord(문자)는 문자에 해당하는 아스키코드를 반환

```python3
>>> chr(97)
'a'
>>> ord('a')
97
```

## dir(객체)
객체가 자체적으로 가지고 있는 변수나 함수를 보여준다.

```python3
>>> dir([1,2,3])
['append', 'clear', 'copy', 'count', 'extend', 'index', 'insert', 'pop', 'remove', 'reverse', 'sort']
>>> dir({'1':'a'})
['clear', 'copy', 'fromkeys', 'get', 'items', 'keys', 'pop', 'popitem', 'setdefault', 'update', 'values']
```

## divmod(n1,n2)
n1를 n2로 나누어 몫과 나머지를 튜플로 변환

```python3
>>> divmod(7,3)
(2, 1)
>>> divmod(10,2)
(5, 0)
```

## enumerate(시퀀스)
enumerate는 "열거하다" 라는 뜻이다. 이 함수는 순서가 있는 자료형(리스트, 튜플, 문자열)을 입력받아 인덱스 값을 포함하는 enumerate 객체를 돌려준다.

- 보통 enumerate 함수는 for문과 자주 사용한다.

```python3
>>> for i, name in enumerate(['body','foo','bar']):
	print(i,name)

	
0 body
1 foo
2 bar
```

for문처럼 반복되는 구간에서 객체가 현재 어느 위치에 있는지 알려 주는 인덱스 값이 필요할 때 유용하다.

##