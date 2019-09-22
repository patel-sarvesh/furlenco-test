import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './reducers';

export const getTaskState = createFeatureSelector<TaskState>('taskToDo');

export const getTaskSlice = (taskState: TaskState) => taskState.taskList;

export const getTaskSelector = createSelector(getTaskState, getTaskSlice);
