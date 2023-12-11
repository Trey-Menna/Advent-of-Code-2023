#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <unordered_map>

bool isPossible(const std::unordered_map<std::string, int>& game, int red, int green, int blue) {
    int countRed = game.count("red") ? game.at("red") : 0;
    int countGreen = game.count("green") ? game.at("green") : 0;
    int countBlue = game.count("blue") ? game.at("blue") : 0;

    return countRed <= red && countGreen <= green && countBlue <= blue;
}

int main() {
    std::ifstream inputFile("input.txt");
    std::string line;
    std::vector<std::unordered_map<std::string, int>> games;
    int totalSum = 0;
    int currentGameID = 1;

    while (std::getline(inputFile, line)) {
        std::istringstream iss(line);

        // Skip the "Game x:" part
        iss.ignore(10, ':');

        std::unordered_map<std::string, int> gameInfo;
        char color;
        int count;

        while (iss >> count >> color) {
            gameInfo[std::string(1, color)] = count;

            // Skip comma or semicolon
            if (iss.peek() == ',' || iss.peek() == ';') {
                iss.ignore();
            }
        }

        games.push_back(gameInfo);

        if (isPossible(gameInfo, 12, 13, 14)) {
            totalSum += currentGameID;
        }

        currentGameID++;
    }

    std::cout << "Total sum of possible game IDs: " << totalSum << std::endl;

    return 0;
}
