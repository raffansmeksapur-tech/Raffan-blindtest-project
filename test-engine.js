// Inisialisasi tes ketika halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    startTest();
    document.getElementById('numberInput').focus();
    
    // Dukungan tombol Enter
    document.getElementById('numberInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
});

// Mulai tes
function startTest() {
    currentTestIndex = 0;
    userAnswers = [];
    testStartTime = new Date();
    showTest(currentTestIndex);
}

// Tampilkan tes saat ini
function showTest(testIndex) {
    const plate = testPlates[testIndex];
    const plateElement = document.getElementById('testPlate');
    
    console.log(`Loading image: ${plate.image} for test ${testIndex + 1}`); // DEBUG
    
    // Buat elemen gambar dengan error handling
    plateElement.innerHTML = `
        <img src="${plate.image}" 
             alt="Plat tes penglihatan warna ${testIndex + 1}" 
             style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;"
             onload="console.log('Image loaded successfully: ${plate.image}')"
             onerror="handleImageError(this, ${testIndex})">
        <div id="fallback-${testIndex}" style="display: none; text-align: center; padding: 20px;">
            <h3>Tes ${testIndex + 1}</h3>
            <p>Gambar tidak dapat dimuat</p>
            <p><small>Jawaban benar: ${plate.number}</small></p>
        </div>
    `;
    
    // Perbarui progres
    updateProgress(testIndex);
    
    // Kosongkan input dan fokus
    document.getElementById('numberInput').value = '';
    document.getElementById('numberInput').focus();
}

// Handle error loading gambar
function handleImageError(imgElement, testIndex) {
    console.error(`Failed to load image: ${imgElement.src}`);
    imgElement.style.display = 'none';
    document.getElementById(`fallback-${testIndex}`).style.display = 'block';
}

// Perbarui progress bar
function updateProgress(testIndex) {
    const progress = ((testIndex + 1) / TOTAL_TESTS) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = `Tes ${testIndex + 1} dari ${TOTAL_TESTS}`;
}

// Periksa jawaban pengguna
function checkAnswer() {
    const input = document.getElementById('numberInput');
    const userAnswer = parseInt(input.value);
    
    // Validasi input
    if (isNaN(userAnswer) || userAnswer < 0 || userAnswer > 99) {
        alert('Harap masukkan angka antara 0 dan 99');
        input.focus();
        input.select();
        return;
    }
    
    // Dapatkan jawaban benar untuk tes saat ini
    const correctAnswer = testPlates[currentTestIndex].number;
    const isCorrect = userAnswer === correctAnswer;
    
    // Simpan hasil dengan informasi detail
    userAnswers.push({
        testNumber: currentTestIndex + 1,
        userAnswer: userAnswer,
        correctAnswer: correctAnswer,
        isCorrect: isCorrect,
        plateImage: testPlates[currentTestIndex].image
    });
    
    console.log(`Tes ${currentTestIndex + 1}: User memasukkan ${userAnswer}, Yang benar adalah ${correctAnswer}, Hasil: ${isCorrect ? 'BENAR' : 'SALAH'}`);
    
    // Pindah ke tes berikutnya atau tampilkan hasil
    currentTestIndex++;
    
    if (currentTestIndex < TOTAL_TESTS) {
        showTest(currentTestIndex);
    } else {
        showResults();
    }
}

// Hitung dan tampilkan hasil
function showResults() {
    // Sembunyikan layar tes, tampilkan layar hasil
    document.getElementById('testScreen').style.display = 'none';
    document.getElementById('resultsScreen').style.display = 'block';
    
    // Hitung skor
    const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
    const score = (correctAnswers / TOTAL_TESTS) * 100;
    const testDuration = Math.round((new Date() - testStartTime) / 1000);
    
    // Tampilkan skor
    document.getElementById('scoreDisplay').innerHTML = `
        ${correctAnswers} / ${TOTAL_TESTS}<br>
        <span style="font-size: 18px; color: #666;">${score.toFixed(1)}% Benar</span>
    `;
    
    // Tampilkan pesan hasil
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
    
    // Tampilkan hasil detail dengan perbandingan
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
    
    // Scroll ke hasil
    document.getElementById('resultsScreen').scrollIntoView({ behavior: 'smooth' });
}

// Ulangi tes
function restartTest() {
    document.getElementById('resultsScreen').style.display = 'none';
    document.getElementById('testScreen').style.display = 'block';
    startTest();
}
