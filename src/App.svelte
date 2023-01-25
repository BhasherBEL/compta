<script lang="ts">
    import Icon from "./components/icon.svelte";
    import Flag from "./lang/flag.svelte"
    import {lang, Language, translation } from "./lang/language";
    import { onDestroy } from 'svelte';
    import bilan from "./components/tabs/bilan.svelte";
    import flux from "./components/tabs/flux.svelte";
    import help from "./components/tabs/help.svelte"
    import infos_comptes from "./components/tabs/infos_comptes.svelte";
    import { exportFile, importFile, shortcutKeyboard } from "./io"
    shortcutKeyboard();

    let text: Language; const unsubscribeLang = lang.subscribe(langData => {text = langData;}); onDestroy(unsubscribeLang);

    let current_tab = infos_comptes
    $: tabs = [
        { name: text.help, component: help },
        { name: `${text.help} ${text.and} ${text.accounts}`, component: infos_comptes },
        { name: text.cash_flow, component: flux },
        { name: text.detail_balances, component: bilan },
    ]
</script>

<nav class="nav">
    <span class="spacer"></span>
    <div class="nav-left">
        <div class="tabs">
            {#each tabs as tab}
                <a href="#/"
                   class="{tab.component === current_tab ? 'active' : ''}"
                   on:click="{() => current_tab = tab.component}"
                >
                    {tab.name}
                </a>
            {/each}
        </div>
    </div>

    <div class="myGrouped is-vertical-align">
        <button class="button icon-only button-end" style="background: none;" on:click={() => translation("fr")}
                title="{text.tooltips.lang_fr}">
            <Flag lang="fr" title="{text.tooltips.lang_fr}" size="{50}"/>
        </button>
        <button class="button icon-only button-end" style="background: none;" on:click={() => translation("en")}
                title="{text.tooltips.lang_en}">
            <Flag lang="en" title="{text.tooltips.lang_en}" size="{50}"/>
        </button>
    </div>

    <div class="nav-right">
        <div class="myGrouped is-vertical-align">
            <label class="button icon-only primary button-start" title="{text.tooltips.open_file}">
                <Icon title="{text.tooltips.open_file}" icon="folder-open" size={20}/>
                <input id="importButton" type="file" accept="application/json" class="button icon-only primary"
                       style="display: none;" on:change={importFile}>
            </label>
            <button class="button icon-only primary outline button-end" on:click={exportFile} title="{text.tooltips.save_file}">
                <Icon title="{text.tooltips.save_file}" color="#ff5b00" icon="download" size={20}/>
            </button>
        </div>
    </div>
    <span class="spacer"></span>
</nav>

<section class="container">
    {#key current_tab}
        <svelte:component this={current_tab}/>
    {/key}
</section>

<span class="separator"></span>

<footer>
    <span>
        {text.footer.created_by}
        <a href="https://louvainlinux.org" target="_blank">
            Louvain-li-Nux
        </a><br>
        <a href="https://gitlab.com/louvainlinux/compta/" target="_blank">
            {text.footer.see_source_code}
        </a>
    </span>
    <span>{text.footer.abstract}</span>
    <span class="text-right">
        {text.footer.version} {process.env.npm_package_version}<br>
        <a
            href="https://gitlab.com/louvainlinux/compta/-/tags"
            target="_blank"
        >
            {text.footer.see_release_notes}
        </a>
    </span>
</footer>

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
