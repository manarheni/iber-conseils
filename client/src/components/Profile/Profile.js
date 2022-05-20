import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EditProfile } from '../../actions/users';
import Compress from 'compress.js';
import { Button, Fade, Grid, TextField, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import useStyles from './styles';

export default function Profile(props) {
    const classes = useStyles();
    const { profile } = props;
    const dispatch = useDispatch();
    const compress = new Compress();
    const user = JSON.parse(localStorage.getItem('profile'))?.result;
    const { profileIsLoading } = useSelector((state) => state.users);
    const [profileData, setProfileData] = useState({ name: user?.name, email: user?.email, phone: user?.phone, avatar: '' })
    const [passChange, setPassChange] = useState({ password: '', newPassword: ''})

    useEffect(() => {
        if(profile) {   
            // console.log(profile)
            setProfileData({ ...profileData, name: profile?.name, email: profile?.email, phone: profile?.phone, avatar: profile?.avatar })
        }
        // eslint-disable-next-line
    }, [profile]);

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

    const updatePassword = (e) => {
        e.preventDefault();
        //dispatch(EditProfile(user._id, profileData))    
    }

    return (
        <Fade in>
            <div className={classes.myContainer}>
                <div className={classes.card}>
                    <div className={classes.imageSection}>
                        <img className={classes.media} src={ '/images/intro-background.jpg' } alt="BG" />
                        <div className="post-overlay">
                        <div className="flex between">
                            <Typography variant="h3" component="h2">Mon profile </Typography>
                        </div>
                        </div>
                    </div>
                    <div className="user-photo" >
                        <div style={{ position: "relative" }}>
                            <img className="avatar" style={{ margin: "0 auto", display: "block", width: '240px' }}
                                src={profileData.avatar || "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png"}
                                alt='Avatar'
                            />
                            <button className="btna" onClick={() => document.getElementById('inputFile').click()}  ><AddAPhotoIcon style={{fontSize: '20px'}}/> </button>
                            <input type='file' id='inputFile' onChange={(e) => uploadPhotos(e)} />
                        </div>
                    </div>
                </div>
                { profileIsLoading 
                    ? (  <div className="flex" style={{ height: '100%', minHeight: '250px' }}><img src="/images/admin-loading.gif" alt="Loading" className="admin-loading" /></div>) 
                    : ( <Grid container justifyContent="space-between" alignItems="stretch" spacing={6} className={classes.gridContainer}>
                            <Grid item xs={12} sm={6} md={6}>
                                <form>
                                    <div className="flex start ">
                                        <TextField  type="password" 
                                                    label="Mot de passe" 
                                                    variant="filled" 
                                                    className="profile-input"
                                                    onChange={e => setPassChange({...passChange, password: e.target.value})} 
                                                    value={passChange.password} 
                                                    />   
                                    </div>
                                    <div className="flex start">
                                        <TextField  type="password" 
                                                    label="Nouveau mot de passe" 
                                                    variant="filled" 
                                                    className="profile-input"
                                                    onChange={e => setPassChange({...passChange, newPassword: e.target.value})} 
                                                    value={passChange.newPassword} 
                                                    />
                                    </div>
                                    <Button variant="contained"
                                            color="primary"
                                            className="btn"
                                            startIcon={<SaveIcon />}
                                            onClick={e => updatePassword(e)}
                                            style={{ left: 'initial' }}>
                                            Changer mon mot de passe
                                    </Button>
                                </form>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <div className="profile-block" >
                                    <form>
                                        <div className="flex start ">
                                            <TextField  type="text" 
                                                        label="Nom" 
                                                        variant="filled" 
                                                        className="profile-input"
                                                        onChange={e => setProfileData({...profileData, name: e.target.value})} 
                                                        value={profileData.name} 
                                                        />   
                                        </div>
                                        <div className="flex start">
                                            <TextField type="phone" label="Téléphone" variant="filled" className="profile-input" 
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
                                                onClick={e => updateProfile(e)}
                                                style={{ left: 'initial' }}>
                                                Sauvegarder
                                        </Button>
                                    </form>
                                </div>
                            </Grid>
                        </Grid>
                    )
                }
            </div>
        </Fade>
    )
}
