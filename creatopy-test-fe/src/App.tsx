import logo from "./logo.svg";
import "./App.css";
import RoutesList from "./routes/routesList";
import { Provider } from "react-redux";
import store from "./redux/store/configureStore";
import { ConnectedRouter } from 'connected-react-router';
import { history } from "./redux/modules/reducers";
import apolloClient from "./services/apollo";
import { ToastContainer } from "react-toastify";
import { ApolloProvider } from "@apollo/client";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

      </header>
      <section>
        <Provider store={store}>
          <ApolloProvider client={apolloClient}>
            <ConnectedRouter history={history}>
              <RoutesList />
              <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar closeOnClick rtl={false} pauseOnHover />
            </ConnectedRouter>
          </ApolloProvider>
        </Provider>
      </section>
    </div>
  );
}

export default App;
