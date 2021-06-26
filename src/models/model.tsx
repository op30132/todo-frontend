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
  id?: number;
  name?: string;
  email?: string;
  account?: string;
}

export interface JwtToken {
  sub: string;
  exp: number;
}
export interface AccessToken {
  accessToken: string;
}
export interface Project {
  id: string;
  name?: string;
  owner?: string;
  coworker?: string[];
  createdAt?: Date;
}