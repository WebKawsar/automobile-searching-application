import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, makeStyles, Slide, TextField } from '@material-ui/core';
import React, { forwardRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const useStyles = makeStyles({
    root: {
      backgroundColor: "#dfe6e9",
      height: "100vh",
    },
    image: {
        width: "100%",
        height: "500px"
    },
    btn: {
        padding: "10px 50px",
        borderRadius: "5px",
        margin: "30px 15px",
        cursor: "pointer",
    },
    helperText: {
        color: "red",
    }
   

  });


const Details = () => {

    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();


    const [product, setProduct] = useState({})

    //Get Product Details
    useEffect(() => {

        fetch(`https://automobile-searching.herokuapp.com/singleProductById/${id}`)
        .then(response => response.json())
        .then(data => {
            setProduct(data)
        })
    
    }, []);

    console.log(product)

    const onSubmit = data => {
        
        const formData = new FormData();
        const jsonData = JSON.stringify(data);
        
        formData.append("data", jsonData);
        formData.append("image", data.image[0]);
        
  
        fetch(`https://automobile-searching.herokuapp.com/updateProductById/${id}`, {
            method: 'PATCH',
            body: formData
        })
        .then(response => response.json())
        .then(result => {

            if(result){
                console.log(result);
                history.push(`/product/${id}`)
            }

        })
        .catch(error => alert(error))
    }



    const handleEditButton = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };



    const handleDeleteButton = () => {
        
        fetch(`https://automobile-searching.herokuapp.com/deleteProductById/${id}`, {
            method: "DELETE"
        })
        .then(data => {
            
            if(data){
                console.log(data)
            }
        })
    }


    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Container>
                <Grid container spacing={3}>
                    <Grid item md={6}>
                        <img className={classes.image} src={`data:image/jpeg;base64,${product?.image?.img}`} alt=""/>
                    </Grid>
                    <Grid item md={6}>
                        <h3>{product?.name}</h3>
                        <p>{product?.description}</p>
                        
                        <button onClick={handleEditButton} className={`${classes.btn}`}>Edit</button> || <button onClick={handleDeleteButton} className={`${classes.btn}`}>Delete</button>


                        <Box>
                            <Dialog
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-labelledby="dialogTitle"
                                aria-describedby="slideDescription"
                            >

                                <DialogTitle style={{color: "#1DC7C1", textAlign: "center"}} id="dialogTitle">
                                    Automobile Car information update
                                </DialogTitle>

                                <DialogContent>


                                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>

                                        <TextField
                                            inputRef={register({ 
                                                required: "Car name is required"
                                            })}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="name"
                                            type="text"
                                            label="Name"
                                            // defaultValue={loggedInUser.name}
                                            name="name"
                                            FormHelperTextProps={{
                                                className: classes.helperText
                                            }}
                                            helperText={errors.name && errors.name.message}
                                        />

                                        <TextField
                                            inputRef={register({ 
                                                required: "Car description is required"
                                            })}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="description"
                                            type="text"
                                            label="description"
                                            name="description"
                                            FormHelperTextProps={{
                                                className: classes.helperText
                                            }}
                                            helperText={errors.description && errors.description.message}
                                        />

                                        <TextField
                                            inputRef={register({ 
                                                required: "Car image is required"
                                            })}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="image"
                                            type="file"
                                            label="Image"
                                            name="image"
                                            FormHelperTextProps={{
                                                className: classes.helperText
                                            }}
                                            helperText={errors.image && errors.image.message}
                                        />

                                        <DialogActions>
                                            <Button type="submit" variant="outlined" color="primary">
                                                Update
                                            </Button>
                                        </DialogActions>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </Box> 
                    </Grid>
                </Grid>
            </Container> 
        </Box>
    );
};

export default Details;