const csv = require("csv-parser");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require("fs");

try {
    if (fs.existsSync('./data.csv')) {
        fs.createReadStream('data.csv')
            .pipe(csv())
            .on('data', (row) => {
                console.log(row);
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
            });
    }
} catch (err) {
    console.error(err);
}

