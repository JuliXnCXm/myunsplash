import React, { useState } from 'react'
import "../styles/photoAditionalInfo.css"
import axios from 'axios'
const PhotoAditionalInfo = ({photo, handleClose}) => {
    const [urlToDownload, setUrlToDownload] = useState("")

    const handleDownload = (url) => {
        console.log(url)
        axios({
            url: url,
            method: "GET",
        }).then((response) => {
            console.log(response)
            const url = window.URL.createObjectURL(new Blob([response.data]));
            return url
        });
    }

    return (
    <>
        <span className="material-icons material-icons-outlined" id="closeButton" onClick={() => handleClose()}>
            cancel
            </span>
        <div className='photoAditionalInfo'>
            <div className='photoAditionalInfo__photoContainer'>
                <img src={photo.photourl} alt="" />
            </div>
            <div className='photoAditionalInfo_info'>
                <ul>
                    <li>
                        <span className="material-icons material-icons-outlined">
                        article
                        </span>
                        <span>{photo.photoname}</span>
                    </li>
                    <li>
                        <span className="material-icons material-icons-outlined">
                        event
                        </span>
                        <span> {photo.created.slice(0,[photo.created.indexOf("T")])}
                        </span>
                    </li>
                </ul>
                <span>
                    <span className="material-icons material-icons-outlined" id="download_icon" onClick={handleDownload}>file_download</span>
            </span>
            </div>
        </div>
    </>
  );
}

export default PhotoAditionalInfo
