const sleep = (n) => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, n * 1000);
});

export const increment = () => {
  return (dispatch) => {
    sleep(1).then(() => {
      dispatch({
        type: 'INCREMENT'
      })
    })
  };
};

export const decrement = () => ({
  type: 'DECREMENT'
});