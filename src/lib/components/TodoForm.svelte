<script lang="ts">
  let newTodo = $state("")
  let { addTodo } : { addTodo: (newTodo: string) => void; } = $props();
  function formTodoSent(e: SubmitEvent){
    e.preventDefault();
    if(newTodo == "") return alert("Todo should have anything")
    addTodo(newTodo);
    newTodo = "";
  }
</script>
<form onsubmit={formTodoSent}>
  <label class="sr-only" for="addTodo">
  </label>
  <div class="flex gap-4 w-full">
    <input name="addTodo" bind:value={newTodo} class="bg-neutral-50 w-5/6 py-4 rounded-md px-4 text-zinc-800" type="text" placeholder="Add todo">
    <button class="bg-neutral-50 w-1/6 text-zinc-700 rounded-md cursor-pointer hover:bg-neutral-50/80 transition-all">Add todo</button>
  </div>
</form>