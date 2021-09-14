<script lang="ts">
import {cashFlows} from "../store"

const cashFlowTitles = [
    ["date", "Date"],
    ["amount", "Montant"],
    ["account", "Compte"],
    ["event", "Évenement"],
    ["nature", "Nature"],
    ["details", "Détails"],
    ["ref", "Réference"],
    ["note", "Remarque"]
]
</script>
<table>
    <tr>
        {#each cashFlowTitles as item}
            <th>{item[1]}</th>
        {/each}
    </tr>
    {#each $cashFlows as flow}
        <tr>
        {#each cashFlowTitles as item}
            <td>{flow[item[0]]}</td>
        {/each}
        </tr>
    {/each}
</table>