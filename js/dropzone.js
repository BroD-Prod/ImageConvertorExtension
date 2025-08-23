document.getElementById("drop_zone").addEventListener("drop",  dropHandler);

document.getElementById("drop_zone").addEventListener("dragover", dragOverHandler)

let quality    = 0.8;            
let width      = undefined;     
let height     = undefined;

function dropHandler(ev){
    if (ev.dataTransfer.items){
        ev.preventDefault();

        console.log("Files Dropped");

        const dt = ev.dataTransfer;
        let files = [];

        if (dt.items){
            files = [...dt.items]
            .filter(item => item.kind === "file")
            .map(item => item.getAsFile());
        }
        else if (dt.files){
            files = [...dt.files];
        }
        handleFiles(files);
    }
}

function getSelectedOutputType() {
    const selectElement = document.getElementById("outputType");
    return selectElement ? selectElement.value : 'image/jpeg';
}

async function handleFiles(files){
     const convertedList = [];
     const outputType = getSelectedOutputType();
     for (const file of files) {
        if (!file.type.startsWith("image/")) continue;

        const newFile = await convertImage(file, { type: outputType, quality, width, height });
        console.log("image converted")
        convertedList.push(newFile);
     }
     
     console.log("files handled")

     downloadFiles(convertedList);

     console.log("files uploaded")
}

async function convertImage(inputFile, { type = "image/jpeg", quality=0.8, width, height }) {
    const bitmap = await createImageBitmap(inputFile);

    const offs = new OffscreenCanvas(width || bitmap.width, height || bitmap.height);
    const ctx = offs.getContext("2d");
    ctx.drawImage(bitmap, 0, 0, width || bitmap.width, height || bitmap.height);

    const blob =  offs.convertToBlob({ type, quality });

    const newFile = new File([blob], changeExt(inputFile.name, extFromType(type)), {type: blob.type});

    return newFile;
}

function dragOverHandler(ev){
    console.log("File in drop zone");

    ev.preventDefault();
}

function downloadFiles(convertedList){
    convertedList.forEach(file => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.download = file.name;

        link.click();
    });
}

function changeExt(filename, newExt){
    return filename.replace(/\.[^/.]+$/,"") + newExt;
}

function extFromType(mimeType) {
    switch (mimeType) {
        case "image/jpeg":
            return ".jpg";
        case "image/png":
            return ".png";
        case "image/gif":
            return ".gif";
        default:
            return ".jpg";
    }
}