import './App.css';
import React, { useState } from "react";
import { Container } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CakeView from './components/cakes/cakeView';
import SignIn from './components/login/userSigninView';
import SignUp from './components/login/userSignupView';
import ResetPassword from './components/login/resetPassword';
import AddCake from './components/admin/cake_admin/addCake';
import ShortEatView from './components/short_eats/short_eatView';
import PersistentDrawerLeft from './components/sidebar/sidebar';
import ProtectedRouteComponent from './components/login/protectedRoutes';
import { connect, dispatch } from 'react-redux';
import Checkout from './components/checkout/checkout';
import CakeDetailView from './components/cakes/cakeDetailView';
import Cart from './components/checkout/cart';
import Contact from './components/contactUs/contactUs';

const useStyles = makeStyles({
  container: {
    flexGrow: 1,
    margin: '100px',
  },
});

function App(props) {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Router>
        <PersistentDrawerLeft Link={Link} isAuthenticated={props.authentication}/>
        <Route path="/login" exact component={SignIn} Link={Link}/>
        <Route path="/register" exact component={SignUp} Link={Link}/>
        <Route path="/cake" component={CakeView} />
        <Route path="/short_eat" exact component={ShortEatView} />
        <Route path="/reset_password" exact component={ResetPassword} />
        <Route path="/checkout" exact component={Checkout} />
        <Route path="/detailView" exact component={CakeDetailView} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/" exact component={CakeView} />
        <Route path="/contact" exact component={Contact} />
      <ProtectedRouteComponent path="/addCake" component={AddCake} isAuthenticated={props.authentication}/>
      </Router>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
  };
};

export default connect(
  mapStateToProps
)(App)
