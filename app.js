const plusButton = document.getElementsByClassName('plus-button')[0];
const xButton = document.getElementsByClassName('x-button')[0];
const addButton = document.getElementsByClassName('add-note')[0];


plusButton.addEventListener('click', () => showAndHideModal(true));
xButton.addEventListener('click', () => showAndHideModal(false));
addButton.addEventListener('click', addNote);

function showAndHideModal(show) {
    const modalContainer = document.getElementsByClassName('modal-container')[0];
    if (show) {
        modalContainer.classList.add('show');
    } else {
        modalContainer.classList.remove('show');
    }

}

function addNote() {
    console.log('test');
    let inputValue = document.getElementById('test').value;
    const gridElement = document.getElementsByClassName('notes-grid')[0];
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `<p>${inputValue}</p>`;
    newDiv.classList.add('notes');
    gridElement.appendChild(newDiv);
}