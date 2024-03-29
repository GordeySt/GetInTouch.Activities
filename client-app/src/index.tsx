import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import "react-toastify/dist/ReactToastify.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import "./App/layout/styles.css";
import App from "./App/layout/App";
import reportWebVitals from "./reportWebVitals";
import ScrollToTop from "./App/layout/ScrollToTop";
import { store, StoreContext } from "./App/stores/Store";

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ScrollToTop>
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
    </ScrollToTop>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
