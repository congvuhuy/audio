
const $=document.querySelector.bind(document);
const $$=document.querySelectorAll.bind(document);
const play=$('.fa-play');
const pause=$('.fa-pause');
const nextSongBtn=$('.icon-next');
const prevSongBtn=$('.icon-back');
const audio_control=$('.main-audio')

var isReplay=false;
var isRandom=false;


const app={
    currentIndex: 0,
    songs: [
        {
            name:'Hãy trao cho anh',
            singer:'Sơn Tùng',
            path:'./data/songs/song1.mp3',
            image:'./data/imgs/img1.jpg',
        },
        {
            name:'Chúng ta không thuộc về nhau',
            singer:'Sơn Tùng',
            path:'./data/songs/song2.mp3',
            image:'./data/imgs/img2.jpg',
        },
        {
            name:'Như ngày hôm qua',
            singer:'Sơn Tùng',
            path:'./data/songs/song3.mp3',
            image:'./data/imgs/img3.jpg',
        },
        {
            name:'À lôi',
            singer:'double2T',
            path:'./data/songs/song4.mp3',
            image:'./data/imgs/img4.jpg',
        },
        {
            name:'Nụ hôn bisou',
            singer:'Mikelodic',
            path:'./data/songs/song5.mp3',
            image:'./data/imgs/img5.jpg',
        },
        
    ],
    defineProperties: function () {
        Object.defineProperty(this,"currentSong",{
            get:function(){
                return this.songs[this.currentIndex];
            }
        })
    },
    start: function () {
        this.defineProperties();

        this.render();
        this.renderCurrentSong();

       
        this.handleEvent();
        
    },
  
// sử lý sư kiên
    handleEvent: function () {
        


        const audio_control=$('.main-audio')
        const a=$('.icon-play');
        const imgScroll=$('.a img');
        const imgRotate=$('.a');
        const progress=$('.progress');
        const currentVol=$('.vol');
        const replayBtnOn=$('.icon-reload-on');
        const randomBtn=$('.icon-random');
        const timeSet=$('.time');
        const timeRemaining=$('.timeRemaining')
        const width=200;
        
            document.onscroll=function () {
                const y=document.documentElement.scrollTop;
                newWidth=width-y;           
                imgScroll.style.width=newWidth>0 ? newWidth + 'px': 0;
                imgScroll.style.height=newWidth>0 ? newWidth + 'px': 0;
                imgScroll.style.opacity=newWidth>0 ? newWidth/width : 0;
            } 
            play.onclick = function(){
                
                audio_control.play();

                a.classList.remove('icon-play');
                a.classList.add('icon-pause');
                imgRotate.classList.add('cd-play');
                imgRotate.classList.remove('cd');
               
            }
            pause.onclick=function(){
                audio_control.pause();
                a.classList.remove('icon-pause');
                a.classList.add('icon-play');
                imgRotate.classList.add('cd');
                imgRotate.classList.remove('cd-play');
            }
            progress.onchange=function(e){
                audio_control.currentTime=audio_control.duration/100*e.target.value
            }
            
            audio_control.ontimeupdate=function(){
                
                timeSet.innerHTML=Math.floor(audio_control.currentTime/60)+':'+Math.floor(audio_control.currentTime%60);
                timeRemaining.innerHTML=Math.floor((audio_control.duration-audio_control.currentTime)/60)+':'+Math.floor((audio_control.duration-audio_control.currentTime)%60)
                audio_control.volume=currentVol.value/100;
                var currentTime=audio_control.currentTime;
                var time=audio_control.duration;
                var percent=Math.floor(currentTime/time*100);
                progress.value = percent;   
            }  
            // tw dong next bai khi key thc
            audio_control.onended=function(){
                nextSongBtn.click();
            }
            // replay lai bai hat
            replayBtnOn.onclick=function(){
                isReplay=!isReplay;
                replayBtnOn.classList.toggle('icon-reload-off',isReplay)
                app.replayAudio();
            }
            //random bai hat
            randomBtn.onclick=function(){
                isRandom=!isRandom;
                randomBtn.classList.toggle('icon-random-off',isRandom)
               
            }
            //next bai tiep theo
            nextSongBtn.onclick=function(){
                if(isRandom){
                    app.randomSong();
                    audio_control.play();  

                }
                else{app.nextSong();
                    audio_control.play();  
                }

            }
            //prev bai trc
            prevSongBtn.onclick=function(){
                app.backSong();
                audio_control.play();
            }
            
    },
    replayAudio:function(){
        
        if(isReplay){
            audio_control.loop=true;
        }else{
            audio_control.loop=false;
        }
    },
    randomSong:function () {
        do{
            var random=Math.floor(Math.random()*app.songs.length);
        }while(random===this.currentIndex);
        this.currentIndex=random;
        console.log(this.currentIndex);
        app.renderCurrentSong();
    },
    nextSong: function () {
        this.currentIndex++;
        if(this.currentIndex>=this.songs.length){
            this.currentIndex=0;
        }
        this.renderCurrentSong();
    },
    backSong: function () {
        this.currentIndex--;
        if(this.currentIndex<0){
            this.currentIndex=this.songs.length-1;
        }
        this.renderCurrentSong();
    },
    renderCurrentSong: function(){
        const nameCurrentSong=$('.song_name')
        const imageCurrentSong=$('.a img')
        const audioCurrentSong=$('Audio')

        
        nameCurrentSong.textContent=this.currentSong.name;
        imageCurrentSong.src=this.currentSong.image;
        audioCurrentSong.src=this.currentSong.path;

        
    },
    render: function () {
            var htmls=this.songs.map((song)=>{
                return `<div class="song">
                <div class="img">
                    <img src="${song.image}" alt="song img">
                </div>
                <div class="descreption">
                    <p style="font-size:16px">${song.name}</p>
                    <p style="font-size: 12px; margin: 5px auto; opacity: 0.5;">${song.singer}</p>
                </div>
            </div>`;
            })

        $('.play-list').innerHTML=htmls.join('');
    },
}
app.start();
 
