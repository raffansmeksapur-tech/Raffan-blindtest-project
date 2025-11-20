// Color blindness test data - 10 test plates
const testPlates = [
    {
        number: 12,
        backgroundDots: { color: '#FF6B6B', count: 200 }, // Reddish
        numberDots: { color: '#4ECDC4', count: 80 } // Teal
    },
    {
        number: 8,
        backgroundDots: { color: '#45B7D1', count: 180 }, // Blue
        numberDots: { color: '#F7D38C', count: 70 } // Yellowish
    },
    {
        number: 6,
        backgroundDots: { color: '#96CEB4', count: 220 }, // Green
        numberDots: { color: '#FF9999', count: 75 } // Pink
    },
    {
        number: 29,
        backgroundDots: { color: '#D4A5A5', count: 190 }, // Muted red
        numberDots: { color: '#7EC8C3', count: 85 } // Blue-green
    },
    {
        number: 5,
        backgroundDots: { color: '#F0E68C', count: 210 }, // Khaki
        numberDots: { color: '#DDA0DD', count: 65 } // Plum
    },
    {
        number: 3,
        backgroundDots: { color: '#98D8C8', count: 200 }, // Green-blue
        numberDots: { color: '#F08080', count: 70 } // Light coral
    },
    {
        number: 15,
        backgroundDots: { color: '#B19CD9', count: 180 }, // Light purple
        numberDots: { color: '#AEC6CF', count: 80 } // Pastel blue
    },
    {
        number: 74,
        backgroundDots: { color: '#FFB347', count: 220 }, // Orange
        numberDots: { color: '#77DD77', count: 90 } // Pastel green
    },
    {
        number: 2,
        backgroundDots: { color: '#836953', count: 190 }, // Brown
        numberDots: { color: '#779ECB', count: 60 } // Blue-gray
    },
    {
        number: 16,
        backgroundDots: { color: '#CB99C9', count: 200 }, // Pink-purple
        numberDots: { color: '#B5EAD7', count: 85 } // Mint
    }
];

// Test results and state
let currentTest = 0;
let userAnswers = [];
let testStarted = false;
