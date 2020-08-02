import React, { Component } from 'react'
import axios from 'axios'
import ProductsInDB from './ProductsInDB';
import AmountOfUsersInDB from './AmountOfUsersInDB';
import Widget from './widgets/TotalCard';

export default class ContentRowTop extends Component {
    constructor (props){
        super(props);
        this.state = {
            categCount: 'Cargando',
            color: 'danger'

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
                <AmountOfUsersInDB />
        </div>
        )
    }
}
