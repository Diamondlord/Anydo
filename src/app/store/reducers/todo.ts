import {TodoElement} from '../../shared/classes/todo-element';

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const CLICK_TODO = 'CLICK_TODO';
const key = 'state';
const localState = JSON.parse(localStorage.getItem(key));
const initLocalState = localState ? localState : [];

export function todoReducer(state = initLocalState, action) {
  switch (action.type) {
    case ADD_TODO:
      const nextState = [
        ...state,
        Object.assign({}, {
          id: action.payload.id,
          text: action.payload.text,
          checked: action.payload.checked
        })
      ];
      localStorage.setItem(key, JSON.stringify(nextState));
      return nextState;
    case REMOVE_TODO:
      return state
        .filter((todo: TodoElement) => todo.id !== action.payload);
    case CLICK_TODO:
      return state.map((todo: TodoElement) => {
        console.log('clickTodo', action.payload.id, action.payload.checked);
        if (todo.id === action.payload.id) {
          // todo.checked = action.payload.checked;
          return Object.assign({}, todo, {checked: action.payload.checked});
        }
        return todo;
      });
    default:
      return state;
  }
}
