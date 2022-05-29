import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DailyLoggedUser from './DailyLoggedUserData'
const LoginUser = () => {
    const id = localStorage.getItem('ownerId')
    const token = localStorage.getItem("authToken")
    const [users, setUsers] = useState([])
    const [count, setCount] = useState()


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
            // console.log(response.data)


            setUsers(response.data.Daily)
            // let countNo = [];
            // countNo.push(response.data.Daily)

            // const a = (1 + countNo.length)
            // setCount(a)
            // let counter = 0;
            // for (let i = 0; i <= count.length; i++) {
            //     counter++;
            // }




        }).catch((error) => {
            console.log(error.message)
        })
        // console.log(count);

    }, []);



    return (
        <>
            <div className='mb-4'>

                <Link to="/monthlylogin"><button type="button" className="btn btn-warning float-end mb-3 ml-4"> Last Month Visit Users</button></Link>

                <Link to="/specificDateLoginUser"><button type="button" className="btn btn-info float-end mb-3 "> Specific Date Visit</button></Link>
            </div>

            <div>
                <div>
                    <div><span className='mb-3 fs-4 fw-bolder'>Daily Cafe Visit User   <button className="btn btn-dark mb-2 mr-3 ">{`Total Users ${users.length}`}</button></span>
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
                                    {users && users.map((item, index) =>
                                        <DailyLoggedUser item={item} key={index} />
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

export default LoginUser