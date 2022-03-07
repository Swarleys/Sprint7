<script setup lang="ts">
import { computed, ref } from 'vue';
import Panell from '../components/Panell.vue';
const projectSetup = ref([] as number[]);
const possibleProjects: { description: string, price: number, name: string }[] = [
    { description: 'Una pagina web (500€)', price: 500, name: 'web' },
    { description: 'Una consultoria de SEO (300€)', price: 300, name: 'seo' },
    { description: 'Una campaña de Google Ads (200€)', price: 200, name: 'ads' }
]
const totalWeb = ref(30);
const total = computed(() => projectSetup.value.reduce((prev: number, item: number): number => prev + item, 0));
const handleTotalWeb = (pag: number): number => totalWeb.value = pag;
</script>

<template>
    <section class="m-4 mb-8">
        <p class="text-xl mb-4">¿Qué quieres hacer?</p>
        <form>
            <div v-for="({ description, price, name }, index) in possibleProjects" class="mb-3">
                <label :for="name">
                    <input
                        type="checkbox"
                        v-model="projectSetup"
                        :value="price"
                        :id="name"
                        class="mr-l"
                    />
                    {{ description }}
                </label>
                <div v-if="index === 0 && projectSetup.includes(500)">
                    <Panell @totalWeb="handleTotalWeb" />
                </div>
            </div>
        </form>
        <p v-if="total === 0"></p>
        <p v-if="total > 0 && projectSetup.includes(500)">Precio total: {{ total + totalWeb }}€</p>
        <p v-else-if="total > 0">Precio total: {{ total }}€</p>
    </section>
    <router-link
        to="/"
        class="px-4 py-2 rounded-md shadow-orange-700 shadow-md bg-orange-500 text-white mx-4"
    >Volver al inicio</router-link>
</template>