//GET ELEMENTS/BUTTONS
function getElement(el) {
      return document.getElementById(el);
}

var power_switch = getElement("simon-front-switch");

var start_btn = getElement("start-btn");
var strict_btn = getElement("strict-btn");

var play_buttons = [getElement("green-btn"), getElement("red-btn"),
                    getElement("yellow-btn"), getElement("blue-btn")];

var counter = getElement("counter").childNodes[1];

//ENABLE OR DISABLE BUTTONS
function disable(btn, disable) {
      if(disable) {
            btn.style.pointerEvents = "none";
      } else {
            btn.style.pointerEvents = "auto";
      }
}

disable(start_btn, true);
disable(strict_btn, true);
disable(play_buttons[0], true);
disable(play_buttons[1], true);
disable(play_buttons[2], true);
disable(play_buttons[3], true);

//CHANGE ON|OFF COLORS
function changeColor(btn, isOn) {
      var colors = {
            "off_colors": {
                    "green": "#005e00",
                    "red": "#870000",
                    "yellow": "#a7a700",
                    "blue": "#00008f"          
            },
  
            "on_colors": {
                    "green": "limegreen",
                    "red": "red",
                    "yellow": "yellow",
                    "blue": "blue"
            }
        }

      var regex = /^(\w)+/g
      var color_btn = regex.exec(btn.getAttribute("id"))[0];

      if(isOn) {
            switch(color_btn) {
                  case "green":
                        btn.style.backgroundColor = colors.on_colors.green;
                        break;
                  case "red":
                        btn.style.backgroundColor = colors.on_colors.red;
                        break;
                  case "yellow":
                        btn.style.backgroundColor = colors.on_colors.yellow;
                        break;
                  case "blue":
                        btn.style.backgroundColor = colors.on_colors.blue;
                        break;
            }
      } else {
            switch(color_btn) {
                  case "green":
                        btn.style.backgroundColor = colors.off_colors.green;
                        break;
                  case "red":
                        btn.style.backgroundColor = colors.off_colors.red;
                        break;
                  case "yellow":
                        btn.style.backgroundColor = colors.off_colors.yellow;
                        break;
                  case "blue":
                        btn.style.backgroundColor = colors.off_colors.blue;
                        break;
            }
      }
}

//PLAY BUTTON SOUND
function playSound(btn) {
      var sounds = document.getElementsByTagName("audio");

      var regex = /^(\w)+/g;
      var sound_button = regex.exec(btn.getAttribute("id"))[0];

      switch(sound_button) {
            case "green":
                  sounds[0].play();
                  break;
            case "red":
                  sounds[1].play();
                  break;
            case "yellow":
                  sounds[2].play();
                  break;
            case "blue":
                  sounds[3].play();
                  break;
      }
}

//GAME LOGIC
var gameOrder = [];
var newOrder = [];
var currentOrder = 0;

var score = 0;

var strict_mode = false;

function addOrder(order) {
      var rand = Math.floor(Math.random() * 4);
      order.push(rand);
      newOrder = order.slice();
}

function notifyOrder(btns, order, curOrder, speed) {
      disable(play_buttons[0], true);
      disable(play_buttons[1], true);
      disable(play_buttons[2], true);
      disable(play_buttons[3], true);

      if(curOrder === order.length) {
            curOrder = 0;

            disable(play_buttons[0], false);
            disable(play_buttons[1], false);
            disable(play_buttons[2], false);
            disable(play_buttons[3], false);

            return;
      }

      var curButton = btns[order[curOrder]];

      changeColor(curButton, true);
      playSound(curButton);

      setTimeout(function() {
            changeColor(curButton, false);
            curOrder++;  
                     
      }, speed);

      setTimeout(function() {
            notifyOrder(btns, order, curOrder, speed); 
      }, speed + 200);
}

function checkOrder(clickIndex) {
      var index = clickIndex;
      
      if(index === newOrder[0]) {
            newOrder.splice(0, 1);
            if(newOrder.length < 1) {
                  score++;
                  
                  if(score === 20) {
                        score = 0;
                        gameOrder = [];
                        counter.innerHTML = "WIN";

                        setTimeout(function() {
                              counter.innerHTML = "00";

                              disable(start_btn, false);
                              disable(strict_btn, false);
                              disable(play_buttons[0], true);
                              disable(play_buttons[1], true);
                              disable(play_buttons[2], true);
                              disable(play_buttons[3], true);
                        }, 5000);
                  } else {
                        if(score < 10) {
                              counter.innerHTML = String("0" + score);
                        } else {
                              counter.innerHTML = String(score);
                        }
      
                        addOrder(gameOrder);
                        notifyOrder(play_buttons, gameOrder, currentOrder, 1000);
                  }
                  
            }
      } else {
            if(!strict_mode) {
                  counter.innerHTML = "NOPE";

                  setTimeout(function() {
                        if(score < 10) {
                              counter.innerHTML = String("0" + score);
                        } else {
                              counter.innerHTML = String(score);
                        }

                        newOrder = gameOrder.slice();
                        notifyOrder(play_buttons, gameOrder, currentOrder, 1000);
                  }, 2000);
                  
            } else {
                  score = 0;
                  counter.innerHTML = "LOSE";

                  setTimeout(function() {
                        counter.innerHTML = "00";
                        gameOrder = [];
                        addOrder(gameOrder);
                        notifyOrder(play_buttons, gameOrder, currentOrder, 1000);
                  }, 3000);
            }
      }
}

//POWER ON INTRO
var intro_interval = 0;
function play_intro(speed) {
      disable(power_switch, true);

      if(intro_interval === (play_buttons.length)) {
            intro_interval = 0;
            counter.innerHTML = "00";
            disable(power_switch, false);
            return;
      }

      var counter_text = ["LETS", "PLAY", "LETS", "PLAY"];
      counter.innerHTML = counter_text[intro_interval];

      changeColor(play_buttons[intro_interval], true);
      playSound(play_buttons[intro_interval]);
      

      setTimeout(function() {
            changeColor(play_buttons[intro_interval], false);
            intro_interval++;
            play_intro(speed);
      }, speed);

}

//POWER ON
function powerOn() {
      play_intro(1200);
      disable(start_btn, false);
      disable(strict_btn, false);
}

//POWER OFF
function powerOff() {
      disable(start_btn, true);
      disable(strict_btn, true);
      disable(play_buttons[0], true);
      disable(play_buttons[1], true);
      disable(play_buttons[2], true);
      disable(play_buttons[3], true);

      score = 0;
      currentOrder = 0;

      gameOrder = [];
      clickOrder = [];

      strict_mode = false;
      counter.innerHTML = "";
}

//PLAY BUTTON CLICK FUNCTIONALITY
function playButtonClick(btn, index) {
      changeColor(btn, true);
      playSound(btn);

      disable(play_buttons[0], true);
      disable(play_buttons[1], true);
      disable(play_buttons[2], true);
      disable(play_buttons[3], true);

      setTimeout(function() {
            changeColor(btn, false);
      }, 300);

      setTimeout(function() {
            checkOrder(index);

            disable(play_buttons[0], false);
            disable(play_buttons[1], false);
            disable(play_buttons[2], false);
            disable(play_buttons[3], false);
      }, 800);
}

//POWER SWITCH EVENT
var power = false;
power_switch.addEventListener("click", function() {
      if(!power) {
            power_switch.style.cssFloat = "left";
            power_switch.style.margin = "2px 0px 0px 4px";

            powerOn();

            power = true;
      } else {
            power_switch.style.cssFloat = "right";
            power_switch.style.margin = "2px 4px 0px 0px";

            powerOff();

            power = false;
      }
});

//START BUTTON EVENT
start_btn.addEventListener("click", function() {
      disable(start_btn, true);
      disable(strict_btn, true);

      addOrder(gameOrder);
      notifyOrder(play_buttons, gameOrder, currentOrder, 1000);
});

//STRICT BUTTON EVENT
strict_btn.addEventListener("click", function() {
      strict_mode = true;

      disable(start_btn, true);
      disable(strict_btn, true);

      addOrder(gameOrder);
      notifyOrder(play_buttons, gameOrder, currentOrder, 1000);
});

//PLAY BUTTONS EVENT
play_buttons[0].addEventListener("click", function() {
      playButtonClick(this, 0);
});

play_buttons[1].addEventListener("click", function() {
      playButtonClick(this, 1);
});

play_buttons[2].addEventListener("click", function() {
      playButtonClick(this, 2);
});

play_buttons[3].addEventListener("click", function() {
      playButtonClick(this, 3);
});