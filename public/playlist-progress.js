const mainVideo = document.getElementById('main-video');
const playlistItems = document.querySelectorAll('.playlist-item');
const progressBar = document.getElementById('global-progress-bar');
const progressPercentage = document.getElementById('progress-percentage');

const totalVideos = playlistItems.length;
let completedVideos = 0;

// Update the global progress bar
function updateProgress() {
    const progress = (completedVideos / totalVideos) * 100;
    progressBar.style.width = `${progress}%`;
    progressPercentage.textContent = `${Math.round(progress)}% Complete`;
}

// Handle video switching and completion tracking
playlistItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // Handle active class for the playlist items
        playlistItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Change the main video source
        const videoSrc = item.getAttribute('data-video-src');
        mainVideo.src = videoSrc;

        // Check if the video was already marked as completed
        const checkIcon = item.querySelector('span');
        if (!checkIcon.classList.contains('visible')) {
            // If not marked, increment the progress
            completedVideos++;
            checkIcon.classList.remove('hidden');
            checkIcon.classList.add('visible');
        } else {
            // If marked and revisited, decrement the progress
            completedVideos--;
            checkIcon.classList.remove('visible');
            checkIcon.classList.add('hidden');
        }

        // Ensure completedVideos stays within bounds
        completedVideos = Math.max(0, Math.min(totalVideos, completedVideos));
        updateProgress();
    });
});

// Initial progress update
updateProgress();