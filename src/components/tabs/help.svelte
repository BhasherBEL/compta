<script>
    import Icon from "../icon.svelte"
    import { lang } from "../../lang/language";
    import { onDestroy } from 'svelte';

    let text; const unsubscribeLang = lang.subscribe(langData => {text = langData;}); onDestroy(unsubscribeLang);
</script>

<div class="card">
    <h3>
        {text.help_section.tabs_description}
    </h3>
    {@html text.help_section.infos_accounts}
    {@html text.help_section.cash_flow}
    {@html text.help_section.detail_balances1}
    <Icon title="{text.tooltips.clipboard}" icon="clipboard"/>
    {@html text.help_section.detail_balances2}
    {@html text.help_section.need_help}
</div>
