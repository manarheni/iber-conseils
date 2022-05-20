import React from 'react'
import { Grow } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export default function ImageModal(props) {
    const { img } = props;
    if (!img) return null;
    return (
        <Grow in>
            <div className="image-modal-container">
                <div className="image-modal">
                    <CloseIcon onClick={props.closeImage} />
                    <img src={img} alt="selected" />
                </div>
            </div>
        </Grow>
    )
}
