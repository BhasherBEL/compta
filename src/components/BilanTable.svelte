<!--suppress JSUnfilteredForInLoop -->
<script lang="ts">
    import { formatMoney } from "../utils"
    export let data = {}

    type Row = {
        category: string
        income: number
        expense: number
    }

    function generateRows(data): {rows: Row[], income:number, expense: number} {
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

    let { rows: rows, expense: output, income: input } = generateRows(data)
</script>

<table class="striped">
    <tr>
        <th>Catégorie</th>
        <th>Sortie</th>
        <th>Entrée</th>
        <th>Total général</th>
    </tr>
    {#each rows as item}
        <tr>
            <td>{item.category}</td>
            <td>{formatMoney(item.expense)}</td>
            <td>{formatMoney(item.income)}</td>
            <td>{formatMoney(item.income+item.expense)}</td>
        </tr>
    {/each}
    <tr>
        <th>
            Grand total
        </th>
        <th>{formatMoney(output)}</th>
        <th>{formatMoney(input)}</th>
        <th>{formatMoney(output+input)}</th>
    </tr>
</table>
