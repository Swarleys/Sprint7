<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';
const paginas = ref(1);
const idiomas = ref(1);
const totalWeb = computed(() => paginas.value * idiomas.value * 30);
const emits = defineEmits<{
    (e: 'totalWeb', subTotal: number): void, 
}>();
const sendTotalWeb = () => {
    paginas.value = paginas.value < 1 ? 1 : paginas.value;
    idiomas.value = idiomas.value < 1 ? 1 : idiomas.value;
    emits("totalWeb", totalWeb.value)
}

onUnmounted(() => emits("totalWeb", 30))
</script>

<template>
<div class="p-5 border-black border-2 inline-block rounded-xl">
    <div>
        <label for="paginas">
            Número de paginas:
            <input
                type="number"
                name="paginas"
                id="paginas"
                v-model="paginas"
                class="ml-2 mb-2 border-[1px] border-slate-600"
                min="1"
                @change="sendTotalWeb"
            />
        </label>
    </div>
    <div>
        <label for="idiomas">
            Número de idiomas:
            <input
                type="number"
                name="idiomas"
                id="idiomas"
                v-model="idiomas"
                class="ml-2 mb-2 border-[1px] border-slate-600"
                min="1"
                @change="sendTotalWeb"
            />
        </label>
    </div>
</div>
</template>


<style scoped>
</style>