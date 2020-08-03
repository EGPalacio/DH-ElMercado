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
        console.log(this.state.categories);
        if (this.state.categories.length == 0){
            return (<h3 className="row ml-2">Cargando...</h3>);
        } else {
            return (
                <>
                {this.state.categories.map( (category) =>{
                    return (
                            <CategoryCard
                            key={category.id}
                            nombre={category.category}
                            items={category.products.length}
                            importe={`$ ${this.addCommas(this.priceTotal(category.products))}`}
                        />
                    )
                })}
                </>
            )
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
    
    addCommas(nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
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
                        </div >
                        <div className="card-body">
                            <div className="row">
                                {this.categoriesList()}
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}
