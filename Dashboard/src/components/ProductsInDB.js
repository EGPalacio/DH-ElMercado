import React, {Component} from "react";


class ProductsInDB extends Component{
    constructor(props){
        super(props);
        this.state = {
            cantidad: ""
        }
    }
    apiCall(url, consecuencia){
        fetch(url)
        .then(response => response.json())
        .then(data => consecuencia(data))
        .catch(error => console.log(error))
    }
    mostrarCantidadProductos(){
        this.apiCall("http://localhost:3030/api/products", this.mostrarCantidades)
    }
    componentDidMount(){
        this.mostrarCantidadProductos()
    }
    mostrarCantidades = (data) => {
        this.setState({
            cantidad: data.meta.count
        })
    }
    render() {
        let contenido;
        if(this.state.cantidad === ""){
            contenido = <div className="h5 mb-0 font-weight-bold text-gray-800">Cargando...</div>
        }else{
            contenido = <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.cantidad}.</div>
        }
        return(
            <div className="col-md-4 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">CANTIDAD DE PRODUCTOS</div>
                                {contenido}
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductsInDB;





/* import React from 'react';

function ProductsInDB(){
    return(
        <div className="col-md-4 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1"> Products in Data Base</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">135</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
} */

/* export default ProductsInDB; */