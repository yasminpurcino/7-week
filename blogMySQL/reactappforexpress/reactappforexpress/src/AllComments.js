import React, { useReducer, useEffect } from 'react';
import axios from 'axios'


function AllComments(props) {

    const initialState = {
        loading: true,
        post: [],
        error: ''
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'FETCH_SUCCESS':
                console.log("success")
                return {
                    loading: false,
                    post: action.payload,
                    error: ''
                }
            case 'FETCH_ERROR':
                console.log("fail")
                return {
                    loading: false,
                    post: {},
                    error: 'Something went wrong'
                }
            default:
                return {
                    loading: false,
                    post: [],
                    error: 'default error'
                }
        }
    }

    useEffect(() => {
        axios.get('http://localhost:8081/api/comments')
            .then(response => {
                dispatch({ type: "FETCH_SUCCESS", payload: response.data })
            })
            .catch(error => {
                dispatch({ type: "FETCH_ERROR" })
            })
    }, [])
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <div>
            <h3> Showing All Comments </h3>
            <div style={{ textAlign: 'center' }}>

                <ol style={{ textAlign: 'left', listStylePosition: 'inside', width: '600px', margin: '0 auto' }}>
                    {state.post.map(item => <li key={item.id}> <ul><li> {item.comment} </li>
                        <li> User ID: {item.userId} Post ID: {item.postId} Created: {item.creationDate} Last Updated: {item.updationDate} </li> </ul></li>)}
                </ol>
            </div>
        </div>
    );
}

export default AllComments;