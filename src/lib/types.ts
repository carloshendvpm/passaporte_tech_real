export type Status = "all" | "todo" | "done";
export type Todo = {
  id: string;
  title: string;
  done: boolean;
  createdAt: Date;
  doneAt: Date | null;
};