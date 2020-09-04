import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Forside from './components/Forside/Forside';
import Om from './components/Om/Om';
import Navbar from './components/Navbar/Navbar';
import Distancer from './components/Distancer/Distancer';
import Login from './components/Login/Login';
import Tilmelding from './components/Tilmelding/Tilmelding';
import SideBar from './components/Sidebar/Sidebar';

import './App.scss'
import './MediaQueries.scss'
import Footer from './components/Footer/Footer';
import Deltagerliste from './components/Deltagerliste/Deltagerliste';


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

      <div className="mobileMenu">
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
      <div id="page-wrap">
      </div></div>

      <Switch>
    
      <Route path="/tilmelding">
          <Tilmelding loginData={loginData} doFetch={doFetch}/>
        </Route>

      <Route path="/distancer">
          <Distancer doFetch={doFetch}/>
        </Route>

        <Route path="/om">
          <Om doFetch={doFetch}/>
        </Route>
        
        <Route path="/deltagerliste">
          <Deltagerliste doFetch={doFetch}/>
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
