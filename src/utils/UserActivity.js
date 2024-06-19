import io from 'socket.io-client';
import { SOCKET_URL } from '../redux/helper/urlHelper';
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';


var socket = io(SOCKET_URL);

// var socket = io(SOCKET_URL);
const calUserActivity = (pagename, time_on_page) => {

    const token = Cookies.get('account_token');
    const decoded = jwt_decode(token);
    console.log("decoded",decoded);
    let userId = decoded?._doc?.userId?._id
    let organizationId = decoded?._doc.organizationId?._id
    const date = new Date();
    const current_Date = date.toString().slice(4, 15);
    var time = time_on_page.split(':');
    const hours = Number(time[0]),
        min = Number(time[1]),
        sec = Number(time[2]);
    const data = {
        VisitedDate: current_Date,
        
            userId,
            organizationId,
            VisitedPages: [
                {
                    pagename: pagename,
                    appId:7,
                    visitedtime: { hours: hours, min: min, sec: sec },
                },
            ],
    
    };
    socket.emit('update_status', data);
};

function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    return hrs + ':' + mins + ':' + secs;
}

const findTime = pagename => {
    var time_end = new Date();
    var time_start = new Date(localStorage.getItem('log'));

    const value_start = time_start.toString().slice(16, 24).split(':');

    const value_end = time_end.toString().slice(16, 24).split(':');
    time_start.setHours(value_start[0], value_start[1], value_start[2], 0);
    time_end.setHours(value_end[0], value_end[1], value_end[2], 0);
    let cal = time_end - time_start; // millisecond
    const result = msToTime(cal);
    calUserActivity(pagename, result);
};
export default findTime;
