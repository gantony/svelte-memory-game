<script>
	import { store, score } from './store.js';
	import Card from './Card.svelte';
	
	export let rows = 2;
	export let columns = 2;
	
	store.init(rows, columns);

	function getRandomColor() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
	
	/**
	 * Shuffles array in place.
	 * @param {Array} a items An array containing the items.
	 */
	function shuffle(a) {
			var j, x, i;
			for (i = a.length - 1; i > 0; i--) {
					j = Math.floor(Math.random() * (i + 1));
					x = a[i];
					a[i] = a[j];
					a[j] = x;
			}
			return a;
	}

	// export let score = 0
	
	// const numColors = rows * columns / 2;
	
	// let tiles = []
	// for (let i = 0; i < numColors; i++) {
	// 	const randomColor = getRandomColor();
	// 	tiles.push(randomColor);
	// 	tiles.push(randomColor);
	// }
	
	// // function nextStep() {

	// // }

	// shuffle(tiles);
	// var visible = []
	// export function onSelected(c) {
	// 	console.log("SELECTED")
	// 	console.log(c)
		
	// 	if (visible.length < 2) {
	// 		visible.push(c);
	// 		c.show();
	// 	}
		
	// 	if (visible.length === 2) {
	// 		const shouldRemove = visible[0].color === visible[1].color
	// 		if (shouldRemove) {
	// 			console.log("increase score")
	// 			score ++;
	// 		}
	// 		setTimeout(function() {
	// 			visible.forEach(function(c) {
	// 				if (shouldRemove) {
	// 					c.remove();
	// 					nextStep();
	// 				} else {
	// 					c.hide()
	// 				}
	// 			})
	// 			visible.length = 0;
	// 		}, 1000);
	// 	}
	// }
</script>

<style>
	div {
		display: block;
	}
</style>

<h2>
	{$score}
</h2>
<div>
	{#each $store as card, i}
		<Card h=70 w=70 id={i} active={card.isActive} invisible={card.isInvisible}  color={card.color} ></Card> 
	  {#if (i+1) % columns === 0}
			<br />
		{/if}
	{/each}
	
</div>