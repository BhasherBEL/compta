<script lang="ts">
    import { accounts, CashFlow, cashFlows } from "../../store"
    import { unique, GenericColumn, formatMoney } from "../../utils";
    import EditableValue from "../editableValue.svelte"
    import Icon from "../icon.svelte";


    const columns: {[key: keyof CashFlow]: GenericColumn} = {
        date: { name: "Date", type: "date", mandatory: true },
        amount: {
            name: "Montant",
            type: "number",
            mandatory: true,
            postfix: " €"
        },
        account: {
            name: "Compte",
            type: "select",
            suggestions: $accounts.map(a => a.name),
            mandatory: true,
        },
        event: {
            name: "Évènement",
            type: "text",
            suggestions: [],
            mandatory: true,
        },
        nature: {
            name: "Nature",
            type: "text",
            suggestions: [],
            mandatory: true
        },
        details: { name: "Détails", type: "text", mandatory: true },
        ref: { name: "Référence", type: "text", mandatory: true },
        note: { name: "Remarque", type: "text", mandatory: false },
    }

    let newCashFlow = {}
    let cashFlowsBeingEdited: number[] = []

    function toggleEditable(index) {
        if (cashFlowsBeingEdited.includes(index)) {
            cashFlowsBeingEdited = cashFlowsBeingEdited.filter((v, _) => v
                !== index)
        } else {
            cashFlowsBeingEdited = [ ...cashFlowsBeingEdited, index ]
        }
    }

    function validateCashFlow(data: Object): boolean {
        for (let k in columns){
            console.log(k, columns[k].mandatory, data[k] )
            if (columns[k].mandatory && (data[k] === undefined || data[k] === "")){
                return false
            }
        }
        return true
    }

    function addCashFlow() {
        for (const key of Object.keys(newCashFlow).filter(a => !columns[a].mandatory)){
            if (newCashFlow[key] === undefined){
                newCashFlow[key] = ""
            }
        }
        cashFlows.push(Object.assign({}, newCashFlow) as CashFlow)
        newCashFlow = {}
    }

    function resetNewCashFlow() {
        newCashFlow = {
            date: new Date().toISOString().substring(0, 10),
        }
    }

    resetNewCashFlow()

    cashFlows.subscribe((flows: CashFlow[]) => {
        let trackedKeys: (keyof CashFlow)[] = [ "event", "nature" ]
        for (const key of trackedKeys) {
            columns[key].suggestions = flows.map(flow => flow[key])
                .filter((_, i) => !cashFlowsBeingEdited.includes(i))
                .filter(unique)
        }
    })
</script>
<div class="card">
    <h2>Flux d'argent</h2>
    <table class="striped">
        <colgroup>
            <col style="width: 12%" span="8">
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
                                    suggestions={item.suggestions || []}/>
                        {:else}
                            {flow[key]} {item.postfix || ""}
                        {/if}
                    </td>
                {/each}
                <th class="grouped gapless">
                    <button class="button outline icon-only" on:click={() => toggleEditable(index)} disabled="{!validateCashFlow(flow)}">
                        <Icon icon="pencil"/>
                    </button>
                    <a id="delete-{index}" href="#delete-{index}"
                       class="button outline icon-only"
                       on:click={() => cashFlows.remove(index)}>
                        <Icon icon="x"/>
                    </a>
                </th>
            </tr>
        {/each}
        <tr>
            {#each Object.entries(columns) as [key, item]}
                <th>
                    <EditableValue bind:value={newCashFlow[key]}
                                   type={item.type}
                                   suggestions={item.suggestions || []}
                                   placeholder="{item.name}"/>
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
