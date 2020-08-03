
import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';


export default class App extends React.Component {
    constructor(){
        super();
        this.state = {
            data: null,
            loaded: true,
            error: null
        }
    }
    baseURL = 'http://localhost:8000/movies';
    
    getData = (ev)=>{
        this.setState({loaded:false, error: null});
        let url = this.baseURL;
        
        let req = new Request(url, {
            method: 'GET'
        });
        
        fetch(req)
        .then(response=>response.json())
        .then(this.showData)
        .catch(this.badStuff)
    }
    showData = (data)=>{
        this.setState({loaded:true, data});
        console.log(data);
    }
    badStuff = (err) => {
        this.setState({loaded: true, error: err.message});
    }
    render() {
        return (
            <ScrollView >
                { !this.state.loaded && (
                    <Text>LOADING</Text>
                )}
                <Text style={styles.txt}>Películas encontradas!</Text>
                <Button title="lISTADO DE PELICULAS"
                    onPress={this.getData} />
                { this.state.error && (
                    <Text style={styles.err}>{this.state.error}</Text>
                )}
                { this.state.data && this.state.data.length > 0 && (
                    this.state.data.map( comment => (
                        <Text key={comment.id} style={styles.txt}>
                           { comment.title }  
                        </Text>
                    ))
                )}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt: {
        fontSize: 24,
        color: '#333'
    },
    err:{
        color: 'red',
        fontSize: 30,
        fontWeight: 'bold'
    }
});