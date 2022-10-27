import React, {useState, useReducer, useEffect, useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from "../../store/auth-context";
import InputField from "../UI/Input/InputField";

const emailReducer = (state , action) => {
  if (action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.includes('@')}
  }
  if (action.type === 'INPUT_BLUR'){
    return {value: state.value, isValid: state.value.includes('@')}
  }
  return {value: '', isValid: false}
}

const passwordReducer = (state , action) => {
  if (action.type === 'USER_PASSWORD'){
    return {pass: action.pass, isValid: action.pass.trim().length>7}
  }
  if (action.type === 'PASSWORD_BLUR'){
    return {pass: state.pass, isValid: state.pass.trim().length>7}
  }
  return {pass: '', isValid: false}
}


const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState , dispatchEmail] = useReducer(emailReducer, {value:'', isValid: null} )
  const [passwordState , dispatchPassword] = useReducer(passwordReducer, {pass:'', isValid: null} )
  const ctx = useContext(AuthContext)

  const {isValid : emailIsValid} = emailState // destructuring and give Alias to isValid => emailIsValid
  const {isValid : passwordIsValid} = passwordState // destructuring and give Alias to isValid => passwordIsValid

  useEffect(()=>{
    const identifier = setTimeout(()=>{
      console.log('Checking form validity!')
      setFormIsValid(emailIsValid && passwordIsValid)
    },500)
    return () => {
      console.log('Clean up and reset timeout')
      clearTimeout(identifier)
    }
  }, [emailIsValid,passwordIsValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT', val: event.target.value})
    setFormIsValid(
        event.target.value.includes('@') && passwordState.isValid
    )
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'USER_PASSWORD', pass: event.target.value});
    setFormIsValid(
        emailState.isValid && event.target.value.trim().length >7
    )
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'PASSWORD_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.pass);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <InputField
            type="email"
            id="email"
            onChangeHandler={emailChangeHandler}
            onBlurHandler={validateEmailHandler}
            data={emailState}
            label="E-Mail"
        />
        <InputField
            type="password"
            id="password"
            onChangeHandler={passwordChangeHandler}
            onBlurHandler={validatePasswordHandler}
            data={passwordState}
            label="Password"
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
