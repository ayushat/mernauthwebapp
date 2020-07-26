import React from 'react'

export default function Footer() {
    return (
        <div>
            <footer className="footer bg-dark mt-auto  py-3">
            <div className="container-fluid bg-success text-white text-center py-3">
                <h4>If you have any questions,feel free to reach me out</h4>
                <button className="btn btn-warning btn-lg ">Contact Us</button>
            </div>
            <div className="container text-center">
                <span className="text-muted">
                    An <span className="text-white">amazing</span> place to <span className="text-white">buy tshirts</span>.
                </span>
            </div>
        </footer>
        </div>
    )
}
