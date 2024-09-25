import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "@/axios";
import router from "@/Router";

export const useAuthStore = defineStore('auth', () => {
    // STATE
        const token = ref(localStorage.getItem('token') || null);
        const errors = ref({});
    // STATE
    
    // ACTION
        function isAuthenticated() {
            return !!token.value;
        }

        async function login(username, password) {
            errors.value = {};
            try{
                const response = await axios.post('/auth/login', {
                    username: username,
                    password: password,
                });
                
                token.value = response.data.token;
                localStorage.setItem('token', response.data.token);
                router.push({ name: 'home' });
            }catch (error) {
                if (error.response) {
                    if (username && password) {
                        errors.value.message = error.response.data.message;
                    } else {
                        errors.value = error.response.data.errors || {};
                    }
                } else {
                    errors.value = 'An unexpected error occurred. Please try again later.';
                }
            }
        }

        async function logout(){
            try {
                const response = await axios.post('/auth/logout');
                token.value = null;
                localStorage.removeItem('token');
                router.push({ name: 'home' });
                console.log('Logged Out');
                
            } catch (error) {
                console.log(error.response);
            }
        }
    // ACTION




    //  RETURN
        return {
            token,
            isAuthenticated,
            errors,
            login,
            logout,

        };
    // RETURN
});

