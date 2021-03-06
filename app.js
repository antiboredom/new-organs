var earImg, c, mobile;
var ears = [];

function isMobile() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

function swapElements(obj1, obj2) {
  // from https://stackoverflow.com/questions/10716986/swap-2-html-elements-and-preserve-event-listeners-on-them/10717422
  var parent2 = obj2.parentNode;
  var next2 = obj2.nextSibling;
  if (next2 === obj1) {
    parent2.insertBefore(obj1, obj2);
  } else {
    obj1.parentNode.insertBefore(obj2, obj1);
    if (next2) {
      parent2.insertBefore(obj1, next2);
    } else {
      parent2.appendChild(obj1);
    }
  }
}

function randomCredits() {
  var credits = document.querySelectorAll('.credit');
  if (Math.random() > 0.5) {
    swapElements(credits[0], credits[1]);
  }
}

function preload() {
  earImg = loadImage('/earbw.png');
}

function setup() {
  c = createCanvas(windowWidth, windowHeight);
  mobile = isMobile();
  background(0);
  imageMode(CENTER);
}

function draw() {
  if (mobile) {
    drawZoomyEars();
  } else {
    drawEar();
  }
}

function drawZoomyEars() {
  ears = ears.sort(function(a, b) {
    return b.w - a.w;
  });

  for (var i = 0; i < ears.length; i++) {
    ears[i].draw();
  }

  if (ears.length < 200 && frameCount % 10 == 0) {
    ears.push(new ear());
  }
}

function drawEar() {
  var w = random(10, 80);
  var h = w / earImg.width * earImg.height;
  var r = random(-0.5, 0.5);

  var a = random(0, 360);
  var d = random(100, 200);
  var x = mouseX + cos(a) * d;
  var y = mouseY + sin(a) * d;

  push();
  translate(x, y);
  rotate(r);
  if (random(1) > 0.5) {
    scale(-1, 1);
  }
  image(earImg, 0, 0, w, h);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function ear() {
  this.reset();
}

ear.prototype.reset = function() {
  this.x = random(0, width);
  this.y = random(0, height);
  this.w = 0;
  this.h = 0;
  this.growth = random(0.1, 2);
  this.r = 0;
  this.rSpeed = random(-.01, .01)
  this.maxW = 400;//random(100, 400);
}

ear.prototype.draw = function() {
  this.w += this.growth;
  this.h = this.w / earImg.width * earImg.height;
  this.r += this.rSpeed;

  push();
  translate(this.x, this.y);
  rotate(this.r);
  image(earImg, 0, 0, this.w, this.h);
  pop();

  if (this.w > this.maxW) this.reset();
}

randomCredits();
