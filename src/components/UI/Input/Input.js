import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

import classes from './Input.module.css'

const input = (props) => {
    let inputElement = null;
    let errorMessage = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        errorMessage = <p className={`${classes.InvalidMessage} text-center`}>{props.errorMessage}</p>;
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = (
                <Form.Control
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />
            )
            break;
        case ('group'):
            inputElement = (
                <Form.Group>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text> <props.icon /></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control className={inputClasses.join(' ')}
                            {...props.elementConfig}
                            value={props.value}
                            onChange={props.changed} />
                    </InputGroup>
                </Form.Group>
            )
            break;
        case ('textarea'):
            inputElement = (
                <Form.Control
                    as='textarea'
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />
            )
            break;
        case ('select'):
            inputElement = (
                <Form.Control
                    as='select'
                    className={`${inputClasses.join(' ')} mb-3`}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option
                            key={option.value}
                            value={option.value} >
                            {option.displayValue}
                        </option>
                    ))}
                </Form.Control>
            )
            break;
        default:
            inputElement = <Form.Control className={inputClasses.join(' ')}  {...props.elementConfig} value={props.value} />
    }
    return (

        <>
            {inputElement}
            {errorMessage}
        </>
    );
};

export default input;