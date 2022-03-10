<script setup lang="ts">
import { ref, computed } from 'vue';
import { Projectist } from '../interfaces/interfaces';
import ListFiltered from './ListFiltered.vue'
const props = defineProps<{ data: Projectist[] }>();
const copy = ref(props.data)
const search = ref('');
const filteredProjects = computed(() =>
    props.data.filter((project) => project.nombrePresupuesto.toLowerCase().includes(search.value.toLocaleLowerCase())
        || project.cliente.toLowerCase().includes(search.value.toLowerCase())));
const projects = computed(() => copy.value);
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
        <div>
            <label for="search">
                Filtra por nombre cliente o presupuesto:
                <input
                    type="text"
                    v-model="search"
                    id="search"
                    class="border-2 border-slate-500"
                />
            </label>
        </div>
        <div class="my-4 flex gap-3">
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
                v-for="{ nombrePresupuesto, cliente, presupuesto, fullPath }, index in projects"
                :key="index"
                class="mb-2"
                v-if="search === ''"
            >
                <p>
                    <strong>Cliente: </strong>
                    {{ cliente }}
                </p>
                <p>
                    <strong>Nombre del Presupuesto: </strong>
                    <router-link
                        :to="fullPath"
                        target="_blank"
                        class="text-orange-500 underline"
                    > {{ nombrePresupuesto }}</router-link>
                </p>
                <p>
                    <strong>Precio:</strong>
                    {{ presupuesto }}
                </p>
                <hr class="mt-2 border-slate-500" />
            </li>
            <ListFiltered v-if="search !== ''" :data="filteredProjects" />
        </ul>
    </div>
</template>

<style scoped>
</style>