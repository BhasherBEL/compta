<script lang="ts">
import {cashFlows, accounts} from "../../store"
import Icon from "../icon.svelte";
import EditableValue from "../editableValue.svelte"
import {unique} from "../../utils";

const cashFlowTitles = [ // identifier, fancy name, input type, <{}: free, suggestions[]>, mandatory
    ["date", "Date", "date", null, true],
    ["amount", "Montant", "number", null, true],
    ["account", "Compte", "select", $accounts.map(a => a.name), true],
    ["event", "Évenement", "text", [], true],
    ["nature", "Nature", "text", [], true],
    ["details", "Détails", "text", null, true],
    ["ref", "Réference", "text", null, true],
    ["note", "Remarque", "text", null, false]
]
console.log(cashFlowTitles[2][3])
let newCashFlow = {}
resetNewCashFlow()
let cashFlowsBeingEdited = []
function toggleEditable(index) {
    if (cashFlowsBeingEdited.includes(index)){
        cashFlowsBeingEdited = cashFlowsBeingEdited.filter((v, i) => v !== index)
    } else cashFlowsBeingEdited = [...cashFlowsBeingEdited, index]
}

cashFlows.subscribe((cf) => {
    cashFlowTitles[3][3] = cf.map(i => i.event).filter((k, i) => !cashFlowsBeingEdited.includes(i)).filter(unique)
    cashFlowTitles[4][3] = cf.map(i => i.nature).filter((k, i) => !cashFlowsBeingEdited.includes(i)).filter(unique)
})

function validateCashFlow(data: Object) {
    for (let k of cashFlowTitles.filter(k => k[4]).map(k => k[0])){
        if (!data[k]) {
            return false
        }
    }
    return true
}

function addCashFlow() {
    cashFlows.push(Object.assign({}, newCashFlow))
    newCashFlow = {}
}

function resetNewCashFlow(){
    newCashFlow = {
        date: new Date().toISOString().substring(0, 10)
    }
}

</script>
<div class="card">
    <h2>Flux d'argent</h2>
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
                        <EditableValue bind:value={$cashFlows[index][item[0]]} type={item[2]} suggestions={item[3] ? item[3] : []}/>
                    {:else}
                        {flow[item[0]]}
                    {/if}
                </td>
                {/each}
                <th class="grouped gapless">
                    <button class="button outline icon-only" on:click={() => toggleEditable(index)} disabled="{!validateCashFlow(flow)}">
                        <Icon icon="pencil"/>
                    </button>
                    <a class="button outline icon-only" on:click={() => cashFlows.remove(index)}>
                        <Icon icon="x"/>
                    </a>
                </th>
            </tr>
        {/each}
        <tr>
            {#each cashFlowTitles as item}
                <th>
                    <EditableValue bind:value={newCashFlow[item[0]]} type={item[2]} suggestions={item[3] ? item[3] : []} placeholder="{item[1]}"/>
                </th>
            {/each}
            <th>
                <button class="button icon-only" on:click="{addCashFlow}" disabled="{!validateCashFlow(newCashFlow)}">
                    <Icon icon="plus"/>
                </button>
            </th>
        </tr>
    </table>
</div>