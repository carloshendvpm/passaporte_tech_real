<script lang="ts">
  import type { Todo } from "$lib/types";
  import { fade } from "svelte/transition";
  let {
    todos,
    toggleDone,
    removeTodo,
    editTodo
  }: {
    todos: Todo[];
    toggleDone: (todo: Todo) => void;
    removeTodo: (id: string) => void;
    editTodo: (e: Event) => void;
  } = $props();
  $inspect(todos)
</script>
<section class="flex flex-col gap-4 mt-4">
  {#each todos as todo, i (todo.id)}
     <div class:opacity-50={todo.done} transition:fade={{ duration: 300 }}  class="bg-neutral-50 w-full py-4 px-4 rounded-md shadow-md border-2 border-neutral-200">
        <div class="flex items-center gap-2">
          <input onchange={() => toggleDone(todo)} data-index={i} checked={todo.done} class="w-6 h-6 shadow-lg rounded-full mr-2 cursor-pointer transition-all hover:border-purple-700 accent-red-100 appearance-none border-2  checked:bg-purple-900" type="checkbox" name="" id="">
          <div class="flex flex-col w-full">
            <span class="select-none text-xs text-neutral-600">
              📅 Created at:
              {todo.createdAt.toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
            </span>
            <div class="w-full flex gap-1">
              <input disabled={todo.done} oninput={editTodo} data-index={i} class:line-through={todo.done} class="text-sm md:text-xl appearance-none focus:outline-none line-through w-full" value={todo.title} type="text">
              
              <button 
              onclick={() => removeTodo(todo.id)}
              class="cursor-pointer "
              aria-label="Delete todo"
            >
              🗑️
            </button>
            </div>
            <div class="h-3">
              <span class="select-none text-xs flex items-center" transition:fade={{ duration: 300 }}  class:hidden={!todo.doneAt}>
                ✅ Finished at:
                {todo.doneAt?.toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>

          </div>
        </div>
     </div>
  {/each}
</section>