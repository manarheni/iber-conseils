import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch, useSelector } from 'react-redux';
import { CreateChatMessage, ListChatByPost } from '../actions/chats';
import AttachmentIcon from '@material-ui/icons/Attachment';
import Compress from "compress.js";
import ImageModal from './ImageModal';

export default function ChatModule(props) {
    const compress = new Compress();
    const { post, reloadChat } = props;
    const user = JSON.parse(localStorage.getItem('profile'))?.result;
    const { chats, chatIsLoading } = useSelector((state) => state.chats);
    const dispatch = useDispatch();
    const [showImage, setShowImage] = useState(false);
    const [msg, setMsg] = useState({
        userId: user?._id,
        message: '',
        file: null,
    });

    const resizeFile = async (file) => {
        const resizedImage = await compress.compress([file], {
            size: 2, // the max size in MB, defaults to 2MB
            quality: 1, // the quality of the image, max is 1,
            maxWidth: 450, // the max width of the output image, defaults to 1920px
            maxHeight: 600, // the max height of the output image, defaults to 1920px
            resize: true // defaults to true, set false if you do not want to resize the image width and height
        })
       const img =resizedImage[0];
       const res = {
           base64: img.data,
           ext: img.ext
       }
       return res;
    };

    const onAddFile = (e) => {
        let file = e.target.files[0];
        if (file) {
            resizeFile(file).then((res) => {
                setMsg({ ...msg, file: `data:image/${res.ext};base64,${res.base64}`})
            })
        }
    }

    useEffect(() => {
       if (post || reloadChat) {
           dispatch(ListChatByPost(post?._id));
       }
    }, [dispatch, post, reloadChat]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!post?._id && msg.message === '' && !msg.file) {
            return
        } else {
            dispatch(CreateChatMessage(msg, post?._id)).then(() => {
                setMsg({ ...msg, message: '', file: null });
            });
        }
    }

    if (!post || chatIsLoading) {
        return (
            <div className="chat-loading">
                <img src="/images/loading-36.gif" alt="Loading" />
            </div>
        );
    } else {
        return (
            <div className="chat-module-container">
                <div id="chat-messages" className="chat-messages">
                    {
                        chats?.map((msg) =>
                            <div key={msg?._id} 
                                className={msg?.userId === user?._id ? 'message-container' : 'message-container reverse'}>
                                    {
                                        msg?.userId === user?._id ? ( 
                                            <img 
                                                title={user?.name}
                                                src={user?.photo || "/images/default-profile.png" } 
                                                alt="User" />
                                        ) : (
                                            <img 
                                                title={msg?.userId === msg?._id ? user?.name : "Client"}
                                                src="/images/default-profile.png" 
                                                alt="User" />
                                        )
                                    }
                                    <span className="chat-message">
                                        {msg?.message ? msg.message : (
                                            <img className="chat-file" src={msg?.file} alt="ChatFile" onClick={() => setShowImage(msg?.file)} />
                                        )}
                                        <em>{Moment(msg?.createdAt).format('DD/MM/YY hh:mm')}</em>
                                    </span>
                            </div>
                        )
                    }
                </div>
                <div className="chat-action">
                    <form id="chatsend" onSubmit={e => handleSendMessage(e)} autoComplete="off">
                        {msg?.file ? <img className="selected-chat-file" src={msg.file} alt="Selected" /> : ""}
                        <textarea disabled={msg?.file ? true : false} type="text" placeholder="Enter your message ..." value={msg.message} onChange={e => setMsg({ ...msg, message: e.target.value })}>
                        </textarea>
                        <button title="Attacher fichier" className="attach-file" onClick={(e) => {e.preventDefault(); document.getElementById('chat-file-input').click()}} >
                            <AttachmentIcon />
                        </button>
                        <button title="Envoyer le message" type="submit" onClick={e => handleSendMessage(e)} >
                            <SendIcon />
                        </button>
                        <input id="chat-file-input" type="file" onChange={onAddFile} />
                    </form>
                </div>
                <ImageModal img={showImage} closeImage={() => setShowImage(null)} />
            </div>
        );
    }
}
