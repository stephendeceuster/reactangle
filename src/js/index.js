var randomColor = require("random-color");

const getRandomRangeIntInc = (min, max) =>
  Math.floor(Math.random() * max - min + 1) + min;

class Rectangle {
  constructor(width, height, x, y) {
    this._width = width;
    this._height = height;
    this._x = x;
    this._y = y;
    this._ref = this.generateHTML();
    this.styling();
    this.changeBgc();
  }

  get width() {
    return this._width + "px";
  }
  set width(value) {
    this._width = value;
    this.styling();
  }

  get height() {
    return this._height + "px";
  }
  set height(value) {
    this._height = value;
    this.styling();
  }

  get x() {
    return this._x + "px";
  }
  set x(value) {
    this._x = value;
    this.styling();
  }

  get y() {
    return this._y + "px";
  }
  set y(value) {
    this._y = value;
    this.styling();
  }

  generateHTML() {
    document.body.insertAdjacentHTML("afterbegin", `<div class='rect'></div>`);
    return document.querySelector("div:first-child");
  }

  styling() {
    const styles = {
      left: this._x - this._width / 2 + "px",
      top: this._y - this._height / 2 + "px",
      width: this._width + "px",
      height: this._height + "px",
      backgroundColor: randomColor().hexString(),
    };
    Object.assign(this._ref.style, styles);
  }

  getSurface() {
    return this._width * this._height;
  }

  changeBgc() {
   // this._ref.addEventListener('click', () => this.styling() );
   this._ref.onclick = function() {
        this.styling().bind(this);
   };
  }

  static getDistance(r1, r2) {
      const dx = r1._x - r2._x;
      const dy = r1._y - r2._y;
      return Math.sqrt(dx*dx + dy*dy);
  }

  static isColliding(r1, r2) {
    return !((r1._width/2)+(r2._width/2) < Math.abs(r1._x - r2._x) && (r1._height/2)+(r2._height/2) < Math.abs(r1._y - r2._y));
    // return true if rectangles are colliding
  }
}


let counter = 10;

while (counter--) {
  w = getRandomRangeIntInc(50, 200);
  h = getRandomRangeIntInc(50, 250);
  x = getRandomRangeIntInc(10, 1250);
  y = getRandomRangeIntInc(10, 620);
  new Rectangle(w, h, x, y);
}

const rect1 = new Rectangle(100, 100, 250, 250);
const rect2 = new Rectangle(100, 100, 50, 50);

rect1.width = 200;

console.log(Rectangle.getDistance(rect1, rect2));
console.log(Rectangle.isColliding(rect1, rect2));

