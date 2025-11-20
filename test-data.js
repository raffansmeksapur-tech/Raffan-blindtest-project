// Test configuration
const TOTAL_TESTS = 10;

// Test plates data
const testPlates = [
    { number: 12, image: 'images/plate-01.jpg' },
    { number: 8,  image: 'images/plate-02.jpg' },
    { number: 6,  image: 'images/plate-03.jpg' },
    { number: 29, image: 'images/plate-04.jpg' },
    { number: 5,  image: 'images/plate-05.jpg' },
    { number: 3,  image: 'images/plate-06.jpg' },
    { number: 15, image: 'images/plate-07.jpg' },
    { number: 74, image: 'images/plate-08.jpg' },
    { number: 2,  image: 'images/plate-09.jpg' },
    { number: 16, image: 'images/plate-10.jpg' }
];

// Test state
let currentTestIndex = 0;
let userAnswers = [];
let testStartTime = null;
