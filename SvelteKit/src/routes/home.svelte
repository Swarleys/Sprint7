<script lang="ts">
	import type { PossibleProjects, ProjectList } from '../../src/interfaces/interfaces';
	import { page } from '$app/stores';
	import Panell from '../components/Panell.svelte';
	import ListProjects from '../components/ListProjects.svelte';
	let projectSetup: number[] = [];
	let searchParams = $page.url.searchParams;
	searchParams.get('web') === 'true' && projectSetup.push(500);
	searchParams.get('seo') === 'true' && projectSetup.push(300);
	searchParams.get('ads') === 'true' && projectSetup.push(200);
	let nombrePresupuesto = searchParams.get('nombrePresupuesto')
		? decodeURI(searchParams.get('nombrePresupuesto'))
		: '';
	let cliente = searchParams.get('nombreCliente')
		? decodeURI(searchParams.get('nombreCliente'))
		: '';
	let paginas = searchParams.get('paginas') ? Number(searchParams.get('paginas')) : 1;
	let idiomas = searchParams.get('idiomas') ? Number(searchParams.get('idiomas')) : 1;
	let nombrePresupuestoNoError = true;
	let clienteNoError = true;
	let cantidadError = true;
	let projectList: ProjectList[] = [];
	let id = 0;
	let possibleProjects: PossibleProjects[] = [
		{ description: 'Una pagina web (500€)', price: 500, name: 'web' },
		{ description: 'Una consultoria de SEO (300€)', price: 300, name: 'seo' },
		{ description: 'Una campaña de Google Ads (200€)', price: 200, name: 'ads' }
	];

	$: totalWeb = paginas * idiomas * 30;
	$: totalOptions = projectSetup.reduce((prev: number, item: number): number => prev + item, 0);
	$: totalConPaginas = projectSetup.includes(500) ? totalOptions + totalWeb : totalOptions;
	let addProjects = () => {
		clienteNoError = cliente ? true : false;
		nombrePresupuestoNoError = nombrePresupuesto ? true : false;
		cantidadError = totalConPaginas ? true : false;

		if (cliente && nombrePresupuesto && totalConPaginas) {
			projectList = [...projectList, { nombrePresupuesto, cliente, totalConPaginas, id, fullPath }];
			id++;
			projectSetup = [];
			nombrePresupuesto = '';
			cliente = '';
			paginas = 1;
			idiomas = 1;
		}
	};

	const createFullPath = (paginas:number, idiomas:number, nombrePresupuesto:string, cliente:string, projectSetup:number[]) => {
		searchParams.set('paginas', paginas.toString());
		searchParams.set('idiomas', idiomas.toString());
		searchParams.set('nombrePresupuesto', encodeURI(nombrePresupuesto));
		searchParams.set('nombreCliente', encodeURI(cliente));
		searchParams.set('web', projectSetup.includes(500).toString());
		searchParams.set('seo', projectSetup.includes(300).toString());
		searchParams.set('ads', projectSetup.includes(200).toString());
		return $page.url.pathname + $page.url.search;
	};
	$: fullPath = createFullPath(paginas, idiomas, nombrePresupuesto, cliente, projectSetup);
</script>

<div class="flex justify-around mb-4 flex-col sm:flex-row">
	<section class="m-4 mb-8">
		<p class="text-xl mb-4">¿Qué quieres hacer?</p>
		<form on:submit|preventDefault>
			<label for="nombreCliente" class="block mb-2">
				Nombre del Cliente:
				<input
					type="text"
					id="nombreCliente"
					name="nombreCliente"
					bind:value={cliente}
					class="border-2 border-slate-500 focus:outline-none"
				/>
				{#if !clienteNoError}
					<span class="block text-red-400 my-2">Tiene que introducir un nombre de cliente</span>
				{/if}
			</label>
			<label for="nombrePresupuesto" class="block mb-2">
				Nombre del presupuesto:
				<input
					type="text"
					id="nombrePresupuesto"
					name="nombrePresupuesto"
					bind:value={nombrePresupuesto}
					class="border-2 border-slate-500 focus:outline-none"
				/>
				{#if !nombrePresupuestoNoError}
					<span class="block text-red-400 my-2">Tiene que introducir un nombre de Presupuesto</span>
				{/if}
			</label>
			{#each possibleProjects as { description, name, price }, index (index)}
				<div class="flex flex-col">
					<label for={name}>
						<input type="checkbox" bind:group={projectSetup} value={price} id={name} class="mr-l" />
						{description}
					</label>
					{#if index === 0 && projectSetup.includes(500)}
						<Panell bind:pages={paginas} bind:languages={idiomas} />
					{/if}
				</div>
			{/each}
			{#if !cantidadError}
				<p class="text-red-400 my-2">
					Tienes que seleccionar alguna opción para generar un presupuesto.
				</p>
			{/if}

			{#if totalOptions > 0}
				<p class="my-6">Precio total: {totalConPaginas}€</p>
			{/if}
			<input
				type="button"
				value="Guardar"
				class="px-4 py-2 rounded-md shadow-orange-700 shadow-md bg-orange-500 text-white mx-4"
				on:click={addProjects}
			/>
		</form>
	</section>
	{#if projectList.length > 0}
		<ListProjects bind:projectList />
	{/if}
</div>

<a
	href="/"
	class="px-4 py-2 rounded-md shadow-orange-700 shadow-md bg-orange-500 text-white block max-w-fit mx-auto"
	>Volver al inicio</a
>
