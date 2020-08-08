 // Set the configuration for your app
 // TODO: Replace with your project's config object
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
     firebase.database().ref('users/test').set({
         name: inputValue
     })
     gridElement.appendChild(newDiv);
 }