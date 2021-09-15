<script lang="ts">
import {cashFlows} from "../../store"
import Icon from "../icon.svelte";

const cashFlowTitles = [
    ["date", "Date", "date"],
    ["amount", "Montant", "number"],
    ["account", "Compte", "text"],
    ["event", "Évenement", "text"],
    ["nature", "Nature", "text"],
    ["details", "Détails", "text"],
    ["ref", "Réference", "text"],
    ["note", "Remarque", "text"]
]

let newCashFlow = {}
let cashFlowsBeingEdited = []
function toggleEditable(index) {
    if (cashFlowsBeingEdited.includes(index)){
        cashFlowsBeingEdited = cashFlowsBeingEdited.filter((v, i) => v !== index)
    } else cashFlowsBeingEdited = [...cashFlowsBeingEdited, index]
}
</script>
<div class="card">
    <table class="striped">
        <tr>
            {#each cashFlowTitles as item}
                <th>{item[1]}</th>
            {/each}
        </tr>
        {#each $cashFlows as flow, index}
            <tr>
                {#each cashFlowTitles as item}
                <td>
                    {#if (cashFlowsBeingEdited.includes(index))}
                        {#if item[2] === "number"}
                            <input type="number" bind:value={$cashFlows[index][item[0]]}>
                        {:else if (item[2] === "date")}
                            <input type="date" bind:value={$cashFlows[index][item[0]]}>
                        {:else}
                            <input bind:value={$cashFlows[index][item[0]]}>
                        {/if}
                    {:else}
                    {flow[item[0]]}
                    {/if}
                </td>
                {/each}
                <th class="grouped gapless">
                    <a class="button outline icon-only" on:click={() => toggleEditable(index)}>
                        <Icon icon="pencil" size={16}/>
                    </a>
                    <a class="button outline icon-only" on:click={() => cashFlows.remove(index)}>
                        <Icon icon="x" size={16}/>
                    </a>
                </th>
            </tr>
        {/each}
        <tr>
            {#each cashFlowTitles as item}
                <th>
                    {#if item[2] === "number"}
                        <input type="number" bind:value={newCashFlow[item[0]]} placeholder="{item[1]}">
                    {:else if (item[2] === "date")}
                        <input type="date" bind:value={newCashFlow[item[0]]} placeholder="{item[1]}">
                    {:else}
                        <input bind:value={newCashFlow[item[0]]} placeholder="{item[1]}">
                    {/if}
                </th>
            {/each}
            <th>
                <a class="button icon-only" on:click="{cashFlows.push(Object.assign({}, newCashFlow))}">
                    <Icon icon="plus" size={16}/>
                </a>
            </th>
        </tr>
    </table>
</div>