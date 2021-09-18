<script>
    import { v4 as v4uuid } from "uuid"

    export let type = "string"
    export let placeholder;
    export let suggestions = [];
    export let value
    export let required = false;

    let id = v4uuid()
</script>
{#if type === "number"}
    <input type="number" bind:value={value} {placeholder} list="{id}" step="0.01" {required}>
{:else if type === "date"}
    <input type="date" bind:value={value} {placeholder} list="{id}" {required}>
{:else if type === "select"}
    <!--suppress XmlDuplicatedId -->
    <select id="{id}" bind:value={value} {required}>
        {#each suggestions as suggestion}
            <option value="{suggestion}">{suggestion}</option>
        {/each}
    </select>
{:else}
    <input bind:value={value} {placeholder} list="{id}" {required}>
{/if}
{#if suggestions?.length > 0 && type !== "select"}
    <!--suppress XmlDuplicatedId -->
    <datalist id="{id}">
        {#each suggestions as suggestion}
            <option value={suggestion}>
        {/each}
    </datalist>
{/if}
