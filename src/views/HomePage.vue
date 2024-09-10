<template>
    <div class="w-screen h-screen">
        <div class="flex h-full p-4 pl-6">
            <div class="w-20 h-full bg-transparent flex flex-col p-3">
                <div class="w-full aspect-square flex items-center justify-center"><img :src="logo" alt="logo" class="w-12"></div>
                <!-- filter invert brightness-0 grayscale -->

                <div class="mt-12 space-y-6">
                    <a href="https://www.facebook.com/ToyotaForkliftsPhilippines" target="_blank" class="group relative w-full aspect-square flex items-center justify-center bg-gray-100 rounded-lg shadow-lg shadow-gray-400 hover:scale-105 border z-50">
                        <div>
                            <img :src="fbLogo" alt="fb_logo" class="w-9">
                        </div>
                        <Tooltip tooltipText='Facebook'></Tooltip>
                    </a>
                    <a href="https://www.youtube.com/@toyotamaterialhandlinginte8417" target="_blank" class="group relative w-full aspect-square flex items-center justify-center bg-white rounded-lg shadow-lg shadow-gray-400 hover:scale-105 border z-50">
                        <div>
                            <img :src="ytLogo" alt="fb_logo" class="w-9">
                        </div>
                        <Tooltip tooltipText='Youtube'></Tooltip>
                    </a>
                    <a href="https://www.toyotaforklifts-philippines.com/" target="_blank" class="group relative w-full aspect-square flex items-center justify-center bg-white rounded-lg shadow-lg shadow-gray-400 hover:scale-105 border z-50">
                        <div>
                            <img :src="webLogo" alt="fb_logo" class="w-9">
                        </div>
                        <Tooltip tooltipText='Website'></Tooltip>
                    </a>
                </div>
            </div>

            <div class="w-[calc(100%-80px)] pl-6">
                <div class="w-full h-full flex flex-col bg-gray-400 rounded-2xl overflow-hidden shadow-lg shadow-gray-800">
                    <div class="w-full h-full">
                        <div class=" w-full h-full relative bg-neutral-800">
                            <div class="w-full h-full z-40 opacity-100 absolute py-6">
                                <div class=" w-full h-1/3 px-6">
                                    <div class="w-full h-full backdrop-blur-sm rounded-xl overflow-hidden flex items-center shadow shadow-gray-700">
                                        <img :src="header" alt="" class="w-full">
                                    </div>
                                </div>
                                <div class="h-2/3">
                                    <h1 class="text-white font-bold text-3xl p-6 pb-3">Applications</h1>
                                    <div class="w-full h-[calc(100%-84px)] flex flex-wrap gap-6 overflow-y-auto px-6 pt-3 relative">
                                        <!-- Loading -->
                                            <div v-if="!isLoaded" class="absolute left-1/2 top-1/3 z-50 -translate-x-1/2">
                                                <div class="h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-600 animate-spin"></div>
                                            </div>
                                        <!-- Loading -->

                                        <!-- App List -->
                                            <AppList v-for="app in collection" :key="app.id" :app="app"></AppList>
                                        <!-- App List -->
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="w-full h-full bg-neutral-900 absolute z-30 bg-opacity-100"></div> -->
                            <!-- <img :src="flBg" alt="" class="absolute z-20 top-1/2 -translate-y-1/2 blur"> -->
                        </div>
                    </div>
                </div>
            </div>
        </div > 
    </div>
</template>

<script setup> 
    import { onMounted, ref } from 'vue';

    import logo from '@/assets/logo.png';
    import fbLogo from '@/assets/fb-logo.png';
    import ytLogo from '@/assets/yt-logo.png';
    import webLogo from '@/assets/web-logo.png';
    import header from '@/assets/NHEADER.png';
    import Tooltip from '@/components/Tooltip.vue';
    import AppList from '@/components/modules/home/AppList.vue';

    import { appListIndex } from '@/http/applist-api';
    
    import axios from '@/axios.js'

    // Variables
        const collection = ref([]);
        const isLoaded = ref(false);
        const errors = ref({});

    onMounted(async (url) => {
        collection.value = [];
        try {
            const response = url ? await axios.get(url) : await appListIndex();
            collection.value = response.data.data;
        } catch (error) {
            // if (error.response) {
            //     if (error.response.status === 422) {
            //         errors.value = error.response.data.errors || {};
            //     } else if(error.response.status === 401) {
            //         authStore.logout();
            //     } else {
            //         errors.value = 'An unexpected error occurred. Please try again later.';
            //     }
            // } else {
                errors.value = 'An unexpected error occurred. Please try again later.';
            // }
        } finally {
            isLoaded.value = true;
        }
    });

    const infoVisible = ref(false);

    function toggleInfo(index) {
        infoVisible.value = index;
    }

    function truncateSentence(title) {
      if (title.length > 20) {
        return title.substring(0, 22) + '...';
      }
      return title;
    }
</script>