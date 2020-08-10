var firebaseConfig = {
    apiKey: "AIzaSyB36iKQNzzZoJrlY4ovNGBt6TghVUnFeaY",
    authDomain: "ilovenotes-dfb57.firebaseapp.com",
    databaseURL: "https://ilovenotes-dfb57.firebaseio.com",
    projectId: "ilovenotes-dfb57",
    storageBucket: "ilovenotes-dfb57.appspot.com",
    messagingSenderId: "49648134517",
    appId: "1:49648134517:web:f854dd8105c658417bcb3c",
    measurementId: "G-P3L8C5DK5V"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Get a reference to the database service
var database = firebase.database();

//CKEditor initialization
let editor;
ClassicEditor
    .create(document.querySelector('#editor'))
    .then(newEditor => {
        editor = newEditor;
    })
    .catch(error => {
        console.error(error);
    });

const plusButton = document.getElementsByClassName('plus-button')[0];
const xButton = document.getElementsByClassName('x-button')[0];
const addButton = document.getElementsByClassName('add-button')[0];

plusButton.addEventListener('click', () => showAndHideModal(true));
xButton.addEventListener('click', () => showAndHideModal(false));
addButton.addEventListener('click', (e) => {
    const titleInpute = document.getElementById('title').value;
    e.preventDefault()
    const editorData = editor.getData();
    addToFirebase(editorData, titleInpute, "piter");
    // console.log(editorData)
})

function showAndHideModal(show) {
    const modalContainer = document.getElementsByClassName('modal-container')[0];
    if (show) {
        modalContainer.classList.add('show');
    } else {
        modalContainer.classList.remove('show');
    }

}

function addNote(note, title) {
    const gridElement = document.getElementsByClassName('notes-grid')[0];
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `<h1>${title}</h1>` + note;
    newDiv.classList.add('notes');
    gridElement.appendChild(newDiv);
}

function addToFirebase(note, title, username) {
    let ref = firebase.database().ref(`users/${username}`)
    ref.push({
        [title]: {
            note: note
        }
    }).then((snap) => {
        const key = snap.key;
        firebase.database().ref(`users/${username}/${key}`).on("value", snapshot => {
            let snapshotTitle = snapshot.val();
            let finalTitle = Object.keys(snapshotTitle)[0]
            let finalNote = snapshot.child(`${title}/note`).val();
            addNote(finalNote, finalTitle);
        })
    })
}