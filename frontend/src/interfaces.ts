export interface Task {
  name: string;
  description: string;
}

export interface User {
  email: string;
  password: string;
  tasks: Task[];
}
