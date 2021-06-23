import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { updateProfile } from './profileActions';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect, dispatch } from 'react-redux';

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.address) {
    errors.address = 'Required';
  }
  return errors;
};

const ProfileDetailView = (props) => {
  console.log(props.profile)
  const [values, setValues] = useState({
    firstName: props.profile.givenName,
    lastName: props.profile.familyName,
    email: props.authentication.attributes.email,
    phoneNumber: props.profile.phoneNumber,
    address:props.profile.address,
    userId: props.profile.userId
  });

  if (values.userId == undefined && props.profile.userId != undefined) {
    setValues({
      firstName: props.profile.givenName,
      lastName: props.profile.familyName,
      email: props.authentication.attributes.email,
      phoneNumber: props.profile.phoneNumber,
      address:props.profile.address,
      userId: props.profile.userId
    });
}

  const [alert, setAlert] = useState();

  const onSubmit = async values => {
    console.log(values)
    setAlert(<Alert severity="info">please wait - the updates are saving</Alert>)
    props.updateUserDetails(values);
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={values}
      render={({ handleSubmit, reset, submitting, pristine, values }) => (
        <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        >
          <Card>
            <CardHeader
              subheader="The information can be edited"
              title="Profile"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Field
                    fullWidth
                    label="First name"
                    name="firstName"
                    required
                    component={TextField}
                    variant="outlined"
                    type="text"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Field
                  fullWidth
                    label="Last name"
                    name="lastName"
                    required
                    component={TextField}
                    variant="outlined"
                    type="text"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Field
                  fullWidth
                    label="Email Address"
                    name="email"
                    required
                    component={TextField}
                    variant="outlined"
                    disabled={true}
                    type="text"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Field
                  fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    type="number"
                    component={TextField}
                    variant="outlined"
                    disabled={true}
                    type="text"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Field
                  fullWidth
                    label="Address"
                    name="address"
                    required
                    component={TextField}
                    variant="outlined"
                    type="text"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
              }}
            >
              <Button
                color="primary"
                variant="contained"
                    type="submit"
                    disabled={submitting}
              >
                Save details
          </Button>
            </Box>
          </Card>
        </form>
      )}
    />
  );
};

function mapStateToProps(state) {
  return { authentication: state.authentication };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserDetails: (profile) => dispatch(updateProfile(profile)),
  };
};


export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ProfileDetailView);