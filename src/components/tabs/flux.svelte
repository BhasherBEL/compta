<script lang="ts">
    import { accounts, CashFlow, cashFlows } from "../../store"
    import Icon from "../icon.svelte";
    import EditableValue from "../editableValue.svelte"
    import { unique } from "../../utils";

    type CashFlowColumn = {
        id: keyof CashFlow,
        name: string,
        type: "date" | "number" | "select" | "text",
        suggestions?: string[],
    }

    const columns: CashFlowColumn[] = [
        { id: "date", name: "Date", type: "date" },
        { id: "amount", name: "Montant", type: "number" },
        { id: "account", name: "Compte", type: "select", suggestions: $accounts.map(a => a.name) },
        { id: "event", name: "Évènement", type: "text", suggestions: [] },
        { id: "nature", name: "Nature", type: "text", suggestions: [] },
        { id: "details", name: "Détails", type: "text" },
        { id: "ref", name: "Référence", type: "text" },
        { id: "note", name: "Remarque", type: "text" },
    ]

    let newCashFlow = {}
    let cashFlowsBeingEdited: number[] = []

    function toggleEditable(index) {
        if (cashFlowsBeingEdited.includes(index)) {
            cashFlowsBeingEdited = cashFlowsBeingEdited.filter((v, _) => v !== index)
        } else {
            cashFlowsBeingEdited = [ ...cashFlowsBeingEdited, index ]
        }
    }

    function addCashFlow() {
        cashFlows.push(Object.assign({}, newCashFlow) as CashFlow)
        newCashFlow = {}
    }

    function resetNewCashFlow() {
        newCashFlow = {
            date: new Date().toISOString().substring(0, 10)
        }
    }

    console.log(columns[columns.findIndex(flow => flow.id === "account")]['suggestions'])

    resetNewCashFlow()
    cashFlows.subscribe((flows: CashFlow[]) => {
        let trackedKeys: (keyof CashFlow)[] = [ "event", "nature" ]
        for (const key in trackedKeys) {
            const i = columns.findIndex(c => c.id === key)
            if (i < 0) {
                continue
            }
            columns[i].suggestions = flows.map(flow => flow[key])
                .filter((_, i) => !cashFlowsBeingEdited.includes(i))
                .filter(unique)
        }
    })

</script>
<div class="card">
    <h2>Flux d'argent</h2>
    <table class="striped">
        <tr>
            {#each columns as item}
                <th>{item.name}</th>
            {/each}
        </tr>
        {#each $cashFlows as flow, index}
            <tr>
                {#each columns as item}
                    <td>
                        {#if (cashFlowsBeingEdited.includes(index))}
                            <EditableValue bind:value={$cashFlows[index][item.id]}
                                           placeholder={item.name}
                                           type={item.type}
                                           suggestions={item.suggestions || []}/>
                        {:else}
                            {flow[item.id]}
                        {/if}
                    </td>
                {/each}
                <th class="grouped gapless">
                    <a id="edit-{index}" href="#edit-{index}"
                       class="button outline icon-only"
                       on:click={() => toggleEditable(index)}>
                        <Icon icon="pencil"/>
                    </a>
                    <a id="delete-{index}" href="#delete-{index}"
                       class="button outline icon-only"
                       on:click={() => cashFlows.remove(index)}>
                        <Icon icon="x"/>
                    </a>
                </th>
            </tr>
        {/each}
        <tr>
            {#each columns as item}
                <th>
                    <EditableValue bind:value={newCashFlow[item.id]}
                                   type={item.type}
                                   suggestions={item.suggestions || []}
                                   placeholder="{item.name}"/>
                </th>
            {/each}
            <th>
                <a class="button icon-only" href="#add-flow" id="add-flow" on:click="{addCashFlow}">
                    <Icon icon="plus"/>
                </a>
            </th>
        </tr>
    </table>
</div>
