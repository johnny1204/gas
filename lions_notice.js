var token = '*******'

function getStartTime() {
  var cal = CalendarApp.getCalendarById("npb_7_%53aitama+%53eibu+%4cions#sports@group.v.calendar.google.com");
  var date = new Date()
  var events = cal.getEventsForDay(date)
  
  return formatDate(events[0].getStartTime())
}

function setTrigger() {
  if(formatDate(new Date()) > getStartTime()){
    doPost()
  }
  //ScriptApp.newTrigger("doPost").timeBased().everyMinutes(5).create();
}

function doPost() {
  var response = UrlFetchApp.fetch("https://pacific-reaches-63357.herokuapp.com/notice/")
  var json = JSON.parse(response.getContentText())
  var result = json["result"]
  if(result) {
    var lions = result["lions"]
    var opponent = result["opponent"]
    var inning = Math.max(lions["inning"], opponent["inning"]).toString() + "回" + ((lions["inning"] == opponent["inning"]) ? "裏" : "表")
    result = "ライオンズ " + lions["total_score"] + "-" + opponent["total_score"] + " 相手チーム"
    Logger.log(inning + inningScore(lions, opponent) + "点\n" + result)
  }
}

function formatDate(dataTime) {
  return Utilities.formatDate(dataTime, 'Asia/Tokyo' , 'yyyy/MM/dd HH:mm:ss')
}

function inningScore(lions, opponent) {
  if(lions["inning"] < opponent["inning"]) {
    return opponent["inning_score"]
  } else {
    return lions["inning_score"]
  }  
}

