<script>
    export let icon;
    export let title = "";
    export let size = 16;
    export let color = "black"
</script>

<img class="{color}"
     alt="icon-{icon}"
     title="{title}"
     src="icons/{icon}.svg"
     style="height: {size}px; width: {size}px;">

<style>
    img.black {
        filter: brightness(0) saturate(100%);
    }

    img.red {
        filter: invert(12%) sepia(74%) saturate(4376%) hue-rotate(354deg) brightness(97%) contrast(118%);
    }

    img.orange {
        filter: invert(43%) sepia(41%) saturate(6089%) hue-rotate(2deg) brightness(105%) contrast(104%);
    }

    img.orange-dark {
        filter: invert(30%) sepia(72%) saturate(1759%) hue-rotate(20deg) brightness(93%) contrast(101%);
    }

    img.green {
        filter: invert(23%) sepia(81%) saturate(3748%) hue-rotate(114deg) brightness(96%) contrast(104%);
    }

    img {
        max-width: none;
    }
</style>
