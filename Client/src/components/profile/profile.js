import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import ProfileView from './profileView';
import ProfileDetailView from './profileDetailView';
import { currentUserSession } from '../login/authActions';
import { loadProfile } from './profileActions';
import { connect, dispatch } from 'react-redux';

class Profile extends Component {
  constructor(props) {
    super(props);
    props.loadProfileDetails(props.authentication.attributes.email);
    this.state = {
      profile : {}
    };
  }

 componentDidUpdate(prevProps,prevState) {
    if(Object.entries(this.props.profile).length === 0){
      console.log("no profile data recieved")
    }else{
      if(Object.entries(this.state.profile).length === 0){
        this.setState({profile: this.props?.profile?.Items[0]})
      }
    }
  }


  render() {
  const { attributes } = this.props.authentication;
  return (
  <>
    <Helmet>
      <title>Account | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <ProfileView profile={this.state.profile}/>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetailView user={attributes} profile={this.state.profile}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
  )
    }
};

const mapStateToProps = (state) => {
  return { 
    authentication: state.authentication,
    profile: state.profile
   };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadProfileDetails: (email) => dispatch(loadProfile(email)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)