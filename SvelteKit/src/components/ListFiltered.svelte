<script lang="ts">
	import type { ProjectList } from '../../src/interfaces/interfaces';
	export let filteredProjects: ProjectList[] = [];
</script>

{#each filteredProjects as { nombrePresupuesto, cliente, totalConPaginas, fullPath, id } (id)}
	<li class="mb-2">
		<p>
			<strong>Cliente: </strong>
			{cliente}
		</p>
		<p>
			<strong>Nombre del Presupuesto: </strong>
			<a href={fullPath} target="_blank" class="text-orange-500 underline"> {nombrePresupuesto}</a>
		</p>
		<p>
			<strong>Precio:</strong>
			{totalConPaginas}
		</p>
		<hr class="mt-2 border-slate-500" />
	</li>
{/each}
