<!--suppress JSUnfilteredForInLoop -->
<script lang="ts">
    import {v4 as uuidv4} from 'uuid'
    import { formatMoney } from "../utils"
    import Icon from "./icon.svelte"
    import {lang, Language } from "../lang/language";
    import { onDestroy } from 'svelte';
    export let data: Object = {}
    export let categories: string[];
    const id = uuidv4()
    type Row = {
        categoryA?: string
        categoryB?: string
        categoryC?: string
        income?: number
        expense?: number
    }

    let text: Language; const unsubscribeLang = lang.subscribe(langData => {text = langData;}); onDestroy(unsubscribeLang);

    function generateRows(data: Object): {rows: Row[], income: number, expense: number} {
        let rows: Row[] = []
        let [income, expense] = [0,0]
        for (let item in data){
            if (typeof data[item].expense == "number" && typeof data[item].income == "number") {
                rows.push({categoryC: item, income: data[item].income, expense: data[item].expense})
                income += data[item].income
                expense += data[item].expense
            } else {
                let {rows: newRows, income: newIncome, expense: newExpense} = generateRows(data[item])
                for (let row in newRows) {
                    newRows[row].categoryB = newRows[row].categoryA
                    newRows[row].categoryA = ''
                }
                rows.push({categoryA: item, categoryB: '', categoryC: '', income: newIncome, expense: newExpense})
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
        {#each categories as category}
            <th>{category}</th>
        {/each}
        <th>{text.income}</th>
        <th>{text.expense}</th>
        <th>{text.total}</th>
    </tr>
    {#each generated.rows as item}
        <tr>
            <td>{item.categoryA}</td>
            {#if categories.length >= 3}<td>{item.categoryB}</td>{/if}
            <td>{item.categoryC}</td>
            <td>{@html formatMoney(item.income)}</td>
            <td>{@html formatMoney(item.expense)}</td>
            <td>{@html formatMoney(item.income+item.expense)}</td>
        </tr>
    {/each}
    <tr>
        <th>
            {text.total_all}
        </th>
        {#if categories.length >= 3}<th></th>{/if}
        <th></th>
        <th>{@html formatMoney(generated.income)}</th>
        <th>{@html formatMoney(generated.expense)}</th>
        <th>{@html formatMoney(generated.expense+generated.income)}</th>
    </tr>
</table>

<button class="button icon-only pull-right" on:click={copyTable} title="{text.tooltips.clipboard}">
    <Icon title="{text.tooltips.clipboard}" icon="clipboard"/>
</button>

<style>
  button:active {
    background-color: unset;
    border-color: var(--color-lightGrey);
  }
</style>
