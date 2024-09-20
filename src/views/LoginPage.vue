<template>
    <div class="h-screen w-screen">
        <div class="w-full h-full flex justify-center items-center bg-neutral-800">
            <form @submit.prevent="login" class="w-full flex flex-col items-center pb-20">

                <div class="flex items-center">
                    <img :src="logo" alt="logo" class="h-7 mr-1">
                    <p class="text-[rgb(254,0,0)] font-bold tracking-wide text-2xl">TOYOTA</p>
                </div>

                <p class="bg-[rgb(254,0,0)] font-bold tracking-[5px] pl-[8px] pr-[5px] pb-[1px] text-white text-base text-center mt-[2px]">FORKLIFTS</p>

                <div v-if="authStore.errors.message" class="text-center mt-6 rounded px-4 text-red-500 text-sm whitespace-nowrap">
                    {{ authStore.errors.message }}
                </div>

                <p class="border-b border-red-600 text-gray-300 py-1 pb-[1px] mt-6 text-sm font-semibold">SIGN IN</p>

                <input type="text" v-model="username" class="px-4 h-9 rounded-full w-64 mt-6 text-gray-700 font-semibold text-sm" placeholder="Username">
                <p v-if="authStore.errors.username" class="text-sm text-red-500 text-left">{{ authStore.errors.username[0] }}</p>

                <input type="password" v-model="password" class="px-4 h-9 rounded-full w-64 mt-4 text-gray-700" placeholder="Password">
                <p v-if="authStore.errors.password" class="text-sm text-red-500 text-left">{{ authStore.errors.password[0] }}</p>

                <button type="submit" class="w-64 mt-6 bg-red-500 py-2 text-sm font-bold text-white tracking-wide rounded-full shadow-lg shadow-neutral-900 hover:bg-red-600">SIGN IN</button>
            </form>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useAuthStore } from '@/stores/authStore';
    import logo from '@/assets/logo.png';

    const authStore = useAuthStore();
    const username = ref('');
    const password = ref('');

    function login(){
        authStore.login(username.value, password.value);
    }
</script>



<!-- Developed by: IT Team -->