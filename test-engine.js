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
        <img src="${plate.image}" alt="Plat tes penglihatan warna ${
