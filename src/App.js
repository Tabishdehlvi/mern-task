import React from "react";
import MainContent from "./components/MainContent";
import { Provider } from "react-redux";
import store from "./store";
import { Header } from "./components/Header";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <Provider store={store}>
        <MainContent />
      </Provider>
    </div>
  );
};

export default App;
