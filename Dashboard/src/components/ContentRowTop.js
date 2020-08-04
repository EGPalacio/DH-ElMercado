import React, { Component } from 'react'
import axios from 'axios'
import ProductsInDB from './ProductsInDB';
import Widget from './widgets/TotalCard';

export default class ContentRowTop extends Component {
    
    constructor (props){
        super(props);
        this.state = {
            categCount: 'Cargando...',
            color: 'warning',
            userCount: 'Cargando...',
            userColor: 'danger'

        }
    }

    componentDidMount(){
        const api = axios.create({
            method: 'GET',
            baseURL: `http://localhost:3030/api`,
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
                        userColor: 'warning'
                    })
                    console.log(this.state.userCount);
          })
    }

    render() {
        return (
            <div className="row">
            {/* <!-- Products in DB --> */}
                <ProductsInDB />

            {/* <!-- Categories in DB --> */}
                <Widget 
                    title="Categorias del sitio"
                    total={this.state.categCount}
                    icon="fa-th-list"
                    colorCard={this.state.color}
                    />

            {/* <!-- Amount of users in DB --> */}
            <Widget 
                    title="User quantity"
                    total={this.state.userCount}
                    icon="fa-user-check"
                    colorCard={this.state.userColor}
                    />
        </div>
        )
    }
}
