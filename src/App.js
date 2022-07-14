import logo from "./logo.svg";
import "./App.css";
import Routes from "./routes/Routes";
import { BrowserRouter, Route } from "react-router-dom";
import MessengerCustomerChat from "react-messenger-customer-chat";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Route render={() => <Routes />} />
      </BrowserRouter>
    </div>
  );
};

export default App;
