<script lang="ts">
    import { onDestroy } from "svelte"
    import { accounts, CashFlow, cashFlows } from "../../store"
    import {unique, GenericColumn, formatColor, incomeOrExpense, formatMoney} from "../../utils";
    import EditableTable from "../editableTable.svelte"

    const columns: {[key in keyof CashFlow]: GenericColumn<CashFlow>} = {
        date: { name: "Date", type: "date", required: true },
        amount: {
            name: "Montant",
            type: "number",
            required: true,
            format: (val, _, __) => formatColor(val, formatMoney(val))
        },
        account: {
            name: "Compte",
            type: "select",
            suggestions: Object.entries($accounts).map(([_, account]) => account.name),
            suggestions_keys: Object.keys($accounts),
            required: true,
            format: (id, _, __) => $accounts[id].name
        },
        event: {
            name: "Évènement",
            type: "string",
            suggestions: [],
            required: true,
        },
        nature: {
            name: "Nature",
            type: "string",
            suggestions: [],
            required: true
        },
        details: {
            name: "Détails",
            type: "string",
            suggestions: [],
            required: true
        },
        ref: { name: "Référence", type: "string", required: true },
        note: {
            name: "Remarque",
            type: "string",
            required: false,
            format: a => a || ""
        },
        in_out: {
            name: "Entrée/Sortie",
            type: "string",
            required: false,
            compute: (_, cashFlow, __) => (formatColor(cashFlow.amount, incomeOrExpense(cashFlow.amount)))
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
        tableName="Flux d'argent"
        dataStore="{cashFlows}"
        columns="{columns}"
        colgroup="{[{width: '12%', span: '8'}]}"
    />
</div>
