<script lang="ts">
	import { onDestroy } from 'svelte';
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription
	} from '@rgossiaux/svelte-headlessui';
	export let numVal: number;
	export let label: string;
	export let description: string;

	let isOpen = false;
	let changeInput = (): void => {
		numVal = numVal < 1 ? 1 : numVal;
	};
	let decrease = (): void => {
		numVal = numVal === 1 ? 1 : numVal - 1;
	};
	let increase = (): void => {
		numVal = numVal + 1;
	};
	onDestroy(() => {
		numVal = 1;
	});
</script>

<div>
	<label>
		{label}
		<input
			type="button"
			on:click={decrease}
			value="-"
			class="px-3 py-1 rounded-md bg-orange-500 text-white"
		/>
		<input
			type="number"
			bind:value={numVal}
			class="ml-2 mb-2 text-center w-14"
			min="1"
			on:change={changeInput}
		/>
		<input
			type="button"
			on:click={increase}
			value="+"
			class="px-3 py-1 rounded-md bg-orange-500 text-white ml-2"
		/>
		<button on:click={() => isOpen = true} class="ml-2 bg-indigo-500 px-3 py-1 text-white rounded-md inline text-lg">Info</button>
	</label>
	<Dialog open={isOpen} on:close={() => isOpen = false} class="flex justify-center">
		<DialogOverlay class="fixed inset-0 bg-black/20" />
		<div class="absolute max-w-md mx-auto bg-white rounded-md p-10 top-20 shadow-lg">
			<DialogTitle class="text-2xl mb-3">{ label }</DialogTitle>
			<DialogDescription class="text-xl mb-4">{ description }</DialogDescription>
			<button
				on:click={() => isOpen = false}
				class="bg-blue-100 text-blue-900 px-3 py-1 rounded-md focus:outline-none">OK</button
			>
		</div>
	</Dialog>
</div>
