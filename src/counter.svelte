<script>
	let count = 0;
	$: doubled = count * 2; // compute a value from another value

	$: if (count >= 10) { // and can use this to run functions
		alert(`count is dangerously high!`);
		count = 9;
	}

	function handleClick() {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
	<br />

	doubled is {doubled}
</button>
