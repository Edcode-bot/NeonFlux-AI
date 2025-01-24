let recognition;

// Initialize speech recognition
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false; // Set to true for continuous listening
    recognition.interimResults = false; // Set to true if you want interim results

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('question').value = transcript; // Output the recognized text
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
        console.log('Speech recognition service disconnected');
        // Optionally restart recognition if needed
    };
}

// Handle voice recording and speech recognition on button hold
const recordButton = document.getElementById('recordButton');

recordButton.addEventListener('mousedown', () => {
    recognition.start(); // Start speech recognition
    recordButton.classList.add('recording');
    recordButton.innerHTML = '<i class="fas fa-microphone-slash"></i>'; // Change icon on hold
});

recordButton.addEventListener('mouseup', () => {
    recognition.stop(); // Stop speech recognition
    recordButton.classList.remove('recording');
    recordButton.innerHTML = '<i class="fas fa-microphone"></i>'; // Change back icon
});

recordButton.addEventListener('mouseleave', () => {
    recognition.stop(); // Stop speech recognition if mouse leaves
    recordButton.classList.remove('recording');
    recordButton.innerHTML = '<i class="fas fa-microphone"></i>'; // Change back icon
});

// Handle file input when folder icon is clicked
const fileInput = document.getElementById('fileInput');
const folderIcon = document.querySelector('label[for="fileInput"]');

folderIcon.addEventListener('click', () => {
    fileInput.click(); // Trigger the file input when the folder icon is clicked
});

// Display selected media in the chat bar
fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = ''; // Clear previous content

    Array.from(files).forEach(file => {
        const fileURL = URL.createObjectURL(file);
        let mediaElement;

        if (file.type.startsWith('audio/')) {
            mediaElement = `<audio controls src="${fileURL}"></audio>`;
        } else if (file.type.startsWith('image/')) {
            mediaElement = `<img src="${fileURL}" alt="Uploaded Image" style="max-width: 100%; height: auto;">`;
        } else if (file.type.startsWith('video/')) {
            mediaElement = `<video controls src="${fileURL}" style="max-width: 100%; height: auto;"></video>`;
        }

        responseDiv.innerHTML += mediaElement; // Append media to the chat
    });
});

// Submit question
async function submitQuestion() {
    const question = document.getElementById('question').value;
    const responseDiv = document.getElementById('response');

    responseDiv.innerText = 'Loading...';
    responseDiv.classList.add('loading');
    responseDiv.style.display = 'block';

    const response = await fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question })
    });

    const data = await response.json();
    responseDiv.classList.remove('loading');
    responseDiv.innerText = data.answer || 'Error fetching answer.';
}
