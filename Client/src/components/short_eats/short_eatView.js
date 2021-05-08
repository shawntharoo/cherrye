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
import { fetchShorteat } from './short_eatActions';
import { currentUserSession } from '../login/authActions';
import logo from '../../static/images/logo.png';
import { Redirect, Route } from "react-router";
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Skeleton from '@material-ui/lab/Skeleton';
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

class ShortEatView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
  };
  }

  componentDidMount() {
    this.props.loadSession();
  }

  handleClose = () => {
    this.setState({open: false})
  };

  viewDetails = () => {
    console.log("hello");
    <Redirect to="/detialView" />
  }


  render() {
    let shorteatArray = this.props.cakes.filter(function (el) {
      return el.type == 'shorteats';
    });
    return (
      <main>
      {
            shorteatArray.length != 0 ? 
        <Grid container spacing={1}>
              <Grid container item xs={12} spacing={3}>
            {shorteatArray?.map((cake, index) => (

              <Grid item xs={12} sm={6} lg={4} key={cake.id}>


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
                    <Button size="small" color="primary" >
                    <Link to={{ pathname: '/detailView',state: { cake }}}>
                       Buy Now
                    </Link>
          </Button>
                  </CardActions>
                </Card>
              </Grid>
              ))}
          </Grid>
          </Grid>
             :    <Backdrop className={styles.backdrop} open={this.state.open} onClick={() => this.handleClose()}>
        <CircularProgress color="inherit" />
      </Backdrop>
          }
      </main>
    )
  }
}

ShortEatView.propTypes = {
  cakes: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    cakes: state.cakes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSession: () => dispatch(currentUserSession())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ShortEatView))