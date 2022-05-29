import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MonthUserData from './MonthUserData';
const MothlyLoginUser = () => {
    // const [users, setUsers] = useState(false);
    const id = localStorage.getItem('ownerId')
    const [monthlyUsers, setMonthlyUsers] = useState(false);
    const token = localStorage.getItem("authToken")
    const [mcount, setMcount] = useState()
    // console.log(id)
    useEffect(async () => {

        await axios.get(
            `/api/user/DailyLoginUserInCafe/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            },
        ).then(function (response) {
            // console.log(response.data.MonthlyUser)

            setMonthlyUsers(response.data.MonthlyUser)
        }).catch((error) => {
            console.log(error.message)
        })




    }, [])
    //change time formate

    // console.log(monthlyUsers.length)
    // const a = console.log(a)

    return (
        <>
            <div>
                <div>
                    <div>
                        <span className='mb-3 fs-4 fw-bolder'>Mothaly Cafe Visit User </span>
                        <button className="btn btn-dark mb-2 float-end">{`Total Users ${monthlyUsers.length}`}</button>
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
                                    {monthlyUsers && monthlyUsers.map((item, index) =>
                                        <MonthUserData item={item} key={index} />
                                    )}
                                </tbody>

                            </table>
                        </div>

                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MothlyLoginUser