import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { TextField } from 'final-form-material-ui';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Form, Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

function CakeDetailView(props) {
    const classes = useStyles();
    const history = useHistory();
    const { cake } = props.location.state;

    const onSubmit = async event => {
        const { quantity } = event;
        console.log(event);
        if (props.authentication.username) {
            // history.push('cart');
            history.push('contact');
        } else {
            // history.push({
            //     pathname: '/login',
            //     state: { page: 'cart' }
            // });
            history.push('contact');
        }
        //add the registerUser method here and pass the parameters and get the parameters from actions

    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2} lg={12}>
                    <Grid item xs={12} lg={2}>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={cake.image} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12}  lg={5} sm container>
                        <Grid item xs container direction="column">
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {cake.name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {cake.ingredients}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {cake.notes}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>    
                        <Grid item xs={12}  lg={3} container direction="column">
                            <Typography variant="subtitle1">Cost per 1 unit - AU ${cake.price}</Typography>
                        </Grid>
                        <Grid item xs={12}  lg={2} container direction="raw">
                            <Form
                                onSubmit={onSubmit}
                                initialValues={{ quantity: 1 }}
                                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                                    <form className={classes.form} noValidate onSubmit={handleSubmit}>

                                                <Field
                                                    variant="outlined"
                                                    required
                                                    size="small"
                                                    label="Quantity"
                                                    name="quantity"
                                                    type="text"
                                                    autoComplete="quantity"
                                                    component={TextField}
                                                />
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.submit}
                                                    disabled={submitting}
                                                    size="small"
                                                >
                                                    Add to Cart
          </Button>
                                    </form>
                                )}
                            />
                        </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        authentication: state.authentication,
    };
};

export default connect(
    mapStateToProps
)(CakeDetailView)