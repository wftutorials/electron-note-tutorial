module.exports = function(mainWindow){
    
    const template = [
        {
         label: 'File',
         submenu: [
            {
                label:"New File",
                click () { mainWindow.webContents.send('new-file', 'Hello World!'); }
            },
            {
               label: 'Open File',
               click () { mainWindow.webContents.send('open-file', 'Hello World!'); }
            },
            {
               type: 'separator'
            },
            {
               role: 'close'
            },
         ]
      },
      {
         label: 'Edit',
         submenu: [
            {
               role: 'undo'
            },
            {
               role: 'redo'
            },
            {
               type: 'separator'
            },
            {
               role: 'cut'
            },
            {
               role: 'copy'
            },
            {
               role: 'paste'
            }
         ]
      },
      
      {
         label: 'View',
         submenu: [
            {
                label: 'Clear Recents',
                click () { mainWindow.webContents.send('open-file', 'Hello World!'); }
             },
            {
               role: 'reload'
            },
            {
               role: 'toggledevtools'
            },
            {
               type: 'separator'
            },
            {
                label: 'Toogle Recents',
                click () { mainWindow.webContents.send('toogle-recents', 'Hello World!'); }
            },
            {
               type: 'separator'
            },
            {
               role: 'togglefullscreen'
            }
         ]
      },
      
      {
         role: 'window',
         submenu: [
            {
               role: 'minimize'
            },
            {
               role: 'close'
            }
         ]
      },
      
      {
         role: 'help',
         submenu: [
            {
               label: 'Learn More',
               click () { require('electron').shell.openExternal('https://electronjs.org') }
            }
         ]
      }
    ]

    return template;

}