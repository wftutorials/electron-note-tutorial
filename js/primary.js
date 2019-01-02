$(function(){

const {dialog} = require('electron').remote;

const fs = require('fs');

let saveButton = $("#save-file");

var simplemde = new SimpleMDE({ element: document.getElementById("text-area") });
var headerTitle = $("#file-name");

saveButton.on("click",function(){
    var content=simplemde.value();
    console.log(simplemde.value());
    var filename= dialog.showSaveDialog(
        { properties: ['selectFile', 'multiSelections'] });
    createFile(content, filename);
    return false;
});


function createFile(text, filename){
    if(filename!== undefined){
        fs.writeFile(filename, text, function(err) {
            if(err) {
                return console.log(err);
            }
            headerTitle.text(filename);
            console.log("The file was saved!");
        }); 
    }
}

});