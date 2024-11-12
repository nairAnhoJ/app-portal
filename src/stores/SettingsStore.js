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
            errors.value = {};
            try {
                const response = await axios.post(`${resource}`, app);
                item.value = response.data.data;
            } catch (error) {
                console.log(error.response);
                errors.value = error.response;
            }
        }
        
        async function update(id, app){
            errors.value = {};
            try {
                const response = await axios.post(`${resource}/${id}?_method=PATCH`, app);
                item.value = response.data.data;
            } catch (error) {
                console.log(error.response);
                errors.value = error.response;
            }
        }
        
        async function destroy(id){
            try {
                const response = await axios.delete(`${resource}/${id}`);
                console.log(response);
                
                item.value = id;
            } catch (error) {
                console.log(error.response);
            }
        }
        
        async function click(id){
            try {
                const response = await axios.post(`${resource}/${id}/click`);
            } catch (error) {
                console.log(error.response);
            }
        }
    // ACTION


    //  RETURN
        return {
            index,
            show,
            store,
            update,
            destroy,
            click,
            collection,
            item,
            errors
        };
    // RETURN
});

