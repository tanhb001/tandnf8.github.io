const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const searchInputWrapper = $('.search-input-wrapper')
const searchInput = $('.search-input')
const playList = $('.info-song-list')
const searchExtend = $('.search-extend')
const audio = $('#audio')
const randomBtn = $('.random-song')
const repeatBtn = $('.repeat-song')
const nextSong = $('.next-song')
const prevSong = $('.prev-song')
const volBtns = $$('.vol-btn')
const volMute = $('.vol-mute')
const volNotMute = $('.vol-not-mute')
const volSlider = $('.player-vol-slider')
const playedList = $('.recent-list-wrapper')
const playedListBtn = $('.played-list-btn')
const playedListItems = $('.recent-list-items')
const sortBtn = $('.sort-btn')
const sortItems = $('.sort-by')
const sortDefaultBtn = $('.sort-default')
const sortSongsBtn = $('.sort-songs')
const sortSingersBtn = $('.sort-singers')
const sortAlbumsBtn = $('.sort-albums')

let selectedItems = []

const discAround = $('.disc-around')
const animate = discAround.animate([{ transform: 'rotate(360deg)' }], {
    duration: 10000,
    iterations: Infinity,
})
animate.pause()

animateEnd = discAround.animate([{ transform: 'rotate(360deg)' }], {
    duration: 500,
})
animateEnd.pause()

const app = {
    currentId: null,
    isPlaying: false,
    isRepeat: false,
    isRandom: false,
    isMute: false,
    isLike: false,
    volValue: 100,
    songs: [
        {
            id: 12,
            name: 'Em nên dừng lại',
            singer: 'Khang Việt',
            album: 'Em nên dừng lại(Single)',
            path: './assets/songs/1.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/b/0/c/8/b0c8399ab4bf53e7eb1285ee1e8aaa32.jpg',
            time: '06:08',
        },
        {
            id: 21,
            name: 'Yêu hơn chính mình',
            singer: 'Châu Dương',
            album: 'Yêu hơn chính mình(Single)',
            path: './assets/songs/2.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/7/e/0/7/7e07ef80391681866bc46c471f4219de.jpg',
            time: '05:05',
        },
        {
            id: 37,
            name: 'Pháo hồng',
            singer: 'Đạt Long Vinh',
            album: 'Pháo hồng(Single)',
            path: './assets/songs/3.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/3/9/8/d/398dd75c920409a73359c8a62f02a166.jpg',
            time: '03:55',
        },
        {
            id: 43,
            name: 'Em nên dừng lại',
            singer: 'Khang Việt',
            album: 'Em nên dừng lại(Single)',
            path: './assets/songs/1.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/b/0/c/8/b0c8399ab4bf53e7eb1285ee1e8aaa32.jpg',
            time: '06:08',
        },
        {
            id: 52,
            name: 'Yêu hơn chính mình',
            singer: 'Châu Dương',
            album: 'Yêu hơn chính mình(Single)',
            path: './assets/songs/2.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/7/e/0/7/7e07ef80391681866bc46c471f4219de.jpg',
            time: '05:05',
        },
        {
            id: 16,
            name: 'Pháo hồng',
            singer: 'Đạt Long Vinh',
            album: 'Pháo hồng(Single)',
            path: './assets/songs/3.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/3/9/8/d/398dd75c920409a73359c8a62f02a166.jpg',
            time: '03:55',
        },
        {
            id: 67,
            name: 'Em nên dừng lại',
            singer: 'Khang Việt',
            album: 'Em nên dừng lại(Single)',
            path: './assets/songs/1.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/b/0/c/8/b0c8399ab4bf53e7eb1285ee1e8aaa32.jpg',
            time: '06:08',
        },
        {
            id: 4,
            name: 'Yêu hơn chính mình',
            singer: 'Châu Dương',
            album: 'Yêu hơn chính mình(Single)',
            path: './assets/songs/2.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/7/e/0/7/7e07ef80391681866bc46c471f4219de.jpg',
            time: '05:05',
        },
        {
            id: 45,
            name: 'Pháo hồng',
            singer: 'Đạt Long Vinh',
            album: 'Pháo hồng(Single)',
            path: './assets/songs/3.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/3/9/8/d/398dd75c920409a73359c8a62f02a166.jpg',
            time: '03:55',
        },
        {
            id: 1,
            name: 'Yêu hơn chính mình',
            singer: 'Châu Dương',
            album: 'Yêu hơn chính mình(Single)',
            path: './assets/songs/2.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/7/e/0/7/7e07ef80391681866bc46c471f4219de.jpg',
            time: '05:05',
        },
        {
            id: 41,
            name: 'Pháo hồng',
            singer: 'Đạt Long Vinh',
            album: 'Pháo hồng(Single)',
            path: './assets/songs/3.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/3/9/8/d/398dd75c920409a73359c8a62f02a166.jpg',
            time: '03:55',
        },
        {
            id: 99,
            name: 'Yêu hơn chính mình',
            singer: 'Châu Dương',
            album: 'Yêu hơn chính mình(Single)',
            path: './assets/songs/2.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/7/e/0/7/7e07ef80391681866bc46c471f4219de.jpg',
            time: '05:05',
        },
        {
            id: 101,
            name: 'Pháo hồng',
            singer: 'Đạt Long Vinh',
            album: 'Pháo hồng(Single)',
            path: './assets/songs/3.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/3/9/8/d/398dd75c920409a73359c8a62f02a166.jpg',
            time: '03:55',
        },
    ],
    songsPlayed: [],
    songsDefautList: [],
    songsDefault: function () {
        app.songsDefautList.push(...app.songs)
    },
    showExtendList: function () {
        if (searchInput === document.activeElement) {
            searchInputWrapper.style.borderBottomLeftRadius = 'unset'
            searchInputWrapper.style.borderBottomRightRadius = 'unset'
            searchInputWrapper.style.backgroundColor = '#282828'
            searchExtend.style.display = 'block'
        } else {
            searchInputWrapper.style.borderBottomLeftRadius = '20px'
            searchInputWrapper.style.borderBottomRightRadius = '20px'
            searchInputWrapper.style.backgroundColor = '#353535'
            searchExtend.style.display = 'none'
        }
    },
    hideExtendItems: function () {
        const extendItems = $$('.extend-list-item')

        if (searchInput.value.length > 0) {
            extendItems.forEach((item) => {
                item.style.display = 'none'
            })
        } else {
            extendItems.forEach((item) => {
                item.style.display = 'block'
            })
        }
    },
    renderSongList: function () {
        const htmls = app.songs.map((song) => {
            return `
            <div class="info-song ${
                song.id === app.currentId ? 'info-song--active' : ''
            }">
                <div class="song-left">
                    <i class="song-left-icon fa-solid fa-music"></i>
                    <input type="checkbox" class="song-checkbox checkbox-item" value="${
                        song.id
                    }" id="${song.id}" >
                    <div class="song-left-play-btn" >
                        <img src="${song.image}" alt="">
                        <div class="song-left-btn-wrapper ${
                            app.isPlaying && song.id === app.currentId
                                ? 'is-flex'
                                : ''
                        }" data-id="${song.id}">
                            <div class="song-left-btn-play-music" data-id="${
                                song.id
                            }">
                                <button class="song-left-play-music ${
                                    app.isPlaying && song.id === app.currentId
                                        ? 'is-hidden'
                                        : ''
                                }" >
                                    <i class="fa-solid fa-play"></i>
                                </button>
                                <button style="display:none" class="song-left-play-music song-left-playing ${
                                    app.isPlaying && song.id === app.currentId
                                        ? 'is-block'
                                        : ''
                                }">
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="song-info">
                        <div class="song-name">${song.name}</div>
                        <a href="" class="song-artist" >${song.singer}</a>
                    </div>
                </div>
                <div class="song-mid">
                    <span>${song.album}</span>
                </div>
                <div class="song-right">
                    <span>${song.time}</span>
                    <div class="song-right-option">
                        <i class="fa-solid fa-microphone-lines"></i>
                    </div>
                    <div class="song-right-option like-btn-wrapper">                                
                        <i class="fa-solid fa-heart like-btn"></i>
                    </div>
                    <div class="song-right-option">
                        <i class="fa-solid fa-ellipsis"></i>
                    </div>
                </div>
            </div>
            `
        })
        playList.innerHTML = htmls.join('')
    },
    renderPlayedList: function () {
        const htmls = app.songsPlayed.map((song) => {
            return `
            <div class="info-song ${
                song.id === app.currentId ? 'info-song-played--active' : ''
            }">
                <div class="song-left" style="width:70%">
                    <div class="song-left-play-btn ">
                        <img src="${song.image}" alt="">
                        <div class="song-left-btn-wrapper  ${
                            app.isPlaying && song.id === app.currentId
                                ? 'is-flex'
                                : ''
                        }" data-id="${song.id}">
                            <div class="song-left-btn-play-music" data-id="${
                                song.id
                            }">
                                <button class="song-left-play-music ${
                                    app.isPlaying && song.id === app.currentId
                                        ? 'is-hidden'
                                        : ''
                                }" >
                                    <i class="fa-solid fa-play"></i>
                                </button>
                                <button style="display:none" class="song-left-play-music song-left-playing ${
                                    app.isPlaying && song.id === app.currentId
                                        ? 'is-block'
                                        : ''
                                }">
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="song-info">
                        <div class="song-name">${song.name}</div>
                        <a href="" class="song-artist" >${song.singer}</a>
                    </div>
                </div>
                <div class="song-right">
                    
                    <div class="song-right-option like-btn-wrapper">                                
                        <i class="fa-solid fa-heart like-btn"></i>
                    </div>
                    <div class="song-right-option">
                        <i class="fa-solid fa-ellipsis"></i>
                    </div>
                </div>
            </div>
            `
        })
        playedListItems.innerHTML = htmls.join('')
    },
    renderPlayer: function () {
        const playerImg = $('.player-img')
        const playerNameSong = $('.player-namesong')
        const playerArtist = $('.player-artist')
        const song = app.getTrackById(app.currentId)
        const playIcon = $('.icon-play')
        const pauseIcon = $('.icon-pause')
        const iconPlay = $('.disc-icon-play')
        const iconPlaying = $('.disc-icon-playing')
        const playingBtnContent = $('.playing-btn-content')
        const playBtnContent = $('.play-btn-content')

        window.addEventListener('click', app.showExtendList)
        searchInput.addEventListener('input', app.hideExtendItems)

        if (!app.isPlaying) {
            playerImg.src = app.songs[0].image
            playerNameSong.innerHTML = app.songs[0].name
            playerArtist.innerHTML = app.songs[0].singer
        } else {
            playerImg.src = song.image
            playerNameSong.innerHTML = song.name
            playerArtist.innerHTML = song.singer
        }

        if (app.isPlaying) {
            playIcon.classList.add('is-hidden')
            pauseIcon.classList.remove('is-hidden')
            iconPlay.classList.add('is-hidden')
            iconPlaying.classList.remove('is-hidden')
            playBtnContent.classList.add('is-hidden')
            playingBtnContent.classList.remove('is-hidden')
        } else {
            playIcon.classList.remove('is-hidden')
            pauseIcon.classList.add('is-hidden')
            iconPlaying.classList.add('is-hidden')
            iconPlay.classList.remove('is-hidden')
            playBtnContent.classList.remove('is-hidden')
            playingBtnContent.classList.add('is-hidden')
        }
        app.renderSongList()
        app.renderPlayedList()
        app.bindingEvent()
    },
    renderCheckbox: function () {
        const checkboxAll = $('.checkbox-all')
        const checkedHiddenIcons = $$('.song-left-icon')
        const checkboxs = $$('.checkbox-item')
        const sortBtn = $('.sort-btn')
        const selectedLength = selectedItems.length

        checkboxs.forEach((element, index) => {
            const existed = selectedItems.includes(element.value)
            if (existed) {
                element.checked = true
            } else {
                element.checked = false
            }

            if (selectedLength > 0) {
                element.classList.add('is-block')
                checkedHiddenIcons[index].classList.add('is-hidden')
                checkboxAll.classList.add('is-block')
                sortBtn.classList.add('is-hidden')
            } else {
                element.classList.remove('is-block')
                checkedHiddenIcons[index].classList.remove('is-hidden')
                checkboxAll.classList.remove('is-block')
                sortBtn.classList.remove('is-hidden')
            }
        })

        const isActiveAll = Array.from(checkboxs).every((element) => {
            return selectedItems.includes(element.value)
        })

        checkboxAll.checked = isActiveAll
    },
    bindingEvent: function () {
        const playAudioBtns = $$('.song-left-btn-wrapper')
        const playerPlayBtns = $$('.player-play-btn')
        const discPlayBtns = $$('.disc-play-btn')
        const likeBtns = $$('.like-btn')
        const toastMes = $('.toast-mes-wrapper')
        const toastMEsAdd = $('.toast-mes-add')
        const toastMEsRemove = $('.toast-mes-remove')
        const toastCloseBtn = $$('.toast-close-btn')
        const likeBtnWrappers = $$('.like-btn-wrapper')
        const btnList = $$('.btn-list-left')
        const btnListA = $('.btn-list-a')
        const btnListB = $('.btn-list-b')

        //Play Btn
        playAudioBtns.forEach((btn) => {
            const songId = Number(btn.dataset.id)
            btn.onclick = () => {
                if (app.isPlaying) {
                    if (app.currentId !== songId) {
                        app.setTrack(songId)
                    } else {
                        app.pause()
                        app.renderPlayer()
                        app.renderSongList()
                        app.renderPlayedList()
                        app.bindingEvent()
                    }
                } else {
                    if (app.currentId !== songId) {
                        app.setTrack(songId)
                    } else {
                        app.play()
                        app.renderPlayer()
                        app.renderSongList()
                        app.renderPlayedList()
                        app.bindingEvent()
                    }
                }
            }
        })

        playerPlayBtns.forEach((btn) => {
            btn.onclick = function () {
                if (!app.currentId) {
                    return
                }

                if (app.isPlaying) {
                    app.pause()
                } else if (!app.isPlaying) {
                    app.play()
                }
                app.renderPlayer()
                app.renderSongList()
                app.renderPlayedList()
                app.bindingEvent()
            }
        })

        discPlayBtns.forEach((btn) => {
            btn.onclick = function () {
                if (app.currentId === null) {
                    app.setTrack(12)
                } else if (app.isPlaying) {
                    app.pause()
                } else if (!app.isPlaying) {
                    app.play()
                }
                app.renderPlayer()
                app.renderSongList()
                app.renderPlayedList()
                app.bindingEvent()
            }
        })

        // Tiến độ bài hát
        convertTimes = function (sec) {
            const minutes = Math.floor(sec / 60)
            const secs = sec % 60
            if (secs < 10) {
                return `0${minutes}:0${secs}`
            } else {
                return `0${minutes}:${secs}`
            }
        }
        convertTimes()

        audio.ontimeupdate = function () {
            if (audio.duration) {
                progress.value = (audio.currentTime / audio.duration) * 100
                document.querySelector('.time-left').innerHTML = convertTimes(
                    Math.floor(audio.currentTime)
                )
                document.querySelector('.time-right').innerHTML = convertTimes(
                    Math.floor(audio.duration) - Math.floor(audio.currentTime)
                )
            }
        }

        // Tua bài hát
        progress.oninput = function (e) {
            audio.pause()
            const seekTime = (audio.duration / 100) * e.target.value
            audio.currentTime = seekTime
            progress.onchange = function () {
                audio.play()
            }
        }

        //Volum audio
        volSlider.onchange = function () {
            app.volValue = volSlider.value
            audio.volume = Number(app.volValue) / 100
            if (Number(app.volValue) === 0) {
                app.isMute = true
                volMute.classList.remove('is-hidden')
                volNotMute.classList.add('is-hidden')
                app.volValue = 100
            } else {
                app.isMute = false
                volMute.classList.add('is-hidden')
                volNotMute.classList.remove('is-hidden')
            }
        }

        volBtns.forEach((btn) => {
            btn.onclick = function () {
                app.isMute = !app.isMute

                if (app.isMute) {
                    volMute.classList.remove('is-hidden')
                    volNotMute.classList.add('is-hidden')
                    volSlider.value = 0
                    audio.volume = 0
                } else {
                    volMute.classList.add('is-hidden')
                    volNotMute.classList.remove('is-hidden')
                    volSlider.value = app.volValue
                    audio.volume = Number(app.volValue) / 100
                }
            }
        })

        // Next Btn
        nextSong.onclick = function () {
            const currentSongIndex = app.songs.findIndex(
                (song) => song.id === app.currentId
            )

            if (app.isRandom) {
                app.playRandomsong()
            } else {
                if (currentSongIndex === app.songs.length - 1) {
                    const currentSongIndexId = app.songs[0].id
                    app.setTrack(currentSongIndexId)
                } else {
                    const currentSongIndexId =
                        app.songs[currentSongIndex + 1].id
                    app.setTrack(currentSongIndexId)
                }
            }
        }

        //Prev Btn
        prevSong.onclick = function () {
            const currentSongIndex = app.songs.findIndex(
                (song) => song.id === app.currentId
            )

            if (currentSongIndex === 0) {
                const currentSongIndexId = app.songs[app.songs.length - 1].id
                app.setTrack(currentSongIndexId)
            } else {
                const currentSongIndexId = app.songs[currentSongIndex - 1].id
                app.setTrack(currentSongIndexId)
            }
        }

        // Random Btn
        randomBtn.onclick = function () {
            app.isRandom = !app.isRandom
            randomBtn.classList.toggle('active')
        }

        //Repeat Btn
        repeatBtn.onclick = function () {
            app.isRepeat = !app.isRepeat
            repeatBtn.classList.toggle('active')
        }

        //Khi bài hát kết thúc
        audio.onended = function () {
            if (app.isRepeat) {
                audio.play()
            } else {
                nextSong.click()
            }
        }

        //played list

        playedListBtn.onclick = function () {
            playedListBtn.classList.toggle('active')
            playedList.classList.toggle('is-hidden')
        }

        //Sort Song List

        sortBtn.onclick = function () {
            sortItems.classList.toggle('is-hidden')
        }

        sortDefaultBtn.onclick = function () {
            app.songs = [...app.songsDefautList]
            sortItems.classList.add('is-hidden')
            app.renderSongList()
            app.bindingEvent()
            console.log(app.songsDefautList)
        }

        sortSongsBtn.onclick = function () {
            app.songs.sort((a, b) => a.name.localeCompare(b.name))

            sortItems.classList.add('is-hidden')
            app.renderSongList()
            app.bindingEvent()
        }

        sortSingersBtn.onclick = function () {
            app.songs.sort((a, b) => a.singer.localeCompare(b.singer))
            sortItems.classList.add('is-hidden')
            app.renderSongList()
            app.bindingEvent()
            console.log(app.songsDefautList)
        }

        sortAlbumsBtn.onclick = function () {
            app.songs.sort((a, b) => a.album.localeCompare(b.album))
            sortItems.classList.add('is-hidden')
            app.renderSongList()
            app.bindingEvent()
        }

        //Song checkbox

        const checkboxs = $$('.checkbox-item')
        checkboxs.forEach((element) => {
            element.onchange = (event) => {
                const checked = event.target.checked
                const value = event.target.value
                if (checked) {
                    selectedItems.push(value)
                } else {
                    selectedItems = selectedItems.filter((item) => {
                        return item !== value
                    })
                }
                app.renderCheckbox()
            }
        })

        const checkboxAll = document.querySelector('.checkbox-all')
        checkboxAll.onchange = (event) => {
            const checked = event.target.checked

            if (checked) {
                const selectedAllValues = Array.from(checkboxs).map((item) => {
                    return item.value
                })
                selectedItems = selectedAllValues
            } else {
                selectedItems = []
            }
            app.renderCheckbox()
        }

        //Like icon

        likeBtnWrappers.forEach((btn, index) => {
            btn.onclick = function () {
                app.isLike = !app.isLike
                likeBtns[index].classList.toggle('active')

                if (app.isLike) {
                    toastMEsAdd.classList.remove('is-hidden')
                    toastMEsRemove.classList.add('is-hidden')
                    toastMes.classList.add('show')
                    app.toastMessengerAutoClose()
                } else {
                    toastMEsAdd.classList.add('is-hidden')
                    toastMEsRemove.classList.remove('is-hidden')
                    toastMes.classList.add('show')
                    app.toastMessengerAutoClose()
                }
                app.bindingEvent()
            }
        })

        toastCloseBtn.forEach((btn) => {
            btn.onclick = function () {
                toastMes.classList.remove('show')
            }
        })

        //Listplayed
        btnListA.onclick = () => {
            btnListA.classList.add('btn-active')
            btnListB.classList.remove('btn-active')
            app.renderPlayedList()
            app.bindingEvent()
        }
        btnListB.onclick = () => {
            btnListA.classList.remove('btn-active')
            btnListB.classList.add('btn-active')
            app.renderPlayedList()
            app.bindingEvent()
        }
    },
    setTrack: function (id) {
        app.currentId = id
        const song = app.getTrackById(app.currentId)

        audio.src = song.path
        app.addSongsPlayed(song)
        app.play()
        app.renderPlayer()
        app.renderSongList()
        app.renderPlayedList()
        app.bindingEvent()
    },
    getTrackById: function (id) {
        const song = app.songs.find((song) => {
            return song.id === id
        })
        return song
    },

    discAroundAnimate: function () {
        const discImg = $('.disc-img')

        if (app.isPlaying) {
            discImg.classList.add('playing')
            animate.play()
        } else {
            animate.cancel()
            animateEnd.play()
            setTimeout(() => {
                discImg.classList.remove('playing')
            }, 700)
        }
    },

    playRandomsong: function () {
        let currentSongIndex = app.songs.findIndex(
            (song) => song.id === app.currentId
        )
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * app.songs.length)
        } while (newIndex === currentSongIndex)
        let newIndexId = app.songs[newIndex].id
        app.setTrack(newIndexId)
    },
    play: function () {
        app.isPlaying = true
        audio.play()
        app.scrollToActiveSong()
        app.discAroundAnimate()
    },
    pause: function () {
        app.isPlaying = false
        audio.pause()
        app.discAroundAnimate()
    },
    addSongsPlayed: function (song) {
        if (!app.songsPlayed.includes(song)) {
            app.songsPlayed.unshift(song)
            app.renderPlayedList()
        } else {
            app.songsPlayed = app.songsPlayed.filter(function (songItem) {
                return songItem.id !== song.id
            })
            app.songsPlayed.unshift(song)
            app.renderPlayedList()
        }
    },
    toastMessengerAutoClose: function () {
        setTimeout(function () {
            const toastCloseBtn = $$('.toast-close-btn')
            toastCloseBtn.forEach((btn) => {
                btn.click()
            })
        }, 3000)
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.info-song--active').scrollIntoView({
                block: 'center',
                behavior: 'smooth',
            })
        }, 300)
    },
    start: function () {
        this.songsDefault()
        this.renderSongList()
        this.renderPlayedList()
        this.renderPlayer()
        this.renderCheckbox()
        this.bindingEvent()
    },
}

app.start()
