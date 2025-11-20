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
    
    // Buat elemen gambar
    plateElement.innerHTML = `
        <img src="${plate.image}" alt="Plat tes penglihatan warna ${testIndex + 1}" 
             onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=padding:20px;text-align:center;><h3>Tes ${testIndex + 1}</h3><p>Gambar tidak dapat dimuat</p><p><small>Jawaban benar: ${plate.number}</small></p></div>';">
    `;
    
    // Perbarui progres
    updateProgress(testIndex);
    
    // Kosongkan input dan fokus
    document.getElementById('numberInput').value = '';
    document.getElementById('numberInput').focus();
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
    
    // Debug: Log ke konsol (opsional)
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
    document.getElementById('resultsScreen
