import React, { useState } from 'react';
import './App.css';
import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import * as myData from './data.js';
import PostDetails from './components/PostDetails/PostDetails';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashbord/Dashbord';
import LikedPosts from './components/LikedPosts/LikedPosts';
import UserPosts from './components/UserPosts/UserPosts';
import Profile from './components/Profile/Profile';
import { FloatingWhatsApp } from 'react-floating-whatsapp-button'
import 'react-floating-whatsapp-button/dist/index.css'
import Reset from './components/Auth/Reset';

const App = () => {
  const user = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null;
  const [selectedLang, setSelectedLang] = useState('fr');
  const [data, setData] = useState(myData.fr);
  const [showListLangs, setShowListLangs] = useState(false);
  const bodyClasses = document.getElementsByTagName('body')[0].classList;
  bodyClasses.add('arabic');

  const selectLang = (lang) => {
    setSelectedLang(lang);
    if (lang === 'en') {
      setData(myData.en);
      bodyClasses.remove('arabic');
    } else if (lang === 'fr') {
      setData(myData.fr);
      bodyClasses.remove('arabic');
    } else {
      setData(myData.ar);
      bodyClasses.add('arabic');
    }
    setShowListLangs(false);
  };

  window.onscroll = () => {
    const header = document.getElementById('header');
    if (window.scrollY < 5) {
      if (header) {
        header.classList.remove('shadow');
      }
    } else if (header) {
      header.classList.add('shadow');
    }
  };

  return (
    <BrowserRouter>
      <Container className="myContainer" maxWidth="xl">
        <Header
          data={data}
          onSelectLang={(lang) => selectLang(lang)}
          selectedLang={selectedLang}
          showListLangs={showListLangs}
          onShowListLang={() => setShowListLangs(!showListLangs)}
        />
        <div className="pages-container">
          <Route path="/" exact><Home data={data} /></Route>
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path="/myFavorites/" exact component={LikedPosts} />
          <Route path="/myPosts/" exact component={UserPosts} />
          <Route path="/profile/" exact > <Profile profile={user?.result} /> </Route>
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/" />)} />
          <Route path="/reset" exact component={() => (!user ? <Reset /> : <Redirect to="/" />)} />
          <Route path="/admin"> <Dashboard /> </Route>
        </div>
        <Footer data={data} />
      </Container>
      <FloatingWhatsApp size='60px' phone='+21655084214' popupMessage='Bonjour, comment pouvons-nous vous aider ?' autoOpenTimeout={999999} />
    </BrowserRouter>
  );
};

export default App;
