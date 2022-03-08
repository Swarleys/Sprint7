<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{ data: {nombrePresupuesto: string, cliente: string, presupuesto: number }[] }>();

const projects = ref(props.data);
</script>

<template>
    <ul class="flex flex-col justify-center mb-4">
        <li
            v-for="{ nombrePresupuesto, cliente, presupuesto }, index in projects"
            :key="index"
            class="mb-2"
        >
            <p><strong>Cliente:</strong> {{ cliente }}</p>
            <p><strong>Nombre del Presupuesto:</strong> {{ nombrePresupuesto }}</p>
            <p><strong>Precio:</strong> {{ presupuesto }}</p>
        <hr class="mt-2 border-slate-500">
        </li>
    </ul>
</template>

<style scoped>
</style>