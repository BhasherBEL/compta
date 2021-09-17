<script lang="ts">
    import infos_comptes from "./components/tabs/infos_comptes.svelte";
    import bilan from "./components/tabs/bilan.svelte";
    import flux from "./components/tabs/flux.svelte";
    import help from "./components/tabs/help.svelte"
    import Icon from "./components/icon.svelte";
	let current_tab = infos_comptes
    const tabs = [
        {name: "Aide", component: help},
        {name: "Infos et comptes", component: infos_comptes},
        {name: "Flux d'argent", component: flux},
        {name: "Bilans détaillés", component: bilan}
    ]

</script>

<nav class="nav">
    <div class="container nav-left">
        <div class="tabs">
        {#each tabs as tab}
            <a class="{tab.component === current_tab ? 'active' : ''}" on:click="{() => current_tab = tab.component}">
                {tab.name}
            </a>
        {/each}
        </div>
    </div>
    <div class="nav-right">
        <div class="grouped gapless">
            <a class="button icon-only primary">
                <Icon icon="file-code" size="20"/>
            </a>
            <a class="button icon-only primary outline">
                <Icon icon="download" size="20" color="#ff5b00"/>
            </a>
        </div>
    </div>
</nav>
<br>
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