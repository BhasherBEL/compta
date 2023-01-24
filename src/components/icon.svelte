<script>
    export let library = "clarity"
    export let icon;
    export let title = "";
    export let size = 16;
    export let color = "#000"
</script>

<img alt="icon {icon}"
     title="{title}"
     src="https://icongr.am/{library}/{icon}.svg?size={size}&color={color.substring(1)}"
     style="height: {size}px; width: {size}px;">

<style>
  img {
    max-width: none;
  }
</style>
