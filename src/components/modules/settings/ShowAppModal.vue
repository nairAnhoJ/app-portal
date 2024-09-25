<template>
    <!--  v-if="isAddModalVisible" -->
    <div class="h-screen w-screen bg-neutral-900 bg-opacity-60 fixed top-0 left-0 z-[100] flex items-center justify-center">
        <div class="w-[800px] bg-gray-50 rounded-lg">
            <div class="p-5 flex items-center justify-between border-b border-gray-300">
                <div class="font-bold text-2xl text-gray-600">
                    {{ item.name }}
                </div>
                <div>
                    <button type="button" class="w-8 flex items-center hover:scale-105 group">
                        <IconEdit @click="isAddModalVisible = !isAddModalVisible" class="w-7 h-7 text-blue-500"></IconEdit>
                        <Tooltip tooltipText='Edit' class="bg-gray-300 text-gray-700"></Tooltip>
                    </button>
                </div>
            </div>
            <div class="p-5 border-b border-gray-300 text-gray-700">
                <div class="leading-4">
                    <h2 class="font-semibold">Description</h2>
                    <p class="text-sm">{{ item.description }}</p>
                </div>
                <div class="mt-3 leading-4">
                    <h2 class="font-semibold">Link</h2>
                    <a :href="item.link" target="_blank" class="text-sm hover:underline">{{ item.link }}</a>
                </div>
                <div class="mt-3 leading-4">
                    <h2 class="font-semibold">Status</h2>
                    <p :class="statusColor[item.status]" class="text-sm font-bold">{{ statusName[item.status] }}</p>
                </div>
                <div class="mt-3 leading-4">
                    <h2 class="font-semibold">Clicks</h2>
                    <p class="text-sm">{{ item.clicks }}</p>
                </div>
            </div>
            <div class="p-5">
                <button @click="$emit('close')" class="bg-neutral-100 hover:bg-neutral-200 border border-gray-300 text-lg text-gray-600 tracking-wide px-6 py-2 rounded-lg font-bold">
                    CLOSE
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import IconEdit from '@/components/icons/IconEdit.vue';
    import Tooltip from '@/components/Tooltip.vue';

    const isAddModalVisible = ref(false);
    const statusName = ['Inactive', 'Active', 'Under Maintenance'];
    const statusColor = ['text-red-500', 'text-green-500', 'text-amber-500'];
    // const errors = ref({});
    // const loadingElement = document.getElementById('loading');

    const props = defineProps({
        item: Object,
        showItem: Boolean,
    });
</script>