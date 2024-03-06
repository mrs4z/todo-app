export enum ITodoStatus {
  IN_PROGRESS,
  SUCCESS,
}

export interface ITodoItem {
  id: string;
  name: string;
  content: string;
  status: ITodoStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type ITodoCreateItem = Pick<ITodoItem, 'name' | 'content'>;

export interface ITodoEditItem {
  id: string;
  name: string;
  content: string;
}

export interface ITodoUpdateStatusItem {
  id: string;
  status: ITodoStatus;
}

export interface ITodoDeleteItems {
  ids: string[];
}
