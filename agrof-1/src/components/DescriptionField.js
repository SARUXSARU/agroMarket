import React, { useEffect, useState } from 'react'
import axios from '../services/api.js'

export default function DescriptionField({_id}) {
    const [adDescription,setAdDescription] = useState('');

    useEffect(() =>{
        const fetchAdData = async () => {
            try{
                const response = await axios.get(`/ad/${_id}`);
                if(response.status===200){
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
