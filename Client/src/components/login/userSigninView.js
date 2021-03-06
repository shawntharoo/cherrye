import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TextField } from 'final-form-material-ui';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Form, Field } from 'react-final-form';
import Alert from '@material-ui/lab/Alert';
import { signIn } from './authActions';
import { connect, dispatch } from 'react-redux';
import { Redirect, Route } from "react-router";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { currentUserSession } from '../login/authActions';

const styles = (theme) => ({
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 140,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
});

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to="#" color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [path, setPath] = useState(null);

  useEffect(async () => {
    if (props.authentication.length == 0) {
      console.log("inside")
      await props.loadSession();
      //setAuthentication(props.authentication)
    }
    if (props.authentication.length != 0) {
      console.log(props.location.state?.from.pathname)
      if (props.location.state?.from.pathname === '/cart') {
        setPath("cart")
        
      } else if (props.location.state?.from.pathname === '/profile') {
        if(props.authentication.username == undefined){
          setPath("login")
        }else{
          setPath("profile")
        }
      
      } else {
        if(props.authentication.username == undefined){
          setPath("login")
        }else{
          setPath("home")
        }
      }
    }
  }, [props.authentication]);

  const onSubmit = async event => {
    setLoading(false);
    const { email, password } = event;
    //add the registerUser method here and pass the parameters and get the parameters from actions
    const user = {
      email: email,
      password: password
    }
    await props.loginUser(user);
  };

  const handleClose = () => {
    setLoading(true)
  };

  if(path == "cart"){
    return <Redirect to="/cart" ></Redirect>
  }else if(path == "profile"){
    return <Redirect to="/profile" ></Redirect>
  }else if(path == "home"){
    return <Redirect to="/" ></Redirect>
  }else{
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {props.authentication.code && <Alert severity="error">{props.authentication.message}</Alert>}
        {
          loading ? (
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign In
          </Typography>
              <Form
                onSubmit={onSubmit}
                initialValues={{}}
                validate={validate}
                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                  <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2} alignItems="flex-start">
                      <Grid item xs={12}>
                        <Field
                          variant="outlined"
                          required
                          fullWidth
                          label="Email Address"
                          name="email"
                          type="text"
                          autoComplete="email"
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          variant="outlined"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          autoComplete="current-password"
                          component={TextField}
                        />
                      </Grid>
                      <Grid item style={{ marginTop: 16 }} xs={6}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          disabled={submitting}
                        >
                          Sign In
            </Button>
                      </Grid>
                      <Grid item style={{ marginTop: 16 }} xs={6}>
                        <Button
                          type="button"
                          variant="contained"
                          fullWidth
                          onClick={reset}
                          className={classes.submit}
                          disabled={submitting || pristine}
                        >
                          Reset
                    </Button>
                      </Grid>
                    </Grid>
                    <Grid container justify="flex-start">
                      <Grid item xs>
                        <Link to="/reset_password">
                          Forgot password?
                </Link>
                      </Grid>
                      <Grid item>
                        <Link to="/register">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </form>
                )}
              />
            </div>
          ) : (<Backdrop className={styles.backdrop} open={true} onClick={() => handleClose()}>
            <CircularProgress color="inherit" />
          </Backdrop>)
        }
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return { authentication: state.authentication };
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser: (user) => dispatch(signIn(user)),
    loadSession: () => dispatch(currentUserSession())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)
