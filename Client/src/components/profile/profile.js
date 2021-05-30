import React, { useState, useEffect } from 'react';
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

function Profile(props){
  
  useEffect(() => {
    props.fetchData()
  });

  const { attributes } = props.authentication;
  const { profile } = props.profile;
  console.log(profile)
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
            <ProfileView user={attributes}/>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetailView user={attributes} profile={profile}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
  )
};

function mapStateToProps(state) {
  return { 
    authentication: state.authentication,
    profile: state.profile
   };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: () => dispatch(loadProfile()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)