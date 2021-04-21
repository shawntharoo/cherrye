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
import { addContact } from './contactActions';
import { connect, dispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

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
    if (!values.tnumber) {
        errors.tnumber = 'Required';
    }
    if (!values.message) {
        errors.message = 'Required';
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

function Contact(props) {
    const classes = useStyles();
    const history = useHistory();
    const [errors, setErrors] = useState({});

    const onSubmit = async event => {
        const { firstName, lastName, email, tnumber, message } = event;
        //add the registerUser method here and pass the parameters and get the parameters from actions
        const contact = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            tnumber: tnumber,
            message: message
        }
        props.addContactDetails(contact);
        history.push('/cake');
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Contact Us
        </Typography>
                <Form
                    onSubmit={onSubmit}
                    initialValues={{}}
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
                                        fullWidth
                                        name="message"
                                        component={TextField}
                                        variant="outlined"
                                        multiline
                                        label="Message"
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
                                        Submit
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
                        </form>
                    )}
                />
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

function mapStateToProps(state) {
    return { contact: state.contact };
}

function mapDispatchToProps(dispatch) {
    return {
        addContactDetails: (contact) => dispatch(addContact(contact))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Contact)