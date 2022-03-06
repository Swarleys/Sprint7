<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';
import CustomInput from './CustomInput.vue';
const paginas = ref(1);
const idiomas = ref(1);
const totalWeb = computed(() => paginas.value * idiomas.value * 30);
const emits = defineEmits<{
    (e: 'totalWeb', subTotal: number): void,
}>();

const handlePaginas = (pag: number): void => {
    paginas.value = pag;
    emits("totalWeb", totalWeb.value)
}
const handleIdiomas = (idiom: number): void => {
    idiomas.value = idiom;
    emits("totalWeb", totalWeb.value)
}

onUnmounted(() => emits("totalWeb", 30))
</script>

<template>
    <div class="p-5 border-black border-2 inline-block rounded-xl my-4 scalePanel">
        <CustomInput :numVal="paginas" label="Número de paginas:" @changeNumVal="handlePaginas" />
        <CustomInput :numVal="idiomas" label="Número de idiomas:" @changeNumVal="handleIdiomas" />
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
    animation: panell 500ms ease-in-out ;
}
</style>