class 돌고래 {
  constructor(data) {

    // +++ 이부분만 유지보수
    this._classificationDelegate = this.selectSpeciesDelegate(data);
  }

  selectSpeciesDelegate(data) {
    switch (data.type) {
      case '포유류':
        return new 포유류델리게이트(data, this);

      default: return new 종류델리게이트(data, this);
    }
  }

  selectAmusmentParkDelegate(data) {
    switch (data.type) {
      case '돌고래쇼':
        return new 돌고래쇼델리게이트(data, this);

      default: return new 놀이동산델리게이트(data, this);
    }
  }
}

class 종류델리게이트 {
  constructor(data) {
  }
}

class 포유류델리게이트 extends 종류델리게이트 {
  constructor(data) {
    this._isBone = data.isBorn;
    this._isHair = data.isHair;
  }
}

class 놀이동산델리게이트 {
  constructor(data) {
    this.bookingCount = data.bookingCount;
  }
}

class 돌고래쇼델리게이트 extends 놀이동산델리게이트 {
  constructor(data) {
    super(data);
    this._돌고래수 = data.돌고래수;
  }
}