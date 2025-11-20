// ... kode sebelumnya tetap sama ...

// Calculate and display results - TERJEMAHAN BAGIAN INI SAJA
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
        <span style="font-size: 18px; color: #666;">${score.toFixed(1)}% Benar</span>
    `;
    
    // Display result message
    const resultElement = document.getElementById('resultMessage');
    let resultClass, resultText, resultDescription;
    
    if (score >= 90) {
        resultClass = 'normal-vision';
        resultText = '✅ Penglihatan Warna Normal';
        resultDescription = 'Hasil tes menunjukkan penglihatan warna yang normal.';
    } else if (score >= 70) {
        resultClass = 'mild-deficiency';
        resultText = '⚠️ Kemungkinan Defisiensi Warna Ringan';
        resultDescription = 'Anda mungkin memiliki defisiensi penglihatan warna ringan. Pertimbangkan untuk melakukan tes profesional.';
    } else {
        resultClass = 'strong-deficiency';
        resultText = '❌ Kemungkinan Defisiensi Penglihatan Warna';
        resultDescription = 'Hasil tes menunjukkan kemungkinan defisiensi penglihatan warna. Evaluasi profesional direkomendasikan.';
    }
    
    resultElement.className = `result ${resultClass}`;
    resultElement.innerHTML = `
        <strong>${resultText}</strong><br>
        ${resultDescription}
    `;
    
    // Display detailed results with comparison
    const detailsElement = document.getElementById('resultDetails');
    const detailsHTML = userAnswers.map(answer => {
        const statusIcon = answer.isCorrect ? '✅' : '❌';
        const statusClass = answer.isCorrect ? 'correct' : 'incorrect';
        
        return `
            <div class="test-result ${statusClass}">
                <strong>Tes ${answer.testNumber}:</strong><br>
                Jawaban Anda: <strong>${answer.userAnswer}</strong><br>
                Jawaban benar: <strong>${answer.correctAnswer}</strong><br>
                Hasil: ${statusIcon} ${answer.isCorrect ? 'Benar' : 'Salah'}
            </div>
        `;
    }).join('');
    
    detailsElement.innerHTML = `
        <details open>
            <summary><strong>Hasil Detail - Perbandingan Setiap Tes:</strong></summary>
            <div class="details-content">
                ${detailsHTML}
                <div style="margin-top: 15px; padding-top: 15px; border-top: 2px solid #ddd; background: #f8f9fa; padding: 15px; border-radius: 5px;">
                    <strong>Ringkasan Tes:</strong><br>
                    • Total tes: ${TOTAL_TESTS}<br>
                    • Jawaban benar: ${correctAnswers}<br>
                    • Jawaban salah: ${TOTAL_TESTS - correctAnswers}<br>
                    • Waktu penyelesaian: ${testDuration} detik
                </div>
            </div>
        </details>
    `;
    
    // Scroll to results
    document.getElementById('resultsScreen').scrollIntoView({ behavior: 'smooth' });
}

// ... kode setelahnya tetap sama ...
