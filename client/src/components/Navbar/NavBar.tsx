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
import { withRouter, Link } from 'react-router-dom';
import { clearAuthInLS } from '../../helpers/local-storage.helper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar elevation={0} color="primary" position="static">
          <Toolbar>
            <IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>
                  <Link to={{ pathname: "/about" }}> About </Link>
                </MenuItem>
                <MenuItem>
                  <Link to={{ pathname: "/train" }}> Train </Link>
                </MenuItem>
                <MenuItem>
                  <Link to={{ pathname: "/settings" }}> Settings </Link>
                </MenuItem>
                <MenuItem>
                  <Link to={{ pathname: "/dashboard" }}> Dashboard </Link>
                </MenuItem>
              </Menu>
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