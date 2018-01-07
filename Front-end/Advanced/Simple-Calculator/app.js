var num = "";
var inputed = [];

function writeToScreen(input) {
    var screen = document.getElementById("screen").childNodes[1];

    if(screen.innerHTML.length <= 16) {
        if(screen.innerHTML[0] === "0") {
            screen.innerHTML = "";
        } 
        if(input === "clear") {
            screen.innerHTML = "";
        } else {
            screen.innerHTML += input;
        }
    }
}

function calculate(input) {

    console.log(inputed.join("").length);
    if(inputed.join("").length <= 16) {
        if(!isNaN(parseInt(input))) {
            num += input;
            writeToScreen(input);
    
        } else if(input === "C") {
            num = "";
            inputed = [];
            writeToScreen("clear");
            writeToScreen("0");
    
        } else if(input === "+/-") {
            if(num[0] === "-") {
                var splitted = num.split("");
                splitted.shift();
                num = splitted.join("");
            } else {
                num = "-" + num;
            }
    
        } else if(input === "=") {
            inputed.push(num);
            var total = eval(inputed.join(""));
    
            num = total
            inputed = [num];
            
            writeToScreen("clear");
            writeToScreen(num);
    
        } else {
            inputed.push(num);
            num = "";
            inputed.push(input);
            writeToScreen(input);
        }
    
        console.log(inputed);
    } else {
        if(input === "=") {
            inputed.push(num);
            var total = eval(inputed.join(""));
    
            num = total
            inputed = [num];
            
            writeToScreen("clear");
            writeToScreen(num);
        }
    }
    
}

function addEventToButtons() {
    var buttons = document.getElementsByClassName("btn");
    for(var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function() {
            calculate(this.innerHTML);
        });
    }
}

addEventToButtons();