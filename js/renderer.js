$(function(){

const electron = require('electron')
const {dialog } = require('electron').remote;

const fs = require('fs');

let saveButton = $("#save-file");

var simplemde = new SimpleMDE({ element: document.getElementById("text-area") });
var headerTitle = $("#file-name");
 
electron.ipcRenderer.on('new-file', (event, arg) => {
  // Get the current Vue instance (i.e. which component/route is currently active)
   //console.log(headerTitle.text());
   var filename = openSaveDialog();
   headerTitle.text(getFileName(filename));
   console.log(filename);

});

electron.ipcRenderer.on('open-file', (event, arg) => {
    // Get the current Vue instance (i.e. which component/route is currently active)
     //console.log(headerTitle.text());
     var filename = openSelectFileDialog();
     headerTitle.text(getFileName(filename));
     console.log(filename);
  
  });


saveButton.on("click",function(){
    var content=simplemde.value();
    console.log(simplemde.value());
    var filename = openSaveDialog();
    createFile(content, filename);
    return false;
});

function openSaveDialog(){
    var filename= dialog.showSaveDialog(
        { properties: ['selectFile', 'multiSelections'] });
    return filename;
}

function openSelectFileDialog(){
   var file = dialog.showOpenDialog(
       { properties: ['openFile'] });
       //console.log(file);
    return file[0];
}


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

function getFileName(fullPath){
    if(fullPath !== undefined){
        return fullPath.replace(/^.*[\\\/]/, '');
    }
}

});