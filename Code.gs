function wtHours() {
    const USER_AGENT = "<email of the user/app that's accessing the Toggl API";
    const YOUR_EMAIL = "<email to send reports to>";
    const WORKSPACE_ID = "<workspace ID from Toggl>";
    const PROJECT_ID = "<project ID(s) from Toggl>";
    const API_KEY = "<API key from Toggl>";
    
    // Only include the previous week (see note below)
    var until = new Date();
    until.setDate(until.getDate() - 1);
    var since = new Date();
    since.setDate(since.getDate() - 7);
    
    // ***This converts to UTC time.  Your date range may be off if you run the script at a time where UTC time is a day ahead/behind of where you are.
    until = until.toISOString().substring(0, 10);
    since = since.toISOString().substring(0, 10);

    const API_URL = "https://toggl.com/reports/api/v2/details?order_field=date&until=" + until + "&since=" + since + "&user_agent=" + USER_AGENT + "&workspace_id=" + WORKSPACE_ID + "&project_ids=" + PROJECT_ID;

    const response = UrlFetchApp.fetch(API_URL, {
      contentType: "application/json",
      headers: {
        "Authorization" : "Basic " + Utilities.base64Encode(API_KEY + ":" + "api_token")
      }
    })
   
    const parsed = JSON.parse(response.getContentText()).data;
    
    var outputArr = [];
    var currentDay = -1;
    for (var i = parsed.length - 1; i >= 0; i--) {
      var day = new Date(parsed[i].start).getDay();
      
      if (day !== currentDay) {
        currentDay = day;
        outputArr.push("<strong>" + parsed[i].start.substring(0,10) + ":</strong>");
      }
      var description = "";
      if (parsed[i].description.trim().length) {
        description = " (" + parsed[i].description.trim() + ")";
      }
      outputArr.push(_prettyTime(parsed[i].start) + "-" + _prettyTime(parsed[i].end) + description);
    }
    
    MailApp.sendEmail(YOUR_EMAIL, "Last Week's Hours", "", {
      htmlBody: outputArr.join("<br />")
    });
}

function _calcHours(dateObj) {
  var hours = dateObj.getHours();
  var amPm = "AM";
  if (hours > 12) {
    hours -= 12;
    amPm = "PM";
  } else if (hours === 12) {
    amPm = "PM";
  }
  
  return {
    hours: hours,
    amPm: amPm
  };
}

function _prettyTime(dateObj) {
  dateObj = new Date(dateObj);
  const timeInfo = _calcHours(dateObj);
  const minutes = ("0" + dateObj.getMinutes()).slice(-2);
  
  return timeInfo.hours + ":" + minutes + " " + timeInfo.amPm;
}
