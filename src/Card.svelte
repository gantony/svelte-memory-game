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
	
	export let callback = function(c) { console.log("Default callback...", c) }
	
	let active = false;
	let invisible = false;
	$: colorShown = active ? color : "red";
	//let colorShown = active ? color : "red";
	function onClicked() {
		callback({
			color: color,
			show: show,
			hide: hide,
			remove: remove
		})
	}
	function show() {
		console.log("Clicked")
		if (!active) {
			active = true;
		}
		
	}
	export function hide() {
		active = false;
	}
	
	function remove() {
		invisible = true;
	}
	
</script>

<div class:invisible on:click={onClicked} style="background-color:{colorShown};height:{h}px; width:{w}px;">
	
</div>
