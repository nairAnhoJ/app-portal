<template>
    <div class="h-screen w-screen bg-neutral-900 bg-opacity-60 fixed top-0 left-0 z-[90] flex items-center justify-center">
        <form @submit.prevent="update" class="w-[800px] bg-gray-50 rounded-lg">
            <div class="p-5 flex items-center justify-between border-b border-gray-300 w-full">
                <div class="font-bold text-xl text-gray-600 w-full">
                    <input type="text" v-model="name" id="" class="border border-gray-400 p-2 rounded-lg w-full">
                </div>
            </div>
            <div class="p-5 border-b border-gray-300 text-gray-700">
                <div class="leading-4">
                    <h2 class="font-bold mb-1">Description</h2>
                    <textarea v-model="description" id="" class="w-full border h-28 border-gray-400 p-2 rounded-lg resize-none"></textarea>
                </div>
                <div class="mt-3 leading-4">
                    <h2 class="font-bold mb-1">Link</h2>
                    <input type="text" v-model="link" id="" class="border border-gray-400 p-2 rounded-lg w-full">
                    <!-- <a :href="item.link" target="_blank" class="text-sm hover:underline">{{ item.link }}</a> -->
                </div>
                <div class="mt-3 leading-4">
                    <h2 class="font-bold mb-1">Status</h2>
                    <!-- <p :class="statusColor[item.status]" class="text-sm font-bold">{{ statusName[item.status] }}</p> -->
                     <select v-model="status" id="" class="border border-gray-400 p-2 rounded-lg w-full">
                        <option v-for="(eachStatus, index) in statusName" :value="index">{{ eachStatus }}</option>
                     </select>
                </div>
            </div>
            <div class="p-5 space-x-3">
                <button type="submit" class="bg-blue-500 hover:bg-blue-600 border border-blue-300 text-lg text-gray-100 tracking-wide px-6 py-2 rounded-lg font-bold">
                    UPDATE
                </button>
                <button @click="$emit('closeEditModal')" type="button"class="bg-neutral-100 hover:bg-neutral-200 border border-gray-300 text-lg text-gray-600 tracking-wide px-6 py-2 rounded-lg font-bold">
                    CLOSE
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue';
    import { useSettingsStore } from '@/stores/SettingsStore';

    const SettingsStore = useSettingsStore();
    const statusName = ['Inactive', 'Active', 'Under Maintenance'];
    const errors = ref({});

    const props = defineProps({
        item: Object,
    });

    const name = ref(props.item.name);
    const description = ref(props.item.description);
    const link = ref(props.item.link);
    const status = ref(props.item.status);

    async function update() {
        try {

            // loadingElement.classList.remove('hidden');
            // const response = await updateUser(props.editID, user.value);
            emit('update-row', response.data.data);
            alert.value.type = 'success';
            alert.value.message = 'User updated successfully.';
            emit('show-alert', alert.value);
            isEditModalVisible.value = false;
        } catch (error) {
            if (error.response) {
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors || {};
                } else {
                    errors.value = 'An unexpected error occurred. Please try again later.';
                }
            } else {
                errors.value = 'An unexpected error occurred. Please try again later.';
            }
        }finally{
            loadingElement.classList.add('hidden');
        }
    }
</script>