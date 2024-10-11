// api and ocr calls

const { getVisionData } = require( './api/ocr.js' );
const { ocrTxtData } = require ( './services/parser.js' );

async function processImage (targetImage) {
    try {

        const visionResult = await getVisionData(targetImage)
            console.log(visionResult)
        
        const fileTxt = `${path.basename(targetImage, path.extname(targetImage))}.txt`;

        ocrTxtData(visionResult, fileTxt);

        imageProcessed(targetImage)
    }

    catch (error) {
        console.error(error)
    }
    
}

// image context and path

const fs = require('fs')
const path = require ('path')

const imageFolder = './contents/staged'
const endFolder = './contents/processed'

function getImages(folderPath) {
    return fs.readdirSync(folderPath).filter(file => {
        return path.extname(file).toLowerCase() === '.jpg';
    });
}


const imageFiles = getImages(imageFolder);

if(imageFiles.length > 0) {

  imageFiles.forEach (imageFile =>{
    const targetImage = path.join(imageFolder, imageFile)
    console.log(targetImage)

    processImage(targetImage)
  })  
}   

else {
    console.log('nothing X_X')
}

function imageProcessed(targetImage) {
    
    const fileName = path.basename(targetImage)
    const sendTo = path.join(endFolder, fileName)

    if (!fs.existsSync(endFolder)) {
        fs.mkdirSync(endFolder);
    }

    fs.rename(targetImage, sendTo, (err) => {
        if (err) {
                console.error(err)
        }
            else {
                console.log('image now is located at:', sendTo)
            }
    });

}