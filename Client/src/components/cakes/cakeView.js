import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect, dispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { fetchCake } from './cakeActions';
import { currentUserSession } from '../login/authActions';
import logo from '../../static/images/logo.png';
import { Redirect, Route } from "react-router";
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';

const styles = () => ({
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 140,
  },
});

class CakeView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadSession();
    this.props.fetchData();
  }

  viewDetails = () => {
    console.log("hello");
    <Redirect to="/detialView" />
  }


  render() {
    return (
      <main>
      {
            this.props.cakes ? 
        <Grid container spacing={1}>
              <Grid container item xs={12} spacing={3}>
            {this.props.cakes?.map((cake, index) => (

              <Grid item xs={4} key={cake.id}>


                <Card className={styles.root}>
                  <CardActionArea>
                    <CardHeader
                      title={cake.name}
                      subheader={cake.type}
                    />
                    <CardMedia
                      className={styles.media}
                      component="img"
                      src={cake.image}
                      title="item image not available"
                    />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {cake.ingredients}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {cake.notes}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      Share
          </Button>
                    <Button size="small" color="primary" >
                    <Link to={{ pathname: '/detailView',state: { cake }}}>
                       Learn More
                    </Link>
          </Button>
                  </CardActions>
                </Card>
              </Grid>
              ))}
          </Grid>
          </Grid>
             : <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
          }
      </main>
    )
  }
}

CakeView.propTypes = {
  cakes: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    cakes: state.cakes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchCake()),
    loadSession: () => dispatch(currentUserSession())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CakeView))