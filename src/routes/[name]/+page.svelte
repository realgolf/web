<script lang="ts">
  import { onMount } from "svelte";

  export let data;

  let hasRedirected = false;

  onMount(() => {
    const correctCasedUrl = `/${data.user_username}`;

    if (data.user_username == undefined) return;
    if (!hasRedirected && window.location.pathname !== correctCasedUrl) {
      window.location.href = correctCasedUrl;
      hasRedirected = true;
    }
  });
</script>

<svelte:head>
  <title>{data.user_username} ({data.user_username})</title>
</svelte:head>

<h1>{data.user_username}</h1>
<p>{data.user_username}</p>
