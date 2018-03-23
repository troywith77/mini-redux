import createStore from './store';
import { increment, decrement } from './actions';

const store = createStore();

const render = () => {
  const root = document.querySelector('#count');
  root.innerHTML = store.getState();
};

store.subscribe(() => {
  render();
});

render();

const incrementEl = document.querySelector('#increment');
const decrementEl = document.querySelector('#decrement');

incrementEl.addEventListener('click', () => {
  store.dispatch(increment());
});

decrementEl.addEventListener('click', () => {
  store.dispatch(decrement());
});
