const csv = require("csv-parser");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require("fs");

// function for handling reading and writing PC data to CSV files.
const ReadAndWrite = function () {
    // Add function for reading from csv file.
    this.readFile = (path) => {
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
    //Function for generating CSV files. Will take in a path for where CSV should be written.
    //Usage will determine if it is for writting user info or pc info.
    this.writeCSVFile = (path, usage, data) => {
        let csvWriter;
        if (usage === "userInfo") {
            csvWriter = createCsvWriter({
                path: path,
                header: [
                    { id: 'username', title: 'Username' },
                    { id: 'password', title: 'Password' },
                    { id: 'uniqueID', title: 'UniqueID' },
                ],
                //apend instead of write
                append: true
            });
        } else if (usage === "pcInfo") {
            csvWriter = createCsvWriter({
                path: path,
                header: [
                    { id: 'name', title: 'Name' },
                    { id: 'surname', title: 'Surname' },
                    { id: 'age', title: 'Age' },
                    { id: 'gender', title: 'Gender' },
                ]
            });
        }

        csvWriter
            .writeRecords(data)
            .then(() => console.log('The CSV file was written successfully'));
    }
}

module.exports.ReadAndWrite;