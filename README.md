# 🎮 Rock, Paper, Scissors Game — Frontend Mentor Challenge

This is my take on the [Rock, Paper, Scissors challenge](https://www.frontendmentor.io/challenges/rock-paper-scissors-game-pTgwgvgH) from Frontend Mentor. It's a fun project that helped me get more hands-on experience with layout techniques, JS logic, and a bit of UI polish.

---

## 🧠 Overview

### 💡 The Challenge

The goal was to build an interactive game where:

* The layout adapts nicely to different screen sizes
* You can play Rock, Paper, Scissors against a computer opponent
* Your score is saved even if you refresh the page (localStorage)
* **Bonus**: I extended the game to support *Rock, Paper, Scissors, Lizard, Gun* — because why not?

---

### 📸 Screenshot

![Game Screenshot](/assets/images/screenshot.png)

---

### 🔗 Links

* 📂 [Solution](https://www.frontendmentor.io/solutions/rock-paper-scissors-solution-using-js-oop-IgHTwXdbhx)
* 🚀 [Live Demo](https://rpsgame-neon.vercel.app)

---

## 🛠️ What I Used

* Semantic **HTML5**
* **CSS** custom properties
* **Flexbox** and **Grid**
* Mobile-first approach
* Vanilla **JavaScript** with **OOP**

---

## 🧱 A Bit About OOP

I used **Object-Oriented Programming** to keep my code clean and modular. Instead of writing everything as separate functions, I wrapped all the logic into a single class: `GameControls`.

This class handles:

* DOM element selection (buttons, images, score display, etc.)
* Game logic (random choice, who wins, fight animations)
* UI state updates (score, mode switch, result messages)
* Event listeners (clicking tools, rules modal, etc.)

### 🔧 Why OOP?

* Keeps related code grouped and easy to maintain
* Avoids repeating logic everywhere
* Makes switching between game modes smooth
* Easier to debug and expand (like adding Lizard/Gun mode)

### 💻 Quick Example

```js
class GameControls {
    constructor(mode) {
        this.mode = mode;
        this.score = 0;
        // setup UI references and event listeners
    }

    fight(playerChoice) {
        // handles picking, enemy choice, animation, and result
    }

    result(player, enemy) {
        // checks who wins and updates the UI and score
    }

    chooseTool() {
        // handles user clicks on icons
    }

    // ... other methods
}
```

### 🚀 Bonus

Switching from Rock/Paper/Scissors to the extended version (with Lizard and Gun) only needed a few extra rules inside the same class — no rewrite needed. That’s the power of OOP.
