const image = document.querySelector('img');
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration')
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');

// Music
const songs = [
    {
        name: 'Right-now',
        displayName: 'Right now',
        artist: 'Akon'
    },
    {
        name: "Don't-Give-Up-On-Me",
        displayName: "Don't Give Up On Me",
        artist: 'Andy Grammer'
    },
    {
        name: 'Run-Away-with-Me',
        displayName: 'Run Away with Me CARLY',
        artist: 'RAE JEPSEN'
    },
    {
        name: 'Turn-Up-the-Radio',
        displayName: 'Turn Up the Radio',
        artist: 'Autograph'
    },
    {
        name: 'Hey-Soul-Sister',
        displayName: 'Hey Soul Sister',
        artist: 'Train'
    },
    {
        name: 'Gone-Gone-Gone',
        displayName: 'Gone, Gone, Gone',
        artist: 'Phillip Phillips'
    },
    {
        name: 'Light-years',
        displayName: 'Light years',
        artist: 'The Midnight'
    }
]

// Check if playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play()
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause eventListener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update the DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous song
function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong()
}

// Next Song
function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong()
}

// Update Progressbar and time
function updateProgressBar(e) {
    if(isPlaying) {
        const {duration, currentTime} = e.srcElement;
        // Update the progressbar
        const progressPercentage = (currentTime / duration) * 100;
        progress.style.width = `${progressPercentage}%`;
        // Calculate display for duration
        let durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }
        // Delay switching duration element to avoid flashing of NaN
        if(durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for currentTime
        let currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        // Delay switching current element to avoid flashing of NaN
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}
// Set progressbar 
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width) * duration;
}
// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);

// On load Select first song
loadSong(songs[songIndex]);