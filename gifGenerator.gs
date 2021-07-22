// Gif generator 

const getGif = (search) => {
  const apiKey = "sPARyyI3jEyKxdafp8e1AbTXIhUrD1xV";
  // const search = "wave"; //Search term from form
  const url = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&limit=1&q=" + search;

  const response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
  const jsonData = JSON.parse(response);

  // const random = Math.floor(Math.random() * 11);

  const imageId = jsonData.data[0].id;

  // const doc = DocumentApp.openById(docId);
  // const body = doc.getBody();

  const gif = UrlFetchApp.fetch("https://media3.giphy.com/media/" + imageId + "/giphy.gif").getBlob();
  return gif

  // body.appendImage(gif);
}