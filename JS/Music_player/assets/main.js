
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'F8_PLAYER'

const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player') 
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playList = $('.playlist')


const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: 'Lớn rồi',
      singer: 'DSK',
      path: './assets/music/song1.mp3',
      image:'./assets/image/img3.jpg'
    },
    {
      name: 'Điếu thuốc cuối',
      singer: 'DSK',
      path: './assets/music/song2.mp3',
      image: './assets/image/img2.jpg'
    },
    {
      name: 'Chưa bao giờ',
      singer: 'DSK',
      path: './assets/music/song3.mp3',
      image: './assets/image/img1.jpg'
    },
    {
      name: 'Nắng',
      singer: 'DSK',
      path: './assets/music/song4.mp3',
      image: './assets/image/img4.jpg'
    },
    {
      name: 'Mưa',
      singer: 'DSK',
      path: './assets/music/song5.mp3',
      image: './assets/image/img3.jpg'
    },
    {
      name: 'Hậu trường',
      singer: 'DSK',
      path: './assets/music/song6.mp3',
      image: './assets/image/img1.jpg'
    },
    {
      name: 'Hậu trường-1',
      singer: 'DSK',
      path: './assets/music/song6.mp3',
      image: './assets/image/img1.jpg'
    },
    {
      name: 'Hậu trường-2',
      singer: 'DSK',
      path: './assets/music/song6.mp3',
      image: './assets/image/img1.jpg'
    },
    {
      name: 'Hậu trường-2',
      singer: 'DSK',
      path: './assets/music/song6.mp3',
      image: './assets/image/img1.jpg'
    },
    {
      name: 'Hậu trường-3',
      singer: 'DSK',
      path: './assets/music/song6.mp3',
      image: './assets/image/img1.jpg'
    },
    {
      name: 'Hậu trường-4',
      singer: 'DSK',
      path: './assets/music/song6.mp3',
      image: './assets/image/img1.jpg'
    },
    {
      name: 'Hậu trường-5',
      singer: 'DSK',
      path: './assets/music/song6.mp3',
      image: './assets/image/img1.jpg'
    },
    
  ],
  setConfig: function(key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function() {
    const htmls = this.songs.map((song, index) => {
      return `
        <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index = "${index}">
          <div class="thumb"
            style="background-image: url('${song.image}')">
          </div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>
      `
    })
    playList.innerHTML = htmls.join('')
  },
  defineProperties: function() {
    Object.defineProperty(this,'currentSong',{
      get: function() {
        return this.songs[this.currentIndex]
      }
    })
  },
  handleEvents: function() {
    const cdWidth = cd.offsetWidth
    const _this = this

    //Xử lý CD quay, dừng
    const cdThumbAnimate = cdThumb.animate ([
      {transform: 'rotate(360deg)'}
    ], {
      duration: 15000,
      interation: Infinity
    })

    cdThumbAnimate.pause()
    //Thay đổi kích thước CD

    document.onscroll = function() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const newCdWidth = cdWidth - scrollTop
      
      cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
    }

    //Play-pause

    playBtn.onclick = function() {

      if(_this.isPlaying) {
        _this.isPlaying = false;
        audio.pause()
        player.classList.remove('playing')
      } else {
        audio.play()
      }
    }

    //Khi bài hát play

    audio.onplay = function() {
      _this.isPlaying = true
      player.classList.add('playing')
      cdThumbAnimate.play()
    }

    //Khi bài hát pause

    audio.onpause = function() {
      _this.isPlaying =false
      player.classList.remove('playing')
      cdThumbAnimate.pause()
    }

    //Tiến độ bài hát
    audio.ontimeupdate = function() {
      if(audio.duration) {
        progress.value = (audio.currentTime / audio.duration * 100)
      }
    }

    // Xử lý khi tua
    progress.oninput = function(e){
      audio.pause()
      const seekTime = audio.duration / 100 * e.target.value
      audio.currentTime = seekTime
      progress.onchange = function(){
        audio.play()
      }
    }

    // Khi next
    nextBtn.onclick = function() {
      if (_this.isRandom){
      _this.playRandomSong()

      } else {
        _this.nextSong()
      }
      audio.play()
      _this.render()
      _this.scrollToActiveSong()
    }

    // Khi prev
    prevBtn.onclick = function() {
      if (_this.isRandom){
          _this.playRandomSong()
  
      } else {
          _this.prevSong()
      }
      audio.play()
      _this.render()
      _this.scrollToActiveSong()
    }

    //Random song

    randomBtn.onclick = function(e) {
      _this.isRandom = !_this.isRandom
      _this.setConfig('isRandom', _this.isRandom)
      randomBtn.classList.toggle('active', _this.isRandom)
    }

    //Repeat on/off

    repeatBtn.onclick = function() { 
      _this.isRepeat = !_this.isRepeat
      _this.setConfig('isRepeat', _this.isRepeat)
      repeatBtn.classList.toggle('active', _this.isRepeat)
    }

    //Next song khi ended

    audio.onended = function() {
      if(_this.isRepeat) {
        audio.play()
      } else {
        nextBtn.click()
      }
    }

    //Lắng nghe hành vi click vào play list

    playList.onclick = function(e) {
      const songNode = e.target.closest('.song:not(.active)')

      if(songNode || e.target.closest('.opiton')) {
        _this.currentIndex = Number(songNode.dataset.index)
        _this.loadCurrentSong()
        _this.render()
        audio.play()
      }
      if (e.target.closest('.opiton')) {

      }
    }
  },
  loadCurrentSong: function() {
    heading.textContent = this.currentSong.name
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
    audio.src = this.currentSong.path
  },

  loadConfig: function() {
    this.isRandom = this.config.isRandom
    this.isRepeat = this.config.isRepeat
  },
  nextSong: function() {
    this.currentIndex++
    if(this.currentIndex >= this.songs.length) {
      this.currentIndex = 0
    }
    this.loadCurrentSong()
  },
  prevSong: function() {
    this.currentIndex--
    if(this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1
    }
    this.loadCurrentSong()
  },
  playRandomSong: function() {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * this.songs.length)
    } while(newIndex === this.currentIndex)
    this.currentIndex = newIndex
    this.loadCurrentSong()
  },
  scrollToActiveSong: function() {
    setTimeout(() => {
      $('.song.active').scrollIntoView({
        block: 'end',
        behavior: 'smooth'
      })
    }, 300)
  },
  start: function() {
    this.defineProperties()
    this.handleEvents()
    this.loadCurrentSong()
    this.loadConfig()
    this.render()

    repeatBtn.classList.toggle('active', this.isRepeat)
    randomBtn.classList.toggle('active',this.isRandom)
  }
}

app.start();