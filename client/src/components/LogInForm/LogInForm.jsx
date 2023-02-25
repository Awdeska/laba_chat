import React, {useContext, useState} from "react";
import InputField from "./InputField";
import s from "./LoginForm.module.css"
import {Context} from "../../index";


const LogInForm = ({ onSubmit }) => {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const {store} = useContext(Context)

    return (
      <form className={s.form}>
        <InputField
          label="Login"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
        />
        <InputField
          type="Password"
          label="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={() => store.registration(nickname, password)} className={s.btn}>
            Login
        </button>
      </form>
    );
  };

  export default LogInForm;