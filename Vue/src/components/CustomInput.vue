<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{ numVal: number, label: string }>();
const emits = defineEmits<{
    (e: 'changeNumVal', numVal: number): void,
}>();

const numericValue = ref(props.numVal)

const changeInput = (): void => {
    numericValue.value = numericValue.value < 1 ? 1 : numericValue.value;
    emits("changeNumVal", numericValue.value)
}

const decrease = (): void => {
    numericValue.value = numericValue.value === 1 ? 1 : numericValue.value - 1;
    emits("changeNumVal", numericValue.value)
};
const increase = (): void => {
    numericValue.value = numericValue.value + 1;
    emits("changeNumVal", numericValue.value)
};

</script>
<template>
    <div>
        <label>
            {{label}}
            <input
                type="button"
                @click="decrease"
                value="-"
                class="px-3 py-1 rounded-md bg-orange-500 text-white"
            />
            <input
                type="number"
                name="idiomas"
                id="idiomas"
                v-model="numericValue"
                class="ml-2 mb-2 text-center w-14"
                min="1"
                @change="changeInput"
            />
            <input
                type="button"
                @click="increase"
                value="+"
                class="px-3 py-1 rounded-md bg-orange-500 text-white ml-2"
            />
        </label>
    </div>
</template>


<style scoped>
</style>