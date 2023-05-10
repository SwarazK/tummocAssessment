import React, { useState, ChangeEvent, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { login, logout } from "./userSlice";

interface formErrors {
    userName: string,
    passWord: string,
}

const UserLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<formErrors>({userName: "", passWord : ""});

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({userName: "", passWord : ""});
    if (username && password) {
        dispatch(login());
    }
    if(!username){
        setFormErrors(prevFormErrors => {
            return { ...prevFormErrors, userName: "UserName cant be empty" };
        });   
    }
    if(!password){
        setFormErrors(prevFormErrors => {
            return { ...prevFormErrors, passWord: "Password cant be empty" };
        });   
    }
  };

  const handleLogout = () => {
    setUsername("");
    setPassword("");
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
          {formErrors?.userName.length !== 0 && <h6 style={{color: 'red'}}>{formErrors?.userName}</h6>}
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
          {formErrors?.passWord.length !== 0 && <h6 style={{color: 'red'}}>{formErrors?.passWord}</h6>}
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default UserLogin;
