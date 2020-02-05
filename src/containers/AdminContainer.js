import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Nav from '../components/Nav/Nav'
import ScheduleSession from '../components/ScheduleSession'
import AddProduct from '../components/AddProduct'
import BillingView from '../components/BillingView'
import ErrorPage from '../components/ErrorPage'
import StudentView from '../components/StudentView'
import TutorView from '../components/TutorView'
import SessionView from '../components/Sessions/SessionView'
import PaymentView from '../components/PaymentView'
import Profile from '../components/Profile'
import Dashboard from '../components/Dashboard/Dashboard'

const AdminContainer = () => {

   return (
        <React.Fragment>
            <Nav user="admin" />
            <Switch>
                <Route exact path="/dashboard/students" component={StudentView} />
                <Route exact path="/dashboard/addProduct" component = {AddProduct} />
                <Route exact path="/dashboard/scheduleSession" component = {ScheduleSession}/>
                <Route path="/dashboard/students/:ID" render={()=><Profile profileType="Student"/>} />
                <Route exact path="/dashboard/tutors" component={TutorView} />
                <Route path="/dashboard/tutors/:ID" render={()=><Profile profileType="Tutor"/>} />
                <Route exact path="/dashboard/sessions" component={SessionView} />
                <Route exact path="/dashboard/billing" component={BillingView} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/dashboard/payment" component={PaymentView} />
                <Route component={ErrorPage} />
            </Switch>
        </React.Fragment>
    )
}
export default AdminContainer