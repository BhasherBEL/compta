<!--suppress JSUnfilteredForInLoop -->
<script lang="ts">
    import {v4 as uuidv4} from 'uuid'
    import { formatMoney } from "../utils"
    import Icon from "./icon.svelte"
    export let data: Object = {}
    const id = uuidv4()
    type Row = {
        category?: string
        income?: number
        expense?: number
    }

    function generateRows(data: Object): {rows: Row[], income:number, expense: number} {
        let rows: Row[] = []
        let [income, expense] = [0,0]
        for (let item in data){
            if (typeof data[item].expense == "number" && typeof data[item].income == "number") {
                rows.push({category: item, income: data[item].income, expense: data[item].expense})
                income += data[item].income
                expense += data[item].expense
            } else {
                let {rows: newRows, income: newIncome, expense: newExpense} = generateRows(data[item])
                for (let row in newRows) {
                    newRows[row].category = '  '+newRows[row].category
                }
                rows.push({category: item, income: newIncome, expense: newExpense})
                rows = rows.concat(newRows)
                expense += newExpense
                income += newIncome
            }
        }
        return {rows: rows, income: income, expense: expense}
    }

    $: generated = generateRows(data)

    function copyTable() {
        const table = document.getElementById(id)
        navigator.clipboard.writeText(table.innerText).catch(() => {
            console.log("An error appended")
        })
    }
</script>

<table class="striped" {id}>
    <tr>
        <th>Catégorie</th>
        <th>Sortie</th>
        <th>Entrée</th>
        <th>Total général</th>
    </tr>
    {#each generated.rows as item}
        <tr>
            <td>{item.category}</td>
            <td>{@html formatMoney(item.expense)}</td>
            <td>{@html formatMoney(item.income)}</td>
            <td>{@html formatMoney(item.income+item.expense)}</td>
        </tr>
    {/each}
    <tr>
        <th>
            Grand total
        </th>
        <th>{@html formatMoney(generated.expense)}</th>
        <th>{@html formatMoney(generated.income)}</th>
        <th>{@html formatMoney(generated.expense+generated.income)}</th>
    </tr>
</table>
<button class="button icon-only pull-right" on:click={copyTable}>
    <Icon title="copier dans le presse-papier" icon="clipboard"/>
</button>


<style>
  button:active {
    background-color: unset;
    border-color: var(--color-lightGrey);
  }
</style>
