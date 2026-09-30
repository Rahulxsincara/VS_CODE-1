function showTime() {

    let time = new Date();

    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    let ampm="AM";
    if(hours>=12){
        ampm="PM"
    }

    if (hours > 12) {
        hours =  hours-12;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    document.getElementById("clock").innerHTML =
        hours + ":" + minutes + ":" + seconds +" "+ ampm;
}

setInterval(showTime, 1000);

showTime();