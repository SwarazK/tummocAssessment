// src/UserLogin.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { login, logout } from "./userSlice";

const UserLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username && password) {
      dispatch(login());
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {username}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default UserLogin;
