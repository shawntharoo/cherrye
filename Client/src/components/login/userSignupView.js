import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import { signUp } from './authActions';
import { connect, dispatch } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.address) {
    errors.address = 'Required';
  }
  if (!values.tnumber) {
    errors.tnumber = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.cpassword) {
    errors.cpassword = 'Required';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const { authentication } = props;
  const onSubmit = async event => {
    setLoading(false);
    const { firstName, lastName, email, tnumber, password, address } = event;
    //add the registerUser method here and pass the parameters and get the parameters from actions
    const user = {
      givenName: firstName,
      familyName: lastName,
      email: email,
      address: address,
      phoneNumber: tnumber,
      password: password
    }
    await props.registerUser(user);
  };

  const handleClose = () => {
    setLoading(true)
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {authentication?.user?.username && <Alert severity="success">User successfully created. Please check you E-Mail for verification link</Alert>}
      {authentication.code && <Alert severity="error">{authentication.message}</Alert>}
      {
        loading ? (
          <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Form
        onSubmit={onSubmit}
        initialValues={{ }}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={12} sm={6}>
              <Field
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                label="First Name"
                type="text"
                autoFocus
                component={TextField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                variant="outlined"
                required
                fullWidth
                label="Last Name"
                name="lastName"
                type="text"
                autoComplete="lname"
                component={TextField}
              />
            </Grid>
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
                label="Address"
                name="address"
                type="text"
                autoComplete="address"
                component={TextField}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                autoComplete="tnumber"
                name="tnumber"
                variant="outlined"
                required
                fullWidth
                label="Contact No"
                type="text"
                autoFocus
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
            <Grid item xs={12}>
              <Field
                variant="outlined"
                required
                fullWidth
                name="cpassword"
                label="Confirm Password"
                type="password"
                autoComplete="confirm-password"
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
            Sign Up
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
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
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
  );
}

function mapStateToProps(state) {
  return { 
    propOne: state.propOne,
    authentication: state.authentication };
}

function mapDispatchToProps(dispatch) {
  return {
    registerUser: (user) => dispatch(signUp(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)