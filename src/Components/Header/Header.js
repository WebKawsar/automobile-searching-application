import { AppBar, Badge, Button, fade, IconButton, InputBase, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },



}));

const Header = () => {

    


    const history = useHistory()
    const handleClick = () => {
      history.push("/addProduct")
    }
  
    const classes = useStyles();
    return (
        <>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                
                </Typography>
                <Button onClick={handleClick} color="inherit">Add Car</Button>
              </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;