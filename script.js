const button = document.getElementById("button")
const undoButton = document.getElementById("undo-button")
const redoButton = document.getElementById("redo-button")

const inputNumber = document.getElementById("inputNumber")
const inputColor = document.getElementById("inputColor")
const inputFont = document.getElementById("inputFont")

const mainText = document.getElementById("main-text")
let isDragging = false;

let undoArray = []
let redoArray = []

mainText.addEventListener('mousedown', (e) => {
  mainText.style.position = "absolute"
  isDragging = true;
  mainText.style.cursor = 'grabbing'
});

let previousTextValue = mainText.textContent
let previousInputNumberValue = inputNumber.value
let previousInputFontValue = inputFont.value
let previousInputColorValue = inputColor.value

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const leftContainer = document.querySelector('.left')
    const containerRect = leftContainer.getBoundingClientRect()

    const posX = e.clientX - containerRect.left - mainText.clientWidth / 2
    const posY = e.clientY - containerRect.top - mainText.clientHeight / 2

    // Ensure the text stays within the container boundaries
    const maxX = containerRect.width - mainText.clientWidth
    const maxY = containerRect.height - mainText.clientHeight

    const finalX = Math.min(Math.max(posX, 0), maxX)
    const finalY = Math.min(Math.max(posY, 0), maxY)

    mainText.style.left = finalX + 'px'
    mainText.style.top = finalY + 'px'
  }
})

document.addEventListener('mouseup', () => {
  isDragging = false;
  mainText.style.cursor = 'grab';
});

const addUndo = () => {
    undoArray.push({
        "value": mainText.textContent,
        "color": inputColor.value,
        "fontSize": inputNumber.value,
        "fontFamily": inputFont.value,
    })
}



inputFont.addEventListener("change", (e) => {
    undoArray.push({
        "value": previousTextValue,
        "color": previousInputColorValue,
        "fontSize": previousInputNumberValue,
        "fontFamily": previousInputFontValue,
    })
    mainText.style.fontFamily = e.target.value
    previousInputFontValue = e.target.value
    
})

inputColor.addEventListener("input", (e) => {
    
    mainText.style.color = e.target.value
    
})

inputColor.addEventListener("change", (e) => {
    undoArray.push({
        "value": previousTextValue,
        "color": previousInputColorValue,
        "fontSize": previousInputNumberValue,
        "fontFamily": previousInputFontValue,
    })
    previousInputColorValue = e.target.value
    
})

inputNumber.addEventListener("input", (e) => {
    undoArray.push({
        "value": previousTextValue,
        "color": previousInputColorValue,
        "fontSize": previousInputNumberValue,
        "fontFamily": previousInputFontValue,
    })
    mainText.style.fontSize = e.target.value + 'px'
    previousInputNumberValue = inputNumber.value
})

button.addEventListener("click", () => {
    const inputText = document.getElementById("text-input").value
    if(inputText.trim() == "") {
        console.log("Empty String")
    } else {
        addUndo()
        mainText.innerText = inputText
        previousTextValue = mainText.innerText
        
    }
    
})

undoButton.addEventListener(("click"), () => {
    if(undoArray.length > 0) {

        let previousVal = undoArray[undoArray.length - 1]

        mainText.textContent = previousVal.value
        redoArray.push({
            "value": previousTextValue,
            "color": previousInputColorValue,
            "fontSize": previousInputNumberValue,
            "fontFamily": previousInputFontValue,
        })

        inputNumber.value = previousVal.fontSize
        inputColor.value = previousVal.color
        inputFont.value = previousVal.fontFamily

        mainText.style.fontSize = previousVal.fontSize + 'px'
        mainText.style.color = previousVal.color
        mainText.style.fontFamily = previousVal.fontFamily

        previousInputColorValue = previousVal.color
        previousInputFontValue = previousVal.fontFamily
        previousInputNumberValue = previousVal.fontSize
        previousTextValue = previousVal.value

        undoArray.pop()

    } 
})

redoButton.addEventListener(("click"), () => {
    if (redoArray.length > 0) {
        let previousVal = redoArray.pop(); // Retrieve the last value from redoArray

        // Save the current state in undoArray
        undoArray.push({
            "value": previousTextValue,
            "color": previousInputColorValue,
            "fontSize": previousInputNumberValue,
            "fontFamily": previousInputFontValue,
        });

        // update the font properties according to redoArray last index value
        mainText.style.fontSize = previousVal.fontSize + 'px'
        mainText.style.color = previousVal.color
        mainText.style.fontFamily = previousVal.fontFamily


        // Update the UI with the redo action
        mainText.textContent = previousVal.value;
        inputNumber.value = previousVal.fontSize;
        inputColor.value = previousVal.color;
        inputFont.value = previousVal.fontFamily;

        // update the previousValues
        previousInputColorValue = previousVal.color
        previousInputFontValue = previousVal.fontFamily
        previousInputNumberValue = previousVal.fontSize
        previousTextValue = previousVal.value

    }
})