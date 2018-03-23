const createStore = (reducer) => {
  let state;
  const listeners = [];
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(i => i !== listener);
    };
  };
  return { getState, dispatch, subscribe };
};

const reducerHandler = {
  'INCREMENT': (state) => state + 1,
  'DECREMENT': (state) => state - 1
};

const reducer = (state = 0, action) => {
  console.log(action)
  if (reducerHandler[action.type]) {
    return reducerHandler[action.type](state);
  };
  return state;
};