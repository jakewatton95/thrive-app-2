import React, { useEffect } from 'react'
import Nav from '../components/Nav/Nav'
import SessionView from '../components/Sessions/SessionView'
import StudentTutorView from '../components/StudentTutorView'
import PaymentView from '../components/PaymentView'
import ErrorPage from '../components/ErrorPage'
import BillingView from '../components/BillingView'
import ScheduleSession from '../components/ScheduleSession'
import { Switch, Route } from 'react-router-dom'
import UpcomingSessions from '../components/Sessions/UpcomingSessions.js'
import { useSelector, useDispatch } from 'react-redux'
import { storeBillings, storeStudentID, storePayments, storeProducts, storeSessions } from '../store/actions/actions'

const StudentContainer = () => {
    const userInfo = useSelector(state => state.userInfo)
    const studentID = useSelector(state => state.studentID)
    const sessions = useSelector(state => state.sessions)
    const payments = useSelector(state => state.payments)
    const billings = useSelector(state => state.billings)
    const products = useSelector(state => state.products)

    const dispatch = useDispatch()

    /*const cancelSession = ID => {
        let { sessions, billings } = this.state
        console.log(sessions, payments, billings)
        let filteredSessions = sessions.filter(session => session.ID != ID)
        let filteredBillings = billings.filter(billing => billing.sessionID != ID)
        this.setState({
            sessions: filteredSessions,
            billings: filteredBillings
        })
    }*/

    useEffect(() => {
        let isCancelled = false
        let tempStudentID = null

        const fetchData = async () => {

            let url = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/students?email=" + userInfo.Email
            await fetch(url)
                .then(response => response.json())
                .then(response => {
                    tempStudentID = response.find(student => student.email == userInfo.email).StudentID
                    if (!isCancelled)
                        dispatch(storeStudentID(tempStudentID))
                })
                .catch(err => console.log("Error fetching StudentID", err))

            
            fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/products?studentID=' + tempStudentID)
                .then(response => response.json())
                .then(response => {
                    if (!isCancelled) {
                        dispatch(storeProducts(response))
                    }
                })
                .catch(err => console.log("Error fetching products", err))

            fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions?studentID=' + tempStudentID)
                .then(response => response.json())
                .then(response => {
                    if (!isCancelled) {
                        dispatch(storeSessions(response))
                    }
                })
                .catch(err => console.log("Error fetching sessions", err))

            fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/payments?studentID=' + tempStudentID)
                .then(response => response.json())
                .then(response => {
                    if (!isCancelled) {
                        dispatch(storePayments(response))
                    }
                })
                .catch(err => console.log("Error fetching payments", err))

            fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/billing?studentID=' + tempStudentID)
                .then(response => response.json())
                .then(response => {
                    if (!isCancelled) {
                        dispatch(storeBillings(response))
                    }
                })
                .catch(err => console.log("Error fetching billings", err))
        }

        fetchData()

        return () => {
            isCancelled = true;
        }
    }, [])


    const renderStudentHome = () => (
        <React.Fragment>
            <ScheduleSession products={products} userInfo={userInfo} />
            <UpcomingSessions sessions={sessions} userInfo={userInfo} />
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <Nav user="student" />
            <Switch>
                <Route exact path="/dashboard" render={renderStudentHome}>
                </Route>
                <Route path="/dashboard/sessions" render={() => <SessionView />}>
                </Route>
                <Route path="/dashboard/tutors" render={() => <StudentTutorView studentID={studentID} products={products} />}>
                </Route>
                <Route path="/dashboard/billing" render={() => <BillingView studentID={studentID} billings={billings} userInfo={userInfo} />}>
                </Route>
                <Route path="/dashboard/payment" render={() => <PaymentView studentID={studentID} userInfo={userInfo} payments={payments} tutors={[]} students={[]} />}>
                </Route>
                <Route component={ErrorPage}>
                </Route>
            </Switch>
        </React.Fragment>
    )
}

export default StudentContainer