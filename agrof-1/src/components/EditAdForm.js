import React, { useState, useRef } from 'react'
import closeIcon from './icons/closeIcon.png'
import imageIcon from './icons/image.png'
import wheat from './icons/Marchew.webp';


export default function EditAdForm({ closeModal }) {
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const inputRef = useRef(null);

    const handleImageClick = () => {
        inputRef.current.click();
    };

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

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        if (form.checkValidity()) {
            closeModal()
            alert("Pomyślnie zaktualizowano ogłoszenie");
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
                    <input ref={inputRef} className='imgInput' accept="image/*" type="file" onChange={convertToBase64} ></input>
                    <small className='smallText'>Tytuł</small>
                    <input type='text' className='editType' placeholder='Tytuł ogłoszenia' defaultValue={"Marchew"} required></input>
                    <small className='smallText' >Cena (zł)</small>
                    <input type='number' className='editType' placeholder='Cena' step=".01"  defaultValue={18} required></input>
                    <small className='smallText'>Opis</small>
                    <textarea type='text' maxLength={350} onChange={handleDescriptionChange}
                        className='descriptionType' value="Sprzedam marchew nie płukaną. Podana cena za worek 15kg. Odbiór osobisty. Proszę o telefon przed przyjazdem. Nie odpowiadam na SMS.
                   " placeholder='Opis'
                         required>

                    </textarea>
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
