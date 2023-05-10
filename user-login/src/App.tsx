import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import UserLogin from "./userLogin";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <UserLogin />
    </Provider>
  );
};

export default App;
