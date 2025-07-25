document.getElementById("drop_zone").addEventListener("drop",  dropHandler);

document.getElementById("drop_zone").addEventListener("dragover", dragOverHandler)

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
        files.forEach((file, i) => {
        console.log(`file[${i}].name = ${file.name}`);
    });
    console.log("Number of files", files.length)
    }
}

function dragOverHandler(ev){
    console.log("File in drop zone");

    ev.preventDefault();
}