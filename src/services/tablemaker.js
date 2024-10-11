const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const txtToXlsx = (txtFolder, outputFolder) => {
    try {
        const files = fs.readdirSync(txtFolder).filter(file => file.endsWith('.txt'));

        files.forEach(file => {
            const filePath = path.join(txtFolder, file);
            const data = fs.readFileSync(filePath, 'utf-8');

            const lines = data.split('\n');

            const rows = [];
            rows.push(['Quantidade', 'Código', 'Discriminação', 'Unitário', 'Total']);

            lines.forEach(line => {
                const columns = line.split(/\s+/); 
                if (columns.length >= 5) {
                    rows.push(columns); 
                }
            });

            const ws = XLSX.utils.aoa_to_sheet(rows);
            const wb = XLSX.utils.book_new();

            XLSX.utils.book_append_sheet(wb, ws, path.basename(file, '.txt'));

            const outputFilePath = path.join(outputFolder, `${path.basename(file, '.txt')}.xlsx`);

            let counter = 1;
            let newOutputFilePath = outputFilePath;
            while (fs.existsSync(newOutputFilePath)) {
                newOutputFilePath = path.join(outputFolder, `${path.basename(file, '.txt')}_${counter}.xlsx`);
                counter++;
            }

            XLSX.writeFile(wb, newOutputFilePath);
        });

        console.log('spreadsheet created successfully!');
    } catch (error) {
        console.error('X_X', error);
    }
};

const txtFolder = path.join(__dirname, '../..', 'contents', 'text');
const outputFolder = path.join(__dirname, '../..', 'contents', 'spreadsheets');


txtToXlsx(txtFolder, outputFolder);
