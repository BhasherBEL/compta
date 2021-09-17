<script lang="ts">
import {cashFlows, accounts} from "../../store"
import Icon from "../icon.svelte";
import EditableValue from "../editableValue.svelte"
import {unique} from "../../utils";

const cashFlowTitles = [ // identifier, fancy name, input type, <{}: free, suggestions[]>
    ["date", "Date", "date", null],
    ["amount", "Montant", "number", null],
    ["account", "Compte", "select", $accounts.map(a => a.name)],
    ["event", "Évenement", "text", []],
    ["nature", "Nature", "text", []],
    ["details", "Détails", "text", null],
    ["ref", "Réference", "text", null],
    ["note", "Remarque", "text", null]
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
            {#each cashFlowTitles as item}
                <th>
                    <EditableValue bind:value={newCashFlow[item[0]]} type={item[2]} suggestions={item[3] ? item[3] : []} placeholder="{item[1]}"/>
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