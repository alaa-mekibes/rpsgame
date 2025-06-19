class GameControls {
    constructor(mode) {
        this.mode = mode;
        this.score = 0;
        this.fightInProgress = false;
        this.scoreContainer = document.querySelector(".current-score");
        this.logo = document.querySelector(".logo h1 a");
        this.chnageMode = document.querySelector(".change-mode");
        this.iconsMode = document.querySelector(".bg-shape");
        this.iconsImage = document.querySelector(".bg-shape img");
        this.openRules = document.querySelector(".rules-btn");
        this.closeRules = document.querySelector(".close-rules");
        this.mockup = document.querySelector(".action");
        this.fightMenu = document.querySelector(".fight");
        this.myPicked = document.querySelector(".you-picked .icon-fight");
        this.myPickedIcon = document.querySelector(".you-picked .icon-fight img");
        this.enemyPicked = document.querySelector(".enemy-picked .icon-fight");
        this.enemyPickedIcon = document.querySelector(".enemy-picked .icon-fight img");
        this.setScore();
        this.rules();
        this.modeChanger();
        this.chooseTool();
    }

    setScore() {
        this.score = parseInt(localStorage.getItem("score")) || 0;
        this.scoreContainer.textContent = this.score;
    }

    isInMobile() {
        return window.matchMedia("(min-width: 48rem)").matches;
    }

    randomNumber(preRand) {
        const maxTool = this.mode === 1 ? 3 : 5;
        const minTool = 1;

        let rand = {tool: "rock", nbr: preRand};
        do {
            rand.nbr = Math.floor(Math.random() * (maxTool - minTool + 1)) + minTool;
        } while (rand.nbr === preRand);
        switch (rand.nbr) {
            case 1: rand.tool = "rock"; break;
            case 2: rand.tool = "scissors"; break;
            case 3: rand.tool = "paper"; break;
            case 4: rand.tool = "gun"; break;
            case 5: rand.tool = "lizard"; break;
        }
        return rand;
    }

    fight(myTool) {
        this.mockup.classList.add("display-none");
        this.chnageMode.classList.add("display-none");
        this.fightMenu.classList.remove("display-none");

        this.myPicked.classList.add(myTool.id);
        this.myPickedIcon.src = `assets/images/icon-${myTool.id}.svg`;
        this.myPickedIcon.alt = myTool.id;

        let preRand = 1;
        let counter = 1;
        const enemyChoose =  setInterval(() => {
            let enemyTool = this.randomNumber(preRand);
            preRand = enemyTool.nbr;
            this.enemyPicked.classList.remove(this.enemyPicked.classList[2]);
            this.enemyPicked.classList.add(enemyTool.tool);
            this.enemyPickedIcon.src = `assets/images/icon-${enemyTool.tool}.svg`;
            this.enemyPickedIcon.alt = enemyTool.tool;
            counter++;
            if(counter > 3) {
                clearInterval(enemyChoose);
                setTimeout(() => {
                    this.result(myTool.id, enemyTool.tool);
                }, 1000);
            } 
        }, 500);
    }

    whoBeats(myTool, enemyTool) {
        switch (myTool) {
            case "scissors": 
                return (enemyTool === "paper" || enemyTool === "lizard");
            case "paper": 
                return (enemyTool === "rock" || enemyTool === "gun");
            case "rock": 
                return (enemyTool === "scissors" || enemyTool === "lizard");
            case "lizard": 
                return (enemyTool === "paper" || enemyTool === "gun");
            case "gun": 
                return (enemyTool === "rock" || enemyTool === "scissors");
            default:
                return false;
        }
    }

    result(myTool, enemyTool) {
        const myPicked = document.querySelector(".you-picked");
        const enemyPicked = document.querySelector(".enemy-picked");
        const isWin = this.whoBeats(myTool, enemyTool);
        const win = document.querySelectorAll(".winner");
        const result = document.querySelectorAll(".result");
        const youPickedContainer = document.querySelector(".you-picked");
        if(win[0]) {win.forEach(element => {element.remove();});}
        if(result[0]) {result.forEach(element => {element.remove();});}
        const winner = document.createElement("div");
        winner.classList.add("winner");
        const msg = document.createElement("div");
        msg.classList.add("result");
        msg.style.animation = "fade-in .5s ease";
        if(myTool === enemyTool) {
            msg.innerHTML = `<h2>TIE</h2> <button class="again">play again</button>`;
            this.fightMenu.appendChild(msg);
            const againBtn = document.querySelector(".again");
            this.playAgain(againBtn);
        return;
        }
        let resultMSG = "";
        let DefScore = 0;
        (isWin === true ? myPicked.appendChild(winner) : enemyPicked.appendChild(winner));
        (isWin === true ? resultMSG = "WIN" : resultMSG = "lose"); 
        (isWin === true ? DefScore = 1 : DefScore = -1); 

        msg.innerHTML = `<h2>You ${resultMSG}</h2> <button class="again">play again</button>`;
        if(!this.isInMobile()) this.fightMenu.appendChild(msg); else youPickedContainer.after(msg); 
        const currentScore = parseInt(localStorage.getItem("score")) || 0;
        this.score = currentScore + DefScore;
        localStorage.setItem("score", this.score.toString());
        this.setScore();
        const againBtn = document.querySelector(".again");
        this.playAgain(againBtn);
    }

    playAgain(againBtn) {
        const win = document.querySelectorAll(".winner");
        const result = document.querySelectorAll(".result");
        againBtn.addEventListener("click", _ => {
            if(win[0]) {win.forEach(element => {element.remove();});}
            if(result[0]) {result.forEach(element => {element.remove();});}
            this.fightMenu.style.animation = "fade-out .5s ease";
            setTimeout(() => {
            this.fightMenu.style.animation = "fade-in .5s ease";
            this.fightMenu.classList.add("display-none");
            this.myPicked.classList.remove(this.myPicked.classList[2]);
            this.chnageMode.classList.remove("display-none");
            this.mockup.classList.remove("display-none");
            this.fightInProgress = false; 
            }, 499);
        })
    }

    chooseTool() {
        let tools = Array.from(document.querySelectorAll(".tool"));
        if(this.mode === 1) tools = tools.slice(0, 3);
        tools.forEach(tool => {
            tool.addEventListener("click", e => {if(this.fightInProgress) return; this.fightInProgress = true; this.fight(e.currentTarget);})
        });
    }

    modeChanger() {
        this.chnageMode.addEventListener("click", _ => {
            if(this.mode === 1) {
                this.logo.innerHTML = `ROCK<br>SCISSORS<br>PAPER<br>LIZARD<br>GUN`;
                this.logo.classList.remove("original");
                this.logo.classList.add("bonus");
                this.mode = 2;
                this.iconsMode.classList.remove("bg-shape-triangle");
                this.iconsMode.classList.add("bg-shape-pentagon");
                this.iconsImage.src = "assets/images/bg-pentagon.svg";
            } else {
                this.mode = 1;
                this.logo.innerHTML = `ROCK<br>SCISSORS<br>PAPER`;
                this.logo.classList.remove("bonus");
                this.logo.classList.add("original");
                this.iconsMode.classList.remove("bg-shape-pentagon");
                this.iconsMode.classList.add("bg-shape-triangle");
                this.iconsImage.src = "assets/images/bg-triangle.svg";
            }
            this.chooseTool();
            this.rules();
        })
    }

    rules() {
        const dialog = document.querySelector(".dialog_container");
        const rulesOriginal = document.querySelector(".rules-original");
        const rulesbonus = document.querySelector(".rules-bonus");
        if(this.mode === 1) {
            rulesOriginal.classList.remove("display-none");
            rulesbonus.classList.add("display-none");
        } else {
            rulesbonus.classList.remove("display-none");
            rulesOriginal.classList.add("display-none");
        }
        this.openRules.addEventListener("click", _ => {
            dialog.style.animation = "fade-in .5s ease";
            dialog.classList.remove("display-none");
        })
        this.closeRules.addEventListener("click", _ => {
            dialog.style.animation = "fade-out .5s ease";
            setTimeout(() => {
                dialog.classList.add("display-none");
            }, 499);
        })
    }
}

// main
new GameControls(1);

