let value = 150;
function createBalls() {
    if (window.innerWidth < 768){value = 30;}
    for (let i = 0; i < value; i++) {
        var ball = document.createElement("div");
        ball.classList.add("ball");

        var xPos = Math.floor(Math.random() * window.innerWidth);
        var yPos = Math.floor(Math.random() * window.innerHeight);
        var opacity = Math.random() * (1 - 0.1) + 0.1;
        ball.startX = xPos;
        ball.startY = yPos;
        ball.style.left = xPos + "px";
        ball.style.top = yPos + "px";
        ball.style.opacity = opacity;

        document.body.appendChild(ball);
    }

    moveBalls();
}

function moveBalls() {
    var balls = document.getElementsByClassName("ball");
    for (var i = 0; i < balls.length; i++) {
        var ball = balls[i];

        var deltaX = Math.random() * 200 - 100;
        var deltaY = Math.random() * 200 - 100;

        var newXPos = ball.startX + deltaX;
        var newYPos = ball.startY + deltaY;

        newXPos = Math.max(0, Math.min(window.innerWidth, newXPos));
        newYPos = Math.max(0, Math.min(window.innerHeight, newYPos));

        ball.style.transition = 'left 1.5s ease-in-out, top 1.5s ease-in-out';
        ball.style.left = newXPos + 'px';
        ball.style.top = newYPos + 'px';
    }

    setTimeout(moveBalls, 1500);
}

window.onload = createBalls;

let state = 0;
let points = 0;
let resetChance = 0;
let random = 0;
let recordValue = 0;
function button() {
    var buttonTop = document.getElementById("button-top");
    var pointsSpan = document.getElementById("points");
    var box = document.getElementById("box");
    var reset = document.getElementById("reset")
    var record = document.getElementById("record")
    var clickAudio = document.getElementById("clickSound");
    var boomAudio = document.getElementById("boomSound");
    const video = document.createElement('video');
    video.src = 'boom.gif';
    document.body.appendChild(video);
    video.style.zIndex = 10;
    if (state === 0) {
        clickAudio.play();
        state = 1;
        points++;
        random = Math.floor(Math.random() * 101);
        console.log("reset: ", resetChance);
        console.log("random: ", random);
        if (random > resetChance) {
            pointsSpan.textContent = points;
            resetChance++;
        } else {
            pointsSpan.textContent = 0;
            points = 0;
            resetChance = 0;
            boomAudio.play();
            const gif = document.createElement('img');
            gif.src = 'boom.gif';
            gif.style.position = 'fixed';
            gif.style.top = '50%';
            gif.style.left = '50%';
            gif.style.transform = 'translate(-50%, -50%) scale(1.5)';
            gif.style.zIndex = 10;
            document.body.appendChild(gif);
            setTimeout(function() {
                document.body.removeChild(gif);
            }, 800);
        }
        if (points > recordValue) {
            recordValue = points;
        }
        reset.textContent = `${resetChance}% RESET CHANCE`;
        record.textContent = `RECORD: ${recordValue}`;
        buttonTop.classList.add("click");
        box.classList.add("shrink");
        setTimeout(remove, 500);
    }

    function remove() {
        buttonTop.classList.remove("click");
        box.classList.remove("shrink");
        state = 0;
    }
}
