const reducerHandler = {
  'INCREMENT': (state) => state + 1,
  'DECREMENT': (state) => state - 1
};

const counter = (state = 0, action) => {
  if (reducerHandler[action.type]) {
    return reducerHandler[action.type](state);
  };
  return state;
};

export default counter;
