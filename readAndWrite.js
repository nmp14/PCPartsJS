const csv = require("csv-parser");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require("fs");

// function for handling reading and writing PC data to CSV files.
const readAndWrite = () => {
    // Add function for reading from csv file.
    const readFile = (path) => {
        try {
            if (fs.existsSync(path)) {
                fs.createReadStream(path)
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
    }

    const writeCSVFile = (path) => {
        const csvWriter = createCsvWriter({
            path: 'out.csv',
            header: [
                { id: 'name', title: 'Name' },
                { id: 'surname', title: 'Surname' },
                { id: 'age', title: 'Age' },
                { id: 'gender', title: 'Gender' },
            ]
        });

        const data = [
            {
                name: 'John',
                surname: 'Snow',
                age: 26,
                gender: 'M'
            }, {
                name: 'Clair',
                surname: 'White',
                age: 33,
                gender: 'F',
            }, {
                name: 'Fancy',
                surname: 'Brown',
                age: 78,
                gender: 'F'
            }
        ];

        csvWriter
            .writeRecords(data)
            .then(() => console.log('The CSV file was written successfully'));
    }
}

