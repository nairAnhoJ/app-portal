<template>
    <div class="h-screen w-screen p-6 relative">
        <Loading v-if="showLoading"></Loading>
        <ShowApp v-if="showAppModal" :item="item" @closeShowModal="showAppModal = false" :setLoading="setLoading"></ShowApp>
        <div class="space-y-3">
            <h1 class="font-bold text-3xl text-neutral-700">
                Settings
            </h1>
            <div class="space-y-1">
                <div class="h-8 flex items-center justify-between px-2">
                    <h2 class="font-bold text-xl">App List</h2>
                    <button class="text-blue-500 h-full group">
                        <iconPlusInCircle class="h-full"></iconPlusInCircle>
                    </button>
                </div>
                <table class="w-full rounded-t-lg overflow-hidden">
                    <thead>
                        <tr class="bg-blue-500 text-white border-b border-neutral-300">
                            <th class="text-left text-xl p-2">Name</th>
                            <th class="text-xl w-96">Status</th>
                            <th class="text-xl w-96">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="!isLoaded">
                            <th class="text-center p-2" colspan="3">
                                Loading...
                            </th>
                        </tr>
                        <tr v-for="item in SettingsStore.collection" :key="item.id" @click="showItemModal(item.id)" class="border-b border-neutral-300 cursor-pointer hover:bg-gray-200">
                            <th class="text-left p-2">{{ item.name }}</th>
                            <td class="justify-center flex items-center p-2 w-96"><p :class="statusColor[item.status]" class="rounded-full px-4 font-semibold">{{ statusName[item.status] }}</p></td>
                            <td class="text-center w-96">EDIT | DELETE</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useSettingsStore } from '@/stores/SettingsStore';
    import ShowApp from '@/components/modules/settings/ShowAppModal.vue';
    import Loading from '@/components/LoadingFullScreen.vue';
    import iconPlusInCircle from '@/components/icons/IconPlusInCircle.vue';

    const SettingsStore = useSettingsStore();
    const statusName = ['Inactive', 'Active', 'Under Maintenance'];
    const statusColor = ['bg-red-400', 'bg-green-400', 'bg-amber-400'];
    const isLoaded = ref(false);

    const showAppModal = ref(false);
    const showLoading = ref(false);
    const item = ref({});

    onMounted(async () => {
        await SettingsStore.index();
        isLoaded.value = true;
    });

    function setLoading(isLoading) {
    showLoading.value = isLoading;
    }

    async function showItemModal(id){
        showLoading.value = true;
        await SettingsStore.show(id);
        item.value = SettingsStore.item;
        showAppModal.value = true;
        showLoading.value = false;
        console.log(item);
    }
</script>



<!-- Developed by: IT Team -->