<template>
    <div class="h-screen w-screen bg-gray-700 bg-opacity-60 fixed top-0 left-0 z-[90] flex items-center justify-center">
        <EditAppModal v-if="showEditModal" :item="item" @update-item="handleUpdate" @show-alert="handleAlert" @close-edit-modal="showEditModal = false" :set-loading="setLoading"></EditAppModal>
        <DeleteAppModal v-if="showDeleteModal" :item="item" @delete-item="handleDelete" @show-alert="handleAlert" @close-delete-modal="showDeleteModal = false" :set-loading="setLoading"></DeleteAppModal>
        <div class="w-[800px] bg-gray-50 rounded-lg">
            <div class="p-5 flex items-center justify-between border-b border-gray-300">
                <div class="font-bold text-2xl text-gray-600">
                    {{ item.name }}
                </div>
                <div class="flex gap-x-1">
                    <button type="button" @click="showEditAppModal" class="w-8 flex items-center hover:scale-105 group">
                        <IconEdit class="w-7 h-7 text-blue-500"></IconEdit>
                        <Tooltip tooltipText='Edit'></Tooltip>
                    </button>
                    <button type="button" @click="showDeleteAppModal" class="w-8 flex items-center hover:scale-105 group">
                        <IconDelete class="w-7 h-7 text-red-500"></IconDelete>
                        <Tooltip tooltipText='Delete'></Tooltip>
                    </button>
                </div>
            </div>
            <div class="p-5 border-b border-gray-300 text-gray-700">
                <div class="leading-4">
                    <h2 class="font-bold">Description</h2>
                    <p class="text-sm">{{ item.description }}</p>
                </div>
                <div class="mt-3 leading-4">
                    <h2 class="font-bold">Link</h2>
                    <a :href="item.link" target="_blank" class="text-sm hover:underline">{{ item.link }}</a>
                </div>
                <div class="mt-3 leading-4">
                    <h2 class="font-bold">Status</h2>
                    <p :class="statusColor[item.status]" class="text-sm font-bold">{{ statusName[item.status] }}</p>
                </div>
                <!-- <div class="mt-3 leading-4">
                    <h2 class="font-bold">Clicks</h2>
                    <p class="text-sm">{{ item.clicks }}</p>
                </div> -->
            </div>
            <div class="p-5">
                <button @click="$emit('closeShowModal')" class="bg-neutral-100 hover:bg-neutral-200 border border-gray-300 text-lg text-gray-600 tracking-wide px-6 py-2 rounded-lg font-bold">
                    CLOSE
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import IconEdit from '@/components/icons/IconEdit.vue';
    import IconDelete from '@/components/icons/IconDelete.vue';
    import Tooltip from '@/components/Tooltip.vue';
    import EditAppModal from './EditAppModal.vue';
    import DeleteAppModal from './DeleteAppModal.vue';
    import Loading from '@/components/LoadingFullScreen.vue';

    const statusName = ['Inactive', 'Active', 'Under Maintenance'];
    const statusColor = ['text-red-500', 'text-green-500', 'text-amber-500'];

    const showEditModal = ref(false);
    const showDeleteModal = ref(false);
    const showLoading = ref(false);

    const props = defineProps({
        item: Object,
        setLoading: Function,
    });

    const emit = defineEmits(['deleteRow', 'closeShowModal', 'showAlert']);

    function showEditAppModal(){
        props.setLoading(true);
        showEditModal.value = true;
        props.setLoading(false);
    }

    function showDeleteAppModal(){
        props.setLoading(true);
        showDeleteModal.value = true;
        props.setLoading(false);
    }

    function handleUpdate(updatedItem){
        emit('updateRow', updatedItem);
    }

    function handleDelete(deleteID){
        emit('deleteRow', deleteID);
    }
    function handleAlert(alertMessage){
        console.log(alertMessage);
        
        emit('showAlert', alertMessage);
    }
</script>