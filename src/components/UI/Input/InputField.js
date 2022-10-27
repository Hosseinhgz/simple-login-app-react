import React, {useRef , useImperativeHandle} from 'react';
import classes from "../../UI/Input/InputField.module.css";

const  InputField= React.forwardRef((props,ref) =>{
    const inputRef = useRef();
    const activate = ()=>{
        inputRef.current.focus();
    }

    useImperativeHandle(ref, ()=>{
        return{
            focus:activate, // after : is a function that we want to expose from outside (like parent component
        }
    })
    return (
        <div
            className={`${classes.control} ${
                props.data.isValid === false ? classes.invalid : ''
            }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            <input
                type={props.type}
                id={props.id}
                value={props.data.value}
                onChange={props.onChangeHandler}
                onBlur={props.onBlurHandler}
            />
        </div>
    );
});

export default InputField;