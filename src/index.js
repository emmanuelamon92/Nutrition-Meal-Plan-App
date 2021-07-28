import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/app/App';

ReactDOM.render(
  <StrictMode>
    <Router >
      <App />
    </Router>
  </StrictMode>,
  document.getElementById('root')
);

// Think of all the pieces of data in our example application. We have:

// The original list of products
// The search text the user has entered
// The value of the checkbox
// The filtered list of products

// Is it passed in from a parent via props? If so, it probably isn’t state.
// Does it remain unchanged over time? If so, it probably isn’t state.
// Can you compute it based on any other state or props in your component? If so, it isn’t state.

//So finally, our state is:__________

// FilterableProductTable

//    SearchBar
//    ProductTable

//      ProductCategoryRow
//      ProductRow
