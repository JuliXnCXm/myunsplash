import {React,useState, useContext, useEffect} from 'react'
import AuthContext from '../context/AuthContext'
import '../styles/header.css'
import logo from '../assets/logo.svg'
import AddPhotoModal from './AddPhotoModal'
import Modal from './Modal'

const Header = () => {
    const [show, setShow] = useState(false);
    const [showModalMobile, setShowModalMobile] = useState(false);
    const { setQuery,query } = useContext(AuthContext);
    const breakpoint = 670
    const [windowWidth , setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize);
    },  [])

    const handleClick = () => {
        setShow(true)
    }

    const handleClose = () => {
        show ? setShow(false) : setShowModalMobile(false)
    }

    const openMobileModal = () => {
        windowWidth < breakpoint && setShowModalMobile(true)
    }

    return (
        <>
            <div className="header-container">
            <div className="header-container__image">
                <img className="logo" src={logo} alt="" />
                <div className="input--container" id={windowWidth < breakpoint && "input_mobile"}>
                <span
                    className="material-icons material-icons-outlined "
                    id="search_icon"
                    style={windowWidth > breakpoint ? {zIndex: 1} : null}
                    onClick={openMobileModal}
                >
                    search
                </span>
                {windowWidth > breakpoint && (
                    <input
                    className="header__input"
                    type="text"
                    placeholder="Search by name"
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                    />
                )}
                </div>
            </div>
            <div>
                <button className="header__button" onClick={handleClick}>
                {windowWidth < breakpoint ? 
                <span className="material-icons material-icons-outlined">
                upload_file
                </span>
                : 
                    "Add a photo"
                }
                </button>
            </div>
            {show && (
                <Modal>
                    <AddPhotoModal show={show} handleClose={handleClose} />
                </Modal>
            )}
            {showModalMobile && (
                <Modal>
                    <span className="material-icons material-icons-outlined" id="closeButton" onClick={handleClose}>
                        cancel
                    </span>
                    <div className='input_mobile_container'>
                        <input
                        className="header__input"
                        type="text"
                        placeholder={query === "" ? "Search by name": query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                        value={query}
                        />
                    </div>
                </Modal>
            )}
            </div>
        </>
    );
}


export default Header
