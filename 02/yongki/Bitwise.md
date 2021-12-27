## 비트 연산 코딩 문제 리뷰

1. 주어진 배열에서 빠진 요소 구하기

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

## 참고 문헌

[All about Bitwise Operations [Beginner-Intermediate]](https://leetcode.com/discuss/general-discussion/1073221/All-about-Bitwise-Operations-Beginner-Intermediate) -- Yashjain