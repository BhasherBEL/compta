<script lang="ts">
    import { accounts, CashFlow, cashFlows } from "../../store"
    import { unique, GenericColumn, formatMoney } from "../../utils";
    import EditableValue from "../editableValue.svelte"
    import Icon from "../icon.svelte";


    const columns: {[key in keyof CashFlow]: GenericColumn} = {
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
            suggestions: $accounts.map(a => a.name),
            required: true,
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

    function toggleEditable(index: number) {
        if (cashFlowsBeingEdited.includes(index)) {
            cashFlowsBeingEdited = cashFlowsBeingEdited.filter((v, _) => v
                !== index)
        } else {
            cashFlowsBeingEdited = [ ...cashFlowsBeingEdited, index ]
        }
    }

    function validateCashFlow(data: Object): boolean {
        for (let k in columns){
            if (columns[k].required && (data[k] === undefined || data[k] === "")){
                return false
            }
        }
        return true
    }

    function addCashFlow() {
        cashFlows.push(Object.assign({}, newCashFlow) as CashFlow)
        resetNewCashFlow()
    }

    function resetNewCashFlow() {
        newCashFlow = {
            date: new Date().toISOString().substring(0, 10),
            account: $accounts[0].name || undefined
        }
    }

    resetNewCashFlow()

    cashFlows.subscribe((flows: CashFlow[]) => {
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
            columns[key].suggestions.concat(flows.map(flow => flow[key])
                .filter((_, i) => !cashFlowsBeingEdited.includes(i)))
                .filter(unique)
        }
    })
</script>
<div class="card">
    <h2>Flux d'argent</h2>
    <table class="striped">
        <colgroup>
            <col style="width: 12%;" span="8">
        </colgroup>
        <tr>
            {#each Object.entries(columns) as [_, item]}
                <th>{item.name}</th>
            {/each}
        </tr>
        {#each $cashFlows as flow, index}
            <tr>
                {#each Object.entries(columns) as [key, item]}
                    <td>
                        {#if (
                            cashFlowsBeingEdited.includes(index)
                        )}
                            <EditableValue
                                bind:value={$cashFlows[index][key]}
                                placeholder={item.name}
                                type={item.type}
                                suggestions={item.suggestions || []}
                                required={item.required}
                            />
                        {:else}
                            {item.format ? item.format(flow[key], flow) : flow[key]}
                        {/if}
                    </td>
                {/each}
                <th class="grouped gapless">
                    <button class="button outline icon-only" on:click={() => toggleEditable(index)} disabled="{!validateCashFlow(flow)}">
                        <Icon icon="pencil"/>
                    </button>
                    <button class="button outline icon-only"
                       on:click={() => cashFlows.remove(index)}>
                        <Icon icon="close"/>
                    </button>
                </th>
            </tr>
        {/each}
        <tr>
            {#each Object.entries(columns) as [key, item]}
                <th>
                    <EditableValue
                        bind:value={newCashFlow[key]}
                        type={item.type}
                        suggestions={item.suggestions || []}
                        placeholder="{item.name}"
                        required={item.required}
                    />
                </th>
            {/each}
            <th>
                <button class="button icon-only" on:click="{addCashFlow}" disabled={!validateCashFlow(newCashFlow)}>
                    <Icon icon="plus"/>
                </button>
            </th>
        </tr>
    </table>
</div>
