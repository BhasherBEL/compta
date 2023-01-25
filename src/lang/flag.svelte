<script>
    export let lang;
    export let title = "";
    export let size = 16;
</script>

<img alt="icon {lang}"
     title="{title}"
     src="{lang}.svg"
     style="height: {size}px; width: {size}px;">

<style>
  img {
    max-width: none;
  }
</style>
