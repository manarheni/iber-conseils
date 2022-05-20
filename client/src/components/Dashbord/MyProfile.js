import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EditProfile } from '../../actions/users';
import Compress from 'compress.js';
import { Button, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

export default function MyProfile({profile}) {
    const dispatch = useDispatch();
    const compress = new Compress();
    const user = JSON.parse(localStorage.getItem('profile'))?.result;
    const { profileIsLoading } = useSelector((state) => state.users);
    const [profileData, setProfileData] = useState({ name: user?.name, email: user?.email, phone: user?.phone, avatar: '' })

    useEffect(() => {
        if(profile) {   
            setProfileData({ ...profileData, name: profile?.name, email: profile?.email, phone: profile?.phone, avatar: profile?.avatar })        
        }
        // eslint-disable-next-line
    }, [profile])

    const resizePhotos = async (file) => {
        const resizedImages = await compress.compress([file], {
            size: 2, // the max size in MB, defaults to 2MB
            quality: 1, // the quality of the image, max is 1,
            maxWidth: 100, // the max width of the output image, defaults to 1920px
            maxHeight: 100, // the max height of the output image, defaults to 1920px
            resize: true // defaults to true, set false if you do not want to resize the image width and height
        })
        const resizedPhoto = resizedImages[0]
        return resizedPhoto;
    };

    const uploadPhotos = (e) => {
        const file = e.target.files[0];
        let photo = '';
        if (file) {
            resizePhotos(file).then((res) => {
                photo = `data:image/${res.ext};base64,${res.data}`;
            }).then(() => setProfileData({ ...profileData, avatar: photo }))
        }
    }

    const updateProfile = (e) => {
        e.preventDefault();
        dispatch(EditProfile(user._id, profileData))    
    }

    if (profileIsLoading) return (<div className="flex" style={{ height: '100%' }}><img src="/images/admin-loading.gif" alt="Loading" className="admin-loading" /></div>)

    return (
        <div>
            <h3>Profile</h3>
            <div className="app-container flex profile-form">
                <div className="profile-col1" >
                    <img className="avatar"
                        src={profileData.avatar || "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png"}
                        alt='Avatar'
                    />
                    <button className="images-select btn" onClick={() => document.getElementById('inputFile').click()}  >Ajouter </button>
                    <input type='file' id='inputFile' onChange={(e) => uploadPhotos(e)} />
                </div>

                <div className="form profile-col2" >
                    <form>
                        <div className="flex start ">
                            <TextField  type="text" 
                                        label="Name" 
                                        variant="filled" 
                                        className="profile-input"
                                        onChange={e => setProfileData({...profileData, name: e.target.value})} 
                                        value={profileData.name} 
                                        />   
                        </div>
                        <div className="flex start">
                            <TextField type="phone" label="Phone" variant="filled" className="profile-input" 
                                            onChange={e => setProfileData({...profileData, phone: e.target.value})} 
                                            value={profileData.phone}  />
                        </div>
                        <div className="flex start">
                            <TextField type="email" label="Email" variant="filled" className="profile-input" 
                                            onChange={e => setProfileData({...profileData, email: e.target.value})} 
                                            value={profileData.email}  />
                        </div>
                        <Button variant="contained"
                                color="primary"
                                className="btn"
                                startIcon={<SaveIcon />}
                                onClick={e => updateProfile(e)}>
                                Sauvegarder
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
