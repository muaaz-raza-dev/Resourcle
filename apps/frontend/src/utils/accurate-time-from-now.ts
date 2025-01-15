import moment from "moment";

export function accurateFromNow(date:string|Date) {
    const now = moment();
    const diffInSeconds = now.diff(moment(date), 'seconds'); // Get difference in seconds
    const diffInMinutes = now.diff(moment(date), 'minutes');
    const diffInHours = now.diff(moment(date), 'hours');
    const diffInDays = now.diff(moment(date), 'days');

    if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
    } else if (diffInDays < 30) {
        return `${diffInDays} days ago`;
    } else {
        return moment(date).fromNow(); // Example format for older dates
    }
}
