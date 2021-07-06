export interface UserProfile {
  id?: number;
  username?: string;
  email?: string;
  createdAt?: string;
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

export interface List {
  id: string;
  title?: string;
  projectId?: string;
  creator?: string;
  pos?: number;
}

export interface Todo {
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