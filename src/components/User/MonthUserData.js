
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const MonthUserDara = (item) => {
    const [loginUser, setLoginUser] = useState(false);
    const token = localStorage.getItem("authToken")

    const id = item.item;
    // console.log(id)
    useEffect(() => {
        const getData = async () => {

            // console.log(id);
            await axios.get(
                `/api/user/getUser/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                },
            ).then(function (response) {
                console.log(response.data.user)

                setLoginUser(response.data.user)
                // console.log(user)

            }).catch((error) => {
                console.log(error.response)
            })


        }
        getData()
    }, [item])
    //change time formate
    function formatAMPM(date) {
        var hours = new Date(date).getHours();
        var minutes = new Date(date).getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    return (
        <>
            {loginUser &&
                <tr>

                    <th scope="row">{loginUser?._id}</th>
                    <td>{loginUser?.name}</td>
                    { }
                    <td>{new Date(`${loginUser?.cafeLoginTime}`).toDateString()}<span> , {`${formatAMPM(loginUser?.cafeLoginTime)}`}</span></td>
                    {/* new Date('2022-05-24T04:33:21.021Z').toUTCString() */}
                    {/* <td>@mdo</td> */}
                </tr>
            }


        </>
    )
}

export default MonthUserDara