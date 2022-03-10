<script setup lang="ts">
import { ref } from 'vue';
import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    DialogDescription,
} from "@headlessui/vue";
const props = defineProps<{ numVal: number, label: string, description: string }>();
const emits = defineEmits<{
    (e: 'changeNumVal', numVal: number): void,
}>();
let isOpen = ref(false);
const setIsOpen = (value: boolean) => {
    isOpen.value = value;
}
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
            {{ label }}
            <input
                type="button"
                @click="decrease"
                value="-"
                class="px-3 py-1 rounded-md bg-orange-500 text-white"
            />
            <input
                type="number"
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
            <p
                @click="setIsOpen(true)"
                class="ml-2 bg-indigo-500 px-3 py-1 text-white rounded-md inline text-lg"
            >Info</p>
        </label>
        <Dialog :open="isOpen" @close="setIsOpen">
            <DialogOverlay class="fixed inset-0 bg-black/10" />
            <div class="relative max-w-md mx-auto bg-white rounded-md p-10">
                <DialogTitle class="text-2xl mb-3">{{ label }}</DialogTitle>
                <DialogDescription class="text-xl mb-4">{{ description }}</DialogDescription>
                <button
                    @click="setIsOpen(false)"
                    class="bg-blue-100 text-blue-900 px-3 py-1 rounded-md focus:outline-none"
                >OK</button>
            </div>
        </Dialog>
    </div>
</template>

<style scoped>
</style>