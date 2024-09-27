// Select all task buttons
const taskButtons = document.querySelectorAll('.task__btn');

// Create the sound object (replace 'click-sound.mp3' with your actual sound file path)
const clickSound = new Audio('sounds/sounds/click-sound.mp3');

// Loop through each button and add a click event listener
taskButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Play the sound when the button is clicked
    clickSound.play();

    // Hide the entire task (the parent <li> element)
    this.parentElement.style.display = 'none'; 
  });
});
