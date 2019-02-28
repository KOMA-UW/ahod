import React from 'react'; 
import {Row, Input} from "react-materialize";
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'


export class SignUp {
    constructor(){

    }

    render() {
        return(
        <Row>
            <Input placeholder="Placeholder" s={6} label="First Name" />
            <Input s={6} label="Last Name" />
            <Input s={12} label="disabled" defaultValue="I am not editable" disabled />
            <Input type="password" label="password" s={12} />
            <Input type="email" label="Email" s={12} />
        </Row>)
    }
}