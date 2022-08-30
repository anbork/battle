<script lang="ts">
  import { onMount } from 'svelte'
  import { TabContent, TabPane } from 'sveltestrap'
  import nearIcon from '../../../svg/near'

  interface HistoryRow {
    token_id: number,
    curr_owner: string,
    date: string,
    price: number,
  }

  interface History {
    history: HistoryRow[],
    statistics: {
      total_trades_volume: String,
      total_number_of_trades: Number,
      top_trade: String
    }
  }

  let paid: History = {
    history: [],
    statistics: {
      total_trades_volume: "0",
      total_number_of_trades: 0,
      top_trade: "0"
    }
  }

  onMount(async () => {
    const response = await fetch('/api?url=/rest/paid?limit=10');
    paid = await response.json();
  })

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(str: string) {
    let datenum = Date.parse(str)
    let date = new Date(datenum) as Date
    return (
      [
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        date.getFullYear(),
      ].join('/') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }

</script>

<style>
  .list-item {
    background: rgba(200, 200, 200, 0.2);
    border-radius: 15px;
    padding: 30px 10px;
    margin: 0 0 25px 0;
  }
</style>

<h1 class="text-center">Latest sales</h1>

<section class="sales">

  <div class="row py-5 text-center">
    <div class="col-12 col-md-4">
      <div class="list-item">
        <div class="fs-6 pb-2">Total sale volume</div>
        <h3 class="d-inline-flex align-items-center lh-base">
          {@html nearIcon(23,23)}
          <span class="ps-2">{paid.statistics.total_trades_volume}</span>
        </h3>
      </div>
    </div>
    <div class="col-12 col-md-4">
      <div class="list-item">
        <div class="fs-6 pb-2">Total number of sales</div>
        <h3 class="d-inline-flex align-items-center lh-base">
          {paid.statistics.total_number_of_trades}
        </h3>
      </div>
    </div>
    <div class="col-12 col-md-4">
      <div class="list-item">
        <div class="fs-6 pb-2">Top sale</div>
        <h3 class="d-inline-flex align-items-center lh-base">
          {@html nearIcon(23,23)}
          <span class="ps-2">{paid.statistics.top_trade}</span>
        </h3>
      </div>
    </div>
  </div>

  
  <table class="table text-white">
    <thead>
      <tr>
        <th>
          <span>ID</span>
        </th>
        <th>
          <span>Type</span>
        </th>
        <th>
          <span>Buyer</span>
        </th>
        <th>
          <span>When</span>
        </th>
        <th>
          <span>Sell price</span>
        </th>
      </tr>
    </thead>
    <tbody>
      {#if paid.history.length < 1}
        <tr>
          <td colspan="5" class="text-center">No history yet</td>
        </tr>
      {/if}
      {#each paid.history as row }
        <tr>
          <td>
            <span>{row.token_id}</span>
          </td>
          <td>
            <span>Item</span>
          </td>
          <td>
            <span>{row.curr_owner}</span>
          </td>
          <td>
            <span>{formatDate(row.date)}</span>
          </td>
          <td>
            <span>{row.price}</span>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>