## 비트 연산 코딩 문제 리뷰


<details>
<summary>1. Missing Number</summary>

**문제 3줄 요약**

    1. Input: nums = [3,0,1]

       배열의 개수가 3개이다. 범위는 0-3이 된다.

    2. 범위 안에 2가 없다.        

    3. Output: 2

<div markdown="1">  

```javascript
// +++ my solution
var missingNumber = function(nums) {
  nums.sort((a, b) => a - b);    
  
  for(let i = 0; i < nums.length; i++){
      if(nums[i] !== i)
          return i;
  }    
  
  return nums.length;
};
```
위 코드는 정렬을 하는 비용이 든다. 

`XOR`는 이를 해결하는데, 이에 앞서 `XOR`의 성질을 알아보자.

`a ^ b ^ b = a` 처럼 동일한 숫자와 `XOR` 연산을 수행하면 동일한 숫자들이 제거되는데, 이를 활용한다.

```javascript
// +++ use xor solution
var missingNumber = function(nums) {    
  let xor = 0;
  
  for (let i = 0; i < nums.length; i++) {
    xor = xor ^ i ^ nums[i];
  }

  return xor ^ i;
};
```

</div>
</details>

<details>
<summary>2. Bitwise ORs of Subarrays</summary>

**문제 3줄 요약**

    1. Input: arr = [1,1,2]

       입력값은 위와 같고, subarrays를 구해야한다.

       단일요소는 다음과 같다.

       [1], [1], [2]
       
       다중요소는 다음과 같다.

       [1, 1], [1, 2], [1, 1, 2]

    2. 이 요소들을 각자 묶여있는 배열 안에서 or 연산을 하면,
   
        1, 1, 2, 1, 3, 3

    3. 중복을 없애면, 1, 2, 3 이고 갯수는 아래와 같다.
        Output: 3

<div markdown="1">

```javascript
var subarrayBitwiseORs = function(arr) {
  const result = new Set();
  const singleDigit = new Set();    
  
  arr.forEach(each => {
    result.add(each);
    singleDigit.add(each);
  });
  
  for(const each of singleDigit){                
    for(let j = 0; j < arr.length; j++){            
      if(each === arr[j])
          continue;
      
      if(result.has(each | arr[j]))
          continue;
                  
      result.add(each | arr[j]);
    }
  }
  console.log(result);
  return result.size;
};
```

위 코드는 제출 승인 되지 않았지만, 문제의 의도대로 결과가 나왔다고 판단한다.

</div>
</details>

<details>
<summary>3. XOR Queries of a Subarray</summary>

**문제 3줄 요약**

    1. Input: arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]] 

       입력값은 위와 같고, arr의 2진수는 아래와 같다. 
       queries는 arr의 범위를 지정하는 좌표들이다.

          1 = 0001 
          3 = 0011 
          4 = 0100 
          8 = 1000 

    2. arr의 범위 내에 모든 요소들을 xor 연산한다.
   
        [0,1] = 1 xor 3 = 2 
        [1,2] = 3 xor 4 = 7 
        [0,3] = 1 xor 3 xor 4 xor 8 = 14 
        [3,3] = 8

    3. Output: [2,7,14,8]

<div markdown="1">

```javascript
var xorQueries = function(arr, queries) {
  return queries.map(query => {
    let xor = 0;
    const startPoint = query[0];
    const endPoint = query[1];
    
    for(let i = startPoint; i <= endPoint; i++){
      xor = xor ^ arr[i];
    };    
    
    return xor;
  })
};
```
</div>
</details>

## 참고 문헌

[All about Bitwise Operations [Beginner-Intermediate]](https://leetcode.com/discuss/general-discussion/1073221/All-about-Bitwise-Operations-Beginner-Intermediate) -- Yashjain