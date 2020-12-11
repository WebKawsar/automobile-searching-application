import { Box, Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';



const useStyles = makeStyles({
    root: {
      
    },
    paper: {
        padding: "15px",
        borderRadius: "8px"
    },
    imageArea: {
        overflow: "hidden",
        borderBottom: "5px solid tomato",
        
    },
    image: {
        
        width: "100%",
        height: "250px",
        display: "block",
        transition: "2s",
        "&:hover": {
            transform: "scale(1.5)",
        }
    },
    link: {
        textDecoration: "none",
        color: "black",
    },
    description: {
        textAlign: "justify",
    }


  });



const SingleProduct = (props) => {
    const { _id, name, image, description } = props.product;


    const classes = useStyles();
    return (
        <>
           <Grid item sm={6} md={4} lg={3}>
                <Box>
                    <Paper className={classes.paper}>
                        <Box className={classes.imageArea}>
                            <Link className={classes.link} to={`/product/${_id}`}><img className={classes.image} src={`data:image/jpeg;base64,${image.img}`} alt=""/></Link>
                        </Box>
                        <Box className="content">
                            <Link className={classes.link} to="/home">  
                                <h3 className={classes.name}>{name}</h3>
                                <p className={classes.description}>
                                    {
                                        description.length > 3 &&
                                        description.substring(0, 60 - 3) + "..."
                                    }
                                </p>
                            </Link>
                        </Box>
                    </Paper>
                </Box>
            </Grid> 
        </>
    );
};

export default SingleProduct;