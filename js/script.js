document.addEventListener('DOMContentLoaded', function() {
    // Handle splash screen form submission
    document.getElementById('profileForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting in the traditional way

        // Get the user input values
        const username = document.getElementById('username').value;
        const dob = document.getElementById('dobInput').value;
        const profileImage = document.getElementById('profileImage').files[0]; // Get the selected file

        // Create a FileReader to read the image
        const reader = new FileReader();
        reader.onload = function(e) {
            // Store the data in local storage
            localStorage.setItem('username', username);
            localStorage.setItem('profileImage', e.target.result); // Store the image as a data URL
            localStorage.setItem('dob', dob);

            // Hide the splash screen and show the main content
            document.getElementById('splashScreen').style.display = 'none';
            document.getElementById('mainContent').style.display = 'block';

            // Set the profile image and username in the main content
            document.getElementById('profileImg').src = e.target.result;
            document.getElementById('profileName').textContent = username;

            // Calculate and set the life bar
            updateLifeBar(dob);
        };
        reader.readAsDataURL(profileImage); // Read the file as a data URL
    });

    // Function to update the life bar based on date of birth
    function updateLifeBar(dob) {
        const dobDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }
        const lifeExpectancy = 100;
        const lifeLivedPercent = (age / lifeExpectancy) * 100;
        document.getElementById('lifeBar').style.width = lifeLivedPercent + '%';
        document.getElementById('percentageText').textContent = Math.round(lifeLivedPercent) + '%'; // Display percentage
    }

    // Check if user data exists and update main content if available
    if (localStorage.getItem('username') && localStorage.getItem('profileImage') && localStorage.getItem('dob')) {
        document.getElementById('splashScreen').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';

        // Set the profile image and username
        document.getElementById('profileImg').src = localStorage.getItem('profileImage');
        document.getElementById('profileName').textContent = localStorage.getItem('username');

        // Update the life bar with stored date of birth
        updateLifeBar(localStorage.getItem('dob'));
    }

    function updateLifeBar(dob) {
        const dobDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }
        const lifeExpectancy = 100;
        const lifeLivedPercent = (age / lifeExpectancy) * 100;
        const percentageText = document.getElementById('percentageText');
    
        document.getElementById('lifeBar').style.width = lifeLivedPercent + '%';
        percentageText.textContent = Math.round(lifeLivedPercent) + '%';
    
        // Hide the percentage text if the bar is fully filled
        if (lifeLivedPercent >= 100) {
            percentageText.style.display = 'none';
        } else {
            percentageText.style.display = 'block';
        }
    }
    
});


//Quote----------------------------------------
const quotes = [
    "राम नाम मनिदीप धरु जीह देहरीं द्वार। तुलसी भीतर बाहेरहुँ जौ चाहसि उजियार॥",
    "जाके प्रिय न राम बैदेही। तजिये ताहि कोटि बैरी सम, जद्यपि परम सनेही॥",
    "काम क्रोध मद लोभ की जौ लौं मन में खान। तौ लौं पण्डित मूरखौं तुलसी एक समान॥",
    "समरथ को नहिं दोष गुसाईं। रंकहुं राव करहिं कुलहीं मनी॥",
    "हरि के चरन कमल धरो ध्याना। माया मोह तजि लीजे ना॥",
    "पराधीन सपनेहुँ सुख नाहीं।",
    "तुलसी इस संसार में, भांति भांति के लोग। सबसे हौं मिलि चुप रहौं, नहिं कछु बोलौं लोग॥",
    "जिनके रही भावना जैसी, प्रभु मूरत तिन्ह देखी तैसी।",
    "तुलसी मस्तक तब नवै, नदीं सुधा जल होई। संत संग सब पाइए, सत्कर्म परिनाम॥",
    
    "अष्टसिद्धि नौ निधि के दाता। अस बर दीन्ह जानकी माता॥",
    "सियाराम मय सब जग जानी। करउं प्रनाम जोरि जुग पानी॥",
    "प्रेम भगति जल बिनु रघुराई। पावक कठिन सदा रघुराई॥",
    "करुणा करैं जो राखैं देहीं। जीवनि करै सो जानि सनेही॥",
    "रामहि केवल प्रेम पिआरा। जान लेहु जो जानन हारा॥",
    "सुमिरन करहुं राम नाम मंथरा। जेहि सम नहिं तारा तीरथ कर तारा॥",
    "रामचंद्र के चरण तजि, प्रभु कों तजै अकाज। तुलसी वाको रोष करु, जेहि से प्रीति न राम॥",
    "रामहि केवल प्रेम पिआरा। जान लेहु जो जानन हारा॥"
];


function getDailyQuote() {
    const currentDate = new Date();
    const start = new Date(currentDate.getFullYear(), 0, 0);
    const diff = currentDate - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const quoteIndex = dayOfYear % quotes.length;
    return quotes[quoteIndex];
}

document.getElementById('daily-quote').textContent = getDailyQuote();
// logo

import { Application } from '@splinetool/runtime';

const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
app.load('https://prod.spline.design/7QWXu-3eMMQb8fdj/scene.splinecode');


//importing body css
import '../styles/components/body.css';

