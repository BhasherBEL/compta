<script lang="ts">
    import { saveAs } from 'file-saver';
    import Icon from "./components/icon.svelte";
    import bilan from "./components/tabs/bilan.svelte";
    import flux from "./components/tabs/flux.svelte";
    import help from "./components/tabs/help.svelte"
    import infos_comptes from "./components/tabs/infos_comptes.svelte";
    import {infos, cashFlows, accounts} from "./store"

    let current_tab = infos_comptes
    const tabs = [
        { name: "Aide", component: help },
        { name: "Infos et comptes", component: infos_comptes },
        { name: "Flux d'argent", component: flux },
        { name: "Bilans détaillés", component: bilan },
    ]

    function importFile(f){
        f.target.files[0].text().then((text) => {
            const data = JSON.parse(text)
            console.log(data)
        })
    }

    function saveFile(){
        let data = JSON.stringify({infos: $infos, cashFlows: $cashFlows, accounts: $accounts})
        let blob = new Blob([data], {type: "application/json"})
        saveAs(blob, `Trésorerie_${$infos.orga || "KAP"}_${$infos.year || "ANNEE"}_${$infos.quarter || "QUADRI"}.json`)
    }
</script>

<nav class="nav">
    <span class="spacer"></span>
    <div class="nav-left">
        <div class="tabs">
            {#each tabs as tab}
                <a id="tab-{tab.name}"
                   href="#tab-{tab.name}"
                   class="{tab.component === current_tab ? 'active' : ''}"
                   on:click="{() => current_tab = tab.component}">
                    {tab.name}
                </a>
            {/each}
        </div>
    </div>
    <div class="nav-right">
        <div class="myGrouped is-vertical-align">
            <label class="button icon-only primary button-start">
                <Icon class="button-start" icon="file-code" size={20}/>
                <input type="file" accept="application/json" class="button icon-only primary" style="display: none;" on:change={importFile}>
            </label>
            <button class="button icon-only primary outline button-end" on:click={saveFile}>
                <Icon color="#ff5b00" icon="download" size={20}/>
            </button>
        </div>
    </div>
    <span class="spacer"></span>
</nav>
<br>
<section class="container">
    {#key current_tab}
        <svelte:component this={current_tab}/>
    {/key}
</section>

<style>
  nav {
    box-shadow: 0 0 4px 0 #333;
  }

  .spacer {
    width: 2%;
  }

  .myGrouped * {
    margin: 0 0 0 -1px !important;
    border-radius: 0 !important;
  }

  .button-start {
    margin: 0 !important;
    border-radius: 4px 0 0 4px !important;
  }

  .button-end {
    border-radius: 0 4px 4px 0 !important;
  }
</style>
