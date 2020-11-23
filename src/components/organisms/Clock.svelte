<script>
  import { filteredData } from '../../store/data'
  import DataClock from '../molecules/DataClock.svelte'
  import LoadingClock from '../molecules/LoadingClock.svelte'
</script>

{#if !$filteredData.length}
  <LoadingClock />
{:else}
  <DataClock />
{/if}
