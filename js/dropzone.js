document.getElementById("drop_zone").addEventListener("drop",  dropHandler);

document.getElementById("drop_zone").addEventListener("dragover", dragOverHandler)

let outputType = 'image/jpg'
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

async function handleFiles(files){
     const convertedList = [];
     for (const file of files) {
        if (!file.type.startsWith("image/")) continue;

        const newBlob = await convertImage(file, { type: outputType, quality, width, height });
        console.log("image converted")
        const newFile = new File([newBlob], changeExt(file.name, extFromType(outputType)), { type: newBlob.type });
        convertedList.push(newFile);
     }
     
     console.log("files handled")

     uploadFiles(convertedList);

     console.log("files uploaded")
}

async function convertImage(inputFile, { type = "image/jpeg", quality=0.8, width, height }) {
    const bitmap = await createImageBitmap(inputFile);

    const offs = new OffscreenCanvas(width || bitmap.width, height || bitmap.height);
    const ctx = offs.getContext("2d");
    ctx.drawImage(bitmap, 0, 0, width || bitmap.width, height || bitmap.height);

    return await offs.convertToBlob({ type, quality });
}

function dragOverHandler(ev){
    console.log("File in drop zone");

    ev.preventDefault();
}