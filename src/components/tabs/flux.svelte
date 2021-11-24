<script lang="ts">
    import { Account, accounts, CashFlow, cashFlows } from "../../store"
    import { unique, GenericColumn, formatMoney } from "../../utils";
    import EditableTable from "../editableTable.svelte"

    const columns: {[key in keyof CashFlow]: GenericColumn<Account>} = {
        date: { name: "Date", type: "date", required: true },
        amount: {
            name: "Montant",
            type: "number",
            required: true,
            format: formatMoney
        },
        account: {
            name: "Compte",
            type: "select",
            suggestions: Object.entries($accounts).map(([id, account]) => account.name),
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
        details: { name: "Détails", type: "string", required: true },
        ref: { name: "Référence", type: "string", required: true },
        note: {
            name: "Remarque",
            type: "string",
            required: false,
            format: a => a || ""
        }
    }

    let newCashFlow = {}
    let cashFlowsBeingEdited: number[] = []

    function resetNewCashFlow() {
        newCashFlow = {
            date: new Date().toISOString().substring(0, 10),
            account: $accounts[0].name || undefined
        }
    }

    resetNewCashFlow()

    cashFlows.subscribe((flows: typeof cashFlows) => {
        let trackedKeys: (keyof CashFlow)[] = [ "event", "nature" ]
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
                    .filter((_, i) => !cashFlowsBeingEdited.includes(i))
            ).filter(unique)
        }
    })
</script>
<div class="card">
    <h2>Flux d'argent</h2>
    <EditableTable
            dataStore="{cashFlows}"
            columns="{columns}"
            colgroup="{[{width: '12%', span: '8'}]}"
    />
</div>
