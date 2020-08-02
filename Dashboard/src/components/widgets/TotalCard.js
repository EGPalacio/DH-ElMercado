import React, { Component } from 'react'

export default class TotalCard extends Component {
    constructor(props){
        super(props);
        console.log(this.props);
        this.state ={
            total: props.total,
        }
    }
    render() {
        return (
                <div className="col-md-4 mb-4">
                    <div className={`card border-left-${this.props.colorCard} shadow h-100 py-2`}>
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className={`text-xs font-weight-bold text-${this.props.colorCard} text-uppercase mb-1`}> {this.props.title}</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.props.total}</div>
                                </div>
                                <div className="col-auto">
                                    <i className={`fas ${this.props.icon} fa-2x text-gray-300`}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}
