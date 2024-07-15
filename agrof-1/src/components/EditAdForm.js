import React, { useState, useRef, useEffect } from 'react'
import closeIcon from './icons/closeIcon.png'
import imageIcon from './icons/image.png'
import wheat from './icons/Marchew.webp';
import axiosInstance from '../services/api';


export default function EditAdForm({ adData, closeModal, fetchData }) {
    let [image, setImage] = useState(adData ? adData.image : "");
    let [title, setTitle] = useState(adData ? adData.title : "");
    let [price, setPrice] = useState(adData ? adData.price : "");
    let [description, setDescription] = useState(adData ? adData.description : "");
    const [_id, setId] = useState(adData ? adData._id : "");
    const inputRef = useRef(null);
    const id = JSON.parse(localStorage.getItem('user_id'));


    const handleImageClick = () => {
        inputRef.current.click();
    };

    useEffect(() => {

        if (adData && id) {
            setImage(adData.image);
            setTitle(adData.title);
            setPrice(adData.price);
            setDescription(adData.description);
        }
    }, [adData]);


    function convertToBase64(e) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
            setImage(reader.result);
        };
        reader.onerror = error => {
            console.log("Error: ", error);
        };
    }

    const handleDescriptionChange = (e) => {
        const inputText = e.target.value;
        const remainingChars = 350 - inputText.length;
        if (remainingChars >= 0) {
            setDescription(inputText);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        if (form.checkValidity()) {

            const title = form.title.value;
            const price = form.price.value;
            const description = form.description.value;

            try {
                const response = await axiosInstance.put(`/ad/${_id}`,{
                    title,price,image, description
                });
                
                if (response.status === 200) {
                    console.log("poszol")
                    alert("Pomyślnie zaktualizowano ogłoszenie");
                    fetchData();
                    closeModal();
                }
            } catch (error) {
                console.log("put ad data error: " + error)
            }
            
            
            
            
        } else {
        }
    };

    return (

        <form className='editUserBackground' onSubmit={handleSubmit}>

            <div className='editUserContainer'>
                <button onClick={() =>
                    closeModal(false)}
                    className='closeButton'
                >
                    <img className='closeIcon' src={closeIcon} alt='closeIcon'></img>
                </button>
                <h1>Edytuj ogłoszenie</h1>
                <ul className='listEdit'>
                    <small className='smallText'>Dodaj zdjęcie</small>
                    <div className='imgContainer'>
                        {image ? (
                            <img width={300} height={300} src={image} alt="Uploaded Image" />
                        ) : (
                            <img onClick={handleImageClick} width={300} height={300}
                                src={wheat} alt="Default Image" style={{ cursor: 'pointer' }} />
                        )}


                    </div>
                    <input ref={inputRef} name='image' className='imgInput' accept="image/*" type="file" onChange={convertToBase64} ></input>
                    <small className='smallText'>Tytuł</small>
                    <input type='text' name='title' className='editType' placeholder='Tytuł ogłoszenia' defaultValue={title} required></input>
                    <small className='smallText' >Cena (zł)</small>
                    <input type='number' name='price' className='editType' placeholder='Cena' step=".01" defaultValue={price} required></input>
                    <small className='smallText'>Opis</small>
                    <textarea
                        type='text'
                        name='description'
                        maxLength={350}
                        onChange={handleDescriptionChange}
                        className='descriptionType'
                        defaultValue={description}
                        placeholder='Opis'
                        required
                    ></textarea>
                    <span className='charLimiter'>{350 - description.length}/350</span>

                </ul>
                <div className='editButtons'>
                    <input type="submit" className='editButton' value={"Edytuj"}></input>
                    <button onClick={() =>
                        closeModal(false)}
                        className='discardButton'
                    >
                        Anuluj
                    </button></div>

            </div>

        </form>
    )
}
