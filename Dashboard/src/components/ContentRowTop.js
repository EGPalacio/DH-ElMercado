import React from 'react';
import ProductsInDB from './ProductsInDB';
import AmountOfUsersInDB from './AmountOfUsersInDB';
import Widget from './widgets/TotalCard';

function ContentRowTop(){
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

export default ContentRowTop;