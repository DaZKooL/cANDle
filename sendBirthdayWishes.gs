/**
 * Program will run on daily loop checking the reponse sheet from cANDle sign up form, to see if there are any Birthdays today.
 * If the program finds any ANDis with their birthdays today, it will send them a personilised birthday card to their email.
 */

//This function will run on a daily loop.
function main() {
    // Load the sheet that contains the birthdays.
    var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1fbgWBKx77Dy2uC7pkFw9B_MjIXDuITheYYw6vLsoC5w/edit?usp=sharing");//  Sheet Url
    var sheet = ss.getSheetByName("Form responses 2");
  
  
    //loops through response sheet to collect necessary information.
    for(var i =2 ;i<=sheet.getLastRow(); i++){
  
      var birthday = sheet.getRange(i,2).getValue();
      var email = sheet.getRange(i,18).getValue();
      var name = sheet.getRange(i,19).getValue();
      var consent = sheet.getRange(i,15).getValue();
  
  
      if(!wantBirthdayCard(consent)){
        Logger.log(name+"/"+email+" does not want birthday card");
        continue;
      }
  
      // Check if the person’s birthday is today
      if(isBirthdayToday(birthday)) {
        //If yes, send an email reminder
        if(email){
          Logger.log("Birthday card will be sent to "+name+" through "+email);
          // sendBirthdayEmailMail(name,email);
        }
      }
    }
  }
  
  //check if person wants to be sent birthday card
  function wantBirthdayCard(response){
    return response === "Yes";
  }
  
  // Check if a person’s birthday is today
  function isBirthdayToday(birthday) {
    // If birthday is a string, convert it to date
    if(typeof birthday === "string"){
      birthday = new Date(birthday);
    }
  
    var today = new Date();
    if((today.getDate() === birthday.getDate()) &&
        (today.getMonth() === birthday.getMonth())) {
      return true;
    } else {
      return false;
    }
  }
  
  /**
   * Updates birthday card template and sends email to birthday person.
   * 
   * Send email from the account running the script 
   * 
   * @param {String}  name  Name of birthday person.
   * @param {String}  email  email of birthday person.
   */
  function sendBirthdayEmailMail(name,email){
    //Load birthday card template.
    // TODO: add AND public birthday card template. (currently uses private template)
    var docId = DriveApp.getFileById('1Cg_mPrXCn_12NV_ZtOeI7K49FJnCszU4LchPQT6kw3E').makeCopy('temp').getId();
    var doc = DocumentApp.openById(docId);
    var body = doc.getBody();
    
    // update the temp doc name
    body.replaceText('#name#',name);
  
    // TODO: update the temp doc birthday gif
  
    // save changes before conversion
    doc.saveAndClose();
    var url = "https://docs.google.com/feeds/download/documents/export/Export?id="+docId+"&exportFormat=html";
    var param = {
      method      : "get",
      headers     : {"Authorization": "Bearer " +     ScriptApp.getOAuthToken()}
    };
  
    var htmlBody =     UrlFetchApp.fetch(url,param).getContentText();
    
    // delete temp copy
    var trashed = DriveApp.getFileById(docId).setTrashed(true);
    // send to myself to test
    MailApp.sendEmail(email,'Happy BirthDay '+name,' ' ,{htmlBody : htmlBody});
  }