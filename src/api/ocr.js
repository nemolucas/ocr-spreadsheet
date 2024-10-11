const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({
    keyFilename: './config/api-vision-credentials.json',
});

async function getVisionData(targetImage) {

    const [result] = await client.textDetection(targetImage);
    const visionDetect = result.textAnnotations;

    if (!visionDetect) {
        return '';
    }

    const stringDesc = visionDetect.map(detection => detection.description);
    const fullText = stringDesc.join(' '); 

    return fullText;
}

module.exports = { getVisionData };
