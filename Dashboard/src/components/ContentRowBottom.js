import React, { Component } from 'react'
import LastProductInDB from './LastProductInDB';
import LastUserInDB from './LastUserInDB';
import CategoriesInDB from './CategoriesInDB';

export default class ContentRowBottom extends Component {
    render(){
        return (
            <div className="row">

                {/* <!-- Last Product in DB --> */}
                <LastProductInDB />

                {/* <!-- Categories in DB --> */}
                <CategoriesInDB />

                {/* <!-- Users in DB --> */}
                <LastUserInDB />

            </div>
        )
    }
}