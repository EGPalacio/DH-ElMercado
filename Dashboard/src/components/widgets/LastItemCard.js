import React, { Component } from 'react';
import Swal from 'sweetalert2';



export default class LastItemCard extends Component {

    constructor(props){
        super(props);
    }
   
    render() {
        return (
    
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                       
                        <h6 className="m-0 font-weight-bold text-primary"> {this.props.title} </h6>
                        
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 20 + 'rem' }} src={this.props.image} alt="dummy" />



                            <div className="card-body">
                                <h4 className="card-title">{this.props.title}</h4>


                                <p>{this.props.contentLine01} </p>
                                <p>{this.props.contentLine02} </p>
                                <p>{this.props.contentLine03} </p>

                                

                                <button type="submit" onClick={this.props.update} className="btn btn-info">Actualizar Info </button>
                            </div>
                        </div>
                    </div>
                </div>

        )
    }
}

