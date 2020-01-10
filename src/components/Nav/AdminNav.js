import React from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
import {Nav, Navbar} from 'react-bootstrap'
import { Auth } from 'aws-amplify'
import BillingView from '../BillingView'
import ErrorPage from '../ErrorPage'
import StudentView from '../StudentView'
import TutorView from '../TutorView'
import SessionView from '../SessionView'
import PaymentView from '../PaymentView'
import StudentProfile from '../StudentProfile'
import TutorProfile from '../TutorProfile'


const AdminNav = (props) => {

    let {students, tutors, billings, payments, sessions, userInfo, products} = props

    return(
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
                <Navbar.Brand>Thrive Tutors</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <NavLink to="/dashboard" exact={true} activeClassName="active-tab" className="nav-link">
                            Home
                        </NavLink>
                        <NavLink to="/dashboard/students" activeClassName="active-tab" className="nav-link">
                            Students
                        </NavLink>
                        <NavLink to="/dashboard/tutors" activeClassName="active-tab" className="nav-link">
                            Tutors
                        </NavLink>
                        <NavLink to="/dashboard/sessions" exact={true} activeClassName="active-tab" className="nav-link">
                            Sessions
                        </NavLink>
                        <NavLink to="/dashboard/billing" exact={true} activeClassName="active-tab" className="nav-link">
                            Billing
                        </NavLink>
                        <NavLink to="/dashboard/payment" exact={true} activeClassName="active-tab" className="nav-link">
                            Payments
                        </NavLink>
                        <NavLink to="/sign_in" className="nav-link" onClick={() => Auth.signOut()}>
                            Sign Out
                        </NavLink>                    
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Switch>
                <Route exact path="/dashboard/students" render={() => <StudentView students={students}/>}>
                </Route>
                <Route path = "/dashboard/students/:studentID" render={props => <StudentProfile {...props} students={students} payments={payments} sessions = {sessions} billings={billings}/>}>
                </Route>
                <Route exact path ="/dashboard/tutors" render={() => <TutorView tutors={tutors}/>}>
                </Route>
                <Route path = "/dashboard/tutors/:tutorID" render={props => <TutorProfile {...props} tutors={tutors} payments={payments} sessions = {sessions} billings={billings}/>}>
                </Route>
                <Route exact path ="/dashboard/sessions" render={()=> <SessionView sessions={sessions} userInfo={userInfo}/>}>
                </Route>
                <Route exact path ="/dashboard/billing" render={()=><BillingView billings={billings} userInfo={userInfo}/>}>
                </Route>
                <Route exact path="/dashboard" render={()=> <div>Profile Page</div>}>
                </Route>
                <Route exact path="/dashboard/payment" render={()=><PaymentView userInfo={userInfo} students = {students} payments={payments} tutors = {tutors}/>}>
                </Route>
                <Route component = {ErrorPage}>
                </Route>
            </Switch>
        </React.Fragment>      
    )
}

export default AdminNav;