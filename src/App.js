import logo from './logo.svg';
import './App.css';
import LandingPage from './Pages/LandingPage/LandingPage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DetailsPage from './Pages/DetailsPage/DetailsPage';
import AddProductPage from './Pages/AddProductPage/AddProductPage';



function App() {

  return (
    <>
      <Router>
        <Switch>

          <Route path="/home">
            <LandingPage />
          </Route>

          <Route exact path="/">
            <LandingPage />
          </Route>

          <Route path="/product/:id">
            <DetailsPage />
          </Route>

          <Route path="/addProduct">
            <AddProductPage />
          </Route>
          
        </Switch>
      </Router>
      

    </>
  );
}

export default App;
