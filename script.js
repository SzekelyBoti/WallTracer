const ball = document.getElementById("ball");
const ballSpeed = 10;
let ballX = window.innerWidth / 2 - ball.offsetWidth / 2;
let ballY = window.innerHeight / 2 - ball.offsetHeight / 2;
let ballDirectionX = Math.random() < 0.5 ? 1 : -1;
let ballDirectionY = Math.random() < 0.5 ? 1 : -1;

let bounceCount = 0;
const bounceLimit = 5;
let questionAsked = false;
let bounceTimes = [];

let questionNumber = 1;

function setInitialPosition() {
    ball.style.left =`${ballX}px`;
    ball.style.top = `${ballY}px`;
}

function moveBall() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (ballX + ball.offsetWidth >= screenWidth) {
        ballDirectionX *= -1;
        bounceCount++;
        bounceTimes.push('right');
        
        if(bounceCount === bounceLimit && !questionAsked) {
            askQuestion();
            questionAsked = true;
        }
    } else if (ballX <= 0) {
        ballDirectionX *= -1;
        bounceCount++;
        bounceTimes.push('left');
        
        if(bounceCount === bounceLimit && !questionAsked) {
            askQuestion();
            questionAsked = true;
        }
    }
    if (ballY + ball.offsetHeight >= screenHeight) {
        ballDirectionY *= -1;
        bounceCount++;
        bounceTimes.push('bottom');
        
        if(bounceCount === bounceLimit && !questionAsked) {
            askQuestion();
            questionAsked = true;
        }
    } else if (ballY <= 0) {
        ballDirectionY *= -1;
        bounceCount++;
        bounceTimes.push('top');
        
        if(bounceCount === bounceLimit && !questionAsked) {
            askQuestion();
            questionAsked = true;
        }
    }

    ballX += ballDirectionX * ballSpeed;
    ballY += ballDirectionY * ballSpeed;

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    requestAnimationFrame(moveBall);
}

function askQuestion() {
    const questionText = `Which wall did the ball bounce off on the ${questionNumber}th bounce?`;
    
    alert(questionText);
    
    const answer = prompt(questionText + " (Enter 'left' , 'right' , 'bottom' , 'top')");
    const correctAnswer = bounceTimes[questionNumber - 1];

    if(answer === 'left' || answer === 'right' || answer === 'bottom' || answer === 'top') {
        const isCorrect = answer.toLowerCase() === correctAnswer;
        console.log(`Bounce ${questionNumber}: Answer was ${isCorrect ? 'correct' : 'incorrect'}`);
    } else {
        console.log(`Bounce ${questionNumber}: Answer was ${correctAnswer}`);
    }
    questionNumber++;
}

setInitialPosition();
moveBall();