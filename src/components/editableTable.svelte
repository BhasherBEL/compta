<script lang="ts">
    import type { IndexedObjectStore } from "../store"
    import type { GenericColumn } from "../utils"
    import EditableValue from "./editableValue.svelte"
    import Icon from "./icon.svelte"
    export let colgroup = []
    export let columns: {[index: string]: GenericColumn<any>}
    export let dataStore: IndexedObjectStore<object>
    export let validateDelete: (arg0: any, arg1: string) => boolean = (_, __) => true
    let dataBeingEdited = []
    let newData = {}

    function toggleEditable(index: string) {
        if (dataBeingEdited.includes(index)) {
            dataBeingEdited = dataBeingEdited.filter((v, _) => v
                !== index)
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

</script>

<table class="striped">
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
                        {#if column.nature === "computed"}
                            <i class="text-grey">Valeur calculée</i>
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
                        {@html column.format ? column.format(data[key], data, index) : data[key]}
                    {/if}
                </td>
            {/each}
            <td class="grouped gapless pull-right">
                <button
                        class="button outline icon-only"
                        on:click={() => toggleEditable(index)}
                        disabled="{!validateChange(data)}"
                >
                    <Icon icon="pencil"/>
                </button>
                <button
                        class="button outline icon-only"
                        on:click={() => dataStore.remove(index)}
                        disabled="{!validateDelete(data, index)}"
                        title="Test"
                >
                    <Icon icon="close"/>
                </button>
            </td>
        </tr>
    {/each}
    <tr>
        <form id="new-data" on:submit|preventDefault={() => addNew()}></form>
        {#each Object.entries(columns) as [key, item]}
            <td>
            {#if item.nature === "computed"}
                <i class="text-grey">Valeur calculée</i>
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
            <label class="button icon-only pull-right">
                <input type="submit" class="is-hidden" form="new-data">
                <Icon icon="plus"/>
            </label>
        </td>
    </tr>
</table>