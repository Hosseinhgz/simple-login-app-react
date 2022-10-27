import React from 'react';
import classes from "../../UI/Input/InputField.module.css";

function InputField(props) {
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
}

export default InputField;