import React from 'react';
import ContentRowTop from './ContentRowTop';
import ContentRowBottom from './ContentRowBottom'
import AllProducts from './ProductsTable'

function MainContent(){
    return (
            /* <!-- Begin Page Content --> */
            
            <div className="container-fluid">
                
                            
                <ContentRowTop />
                <ContentRowBottom />
                <AllProducts />
            
            </div>


    )
}

export default MainContent;