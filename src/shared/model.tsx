export interface UserProfile {
  id: string;
  username: string;
  email: string;
  createdAt?: string;
}
export interface RegisterDTO {
  username: string;
  email: string;
  password: string;
}

export interface JwtToken {
  sub: string;
  exp: number;
}
export interface AccessToken {
  accessToken: string;
}

export interface ProjectDTO {
  id?: string;
  name?: string;
  owner?: string;
  coworker?: UserProfile[];
  createdAt?: Date;
}
export interface Project {
  id: string;
  name: string;
  owner: string;
  coworker?: UserProfile[];
  createdAt: Date;
  invitingUser?: UserProfile[];
}
export interface ListDTO {
  id?: string;
  title?: string;
  projectId?: string;
  creator?: string;
  pos?: number;
}
export interface List {
  id: string;
  title: string;
  projectId: string;
  creator: string;
  pos: number;
  todos: Todo[];
}
export interface TodoDTO {
  id?: string;
  title?: string;
  content?: string;
  isComplete?: boolean;
  isImportant?: boolean;
  creator?: UserProfile;
  dueDate?: Date;
  listId?: string;
  pos?: number;
}
export interface Todo {
  id: string;
  title: string;
  content: string;
  isComplete: boolean;
  isImportant: boolean;
  creator: UserProfile;
  dueDate: Date;
  listId: string;
  pos: number;
}