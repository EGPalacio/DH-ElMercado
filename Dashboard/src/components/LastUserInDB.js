import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import LastItemCard from './widgets/LastItemCard';




class LastUserInDB extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            title: "Cargando.. ",
            content: "Cargando..",
            image: "https://f0.pngfuel.com/png/981/645/default-profile-picture-png-clip-art.png"
        }

    }



    async componentDidMount() {
        this.getUser();
    }
    async componentDidUpdate() {
        
    }

    getUser = async () => {


        try {
            const api = await axios.create({
                method: 'GET',
                baseURL: `http://localhost:3030/api`,
            });
            let req = await api('/users');
            let lastUser = req.data.users.length - 1
            let detail = req.data.users[lastUser];
            this.setState({
                users: detail,
                title: detail.first_name + ' ' + detail.last_name,
                email: `Email:  ${this.state.users.email}`,
                rol: `Tipo de Usuario: ${this.state.users.userTypes} `,
                avatar: `Avatar: ${this.state.users.avatar}`,
                image: detail.avatar
            })


        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al conectar a la base de datos',

            })

        }

    }

    onSubmit = async e => {

        try {
            let alertUpdate = await this.getUser();
            if (alertUpdate) {
                Swal.fire('Ultimo usuario actualizado')

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
                    contentLine01={this.state.email}
                    contentLine02={this.state.rol}
                    contentLine03={this.state.avatar}
                    update={this.onSubmit}

                />


            </div>
        )
    }
}

export default LastUserInDB;