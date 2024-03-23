<!--suppress JSUnfilteredForInLoop -->
<script lang="ts">
  import Icon from "./icon.svelte";

  export let data: Object = {};

  let tbody: HTMLTableSectionElement;

  function generateHeadRows() {
    const rows: Object[] = generateRows(data);

    const totalIcome = rows.reduce(
      (acc, row) => acc + (row["key"][0] == " " ? 0 : row["income"]),
      0
    );

    const totalExpense = rows.reduce(
      (acc, row) => acc + (row["key"][0] == " " ? 0 : row["expense"]),
      0
    );

    const total = totalIcome + totalExpense;

    rows.push({
      key: "Total général",
      expense: totalExpense,
      income: totalIcome,
      total: total,
    });

    return rows;
  }

  function generateRows(data: Object): Object[] {
    const rows: Object[] = [];
    for (let [key, value] of Object.entries(data)) {
      if ("expense" in value && "income" in value) {
        rows.push({
          key: key,
          expense: value.expense,
          income: value.income,
          total: value.expense + value.income,
        });
        continue;
      }

      const subRows = generateRows(value);
      const totalIncome = subRows.reduce(
        (acc, row) => acc + (row["key"][0] == " " ? 0 : row["income"]),
        0
      );
      const totalExpense = subRows.reduce(
        (acc, row) => acc + row["expense"],
        0
      );
      const total = totalIncome + totalExpense;
      rows.push({
        key: key,
        expense: totalExpense,
        income: totalIncome,
        total: total,
      });

      subRows.forEach((row) => {
        rows.push({
          key: "    " + row["key"],
          expense: row["expense"],
          income: row["income"],
          total: row["total"],
        });
      });
    }
    return rows;
  }

  $: copyClicked = false;

  function copyTable() {
    navigator.clipboard
      .writeText(tbody.innerText.replaceAll("\n\n", "\n"))
      .catch(() => {
        console.log("An error appended");
      })
      .then(() => {
        copyClicked = true;
        setTimeout(() => {
          copyClicked = false;
        }, 1000);
      });
  }
</script>

<table>
  <thead>
    <tr>
      <th>Etiquettes</th>
      <th>Entrée</th>
      <th>Sortie</th>
      <th>Total général</th>
    </tr>
  </thead>
  <tbody bind:this={tbody}>
    {#each generateHeadRows() as row}
      <tr class:head={row["key"][0] != " "}>
        <td style="white-space: pre;">
          {row["key"]}
        </td>
        <td>{row["income"].toFixed(2).replaceAll(".", ",")}</td>
        <td>{row["expense"].toFixed(2).replaceAll(".", ",")}</td>
        <td>{row["total"].toFixed(2).replaceAll(".", ",")}</td>
      </tr>
    {/each}
  </tbody>
</table>

<button
  on:click={() => copyTable()}
  class="button icon-only outline pull-right"
>
  <Icon icon={copyClicked ? "check" : "clipboard"} size={25} />
</button>

<style>
  .head {
    font-weight: bold;
    border-top: 1px solid #ccc;
  }

  tr {
    /* border-bottom: 1px solid #ccc; */
    height: 150%;
    line-height: 200%;
  }

  th,
  tr:last-child td:first-child {
    text-transform: uppercase;
    font-size: 0.9em;
  }
</style>
