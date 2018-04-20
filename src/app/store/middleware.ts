// // pre middleware takes an observable of actions, returning an observable
// export const actionLogger = action => {
//   return action.tap(a => console.log('DISPATCHED ACTION:', a));
// };
// // post middleware takes an observable of state, returning observable
// export const stateLogger = state => {
//   return state.tap(s => console.log('NEW STATE:', s));
// };



// export function logger( reducer ) {
//   return function newReducer( state, action ) {
//     console.group(action.type);
//     const nextState = reducer(currentState, action);
//     console.log(`%c prev state`, `color: #9E9E9E; font-weight: bold`, state);
//     console.log(`%c action`, `color: #03A9F4; font-weight: bold`, action);
//     console.log(`%c next state`, `color: #4CAF50; font-weight: bold`, nextState);
//     console.groupEnd();
//     return nextState;
//   };
// }
