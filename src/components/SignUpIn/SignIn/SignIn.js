import React from 'react'
import SignInUpNav from '../SignInUpNav'
import SignInForm from './SignInForm'

const SignIn = (props) =>
{
    return (
        <React.Fragment>
            <SignInUpNav signIn = {true}/>
            <SignInForm/>
        </React.Fragment>
    )
}

export default SignIn