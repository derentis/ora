<script>
  import { onMount } from 'svelte'
  import dj from 'dayjs'

  import DateInput from './DateInput.svelte'

  export let start = new Date()
  export let end = new Date()

  function set(interval, amount = 1) {
    return () => {
      start = dj().subtract(amount, interval).startOf('day').toDate()
      end = dj().endOf('day').toDate()
    }
  }

  function all() {
    start = new Date(0)
    end = new Date()
  }

  // Init
  onMount(() => set('day', 0)())
</script>

<style>
  .spacer {
    width: 0.5em;
  }
</style>

<div class="flex items-center">
  <div class="btn-group">
    <button class="btn btn-sm" on:click={all}>All</button>
    <button class="btn btn-sm" on:click={set('month', 1)}>Month</button>
    <button class="btn btn-sm" on:click={set('week', 1)}>Week</button>
    <button class="btn btn-sm" on:click={set('day', 3)}>3 Days</button>
    <button class="btn btn-sm" on:click={set('day', 0)}>Today</button>
  </div>
  <div class="spacer" />
  <div class="input-group">
    <DateInput bind:date={start} />
    <DateInput bind:date={end} />
  </div>
</div>
