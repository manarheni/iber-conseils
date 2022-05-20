import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer(props) {
    return (
        <footer>
            <div className="mycontainer flex between">
                <Link to='/'><img src='/images/logo-footer.png' alt='logo' width='120' /></Link>
                <p><a href="http://maamoun-grissa.netlify.app/" target="_blanc" rel="noreferrer noopener">
                    Created by Anytime & Anywhere</a></p>
                <div className="socials flex between">
                    <a href="https://www.facebook.com/anywhere4" target="_blanc" rel="noreferrer noopener">
                        <img src="/images/socials/facebook.png" alt="Social" />
                    </a>
                    <a href="https://www.linkedin.com/company/anytime-anywhere/" target="_blanc" rel="noreferrer noopener">
                        <img src="/images/socials/linkedin.png" alt="Social" />
                    </a>
                    <a href="https://www.instagram.com/anytime4anywhere/" target="_blanc" rel="noreferrer noopener">
                        <img src="/images/socials/instagram.png" alt="Social" />
                    </a>
                </div>
            </div>
        </footer>
    )
}
