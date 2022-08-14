const LINENOTIFY_TOKEN = 'xxxxxxxx'; 
const WEEKDAY = ["อาทิตย์.", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];

function LineNotify(message) {
    let url = 'https://notify-api.line.me/api/notify';
    let options = {
        'method': 'post',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': `Bearer ${LINENOTIFY_TOKEN}`
        },
        'payload': `message=${message}`
    };
    let response = UrlFetchApp.fetch(url, options);
    return JSON.parse(response.getContentText('UTF-8'));
}
function main_forNotify() {
    try {
        let nowDtime = new Date();
        let dtime = Utilities.formatDate(nowDtime, 'Asia/Bangkok', `(${WEEKDAY[nowDtime.getDay()]})dd/MM`);
        let message = `\nEvent วันนี้!!\n\n🎯 ${dtime} 📢\n`;

        let userMessage = '';
        let calendarList = CalendarApp.getAllCalendars();
        for (let i in calendarList) {
            let calendar = calendarList[i];
            let eventMessage = '';
            let eventList = calendar.getEventsForDay(nowDtime);
            for (let j in eventList) {
                let event = eventList[j];
                eventMessage += `${getEventTime(event.getStartTime())} - ${getEventTime(event.getEndTime())} ${event.getTitle()}\n📟: ${event.getDescription()}`;
            }
            if (0 < eventMessage.length) {
                userMessage += `\n[ ${calendar.getName()} ]\n`;
                userMessage += eventMessage;
            }
        }
        if (0 < userMessage.length) {
            message += userMessage;
        } else {
            message += 'ชิวๆ นะ วันนี้';
        }
        LineNotify(message);

    } catch (e) {
        console.error(e.stack);
    }
}

function getEventTime(str) {
    return Utilities.formatDate(str, 'Asia/Bangkok', 'HH:mm');
}
