// Initialize test when page loads
document.addEventListener('DOMContentLoaded', function() {
    startTest();
    document.getElementById('numberInput').focus();
    
    // Enter key support
    document.getElementById('numberInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
});

// Start the test
function startTest() {
    currentTestIndex = 0;
    userAnswers = [];
    testStartTime = new Date();
    showTest(currentTestIndex);
}

// Display current test
function showTest(testIndex) {
    const plate = testPlates[testIndex];
    const plateElement = document.getElementById('testPlate');
    
    // Create image element
    plateElement.innerHTML = `
        <img src="${plate.image}" alt="Color vision test plate ${testIndex + 1}" 
             onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=padding:20px;text-align:center;><h3>Test ${testIndex + 1}</h3><p>Image not loaded</p></div>';">
    `;
    
    // Update progress
    updateProgress(testIndex);
    
    // Clear input
    document.getElementById('numberInput').value = '';
    document.getElementById('numberInput').focus();
}

// Update progress bar
function updateProgress(testIndex) {
    const progress = ((testIndex + 1) / TOTAL_TESTS) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = `Test ${testIndex + 1} of ${TOTAL_TESTS}`;
}

// Check user's answer
function checkAnswer() {
    const input = document.getElementById('numberInput');
    const userAnswer = parseInt(input.value);
    
    if (isNaN(userAnswer)) {
        alert('Please enter a number');
        input.focus();
        return;
    }
    
    // Store result
    const correctAnswer = testPlates[currentTestIndex].number;
    const isCorrect = userAnswer === correctAnswer;
    
    userAnswers.push({
        testNumber: currentTestIndex + 1,
        userAnswer: userAnswer,
        correctAnswer: correctAnswer,
        isCorrect: isCorrect
    });
    
    // Move to next test or show results
    currentTestIndex++;
    
    if (currentTestIndex < TOTAL_TESTS) {
        showTest(currentTestIndex);
    } else {
        showResults();
    }
}

// Calculate and display results
function showResults() {
    // Hide test screen, show results screen
    document.getElementById('testScreen').style.display = 'none';
    document.getElementById('resultsScreen').style.display = 'block';
    
    // Calculate score
    const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
    const score = (correctAnswers / TOTAL_TESTS) * 100;
    const testDuration = Math.round((new Date() - testStartTime) / 1000);
    
    // Display score
    document.getElementById('scoreDisplay').innerHTML = `
        ${correctAnswers} / ${TOTAL_TESTS}<br>
        <span style="font-size: 18px; color: #666;">${score.toFixed(1)}% Correct</span>
    `;
    
    // Display result message
    const resultElement = document.getElementById('resultMessage');
    let resultClass, resultText, resultDescription;
    
    if (score >= 90) {
        resultClass = 'normal-vision';
        resultText = '✅ Normal Color Vision';
        resultDescription = 'Your results suggest normal color vision.';
    } else if (score >= 70) {
        resultClass = 'mild-deficiency';
        resultText = '⚠️ Possible Mild Color Deficiency';
        resultDescription = 'You may have mild color vision deficiency. Consider professional testing.';
    } else {
        resultClass = 'strong-deficiency';
        resultText = '❌ Possible Color Vision Deficiency';
        resultDescription = 'Your results suggest color vision deficiency. Professional evaluation recommended.';
    }
    
    resultElement.className = `result ${resultClass}`;
    resultElement.innerHTML = `
        <strong>${resultText}</strong><br>
        ${resultDescription}
    `;
    
    // Display detailed results
    const detailsElement = document.getElementById('resultDetails');
    const detailsHTML = userAnswers.map(answer => `
        <div class="test-result">
            Test ${answer.testNumber}: You entered <strong>${answer.userAnswer}</strong> 
            (Correct: ${answer.correctAnswer}) 
            ${answer.isCorrect ? '✅' : '❌'}
        </div>
    `).join('');
    
    detailsElement.innerHTML = `
        <details>
            <summary>View Detailed Results</summary>
            <div class="details-content">
                ${detailsHTML}
                <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #ddd;">
                    <strong>Test completed in:</strong> ${testDuration} seconds
                </div>
            </div>
        </details>
    `;
    
    // Scroll to results
    document.getElementById('resultsScreen').scrollIntoView({ behavior: 'smooth' });
}

// Restart the test
function restartTest() {
    document.getElementById('resultsScreen').style.display = 'none';
    document.getElementById('testScreen').style.display = 'block';
    startTest();
}
