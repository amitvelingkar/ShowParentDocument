function onOpen() {
  // Add a menu with some items, some separators, and a sub-menu.
  SpreadsheetApp.getUi().createAddonMenu()
      .addItem('Show Parent Folders', 'listParentFolders')
      .addToUi();
}

function listParentFolders() {

  var docId = SpreadsheetApp.getActiveSpreadsheet().getId();
  var file = DriveApp.getFileById(docId);
  var folders = file.getParents();
  
  // just go to the next folder
  var html = "<div style='font-size: small'>";
  if (folders && folders.hasNext()) {
    while (folders.hasNext()) {
      var folder = folders.next();
      html += '<div><a href="'+folder.getUrl()+'">'+folder.getName()+'<div>';      
    }
  } else {
    html += "<p>No parent folder set.</p>";
  }
  html+= "</div>";
  
  var htmlOutput = HtmlService
      .createHtmlOutput(html)
      .setWidth(250);
 
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Parent Folders');
}
