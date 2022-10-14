<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <router-link :to="{name: 'home'}" class="text-white font-bold uppercase text-2xl mr-4">Music</router-link>
      <div class="flex flex-grow items-center">
        <ul class="flex flex-row mt-1">
          <li v-if="!userStore.userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <li>
              <router-link to="/manage" class="px-2 text-white" href="#">Manage</router-link>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOut">Logout</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapStores } from "pinia";
import useModalStore from "@/stores/modal";
import useUserStore from "@/stores/user";
export default {
  name: "AppHeader",
  computed: {
    ...mapStores(useModalStore, useUserStore),
  },
  methods: {
    toggleAuthModal() {
      //Khi su dung mapStores
      //this.<tenStore>Store
      this.modalStore.isOpen = !this.modalStore.isOpen;
    //   console.log(this.modalStore.isOpen);
    },
    signOut() {
        this.userStore.signOut();
        if (this.$route.meta.requiresAuth) {
            this.$router.push({name: 'home'})
        }
    }
  },
};
</script>
