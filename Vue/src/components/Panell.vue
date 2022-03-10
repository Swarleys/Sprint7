<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';
import CustomInput from './CustomInput.vue';
const props = defineProps<{ pages: number, languages: number }>();
const paginas = ref(props.pages);
const idiomas = ref(props.languages);
const totalWeb = computed(() => paginas.value * idiomas.value * 30);
const emits = defineEmits<{
    (e: 'totalWeb', subTotal: number): void,
    (e: 'newPages', newPages: number): void,
    (e: 'newLanguages', NewLanguages: number): void,
}>();

const handlePaginas = (pag: number): void => {
    paginas.value = pag;
    emits("totalWeb", totalWeb.value)
    emits("newPages", paginas.value)
}
const handleIdiomas = (idiom: number): void => {
    idiomas.value = idiom;
    emits("totalWeb", totalWeb.value)
    emits("newLanguages", idiomas.value)
}

onUnmounted(() => { 
    emits("totalWeb", 30)
    emits("newPages", 1)
    emits("newLanguages", 1)
    })
</script>

<template>
    <div class="p-5 border-black border-2 inline-block rounded-xl my-4 scalePanel">
        <CustomInput
            :numVal="paginas"
            label="Número de paginas:"
            description="Lugar donde indicar la cantidad de paginas que tendra tu pagina web."
            @changeNumVal="handlePaginas"
        />
        <CustomInput
            :numVal="idiomas"
            label="Número de idiomas:"
            description="Lugar donde indicar la cantidad de idiomas en los que estara disponible tu pagina web."
            @changeNumVal="handleIdiomas"
        />
    </div>
</template>


<style scoped>
@keyframes panell {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}

.scalePanel {
    transform-origin: top left;
    animation: panell 500ms ease-in-out;
}
</style>