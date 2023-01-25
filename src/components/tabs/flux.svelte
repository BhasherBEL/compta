<script lang="ts">
    import { accounts, CashFlow, cashFlows } from "../../store"
    import { unique, GenericColumn, formatColor, picker, formatMoney } from "../../utils";
    import EditableTable from "../editableTable.svelte"
    import { lang } from "../../lang/language";
    import { onDestroy } from 'svelte';

    let text; const unsubscribeLang = lang.subscribe(langData => {text = langData;}); onDestroy(unsubscribeLang);

    const columns: {[key in keyof CashFlow]: GenericColumn<CashFlow>} = {
        date: { name: text.date, type: "date", required: true },
        amount: {
            name: text.amount,
            type: "number",
            required: true,
            format: (val, _, __) => formatColor(val, formatMoney(val))
        },
        account: {
            name: text.account,
            type: "select",
            suggestions: Object.entries($accounts).map(([_, account]) => account.name),
            suggestions_keys: Object.keys($accounts),
            required: true,
            format: (id, _, __) => $accounts[id].name
        },
        event: {
            name: text.event,
            type: "string",
            suggestions: [],
            required: true,
        },
        nature: {
            name: text.nature,
            type: "string",
            suggestions: [],
            required: true
        },
        details: {
            name: text.details,
            type: "string",
            suggestions: [],
            required: true
        },
        ref: { name: text.ref, type: "string", required: true },
        note: {
            name: text.note,
            type: "string",
            required: false,
            format: a => a || ""
        },
        in_out: {
            name: text.income+"/"+text.expense,
            type: "string",
            required: false,
            compute: (_, cashFlow, __) => (formatColor(cashFlow.amount, picker(cashFlow.amount, text.income, text.expense)))
        }
    }

    const unsubscribe = cashFlows.subscribe((flows) => {
        let trackedKeys: (keyof CashFlow)[] = [ "event", "nature", "details" ]
        columns.event.suggestions = ["Sans event"]
        columns.nature.suggestions = [
            "Recettes hors événement",
            "Fonctionnement hors événement",
            "Produits destinés à la vente",
            "Produits offerts",
            "Promotion",
            "Matériel, technique et autres frais",
            "Coût des intervenants",
            "Ventes",
            "Entrées/PAF",
            "Sponsors",
            "Subsides",
            "Transfert d'argent"
        ]
        for (const key of trackedKeys) {
            columns[key].suggestions = columns[key].suggestions.concat(Object
                    .values(flows)
                    .map(flow => flow[key])
            ).filter(unique)
        }
    })
    onDestroy(unsubscribe)
</script>

<div class="card">
    <EditableTable
        tableName="{text.cash_flow}"
        dataStore="{cashFlows}"
        columns="{columns}"
        colgroup="{[{width: '12%', span: '8'}]}"
    />
</div>
