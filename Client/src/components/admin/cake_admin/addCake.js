import React, { useState } from "react";
import { Form, Field } from 'react-final-form';
import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  CssBaseline,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { addCake, uploadItemImage } from './addCakeActions';
import { connect, dispatch } from 'react-redux';
import FileUploader from '../../common/uploadFileDirective';

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.price) {
    errors.price = 'Required';
  }
  if (!values.weight) {
    errors.weight = 'Required';
  }
  if (!values.type) {
    errors.type = 'Required';
  }
  return errors;
};

function AddCake(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState();

  const onSubmit = async values => {
    setAlert(<Alert severity="info">please wait - the item is adding to the database</Alert>)
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(300);
    // window.alert(JSON.stringify(values, 0, 2));
    const imgRespnse = await props.uploadCakeImage(selectedFile)
    imgRespnse.payload.then(function (result) {
      values.image = result.location;
      props.addCakeItem(values);
      setAlert(<Alert severity="success">Your item is added successfully</Alert>)

    }, function (err) {
      setAlert(<Alert severity="error">This is an error — please try again!</Alert>)
      console.log(err); // Error: "It broke"
    });

  };

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        ADD CAKE
      </Typography>
      <Form
        onSubmit={onSubmit}
        initialValues={{ availability: true }}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="name"
                    component={TextField}
                    variant="outlined"
                    type="text"
                    label="Cake Name"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="price"
                    component={TextField}
                    variant="outlined"
                    type="text"
                    label="Price"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="weight"
                    fullWidth
                    required
                    component={TextField}
                    variant="outlined"
                    type="text"
                    label="Weight"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="type"
                    required
                    component={Select}
                    label="Select a Type"
                    formControlProps={{ fullWidth: true }}
                  >
                    <MenuItem value="Cake">Cake</MenuItem>
                    <MenuItem value="Pastries">Pastries</MenuItem>
                    <MenuItem value="Cupcake">Cupcake</MenuItem>
                    <MenuItem value="Sandwitch">Sandwitch</MenuItem>
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="ingredients"
                    component={TextField}
                    variant="outlined"
                    multiline
                    label="Ingrediants"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    label="Availability"
                    control={
                      <Field
                        name="availability"
                        component={Checkbox}
                        type="checkbox"
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="notes"
                    component={TextField}
                    variant="outlined"
                    multiline
                    label="Notes"
                  />
                </Grid>

                <Grid item xs={12}>

                  <FileUploader
                    onFileSelectSuccess={(file) => setSelectedFile(file)}
                    onFileSelectError={({ error }) => alert(error)}
                  />


                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />
      {alert}
    </div>
  );
}

function mapStateToProps(state) {
  return { propOne: state.propOne };
}

function mapDispatchToProps(dispatch) {
  return {
    addCakeItem: (cake) => dispatch(addCake(cake)),
    uploadCakeImage: (file) => dispatch(uploadItemImage(file))
  };
};


export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(AddCake);

