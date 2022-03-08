<script setup lang="ts">
import { ref, computed } from 'vue';
const props = defineProps<{ data: { nombrePresupuesto: string, cliente: string, presupuesto: number, id: number }[] }>();
let copy = ref(props.data)
let projects = computed(() => copy.value);
const handleOrder = (order: string) => {
    if (order === 'cost') {
        projects.value.sort((a, b) => (a.presupuesto > b.presupuesto) ? 1 : -1);
    }
    if (order === 'name') {
        projects.value.sort((a, b) => (a.nombrePresupuesto > b.nombrePresupuesto) ? 1 : -1);
    }
    if (order === 'reset') {
        projects.value.sort((a, b) => (a.id > b.id) ? 1 : -1);
    }
}
</script>

<template>
    <div>
        <div class="mb-4 flex gap-3">
            <button
                @click="handleOrder('name')"
                class="px-4 py-2 rounded-md shadow-orange-700 shadow-md bg-orange-500 text-white"
            >Ordenar por nombre</button>
            <button
                @click="handleOrder('cost')"
                class="px-4 py-2 rounded-md shadow-orange-700 shadow-md bg-orange-500 text-white"
            >Ordenar por precio</button>
            <button
                @click="handleOrder('reset')"
                class="px-4 py-2 rounded-md shadow-orange-700 shadow-md bg-orange-500 text-white"
            >Reset</button>
        </div>
        <ul class="flex flex-col justify-center mb-4">
            <li
                v-for="{ nombrePresupuesto, cliente, presupuesto }, index in projects"
                :key="index"
                class="mb-2"
            >
                <p>
                    <strong>Cliente:</strong>
                    {{ cliente }}
                </p>
                <p>
                    <strong>Nombre del Presupuesto:</strong>
                    {{ nombrePresupuesto }}
                </p>
                <p>
                    <strong>Precio:</strong>
                    {{ presupuesto }}
                </p>
                <hr class="mt-2 border-slate-500" />
            </li>
        </ul>
    </div>
</template>

<style scoped>
</style>