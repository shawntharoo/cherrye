import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Button, Container,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { forgotPasswordCode, newPasswordSubmit } from './authActions';
import { connect, dispatch } from 'react-redux';

const validateReqCode = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    }
    return errors;
};

const validateResetPassword = values => {
    const errors = {};
    if (!values.code) {
        errors.code = 'Required';
    }
    if (!values.password) {
        errors.password = 'Required';
    }
    if (!values.cpassword) {
        errors.cpassword = 'Required';
    }
    if (values.password !== values.cpassword) {
        errors.cpassword = 'two passwords are not equal'
    }
    return errors;
};

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function ResetPassword(props) {
    const classes = useStyles();
    const [codeSent, setCodeSent] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [isSendingCode, setIsSendingCode] = useState(false);

    const sendCodeClick = async event => {
        setIsSendingCode(true);
        try {
            props.forgotPasswordSendCode(event);
            setCodeSent(true);
        } catch (error) {
            setIsSendingCode(false);
        }
    }

    const onConfirm = async event => {
        setIsConfirming(true);
        try {
            props.newPasswordSave(event);
            setConfirmed(true);
        } catch (error) {
            setIsConfirming(false);
        }
    }

    function requestCodeForm() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Request Verification
                </Typography>
                    <Form
                        onSubmit={sendCodeClick}
                        validate={validateReqCode}
                        render={({ handleSubmit, reset, submitting, pristine, values }) => (
                            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            autoComplete="email"
                                            name="email"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            autoFocus
                                            component={TextField}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Send Confirmation
          </Button>
                            </form>
                        )}
                    />
                </div>
            </Container>
        )
    }

    function renderConfirmation() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Confirmation Code
                    </Typography>
                    <Form
                        onSubmit={onConfirm}
                        validate={validateResetPassword}
                        render={({ handleSubmit, reset, submitting, pristine, values }) => (
                            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="code"
                                            label="Confirmation Code"
                                            name="code"
                                            autoFocus
                                            component={TextField}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="New Password"
                                            type="password"
                                            name="password"
                                            autoFocus
                                            component={TextField}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="Confirm Password"
                                            type="password"
                                            name="cpassword"
                                            autoFocus
                                            component={TextField}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            disabled={submitting}
                                        >
                                            Reset Password
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        )} />
                </div>
            </Container>
        );
    }

    function renderSuccessMessage() {
        return (
            <div className="success">
                <p>Your password has been reset.</p>
                <p>
                    <Link to="/login">
                        Click here to login with your new credentials.
          </Link>
                </p>
            </div>
        );
    }

    return (
        <Container component="main" maxWidth="xs">
            {!codeSent
                ? requestCodeForm()
                : !confirmed
                    ? renderConfirmation()
                    : renderSuccessMessage()}

        </Container>
    );
}

function mapStateToProps(state) {
    return { authentication: state.authentication };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        forgotPasswordSendCode: (credential) => dispatch(forgotPasswordCode(credential)),
        newPasswordSave: (credential) => dispatch(newPasswordSubmit(credential))
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ResetPassword)