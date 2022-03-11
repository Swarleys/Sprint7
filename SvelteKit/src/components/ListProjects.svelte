<script setup lang="ts">
	import type { ProjectList } from '../interfaces/interfaces';
	import ListFiltered from './ListFiltered.svelte'
	export let projectList: ProjectList[];
	let search = '';
	$: filteredProjects = projectList.filter((project) =>
        project.nombrePresupuesto.toLowerCase().includes(search.toLocaleLowerCase()) ||
        project.cliente.toLowerCase().includes(search.toLowerCase()));

	const handleOrderByName = () => { projectList =  projectList.sort((a, b) => (a.nombrePresupuesto > b.nombrePresupuesto ? 1 : -1))};
	const handleOrderByCost = () => { projectList =  projectList.sort((a, b) => (a.totalConPaginas > b.totalConPaginas ? 1 : -1))};
	const handleOrderReset = () => { projectList =  projectList.sort((a, b) => (a.id > b.id ? 1 : -1))};
</script>

<div class="self-start m-4"> 
    <div>
        <label for="search">
            Filtra por nombre cliente o presupuesto:
            <input type="text" bind:value={search} id="search" class="border-2 border-slate-500" />
        </label>
    </div>
    <div class="my-4 flex gap-3">
        <button
            on:click={() => handleOrderByName()}
            on:submit|preventDefault
            class="px-4 py-2 rounded-md shadow-orange-700 shadow-md bg-orange-500 text-white"
            >Ordenar por nombre</button
        >
        <button
            on:click={() => handleOrderByCost()}
            on:submit|preventDefault
            class="px-4 py-2 rounded-md shadow-orange-700 shadow-md bg-orange-500 text-white"
            >Ordenar por precio</button
        >
        <button
            on:click={() => handleOrderReset()}
            on:submit|preventDefault
            class="px-4 py-2 rounded-md shadow-orange-700 shadow-md bg-orange-500 text-white"
            >Reset</button
        >
    </div>
    <ul class="flex flex-col justify-center mb-4">
        {#if search === ''}
        {#each projectList as { nombrePresupuesto, cliente, totalConPaginas, fullPath, id } (id)}
        <li class="mb-2">
            <p>
                <strong>Cliente: </strong>
                { cliente }
            </p>
            <p>
                <strong>Nombre del Presupuesto: </strong>
                <a href={fullPath} target="_blank" class="text-orange-500 underline">
                    { nombrePresupuesto }</a
                    >
                </p>
                <p>
                    <strong>Precio:</strong>
                    { totalConPaginas }
                </p>
                <hr class="mt-2 border-slate-500" />
            </li>
            {/each}
            {:else}
            <ListFiltered bind:filteredProjects={filteredProjects} />
        {/if}
    </ul>
</div>
