const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// function for handling reading and writing PC data to CSV files.
const Writer = function () {
    //Function for generating CSV files. Will take in a path for where CSV should be written.
    //Usage will determine if it is for writting user info or pc info.
    this.writeCSVFile = (path, usage, data) => {
        try {
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
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = Writer;