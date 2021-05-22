import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import ProfileView from './profileView';
import ProfileDetailView from './profileDetailView';
import { currentUserSession } from '../login/authActions';
import { connect, dispatch } from 'react-redux';

function Profile(props){
  console.log(props.authentication)
  const { attributes } = props.authentication;
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
            <ProfileDetailView user={attributes}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
  )
};

function mapStateToProps(state) {
  return { authentication: state.authentication };
}

function mapDispatchToProps(dispatch) {
  return {
       
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)