// Initialize test when page loads
document.addEventListener('DOMContentLoaded', function() {
    generateTestPlate(0);
    document.getElementById('userInput').focus();
});

// Generate a test plate
function generateTestPlate(testIndex) {
    const plate = testPlates[testIndex];
    const plateElement = document.getElementById('currentPlate');
    plateElement.innerHTML = '';
    
    // Create background dots
    for (let i = 0; i < plate.backgroundDots.count; i++) {
        createDot(plateElement, plate.backgroundDots.color, true);
    }
    
    // Create number dots (these will form the visible number)
    createNumberPattern(plateElement, plate.number, plate.numberDots.color);
    
    // Update progress
    updateProgress(testIndex);
}

// Create a single dot
function createDot(container, color, isBackground = false) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.style.backgroundColor = color;
    dot.style.width = Math.random() * 10 + 5 + 'px';
    dot.style.height = dot.style.width;
    dot.style.left = Math.random() * 100 + '%';
    dot.style.top = Math.random() * 100 + '%';
    
    if (isBackground) {
        dot.style.opacity = Math.random() * 0.5 + 0.3;
    }
    
    container.appendChild(dot);
}

// Create number pattern using dots
function createNumberPattern(container, number, color) {
    const numberStr = number.toString();
    const plateSize = 300;
    
    // Simple number positioning (this is a simplified version)
    for (let i = 0; i < testPlates[currentTest].numberDots.count; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.backgroundColor = color;
        dot.style.width = '12px';
        dot.style.height = '12px';
        
        // This would need more sophisticated logic for proper number shapes
        // For simplicity, we're creating clustered patterns
        const clusterX = 120 + (i % 4) * 40;
        const clusterY = 120 + Math.floor(i / 4) * 40;
        
        dot.style.left = (clusterX + Math.random() * 30 - 15) + 'px';
        dot.style.top = (clusterY + Math.random() * 30 - 15) + 'px';
        
        container.appendChild(dot);
    }
}

// Update progress bar and text
function updateProgress(testIndex) {
    const progress = ((testIndex + 1) / testPlates.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = `Test ${testIndex + 1} of ${testPlates.length}`;
}

// Check user's answer
function checkAnswer() {
    const userInput = document.getElementById('userInput');
    const answer = parseInt(userInput.value);
    
    if (isNaN(answer)) {
        alert('Please enter a number');
        return;
    }
    
    // Store answer
    userAnswers.push({
        testNumber: currentTest + 1,
        expected: testPlates[currentTest].number,
        answered: answer,
        correct: answer === testPlates[currentTest].number
    });
    
    // Clear input
    userInput.value = '';
    
    // Move to next test or show results
    currentTest++;
    
    if (currentTest < testPlates.length) {
        generateTestPlate(currentTest);
    } else {
        showResults();
    }
    
    userInput.focus();
}

// Show final results
function showResults() {
    document.getElementById('testScreen').classList.add('hidden');
    document.getElementById('resultsScreen').classList.remove('hidden');
    
    const correctAnswers = userAnswers.filter(answer => answer.correct).length;
    const score = (correctAnswers / testPlates.length) * 100;
    
    // Display score
    document.getElementById('scoreDisplay').innerHTML = `
        <h3>Your Score: ${correctAnswers}/${testPlates.length} (${score.toFixed(1)}%)</h3>
    `;
    
    // Display result message
    const resultMessage = document.getElementById('resultMessage');
    if (score >= 90) {
        resultMessage.innerHTML = '<p style="color: #4CAF50; background: #E8F5E8;">✅ <strong>Normal Color Vision</strong><br>Your results suggest normal color vision.</p>';
    } else if (score >= 70) {
        resultMessage.innerHTML = '<p style="color: #FF9800; background: #FFF3E0;">⚠️ <strong>Possible Mild Color Deficiency</strong><br>You may have mild color vision deficiency. Consider professional testing.</p>';
    } else {
        resultMessage.innerHTML = '<p style="color: #F44336; background: #FFEBEE;">❌ <strong>Possible Color Vision Deficiency</strong><br>Your results suggest color vision deficiency. Professional evaluation recommended.</p>';
    }
    
    // Show detailed results
    const details = userAnswers.map(answer => 
        `Test ${answer.testNumber}: ${answer.answered} (Correct: ${answer.expected}) ${answer.correct ? '✅' : '❌'}`
    ).join('<br>');
    
    resultMessage.innerHTML += `<br><details><summary>Detailed Results</summary><p>${details}</p></details>`;
}

// Restart test
function restartTest() {
    currentTest = 0;
    userAnswers = [];
    document.getElementById('resultsScreen').classList.add('hidden');
    document.getElementById('testScreen').classList.remove('hidden');
    generateTestPlate(0);
    document.getElementById('userInput').focus();
}

// Handle Enter key press
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});
