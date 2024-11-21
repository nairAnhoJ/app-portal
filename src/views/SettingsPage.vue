<template>
    <div class="h-screen w-screen p-6 relative">
        <Loading v-if="showLoading"></Loading>
        <Alert v-if="showAlert" @click="showAlert = false" :message="message"></Alert>
        <ShowApp v-if="showAppModal" :item="item" @close-show-modal="showAppModal = false" :set-loading="setLoading" @update-row="handleUpdate" @delete-row="handleDelete" @show-alert="handleAlert"></ShowApp>
        <AddApp  v-if="showAddModal" :set-loading="setLoading" @close-add-modal="showAddModal = false" @add-item="handleAdd" @show-alert="handleAlert"></AddApp>
        <div class="space-y-3">
            <RouterLink to="/" class="flex items-center justify-center gap-x-1 bg-blue-500 rounded-full text-white font-bold w-[120px] h-10">
                <iconBack class="w-7"></iconBack>
                BACK
            </RouterLink>
            <h1 class="font-bold text-3xl text-neutral-700">
                Settings
            </h1>
            <div class="space-y-1">
                <div class="h-16 flex items-center justify-between px-2 mb-2">
                    <h2 class="font-bold text-xl">App List</h2>
                    <!-- <div class="z-40 absolute w-8 h-8 right-10 bg-blue-500 animate-ping rounded-full hover:animate-none"></div> -->
                    <button @click="showAddAppModal" class="before:content-[''] before:z-40 before:block before:opacity-50 before:absolute before:left-[6px] before:bg-blue-500 before:animate-pulse2 before:w-9 before:h-9 before:rounded-full hover:before:animate-none hover:w-24 hover:px-4 duration-300 z-50 text-white h-12 w-12 group bg-blue-500 flex items-center justify-start rounded-full px-3 relative flex-nowrap after:content-[''] after:z-40 after:block after:opacity-30 after:absolute after:left-[6px] after:bg-blue-500 after:animate-pulse3 after:w-9 after:h-9 after:rounded-full hover:after:animate-none">
                        <iconPlus class="h-6 w-6 z-50"></iconPlus>
                        <p class="absolute opacity-0 group-hover:opacity-100 left-11 z-50 duration-200">Add</p>
                    </button>
                </div>
                <div class="relative h-96 overflow-hidden">
                    <div class="absolute pr-[10px] w-full">
                        <table class="w-full rounded-t-lg overflow-hidden">
                            <thead>
                                <tr class="bg-blue-500 text-white border-b border-neutral-300">
                                    <th class="text-left text-xl p-2">Name</th>
                                    <th class="text-xl w-96">Status</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="overflow-y-scroll max-h-[328px] rounded-t-lg mt-2">
                        <table class="w-full rounded-t-lg">
                            <thead class="opacity-0">
                                <tr class="bg-blue-500 text-white border-b border-neutral-300">
                                    <th class="text-left text-xl px-2 py-1">Name</th>
                                    <th class="text-xl w-96">Status</th>
                                </tr>
                            </thead>
                            <tbody class="">
                                <tr v-if="!isLoaded">
                                    <th class="text-center p-2" colspan="3">
                                        Loading...
                                    </th>
                                </tr>
                                <tr v-for="item in SettingsStore.collection" :key="item.id" @click="showItemModal(item.id)" class="border-b border-neutral-300 cursor-pointer hover:bg-gray-200">
                                    <th class="text-left p-2">{{ item.name }}</th>
                                    <td class="justify-center flex items-center p-2 w-96"><p :class="statusColor[item.status]" class="rounded-full px-4 font-semibold">{{ statusName[item.status] }}</p></td>
                                    <!-- <td class="text-center w-96">EDIT | DELETE</td> -->
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useSettingsStore } from '@/stores/SettingsStore';
    import ShowApp from '@/components/modules/settings/ShowAppModal.vue';
    import AddApp from '@/components/modules/settings/AddAppModal.vue';
    import Loading from '@/components/LoadingFullScreen.vue';
    import Alert from '@/components/Alert.vue';
    import iconPlusInCircle from '@/components/icons/iconPlusInCircle.vue';
    import iconPlus from '@/components/icons/iconPlus.vue';
    import iconBack from '@/components/icons/iconBack.vue';
    import { RouterLink } from 'vue-router';

    const SettingsStore = useSettingsStore();
    const statusName = ['Inactive', 'Active', 'Under Maintenance'];
    const statusColor = ['bg-red-400', 'bg-green-400', 'bg-amber-400'];
    const isLoaded = ref(false);

    const showAppModal = ref(false);
    const showAddModal = ref(false);
    const showLoading = ref(false);
    const showAlert = ref(false);
    const message = ref();
    const item = ref({});

    onMounted(async () => {
        SettingsStore.collection = {};
        await SettingsStore.index();
        isLoaded.value = true;
    });

    function setLoading(isLoading) {
        showLoading.value = isLoading;
    }

    function showAddAppModal() {
        showAddModal.value = true;
    }

    async function showItemModal(id){
        showLoading.value = true;
        await SettingsStore.show(id);
        item.value = SettingsStore.item;
        showAppModal.value = true;
        showLoading.value = false;
    }

    function handleAdd(addItem){
        console.log(SettingsStore.collection);
        console.log(addItem);
        
        SettingsStore.collection.push(addItem);
    }

    function handleUpdate(updatedItem){
        const index = SettingsStore.collection.findIndex(item => item.id == updatedItem.id);
        
        if (index != -1) {
            SettingsStore.collection[index] = updatedItem;
        }
        showAppModal.value = false;
    }

    function handleDelete(deleteItem){
        const index = SettingsStore.collection.findIndex((item) => item.id === deleteItem);
        console.log('index: '+index);
        if (index !== -1) {
            SettingsStore.collection.splice(index, 1);
        }
        showAppModal.value = false;
    }

    function handleAlert(alertMessage){
        message.value = alertMessage;
        showAlert.value = true;
    }
</script>



<!-- Developed by: IT Team -->