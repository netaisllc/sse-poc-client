<script>
	import { onMount } from 'svelte';
	import { createChannelStore } from '$lib/store';
	let messages = [];

	let ref;

	onMount(() => {
		const store = createChannelStore();

		store.subscribe((incomingMessages) => {
			messages = incomingMessages;
		});

		return store.close;
	});

	$: {
		console.log('Messages:', messages);
		if (ref) {
			ref.scrollTop = ref.scrollHeight;
		}
	}
</script>

<main>
	<h3>Messages:</h3>
	<section bind:this={ref}>
		{#if !messages || messages.length === 0}
			<div class="message">Setting up connection...</div>
		{/if}

		{#each messages as msg, i}
			<div class="message">
				<div class="num {!msg.channel || msg.channel === '*' ? 'public' : 'private'}">{i + 1}.</div>
				<div>
					<div>{msg.info}</div>
					<div class="source">{msg.source}</div>
				</div>
			</div>
		{/each}
	</section>
	<h5>Count: <span>{messages.length ? messages.length : 0}</span></h5>
</main>

<style>
	h3,
	h5 {
		background-color: black;
		height: 56px;
		padding: 0 1rem;
		margin: 0;
		line-height: 56px;
	}
	h5 {
		height: 44px;
		line-height: 44px;
		text-align: center;
		color: #aaa;
	}
	main {
		background-color: #151515;
		color: white;
		height: 100%;
		width: 100%;
		margin: 0;
		padding: 0;
	}
	section {
		height: calc(100vh - 100px);
		overflow-y: auto;
		overflow-x: hidden;
		padding: 0 1rem 3rem;
		width: 100%;
		background-color: #565656;
	}
	span {
		color: goldenrod;
	}
	.message {
		align-items: center;
		display: flex;
		font-size: 0.875rem;
		height: 3rem;
		margin: 1rem;
		padding-right: 1.5rem;
		width: 100%;
	}
	.num {
		padding: 0.5rem;
		border-radius: 3px;
		margin-right: 1rem;
	}
	.private {
		background-color: rgb(184, 36, 184);
	}
	.public {
		background-color: #323232;
	}
	.source {
		color: #a5a5a5;
	}
</style>
