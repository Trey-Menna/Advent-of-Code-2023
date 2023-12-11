/* Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. For example:

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.

What is the sum of all of the calibration values?*/
const fs = require('fs');

// Function to check if a word contains a spelled-out digit
function containsSpelledOutDigit(word) {
  const spelledOutDigits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  return spelledOutDigits.some(digit => word.toLowerCase().includes(digit));
}

// Function to calculate calibration values with spelled-out digits
function calculateCalibrationSum(document) {
  // Remove non-alphanumeric characters and split the document into lines
  const lines = document.trim().split('\n');

  // Initialize sum variable
  let sum = 0;

  // Iterate through each line
  for (const line of lines) {
    // Extract the words and numbers from the line using a regular expression
    const wordsAndNumbers = line.match(/[a-zA-Z0-9]+/g);

    // Extract the first and last single-digit values from the words and numbers
    let firstValue, lastValue;
    for (const wordOrNumber of wordsAndNumbers) {
      if (containsSpelledOutDigit(wordOrNumber)) {
        const numericalValue = parseInt(wordOrNumber, 10) || 0;
        const singleDigitValue = numericalValue % 10;
        if (firstValue === undefined) {
          firstValue = singleDigitValue;
        }
        lastValue = singleDigitValue;
      } else if (!isNaN(wordOrNumber)) {
        const numericalValue = parseInt(wordOrNumber, 10) || 0;
        const singleDigitValue = numericalValue % 10;
        if (firstValue === undefined) {
          firstValue = singleDigitValue;
        }
        lastValue = singleDigitValue;
      }
    }

    // Convert first and last values to a two-digit number and add to the sum
    if (firstValue !== undefined && lastValue !== undefined) {
      const twoDigitNumber = firstValue * 10 + lastValue;
      sum += twoDigitNumber;
    }
  }

  // Return the final sum
  return sum;
}

// Read content from the file
const fileName = 'TrebuchetInput.txt';
fs.readFile(fileName, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err}`);
    return;
  }

  // Calculate and display the sum
  const totalSum = calculateCalibrationSum(data);
  console.log(`The sum of all calibration values is: ${totalSum}`);
});



