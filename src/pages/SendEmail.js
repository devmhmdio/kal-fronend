import React from 'react';
import './SendEmail.css';

const SendEmail = () => {
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <td>Subject</td>
                        <td>Body</td>
                        <td>Name</td>
                        <td>Email Id</td>
                        <td>Action</td>
                    </tr>
                </thead>
            </table>
        </div>
    )
}

export default SendEmail;