import React, { Component } from 'react'
import axios from 'axios'
import ProductsInDB from './ProductsInDB';
import AmountOfUsersInDB from './AmountOfUsersInDB';
import Widget from './widgets/TotalCard';

const api = axios.create({
    method: 'GET',
    baseURL: `http://localhost:3030/api`,
});

export default class ContentRowTop extends Component {
    constructor (props){
        super(props);
        this.state = {
            categCount: 'Cargando'
        }
    }

    componentDidMount(){
       api('/products/categories').then( (result) => {
                    console.log(result.data.categCount);
                    this.setState({categCount: result.data.categCount})
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
                    colorCard="secondary"
                    />

            {/* <!-- Amount of users in DB --> */}
                <AmountOfUsersInDB />
        </div>
        )
    }
}
