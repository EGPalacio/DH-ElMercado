import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';




class LastProductInDB extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        }

    }

    async componentDidMount() {
        this.getProduct();
    }


    getProduct = async () => {
        const req = await axios.get("http://localhost:3030/api/products");
        let lastProduct = req.data.meta.countByCategory.Productos.length - 1
        let detail = req.data.meta.countByCategory.Productos;
        this.setState({ products: detail[lastProduct] })
        console.log(detail);
    }

    onSubmit = async e => {
        this.getProduct();
        Swal.fire('Last Product Updated!')
    }
    componentDidUpdate() {

    }
    componentWillUnmount() {

    }
    render() {


        return (
            <div className="col-lg-4 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Ultimo Producto creado: <br></br>{this.state.products.name} </h6>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 20 + 'rem' }} src={this.state.products.url} alt="dummy" />



                            <div className="card-body">
                                <h4 className="card-title"> {this.state.products.name} </h4>
                                <p>Descripcion: {this.state.products.description} <br></br>
                              {/*  Categoria: {this.state.products.categories} <br></br>
                               Descuento: {this.state.products.discounts} % <br></br> */}
                               Precio: $ {this.state.products.price}  <br></br>
                            Portada:   <a href={this.state.products.url}  >{this.state.products.url}  </a> </p>


                                <button type="submit" onClick={this.onSubmit} className="btn btn-info">Actualizar Info </button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default LastProductInDB;