document.getElementById("drop_zone").addEventListener("drop", dropHandler);

document.getElementById("drop_zone").addEventListener("dragover", dragOverHandler)

function dropHandler(ev){
    console.log("Files Dropped");

    ev.preventDefault();

    if (ev.dataTransfer.items){
        [...ev.dataTransfer.items].forEach((item, i) => {
            if(item.kind === "file"){
                const file = item.getasFile()
                console.log('... file[${i}].name = ${file.name}');
            }
        });
    } else {
        [...ev.dataTransfer.files].forEach((item, i) => {
            console.log('... file[${i}].name = ${file.name}');
        });
    }
}

function dragOverHandler(ev){
    console.log("File in drop zone");

    ev.preventDefault();
}