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
                                    <div class="w-full h-[calc(100%-84px)] flex flex-wrap gap-6 overflow-y-auto px-6 pt-3">

                                        
                                        <a href="#" class="w-48 h-56 bg-neutral-200 shadow shadow-neutral-900 rounded-lg gap-y-2 relative overflow-hidden hover:scale-[102%]">
                                            <div :class="['w-full h-full bg-gray-400 absolute z-50 transition-all duration-500', infoVisible == 1 ? 'top-0' : 'top-full']">
                                                <div class="group absolute top-3 right-3 text-neutral-600 hover:text-neutral-700 transition-all duration-300">
                                                    <iconClose class="w-8 h-8" @click="toggleInfo(null)"></iconClose>
                                                </div>
                                                <div class="p-6 text-xs overflow-y-auto h-full">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                                </div>
                                            </div>
                                            <div class="w-full h-full p-[10px] z-40">
                                                <div class="group absolute top-3 right-3 text-neutral-400 hover:text-neutral-200 transition-all duration-300">
                                                    <iconInfo class="w-8 h-8" @click="toggleInfo(1)"></iconInfo>
                                                </div>
                                                <div class="w-full aspect-square flex items-center justify-center rounded-xl">
                                                    <img :src="train" alt="" class="aspect-square shadow shadow-gray-500 rounded-lg">
                                                </div>
                                                <div class="w-full h-[calc(100%-162px)] flex items-center overflow-hidden">
                                                    <h1 class="font-bold text-gray-700 text-center text-sm w-full whitespace-nowrap">{{truncateSentence('Training Scheduling System')}}</h1>
                                                </div>
                                            </div>
                                        </a>
                                        



                                    </div>
                                </div>
                            </div>
                            <!-- <div class="w-full h-full bg-neutral-900 absolute z-30 bg-opacity-100"></div> -->
                            <!-- <img :src="flBg" alt="" class="absolute z-20 top-1/2 -translate-y-1/2 blur"> -->
                        </div>
                    </div>



                    <!-- <div class="w-full h-3/5 pt-3 space-y-8">
                        <div class=" w-full h-full p-6 flex flex-wrap gap-6 overflow-y-auto">
                            <a href="#" class="h-48 aspect-square flex flex-col items-center justify-center bg-pink-300 rounded-lg shadow-lg hover:scale-105 gap-y-2">
                                <h1 class="font-bold text-gray-600 text-center px-6 text-sm">IT TICKETING SYSTEM</h1>
                                <img :src="ytLogo" alt="" class="w-16">
                            </a>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    import logo from '@/assets/logo.png'
    import fbLogo from '@/assets/fb-logo.png'
    import ytLogo from '@/assets/yt-logo.png'
    import webLogo from '@/assets/web-logo.png'
    import header from '@/assets/NHEADER.png'
    import flBg from '@/assets/NFL-BG.png'
    import train from '@/assets/BBB.jpg'
    import Tooltip from '@/components/Tooltip.vue'
    import iconInfo from '@/components/icons/iconInfo.vue'
    import iconClose from '@/components/icons/iconClose.vue'

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