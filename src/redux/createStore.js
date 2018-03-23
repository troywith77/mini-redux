const createStore = (reducer) => {
  let state;
  let listeners = [];
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
  dispatch({
    type: '@@INIT'
  })
  return { getState, dispatch, subscribe };
};

export default createStore;
