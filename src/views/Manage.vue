<template>
    <!-- Main Content -->
    <section class="container mx-auto mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <div class="col-span-1">
            <Upload ref="upload" :addSong="addSong" />
        </div>
        <div class="col-span-2">
          <div
            class="bg-white rounded border border-gray-200 relative flex flex-col"
          >
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
              <span class="card-title">My Songs</span>
              <i
                class="fa fa-compact-disc float-right text-green-400 text-2xl"
              ></i>
            </div>
            <div class="p-6">
              <!-- Composition Items -->
            <CompositionItem v-for="(song,index) in songs" :key="song.docId" :song="song" 
            :updateSong="updateSong" :index="index" 
            :removeSong="removeSong"
            :updateUnsavedFlag="updateUnsavedFlag"
            />
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
import Upload from '../components/Upload.vue';
import CompositionItem from '../components/CompositionItem.vue'
import { songsCollection, auth } from '@/includes/firebase'
  // import useUserStore from "@/stores/user";
  
  export default {
    name: "Manage",
    components: { Upload, CompositionItem },
    data() {
        return {
            songs: [],
            unsavedFlag: false,
      }
    },
    async created() {
        const snapshot = await songsCollection
        .where('uid','==', auth.currentUser.uid)
        .get();
     
        snapshot.forEach(this.addSong)
    },
    methods: {
        updateSong(index, values) {
            this.songs[index].modified_name = values.modified_name;
            this.songs[index].genre = values.genre;
        },
        removeSong(index) {
            this.songs.splice(index,1);
        },
        //Push new upload song into array after upload completed sucessfully
        addSong(document) {
            const song = {
                ...document.data(),
                docId: document.id, //do data() ko tra ve ID
                
            };
            this.songs.push(song);
        },
        updateUnsavedFlag(value) {
            console.log(value)
            this.unsavedFlag = value;
        }
    },
    //Route Leave Guards when leave the page when editing music info
    beforeRouteLeave(to, from, next) {
        if(!this.unsavedFlag) {
            next();
        } else {
            const leave = confirm('You have unsaved changes. Are you sure you want to leave?');
            next(leave);
        }
    }
    // beforeRouteLeave(to, from, next) {
    //     this.$refs.upload.cancelUploads();
    //     next();
    // }
};
  </script>
  