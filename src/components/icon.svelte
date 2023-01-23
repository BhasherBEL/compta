<script>
    export let library = "clarity"
    export let icon;
    export let size = 16;
    export let color = "#000"
    export let title;
</script>

<img alt="icon {icon}"
     src="https://icongr.am/{library}/{icon}.svg?size={size}&color={color.substring(1)}"
     title="{title}"
     style="height: {size}px; width: {size}px;">
<style>
  img {
    max-width: none;
  }
</style>
