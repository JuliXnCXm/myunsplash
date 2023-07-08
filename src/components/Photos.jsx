import { React, useState, useMemo, useContext } from "react";
import usePhotos from "../hooks/usePhotos";
import Modal from "./Modal";
import "../styles/photos.css";
import AuthContext from "../context/AuthContext";
import PhotoAditionalInfo from "./PhotoAditionalInfo";
import Skeleton from "./Skeleton";

const Photos = () => {
    const { query } = useContext(AuthContext);
    const {
        photos,
        loadingPhotos,
    } = usePhotos();
    const [filteredPhotos, setFilteredPhotos] = useState(photos);
    const [showModal, setShowModal] = useState(false);
    const [photoOverview, setPhotoOverview] = useState({});

    const handleCloseModal = () => {
        document.body.style.overflowY = "scroll";
        setShowModal(false);
    };

    useMemo(() => {
        const result = photos.filter((photo) => {
        return photo.photoname.toLowerCase().includes(query);
        });
        setFilteredPhotos(result);
    }, [photos, query]);

    return (
        <>
        <div className="photos--container">
            {loadingPhotos ? (
            <Skeleton />
            ) : (
            <>
                {filteredPhotos.map((photo, index) => {
                return (
                    <div key={index} className="container--image">
                    <img
                        src={photo.photourl}
                        alt=""
                        onClick={() => {
                        setPhotoOverview(photo);
                        setShowModal(true);
                        }}
                    />
                    <div className="infoContainer" onClick={() => {
                        setPhotoOverview(photo);
                        setShowModal(true);
                        }}>
                        <span>{photo.photoname}</span>
                    </div>
                    </div>
                );
                })}
            </>
            )}
        </div>
        {showModal & !loadingPhotos && (
            <Modal>
            <PhotoAditionalInfo
                photo={photoOverview}
                handleClose={handleCloseModal}
            />
            </Modal>
        )}
        </>
    );
};

export default Photos;
