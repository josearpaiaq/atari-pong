let game = function(){
    let time = 50;
    let movement = 20;
    let movementBar = 20;
    let width = document.documentElement.clientWidth - movement; 
    let height = document.documentElement.clientHeight - movement; 
    let controlGame;
    let player1;
    let player2;
    let wKey = 87;
    let sKey = 83;
    let upArrowKey = 38;
    let downArrowKey = 40;
    function start() {
        init();
        controlGame = setInterval(play, time);
    }

    function init() {
        ball.style.left = 1;
        ball.state = 1;
        ball.direction = 1; // right 1, left 2
        player1 = new Object();
        player2 = new Object();
        player1.keyPress = false;
        player2.keyPress = false;
        player1.keyCode = null;
        player2.keyCode = null;
    }

    function stop(){
        clearInterval(controlGame);
        document.body.style.background = "#f44"
    }

    function play(){
        moveBall();
        moveBar();
        checkIfLost();
    }

    function checkIfLost(){
        if (ball.offsetLeft >= width){
            stop();
            console.log("Gano el Jugador 1");
        }
        if (ball.offsetLeft < 20){
            stop();
            console.log("Gano el Jugador 2");
        }
    }
    function moveBall() {
        checkStateBall();
        switch(ball.state){
            case 1: // derecha, abajo
                ball.style.left = (ball.offsetLeft + movement) + "px";
                ball.style.top = (ball.offsetTop + movement) + "px";
                break;
            case 2: // derecha, arriba
                ball.style.right = (ball.offsetRight + movement) + "px";
                ball.style.top = (ball.offsetTop - movement) + "px";
                break;
            case 3: // izquierda, abajo
                ball.style.left = (ball.offsetLeft - movement) + "px";
                ball.style.top = (ball.offsetTop + movement) + "px";
                break;
            case 4: // izquierda, abajo
                ball.style.left = (ball.offsetLeft - movement) + "px";
                ball.style.top = (ball.offsetTop - movement) + "px";
                break;
            default:
                break;
        }
    }

    function checkStateBall(){
        if (collidePlayer2()){
            ball.direction = 2;
            if (ball.state == 1 ) ball.state = 3;
            if (ball.state == 2 ) ball.state = 4;
        } else if (collidePlayer1()){
            ball.direction = 1;
            if (ball.state == 3 ) ball.state = 1;
            if (ball.state == 4 ) ball.state = 2;
        }
        if (ball.direction === 1){
            if (ball.offsetTop >= height) ball.state = 2;
            else if (ball.offsetTop <= 0) ball.state = 1;
        }else {
            if (ball.offsetTop >= height) ball.state = 4;
            else if (ball.offsetTop <= 0) ball.state = 3;
        }     
    }

    function collidePlayer1(){
        if (ball.offsetLeft < (bar1.clientWidth)  &&
            ball.offsetTop >= bar1.offsetTop &&
            ball.offsetTop <= (bar1.offsetTop + bar1.clientHeight)) {
                return true;
            }
        return false;
    }
    function collidePlayer2(){
        if (ball.offsetLeft >= (width - bar2.clientWidth)  &&
            ball.offsetTop >= bar2.offsetTop &&
            ball.offsetTop <= (bar2.offsetTop + bar2.clientHeight)) {
                return true;
            }
        return false;
    }

    function moveBar(){
        if (player1.keyPress){
            if (player1.keyCode == sKey &&  ((bar1.offsetTop + bar1.clientHeight) < height)){
                bar1.style.top = (bar1.offsetTop + movementBar) +"px"
            }
            if (player1.keyCode == wKey && bar1.offsetTop > 10){
                bar1.style.top = (bar1.offsetTop - movementBar) +"px"
            }
        }
        if (player2.keyPress){
            if (player2.keyCode == downArrowKey && (bar2.offsetTop + bar2.clientHeight) < height){
                bar2.style.top = (bar2.offsetTop + movementBar) +"px"
            }
            if (player2.keyCode == upArrowKey && bar2.offsetTop > 10){
                bar2.style.top = (bar2.offsetTop - movementBar) +"px"
            }
        }
    }

    document.onkeydown = function(e) {
        e = e || window.event;
        /* console.log(e.keyCode); */
        switch(e.keyCode){
            case wKey: // W
            case sKey: // S
                player1.keyCode = e.keyCode;
                player1.keyPress = true;
            break;
            case upArrowKey: // flechaArriba 
            case downArrowKey: // flechaAbajo
                player2.keyCode = e.keyCode;
                player2.keyPress = true;
            break;
        }
    }
    document.onkeyup = function(e) {
        if(e.keyCode == wKey || e.keyCode == sKey){
            player1.keyPress = false;
        }
        if(e.keyCode == upArrowKey || e.keyCode == downArrowKey){
            player2.keyPress = false;
        }
    }

    start();
}();
