import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import logo from '../../static/images/logo.png';
import { connect, dispatch } from 'react-redux';
import { signOut } from '../login/authActions';
import CakeIcon from '@material-ui/icons/Cake';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),

    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    logo: {
        width: '5%',
        height: '100%'
    },
    button: {
        margin: theme.spacing(1),

    },
    menuIcon: {
        width: '4%'
    }
}));

function PersistentDrawerLeft(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const Link = props.Link;
    const isAuthenticated = props.isAuthenticated;
    let groups = ['default'];
    if(isAuthenticated.length != 0) {
         groups = isAuthenticated.signInUserSession.accessToken.payload['cognito:groups']; 
    }
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <Grid container spacing={3}>
                        <Grid item className={classes.menuIcon} xs={1} sm={1}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={6} sm={9}>
                            <Avatar variant="square" alt="Remy Sharp" src={logo} className={classes.logo} />
                        </Grid>
                        <Grid item xs={5} sm={2} justifyContent="flex-end">
                            {
                                isAuthenticated.username ?
                                    (

                                        <Button
                                            variant="contained"
                                            color="default"
                                            className={classes.button}
                                            endIcon={<LockOpenIcon />}
                                            onClick={() => props.userSignOut()}
                                        >
                                            Logout
                                        </Button>)
                                    : (<Button
                                        variant="contained"
                                        color="default"
                                        className={classes.button}
                                        endIcon={<LockOpenIcon />}
                                    >
                                        <Link to="/login">Login</Link>
                                    </Button>)
                            }
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <Link to="/cake">
                        <ListItem button>
                            <ListItemIcon>{true ? <CakeIcon /> : <CakeIcon />}</ListItemIcon>
                            <ListItemText primary="Cakes" />
                        </ListItem>
                    </Link>
                    <Link to="/short_eat">
                        <ListItem button>
                            <ListItemIcon>{true ? <FastfoodIcon /> : <FastfoodIcon />}</ListItemIcon>
                            <ListItemText primary="Short Eats" />
                        </ListItem>
                    </Link>

                </List>
                <Divider />
                {/* <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon> {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List> */}
                <List>
                {
                        isAuthenticated.username && groups.includes('admin') ? (<Link to="/addCake">
                            <ListItem button>
                                <ListItemIcon>{true ? <AddCircleIcon /> : <AddCircleIcon />}</ListItemIcon>
                                <ListItemText primary="Add New Item" />
                            </ListItem>
                        </Link>) : <div></div>
                    }
                    <Link to="/contact">
                            <ListItem button>
                                <ListItemIcon>{true ? <ContactSupportIcon /> : <ContactSupportIcon />}</ListItemIcon>
                                <ListItemText primary="Contact Us" />
                            </ListItem>
                        </Link>
                    </List>
            </Drawer>

        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userSignOut: () => dispatch(signOut())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PersistentDrawerLeft)
