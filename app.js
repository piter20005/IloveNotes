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


//Get elements from DOM
const plusButton = document.getElementsByClassName('plus-button')[0];
const xButton = document.getElementsByClassName('x-button')[0];
const addButton = document.getElementsByClassName('add-button')[0];


//Event Listeners
plusButton.addEventListener('click', () => showAndHideModal(true));
xButton.addEventListener('click', () => showAndHideModal(false));
addButton.addEventListener('click', (e) => {
    //Get value from title input in modal
    const titleInpute = document.getElementById('title').value;
    //Prevent from refreshing the page
    e.preventDefault()
    //Get note from CKEditor
    const editorData = editor.getData();
    //Fire up adding to Firebase
    addToFirebase(editorData, titleInpute, "piter");
})


//Shows and hides Modal
function showAndHideModal(show) {
    const modalContainer = document.getElementsByClassName('modal-container')[0];
    if (show) {
        modalContainer.classList.add('show');
    } else {
        modalContainer.classList.remove('show');
    }

}

//Is fired up from addToFirebase, adds note and title from Firebase to the grid element on the site
function addNote(note, title) {
    const gridElement = document.getElementsByClassName('notes-grid')[0];
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `<h1>${title}</h1>` + note;
    newDiv.classList.add('notes');
    gridElement.appendChild(newDiv);
}

//Takes parameters and creates new object in database
function addToFirebase(note, title, username) {
    // Gets reference to the database 
    let ref = firebase.database().ref(`users/${username}`)
    // Pushes new object to the database with provided title and note
    ref.push({
        [title]: {
            note: note
        }
        //Gets the key of new object and takes from it title and note and then fires up addNote with parameters
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