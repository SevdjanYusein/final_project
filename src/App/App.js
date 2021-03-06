import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, withRouter } from 'react-router-dom';
import './App.css';
import HeaderComponent from '../Header/Header';
import LoginComponent from '../Login-Register/Login';
import HomeComponent from './routes/Home/Home';
import BookDetailsComponent from './routes/Book/Book';
import ProfileComponent from './routes/Profile/Profile';
import MyBooksComponent from './routes/MyBooks/MyBooks';
import SearchComponent from './routes/Search/Search';


class App extends Component {

  render() {
    const isLogged = sessionStorage.getItem('user') !== null;

    const profileRoute = !isLogged ?
      <Route path='/profile' render={() => (<Redirect to='/' />)} />
      :
      <Route path='/profile' component={withRouter(ProfileComponent)} />;

    return (     
        <BrowserRouter>
        <div >
          {isLogged ? <HeaderComponent/> : <LoginComponent onLogin={this.login} />}
            <Route exact path={`/`} component={withRouter(HomeComponent)} />
            <Route exact path={`/myBooks`} component= {withRouter(MyBooksComponent)} />
            <Route exact path={`/book/:id`} component={withRouter(BookDetailsComponent)} />
            <Route exact path={`/search`} component= {withRouter(SearchComponent)} />
            {profileRoute}
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
