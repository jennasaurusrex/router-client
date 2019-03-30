import React, { Fragment, Component } from "react";
import MapWithADirectionsRenderer from "./MapWithDirections";
import { Route } from "react-router-dom";

import Nav from "./header/Nav";
import FrontPage from "./FrontPage";
import Home from "./Home";

import AuthenticatedRoute from "./auth/components/AuthenticatedRoute";
import SignUp from "./auth/components/SignUp";
import SignIn from "./auth/components/SignIn";
import SignOut from "./auth/components/SignOut";
import ChangePassword from "./auth/components/ChangePassword";

import TripCreate from "./TripCreate";
import Trips from "./Trips";
import Trip from "./Trip";
import TripEdit from "./TripEdit";
import TodoCreate from "./TodoCreate";
import ExpenseCreate from "./ExpenseCreate";
import { MyContext } from "./App";

import Alert from "react-bootstrap/Alert";
import "typeface-roboto";

class Layout extends Component {
  state = {
    name: "",
    origin: "",
    destination: "",
    user: null,
    alerts: []
  };

  setUser = user => this.setState({ user });

  clearUser = () => this.setState({ user: null });

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] });
  };

  render() {
    const { user, alerts } = this.state;

    return (
      <MyContext.Consumer>
        {context => {
          console.log("context.state is ", context.state);
          return (
            <Fragment>
              <div className="left">
                <Nav user={user} />
                {alerts.map((alert, index) => (
                  <Alert key={index} dismissible variant={alert.type}>
                    <Alert.Heading>{alert.message}</Alert.Heading>
                  </Alert>
                ))}
                <main>
                  <Route exact path="/" component={FrontPage} />
                  <AuthenticatedRoute
                    user={user}
                    exact
                    path="/trip/:id/todo-create"
                    render={({ match }) => (
                      <TodoCreate user={user} match={match} alert={alert} />
                    )}
                  />
                  <AuthenticatedRoute
                    user={user}
                    exact
                    path="/trip/:id/expense-create"
                    render={({ match }) => (
                      <ExpenseCreate user={user} match={match} alert={alert} />
                    )}
                  />
                  <AuthenticatedRoute
                    user={user}
                    exact
                    path="/trips"
                    render={() => <Trips user={user} alert={alert} />}
                  />
                  <AuthenticatedRoute
                    exact
                    path="/trips/:id"
                    user={user}
                    render={({ match }) => (
                      <Trip
                        saveTrip={context.saveTrip}
                        user={user}
                        match={match}
                        alert={alert}
                      />
                    )}
                  />
                  <AuthenticatedRoute
                    exact
                    path="/trip/:id/edit"
                    user={user}
                    render={({ match }) => (
                      <TripEdit user={user} match={match} alert={alert} />
                    )}
                  />
                  <AuthenticatedRoute
                    exact
                    path="/trip-create"
                    user={user}
                    render={() => (
                      <TripCreate
                        handleChange={this.handleChange}
                        user={user}
                        alert={alert}
                      />
                    )}
                  />
                  <AuthenticatedRoute
                    exact
                    path="/home"
                    user={user}
                    render={() => <Home user={user} alert={alert} />}
                  />
                  <Route
                    path="/sign-up"
                    render={() => (
                      <SignUp alert={alert} setUser={this.setUser} />
                    )}
                  />
                  <Route
                    exact
                    path="/sign-in"
                    render={() => (
                      <SignIn
                        saveUser={context.saveUser}
                        alert={alert}
                        setUser={this.setUser}
                      />
                    )}
                  />
                  <AuthenticatedRoute
                    user={user}
                    path="/sign-out"
                    render={() => (
                      <SignOut
                        alert={alert}
                        clearUser={this.clearUser}
                        user={user}
                      />
                    )}
                  />
                  <AuthenticatedRoute
                    user={user}
                    path="/change-password"
                    render={() => <ChangePassword alert={alert} user={user} />}
                  />
                </main>
              </div>
              <div className="right">
                <MapWithADirectionsRenderer
                  myOrigin={
                    context.state.trip ? context.state.trip.origin : "loading"
                  }
                  myDestination={context.state.trip.destination}
                />
                )}
              </div>
            </Fragment>
          );
        }}
      </MyContext.Consumer>
    );
  }
}

export default Layout;
