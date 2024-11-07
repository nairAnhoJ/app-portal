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
        
        async function store(app){
            try {
                const response = await axios.post(`${resource}`, app);
                item.value = response.data.data;
            } catch (error) {
                console.log(error.response);
                errors.value = error.response;
            }
        }
        
        async function update(id, app){
            try {
                const response = await axios.post(`${resource}/${id}?_method=PATCH`, app);
                item.value = response.data.data;
            } catch (error) {
                console.log(error.response);
                errors.value = error.response;
            }
        }
    // ACTION


    //  RETURN
        return {
            index,
            show,
            store,
            update,
            collection,
            item,
            errors
        };
    // RETURN
});

