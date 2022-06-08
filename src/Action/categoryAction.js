import axios from "axios";



// };
export const createCategory = (categoryData) => async (dispatch) => {
    try {
        dispatch({
            type: "NEW_CATEGORY_REQUEST",
        });

        const { data } = await axios.post(
            `http://localhost:5000/api/category/create`,
            categoryData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        dispatch({
            type: "NEW_CATEGORY_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "NEW_CATEGORY_FAIL",
            payload: error.response.data.message,
        });
    }
};
export const viewAllCategory = () => async (dispatch) => {
    try {
        dispatch({
            type: "ALL_CATEGORY_REQUEST",
        });

        const { data } = await axios.post(
            `http://localhost:5000/api/directory/getAll`,

            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        dispatch({
            type: "ALL_CATEGORY_SUCCESS",
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: "ALL_CATEGORY_FAIL",
            payload: error.response.data.message,
        });
    }
};