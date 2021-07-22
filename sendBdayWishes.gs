/**
 * Script will run on daily loop checking the reponse sheet from cANDle sign up form, to see if there are any Birthdays today.
 * If the script finds any ANDis with their birthdays today, it will send them a personilised birthday card to their email.
 */

//This function will run on a daily loop.
const sheetUrl = "https://docs.google.com/spreadsheets/d/1fbgWBKx77Dy2uC7pkFw9B_MjIXDuITheYYw6vLsoC5w/edit?usp=sharing"
const emailTemplateId = "126qdW_D2zQ2H5LXWrNsvhcIq44xqWJpR-jLVjZdmSzw"

function sendBdayWishes() {
    // Load the sheet that contains the birthdays.
    const spreadsheet = SpreadsheetApp.openByUrl(sheetUrl);//  Sheet Url
    const sheet = spreadsheet.getSheetByName("Form responses 2");
  
    let i=2;
    let lastRow = sheet.getLastRow();
    //loops through response sheet to collect necessary information.
    for(i ;i<=lastRow; i++){
  
      let birthday = sheet.getRange(i,2).getValue();
      let email = sheet.getRange(i,18).getValue();
      let name = sheet.getRange(i,19).getValue();
      let consent = sheet.getRange(i,15).getValue();
      let gifCategory = sheet.getRange(i,20).getValue();
      let lineManager = sheet.getRange(i, 21).getValue();
  
      if(!wantBirthdayCard(consent)){
        Logger.log(name+"/"+email+" does not want birthday card");
        continue;
      }
  
    var today = new Date();
    today = today.setDate(today.getDate());
      var targetDate = new Date();
      targetDate = (targetDate.setDate (birthday.getDate()-7));
      console.log (today == targetDate, today,'  ----   ' +targetDate+' ----   '+birthday );
      if (today == targetDate ){
        console.log ('email!!!!!!!!!!!!!!')
        SendEmail(lineManager, "It's " + name + "'s birthday!", "Hey, It is " + name + "'s birthday today! Lets make some plans.");
      
      }

      // Check if the person’s birthday is today
      if(isBirthdayToday(birthday)) {
        //If yes, send an email reminder
        if(email){
          Logger.log("Birthday card will be sent to "+name+" through "+email);
          sendBirthdayEmailMail(name,email,gifCategory);
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
  
    let today = new Date();
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
  function sendBirthdayEmailMail(name,email,gifCategory){
  //Load birthday card template.
  const docId = DriveApp.getFileById(emailTemplateId).makeCopy('temp').getId();
  const doc = DocumentApp.openById(docId);
  const body = doc.getBody();
  
  // update the temp doc name
  body.replaceText('{Name}',name);

  // add gif to temp doc 
  const gif = getGif(gifCategory);
  let foundTag = body.findText('{gif}');
  let tagElement = foundTag.getElement();
  let parent = tagElement.getParent();
  let insertPoint = parent.getParent().getChildIndex(parent);
 
  var image = body.insertImage(insertPoint, gif);

  var styles = {};
  styles[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.CENTER;
  image.getParent().setAttributes(styles);

 
  body.replaceText('{gif}',"");


  // save changes before conversion
  doc.saveAndClose();
  const url = "https://docs.google.com/feeds/download/documents/export/Export?id="+docId+"&exportFormat=html";
  const param = {
    method      : "get",
    headers     : {"Authorization": "Bearer " +     ScriptApp.getOAuthToken()}
  };

  const htmlBody =     UrlFetchApp.fetch(url,param).getContentText();
  
  // console.log(htmlBody);
  // delete temp copy
  let trashed = DriveApp.getFileById(docId).setTrashed(true);
  // // send to myself to test
  // SendEmail(email, `Happy Birthday ${name}`, {htmlBody : htmlBody});
  SendEmail(email, `Happy Birthday ${name}`, htmlBody);
}

function SendEmail(recipient, subject, body) {
  //console.log('Woop', body)
  // MailApp.sendEmail(recipient, subject, body);
  console.log (recipient,'recipient')
  MailApp.sendEmail(recipient, subject, body);
}

function NotifyLineManager()
{
  
}




