<script lang="ts">
import {cashFlows} from "../../store"
import Icon from "../icon.svelte";
import EditableValue from "../editableValue.svelte"
import {unique} from "../../utils";

const cashFlowTitles = [ // identifier, fancy name, input type, <{}: free, [<false: suggestions not restrained, true: suggestions restrained>, <suggestions>]>
    ["date", "Date", "date", null],
    ["amount", "Montant", "number", null],
    ["account", "Compte", "text", null],
    ["event", "Évenement", "text", [false, $cashFlows.map(i => i.events).filter(unique)]],
    ["nature", "Nature", "text", [false, $cashFlows.map(i => i.nature).filter(unique)]],
    ["details", "Détails", "text", null],
    ["ref", "Réference", "text", null],
    ["note", "Remarque", "text", null]
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
                        <EditableValue bind:value={$cashFlows[index][item[0]]} type={item[2]} suggestions={}/>
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