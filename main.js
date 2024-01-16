// combinationGenerator.js

async function generateCombinations(input, length, current = '', results = []) {
    if (current.length === length) {
        results.push(current);
        return;
    }

    for (let i = 0; i < input.length; i++) {
        const newCurrent = current + input[i];
        const remaining = input.slice(0, i) + input.slice(i + 1);
        await generateCombinations(remaining, length, newCurrent, results);
    }

    return results;
}

module.exports = generateCombinations;
