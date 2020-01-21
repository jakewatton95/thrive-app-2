import React, { Component, useState } from 'react'
import UpcomingSessions from './Sessions/UpcomingSessions'
import './Profile.css'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const TutorProfile = () => {
    const { tutorID } = useParams()
    const tutors = useSelector(state => state.tutors)
    const billings = useSelector(state => state.billings)
    const payments = useSelector(state => state.payments)
    const sessions = useSelector(state => state.sessions)
    const [paymentAmount, setPaymentAmount] = useState(100)

    const tutor = tutors.find(tutor => tutor.TutorID == tutorID)
    let amountOwed = billings.filter(billing => billing.TutorID == tutorID && Date.now() > Date.parse(billing.date)).reduce((total, billing) => total += billing.Rate * (billing.TutorShare / 100) * billing.SessionLength, 0)
    let amountPaid = payments.filter(payment => payment.TutorID == tutorID).reduce((total, payment) => total += payment.Amount, 0)
    
    const recordPayment = e => {
        e.preventDefault()
        let endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/payments?tutorID=" + this.state.tutorID + "&amount=" +  this.state.paymentAmount
        fetch(endpoint, {method: "POST"})
        .then(() => {
            alert("Payment Logged")
            //TODO dispatch
        })
        .catch(err => console.log("Error Recording Payment:" + err))
    }
    
    return (
        tutor ? 
        <React.Fragment>
            <h2> Viewing info for {tutor.Name}</h2>
            <div> Email: {tutor.Email} </div>
            <div> Phone: {tutor.Phone} </div>
            <div className="amountOwed"> Total Amount Owed:  ${amountOwed.toFixed(2)}</div>
            <div className="amountPaid"> Total Amount Paid:  ${amountPaid.toFixed(2)}</div>
            {amountOwed > amountPaid ? <div> You owe {tutor.Name} ${(amountOwed.toFixed(2) - amountPaid.toFixed(2)).toFixed(2)}  </div> : null }
            <div> Record a payment: <form onSubmit={e => e.preventDefault()} ><input type="number" min="0.01" step=".01" value={paymentAmount} onChange={e => setPaymentAmount(e.target.value)} id="payment" /> $ <button> Submit </button></form></div>
            <UpcomingSessions userRole="Tutor" sessions={sessions} secondaryRole="Admin" tutorID={tutorID} />
        </React.Fragment> : null //Should have a loading screen before we find the tutor
    )
}
/*
class TutorProfile extends Component {
    constructor() {
        super()
    
        this.state = {
            tutorID:props.match.params.tutorID,
            paymentAmount : 100,
            addedPayment: 0,
        }
        this.getTutor = this.getTutor.bind(this)
        this.getAmountOwed=this.getAmountOwed.bind(this)
        this.getAmountPaid=this.getAmountPaid.bind(this)
        this.recordPayment = this.recordPayment.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    recordPayment(e){
        e.preventDefault()
        let endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/payments?tutorID=" + this.state.tutorID + "&amount=" +  this.state.paymentAmount
        fetch(endpoint, {method: "POST"})
        .then(() => {
            alert("Payment Logged")
            this.setState({
                addedPayment: parseFloat(this.state.addedPayment) + parseFloat(this.state.paymentAmount),
                paymentAmount: 100
            })
        })
        .catch(err => console.log("Error Recording Payment:" + err))
    }
    
    handleChange(e){
        let {id, value} = e.target
        if (id === 'payment'){
            this.setState({
                paymentAmount: value
            })
        }
    }
    getTutor(){
        return this.props.tutors.find(tutor => tutor.TutorID == this.state.tutorID)
    }
    getAmountPaid(){
        let totalAmount = this.props.payments.filter(payment => payment.TutorID == this.state.tutorID).reduce((total, payment) => total += payment.Amount, 0)
        return totalAmount + this.state.addedPayment        
    }
    getAmountOwed(){
        let amountOwed = this.props.billings.filter(billing => billing.TutorID == this.state.tutorID && Date.now() > Date.parse(billing.date)).reduce((total, billing) => total+= billing.Rate * (billing.TutorShare/100) * billing.SessionLength, 0)
        return amountOwed        
    }
    render() {
        let tutor = this.getTutor()
        let amountOwed = this.getAmountOwed()
        let amountPaid = this.getAmountPaid()
        let {sessions} = this.props
        return (
            <React.Fragment>
                <h2> Viewing info for {tutor ? tutor.Name : null}</h2>
                <div> Email: {tutor ? tutor.Email : null} </div>
                <div> Phone: {tutor ? tutor.Phone : null} </div>
                <div className="amountOwed"> Total Amount Owed:  ${amountOwed.toFixed(2)}</div> 
                <div className="amountPaid"> Total Amount Paid:  ${amountPaid.toFixed(2)}</div> 
                {amountOwed > amountPaid ? <div> You owe {tutor.Name} ${(amountOwed - amountPaid).toFixed(2)}  </div> : null}
                <div> Record a payment: <form onSubmit = {this.recordPayment} ><input type="number" min="0.01" step = ".01" value = {this.state.paymentAmount} onChange = {this.handleChange} id="payment"/> $ <button> Submit </button></form></div>
                <UpcomingSessions userRole = "Tutor" sessions={sessions} secondaryRole="Admin" tutorID={this.state.tutorID}/>
            </React.Fragment>
        )
    }
}*/
export default TutorProfile