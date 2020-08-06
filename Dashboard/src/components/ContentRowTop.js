import React, { Component } from 'react'
import axios from 'axios'
import ProductsInDB from './ProductsInDB';
import Widget from './widgets/TotalCard';

export default class ContentRowTop extends Component {
    
    constructor (props){
        super(props);
        this.state = {
            prodCount: 'Cargando...',
            prodColor: 'danger',
            categCount: 'Cargando...',
            color: 'danger',
            userCount: 'Cargando...',
            userColor: 'danger'

        }
    }

    componentDidMount(){
        const api = axios.create({
            method: 'GET',
            baseURL: `http://localhost:3030/api`,
        });
        api('/products/').then( (result) => {
            this.setState({
                prodCount: result.data.count,
                color: 'primary'
            })
        });

       api('/products/categories').then( (result) => {
                    this.setState({
                        categCount: result.data.categCount,
                        color: 'primary'
                    })
                });
       api('/users/').then( (result) => {
                    this.setState({
                        userCount: result.data.users.length,
                        userColor: 'primary'
                    })
                    console.log(this.state.userCount);
          })
    }

    render() {
        return (
            <div className="row">
            {/* <!-- Products in DB --> */}
            <Widget 
                    title="Total de Productos"
                    total={this.state.prodCount}
                    icon="fa-clipboard-list"
                    colorCard={this.state.color}
                    />

            {/* <!-- Categories in DB --> */}
                <Widget 
                    title="Categorias del sitio"
                    total={this.state.categCount}
                    icon="fa-th-list"
                    colorCard={this.state.color}
                    />

            {/* <!-- Amount of users in DB --> */}
            <Widget 
                    title="Usuarios Registrados"
                    total={this.state.userCount}
                    icon="fa-user-check"
                    colorCard={this.state.userColor}
                    />
        </div>
        )
    }
}
