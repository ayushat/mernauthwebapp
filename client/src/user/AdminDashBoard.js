import React from 'react'
import Base from "../core/Base";

const AdminDashBoard = () => {
    return (
        <Base title= "Admin-DashBoard page">
            <div className="row">
                <div className="col-12 ">
                     <button className="btn btn-success btn-lg btn-block mb-5 rounded-pill">A</button>
                </div>
                <div className="col-12 ">
                     <button className="btn btn-danger btn-lg btn-block mb-5 rounded-pill">B</button>
                </div>

            </div>
        </Base>
    )
}
export default AdminDashBoard;