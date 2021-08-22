import './App.scss';
import LogIn from './Components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Register from './Components/Register';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Homepage from './Components/Homepage';
import Filmdetails from './Components/Filmdetails';
import Buyticket from './Components/Buyticket';
import Aboutus from './Components/Aboutus'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Contact from './Components/Contact';
import { useDispatch, useSelector } from 'react-redux';
import users from './Redux/actions';
import { useEffect } from 'react';

function App() {

  const { access_token, backUrl } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => dispatch(users.loadApp()),[]);

  return (
    <div className="App">

      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/film-details">
            <Filmdetails />
          </Route>
          <Route path="/purchase">
            <Buyticket />
          </Route>
          <Route path="/log-in">
            {access_token ? <Redirect to={backUrl} /> : <LogIn />}
          </Route>
          <Route path="/register">
          {access_token ? <Redirect to={backUrl} /> : <Register />}
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/aboutus">
            <Aboutus/>
          </Route>
          <Route path="/filmdetail/:id" children={<Filmdetails />}>
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
