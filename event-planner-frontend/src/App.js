import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Signup from './Signup';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Signup />
      </div>
    </Provider>
  );
}

export default App;