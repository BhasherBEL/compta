<script>
export let data = {
    "Sans event":{
        "fonctionnement general":{
            "Frais CB": [10,0], "Frais compte": [5,0]
        },
        "subsides":{
            "UCL":[0,100]
        }
    }
}

function generateRows(data) {
    let rows = []
    let [tot_input, tot_output] = [0,0]
    for (let item in data){
        if (data[item].constructor === Array) {
            rows.push([item, data[item][0], data[item][1], data[item][1]+data[item][0]])
            tot_input += data[item][0]
            tot_output += data[item][1]
        } else {
            let [newRows, output, input] = generateRows(data[item])
            console.log(newRows)
            for (let row in newRows) {
                newRows[row][0] = '..'+newRows[row][0]
            }
            rows.push([item, output, input, input + output])
            rows = rows.concat(newRows)
            tot_output += output
            tot_input += input
        }
    }
    return [rows, tot_output, tot_input]
}

let [rows, input, output] = generateRows(data)
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
            {#each item as value}
                <td>{value}</td>
            {/each}
        </tr>
    {/each}
</table>