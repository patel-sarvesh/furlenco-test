import * as TaskActions from './actions';

export interface TaskState {
  taskList: any[];
}

const initialState: TaskState = {
  taskList: []
};

export function TaskReducer(state = initialState, action: TaskActions.TaskActions) {
  if (action.type === TaskActions.GET_TASK_LIST) {
    return { ...state, taskList: action.payload };
  } else {
    return state;
  }
}
