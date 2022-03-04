<script setup lang="ts">
import { computed, ref } from 'vue';
let projectSetup = ref([]);

let possibleProjects: { description: string, price: number, name: string }[] = [
    { description: 'Una pagina web (500€)', price: 500, name: 'web' },
    { description: 'Una consultoria de SEO (300€)', price: 300, name: 'seo' },
    { description: 'Una campaña de Google Ads (200€)', price: 200, name: 'ads' }
]

let total = computed(() => {
    return projectSetup.value.reduce((prev: number, item: number): number => prev + item, 0);
})
</script>

<template>
    <p>¿Qué quieres hacer?</p>
    <form>
        <div v-for="({ description, price, name }) in possibleProjects" class="mb-3">
            <input type="checkbox" v-model="projectSetup" :value="price" :id="name" class="mr-2" />
            <label :for="name">{{ description }}</label>
        </div>
    </form>
    <p v-if="total > 0">Precio total: {{ total }}€</p>
</template>