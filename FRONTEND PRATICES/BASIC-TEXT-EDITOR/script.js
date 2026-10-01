

let eo1, eo2, eo3, eo4, eo5, eo6 = 0;
let eo8 = 0;


function editoroption1() {
    if (eo1 === 0) {
        document.getElementById('textarea1').style.fontWeight = "bold";
        eo1 = 1;
    }
    else {
        document.getElementById('textarea1').style.fontWeight = "normal";
        eo1 = 0;
    }
}


function editoroption2() {
    if (eo2 === 0) {
        document.getElementById("textarea1").style.fontStyle = "italic";
        eo2 = 1;
    } else {
        document.getElementById("textarea1").style.fontStyle = "normal";
        eo2 = 0;
    }
}


function editoroption3() {
    if (eo3 === 0) {
        document.getElementById("textarea1").style.textAlign = 'left';
        eo3 = 1;
    } else {
        document.getElementById("textarea1").style.textAlign = 'left';
        eo3 = 0;
    }
}


function editoroption4() {
    document.getElementById("textarea1").style.textAlign = "center";
}
function editoroption5() {
    document.getElementById("textarea1").style.textTransform = "uppercase";
}
function editoroption6() {
    document.getElementById("textarea1").style.textTransform = "lowercase";
}
function editoroption8() {
    if (eo8 === 0) {
        document.getElementById("textarea1").style.textTransform = "capitalize";
        eo8 = 1;
    } else {
        document.getElementById("textarea1").style.textTransform = "lowercase";
        eo8 = 0;
    }

}
function editoroption9() {

    document.getElementById("textarea1").value = "";

}
