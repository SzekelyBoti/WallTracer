﻿const { expect } = require('chai');
const sinon = require('sinon');
const { JSDOM } = require('jsdom');

// Set up the DOM environment globally before importing other modules
let window, document;
before(() => {
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Test</title>
        </head>
        <body>
            <div id="ball"></div>
            <div id="question-container" class="hidden"></div>
            <div id="continue-btn" class="hidden"></div>
            <div id="start-btn"></div>
            <div id="score-screen" class="hidden"></div>
            <div id="final-score"></div>
        </body>
        </html>
    `;
    window = new JSDOM(html, {
        virtualConsole: new (require('jsdom')).VirtualConsole(),
        runScripts: "dangerously",
        resources: "usable"
    }).window;
    document = window.document;
    window.innerWidth = 1920;
    window.innerHeight = 1080;

    global.window = window;
    global.document = document;
    global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
});

describe('Game Logic Tests', () => {
    let domManipulation;
    let gameLogic;
    let ballElement;

    beforeEach(() => {
        ballElement = document.getElementById('ball');
        domManipulation = require('../domManipulation');
        gameLogic = require('../gameLogic');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should set the initial position of the ball', () => {
        gameLogic.setInitialPosition(ballElement);

        const ballLeft = parseInt(ballElement.style.left);
        const ballTop = parseInt(ballElement.style.top);

        expect(ballLeft).to.be.closeTo(window.innerWidth / 2 - ballElement.offsetWidth / 2, 1);
        expect(ballTop).to.be.closeTo(window.innerHeight / 2 - ballElement.offsetHeight / 2, 1);
    });

    it('should record a bounce when the ball hits a wall', () => {
        gameLogic.recordBounce('right');
        expect(gameLogic.gameConfig.rounds[0].bounces).to.equal(2);
        expect(gameLogic.gameConfig.rounds[0].questionBounceIndex).to.equal(1);
    });

    it('should start a game and reset game parameters', () => {
        const elementMock = {
            classList: {
                add: sinon.spy(),
                remove: sinon.spy()
            }
        };

        sinon.stub(document, 'getElementById').callsFake((id) => {
            if (id === "ball") return ballElement;
            if (id === "round-number") return { innerText: '', style: {} };
            return elementMock;
        });

        gameLogic.startGame();

        expect(gameLogic.totalRounds).to.equal(3);
        expect(gameLogic.score).to.equal(0);
        expect(gameLogic.currentRound).to.equal(0);

        expect(elementMock.classList.add.calledWith('hidden')).to.be.true;
        expect(elementMock.classList.remove.calledWith('hidden')).to.be.true;

        document.getElementById.restore();
    });
});

describe('DOM Manipulation Tests', () => {
    let domManipulation;
    let gameLogic;
    let ballElement;
    let elementMock;

    before(() => {
        ballElement = document.getElementById('ball');
        domManipulation = require('../domManipulation');
        gameLogic = require('../gameLogic');
    });

    beforeEach(() => {
        elementMock = {
            classList: {
                add: sinon.spy(),
                remove: sinon.spy()
            },
            innerText: ''
        };

        sinon.stub(document, 'getElementById').callsFake((id) => {
            if (id === 'score') return elementMock;
            if (id === 'round-number') return elementMock;
            if (id === 'response-time') return elementMock;
            return null;
        });
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should show an element by removing the hidden class', () => {
        domManipulation.showElement('score');
        expect(elementMock.classList.remove.calledWith('hidden')).to.be.true;
    });

    it('should hide an element by adding the hidden class', () => {
        domManipulation.hideElement('score');
        expect(elementMock.classList.add.calledWith('hidden')).to.be.true;
    });

    it('should update the score on the screen', () => {
        domManipulation.updateScore(100);
        expect(elementMock.innerText).to.equal('100');
    });

    it('should update the response time on the screen', () => {
        domManipulation.updateResponseTime(30);
        expect(elementMock.innerText).to.equal('30.00');
    });
});














