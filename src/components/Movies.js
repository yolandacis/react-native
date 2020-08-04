
import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { API_BASE_URL } from '../config';
import IncreaseCountButton from './IncreaseCountButton';
import MovieDelete from './MovieDelete';
import { confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


export default class App extends React.Component {
    constructor(){
        super();
        this.state = {
            data: null,
            loaded: true,
            error: null
        }
    }
    baseURL = API_BASE_URL+'/movies';
    
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
    onDelete(id) {

        console.log('clik' + id);
        this.setState({loaded:false, error: null});
        let url = this.baseURL + '/'+ id;
        
        let req = new Request(url, {
            method: 'DELETE'
        });
        
        fetch(req)
        .then(this.showData)
        .then(this.getData)
        console.log('se elimino');

    }
    onIncrease(id) {
        console.log ('clic en aumentar contador'+ id);
        this.setState({loaded:false, error: null});
        let url = this.baseURL + '/'+ id + '/count';
        
        let req = new Request(url, {
            method: 'POST'
        });
        
        fetch(req)
        .then(this.showData)
        .then(this.getData)
        console.log('se ACTUALIZÓ');
    }
    render() {
        return (
            <ScrollView >
                { !this.state.loaded && (
                    <Text>LOADING</Text>
                )}
                <Text style={styles.txt}> PELICULAS!</Text>
                <Button title="lISTADO DE PELICULAS"
                    onPress={this.getData} />
                { this.state.error && (
                    <Text style={styles.err}>{this.state.error}</Text>
                )}
                { this.state.data && this.state.data.length > 0 && (
                    this.state.data.map( comment => (
                        <Text key={comment.id} style={styles.txt}>
                            <table>
                            <tr>
                            <td>
                           { comment.title }
                           </td>
                           <td>
                           { comment.count }
                           </td>
                           <td>
                           <button onClick={() => this.onDelete(comment.id)}> Eliminar</button>
                           </td>
                           <button onClick={()=> this.onIncrease(comment.id)}>Like</button>
                           </tr>
                           </table>
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