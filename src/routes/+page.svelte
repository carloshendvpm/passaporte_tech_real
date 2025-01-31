<script lang="ts">
  import Header from "$lib/components/Header.svelte"
  import TodoForm from "$lib/components/TodoForm.svelte"
  import TodosList from "$lib/components/TodosList.svelte";
  import type { Todo, Status } from "$lib/types"
  import { onMount } from "svelte"

  function isValidDate(date: any): date is Date {
    return date instanceof Date && !isNaN(date as any);
  }
  function ensureDate(dateInput: string | Date | null): Date | null {
    if (dateInput === null) return null;
    
    const date = dateInput instanceof Date 
      ? dateInput 
      : new Date(dateInput);
    
    return isValidDate(date) ? date : null;
  }


  let todos = $state<Todo[]>([])
  let currentStatus = $state<Status>("all")

  onMount(() => {
    const savedTodosJson = localStorage.getItem('todos')
    if (savedTodosJson) {
      try {
        const parsedTodos = JSON.parse(savedTodosJson)
        todos = parsedTodos.map((todo: Todo) => ({
          ...todo,
          createdAt: ensureDate(todo.createdAt) || new Date(),
          doneAt: ensureDate(todo.doneAt)
        }))
      } catch (error) {
        todos = []
      }
    }

    const hasTipBeenShown = localStorage.getItem('todoTip')
    if (!hasTipBeenShown) {
      setTimeout(() => {
        alert("Here's a fun tip! You can edit a todo just by clicking then!")
        localStorage.setItem('todoTip', 'true')
      })
    }
  })

  $effect(() => {
    localStorage.setItem('todos', JSON.stringify(todos.map(todo => ({
      ...todo,
      createdAt: todo.createdAt?.toISOString(),
      doneAt: todo.doneAt?.toISOString()
    }))))
  })

  let doneTodos = $derived(
    todos.reduce(
      (total, todo) => total + Number(todo.done),
      0
    )
  )

  function addTodo(newTodo: string) {
    todos.push({
      id: crypto.randomUUID(),
      title: newTodo,
      done: false,
      createdAt: new Date(),
      doneAt: null
    })
  }

  function toggleDone(todo: Todo) {
    todo.done = !todo.done;
    todo.doneAt = todo.done ? new Date() : null;
  }

  function removeTodo(id: string) {
    todos = todos.filter(todo => todo.id !== id);
  }

  function editTodo(e: Event) {
    const inputEl = e.target as HTMLInputElement
    const id = +inputEl.dataset.index!
    todos[id].title = inputEl.value
  }

  let filteredTodos = $derived.by(() => {
    switch(currentStatus) {
      case "all": {
        return todos;
      }
      case "done": {
        return todos.filter((todo) => todo.done)
      }
      case "todo": {
        return todos.filter((todo) => !todo.done)
      }
    }
    return todos
  })
</script>

<div class="h-screen w-full bg-purple-700">
  <div class="container mx-auto py-8 px-4">
    <Header/>
    <TodoForm {addTodo}/>
    <div class="flex gap-4 my-6 border-b border-neutral-200">
      {#each ['todo', 'all','done'] as status}
        <button
          class="relative pb-2 px-1 text-neutral-50 hover:text-neutral-200/80 transition-colors cursor-pointer hover:border-b-2"
          class:text-purple-600={currentStatus === status}
          class:border-b-2={currentStatus === status}
          onclick={() => currentStatus = status as Status}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      {/each}
    </div>

    {#if doneTodos > 0}
      <p class="mt-4 lg:text-xl text-neutral-200">Oww! You have already completed - {doneTodos} things today. Congratulations! 🎉</p>
    {:else}
      <p class="mt-4 lg:text-xl text-neutral-200">Looks like you haven't done anything yet. Keep trying! 👊🏼 </p>
    {/if}
    <TodosList todos={filteredTodos} {toggleDone} {removeTodo} {editTodo}/>
  </div>
</div>