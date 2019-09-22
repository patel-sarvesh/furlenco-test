import { Action } from '@ngrx/store';

export const GET_TASK_LIST = 'GetTaskList';

export class GetTaskList implements Action {
  readonly type = GET_TASK_LIST;
  constructor(public payload: any[]) { }
}

export type TaskActions = GetTaskList;
