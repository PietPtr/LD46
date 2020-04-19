
function dot(vec1, vec2) {
    return vec1.x * vec2.x + vec1.y * vec2.y;
}

function length(vec) {
    return Math.sqrt(vec.x ** 2 + vec.y ** 2);
}

function normalize(vec) {
    return {
        x: vec.x / length(vec),
        y: vec.y / length(vec)
    }
}

function add(vec1, vec2) {
    return {x: vec1.x + vec2.x, y: vec1.y + vec2.y};
}

function angle(vec1, vec2) {
    return Math.acos(dot(normalize(vec1), normalize(vec2)));
}

function pointInRect(vec, rect) {
    return (
        vec.x >= rect.x &&
        vec.x <= rect.x + rect.w &&
        vec.y >= rect.y &&
        vec.y <= rect.y + rect.h);
}

function setFillColor(color) {
    let r = (color & 0xff0000) >> 16;
    let g = (color & 0xff00) >> 8;
    let b = (color & 0xff);
    ctx.fillStyle = "rgba("+r+","+g+","+b+",1)";
}

function setPixel(x, y, color) {
    setFillColor(color);
    ctx.fillRect( x, y, 1, 1 );
}

function drawCircle(x, y, radius, color=0xff6400) {
    setFillColor(color);
    ctx.lineWidth = 0;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}

function drawLine(x1, y1, x2, y2, color="#777777", width=1) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawRectLine(x, y, width, height, color="#777777", lineWidth=1, fillColor=undefined) {
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.rect(x, y, width, height);
    ctx.stroke();
}

function drawText(x, y, text, color) {
    setFillColor(color);
    ctx.font = "30px Courier";
    ctx.fillText(text, x, y);
}

function drawImage(x, y, imgname) {
    let img = document.getElementById(imgname);
    ctx.drawImage(img, x, y);
}

function randomChoice(list) {
    return list[Math.floor(Math.random() * (list.length))]
}

function randomMinMax(min, max) {
    return Math.random() * (max - min) + min;
}
