import React, { Component } from 'react'

export default class CategoryCard extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="col-lg-12 mb-4">
                <div className="card bg-primary text-white shadow">
                    <div className="card-body">
                    <div className="col mr-2">
                            <div className={`text-xs font-weight-bold text-white text-uppercase mb-1`}> {this.props.nombre}</div>
                        </div>
                        <div className="row col-auto">
                            <div className="col-11 h5 mb-0 text-white-800">{this.props.importe}</div>
                            <div className="h5 mb-0 text-white-800">{this.props.items}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
