import { Box, Container, Grid, makeStyles, } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import SingleProduct from '../SingleProduct/SingleProduct';


const useStyles = makeStyles({
    root: {
      
    },
    container: {
        width: "50%",
        margin: "auto",
        padding: "30px 0"
    },
    text: {
        width: "100%",
        padding: "15px 40px 15px 10px",
        boxSizing: "border-box",
        borderRadius: "30px",
        border: "3px solid tomato",
        "&:focus": {
            outline: "none"
        }
    },



  });


const Home = () => {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [filterProducts, setFilterProducts] = useState([]);
    

    useEffect(() => {

        fetch("https://automobile-searching.herokuapp.com/products")
        .then(response => response.json())
        .then(data => {
            setProducts(data)
        })
    
    }, [products]);


    useEffect(() => {
        
        setFilterProducts( products.filter((country) =>
            country.name.toLowerCase().includes(search.toLowerCase().trim())
          )
        );
    }, [search, products]);

    
    
    const classes = useStyles();

    return (
        <Container>
            <Header />
            <Box className={classes.container}>
                <Grid container >
                    <Grid item spacing={2} xs={12} md={10}>
                        <input onChange={(e) => setSearch(e.target.value.toLowerCase())} name="search" className={classes.text} type="text" placeholder="Search your car" />
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={4}>
                {
                  filterProducts.length ?
                  filterProducts.map(product => <SingleProduct key={product._id} product={product} />)
                  :
                  <Grid item md={12}>
                      <h2 style={{textAlign: "center", color: "red"}}>No Car Found</h2>
                  </Grid>
                }
            </Grid>
            
        </Container>
    );
};

export default Home;