import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';




class LastUserInDB extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }

    }



    async componentDidMount() {
        this.getUser();
    }

    getUser = async () => {
        const req = await axios.get("http://localhost:3030/api/users");
        let lastUser = req.data.users.length - 1
        let detail = req.data.users[lastUser];
        this.setState({ users: detail })
    }

    onSubmit = async e => {
        this.getUser();
        Swal.fire('Last User Updated!')
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
                        <h6 className="m-0 font-weight-bold text-primary">Ultimo usuario creado: <br></br> {this.state.users.first_name} {this.state.users.last_name} </h6>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 20 + 'rem' }} src={this.state.users.avatar} alt="dummy" />



                            <div className="card-body">
                                <h4 className="card-title">{this.state.users.first_name} {this.state.users.last_name}</h4>


                                <p>Email: {this.state.users.email} </p>
                                <p>Rol: {this.state.users.userTypes} </p>
                                <p>Avatar:   <a href={this.state.users.avatar}  >{this.state.users.avatar}  </a> </p>

                                

                                <button type="submit" onClick={this.onSubmit} className="btn btn-info">Actualizar Info </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default LastUserInDB;