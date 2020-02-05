import React from 'react'
import SignInUpNav from '../SignInUpNav'
import SignUpForm from './SignUpForm'

const SignUp = () =>
{
    return (
        <React.Fragment>
            <SignInUpNav signIn={false}/>
            <SignUpForm/>
        </React.Fragment>

    )
}

export default SignUp