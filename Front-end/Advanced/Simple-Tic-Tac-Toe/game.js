function playGame() {
    var player, computer;
    var tokens = document.getElementsByClassName("token");
    
    tokens[0].addEventListener("click", function() {
        player = "X";
        computer = "O";

        document.getElementById("token-select").setAttribute("class", "hide");
        document.getElementById("game").setAttribute("class", "");

        addEventToCells(player, computer);
    });

    tokens[1].addEventListener("click", function() {
        player = "O";
        computer = "X";

        document.getElementById("token-select").setAttribute("class", "hide");
        document.getElementById("game").setAttribute("class", "");

        addEventToCells(player, computer);
    });
}

playGame();

function addEventToCells(player, computer) {
    var cells = document.getElementsByClassName("cell");
    for(var i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", function() {
            setTokenToCell(this, player, cellCombinations);
            this.style.pointerEvents = "none";
            playComputersMove(computer, player, cellCombinations); 
        });
    }
}

var cellCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9],
                        [1, 4, 7], [2, 5, 8], [3, 6, 9],
                        [1, 5, 9], [3, 5, 7]];
                        
function setTokenToCell(cellClicked, user, cellComb) {
    cellClicked.innerHTML = user;

    var cellSelected = parseInt(cellClicked.getAttribute("class").match(/\d/g)[0]);
    for(var i = 0; i < cellComb.length; i++) {
        for(var j = 0; j < cellComb[i].length; j++) {
            if(cellComb[i][j] === cellSelected) {
                cellComb[i][j] = user;
            }
        }
    }
}

function playComputersMove(computer, player) {
    var cells = document.getElementsByClassName("cell");
    var lastCellPlayed = null;

    //Get Combination to win the game for computer
    var computerInstances = 0;
    var winCells = [];
    for(var i = 0; i < cellCombinations.length; i++) {
        if(cellCombinations[i].indexOf(computer) > -1 && cellCombinations[i].indexOf(player) === -1) {
            for(var j = 0; j < cellCombinations[i].length; j++) {
                if(cellCombinations[i][j] === computer) {
                    computerInstances++;
                }
            }

            if(computerInstances === 2) {
                winCells.push(cellCombinations[i]);
            } else {
                computerInstances = 0;
            }
        }
    }
    winCells = winCells.toString().split(",");

    //Get Combination to block player from winning
    var playerInstances = 0;
    var blockedCells = [];
    for(var i = 0; i < cellCombinations.length; i++) {
        if(cellCombinations[i].indexOf(player) > -1 && cellCombinations[i].indexOf(computer) === -1) {
            for(var j = 0; j < cellCombinations[i].length; j++) {
                if(cellCombinations[i][j] === player) {
                    playerInstances++;
                }
            }

            if(playerInstances === 2) {
                blockedCells.push(cellCombinations[i]);
            } else {
                playerInstances = 0;
            }
        }
    }
    blockedCells = blockedCells.toString().split(",");

    //1. Win the game
    if(winCells.length === 3) {
        var numToPlay = 0;
        for(var i in winCells) {
            if(!isNaN(winCells[i])) {
                numToPlay = winCells[i] - 1;
            }
        }

        setTokenToCell(cells[numToPlay], computer, cellCombinations);
        lastCellPlayed = cells[numToPlay];
        cells[numToPlay].style.pointerEvents = "none";
    }

    //2. Block Opponent From Winning
    else if(blockedCells.length === 3) {
        var numToPlay = 0;
        for(var i in blockedCells) {
            if(!isNaN(blockedCells[i])) {
                numToPlay = blockedCells[i] - 1;
            }
        }

        setTokenToCell(cells[numToPlay], computer, cellCombinations);
        lastCellPlayed = cells[numToPlay];
        cells[numToPlay].style.pointerEvents = "none";
    }

    //3. Play Center If Open
    else if(cells[4].innerHTML !== player && cells[4].innerHTML !== computer) {
        setTokenToCell(cells[4], computer, cellCombinations);
        cells[4].style.pointerEvents = "none";
        lastCellPlayed = cells[4];
    }

    //4. Play Opposite Corner
    else if(cells[0].innerHTML === player) {
        if(cells[2].innerHTML !== player && cells[2].innerHTML !== computer) {
            setTokenToCell(cells[2], computer, cellCombinations);
            lastCellPlayed = cells[2];
            cells[2].style.pointerEvents = "none";
        } else if(cells[6].innerHTML !== player && cells[6].innerHTML !== computer) {
            setTokenToCell(cells[6], computer, cellCombinations);
            lastCellPlayed = cells[6];
            cells[6].style.pointerEvents = "none";
        } else if(cells[8].innerHTML !== player && cells[8].innerHTML !== computer) {
            setTokenToCell(cells[8], computer, cellCombinations);
            lastCellPlayed = cells[8];
            cells[8].style.pointerEvents = "none";
        }
    } else if(cells[2].innerHTML === player) {
        if(cells[0].innerHTML !== player && cells[0].innerHTML !== computer) {
            setTokenToCell(cells[0], computer, cellCombinations);
            lastCellPlayed = cells[0];
            cells[0].style.pointerEvents = "none";
        } else if(cells[6].innerHTML !== player && cells[6].innerHTML !== computer) {
            setTokenToCell(cells[6], computer, cellCombinations);
            lastCellPlayed = cells[6];
            cells[6].style.pointerEvents = "none";
        } else if(cells[8].innerHTML !== player && cells[8].innerHTML !== computer) {
            setTokenToCell(cells[8], computer, cellCombinations);
            lastCellPlayed = cells[8];
            cells[8].style.pointerEvents = "none";
        }
    } else if(cells[6].innerHTML === player) {
        if(cells[0].innerHTML !== player && cells[0].innerHTML !== computer) {
            setTokenToCell(cells[0], computer, cellCombinations);
            lastCellPlayed = cells[0];
            cells[0].style.pointerEvents = "none";
        } else if(cells[2].innerHTML !== player && cells[2].innerHTML !== computer) {
            setTokenToCell(cells[2], computer, cellCombinations);
            lastCellPlayed = cells[2];
            cells[2].style.pointerEvents = "none";
        } else if(cells[8].innerHTML !== player && cells[8].innerHTML !== computer) {
            setTokenToCell(cells[8], computer, cellCombinations);
            lastCellPlayed = cells[8];
            cells[8].style.pointerEvents = "none";
        }
    } else if(cells[8].innerHTML === player) {
        if(cells[0].innerHTML !== player && cells[0].innerHTML !== computer) {
            setTokenToCell(cells[0], computer, cellCombinations);
            lastCellPlayed = cells[0];
            cells[0].style.pointerEvents = "none";
        } else if(cells[2].innerHTML !== player && cells[2].innerHTML !== computer) {
            setTokenToCell(cells[2], computer, cellCombinations);
            lastCellPlayed = cells[2];
            cells[2].style.pointerEvents = "none";
        } else if(cells[6].innerHTML !== player && cells[6].innerHTML !== computer) {
            setTokenToCell(cells[6], computer, cellCombinations);
            lastCellPlayed = cells[6];
            cells[6].style.pointerEvents = "none";
        }
    }

    //5. Play an Empty Side/Corner
    else if(cells[0].innerHTML !== player && cells[0].innerHTML !== computer) {
        setTokenToCell(cells[0], computer, cellCombinations);
        lastCellPlayed = cells[0];        
        cells[0].style.pointerEvents = "none";
    } else if(cells[1].innerHTML !== player && cells[1].innerHTML !== computer) {
        setTokenToCell(cells[1], computer, cellCombinations);
        lastCellPlayed = cells[1];   
        cells[1].style.pointerEvents = "none";
    }else if(cells[2].innerHTML !== player && cells[2].innerHTML !== computer) {
        setTokenToCell(cells[2], computer, cellCombinations);
        lastCellPlayed = cells[2];   
        cells[2].style.pointerEvents = "none";
    } else if(cells[3].innerHTML !== player && cells[3].innerHTML !== computer) {
        setTokenToCell(cells[3], computer, cellCombinations);
        lastCellPlayed = cells[3];   
        cells[3].style.pointerEvents = "none";
    } else if(cells[5].innerHTML !== player && cells[5].innerHTML !== computer) {
        setTokenToCell(cells[5], computer, cellCombinations);
        lastCellPlayed = cells[5];   
        cells[5].style.pointerEvents = "none";
    } else if(cells[6].innerHTML !== player && cells[6].innerHTML !== computer) {
        setTokenToCell(cells[6], computer, cellCombinations);
        lastCellPlayed = cells[6];   
        cells[6].style.pointerEvents = "none";
    }else if(cells[7].innerHTML !== player && cells[7].innerHTML !== computer) {
        setTokenToCell(cells[7], computer, cellCombinations);
        lastCellPlayed = cells[7];   
        cells[7].style.pointerEvents = "none";
    }else if(cells[8].innerHTML !== player && cells[8].innerHTML !== computer) {
        setTokenToCell(cells[8], computer, cellCombinations);
        lastCellPlayed = cells[8];   
        cells[8].style.pointerEvents = "none";
    }

    if(checkWinForPlayer(player, cellCombinations)) {
        document.getElementById("winner").innerHTML = "Winner: Player";
        lastCellPlayed.innerHTML = "";
    } else if(checkWinForComputer(computer, cellCombinations)) {
        document.getElementById("winner").innerHTML = "Winner: Computer";
    }
}

//Check Win For Player
function checkWinForPlayer(player, cellComb) {
    var win = false;
    for(var i = 0; i < cellComb.length; i++) {
        win = cellComb[i].every(function(c) {
            return c === player;
        });

        if(win) {
            disableAllCells();
            return win;
        }
    }
}

//Check Win For Computer
function checkWinForComputer(computer, cellComb) {
    var win = false;
    for(var i = 0; i < cellComb.length; i++) {
        win = cellComb[i].every(function(c) {
            return c === computer;
        });

        if(win) {
            disableAllCells();
            return win;
        }
    }
}

//Disable all cells after win
function disableAllCells() {
    var cells = document.getElementsByClassName("cell");

    for(var i = 0; i < cells.length; i++) {
        cells[i].style.pointerEvents = "none";
    }
}