
const $=document.querySelector.bind(document);
const $$=document.querySelectorAll.bind(document);
const play=$('.fa-play');
const pause=$('.fa-pause');
const nextSongBtn=$('.icon-next');
const prevSongBtn=$('.icon-back');
const audio_control=$('.main-audio')

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
  

    handleEvent: function () {
        const audio_control=$('.main-audio')
        const a=$('.icon-play');
        const imgScroll=$('.a img');
        const imgRotate=$('.a');
        const progress=$('.progress');
        const currentVol=$('.vol');
        const replayBtnOn=$('.icon-reload-on');
       

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
            progress.onclick=function(){
                audio_control.currentTime=progress.value/100*audio_control.duration
                console.log(audio_control.currentTime);
                audio_control.play();  

            }
            
            audio_control.ontimeupdate=function(){
                
                audio_control.volume=currentVol.value/100;
                var currentTime=audio_control.currentTime;
                var time=audio_control.duration;
                var percent=Math.floor(currentTime/time*100);
                progress.value = percent;   
            }
            var i=0;
            replayBtnOn.onclick=function(){

                i++;
                if (i%2==1) {
                    isReplay=true;
                    app.replayAudio();
                    replayBtnOn.classList.add('icon-reload-off');
                }else{
                    isReplay=false;
                    app.replayAudio();
                    replayBtnOn.classList.remove('icon-reload-off');
                }
                
               
            }
            
            
            nextSongBtn.onclick=function(){
                app.nextSong();
                audio_control.play();  
                
            }
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
            this.currentIndex=length-1;
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
 
