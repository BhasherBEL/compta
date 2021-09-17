<script>
    import { v4 as v4uuid } from "uuid"

    export let type = "string"
    export let placeholder;
    export let suggestions = [];
    export let value
    let id = v4uuid()
</script>
{#if type === "number"}
    <input type="number" bind:value={value} {placeholder} list="{id}">
{:else if type === "date"}
    <input type="date" bind:value={value} {placeholder} list="{id}">
{:else if type === "select"}
    <!--suppress XmlDuplicatedId -->
    <select id="{id}">
        {#each suggestions as suggestion}
            <option>{suggestion}</option>
        {/each}
    </select>
{:else}
    <input bind:value={value} {placeholder} list="{id}">
{/if}
{#if suggestions?.length && type !== "select"}
    <!--suppress XmlDuplicatedId -->
    <datalist id="{id}">
        {#each suggestions as suggestion}
            <option value={suggestion}>
        {/each}
    </datalist>
{/if}
