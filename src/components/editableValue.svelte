<script lang="ts">
    import { v4 as v4uuid } from "uuid"

    export let type = "string"
    export let placeholder: string;
    export let suggestions = [];
    export let suggestions_keys = [];
    if (! suggestions_keys.length){
        suggestions_keys = Array.from(suggestions)
    }
    export let value: any
    export let required = false;
    export let form = null

    let id = v4uuid()
</script>

{#if type === "number"}
    <input type="number" bind:value={value} {placeholder} list="{id}" step="0.01" {required} {form}/>
{:else if type === "date"}
    <input type="date" bind:value={value} {placeholder} list="{id}" {required} {form}/>
{:else if type === "select"}
    <!--suppress XmlDuplicatedId -->
    <select id="{id}" bind:value={value} {required} {form}>
        {#each suggestions as _,index}
            <option value="{suggestions_keys[index]}">{suggestions[index]}</option>
        {/each}
    </select>
{:else}
    <input bind:value={value} {placeholder} list="{id}" {required} {form}/>
{/if}

{#if suggestions?.length > 0 && type !== "select"}
    <!--suppress XmlDuplicatedId -->
    <datalist id="{id}">
        {#each suggestions as suggestion}
            <option value={suggestion}>
        {/each}
    </datalist>
{/if}
