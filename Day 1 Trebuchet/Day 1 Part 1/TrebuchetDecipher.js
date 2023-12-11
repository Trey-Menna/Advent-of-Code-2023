/* each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.

For example:

1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

Consider your entire calibration document. What is the sum of all of the calibration values?
Submit Answer here, https://adventofcode.com/2023/day/1  */
const fs = require('fs');

// Function to filter out non-numeric characters and calculate calibration values
function calculateCalibrationSum(document) {
  // Remove non-numeric characters
  const numericDocument = document.replace(/[^0-9\n]/g, '');

  // Split the document into lines
  const lines = numericDocument.trim().split('\n');

  // Initialize sum variable
  let sum = 0;

  // Iterate through each line
  for (const line of lines) {
    // Extract first and last digits
    const firstDigit = parseInt(line[0]);
    const lastDigit = parseInt(line[line.length - 1]);

    // Combine digits to form the calibration value
    const calibrationValue = firstDigit * 10 + lastDigit;

    // Add to the sum
    sum += calibrationValue;
  }

  // Return the final sum
  return sum;
}

// Read content from the file
const fileName = 'TrebuchetInput.txt'; // Update with your file name
fs.readFile(fileName, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err}`);
    return;
  }

  // Calculate and display the sum
  const totalSum = calculateCalibrationSum(data);
  console.log(`The sum of all calibration values is: ${totalSum}`);
});
