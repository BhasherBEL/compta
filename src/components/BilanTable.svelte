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
        rowStyle?: string,
        income?: number
        expense?: number
    }
    let extendA = true;

    const table_bilan_categoryA: string = "background-color: lightgray; border-bottom: 1px solid darkgray; font-weight: bold;"
    const table_bilan_categoryB: string = "font-weight: 500;"
    const table_bilan_categoryC: string = "font-weight: 300;"

    let text: Language; const unsubscribeLang = lang.subscribe(langData => {text = langData;}); onDestroy(unsubscribeLang);

    function generateRows(data: Object): {rows: Row[], income: number, expense: number} {
        let rows: Row[] = []
        let [income, expense] = [0,0]
        for (let item in data){
            if (typeof data[item].expense == "number" && typeof data[item].income == "number") {
                rows.push({categoryC: item, rowStyle: table_bilan_categoryC, income: data[item].income, expense: data[item].expense})
                income += data[item].income
                expense += data[item].expense
            } else {
                let {rows: newRows, income: newIncome, expense: newExpense} = generateRows(data[item])
                for (let row in newRows) {
                    newRows[row].categoryB = newRows[row].categoryA
                    newRows[row].categoryA = ''
                    if (newRows[row].categoryC === '') newRows[row].rowStyle = table_bilan_categoryB
                }
                rows.push({
                    categoryA: item, categoryB: '', categoryC: '',
                    rowStyle: extendA ? table_bilan_categoryA : '',
                    income: newIncome, expense: newExpense
                })
                if (extendA) {
                    rows = rows.concat(newRows)
                }
                expense += newExpense
                income += newIncome
            }
        }
        return {rows: rows, income: income, expense: expense}
    }

    $: generated = generateRows(data);

    const regenerateData = (isExtended: boolean) => {
        extendA = isExtended;
        generated = generateRows(data);
    }

    function copyTable() {
        const table = document.getElementById(id)
        navigator.clipboard.writeText(table.innerText).catch(() => {
            console.log("An error appended")
        })
    }
</script>

<button class="button icon-only pull-right"
        on:click={() => regenerateData(!extendA)}
        title="{text.tooltips.scale_balance(extendA)}"
>
    {#if extendA}
        <Icon title="{text.tooltips.scale_balance(extendA)}" icon="minus"/>
    {:else}
        <Icon title="{text.tooltips.scale_balance(extendA)}" icon="plus"/>
    {/if}
</button>

<table class="striped" {id}>
    <tr style="border-bottom: 2px solid gray; font-size: 17px;">
        {#if extendA}
            {#each categories as category}
                <th>{category}</th>
            {/each}
        {:else}
            <th>{categories[0]}</th>
        {/if}
        <th>{text.income}</th>
        <th>{text.expense}</th>
        <th>{text.total}</th>
    </tr>
    {#each generated.rows as item}
        <tr style="{item.rowStyle}">
            <td>{item.categoryA}</td>
            {#if extendA}
                {#if categories.length >= 3}<td class="table-vline">{item.categoryB}</td>{/if}
                <td  class="table-vline">{item.categoryC}</td>
            {/if}
            <td class="table-vline">{@html formatMoney(item.income)}</td>
            <td class="table-vline">{@html formatMoney(item.expense)}</td>
            <td class="table-vline">{@html formatMoney(item.income+item.expense)}</td>
        </tr>
    {/each}
    <tr style="border-top:2px solid gray;">
        <th style="font-size: 17px;">
            {text.total_all}
        </th>
        {#if extendA}
            {#if categories.length >= 3}<th></th>{/if}
            <th></th>
        {/if}
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
