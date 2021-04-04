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

  $: initialDate = new Date(date);
  $: initialMonth = initialDate.getMonth();
  $: initialDay = initialDate.getDate();
  $: initialYear = initialDate.getFullYear();

  $: month = date.getMonth();
  $: day = date.getDate();
  $: year = date.getFullYear();

  $: month = date.getMonth();
  $: day = date.getDate();
  $: year = date.getFullYear();

  let daySets = [];
  let pickingMonth = false;
  let pickingYear = false;
  let today = new Date();
  let currentDay = today.getDate();

  $: setDaySets(year, month);

  function changeMonth(event) {
    date.setMonth(event.target.value);
    date = date; // trigger reactivity
  }

  function changeYear(event) {
    console.log(
      'DatePicker.svelte changeYear: event.target.value =',
      event.target.value
    );
    date.setFullYear(Number(event.target.value));
    console.log('DatePicker.svelte changeYear: date =', date);
    date = date; // trigger reactivity
  }

  function setDaySets(y, m) {
    daySets = [];

    const isCurrentMonth = y === today.getFullYear() && m === today.getMonth();
    const isInitialMonth =
      y === initialDate.getFullYear() && m === initialMonth;

    const d = new Date(y, m, 1); // 1st of current month
    const dayOfWeekIndex = d.getDay();
    const remaining = 7 - dayOfWeekIndex;

    if (dayOfWeekIndex > 0) {
      const end = getLastDayInPreviousMonth();
      const start = end - dayOfWeekIndex + 1;
      const set = [];
      for (let day = start; day <= end; day++) {
        set.push(day + 'p');
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
        const suffix = lastRow
          ? 'n'
          : isCurrentMonth && day === currentDay
          ? 't'
          : '';
        set.push(lastRow ? day + suffix : String(day));
        day++;
        if (day > end) {
          day = 1;
          lastRow = true;
        }
      }
      daySets.push(set);
    }
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

  function pickMonth() {
    alert('not implemented yet');
  }

  function pickYear() {
    alert('not implemented yet');
  }

  function previousMonth() {
    date.setMonth(date.getMonth() - 1);
    date = date; // trigger reactivity
  }
</script>

<div class="date-picker">
  <header>
    <div>
      <button class="bare" on:click={previousMonth} type="button">&lt;</button>
      <div>
        <select on:change={changeMonth} value={month}>
          {#each MONTHS as month, index}
            <option value={index}>{month}</option>
          {/each}
        </select>
        <select on:change={changeYear} value={year}>
          {#each Array(maxYear - minYear + 1) as _, index}
            <option>{minYear + index}</option>
          {/each}
        </select>
      </div>
      <button class="bare" on:click={nextMonth} type="button">&gt;</button>
    </div>
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
              class:next={day.endsWith('n')}
              class:previous={day.endsWith('p')}
              class:selected={day.endsWith('s')}
              class:today={day.endsWith('t')}
              on:click={() => console.log(day)}
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
</div>

<!-- markup (zero or more items) goes here -->
<style>
  .date-picker {
    display: inline-block;

    background-color: white;
    border: 1px solid gray;
    height: 11.5rem;
    padding: 1rem;
  }

  header > div {
    display: flex;
    justify-content: space-between;
  }

  .next,
  .previous {
    color: gray;
  }

  td {
    text-align: right;
  }

  td:hover {
    background-color: lightgray;
    font-weight: bold;
  }

  th {
    padding: 0.5rem 0.2rem;
  }

  .today > .day {
    --size: 1.7rem;

    border: 1px solid green;
    border-radius: calc(var(--size) / 2);
    box-sizing: border-box;
    height: var(--size);
    padding-top: 3px;
    text-align: center;
    width: var(--size);
  }
</style>
