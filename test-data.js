// Test configuration
const TOTAL_TESTS = 10;

// Test plates data
const testPlates = [
    { number: 26, image: 'images/plate-01.png' },
    { number: 13,  image: 'images/plate-02.png' },
    { number: 16,  image: 'images/plate-03.png' },
    { number: 7, image: 'images/plate-04.png' },
    { number: 45,  image: 'images/plate-05.png' },
    { number: 6,  image: 'images/plate-06.png' },
    { number: 74, image: 'images/plate-07.png' },
    { number: 15, image: 'images/plate-08.png' },
    { number: 29,  image: 'images/plate-09.png' },
    { number: 3, image: 'images/plate-10.png' }
];

// Test state
let currentTestIndex = 0;
let userAnswers = [];
let testStartTime = null;
