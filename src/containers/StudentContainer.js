import React, {Component} from 'react'
import StudentNav from '../components/Nav/StudentNav.js'

class StudentContainer extends Component{
    _isMounted=false
    constructor (props){
        super(props)
        this.state = {
            studentID: '',
            sessions: [],
            payments: [],
            billings: [],
            products: []
            
        }
    }
    
    async componentDidMount(){
        this._isMounted=true
        let url = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/students?email=" + this.props.userInfo.Email
        await fetch(url)
        .then(response => response.json())
        .then(response => {
            this.setState({
                studentID: response[0].StudentID,
            })
        })
        .catch(err => console.log("Error fetching StudentID", err))
        
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/products?studentID=' + this.state.studentID)
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    products: response,
                })
            }
        })
        .catch(err => console.log("Error fetching products", err))
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions?studentID=' + this.state.studentID)
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    sessions: response,
                })
            }
        })
        .catch(err => console.log("Error fetching sessions", err))
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/payments?studentID=' + this.state.studentID)
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    payments: response
                })
            }
        })
        .catch(err => console.log("Error fetching payments", err))
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/billing?studentID=' + this.state.studentID)
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    billings: response
                })
            }
        })
        .catch(err => console.log("Error fetching billings", err))        
    }

    componentWillUnmount(){
        this._isMounted = false
    }    

    cancelSession(ID) {
        let {sessions, billings} = this.state
        console.log(sessions, payments, billings)
        let filteredSessions = sessions.filter(session => session.ID != ID)
        let filteredBillings = billings.filter(billing => billing.sessionID != ID)
        this.setState({
            sessions: filteredSessions,
            billings: filteredBillings
        })
    }
    
    render(){
        return (
            <div>
                <StudentNav 
                            studentID = {this.state.studentID} 
                            userInfo = {this.props.userInfo}
                            sessions = {this.state.sessions}
                            payments = {this.state.payments}
                            billings = {this.state.billings}
                            products = {this.state.products}/>
            </div>
        )
    }
}

export default StudentContainer