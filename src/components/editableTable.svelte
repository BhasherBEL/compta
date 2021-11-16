<script lang="ts">
    import type { Writable } from "svelte/store"
    import type { GenericColumn } from "../utils"
    import EditableValue from "./editableValue.svelte"
    import Icon from "./icon.svelte"
    export let colgroup = []
    export let columns: {[index: string]: GenericColumn}
    export let dataStore: Writable<Object>;
    export let validateChange: (arg0: Object) => boolean
    export let addNew: (arg0: Object) => void
    let dataBeingEdited = []
    let newData = {}

    function toggleEditable(index: number) {
        if (dataBeingEdited.includes(index)) {
            dataBeingEdited = dataBeingEdited.filter((v, _) => v
                !== index)
        } else {
            dataBeingEdited = [ ...dataBeingEdited, index ]
        }
    }
</script>

<table class="striped" width="90%">
    <colgroup>
        {#each colgroup as col}
            <col style="width: {col.width};" span="{col.span}">
            {/each}
    </colgroup>
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
                        <EditableValue
                            bind:value={$dataStore[index][key]}
                            placeholder={column.name}
                            type={column.type}
                            suggestions={column.suggestions || []}
                            suggestions_keys={column.suggestions_keys || []}
                            required={column.required}
                        />
                    {:else}
                        {column.format ? column.format(data[key], data, index) : data[key]}
                    {/if}
                </td>
            {/each}
            <th class="grouped gapless pull-right">
                <button class="button outline icon-only" on:click={() => toggleEditable(index)} disabled="{!validateChange(data)}">
                    <Icon icon="pencil"/>
                </button>
                <button class="button outline icon-only"
                        on:click={() => $dataStore.remove(index)}>
                    <Icon icon="close"/>
                </button>
            </th>
        </tr>
    {/each}
    <tr>
        <form id="new-data" on:submit|preventDefault={addNew}></form>
        {#each Object.entries(columns) as [key, item]}
            <td>
            {#if item.nature === "input"}
                <EditableValue bind:value={newData[key]} type="{item.type}" placeholder="{item.name}" required="{item.required}" form="new-data-"/>
                {:else }
                <i class="text-grey">Valeur calculée</i>
                {/if}
            </td>
            {/each}
        <td>
            <label class="button icon-only">
                <input type="submit" class="is-hidden" form="account-new">
                <Icon icon="plus"/>
            </label>
        </td>
    </tr>
</table>