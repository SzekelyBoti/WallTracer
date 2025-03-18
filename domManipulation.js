document.addEventListener('DOMContentLoaded', () => {
    ball = document.getElementById("ball");
    const fullscreenButton = document.getElementById("fullscreen-btn");
    const helpButton = document.getElementById("help-btn");
    const closeButton = document.getElementById("close-btn");
    const exitFsButton = document.getElementById("exitFs-btn");

    fullscreenButton.addEventListener("click", toggleFullscreen);
    exitFsButton.addEventListener("click", exitFullscreen);

    document.addEventListener('fullscreenchange', toggleFullscreenButtonVisibility);
    toggleFullscreenButtonVisibility();

    helpButton.addEventListener("click", showInstructionsModal);
    closeButton.addEventListener("click", hideInstructionsModal);

    document.getElementById("reset-btn").addEventListener("click", resetGame);
    document.getElementById("start-btn").addEventListener("click", startGame);
    document.getElementById("continue-btn").addEventListener("click", startNewRound);
});
function showInstructionsModal() {
    const modal = document.getElementById("instructions-modal");
    modal.classList.remove("hidden");
    modal.style.display = "flex";
}
function hideInstructionsModal() {
    const modal = document.getElementById("instructions-modal");
    modal.classList.add("hidden");
    modal.style.display = "none";
}
function toggleFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }
}
function exitFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
}
function isInFullScreen() {
    return document.fullscreenElement;
}
function toggleFullscreenButtonVisibility() {
    const fullscreenButton = document.getElementById("fullscreen-btn");
    const exitFsButton = document.getElementById("exitFs-btn");

    if (isInFullScreen()) {
        fullscreenButton.style.display = "none";
        exitFsButton.style.display = "inline-block";
    } else {
        fullscreenButton.style.display = "inline-block";
        exitFsButton.style.display = "none";
    }
}
function updateScore(score) {
    document.getElementById('score').innerText = score.toString();
}
function updateRoundNumber(currentRound, totalRounds) {
    document.getElementById("round-number").innerText = `${currentRound + 1} / ${totalRounds}`;
}
function updateResponseTime(responseTime) {
    document.getElementById("response-time").innerText = responseTime.toFixed(2);
}
function showQuestion(questionText) {
    document.getElementById("question-text").innerText = questionText;
    document.getElementById("question-container").classList.remove("hidden");
}
function hideElement(elementId) {
    document.getElementById(elementId).classList.add("hidden");
}
function showElement(elementId) {
    document.getElementById(elementId).classList.remove("hidden");
}
function showFinalScore(finalScore) {
    document.getElementById("final-score").innerText = `Your Final Score: ${finalScore}`;
    document.getElementById("score-screen").classList.remove("hidden");
}
function highlightCorrectAnswer(correctAnswer) {
    document.querySelectorAll("#keyboard button").forEach((button) => {
        let buttonText = button.textContent.trim().toLowerCase();
        if (buttonText === correctAnswer.toLowerCase()) {
            button.classList.add("correct-answer");
        }
    });
    setTimeout(() => {
        document.querySelectorAll("#keyboard button").forEach((button) => {
            button.classList.remove("correct-answer");
        });
    }, 1500);
}
function disableButtons() {
    document.querySelectorAll('#keyboard button').forEach(button => button.disabled = true);
}
function enableButtons() {
    document.querySelectorAll('#keyboard button').forEach(button => button.disabled = false);
}







