<script>
    import {v4} from 'uuid'
    export let type = "string"
    export let placeholder;
    export let suggestions = [];
    export let value
    let id = v4()
</script>
{#if type === "number"}
    <input type="number" bind:value={value} {placeholder} list={id}>
{:else if (type === "date")}
    <input type="date" bind:value={value} {placeholder} list={id}>
{:else}
    <input bind:value={value} {placeholder} list={id}>
{/if}
{#if suggestions.length}
    <datalist {id}>
        {#each suggestions as suggestion}
        <option value={suggestion}>
        {/each}
    </datalist>
{/if}