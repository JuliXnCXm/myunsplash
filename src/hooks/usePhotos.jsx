import {useState, useEffect} from 'react'
import axios from 'axios'
import { apiPhotos} from '../context/Api'


const usePhotos = () => {
    const [photos, setPhotos] = useState([])
    const [ formPassword, setFormPassword ] = useState( { password: '' } )
    const [ showAlert, setShowAlert ] = useState( false )
    const [loadingPhotos, setLoadingPhotos] = useState(true)

    useEffect(() => {
        axios.get(apiPhotos,{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        }).then(
            res => {
                setPhotos(res.data.photos)
                setTimeout(() => {
                    setLoadingPhotos(false)
                }, 2000)
            }
            ).catch(
                err => {
                    console.log(err)
                }
                )
            }
        , [] )

    const handleSubmit = ( e , photo) =>
    {
        e.preventDefault()
        handleDelete( photo, formPassword.password )
    }

    const handleForm = ( e ) =>
    {
        setFormPassword( {
            ...formPassword, [ e.target.name ]: e.target.value
        } )
    }

    const handleDelete = async (photo, password) => {
        let resp = await fetch(`${apiPhotos}/${photo.photoname}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({photo, password})
        })
        if (resp.status === 200) {
            window.location.reload()
        } else {
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            },2000)
        }
    }

    const retrievePhoto = async (photo) => {
        let resp = await fetch(`${apiPhotos}/${photo}`, {
        })
        if (resp.status === 200) {
            return resp
        }
    }

    return {
        photos,
        loadingPhotos,
        retrievePhoto,
        handleDelete,
        handleSubmit,
        handleForm,
        formPassword,
        showAlert,
    }

}

export default usePhotos