import React, { Component } from 'react';
import axios from 'axios'






class ProductsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }

    }

    async componentDidMount() {

       this.getProducts();

    }


    getProducts = async () => {

        try {
            const api = await axios.create({
                method: 'GET',
                baseURL: `http://localhost:3030/api`,
            });
            let req = await api('/products');
            let detail = req.data.products;
            

            this.setState({
                products: detail,
               
            })
           


        } catch (err) {
            console.log(err);

        }

    }
    componentDidUpdate() {

    }
    componentWillUnmount() {

    }

    render() {

        return (
            <div>
            <h1 className="h3 mb-2 text-gray-800">All the products in the Database</h1>
                        
          
            <div className="card shadow mb-4">
                <div className="card-body">

            <div className="table-responsive">

                <table className="table table-bordered" id="dataTable" width="100%" >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Categories</th>
                            <th>Portada</th>
                            <th>Discount</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Categories</th>
                            <th>Portada</th>
                            <th>Discount</th>
                        </tr>
                    </tfoot>
                    <tbody>
                        {this.state.products.map((product, i) => (

                            <tr key={product + i}>


                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>${product.price}</td>
                                <td>

                                    {product.categories}

                                </td>
                                <td>


                                    <a href={product.url}>
                                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 120 + 'rem' }} src={product.url} alt="dummy" />
                                    </a>


                                </td>
                                <td>{product.discounts}</td>

                            </tr>
                        ))}

                    </tbody>
                </table>

            </div>
            </div>
            </div>
            </div>

        )

    }

}
//declarar las PropTypes

/* ProductsTable.propTypes = {
    name: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    price: propTypes.number.isRequired ,
    categories: propTypes.array.isRequired,
    colors: propTypes.array.isRequired ,
    stock :propTypes.number.isRequired ,
};

ProductsTable.defaultProps = {
    name : "Product Name",
    description : "Product Description",
    price : 320.800,
    categories : ["Category 01", "Category 01", "Category 01"],
    colors : [{ class : "text-danger", color : "Red" },
    { class : "text-primary", color : "Blue" },
    { class : "text-success", color : "Green" },],
    stock : 245
}; */

//border: "card border-left-primary shadow h-100 py-2"
//icono: "fas fa-clipboard-list fa-2x text-gray-300"
export default ProductsTable;