import React from 'react';
import ReactDOM from 'react-dom';
// import { create as createSpy } from 'rxjs-spy';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

// const spy = createSpy({
//   keptDuration: 1
// });

// const debugObservables = () => {
//   spy.flush();
//   spy.show();
//   setTimeout(() => {
//     debugObservables();
//   }, 1000);
// };

// debugObservables();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
