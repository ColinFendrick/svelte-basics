<!-- 
	Because Svelte's reactivity is triggered by assignments,
	using array methods like push and splice won't automatically cause updates.
	One way to fix that is to add an assignment that would otherwise be redundant:
-->

<script>
	let numbers = [1, 2, 3, 4];

	function addNumber() {
		numbers = [...numbers, numbers.length + 1];
	}

	$: sum = numbers.reduce((t, n) => t + n, 0);
</script>

<p>{numbers.join(' + ')} = {sum}</p>

<button on:click={addNumber}>
	Add a number
</button>