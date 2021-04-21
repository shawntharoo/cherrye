import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { TextField } from 'final-form-material-ui';
import Grid from '@material-ui/core/Grid';
import { Form, Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { useHistory } from "react-router-dom";
import { connect, dispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    app: {
        width: '100%',
        height: '100%',
        margin: '50px auto',
        boxShadow: '0 0 5px #ccc'
    },
    details: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        padding: '30px 0'
    },
    detailsBigimg: {
        maxWidth: '500px',
        minWidth: '290px',
        overflow: 'hidden',
        margin: '25px'
    },
    bigImg: {
        width: '100%',
        height: '100%',
        maxHeight: '400px',
        display: 'block',
        objectFit: 'cover'
    },

    detailsbox: {
        maxWidth: '500px',
        minWidth: '290px',
        margin: '25px'
    },
    boxrow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '15px'
    },
    boxrowh2: {
        textTransform: 'uppercase',
        letterSpacing: '2px'
    },
    boxrowspan: {
        color: 'crimson',
        fontSize: 20
    },
    boxp: {
        lineHeight: '1.5',
        margin: '15px 0'
    },
    boxCart: {
        background: '#333',
        color: 'white',
        outline: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '10px 25px',
        marginTop: '15px'
    },
    quantityText: {
        width: '50px',
        margin: '12px',
        margin: theme.spacing(1),
        width: 200,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(10, 1, 1, 1),
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
        <div className={classes.app}>

            <div className={classes.details} key={cake.id}>
                <div className={classes.detailsBigimg}>
                    <img className={classes.bigImg} src={cake.image} alt="" />
                </div>

                <div className={classes.detailsbox}>
                    <div className={classes.boxrow}>
                        <h2 className={classes.boxrowh2}>{cake.name}</h2>
                        <span className={classes.boxrowspan}>${cake.price}</span>
                    </div>

                    <p className={classes.boxp}>{cake.ingredients}</p>
                    <p className={classes.boxp}>{cake.notes}</p>


                    <Form
                        onSubmit={onSubmit}
                        initialValues={{ quantity: 1 }}
                        render={({ handleSubmit, reset, submitting, pristine, values }) => (
                            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={2} alignItems="flex-start">
                                    <Grid item xs={4}>
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
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            disabled={submitting}
                                        >
                                            Add to Cart
          </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    />
                </div>
            </div>

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