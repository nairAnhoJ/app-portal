import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "@/axios";
import router from "@/Router";

export const useSettingsStore = defineStore('settings', () => {
    // STATE
        const collection = ref({});
        const item = ref({});
        const errors = ref({});
        const resource = '/app-portal/app-list';
    // STATE
    
    // ACTION
        async function index(){
            try {
                const response = await axios.get(resource);
                collection.value = response.data.data;
            } catch (error) {
                console.log(error.response);
            }
        }
        
        async function show(id){
            try {
                const response = await axios.get(`${resource}/${id}`);
                item.value = response.data.data;
            } catch (error) {
                console.log(error.response);
            }
        }
        
        async function update(id, app){
            try {
                const response = await axios.put(`${resource}/${id}`, app);
                console.log(response.data);
                // item.value = response.data.data;
            } catch (error) {
                console.log(error.response);
            }
        }
    // ACTION




    //  RETURN
        return {
            index,
            show,
            collection,
            item
        };
    // RETURN
});

