import React, { Component } from 'react'
import ProductsInDB from './ProductsInDB';
import AmountOfUsersInDB from './AmountOfUsersInDB';
import Widget from './widgets/TotalCard';

export default class ContentRowTop extends Component {
    render() {
        return (
            <div className="row">
            {/* <!-- Products in DB --> */}
                <ProductsInDB />

            {/* <!-- Categories in DB --> */}
                <Widget />

            {/* <!-- Amount of users in DB --> */}
                <AmountOfUsersInDB />
        </div>
        )
    }
}
