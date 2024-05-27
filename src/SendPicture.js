export async function sendImageToBackend(folderName, fileName, base64Image) {
    const url = 'https://localhost:7017/api/Image'; // Replace with your actual backend URL
    const data = {
        folderName: folderName,
        fileName: fileName,
        imageData: base64Image
    };

    await manageSendImageResponse(url, data)
}

async function manageSendImageResponse(url, data){

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log('Image sent successfully');
        } else {
            console.error('Error sending image:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending image:', error);
    }
}