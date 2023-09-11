// script.js
document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("startButton");
    const counter = document.getElementById("counter");
    const targetNumber = 1304990; // The number you want to count up to
    let currentNumber = 0;

    function updateCounter() {
        if (currentNumber < targetNumber) {
            currentNumber += 1000;
            counter.textContent = currentNumber;
            requestAnimationFrame(updateCounter);
        }
    }

    startButton.addEventListener("click", function () {
        if (currentNumber < targetNumber) {
            updateCounter();
        }
    });
});