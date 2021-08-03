const XLSX = require('xlsx')
const path = require('path')

const EXCEL_FILE = 'claims.xlsx';

exports.ReadExcelSheet =  () => {
    return new Promise(async(resolve, reject) => {
        const workbook = XLSX.readFile("./assets/claims.xlsx", {sheetStubs: true});
        let sheetNameList = workbook.SheetNames;
        let data = await XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]], {defval : ""})
        if(data){
            resolve(data)
        }else{
            reject({message:"failed to read file"})
        }
    })
}