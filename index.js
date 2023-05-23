let mainButton = document.querySelector('#mainButton');
let mainList = document.querySelector('#mainList');
let completedList = document.querySelector('#completedList');
let mainInput = document.querySelector('#mainInput');

let editMode = false;
let editLineIndex;
// localStorage.clear();

let storageList = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
let completedStorageList = localStorage.getItem('completedList') ? JSON.parse(localStorage.getItem('completedList')) : [];
var userInput = '';
mainInput.maxLength = 30;

document.addEventListener('click', doSomething);

storageList.forEach(addActiveLine);
completedStorageList.forEach(addCompletedLine);

mainButton.addEventListener('click', (event) => {
    if(!editMode) {
        userInput = document.getElementById('mainInput').value;
        storageList.push(`${userInput} <button class="deleteLine">Investigated!</button>`);
        localStorage.setItem('list', JSON.stringify(storageList));
        addActiveLine(storageList[storageList.length - 1]);
        document.getElementById('mainInput').value = '';
    }

    if (editMode) {
        storageList[editLineIndex] = `${document.getElementById('mainInput').value} <button class="deleteLine">Investigated!</button>`;
        localStorage.setItem('list', JSON.stringify(storageList));
        editActiveLine(storageList[editLineIndex], editLineIndex);
        editMode = false;
        mainList.children[editLineIndex].style.color = 'rgb(164, 216, 60)';
        document.getElementById('mainInput').value = '';
    }
});

function addActiveLine(input) {
    let newListItem = document.createElement('li');
    newListItem.innerHTML = input;
    newListItem.className = 'listItem';
    mainList.appendChild(newListItem);
}

function editActiveLine(input, index) {
    let newListItem = document.createElement('li');
    newListItem.innerHTML = input;
    newListItem.className = 'listItem';
    mainList.children[index].innerHTML = newListItem.innerHTML;
}

function addCompletedLine(input) {
    let newListItem = document.createElement('li');
    newListItem.innerHTML = input;
    newListItem.className = 'listItem';
    completedList.appendChild(newListItem);
}

function doSomething(event) {
    let element = event.target;
    
    if (element.className == 'deleteLine' && element.parentNode.parentNode.className == 'ActiveList') {
        // deleteLine for ActiveList
        completedStorageList.push(`${element.parentNode.innerHTML}`);
        localStorage.setItem('completedList', JSON.stringify(completedStorageList));
        addCompletedLine(completedStorageList[completedStorageList.length - 1]);
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        storageList.splice(storageList.indexOf(element.parentNode.innerHTML), 1);
        localStorage.setItem('list', JSON.stringify(storageList));
    } else if (element.className == 'deleteLine' && element.parentNode.parentNode.className == 'CompletedList') {
        // deleteLine for CompletedList 
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        completedStorageList.splice(completedStorageList.indexOf(element.parentNode.innerHTML), 1);
        localStorage.setItem('completedList', JSON.stringify(completedStorageList));
    } else if (element.className == 'listItem' && element.parentNode.className == 'ActiveList') {
        // edit the selected list
        document.getElementById('mainInput').value = element.textContent.slice(0, element.textContent.indexOf('Investigated!'));
        editMode = true;
        editLineIndex = storageList.indexOf(element.innerHTML);
        element.style.color = 'red';
    }
}

