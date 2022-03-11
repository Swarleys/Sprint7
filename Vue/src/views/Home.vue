<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ProjectList, PossibleProjects } from '../interfaces/interfaces';
import Panell from '../components/Panell.vue';
import ListProjects from '../components/ListProjects.vue';

const projectSetup = ref([] as number[]);
const presupuesto = ref('');
const cliente = ref('');
let paginas = ref(1);
let idiomas = ref(1);
const presupuestoNoError = ref(true);
const clienteNoError = ref(true);
const cantidadError = ref(true);
const projectList = ref([] as ProjectList[]);
const totalWeb = ref(paginas.value * idiomas.value * 30);
let id = 0;
const possibleProjects: PossibleProjects[] = [
    { description: 'Una pagina web (500€)', price: 500, name: 'web' },
    { description: 'Una consultoria de SEO (300€)', price: 300, name: 'seo' },
    { description: 'Una campaña de Google Ads (200€)', price: 200, name: 'ads' }
]

const totalOptions = computed(() => projectSetup.value.reduce((prev: number, item: number): number => prev + item, 0));
const totalConPaginas = computed(() => projectSetup.value.includes(500) ? totalOptions.value + totalWeb.value : totalOptions.value);
const handleTotalWeb = (web: number): number => totalWeb.value = web;
const handleIdiomas = (languages: number): number => idiomas.value = languages;
const handlePaginas = (pages: number): number => paginas.value = pages;
const addProjects = () => {
    clienteNoError.value = cliente.value ? true : false;
    presupuestoNoError.value = presupuesto.value ? true : false;
    cantidadError.value = totalConPaginas.value ? true : false;

    if (cliente.value && presupuesto.value && totalConPaginas.value) {
        projectList.value.push({ nombrePresupuesto: presupuesto.value, cliente: cliente.value, presupuesto: totalConPaginas.value, id, fullPath: route.fullPath })
        id++;
        projectSetup.value = [];
        presupuesto.value = '';
        cliente.value = '';
        paginas.value = 1;
        idiomas.value = 1;
    }
}

const route = useRoute();
const router = useRouter();
onMounted(() => {
    if (route.query.web === 'true') {
        projectSetup.value.push(500)
        paginas.value = Number(route.query.paginas ?? 1);
        idiomas.value = Number(route.query.idiomas ?? 1);
        totalWeb.value = (paginas.value * idiomas.value * 30)
    }
    route.query.seo === 'true' && projectSetup.value.push(300)
    route.query.ads === 'true' && projectSetup.value.push(200)
    if (route.query.nombrePresupuesto) {
        presupuesto.value = decodeURI(route.query.nombrePresupuesto.toString());
    }
    if (route.query.nombreCliente) {
        cliente.value = decodeURI(route.query.nombreCliente.toString());
    }
})

const updatedQueryParams = () => {
    router.replace({
        query: {
            paginas: paginas.value,
            idiomas: idiomas.value,
            nombrePresupuesto: encodeURI(presupuesto.value),
            nombreCliente: encodeURI(cliente.value),
            web: projectSetup.value.includes(500).toString(),
            seo: projectSetup.value.includes(300).toString(),
            ads: projectSetup.value.includes(200).toString(),
        }
    })
}

watch([paginas, idiomas, projectSetup, presupuesto, cliente], (currentValue, prevValue) => {
    updatedQueryParams();
})

</script>

<template>
    <div class="flex justify-around mb-4 flex-col sm:flex-row">
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
                        <Panell
                            @totalWeb="handleTotalWeb"
                            @newPages="handlePaginas"
                            @newLanguages="handleIdiomas"
                            :pages="paginas"
                            :languages="idiomas"
                        />
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
        <ListProjects v-if="projectList.length > 0" :data="projectList" class="self-start m-4" />
    </div>

    <router-link
        to="/"
        class="px-4 py-2 rounded-md shadow-orange-700 shadow-md bg-orange-500 text-white block max-w-fit mx-auto"
    >Volver al inicio</router-link>
</template>