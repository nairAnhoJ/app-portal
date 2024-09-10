<template>
    <div class="h-screen w-screen">
        <div class="w-full h-full flex justify-center items-center bg-neutral-800">
            <form class="w-full flex flex-col items-center pb-20">

                <div class="flex items-center">
                    <img :src="logo" alt="logo" class="h-7 mr-1">
                    <p class="text-[rgb(254,0,0)] font-bold tracking-wide text-2xl">TOYOTA</p>
                </div>

                <p class="bg-[rgb(254,0,0)] font-bold tracking-[5px] pl-[8px] pr-[5px] pb-[1px] text-white text-base text-center mt-[2px]">FORKLIFTS</p>
                <p class="border-b border-red-600 text-gray-300 py-1 pb-[1px] mt-6 text-sm font-semibold">SIGN IN</p>

                <input type="text" name="" id="" class="px-4 h-9 rounded-full w-64 mt-6 text-gray-700 font-semibold text-sm" placeholder="Username">
                <input type="password" name="" id="" class="px-4 h-9 rounded-full w-64 mt-4 text-gray-700" placeholder="Password">

                <button class="w-64 mt-6 bg-red-500 py-2 text-sm font-bold text-white tracking-wide rounded-full shadow-lg shadow-neutral-900 hover:bg-red-600">SIGN IN</button>
            </form>
        </div>
    </div>
</template>

<script setup>
    import logo from '@/assets/logo.png';
</script>



<!-- Developed by: IT Team -->