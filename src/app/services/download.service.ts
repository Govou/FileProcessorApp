import { Injectable } from '@angular/core';
//import { Workbook } from 'exceljs';
import * as Excel from "exceljs";
import * as fs from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }

  async generateExcel() {


    // Excel Title, Header, Data
    const title = 'Monthly Birth Rate for 2021 in Nigeria';
    const header = ['Month', 'Lagos', 'Kaduna', 'Anambra', 'Abuja'];
    const data = [
    ["January", '50', '20', '25', '20'],
    ["February", '80', '20', '25', '20'],
    ["March", '120', '20', '25', '20'],  
    ["April", '75', '20', '25', '20'],  
    ["May", '60', '20', '25', '20'],  
    ["June", '80', '20', '25', '20'],  
    ["July", '95', '20', '25', '20'],  
    ["August", '55', '20', '25', '20'],  
    ["September", '45', '20', '25', '20'],  
    ["October", '80', '20', '25', '20'],  
    ["November", '90', '20', '25', '20'],  
    ["December", '110', '20', '25', '20'],      
  ];

    // Create workbook and worksheet
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Sharing Data');


// Add Row and formatting
    const titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Corbel', family: 4, size: 16, underline: 'double', bold: true };
    worksheet.addRow([]);
    const subTitleRow = worksheet.addRow(['Date : 01-01-2022']);

    worksheet.mergeCells('A1:D2');


// Blank Row
    worksheet.addRow([]);

// Add Header Row
    const headerRow = worksheet.addRow(header);

// Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFFFFF00' },
    bgColor: { argb: 'FF0000FF' }
  };
  cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
});

// Add Data and Conditional Formatting
    data.forEach(d => {
  const row = worksheet.addRow(d);
  const qty:any = row.getCell(5);
  let color = 'FF99FF99';
  if (+qty.value < 500) {
    color = 'FF9999';
  }

  qty.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: color }
  };
}

);

    worksheet.getColumn(3).width = 30;
    worksheet.getColumn(4).width = 30;
    worksheet.addRow([]);


// Footer Row
    const footerRow = worksheet.addRow(['This is system generated excel sheet.']);
    footerRow.getCell(1).fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FFCCFFE5' }
};
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

// Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

// Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
  const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  fs.saveAs(blob, 'SocialShare.xlsx');
});

  }
}
