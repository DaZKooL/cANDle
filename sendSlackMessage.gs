//curl -X POST -H 'Content-type: application/json' --data '{"text":"Hello, World!"}' https://hooks.slack.com/services/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
//https://drive.google.com/uc?id=1J8E_7jAq4z3PApzNBRyncf6WIOa9hl9C
//https://docs.google.com/feeds/download/documents/export/Export?id=" +fileId
//channel id:  C028R17LW83
const fileId = "1J8E_7jAq4z3PApzNBRyncf6WIOa9hl9C"; // File ID of image file
const url = "https://hooks.slack.com/services/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";

//To send slack message to the channel
function sendSlackMessage(name) {
  const res = UrlFetchApp.fetch(url, {
    method: "post",
    payload: JSON.stringify({
      "blocks": 
          [
            {
              "type": "section",
              "block_id": "section567",
              "text": {
                "type": "mrkdwn",
                "text": "Happy Birthday, " + name + "!!!"
              },
                "type": "image",    
              // "image_url": "https://image.freepik.com/free-photo/red-drawing-pin_1156-445.jpg",
                "image_url": "https://drive.google.com/uc?id="+ fileId,
                "alt_text": "Wish image"
              }
          ]
      }),
      muteHttpExceptions: true
  });
}