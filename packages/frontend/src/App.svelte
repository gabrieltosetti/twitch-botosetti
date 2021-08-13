<script lang="ts">
  import { onMount } from "svelte";

  import { fly } from "svelte/transition";
  // import { flip } from 'svelte/animate';

  type Participant = {
    userId: string;
    displayName: string;
    mod: boolean;
    sub: boolean;
  };

  let participants: Participant[] = [];

  onMount(() => {
    const sse = new EventSource("http://localhost:4000/twitch/listen");

    sse.addEventListener("open", (e) => {
      console.log("Connected");
    });

    sse.addEventListener("message", (e: MessageEvent<string>) => {
      const list: string[] = JSON.parse(e.data);
      participants = list.map((i) => JSON.parse(i));
    });
  });
</script>

<svelte:head>
  <title>Twitch</title>
</svelte:head>

<div>
  <h1>Participantes</h1>

  <ul>
    {#each participants as participant (participant.userId)}
      <li in:fly={{ x: -200, duration: 200 }}>{participant.displayName}</li>
    {/each}
  </ul>
</div>
