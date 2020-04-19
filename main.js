let c = document.getElementById("canvas");
c.style.width = window.innerWidth + 'px';
c.style.height = window.innerHeight + 'px';
c.width = window.innerWidth;
c.height = window.innerHeight;
var ctx = c.getContext("2d");

let now = new Date().getTime()

let surfaces = [
    new Surface(0, 1080, 1840), // floor
    new Surface(699, 700, 488), // vensterbank
    new Surface(82, 712, 408), // table
    new Surface(1172, 900, 281), // couch
    new Surface(310, 239, 131), // clock
]

let flower = new Flower(surfaces[0], 340);
let gieter = new Gieter(surfaces[2], 100);
let clock = new Clock();

let draggables = [flower, gieter, clock];

function draw() {
    let newtime = new Date().getTime();
    let dt = (newtime - now) / 1000;
    now = newtime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#abc9ee";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    flower.update(dt);
    gieter.update(dt);
    clock.update(dt);

    drawImage(0, 0, "bg");

    flower.draw();
    gieter.draw();
    clock.draw();

    window.requestAnimationFrame(draw);

}

c.addEventListener("click", (e) => {
    let clickPos = { x: e.clientX, y: e.clientY };
    console.log(clickPos);
    for (let draggable of draggables) {
        if (draggable.click(clickPos)) {
            break;
        }
    }
});

c.addEventListener("mousemove", (e) => {
    let pos = { x: e.clientX, y: e.clientY };
    for (let draggable of draggables) {
        draggable.mousemove(pos);
    }
});

document.addEventListener("keydown", (e) => {
    gieter.keydown(e);
});

document.addEventListener("keyup", (e) => {
    gieter.keyup(e);
});

window.requestAnimationFrame(draw);
