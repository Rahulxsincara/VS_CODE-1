(function () {
    const clockElement = document.getElementById("digitalClock");
    function updateClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const second = now.getSeconds();

        const hh = hours.toString().padStart(2, '0');
        const mm = minutes.toString().padStart(2, '0');
        const ss = second.toString().padStart(2, '0');


        clockElement.innerHTML = `${hh}<span class="colon">:</span>${mm}<span class="colon">:</span>${ss}`;
    }
    updateClock();

    function tick() {
        updateClock();
        const now = new Date();
        const msUntilNextSecond = 1000 - now.getMilliseconds();
        setTimeout(tick, msUntilNextSecond);
    }




    setTimeout(tick, 1000 - new Date().getMilliseconds());


})();