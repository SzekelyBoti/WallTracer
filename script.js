const ball = document.getElementById("ball");
const ballSpeed = 2;
let ballX = 100;
let ballY = 100;
let ballDirectionX = 1;
let ballDirectionY = 1;

function setInitialPosition() {
    ball.style.left =`${ballX}px`;
    ball.style.top = `${ballY}px`;
    console.log(`Ball initial position: ${ballX}px, ${ballY}px`);
}

function moveBall() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (ballX + ball.offsetWidth >= screenWidth || ballX <= 0) {
        ballDirectionX *= -1;
    }
    if (ballY + ball.offsetHeight >= screenHeight || ballY <= 0) {
        ballDirectionY *= -1;
    }

    ballX += ballDirectionX * ballSpeed;
    ballY += ballDirectionY * ballSpeed;

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    requestAnimationFrame(moveBall);
}

setInitialPosition();
moveBall();