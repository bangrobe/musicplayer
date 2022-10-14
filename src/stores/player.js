import { defineStore } from 'pinia'
import {Howl, Howler} from 'howler';
import helpers from '../includes/helpers';
export default defineStore("player", {
    state: () => ({
        currentSong: {},
        sound: {},
        seek: "00:00",
        duration: "00:00",
        playerProgress: "0%",
    }),
    actions: {
        async newSong(song) {
            this.currentSong = song;

            //Delete howl instance from memory
            // Only one song play 
            if(this.sound instanceof Howl) {
                this.sound.unload();
            }

            this.sound = new Howl({
                src: [song.url],
                html5: true,

            });

            this.sound.play();

            // Progress duration, support by howler
            //requestAnimationFrame is not recursion
            this.sound.on("play", ()=> {
                requestAnimationFrame(this.progress);
            })
        },
        async toggleAudio() {
            if(!this.sound.playing) {
                return;
            }

            if(this.sound.playing()) {
                this.sound.pause();
            } else {
                this.sound.play();
            }
        },
        progress() {
            this.seek = helpers.formatTime(this.sound.seek());
            this.duration = helpers.formatTime(this.sound.duration());

            this.playerProgress = `${(this.sound.seek() / this.sound.duration())*100}%`
            //Make recursion
            if (this.sound.playing()) {
                requestAnimationFrame(this.progress);
            }
        },
        // Function update playing position when select audio position
        updateSeek(event) {
            if(!this.sound.playing) {
                return;
            }

            const { x, width } = event.currentTarget.getBoundingClientRect();
            // clientX luu y la lay theo document, ko phai la timeline
            const clickX = event.clientX - x;
            const percentage = clickX / width;
            const seconds = this.sound.duration() * percentage;

            this.sound.seek(seconds);
            this.sound.once("seek", this.progress)

        }
    },
    getters: {
        playing: (state)=> {
            if(state.sound.playing) {
                return state.sound.playing();
            }

            return false;
        }
    }
})