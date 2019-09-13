<style>
	div {
    display: inline-block;
		background-color: red;
		margin: 2px;
	}
	
	.invisible {
		visibility:hidden
	}
</style>

<script>
	
	export let w = 40;
	export let h = 40;
	export let color = "black";
	export let id;
	export let callback = function(c) { console.log("Default callback...", c) }
	
	export let active = false;
	export let invisible = false;
	$: colorShown = active ? color : "red";

	function onClicked() {
		callback(id)
	}

	
</script>

<div class:invisible on:click={onClicked} style="background-color:{colorShown};height:{h}px; width:{w}px;"></div>
