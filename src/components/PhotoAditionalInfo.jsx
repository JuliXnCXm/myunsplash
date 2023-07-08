import React from 'react'
import "../styles/photoAditionalInfo.css"
import usePhotos from '../hooks/usePhotos'
const PhotoAditionalInfo = ({photo, handleClose}) => {
    
    const {retrievePhoto } = usePhotos()

    const handleDownload = () => {
        console.log(retrievePhoto(photo.photoname))
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
            </div>
        </div>
    </>
  );
}

export default PhotoAditionalInfo
