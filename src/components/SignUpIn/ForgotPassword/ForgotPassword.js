import React from 'react'
import SignInUpNav from '../SignInUpNav'
import ForgotPasswordForm from './ForgotPasswordForm'

const SignIn = () =>
{
    return (
        <React.Fragment>
            <SignInUpNav signIn = {true}/>
            <ForgotPasswordForm/>
        </React.Fragment>
    )
}

export default SignIn