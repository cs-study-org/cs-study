class 포유류 {
  constructor(data) {
    this._isBone = data.isBorn;
    this._isHair = data.isHair;
  }
}

class 돌고래 extends 포유류 {
  constructor(data) {
    super(data);
    this._isSwim = data._isSwim;
  }
}

class 돌고래쇼 {
  constructor(data) {
    this.bookingCount = data.bookingCount;
  }
}

// +++ 분류 매커니즘에 따라 만들어야하기 때문에 유지보수 힘듬
class 돌고래2 extends 돌고래쇼 {
  constructor(data) {
    super(data);
    this._돌고래수 = data.돌고래수;
  }
}

class 분류매커니즘{

}

class 돌고래3 extends 분류매커니즘{

}