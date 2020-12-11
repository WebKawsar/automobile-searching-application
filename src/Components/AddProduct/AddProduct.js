import { Box, Container, Grid, makeStyles, Paper, TextField } from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';





const useStyles = makeStyles({
    root: {
      backgroundColor: "#FBD062",
      height: "100vh",
    },
    paper: {
        padding: "30px",
    },
    input: {
      backgroundColor: "white",
      borderRadius: "5px",
    },
    helperText: {
      color: "red",
    },
    submit: {
      padding: "18px 60px",
      border: "none",
      backgroundColor: "black",
      color: "white",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "50px"
    },
    inputPrice: {
      width: "50%",
      backgroundColor: "white",
      borderRadius: "5px",
    },
    uploadBtn: {
      padding: "14px 60px",
      border: "2px solid #77C69E",
      borderRadius: "5px",
      display: "block",
    //   width: "50%",
      cursor: "pointer",
      backgroundColor: "#DEFFED",
      color: "green"
    }
  
  
  
});
  

const AddProduct = () => {

    const history = useHistory();
    
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        
        const formData = new FormData();
        const jsonData = JSON.stringify(data);
        
        formData.append("data", jsonData);
        formData.append("image", data.image[0]);
        
  
        fetch('https://automobile-searching.herokuapp.com/addProduct', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(result => {

            if(result){
                
                history.push(`/product/${result._id}`)
            }

        })
        .catch(error => alert(error))
  
    };

    const handleFile = () => {
      document.getElementById('image').click()
    }

    const classes = useStyles();
    return (
        <>
            <Box className={classes.root}>
                <Container>
                    <Grid container>
                        <Grid item md={12}>
                            <Paper className={classes.paper}>
                            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                                
                                <TextField
                                inputRef={register({
                                    required: "Car name is required",
                                })}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                defaultValue=""
                                className={classes.input}
                                id="name"
                                type="text"
                                label="Car Name"
                                name="name"
                                FormHelperTextProps={{
                                    className: classes.helperText,
                                }}
                                helperText={errors.name && errors.name.message}
                                />

                                {/* <TextField
                                inputRef={register({
                                    required: "Email is required",
                                })}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                defaultValue=""
                                className={classes.input}
                                id="email"
                                type="email"
                                label="Your email address"
                                name="email"
                                FormHelperTextProps={{
                                    className: classes.helperText,
                                }}
                                helperText={errors.email && errors.email.message}
                                /> */}

                                {/* {
                                    service.title && 
                                    <TextField
                                    inputRef={register({
                                        required: "Service is required",
                                    })}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    defaultValue={service.title}
                                    className={classes.input}
                                    id="service"
                                    type="text"
                                    label="Service name"
                                    name="service"
                                    FormHelperTextProps={{
                                        className: classes.helperText,
                                    }}
                                    helperText={errors.service && errors.service.message}
                                    />
                                } */}

                                <TextField
                                inputRef={register({
                                    required: "Car description is required",
                                })}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                className={classes.input}
                                multiline
                                rows={5}
                                id="description"
                                type="text"
                                label="Car Description"
                                name="description"
                                FormHelperTextProps={{
                                    className: classes.helperText,
                                }}
                                helperText={errors.description && errors.description.message}
                                />

                                {/* <TextField
                                inputRef={register({
                                    required: "Price is required",
                                })}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                className={classes.inputPrice}
                                id="price"
                                type="number"
                                label="Price"
                                name="price"
                                FormHelperTextProps={{
                                    className: classes.helperText,
                                }}
                                helperText={errors.price && errors.price.message}
                                /> */}

                                <input style={{display: "none"}} ref={register({
                                    required: "Car image is required",
                                })} type="file" name="image" id="image"/>
                                
                                <button className={classes.uploadBtn} type="button" onClick={handleFile}> Upload image</button>
                                {
                                errors.image && <p style={{color: 'red'}}>{errors.image.message}</p>
                                }
                                

                                <input className={classes.submit} type="submit" value="Add product" />
                                
                            </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default AddProduct;