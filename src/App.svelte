<script>
	import Container from './Container.svelte';
	let name = 'world';
	let total = 0;
</script>

<h1>Memory game {total}</h1>
<Container bind:score={total} rows=4 columns=3> </Container>
