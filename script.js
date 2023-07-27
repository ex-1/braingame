function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}

// Data
let num 
let difficult = 1 
let lvl = 1
let wrongs = 0

function refresh() {
	let number = document.querySelector(".number")
	let min, max
	if (difficult == 1) {
		min = 10
		max = 99
	}

	if (difficult == 2) {
		min = 100
		max = 999
	}

	if (difficult == 3) {
		min = 1000
		max = 9999
	}

	if (difficult == 4) {
		min = 10000
		max = 99999
	} 

	if (difficult == 5) {
		min = 100000
		max = 999999
	} 

	num = getRandomNumber(min, max)
	number.textContent = num
	setTimeout(() => {
		number.textContent = "*".repeat(difficult + 1)
	}, 250)
}

function process() {
	let input_value = document.querySelector(".input-box input").value
	if (input_value == "") {
		updateData()
		refresh()
	} else if (input_value.length > 0) {
		if (input_value == num) {
			lvl += 1
			document.querySelector(".input-box input").value = ""
			if (lvl >= 5) {
				difficult++
				lvl = 1
				if (difficult == 6) {
					document.querySelector(".win-box").style = "animation: win ease-out 1s forwards;"
					setTimeout(() => {
						lvl = 1
						difficult = 1
						wrongs = 0
						document.querySelector(".win-box").style = "visibility: hidden; height: 0;"
						updateData()
						refresh()
						return
					}, 3000)
				}
			}
		} else {
			wrongs++
			document.querySelector(".input-box input").value = ""
			if (wrongs == 3) {
				document.querySelector(".wrongs").style = "animation: wrongg 1.5s ease-in;"
				setTimeout(() => {
					lvl = 1
					difficult = 1
					wrongs = 0
					document.querySelector(".wrongs").style = ""
					updateData()
					refresh()
					return
				}, 1500)
			}
		}
		updateData()
		refresh()
	} else {
		console.log("ебать ошибка какая то")
	}
}

let game_str = document.querySelector("b#game")

let i = 0 
game__animation = setInterval(() => {
	var text = game_str.textContent.toLowerCase()

	var char = text[i]
	var str = text.replace(char, char.toUpperCase())
	game_str.textContent = str

	i++
	
	if (i >= game_str.textContent.length) {
		i = 0
	}

}, 250);
let app = document.querySelector(".app")

function insertElements(block) {
	let data_box = document.createElement("div")
	data_box.classList.add("data-box")

	let lvl_elem = document.createElement("span")
	lvl_elem.classList.add("lvl")
	let wrong_elem = document.createElement("span")
	wrong_elem.classList.add("wrongs")
	
	data_box.insertAdjacentElement("beforeend", lvl_elem)
	data_box.insertAdjacentElement("beforeend", wrong_elem)


	let num_elem = document.createElement("span")
	num_elem.classList.add("number")
	num_elem.textContent = "**"

	let input_box = document.createElement("div")
	input_box.classList.add("input-box")

	let preinput_elem = document.createElement("span")
	preinput_elem.textContent = "Number is: "
	let input_elem = document.createElement("input")
	input_elem.type = "number"
	input_elem.inputmode = "numeric"
	input_elem.placeholder = "enter nothing to refresh"

	input_box.insertAdjacentElement("beforeend", preinput_elem)
	input_box.insertAdjacentElement("beforeend", input_elem)
	
	let btn_elem = document.createElement("button")
	btn_elem.classList.add("btn")
	btn_elem.textContent = "OK"

	let win_box = document.createElement("div")
	win_box.style = "visibility: hidden; height: 0;"
	win_box.classList.add("win-box")

	let congratulations = document.createElement("span")
	congratulations.classList.add("cng")
	congratulations.textContent = "You Win!"

	win_box.insertAdjacentElement("beforeend", congratulations)

	block.insertAdjacentElement("beforeend", win_box)
	block.insertAdjacentElement("beforeend", data_box)
	block.insertAdjacentElement("beforeend", num_elem)
	block.insertAdjacentElement("beforeend", input_box)
	block.insertAdjacentElement("beforeend", btn_elem)
}

function updateData() {
	document.querySelector(".lvl").textContent = `Level ${difficult} - ${lvl}`
	document.querySelector(".wrongs").textContent = `Wrong ${wrongs}/3`
}

insertElements(app)
updateData()

document.querySelector(".btn").onclick = () => {
	process()
}

let accesskeys = [8,13,48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105]
// 96-105 : 0-9 numpad
// 48-57 : 0-9
// 8 backspace
// 13 enter
document.querySelector(".input-box input").onkeydown = (e) => {
	if (!(accesskeys.includes(e.keyCode))) {
		e.preventDefault()
	} else if (e.keyCode == 13) {
		document.querySelector(".btn").click()
	}
}

document.querySelector(".input-box input").onfocus = () => {
	game_str.textContent = "game"
	clearInterval(game__animation)
}
