let mainButton = document.querySelector('#mainButton');
let mainList = document.querySelector('#mainList');
let completedList = document.querySelector('#completedList');
let mainInput = document.querySelector('#mainInput');
// localStorage.clear();
let storageList = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
let completedStorageList = localStorage.getItem('completedList') ? JSON.parse(localStorage.getItem('completedList')) : [];
var userInput = '';
mainInput.maxLength = 30;

document.addEventListener('click', deleteLine);

storageList.forEach(addActiveLine);
completedStorageList.forEach(addCompletedLine);

mainButton.addEventListener('click', (event) => {
    userInput = document.getElementById('mainInput').value;
    storageList.push(`${userInput} <button class="deleteLine">Investigated!</button>`);
    localStorage.setItem('list', JSON.stringify(storageList));
    addActiveLine(storageList[storageList.length - 1]);
    document.getElementById('mainInput').value = '';
});

function addActiveLine(input) {
    let newListItem = document.createElement('li');
    newListItem.innerHTML = input;
    mainList.appendChild(newListItem);
}

function addCompletedLine(input) {
    let newListItem = document.createElement('li');
    newListItem.innerHTML = input;
    completedList.appendChild(newListItem);
}

function deleteLine(event) {
    let element = event.target;
    if (element.className == 'deleteLine' && element.parentNode.parentNode.className == 'ActiveList') {
        completedStorageList.push(`${element.parentNode.innerHTML}`);
        localStorage.setItem('completedList', JSON.stringify(completedStorageList));
        addCompletedLine(completedStorageList[completedStorageList.length - 1]);
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        storageList.splice(storageList.indexOf(element.parentNode.innerHTML), 1);
        localStorage.setItem('list', JSON.stringify(storageList));
    }

    if (element.className == 'deleteLine' && element.parentNode.parentNode.className == 'CompletedList') {
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        completedStorageList.splice(completedStorageList.indexOf(element.parentNode.innerHTML), 1);
        localStorage.setItem('completedList', JSON.stringify(completedStorageList));
    }
}

