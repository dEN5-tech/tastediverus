import React from 'react';
import {
    ListGroup
}
from "react-bootstrap";

import
{
    Heart

}
from 'react-bootstrap-icons';
import axios from "axios";




export const  LikeBtn = (params)=>{
	    function SetLike()
    {
        axios.get(`https://tastediverus.herokuapp.com/api/like`,
        {
            params:
            {
                'id': `${params.id}`,
                'year': `${params.year}`,
                'title': `${params.title}`,
                'type': `${params.type}`,
                'token': `${JSON.parse(localStorage.getItem('cookie')).cookie}`
            }
        }).then(() =>
        {
            window.location.reload()
        })

    }
		return (
			<Heart
			onClick={SetLike}
			/>
		);
	}


