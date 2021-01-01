var canvas = document.querySelector("canvas"); //querySelector searches html document for a canvas element
var container = document.querySelector(".container");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d"); //within c, creating a super object, methods and functions to draw within the canvas in a 2d space
// c.fillStyle = "pink";
// c.fillRect(100, 100, 50, 60);

// //Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400,300);
// c.strokeStyle = "black";
// c.stroke();

//Arc/circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI*2, false);
// c.strokeStyle = "green";
// c.stroke();

// for(var i = 0;i < 50; i++){
// var x = Math.random() * canvas.width;
// var y = Math.random() * canvas.height;
// var red = Math.floor(Math.random() * 256);
// var green = Math.floor(Math.random() * 256);
// var blue = Math.floor(Math.random() * 256);
// var size = Math.floor(Math.random() * 100);
// c.beginPath();
// c.arc(x, y, size, 0, Math.PI*2, false);
// var kevin = "rgb(" + red + "," + green + "," + blue + ")";
// c.strokeStyle = kevin;
// c.stroke();
// }
var mouse = {
    x: undefined,
    y: undefined
}
var maxRadius = 60;
function Circle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.originalRadius = radius;
    this.color = color;
    this.red = Math.floor(Math.random() * 256);
    this.green = Math.floor(Math.random() * 256);
    this.blue = Math.floor(Math.random() * 256);
    this.redFill = Math.floor(Math.random() * 128) + 128;
    this.greenFill = Math.floor(Math.random() * 128) + 128;
    this.blueFill = Math.floor(Math.random() * 128) + 128;
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.strokeStyle = "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
        c.stroke();
        if(this.color === undefined){
            c.fillStyle = "rgb(" + this.redFill + "," + this.greenFill + "," + this.blueFill + ")";
        } else {
            c.fillStyle = this.color;
        }
        c.fill();
    }
    this.update = function() {
        var x = this.x;
        var y = this.y;
        var dx = this.dx;
        var dy = this.dy;
        var radius = this.radius;
        if(x + radius >= canvas.width){
            if(dx > 0){
                this.dx = -dx;
            }
        }
        if(x - radius <= 0){
            if(dx < 0){
                this.dx = -dx;
            }
        }
        if(y + radius >= canvas.height){
            if(dy > 0){
                this.dy = -dy;
            }
        }
        if(y - radius <= 0){
            if(dy < 0){
                this.dy = -dy;
            }
        }
        this.x += dx;
        this.y += dy;
        if(Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50){
            if(this.radius <= maxRadius){
                this.radius += 5;
            }
        } else if(this.radius > this.originalRadius) {
            this.radius -= 2;
        }
        this.draw();
    }
}

function randomSign() {
    var chance = Math.floor(Math.random() * 2);
    if(chance === 0){
        return -1;
    } else {
        return 1;
    }
}
var circleArray = [];

for(var i = 0;i < 800;i++){
    var velocity = 2;
    var x = Math.floor(Math.random() * (canvas.width - radius));
    var dx = velocity * randomSign();
    var y = Math.floor(Math.random() * (canvas.height - radius));
    var dy = velocity * randomSign();
    var radius = Math.floor(Math.random() * 5) + 1;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}
function init() {
    circleArray = [];
    var colorArray = ["#BF343F", "#D9435F", "#F2F2F0", "#A62121", "#731919"];
    for(var i = 0;i < 800;i++){
        var velocity = 2;
        var x = Math.floor(Math.random() * (canvas.width - radius));
        var dx = velocity * randomSign();
        var y = Math.floor(Math.random() * (canvas.height - radius));
        var dy = velocity * randomSign();
        var radius = Math.floor(Math.random() * 5) + 1;
        var color = colorArray[Math.floor(Math.random() * colorArray.length)];
        circleArray.push(new Circle(x, y, dx, dy, radius, color));
    }
}
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0;i < circleArray.length;i++){
        circleArray[i].update();
    }
}
init();
animate();
window.addEventListener("mousemove", function(event) {
    console.log(event);
    mouse.x = event.x;
    mouse.y = event.y;
})
window.addEventListener("mouseout", function(event) {
    console.log(event);
    mouse.x = undefined;
    mouse.y = undefined;
})
window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})
// var script = "Hi Mel. I made this and hope you find it cool. I hope you feel better love and I love you so much. Sleep well my dear.  -Your Dork";
// var scriptArray = script.split("");
// var index = 0;
// var finalText = "";
// var scriptInterval = setInterval(function() {
//     if(index < scriptArray.length){
//         var text = document.getElementById("toMel");
//         finalText += scriptArray[index];
//         text.innerText = finalText;
//         index++;
//     } else {
//         clearInterval(scriptInterval);
//     }
// }, 150);