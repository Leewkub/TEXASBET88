var token = ["ใส่ token notify"];
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getActiveSheet();

function getdate(){
  const date = sheet.getRange("A2").getValue();
  const ss_date = Utilities.formatDate(new Date(date), 'Asia/Bangkok', 'dd/MM/yyyy');
  const twodays = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()-2);
  const ink_twodays = Utilities.formatDate(twodays, 'Asia/Bangkok', 'dd/MM/yyyy');
  const today = Utilities.formatDate(new Date(), 'Asia/Bangkok', 'dd/MM/yyyy');

  if(ss_date == ink_twodays){  
  sheet.getRange("A2").setValue(today);
  return true;

  }else{
  return false;
  }  
};
function sendLine(){
  const ink = getdate();
  if(ink == true){
    LineNotify()
  };
}
function LineNotify(){
  const message = "\n"+ sheet.getRange("B2").getValue() + '！\uDBC0\uDC5E ';
  const options = 
      {"method" : "post",
       "payload" : "message=" + message,
       "headers" : {"Authorization" : "Bearer "+ token}
      };

  UrlFetchApp.fetch("https://notify-api.line.me/api/notify",options);
};
