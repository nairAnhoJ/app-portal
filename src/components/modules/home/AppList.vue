<template>
    <a :href="(app.status != 2) ? app.link : '#'" target="_blank" class="w-48 h-56 bg-neutral-200 shadow shadow-neutral-900 rounded-lg gap-y-2 relative overflow-hidden hover:scale-[102%]" :class="{'pointer-events-none':app.status == 2}">
        <div :class="['w-full h-full bg-gray-400 absolute z-50 transition-all duration-500', infoVisible == app.id ? 'top-0' : 'top-full']">
            <div class="group absolute top-3 right-3 text-neutral-600 hover:text-neutral-700 transition-all duration-300">
                <iconClose class="w-8 h-8" @click.stop.prevent="toggleInfo(null)"></iconClose>
            </div>
            <div class="p-5 text-xs overflow-y-auto h-full">
                <p class="mb-3 pr-6 font-semibold text-sm">{{ app.name }}</p>
                <p>{{ app.description }}</p>
            </div>
        </div>
        <div class="w-full h-full p-[10px] z-40">
            <div v-if="app.status == 2" class="absolute shadow-lg shadow-black bg-yellow-400 w-full left-0 top-1/2 -translate-y-1/2 border-y-4 border-gray-800 text-sm font-bold flex items-center justify-center py-1">
                <IconMaintenance class="w-5 mr-1"></IconMaintenance>
                UNDER MAINTENANCE
            </div>
            <div v-if="app.status != 2" class="group absolute top-3 right-3 text-neutral-400 hover:text-neutral-200 transition-all duration-300">
                <iconInfo class="w-8 h-8" @click.stop.prevent="toggleInfo(app.id)"></iconInfo>
            </div>
            <div class="w-full aspect-square flex items-center justify-center rounded-xl">
                <img :src="(app.logo == null) ? noImage : app.logo" alt="" class="aspect-square shadow shadow-gray-500 rounded-lg">
            </div>
            <div class="w-full h-[calc(100%-162px)] flex items-center overflow-hidden">
                <h1 class="font-bold text-gray-700 text-center text-sm w-full whitespace-nowrap">{{ truncateSentence(app.name) }}</h1>
            </div>
        </div>
    </a>
</template>

<script setup>

    import { ref } from 'vue';
    import noImage from '@/assets/no-image.png';
    import iconInfo from '@/components/icons/iconInfo.vue';
    import iconClose from '@/components/icons/iconClose.vue';
    import IconMaintenance from '@/components/icons/iconMaintenance.vue';

    defineProps({
        app: Object
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