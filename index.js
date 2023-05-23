let mainButton = document.querySelector('#mainButton');
let mainList = document.querySelector('#mainList');
let mainInput = document.querySelector('#mainInput');

var userInput = '';
mainInput.maxLength = 30;

document.addEventListener('click', deleteLine);

mainButton.addEventListener('click', (event) => {
    userInput = document.getElementById('mainInput').value;
    let newListItem = document.createElement('li');
    newListItem.innerHTML = `${userInput} <button class="deleteLine">Investigated!</button>`;
    mainList.appendChild(newListItem);
});

function deleteLine(event) {
    let element = event.target;
    if (element.className == 'deleteLine') {
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    }
}