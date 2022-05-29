import React, { useState } from 'react'
import axios from 'axios'
import DatePicker from 'react-date-picker';
import SpecificDateData from './SpecificDateData';
const SpecificDate = () => {
    const id = localStorage.getItem('ownerId')
    const token = localStorage.getItem("authToken")
    const [specificUsers, setSpecificUsers] = useState([])
    const [value, setOnChange] = useState(new Date());

    const handleChange = (e) => {

        axios.post(
            `/api/user/getUsersInCafeSpecificDate/${id}`,
            { date: e },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            },
        ).then(function (response) {
            console.log(response.data)

            setSpecificUsers(response.data.unique)

            // console.log(users)

        }).catch((error) => {
            console.log(error.message)
        })
    }
    console.log(value)
    console.log(specificUsers.length)
    return (
        <> <div className='mb-4'>
            <span className='fs-6 fw-bolder mb-0'>Specific Date Visit's : <DatePicker onChange={(e) => { setOnChange(e); handleChange(e) }} value={value} /></span>
            <button className="btn btn-dark  float-end mr-4">{`Total Users ${specificUsers.length}`}</button>

        </div>

            <div>
                <div>
                    <div><span className='mb-3 fs-4 fw-bolder'>Specific Date Visit User In Cafe </span>

                        <div>
                            <table className="table">
                                <thead className="thead-dark ">
                                    <tr>
                                        <th scope="col"> User ID</th>
                                        <th scope="col">User Name</th>
                                        <th scope="col">Login Time </th>
                                        {/* <th scope="col">Handle</th> */}
                                    </tr>
                                </thead>

                                <tbody>
                                    {specificUsers && specificUsers.map((item, index) =>
                                        <SpecificDateData item={item} key={index} />
                                    )}

                                </tbody>

                            </table >
                        </div >

                    </div >
                    <div>
                    </div>
                </div >
            </div>




        </>
    )
}
export default SpecificDate