<script>
  let currentDate = $state(new Date())

  $effect(() => {
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const timeUntilNextDay = tomorrow.getTime() - currentDate.getTime();
    
    const timeoutId = setTimeout(() => {
      currentDate = new Date();
    }, timeUntilNextDay);
    
    return () => clearTimeout(timeoutId);
  });
  let month = $derived(currentDate.toLocaleString('default', { month: 'short' }));
  let day = $derived(currentDate.getDate())
  let greeting = $derived.by(() => {
    const hours = currentDate.getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 17) return 'Good Afternoon';
    return 'Good Evening';
  })
</script>
<div class="flex gap-6 items-center mb-8">
  <div class="flex flex-col gap-2 items-center font-bold">
    <span class="text-xl lg:text-3xl text-neutral-50 capitalize">{month}</span>
    <span class="text-lg lg:text-xl text-neutral-50">{day}</span>
  </div>
  <div class="flex flex-col gap-2">
    <h1 class="text-3xl font-bold lg:text-5xl text-neutral-50">{greeting}.</h1>
    <p class="text-xl lg:text-3xl text-neutral-50 opacity-50">What's your plans for today?</p>
  </div>
</div>