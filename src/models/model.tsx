export interface Task {
  tid: number;
  title: string;
  todos: Todo[]
}

export interface Todo {
  did?: number;
  title?: string;
  content?: string;
  isComplete?: boolean;
  creator?: UserProfile;
  dueDate?: Date;

}

export interface UserProfile {
  id: number;
  name: string;
  email?: string;
  account?: string;
}