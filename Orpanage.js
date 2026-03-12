import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Orphanage() {
    const [data, SetData] = useState({});
    const { pid } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/Orphanage/${pid}`)
            .then(res => SetData(res.data))
            .catch(err => console.log(err));
    }, [pid]);

    return (
        <div className='admflex'>
            <div className='admleft'>
            <img src={data.image} alt="Orphanage" width={500} height={500} />
            </div>
            <div className='admright'>
                <h1>{data.name}</h1>
                <hr />
                <h2>{data.address}</h2>
                <hr />
                <p>{data.categories}</p>
            </div>
        </div>
    );
}