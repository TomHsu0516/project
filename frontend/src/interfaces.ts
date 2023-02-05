export interface Task {
  id: string;
  name: string;
  description: string;
}

export interface User {
  email: string;
  password: string;
  tasks: Task[];
}

export interface LocalUser {
  id: string;
  email: string;
  token: string;
}
