const store = createStore(reducer);

const oldDispatch = store.dispatch;

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

store.dispatch({
  type: '@@INIT'
})

const render = () => {
  const root = document.querySelector('#count');
  root.innerHTML = store.getState();
};

const sleep = (n) => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, n * 1000);
})

const increment = () => {
  const incre = () => (dispatch) => {
    sleep(1).then(() => {
      dispatch({
        type: 'INCREMENT'
      })
    })
  }
  store.dispatch(incre());
};

const decrement = () => {
  store.dispatch({
    type: 'DECREMENT'
  })
};

store.subscribe(() => {
  render();
});

render();
