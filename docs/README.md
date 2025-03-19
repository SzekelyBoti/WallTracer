## WallTracer Game

  WallTracer is a fun and interactive web-based game where users control a bouncing ball and answer trivia questions as it bounces off different walls. 
  It combines gaming mechanics with trivia questions to create a dynamic experience.

## Table of Contents

    Introduction
    Features
    Installation
    Usage
    Testing
    Development

## Introduction

  WallTracer is a browser-based game where players answer trivia questions while controlling a bouncing ball that interacts with the edges of the screen. 
  The game tracks the player's score, rounds, and response times.

  This project is developed using:

    HTML/CSS for the frontend
    Vanilla JavaScript for game logic and DOM manipulation
    Mocha and Chai for testing

## Features

    A bouncing ball mechanic that responds to wall collisions.
    Trivia question display system.
    Scoring system that tracks correct answers.
    Round-based gameplay with multiple rounds.
    Real-time response time tracking.
    Dynamic DOM updates for displaying scores, round numbers, and response times.

## Installation

  # To run the WallTracer game locally, follow these steps:
  # Steps to Install:

    Clone the repository to your local machine:

      git clone https://github.com/SzekelyBoti/WallTracer.git
      cd WallTracer

  # Install dependencies:

    npm install

    Open index.html in your browser to start playing!

## Usage

  # How to Play the Game

    Starting the Game:
        Open the index.html file in your browser, and you'll see the game interface.
        Click the "Start Game" button to begin the game. This initializes the ball, round counter, and other game elements.

    The Ball:
        The ball starts bouncing around the screen, moving off the walls (top, bottom, left, and right).
        Each time the ball hits a wall, a bounce is recorded, and the game will ask a trivia question related to that bounce.

    Answering Questions:
        After the ball hits a wall, a trivia question appears.
        You are presented with a set of multiple-choice answers, and you can select the correct answer to score points.
        After selecting an answer, click the "Continue" button to proceed to the next round.

    Scoring:
        You score points for each correct answer, and the score updates in real-time.
        Incorrect answers don’t affect the score, but the round will continue.
        The current score is displayed at the top of the screen and will update after each correct answer.

    Rounds:
        The game progresses through multiple rounds, with each round consisting of a trivia question.
        The round number is displayed on the screen.
        After completing all rounds, your final score will be shown, and you will have the option to play again.

  # Buttons in the Game:

    Start Game Button:
        This button appears when you first load the game. Clicking it starts the game, initializes the ball, and begins the first round.
        It will disappear once the game starts.

    Continue Button:
        After answering each question, the Continue button will appear.
        Clicking Continue resets the ball’s position, updates the round counter, and takes you to the next question.
        This button hides automatically when the round ends.

    Score Screen:
        The Score Screen is displayed at the end of the game, showing your total score and time taken.
        This screen remains visible until you choose to start a new game.

  # Game Flow:

    The game begins with the ball bouncing around the screen.
    After a certain number of bounces, a trivia question is displayed.
    You select an answer to the question.
    The game records your bounce and updates the score.
    Clicking Continue moves you to the next round or question.
    The game continues until all rounds are completed, then your final score is shown.
    You can click Start Game to play again.

## Testing

  # Steps to Test

    Before running the tests, ensure you have the necessary dependencies installed:

      Install dependencies if you haven't already:

        npm install

    To run the tests, use Mocha (ensure you have Mocha installed globally or use the local version):

      npm test

      Mocha will run the tests, and you’ll receive output indicating whether each test passed or failed.

  # Understanding the Tests

    The project includes two main categories of tests:

      Game Engine Tests:
          setInitialPosition: Verifies that the ball starts at the correct position on the screen.
          recordBounce: Ensures that the bounce count increases when the ball hits a wall.
          startGame: Checks that the game starts with the correct initial parameters (e.g., score, round number).

      DOM Helper Tests:
          showElement: Ensures elements are displayed when the hidden class is removed.
          hideElement: Verifies elements are hidden by adding the hidden class.
          updateScore: Confirms that the score is displayed correctly on the screen.
          updateResponseTime: Ensures that the response time is updated and displayed in the correct format.

  # Troubleshooting Test Failures

    If a test fails, check for the following:

      Missing DOM elements: Ensure that the elements you're interacting with are present in the HTML and correctly targeted in your JavaScript functions.
      Incorrect values: Check that the values you're comparing in the assertions (e.g., score, round number) are correct and match the expected results.

## Development

  # Prerequisites:

    To develop or run the tests locally, you will need the following tools installed:

      Node.js (Version 12 or higher)
      npm (Node Package Manager)

  # Development Steps:

      Clone the repository and install the dependencies by running:

        npm install

      Make changes to the JavaScript files in the domHelper.js and gameEngine.js files.

      If you plan to use these files for testing or as an external module, ensure you have exported the necessary functions in both files.

  # Export Setup:

   # In domHelper.js, export the functions at the end of the file like so:

      module.exports = {
      showInstructionsModal,
      hideInstructionsModal,
      toggleFullscreen,
      exitFullscreen,
      isInFullScreen,
      toggleFullscreenButtonVisibility,
      updateScore,
      updateRoundNumber,
      updateResponseTime,
      showQuestion,
      hideElement,
      showElement,
      showFinalScore,
      highlightCorrectAnswer,
      disableButtons,
      enableButtons
      };

   # In gameEngine.js, make sure you are exporting the necessary functions as well:

      At the top of the file:

         const { showInstructionsModal, hideInstructionsModal, ... } = require('./domHelper');

      At the end of the file:

         module.exports = {
            ball,
            ballX,
            ballY,
            startTime,
            responseTime,
            animationFrameId,
            ballDirectionX,
            ballDirectionY,
            bounceCount,
            questionAsked,
            bounceTimes,
            isGameRunning,
            totalRounds,
            score,
            currentRound,
            gameConfig,
            setInitialPosition,
            moveBall,
            recordBounce,
            askQuestion,
            selectAnswer,
            checkAnswer,
            startGame,
            resetGame,
            endRound,
            endGame,
            startNewRound
         };

  # Code Style:

     Follow standard JavaScript coding conventions.
     Use descriptive variable and function names.
     Ensure proper indentation and formatting.

