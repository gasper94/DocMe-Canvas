import { createStore } from 'redux';
import rootReducer from './reducers'; // Assuming you have separate reducer files

const store = createStore(rootReducer);

export default store;
