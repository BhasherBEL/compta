<script>
    export let library = "octicons"
    export let icon;
    export let size=16;
    export let color="#000000"
</script>

<img style="height:{size}px; width:{size}px" alt="icon {icon}" src="https://icongr.am/{library}/{icon}.svg?size={size}&color={color.substring(1)}">

<style>
    img {
        max-width: none;
    }
</style>