// main.js

const generateCombinations = require('./main');

async function run() {
    const data = '!bbfs.5.1234';
    const getbb = data.match(/\.\d+\./);
    const bbdata = getbb[0].replace(/\./g, '');
    const desiredLength = parseInt(bbdata, 10);
    const input = data.slice(8);
    console.log(input);
    const combinations = await generateCombinations(input, desiredLength);

    console.log(combinations.join('*'));
}

run();
