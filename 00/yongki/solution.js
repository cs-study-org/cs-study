const util = require('util');

class 돌고래 {
  constructor(data) {
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
  beAmusmentPark(that) {
    that._classificationDelegate = new 놀이동산델리게이트(this);
  }
}

class 포유류델리게이트 extends 종류델리게이트 {
  constructor(data) {
    super(data);
    this._isBone = data.isBorn;
    this._isHair = data.isHair;
  }
}

class 놀이동산델리게이트 {
  constructor(data) {
    this.bookingCount = data.bookingCount;
  }
  beSpecies(that) {
    that._classificationDelegate = new 종류델리게이트(this);
  }
}

class 돌고래쇼델리게이트 extends 놀이동산델리게이트 {
  constructor(data) {
    super(data);
    this._돌고래수 = data.돌고래수;
  }
}

(main = _ => {
  const 포유류돌고래 = new 돌고래({
    type: "포유류",
    isBorn: true,
    isHair: true
  });

  console.log(util.inspect(포유류돌고래, { compact: false, depth: 5 }));
  /**   
        돌고래 {
        _classificationDelegate: 포유류델리게이트 {
          _isBone: true,
          _isHair: true
        }
      }
   */
  포유류돌고래._classificationDelegate.beAmusmentPark(포유류돌고래);
  console.log(util.inspect(포유류돌고래, { compact: false, depth: 5 }));
  /**
        돌고래 {
        _classificationDelegate: 놀이동산델리게이트 {
          bookingCount: undefined
        }
      }
   */
})();
