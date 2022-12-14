const colors = ["#FFFF66", "#FFCC33", "#CC9966", "#FF6600", "#FF3300", "#FF0066", "#FF66FF", "#6600CC", "#00CCFF", "#33FFCC", "#00FF00"]
const startBtn = document.querySelector("#start")
const screens = document.querySelectorAll(".screen")
const timeList = document.querySelector("#time-list")
const timeEl = document.querySelector("#time")
const board = document.querySelector("#board")
let time = 0
let score = 0

startBtn.addEventListener("click", (event) => {
    event.preventDefault()
    screens[0].classList.add("up")

})

board.addEventListener("click", (event) => {
    if (event.target.classList.contains("circle")) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

timeList.addEventListener("click", (event) => {
    if (event.target.classList.contains("time-btn")) {
        time = parseInt(event.target.getAttribute("data-time"))
        screens[1].classList.add("up")
        startGame()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add("hide")
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement("div")
    const size = getRandomCircleRate(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomCircleRate(0, width - size)
    const y = getRandomCircleRate(0, height - size)

    circle.classList.add("circle")
    circle.style.backgroundColor = getRandomColor()
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

function getRandomCircleRate(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}