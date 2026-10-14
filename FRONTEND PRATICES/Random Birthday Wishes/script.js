let messages = ["Happy birthday to 'PALAK'",
    "Happy birthday to GeeksforGeeks",
    "Happy birthday to Geeks"];

let i = messages.length;
let s = Math.floor(Math.random() * i);

document.getElementById("msg")
    .innerHTML = '" ' + messages[s] + ' "';