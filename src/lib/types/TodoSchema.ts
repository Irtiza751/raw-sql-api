export interface TodoSchema {
  id: number;
  title: string;
  description: string;
  userId: number;
}

export type TodoFields = ['title', 'description'];