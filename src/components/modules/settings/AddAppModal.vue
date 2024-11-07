<template>
    <div class="h-screen w-screen bg-neutral-900 bg-opacity-60 fixed top-0 left-0 z-[90] flex items-center justify-center">
        <form @submit.prevent="store" class="w-[850px] bg-gray-50 rounded-lg">
            <div class="p-5 flex items-center justify-between border-b border-gray-300 w-full">
                <div class="font-bold text-xl text-gray-600 w-full">
                    <h2 class="font-bold mb-1">Name</h2>
                    <input type="text" v-model="name" class="border border-gray-400 p-2 rounded-lg w-full" :class="{ 'border-red-500 border-2':errors && errors.name }">
                    <p v-if="errors && errors.name" class="text-red-500 text-sm italic font-normal">{{ errors.name[0] }}</p>
                </div>
            </div>
            <div class="p-5 border-b border-gray-300 text-gray-700">
                <div class="leading-4">
                    <h2 class="font-bold mb-1">Description</h2>
                    <textarea v-model="description" class="w-full border h-28 border-gray-400 p-2 rounded-lg resize-none" :class="{ 'border-red-500 border-2':errors && errors.description }"></textarea>
                    <p v-if="errors && errors.description" class="text-red-500 text-sm italic font-normal">{{ errors.description[0] }}</p>
                </div>
                <div class="mt-3 leading-4">
                    <h2 class="font-bold mb-1">Link</h2>
                    <input type="text" v-model="link" class="border border-gray-400 p-2 rounded-lg w-full" :class="{ 'border-red-500 border-2':errors && errors.link }">
                    <p v-if="errors && errors.link" class="text-red-500 text-sm italic font-normal">{{ errors.link[0] }}</p>
                </div>
                <div class="mt-3 leading-4">
                    <h2 class="font-bold mb-1">Status</h2>
                    <select v-model="status" class="border border-gray-400 p-2 rounded-lg w-full">
                    <option v-for="(eachStatus, index) in statusName" :value="index">{{ eachStatus }}</option>
                    </select>
                </div>
                <div class="mt-3 leading-4">
                    <h2 class="font-bold mb-1">Logo</h2>
                    <input type="file" class="border border-gray-400 p-2 rounded-lg w-full" accept=".jpg,.jpeg,.png" @change="handleFileUpload" :class="{ 'border-red-500 border-2':errors && errors.logo }">
                    <p v-if="errors && errors.logo" class="text-red-500 text-sm italic font-normal">{{ errors.logo[0] }}</p>
                </div>
            </div>
            <div class="p-5 space-x-3">
                <button type="submit" class="bg-blue-500 hover:bg-blue-600 border border-blue-300 text-lg text-gray-100 tracking-wide px-6 py-2 rounded-lg font-bold">
                    SAVE
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
        setLoading: Function,
    });

    const name = ref('');
    const description = ref('');
    const link = ref('');
    const status = ref(1);
    const logo = ref(null);

    // const emit = defineEmits(['closeEditModal', 'updateItem', 'showAlert']);

    const handleFileUpload = (event) => {
        console.log(event);
        logo.value = event.target.files[0];
    };

    async function store() {
        
        try {
            // Show Loading
            props.setLoading(true);

            // Form Data
            const updatedItem = new FormData();
            updatedItem.append('name', name.value);
            updatedItem.append('description', description.value);
            updatedItem.append('link', link.value);
            updatedItem.append('status', status.value);
            if (logo.value) {
                updatedItem.append('logo', logo.value);
            }
            console.log(updatedItem);
            

            // Update Data
            await SettingsStore.store(updatedItem);

        } catch (error) {
            // console.log(errors.value);
        }finally{       
            props.setLoading(false);
        }

        if (Object.keys(SettingsStore.errors).length) {
            errors.value = 'An unexpected error occurred. Please try again later.';
            if (SettingsStore.errors.status === 422) {
                errors.value = SettingsStore.errors.data.errors || {};
            } else {
                errors.value = 'An unexpected error occurred. Please try again later.';
            }
        }else{
            // emit('updateItem', SettingsStore.item);
            // emit('closeEditModal');

            // Alert
            emit('showAlert', 'New app has been added.');
        }

    }
</script>