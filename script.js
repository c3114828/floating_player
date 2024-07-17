// script.js
const videoElement = document.getElementById('video');
const pipButton = document.getElementById('pipButton');
const loadVideoButton = document.getElementById('loadVideo');
const videoUrlInput = document.getElementById('videoUrl');
const videoContainer = document.getElementById('videoContainer');

loadVideoButton.onclick = function() {
    const url = videoUrlInput.value;
    const videoId = extractVideoId(url);
    if (videoId) {
        videoElement.src = `https://www.youtube.com/embed/${videoId}`;
        videoContainer.style.display = 'block';
    } else {
        alert('Please enter a valid YouTube URL.');
    }
};

pipButton.onclick = async function() {
    if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
    } else {
        try {
            await videoElement.requestPictureInPicture();
        } catch (error) {
            console.error(error);
        }
    }
};

function extractVideoId(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : null;
}
