function sendLine(lineToken, msg){
  var payload = {'message' :   msg};
  var options ={
    "method"  : "post",
    "payload" : payload,
    "headers" : {"Authorization" : "Bearer "+ lineToken}  
  };
  UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}

function LINENotifyWithFile(lineToken, msg, file){
  var payload = {
    'message' :   msg,
    'imageFile': file
  };
  var options ={
    "method"  : "post",
    "payload" : payload,
    "headers" : {"Authorization" : "Bearer "+ lineToken}
  };
  UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}


function forwardMailNotice(lineToken, mailMsg) {
  var message = "\nเรื่อง : " + mailMsg.getSubject()
    + "\n\nเนื้อหา : " + mailMsg.getBody();

  let atchs = mailMsg.getAttachments();
  if (atchs.length > 0) {
    var contentType = atchs[0].getContentType();

    if (contentType == "image/jpeg" || contentType == "image/png") {
      
      file = atchs[0].getAs(contentType);
      LINENotifyWithFile(lineToken, message, file);
    } else {
      sendLine(lineToken, message);
    }
  } else {
    sendLine(lineToken, message);
  }
}

function forward(lineToken, mailConds) {
  var myThreads = GmailApp.search(mailConds);

  for(var i=0; i<myThreads.length; i++){
    var myMsgs = GmailApp.getMessagesForThread(myThreads[i]);

    for (var j=0; j<myMsgs.length; j++) {
      forwardMailNotice(lineToken, myMsgs[j]);
    }

    myThreads[i].markRead();
  }
}


function main() {
  var lineToken = "xxxxxxxxxxxxxxT91qePsFiHZxse7Ds3xfzt"; 
  var mailConds = ('from:chaxxxxi@gmail.com is:unread');

  forward(lineToken, mailConds);
}
