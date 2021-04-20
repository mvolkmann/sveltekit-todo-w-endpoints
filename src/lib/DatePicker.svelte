<script>
  export let date = new Date();
  export let minYear = date.getFullYear() - 10;
  export let maxYear = date.getFullYear() + 10;

  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  $: console.log('DatePicker.svelte: date =', date);

  $: month = date.getMonth();
  $: year = date.getFullYear();

  let daySets = [];
  const today = new Date();
  let currentDay = today.getDate();

  $: setDaySets(year, month);

  function changeMonth(event) {
    date.setMonth(event.target.value);
    date = date; // trigger reactivity
  }

  function changeYear(event) {
    date.setFullYear(Number(event.target.value));
    date = date; // trigger reactivity
  }

  function getDateSuffix(year, month, day) {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return 'b'; // for before
    }

    if (year > currentYear || (year === currentYear && month > currentMonth)) {
      return 'a'; // for after
    }

    if (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    ) {
      return 't'; // for today
    }

    const currentDay = date.getDate();
    if (year === currentYear && month === currentMonth && day === currentDay) {
      return 's'; // for selected
    }

    return '';
  }

  function getLastDayInCurrentMonth() {
    const d = new Date(year, month + 1, 1); // 1st of next month
    d.setDate(d.getDate() - 1);
    return d.getDate();
  }

  function getLastDayInPreviousMonth() {
    const d = new Date(year, month, 1); // 1st of current month
    d.setDate(d.getDate() - 1);
    return d.getDate();
  }

  function nextMonth() {
    date.setMonth(date.getMonth() + 1);
    date = date; // trigger reactivity
  }

  function previousMonth() {
    date.setMonth(date.getMonth() - 1);
    date = date; // trigger reactivity
  }

  function setDaySets(y, m) {
    daySets = [];

    const isCurrentMonth = y === today.getFullYear() && m === today.getMonth();

    const d = new Date(y, m, 1); // 1st of current month
    const dayOfWeekIndex = d.getDay();
    const remaining = 7 - dayOfWeekIndex;

    if (dayOfWeekIndex > 0) {
      const end = getLastDayInPreviousMonth();
      const start = end - dayOfWeekIndex + 1;
      const set = [];
      for (let day = start; day <= end; day++) {
        set.push(day + 'b');
      }
      for (let day = 1; day <= remaining; day++) {
        const suffix = isCurrentMonth && day === currentDay ? 't' : '';
        set.push(day + suffix);
      }
      daySets.push(set);
    }

    let day = remaining + 1;
    const end = getLastDayInCurrentMonth();
    let lastRow = false;
    while (!lastRow) {
      const set = [];
      for (let i = 0; i < 7; i++) {
        set.push(day + getDateSuffix(y, m, day));
        day++;
        if (day > end) {
          day = 1;
          lastRow = true;
        }
      }
      daySets.push(set);
    }

    //console.log('DatePicker.svelte setDaySets: daySets =', daySets);
  }
</script>

<div class="date-picker">
  <header>
    <button class="bare" on:click={previousMonth} type="button">&lt;</button>
    <div>
      <div class="select-wrapper">
        <select
          class="month-select"
          on:blur={changeMonth}
          on:change={changeMonth}
          value={month}
        >
          {#each MONTHS as month, index}
            <option value={index}>{month}</option>
          {/each}
        </select>
      </div>
      <div class="select-wrapper">
        <select
          class="year-select"
          on:blur={changeYear}
          on:change={changeYear}
          value={year}
        >
          {#each Array(maxYear - minYear + 1) as _, index}
            <option>{minYear + index}</option>
          {/each}
        </select>
      </div>
    </div>
    <button class="bare" on:click={nextMonth} type="button">&gt;</button>
  </header>
  <table>
    <thead>
      <tr>
        {#each DAYS as day}
          <th>{day}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each daySets as daySet}
        <tr>
          {#each daySet as day}
            <td
              class:after={day.endsWith('a')}
              class:before={day.endsWith('b')}
              class:selected={day.endsWith('s')}
              class:today={day.endsWith('t')}
              on:click={() => (date = new Date(year, month, day))}
            >
              <div class="day">
                {parseInt(day, 10)}
              </div>
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
  <div class="buttons">
    <button on:click={() => (date = new Date())}>Today</button>
  </div>
</div>

<!-- markup (zero or more items) goes here -->
<style>
  .buttons {
    margin-top: 0.5rem;
  }

  .date-picker {
    display: inline-flex;
    flex-direction: column;
    align-items: center;

    background-color: white;
    border: 1px solid gray;
    padding: 0.5rem 1rem 1rem 1rem;
  }

  .day {
    --size: 1.8rem;

    border: 1px solid transparent;
    border-radius: calc(var(--size) / 2);
    box-sizing: border-box;
    display: inline-block;
    height: var(--size);
    padding-top: 3px;
    text-align: center;
    width: var(--size);
  }

  /* .date-picker :global(select) {
    border-color: transparent;
  } */

  header {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  header > div {
    display: flex;
    justify-content: space-between;
  }

  .month-select {
    width: 7rem;
  }

  .after,
  .before {
    color: gray;
  }

  table {
    height: 14rem;
  }

  td {
    /* border: 1px solid lightgray; */
    text-align: right;
  }

  td:hover {
    background-color: lightgray;
    font-weight: bold;
  }

  th {
    padding: 0.5rem 0.2rem;
    width: 2.2rem;
  }

  .today > .day {
    border-color: green;
  }

  .year-select {
    width: 4.5rem;
  }
</style>
