import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Navbar from './Navbar';
import Home from './components/Home';
import Movies from './components/Movies';
import MovieForm from './components/MovieForm';
import FacebookLogin from './components/facebooklogin/facebooklogin';
import { View, StyleSheet, Text, Linking, TextInput, Button } from 'react-native';

class App extends Component {
  render() {
    return (
 	<div>
 		<MovieForm/>
 		<Movies/>
 		
 	</div>
    );
  }
}

export default App
 
