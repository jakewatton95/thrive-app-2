import React from 'react'
import { getUserInfo, getInvoices } from '../../helpers'
import moment from 'moment'
import SingleInvoice from './SingleInvoice'
import ErrorPage from '../ErrorPage/ErrorPage'

/* Unpaid Invoices less than a week old */
const PendingInvoices = () => {

    const {currentUserInfo} = getUserInfo()
    const invoices = getInvoices(currentUserInfo) //change to getpending invoices
    let invoiceList = []
    // console.log("INV", invoices)

    if (invoices.loading || !invoices.data) return <div> Loading...</div>
    else {
        invoiceList = invoices.data.invoicesByCompany || invoices.data.invoicesByStudent || invoices.data.invoicesByTutor
        if(currentUserInfo.role == 'Admin') {
            invoiceList = invoiceList.filter(inv => !inv.studentpaid || !inv.tutorpaid)
        } else if (currentUserInfo.role == 'Student') {
            invoiceList = invoiceList.filter(inv => !inv.studentpaid)
        } else if (currentUserInfo.role == 'Tutor') {
            invoiceList = invoiceList.filter(inv => !inv.tutorpaid)
        } else {
            return <ErrorPage/>
        }
        invoiceList = invoiceList.filter(inv => moment(inv.date) > moment().startOf('day').subtract(1, 'week'))
    }
    return (
        <React.Fragment>
            <div>Pending invoices are unpaid invoices from the past week</div>
            <div>Showing invoices from {moment().startOf('day').subtract(1, 'week').format('MM-DD-YYYY')} - {moment().format('MM-DD-YYYY')}</div>
            <div className='invoices-list-wrapper'>
            {invoiceList.map(inv => 
                <SingleInvoice key={inv.id} invoice ={inv}/>
            )}
            </div>

        </React.Fragment>
    )
}

export default PendingInvoices