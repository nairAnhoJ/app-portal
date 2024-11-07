<template>
    <div class="h-screen w-screen bg-neutral-900 bg-opacity-60 fixed top-0 left-0 z-[90] flex items-center justify-center">
        <form @submit.prevent="destroy" class="w-[850px] bg-gray-50 rounded-lg">
            <div class="p-5 flex items-center justify-between border-b border-gray-300 w-full">
                <div class="font-bold text-xl text-gray-600 w-full">
                    <h2 class="font-bold mb-1">Delete</h2>
                    <!-- <input type="text" v-model="name" class="border border-gray-400 p-2 rounded-lg w-full" :class="{ 'border-red-500 border-2':errors && errors.name }">
                    <p v-if="errors && errors.name" class="text-red-500 text-sm italic font-normal">{{ errors.name[0] }}</p> -->
                </div>
            </div>
            <div class="p-5 border-b border-gray-300 text-gray-700">
                Are you sure you want to delete this?
                <div class="mt-3">
                    <p class="text-sm">Name: <span class="font-bold text-lg">{{ item.name }}</span></p>
                </div>
            </div>
            <div class="p-5 space-x-3">
                <button type="submit" class="bg-red-500 w-28 hover:bg-red-600 border border-red-300 text-lg text-gray-100 tracking-wide px-6 py-2 rounded-lg font-bold">
                    YES
                </button>
                <button @click="$emit('closeDeleteModal')" type="button"class="w-28 bg-neutral-100 hover:bg-neutral-200 border border-gray-300 text-lg text-gray-600 tracking-wide px-6 py-2 rounded-lg font-bold">
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
    const errors = ref({});

    const props = defineProps({
        item: Object,
        setLoading: Function,
    });

    const id = ref(props.item.id);

    // const emit = defineEmits(['closeEditModal', 'updateItem', 'showAlert']);
    const emit = defineEmits(['closeDeleteModal', 'deleteItem', 'showAlert']);

    async function destroy() {
        console.log('start: ' + id.value);
        
        try {
            // Show Loading
            props.setLoading(true);

            // Update Data
            await SettingsStore.destroy(id.value);

        } catch (error) {
            // console.log(errors.value);
        }finally{       
            props.setLoading(false);
        }
        

        if (Object.keys(SettingsStore.errors).length > 0) {
            errors.value = 'An unexpected error occurred. Please try again later.';
            if (SettingsStore.errors.status === 422) {
                errors.value = SettingsStore.errors.data.errors || {};
            } else {
                errors.value = 'An unexpected error occurred. Please try again later.';
            }
        }else{
            emit('deleteItem', SettingsStore.item);

            // Close Modal
            emit('closeDeleteModal');

            // Alert
            emit('showAlert', 'App has been deleted.');
        }

    }
</script>