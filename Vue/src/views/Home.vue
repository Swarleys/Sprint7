<script setup lang="ts">
import { computed, ref } from 'vue';
import Panell from '../components/Panell.vue';
import ListProjects from '../components/ListProjects.vue';
const projectSetup = ref([] as number[]);
const presupuesto = ref('');
const cliente = ref('');
const presupuestoNoError = ref(true);
const clienteNoError = ref(true);
const cantidadError = ref(true);
let id = 0;
const possibleProjects: { description: string, price: number, name: string }[] = [
    { description: 'Una pagina web (500€)', price: 500, name: 'web' },
    { description: 'Una consultoria de SEO (300€)', price: 300, name: 'seo' },
    { description: 'Una campaña de Google Ads (200€)', price: 200, name: 'ads' }
]
const totalWeb = ref(30);
const totalOptions = computed(() => projectSetup.value.reduce((prev: number, item: number): number => prev + item, 0));
const totalConPaginas = computed(() => projectSetup.value.includes(500) ? totalOptions.value + totalWeb.value : totalOptions.value);
const handleTotalWeb = (web: number): number => totalWeb.value = web;
const projectList = ref([] as { nombrePresupuesto: string, cliente: string, presupuesto: number, id: number }[]);
const addProjects = () => {
    if (!cliente.value) { clienteNoError.value = false };
    if (!presupuesto.value) { presupuestoNoError.value = false };
    if (!totalConPaginas.value) { cantidadError.value = false };
    if (cliente.value) { clienteNoError.value = true };
    if (presupuesto.value) { presupuestoNoError.value = true };
    if (totalConPaginas.value) { cantidadError.value = true };
    if (cliente.value && presupuesto.value && totalConPaginas.value) {
        projectList.value.push({ nombrePresupuesto: presupuesto.value, cliente: cliente.value, presupuesto: totalConPaginas.value, id })
        clienteNoError.value = true;
        presupuestoNoError.value = true;
        cantidadError.value = true;
        id++;
        projectSetup.value = [];
        presupuesto.value = '';
        cliente.value = '';
    }
}
</script>

<template>
    <div class="flex justify-around mb-4">
        <section class="m-4 mb-8">
            <p class="text-xl mb-4">¿Qué quieres hacer?</p>
            <form @submit.prevent>
                <label for="nombreCliente" class="block mb-2">
                    Nombre del Cliente:
                    <input
                        type="text"
                        id="nombreCliente"
                        name="nombreCliente"
                        v-model="cliente"
                        class="border-2 border-slate-500 focus:outline-none"
                    />
                    <span
                        v-if="!clienteNoError"
                        class="block text-red-400 my-2"
                    >Tiene que introducir un nombre de cliente</span>
                </label>
                <label for="nombrePresupuesto" class="block mb-2">
                    Nombre del presupuesto:
                    <input
                        type="text"
                        id="nombrePresupuesto"
                        name="nombrePresupuesto"
                        v-model="presupuesto"
                        class="border-2 border-slate-500 focus:outline-none"
                    />
                    <span
                        v-if="!presupuestoNoError"
                        class="block text-red-400 my-2"
                    >Tiene que introducir un nombre de Presupuesto</span>
                </label>
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
                <p
                    v-if="!cantidadError"
                    class="text-red-400 my-2"
                >Tienes que seleccionar alguna opción para generar un presupuesto.</p>
                <p v-if="totalOptions > 0" class="my-6">Precio total: {{ totalConPaginas }}€</p>
                <input
                    type="button"
                    value="Guardar"
                    class="px-4 py-2 rounded-md shadow-orange-700 shadow-md bg-orange-500 text-white mx-4"
                    @click="addProjects"
                />
            </form>
        </section>
        <ListProjects v-if="projectList.length > 0" :data="projectList" class="self-start mt-4" />
    </div>

    <router-link
        to="/"
        class="px-4 py-2 rounded-md shadow-orange-700 shadow-md bg-orange-500 text-white block max-w-fit mx-auto"
    >Volver al inicio</router-link>
</template>