import React, { useEffect, useState } from 'react'
import axios from '../services/api.js'

export default function DescriptionField() {
    const [adDescription,setAdDescription] = useState('');

    useEffect(() =>{
        const fetchAdData = async () => {
            try{
                const response = await axios.get('/ad/668ba5666f9f2851637278a4');
                if(response.status===200){
                    console.log("AD description: "+response.data.adDTO.description);
                    setAdDescription(response.data.adDTO.description);
                }
            }catch(error){
                console.log("fetch ad data error: "+error);
            }
        }
        fetchAdData();
    },[]);
    
    return (
        <div className="opis-container">
            
            <div className="opis-tytul">Opis</div>
            <div className="opis-tresc" name="description" >{adDescription} </div>
        </div>
    )
}
