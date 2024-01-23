
let playBtn = document.getElementById('play-btn');
let progress = document.getElementById('progress');
let songList = document.getElementById('song-list');
let forward=document.getElementById('forward');
let backward=document.getElementById('backward');
let shuffle=document.getElementById('shuffle');
let increase=document.getElementById('increase');
let decrease=document.getElementById('decrease');
let muted=document.getElementById('muted');

let songs = [
    {
        name:'song1',
        id:1,
    },
    {
        name:'song2',
        id:2
    },
    {
        name:'song3',
        id:3
    },
    {
        name:'song4',
        id:4
    }
]

let currentId=1;

let audio = new Audio('./assets/song1.mp3');
audio.volume=0.5;
// show the song list in the UI

for(let song of songs){
    let li = document.createElement('li');
    li.innerText = song.name;
    li.setAttribute('id' , song.id);
    li.classList.add('song-item');
    songList.append(li);
}


// play btn ka icon badlo and gaana chalao

playBtn.addEventListener('click' , ()=>{
    audio.paused ? audio.play() : audio.pause();
    if(playBtn.children[0].classList.contains('fa-play')){
        playBtn.children[0].classList.remove('fa-play')
        playBtn.children[0].classList.add('fa-pause')
    }
    else{
        playBtn.children[0].classList.remove('fa-pause')
        playBtn.children[0].classList.add('fa-play')
    }
})

//  current time ke hisaab se range chale

audio.addEventListener('timeupdate' , function(){
    let currentProgress = audio.currentTime * 100 / audio.duration;
    progress.value = currentProgress;
})


// drag krne se gaana chale
progress.addEventListener('change' , function(){
    let updatedTime = audio.duration * progress.value / 100;
    audio.currentTime = updatedTime;
})

// btn dabao gaala chalao pratyogita(contest)

songList.addEventListener('click' , function(event){
    let songId = event.target.getAttribute('id');
    currentId=songId;
    audio.src = `./assets/song${songId}.mp3`;
    audio.currentTime = 0;
    audio.play();
    playBtn.children[0].classList.add('fa-pause');
    playBtn.children[0].classList.remove('fa-play');
})

forward.addEventListener('click',(event)=>{
    currentId=(currentId%4)+1;
    audio.src = `./assets/song${currentId}.mp3`;
    audio.currentTime = 0;
    audio.play();
    playBtn.children[0].classList.add('fa-pause');
    playBtn.children[0].classList.remove('fa-play');
});

backward.addEventListener('click',()=>{
    console.log("backward");
    currentId-=1;
    if(currentId==0)
    {
        currentId=4;
    }
    console.log(currentId);
    audio.src = `./assets/song${currentId}.mp3`;
    audio.currentTime = 0;
    audio.play();
    playBtn.children[0].classList.add('fa-pause');
    playBtn.children[0].classList.remove('fa-play');
});

shuffle.addEventListener('click',()=>{
    console.log("shuffle");
    let random=Math.floor(Math.random()*10 +1)%4 +1;
    audio.src = `./assets/song${random}.mp3`;
    audio.currentTime = 0;
    audio.play();
    playBtn.children[0].classList.add('fa-pause');
    playBtn.children[0].classList.remove('fa-play');
    console.log(random);
});

increase.addEventListener('click',()=>{
    console.log("increase");
    if(audio.volume<0.9)
    {
    audio.volume+=.1;
    }else{
        console.log("Volume is full");
    }
    console.log(audio.volume);
});

decrease.addEventListener('click',()=>{
    console.log("decrease");
    if(audio.volume>0.1)
    {
    audio.volume-=.1;
    }else{
        audio.volume=0;
        console.log("Volume is low");
    }
    console.log(audio.volume);
});

muted.addEventListener('click',()=>{
    console.log("decrease");
    audio.volume=0;
    console.log(audio.volume);
});
