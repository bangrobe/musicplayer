<template>
    <header id="header" class="bg-gray-700">
        <nav class="container mx-auto flex justify-start items-center py-5 px-4">
            <a href="#" class="text-white font-bold uppercase text-2xl mr-4">Music</a>
            <div class="flex flex-grow items-center">
            <ul class="flex flex-row mt-1">
                <li>
                    <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">Login / Register</a>
                </li>
                <li>
                    <a class="px-2 text-white" href="#">Manage</a>
                </li>
            </ul>
        </div>
        </nav>

    </header>
</template>

<script>
import { mapStores } from 'pinia'
import useModalStore from '@/stores/modal'
export default {
    name: "AppHeader",
    computed: {
        ...mapStores(useModalStore)
    },
    methods: {
        toggleAuthModal() {
            //Khi su dung mapStores
            //this.<tenStore>Store
            this.modalStore.isOpen = !this.modalStore.isOpen;
            console.log(this.modalStore.isOpen)
        }
    }
}
</script>
