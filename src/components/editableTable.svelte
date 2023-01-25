<script lang="ts">
    import type { IndexedObjectStore } from "../store"
    import type { GenericColumn } from "../utils"
    import EditableValue from "./editableValue.svelte"
    import Icon from "./icon.svelte"
    import {lang, Language } from "../lang/language";
    import { onDestroy } from 'svelte';
    export let tableName = ""
    export let colgroup = []
    export let columns: {[index: string]: GenericColumn<any>}
    export let totalRow: ({[index: string]: GenericColumn<any>}|false)
    export let dataStore: IndexedObjectStore<object>
    export let validateDelete: (arg0: any, arg1: string) => boolean = (_, __) => true
    let lockDelete: boolean = true
    let dataBeingEdited = []
    let newData = {}

    let text: Language; const unsubscribeLang = lang.subscribe(langData => {text = langData;}); onDestroy(unsubscribeLang);

    function toggleEditable(index: string) {
        if (dataBeingEdited.includes(index)) {
            dataBeingEdited = dataBeingEdited.filter((v, _) => v !== index);
            dataStore.swap(index);
        } else {
            dataBeingEdited = [ ...dataBeingEdited, index ]
        }
    }

    function validateChange(data: Object): boolean {
        for (let k in columns){
            if (columns[k].required && (data[k] === undefined || data[k] === "")){
                return false
            }
        }
        return true
    }

    function addNew() {
        let thisNewData = Object.assign({}, newData)
        dataStore.add(thisNewData)
        newData = {}
    }

    function computeAndFormat<T>(column: GenericColumn<T>, key: string, data: T, index: string): string {
        let value = column.compute ? column.compute(data[key], data, index) : data[key]
        return (column.format ? column.format(value, data, index) : value)
    }

    function computeAndFormatTotal<T>(column: GenericColumn<T>, key: string, data: T, indexes: string[]): string {
        let value = column.compute ? column.compute(data[key], data, indexes) : column.name
        return (column.format ? column.format(value, data, indexes) : value)
    }

</script>

<div class="myGrouped is-vertical-align">
    <h2>{tableName}</h2>
    <div class="nav-right">
        <button
            on:click={() => {lockDelete=!lockDelete}}
            class="button icon-only outline button-end"
            title="{text.tooltips.safe_delete(lockDelete)}"
            style="background-color: {lockDelete ? '#dfffdf' : '#fed4d4'}"
        >
            {#if lockDelete}
                <Icon title="{text.tooltips.safe_delete(lockDelete)}" color="#008a00" icon="lock" size={25}/>
            {:else}
                <Icon title="{text.tooltips.safe_delete(lockDelete)}" color="#ac0000" icon="unlock" size={25}/>
            {/if}
        </button>
    </div>
</div>

<table class="striped">
    <colgroup>
        {#each colgroup as col}
            <col style="width: {col.width};" span="{col.span}">
        {/each}
    </colgroup>

    {#if totalRow}
        <thead class="total-row">
            {#each Object.entries(totalRow) as [key, column]}
                <th>
                    {@html computeAndFormatTotal(column, key, Object.values($dataStore), Object.keys($dataStore))}
                </th>
            {/each}
        </thead>
    {/if}

    <tbody>
        <tr>
            {#each Object.entries(columns) as [_, item]}
                <th>{item.name}</th>
            {/each}
        </tr>
        {#each Object.entries($dataStore) as [index, data]}
            <tr>
                {#each Object.entries(columns) as [key, column]}
                    <td>
                        {#if (dataBeingEdited.includes(index))}
                            {#if column.compute}
                                <i class="text-grey">{text.calc_val}</i>
                            {:else}
                                <EditableValue
                                    bind:value={$dataStore[index][key]}
                                    placeholder={column.name}
                                    type={column.type}
                                    suggestions={column.suggestions || []}
                                    suggestions_keys={column.suggestions_keys || []}
                                    required={column.required}
                                />
                            {/if}
                        {:else}
                            {@html computeAndFormat(column, key, data, index)}
                        {/if}
                    </td>
                {/each}
                <td class="grouped gapless pull-right">
                    <button
                            class="button outline icon-only"
                            on:click={() => toggleEditable(index)}
                            disabled="{!validateChange(data)}"
                            title="{text.tooltips.edit_line}"
                            style="background-color: #feebd4"
                    >
                        <Icon title="{text.tooltips.edit_line}" color="#a55500" icon="pencil"/>
                    </button>
                    <button
                            class="button outline icon-only"
                            on:click={() => dataStore.remove(index)}
                            disabled="{!validateDelete(data, index) || lockDelete}"
                            title="{text.tooltips.delete_line}"
                            style="background-color: #fed4d4"
                    >
                        <Icon title="{text.tooltips.delete_line}" color="#ac0000" icon="close"/>
                    </button>
                </td>
            </tr>
        {/each}
        <tr>
            <form id="new-data" on:submit|preventDefault={() => addNew()}></form>
            {#each Object.entries(columns) as [key, item]}
                <td>
                {#if item.compute}
                    <i class="text-grey">{text.calc_val}</i>
                {:else }
                    <EditableValue
                            bind:value={newData[key]}
                            type={item.type}
                            placeholder={item.name}
                            required={item.required}
                            form="new-data"
                            suggestions={item.suggestions || []}
                            suggestions_keys={item.suggestions_keys || []}
                    />
                {/if}
                </td>
            {/each}
            <td>
                <label class="button outline icon-only pull-right" style="background-color: #dfffdf;"
                       title="{text.tooltips.add_line}">
                    <input type="submit" class="is-hidden" form="new-data"/>
                    <Icon title="{text.tooltips.add_line}" color="#008a00" icon="plus"/>
                </label>
            </td>
        </tr>
    </tbody>
</table>
