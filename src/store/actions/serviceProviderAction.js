import axiosWithAuth from "../../utils/axiosWithAuth.js";
export const FETCHING_SERVICEPROVIDERS_START = "FETCHING_MOVIES_START";
export const FETCHING_SERVICEPROVIDERS_SUCCESS = "FETCHING_MOVIES_SUCCESS";
export const FETCHING_SERVICEPROVIDERS_FAIL = "FETCHING_MOVIES_FAIL";

export function serviceProviderAction(id, token, movie_id) {
    // console.log('movie id', movie_id)
    return dispatch => {
        dispatch({
            type: FETCHING_SERVICEPROVIDERS_START
        });
        axiosWithAuth(token)
            .get(`${id}/service-providers/${movie_id}`)
            .then(res => {
                dispatch({
                    type: FETCHING_SERVICEPROVIDERS_SUCCESS,
                    payload: res.data,
                    
                });
                // console.log('in action', res.data)
            })
            .catch(err => {
                dispatch({
                    type: FETCHING_SERVICEPROVIDERS_FAIL,
                    payload: err
                })
            })
    }
}