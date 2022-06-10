import React, { useEffect, useState, } from "react";
import { useHistory } from "react-router-dom";
const ProtectedRoute = (props) => {
    let Cmp = props;
    const history = useHistory();
    useEffect(() => {
        if (!localStorage.getItem('authToken'))
            history.push('/')
    }, [])
    return (
        <>
            <Cmp />
            {/* {...props} */}
        </>
    )
}

export default ProtectedRoute