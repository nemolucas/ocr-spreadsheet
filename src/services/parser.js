const fs = require ('fs')
const path = require ('path')

function ocrTxtData(text, fileTxt) {
    const output = path.join('./contents/text', fileTxt)
    
    fs.writeFileSync(output, text, 'utf-8', (err) => {
        if (err) {
            console.error(err)
        }
        else {
            console.log('.txt file saved to', output)
        }
    })

}

module.exports = { ocrTxtData };