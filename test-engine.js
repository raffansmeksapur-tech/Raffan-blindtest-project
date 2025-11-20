function generateTestPlate(testIndex) {
    const plate = testPlates[testIndex];
    const plateElement = document.getElementById('currentPlate');
    
    plateElement.innerHTML = `
        <img src="${plate.image}" alt="Color vision test plate ${testIndex + 1}" 
             style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
    `;
    
    updateProgress(testIndex);
}
