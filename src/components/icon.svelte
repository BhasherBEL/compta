<script>
    export let library = "octicons"
    export let icon;
    export let size = 16;
    export let color = "#000"
</script>

<img alt="icon {icon}"
     src="https://icongr.am/{library}/{icon}.svg?size={size}&color={color.substring(1)}"
     style="height: {size}px; width: {size}px;">

<style>
  img {
    max-width: none;
  }
</style>
