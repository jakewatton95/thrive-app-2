import React from 'react'
import SignInUpNav from '../SignInUpNav'
import ConfirmationForm from './ConfirmationForm'

const Confirmation = () => 
{
    return (
        <React.Fragment>
            <SignInUpNav signIn = {true}/>
            <ConfirmationForm/>
        </React.Fragment>
    )
}


export default Confirmation