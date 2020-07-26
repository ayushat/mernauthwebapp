import React from 'react'
import Menu from './Menu';


// ES6 Syntax
const Base = ({
    title = "QuotesNStories",
    description="",
    className="bg-dark text-white p-4 text-center",
    children,   
})  => (
    <div>
        <Menu></Menu>
        <div className="container-fluid">
          <div className="jumbotron bg-dark text-warning text-center">
                <h2 className="display-3">{title}</h2>
                <p className="lead">{description}</p>
          </div>
                <div className={className}>{children}</div>
        </div>
    </div>
)
export default Base;