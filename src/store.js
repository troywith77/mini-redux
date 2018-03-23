import { createStore } from './redux';
import counter from './reducers';

export default () => {
  const store = createStore(counter);

  const logger = store => next => (action) => {
    console.group(action.type);
    console.log(store.getState());
    const returnValue = next(action);
    console.log(store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };

  const thunk = store => next => (action) => {
    if (typeof action === 'function') {
      return action(next, store.getState)
    } else {
      return next(action)
    }
  };

  const middlewares = [logger, thunk];

  const wrapMiddlewares = (store, middlewares) => {
    middlewares.forEach((middleware) => {
      store.dispatch = middleware(store)(store.dispatch, store.getState);
    });
  };

  wrapMiddlewares(store, middlewares);

  return store;
};