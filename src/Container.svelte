<script>
	import Card from './Card.svelte';
	
	export let rows = 2;
	export let columns = 2;

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


	let totalWidth = 100;
	const cardMargin = 10;	// There is some text being inserted between divs...
	$: tileWidth = columns > 0 ? (totalWidth / columns) - cardMargin : totalWidth - cardMargin;

	let score = 0
	let cards = []

	function resetCards() {
		const numColors = rows * columns / 2;
		
		let tiles = []
		for (let i = 0; i < numColors; i++) {
			const randomColor = getRandomColor();
			tiles.push(randomColor);
			tiles.push(randomColor);
		}

		shuffle(tiles);
		cards = tiles.map((color, i) => { return {
			id: i,
			color: color,
			isActive: false,
			isInvisible: false,
		}});

		score = 0; 	// This is more that just reseting cards...
	}

	resetCards();

	$: isGameOver = !cards.some(function(card) {
		return !card.isInvisible;
	});

	var visible = []

	function get(id) {
		// This works by creating a subscription, reading the value, then unsubscribing. 
		// It's therefore not recommended in hot code paths.
		return cards[id];
	}
    function show(id) {
		// id is index really...
		cards[id].isActive = true;
	}
    function remove(id) {
		// id is index really...
		cards[id].isInvisible = true;
	}
    function hide(id) {
		// id is index really...
		cards[id].isActive = false;
	}
		
	export function onSelected(c) {
		console.log("SELECTED")
		console.log(c)
		
		if (visible.length < 2) {
			visible.push(c);
			show(c);
		}
		
		if (visible.length === 2) {
			const shouldRemove = get(visible[0]).color === get(visible[1]).color
			if (shouldRemove) {
				console.log("increase score")
				score ++;
			}
			setTimeout(function() {
				visible.forEach(function(c) {
					if (shouldRemove) {
						remove(c);
						// nextStep();
					} else {
						hide(c)
					}
				})
				visible.length = 0;
			}, 1000);
		}
	}
</script>

<style>
	div {
		display: block;
	}
</style>


<h2>
	{score}
</h2>
{#if isGameOver}
	<button on:click={resetCards}>Play again!</button>
{/if}
<div bind:clientWidth={totalWidth}>
	{#each cards as card, i}
		<Card h={tileWidth} w={tileWidth} id={i} active={card.isActive} invisible={card.isInvisible} color={card.color} callback={onSelected} ></Card> 
	  {#if (i+1) % columns === 0}
			<br />
		{/if}
	{/each}
	
</div>