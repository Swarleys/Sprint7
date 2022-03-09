<script setup lang="ts">
import { Projectist } from '../interfaces/interfaces';
import { computed} from 'vue'
const props = defineProps<{ data: Projectist[] }>();
const filteredProjects = computed(() => props.data);
</script>

<template>
    <li
        v-for="{ nombrePresupuesto, cliente, presupuesto, fullPath }, index in filteredProjects"
        :key="index"
        class="mb-2"
    >
        <p>
            <strong>Cliente:</strong>
            {{ cliente }}
        </p>
                <p>
                    <strong>Nombre del Presupuesto: </strong>
                    <router-link
                        :to="fullPath"
                        target="_blank"
                        class="text-orange-500 underline"
                    >{{ nombrePresupuesto }}</router-link>
                </p>
        <p>
            <strong>Precio:</strong>
            {{ presupuesto }}
        </p>
        <hr class="mt-2 border-slate-500" />
    </li>
</template>

<style scoped>
</style>