<script lang="ts">
    import nat_evt from "./tabs/nat_evt.svelte";
    import infos_comptes from "./tabs/infos_comptes.svelte";
    import bilan from "./tabs/bilan.svelte";
    import flux from "./tabs/flux.svelte";
	let current_tab = infos_comptes
    const tabs = [
        {name: "Natures et évènements", component: nat_evt},
        {name: "Infos et comptes", component: infos_comptes},
        {name: "Flux d'argent", component: flux},
        {name: "Bilans détaillés", component: bilan}
    ]

</script>

<nav class="nav">
    <div class="nav-left">
        <div class="tabs">
        {#each tabs as tab}
            <a class="{tab.component === current_tab ? 'active' : ''}" on:click="{() => current_tab = tab.component}">
                {tab.name}
            </a>
        {/each}
        </div>
    </div>
</nav>
<section class="container">
    {#key current_tab}
        <svelte:component this={current_tab}/>
    {/key}
</section>

<style>
    label > input {
        display: none;
    }
    nav {
        box-shadow: 0 0 4px 0 #333333;
    }
</style>