import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { logOut } from '../../actions';
import { withRouter } from 'react-router-dom';
import { clearAuthInLS } from '../../helpers/local-storage.helper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: '20px',
      backgroundColor: '#FFEFE8',
      boxShadow: 'none'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export function NavBar(props: any) {
  const { logOut } = props;
  const classes = useStyles();

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#FFEFE8'
      }
    },
  });

  const logout = () => {
    props.history.push('/login')
    clearAuthInLS();
    logOut();
  }

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar elevation={0} color="primary" position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Rehab Buddy
            </Typography>
            <Button onClick={logout} color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  logOut: () => dispatch(logOut()),
});

export default connect(null, mapDispatchToProps)(withRouter(NavBar));