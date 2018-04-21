import {TodoElement} from '../../shared/classes/todo-element';

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const CLICK_TODO = 'CLICK_TODO';
export const INIT_TODO = 'INIT_TODO';

export function todoReducer(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        Object.assign({}, {
          id: action.payload.id,
          text: action.payload.text,
          checked: action.payload.checked
        })
      ];
    case REMOVE_TODO:
      return state
        .filter((todo: TodoElement) => todo.id !== action.payload);
    case CLICK_TODO:
      return state.map((todo: TodoElement) => {
        // console.log('clickTodo', action.payload.id, action.payload.checked);
        if (todo.id === action.payload.id) {
          return Object.assign({}, todo, {checked: action.payload.checked});
        }
        return todo;
      });
    case INIT_TODO:
      return  action.payload;
    default:
      return state;
  }
}
