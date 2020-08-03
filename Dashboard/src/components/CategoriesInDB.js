import React, { Component } from 'react'
import axios from 'axios'
import CategoryCard from './categories/CategoryCard'

export default class CategoriesInDB extends Component {
    constructor (props){
        super(props);
        this.state = {
            categCount: 'Cargando',
            color: 'danger',
            categories: [],
        }
    }

    getCategoriesApi = async () =>{
        try{
            const api = await axios.create({
                method: 'GET',
                baseURL: `http://localhost:3030/api`,
            });
           let apiCategories = await api('/products/categories');
            this.setState({
                categCount: apiCategories.data.categCount,
                categories: apiCategories.data.data,
                color: 'primary'
            })

        } catch (err) {
            console.log(err);
            console.log(this.state.categories);
        }
    }

    categoriesList = ()=>{
        if (this.state.categories == []){
            return <div className="row">Cargando</div>
        } else {
            return <div className="row">insertar api</div>
            // {this.state.categories.map( (category) =>{
            //     return
            //     <div className="row">
            //             <CategoryCard
            //             nombre={`Categoria`}
            //             items={`0`}
            //             importe={`$ 0`}
            //         />
            //     </div>
            //   })}
        }
    }

    priceTotal = (arr) =>{
        let total = 0;
        arr.map((item) => {
            let itemPrice = parseInt(item.price);
            total += itemPrice;
        });
        return total;
    }

    componentDidMount(){
        this.getCategoriesApi();
    }

    render() {
        return (
            <div className="col-lg-4 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Dashboard de Categorias</h6>
                        </div>
                        <div className="card-body">
                            {this.state.categories.map( (category) =>{
                                console.log(category);
                                return (
                                    <div key={category.id} className="row">
                                            <CategoryCard
                                            nombre={category.category}
                                            items={category.products.length}
                                            importe={this.priceTotal(category.products)}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
        )
    }
}
