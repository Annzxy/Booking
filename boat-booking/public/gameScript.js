//canvas setup
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
let change = -1;
ctx.font = "50px Georgia";

//key board
var showWapon = false;
var stopGame = false;

let canvasPosition = canvas.getBoundingClientRect();

const playerSpeed = 30;

const key = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

const light = new Image();
light.src = "light.png";

window.addEventListener("keydown", (event) => {
  doKeyDown(event);
});

const gameStart = document.createElement("audio");
gameStart.src = "game-start.wav";

function doKeyDown(event) {
  if (event.keyCode == 37 && key.x > 50) {
    // Left Arrow
    showWapon = false;
    key.x = key.x - playerSpeed;
  }

  if (event.keyCode == 38 && key.y > 60) {
    // Up Arrow
    showWapon = false;
    key.y = key.y - playerSpeed;
  }

  if (event.keyCode == 39 && key.x < 750) {
    // Right Arrow
    showWapon = false;
    key.x = key.x + playerSpeed;
  }

  if (event.keyCode == 40 && key.y < 430) {
    // Down Arrow
    showWapon = false;
    key.y = key.y + playerSpeed;
  }

  if (event.keyCode == 32) {
    showWapon = !showWapon;
  }
  if (event.keyCode == 13) {
    score = 0;
    animate();
    gameStart.play();
  }
}

//player
const playLeft = new Image();
playLeft.src = "playerL.png";
const playRight = new Image();
playRight.src = "playerR.png";

//wapon
const waponLeft = new Image();
waponLeft.src = "lightL.png";
const waponRight = new Image();
waponRight.src = "lightR.png";

class Player {
  constructor() {
    this.x = canvas.width;
    this.y = canvas.height / 2;
    this.radius = 50;
    this.angle = 0;
    this.spriteWidth = 498;
    this.spriteHeight = 327;
    this.cAngle = 1;
  }

  update() {
    const dx = this.x - key.x;
    const dy = this.y - key.y;

    if (key.x != this.x) {
      this.x -= dx / 30;
    }

    if (key.y != this.y) {
      this.y -= dy / 30;
    }
  }

  drawLight(direction) {
    var src = waponRight;

    if (direction === "left") {
      src = waponLeft;
      ctx.drawImage(src, this.x - 120, this.y);
    } else {
      ctx.drawImage(src, this.x, this.y);
    }
  }

  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.fillRect(this.x, this.y, this.radius, 10);

    if (showWapon) {
      if (this.x >= key.x) {
        this.drawLight("left");
      } else {
        this.drawLight("right");
      }
      // this.drawLight();
    }

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    if (this.x >= key.x) {
      ctx.drawImage(
        playLeft,

        0 - 50,
        0 - 50
      );
    } else {
      ctx.drawImage(
        playRight,

        0 - 50,
        0 - 50
      );
    }
    ctx.restore();
  }

  drawCrown() {
    const lx = this.x;
    const ly = this.y;

    ctx.strokeStyle = "yellow";
    ctx.strokeWeight = 20;
    ctx.beginPath();
    ctx.ellipse(
      lx,
      ly - 50,
      35,
      15,
      Math.PI / this.cAngle,
      0,
      Math.random() * 2 * Math.PI
    );
    ctx.stroke();
    ctx.closePath();
  }

  drawCrown2() {
    const lx = this.x + 3;
    const ly = this.y;

    ctx.strokeStyle = "yellow";
    ctx.strokeWeight = 30;
    ctx.beginPath();
    ctx.ellipse(
      lx,
      ly - 50,
      35,
      15,
      Math.PI / this.cAngle,
      0,
      Math.random() * Math.PI
    );
    ctx.stroke();
    ctx.closePath();
  }
}

const player = new Player();

//bugs
const bugsArray = [];
var drawRedTimeOut;
var drawLargerTimeOut;
var updateTimeOut;

class Bug {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * 100 + 400;
    this.radius = 6;
    this.speed = Math.random() * 1 + 1.5;
    this.distance;
    this.counted = false;
    this.colorVariable = 255;
    this.sound = Math.random() <= 0.5 ? "sound1" : "sound2";
  }

  update() {
    this.y -= this.speed;
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    this.distance = Math.sqrt(dx * dx + dy * dy);
  }

  //COLOR

  draw() {
    ctx.strokeStyle = "black";
    ctx.strokeWeight = 2;
    ctx.fillStyle = "rgb(255," + this.colorVariable + ",0)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }

  drawLarger() {
    ++this.radius;

    if (this.radius > 20) {
      this.radius = 20;
    }
  }

  drawRed() {
    --this.colorVariable;

    if (this.colorVariable < 0) {
      this.colorVariable = 0;
    }
  }
}

const bugCatch1 = document.createElement("audio");
bugCatch1.src = "catch.wav";
const bugCatch2 = document.createElement("audio");
bugCatch2.src = "catch2.wav";
const failure = document.createElement("audio");
failure.src = "failure.wav";

function handleBugs() {
  if (gameFrame % 50 === 0) {
    bugsArray.push(new Bug());
  }

  for (let i = 0; i < bugsArray.length; i++) {
    bugsArray[i].draw();

    drawRedTimeOut = setTimeout(() => {
      bugsArray[i].drawRed();
    }, 3000);

    () => drawRedTimeOut();

    drawLargerTimeOut = setTimeout(() => {
      bugsArray[i].drawLarger();
    }, 5000);

    () => drawLargerTimeOut();

    updateTimeOut = setTimeout(() => {
      bugsArray[i].update();
    }, 4000);

    () => updateTimeOut();
  }

  for (let i = 0; i < bugsArray.length; i++) {
    if (bugsArray[i].y < 0 - this.radius * 2) {
      bugsArray.splice(i, 1);
    }
    if (bugsArray[i].distance < bugsArray[i].radius + player.radius) {
      if (!bugsArray[i].counted) {
        if (showWapon) {
          if (bugsArray[i].sound == "sound1") {
            bugCatch1.play();
          } else {
            bugCatch2.play();
          }
          score++;
        } else {
          // if (bugsArray[i].sound == "sound1") {
          //   bugCatch1.play();
          // } else {
          //   bugCatch2.play();
          // }
          score--;
          failure.play();
        }

        bugsArray[i].counted = true;
        bugsArray.splice(i, 1);
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  player.draw();
  player.drawCrown();
  player.drawCrown2();

  ctx.fillStyle = "white";

  ctx.fillText("score: " + score, 10, 50);
  gameFrame++;
  handleBugs();

  requestAnimationFrame(animate);
}
