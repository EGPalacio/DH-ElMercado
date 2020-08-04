import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import LastItemCard from './widgets/LastItemCard';






class LastProductInDB extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            title: " Cargando.. ",
            content: "Cargando..",
            image: "https://informesinbandera.com/img/placeholder-img.png"
        }

    }



    async componentDidMount() {
        this.getProduct();
    }

    getProduct = async () => {


        try{
            const api = await axios.create({
                method: 'GET',
                baseURL: `http://localhost:3030/api`,
            });
           let req = await api('/products');
           let lastProduct = req.data.meta.countByCategory.Productos.length - 1
           let detail = req.data.meta.countByCategory.Productos;
           
          this.setState({ products: detail[lastProduct], 
                title: detail[lastProduct].name,
                image: detail[lastProduct].url,
                description: detail[lastProduct].description,
                price: `$ ${detail[lastProduct].price}`
            })
            console.log(this.state.products);
           

        } catch (err) {
            console.log(err);
           
            
        }

    }

    productUpdate = async e => {

        try {
            let alertUpdate = await this.getProduct();
            if(alertUpdate) {
                Swal.fire('Ultimo producto actualizado')
               
            }
           
        }
        catch (err) {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al conectar a la base de datos',
           
              })
        }
             
    }
  
    render() {


        return (
            <div className="col-lg-4 mb-4">

               < LastItemCard 
                title={this.state.title} 
                image={this.state.image} 
                contentLine01= {this.state.description}
                contentLine02={this.state.price}
                update={this.productUpdate}
                
               />


            </div>
        )
    }
}



export default LastProductInDB;