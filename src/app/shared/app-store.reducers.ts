import { ActionReducerMap } from '@ngrx/store';
import * as fromTaskToDoReducer from '../store/reducers';

export interface AppState {
  'taskToDo': fromTaskToDoReducer.TaskState;
}

export const reducers: ActionReducerMap<AppState> = {
  taskToDo: fromTaskToDoReducer.TaskReducer
};

export type storesArray = 'taskToDo';
