import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Forside from './components/Forside/Forside';
import Om from './components/Om/Om';
import Navbar from './components/Navbar/Navbar';
import Hoteller from './components/Hoteller/Hoteller';
import Login from './components/Login/Login';
import Ratings from './components/Ratings/Ratings';
import Header from './components/Header/Header';
import './App.scss'
import Footer from './components/Footer/Footer';


function App() {

  useEffect(() => {
    if(sessionStorage.getItem("token")){
      setLoginData(JSON.parse(sessionStorage.getItem("token")))
    }
  }, [])

  const [loginData, setLoginData] = useState([])

  console.log(loginData)

  async function doFetch(url){
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    }
    catch (error) {
        console.log(error)
    }
}

  return (
    <Router>
      <div className="PageGrid">
      <Navbar/>
      <div className="Content">
      <Header/>
      <Switch>
    
      <Route path="/tilmelding">
          <Ratings loginData={loginData} doFetch={doFetch}/>
        </Route>

      <Route path="/distancer">
          <Hoteller doFetch={doFetch}/>
        </Route>

        <Route path="/om">
          <Om doFetch={doFetch}/>
        </Route>

        <Route path="/login">
          <Login loginData={loginData} setLoginData={setLoginData}/>
        </Route>

      <Route path="/">
        <Forside doFetch={doFetch}/>
      </Route>

      </Switch>
      <Footer/>
      </div>
      </div>
    </Router>
  );
}

export default App;
