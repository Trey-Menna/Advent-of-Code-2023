#include <iostream>
#include <fstream>
#include <string>
#include <cctype>

// Function to check if a character is a digit
bool isDigit(char c) {
    return std::isdigit(static_cast<unsigned char>(c));
}

// Function to convert spelled-out digits to numerical digits
int convertSpelledOutDigit(const std::string& spelledOutDigit) {
    const std::string spelledOutDigits[] = { "one", "two", "three", "four", "five", "six", "seven", "eight", "nine" };
    for (int i = 0; i < 9; ++i) {
        if (spelledOutDigit == spelledOutDigits[i]) {
            return i + 1; // Return the corresponding numerical digit
        }
    }
    return 0; // Return 0 if not found
}

int main() {
    std::string line;
    std::ifstream file("input.txt");
    int sum = 0; // Initialize sum

    if (file.is_open()) {
        const std::string spelledOutDigits[] = { "one", "two", "three", "four", "five", "six", "seven", "eight", "nine" };
        
        while (getline(file, line)) {
            // Extract the real first and last digits from the line
            int firstDigit = 0;
            int lastDigit = 0;

            for (size_t i = 0; i < line.size(); ++i) {
                if (isDigit(line[i])) {
                    // If it's a numerical digit, extract it directly
                    if (firstDigit == 0) {
                        firstDigit = line[i] - '0';
                    }
                    lastDigit = line[i] - '0';
                } else {
                    // If it's not a digit, check if it's a spelled-out digit
                    for (int j = 0; j < 9; ++j) {
                        std::string spelledOutDigit = line.substr(i, spelledOutDigits[j].size());
                        if (spelledOutDigit == spelledOutDigits[j]) {
                            if (firstDigit == 0) {
                                firstDigit = j + 1;
                            }
                            lastDigit = j + 1;
                            i += spelledOutDigits[j].size() - 1; // Move the index accordingly
                            break;
                        }
                    }
                }
            }

            // Merge the first and last digits into a two-digit number
            int mergedDigits = firstDigit * 10 + lastDigit;

            // Add the merged digits to the sum
            sum += mergedDigits;

            // Output the real first and last digits and the merged digits
            std::cout << "Line: " << line << "\n";
            std::cout << "First Digit: " << firstDigit << "\n";
            std::cout << "Last Digit: " << lastDigit << "\n";
            std::cout << "Merged Digits: " << mergedDigits << "\n";
        }

        // Output the total sum
        std::cout << "Total Sum: " << sum << "\n";

        file.close();
    } else {
        std::cerr << "Unable to open file\n";
    }

    return 0;
}
