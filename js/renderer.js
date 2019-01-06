$(function(){

const electron = require('electron')
const {dialog } = require('electron').remote;
let Notify = require('notifyjs');
var path = require('path');
const fs = require('fs');

let saveButton = $("#save-file");
let alertBar = $("#alert");
let createFileView = $("#create-file-view");
let quickSaveButton = $("#save-file-button");
let fileNameInput = $("#file-name-box");
let cancelButton = $("#cancel-file-edit");
let timeOutId=undefined;

var activeFile ="";

var simplemde = new SimpleMDE({ element: document.getElementById("text-area") });
var headerTitle = $("#file-name");
 
electron.ipcRenderer.on('new-file', (event, arg) => {
  // Get the current Vue instance (i.e. which component/route is currently active)
   var filename = openSaveDialog("");
   saveFile(filename);

});

electron.ipcRenderer.on('open-file', (event, arg) => {
    // Get the current Vue instance (i.e. which component/route is currently active)
     var filename = openSelectFileDialog();
     openFile(filename);
  
});

electron.ipcRenderer.on('toogle-recents', (event, arg) => {
    // Get the current Vue instance (i.e. which component/route is currently active)
    $("#wrapper").toggleClass("toggled");
  
});

startUpFunctions();

function startUpFunctions(){
    showCreateView();
}

function openFile(filename){
    setActiveFile(filename);
    setCurrentFileName();
    writeFileToTextArea();
    hideCreateView();
}

function saveFile(filename){
    setActiveFile(filename);
    setCurrentFileName();
    hideCreateView();
    showAlertBar();
}

function selectedFile(filename){
    setActiveFile(filename);
    setCurrentFileName();
    hideCreateView();
}

function cancelFileEdit(){
    setActiveFile(undefined);
    simplemde.value("");
    showCreateView();
}

function showAlertBar(){
    alertBar.show();
    clearTimeout(timeOutId);
    timeOutId = setTimeout(function(){
        alertBar.fadeOut();
    }, 3000);
}

cancelButton.on("click",function(){
    cancelFileEdit();
    return false;
});

saveButton.on("click",function(){
    var fname = "";
    var content=simplemde.value();
    console.log(simplemde.value());
    if(isFileActive()){
        fname = getActiveFile();
    }else{
        fname = openSaveDialog("");
    }
    createFile(content, fname).then(function(){
        console.log("reached");
        saveFile(fname);
    });
    return false;
});


quickSaveButton.on("click",function(){
    var filename = fileNameInput.val();
    if(filename !== "" ){
        var path = openSaveDialog(filename);
        selectedFile(path);
    }
    return false;
});

function openSaveDialog(df){
    var filename= dialog.showSaveDialog(
        { defaultPath: df, properties: ['selectFile', 'multiSelections'] });
    setActiveFile(filename);
    return filename;
}

function openSelectFileDialog(){
   var files = dialog.showOpenDialog(
       { properties: ['openFile'] });
    var filename = files[0];
    return filename;
}

function writeFileToTextArea(){
    var currentFile = getActiveFile();
    if(validateFile(currentFile)){
        var mdData = fs.readFileSync(getActiveFile()).toString();
        simplemde.value(mdData);
    }
}


async function createFile(text, filename){
    if(filename!== undefined && validateFile(filename)){
        fs.writeFile(filename, text, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
            return true;
        }); 
    }
}

function getFileName(fullPath){
    if(fullPath !== undefined){
        return fullPath.replace(/^.*[\\\/]/, '');
    }
}

function setActiveFile(filename){
    activeFile = filename;
}

function isFileActive(){
    if(activeFile=== undefined || activeFile ===""){
        return false;
    }
    return true;
}

function getActiveFile(){
    return activeFile;
}

function setCurrentFileName(){
    var filename = getActiveFile();
    headerTitle.text(getFileName(filename));
}

function successMessage(msg){
    var myNotification = new Notify('Yo dawg!', {
        body: 'This is an awesome notification',
    });
    myNotification.show();
}

function failureMessage(){
    jQuery.notify("Hello World");
}

function hideCreateView(){
    createFileView.hide();
    headerTitle.show();
}

function showCreateView(){
    createFileView.show();
    headerTitle.hide();
}

function validateFile(filename){
    var ext = path.extname(filename);
    if(ext === ".md"){
        return true;
    }
    return false;
}


});