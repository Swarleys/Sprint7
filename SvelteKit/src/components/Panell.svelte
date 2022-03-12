<script lang="ts">
	import CustomInput from './CustomInput.svelte';
	export let pages: number;
	export let languages: number;
</script>

<div class="p-5 border-black border-2 inline-block rounded-xl my-4 scalePanel">
	<CustomInput
		bind:numVal={pages}
		label="Número de paginas:"
		description="Lugar donde indicar la cantidad de paginas que tendra tu pagina web."
	/>
	<CustomInput
		bind:numVal={languages}
		label="Número de idiomas:"
		description="Lugar donde indicar la cantidad de idiomas en los que estara disponible tu pagina web."
	/>
</div>

<style>
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
