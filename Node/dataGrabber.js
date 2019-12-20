const XLSX = require('xlsx');
const restroFilePath = 'restroData.xlsx';

class DataGrabber {
    constructor() {

        function getDataFromFile()
        {
            const workBook = XLSX.readFile(restroFilePath);
            const sheetNames = workBook.SheetNames;

            var data = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);

            console.log(data);

        }

    }
}

module.exports = DataGrabber;