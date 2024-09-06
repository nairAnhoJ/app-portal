<script setup>
    const props = defineProps({
        tooltipText: {
            type: String,
            required: true,
        }
    });
</script>

<template>
    <div>
        <span 
            class="hidden 
            group-hover:flex 
            bg-gray-600 
            absolute 
            px-5 
            py-1 
            rounded-md 
            text-white 
            top-1/2 
            -translate-y-1/2 
            left-[110%] 
            whitespace-nowrap 
            z-50 

            after:contents-[''] 
            after:absolute 
            after:top-1/2 
            after:-translate-y-1/2 
            after:left-[1px] 
            after:-translate-x-full 
            
            after:border-8 
            after:border-y-transparent 
            after:border-l-transparent 
            after:border-r-gray-600"
        >{{ tooltipText }}</span>
    </div>
</template>