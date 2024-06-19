import React, { useEffect } from 'react';
import './loader.css';
import { COOKIES_TOKEN } from './redux/helper/urlHelper';

const Loader = () => {

    useEffect(() => {
        let host = window.location.host;
        let subdomainVal = host.split('/verify');
        if (COOKIES_TOKEN) {
            setTimeout(() => {
                window.location.reload(`https://${subdomainVal[0]}`);
            }, 5000);
        }
    }, []);

    return (
        <div style={styles.overlay} className="d-flex align-items-center justify-content-center">
            <svg
                width="300px"
                height="200px"
                viewBox="0 0 187.3 93.7"
                preserveAspectRatio="xMidYMid meet"
                style={styles.svg}
            >
                <path
                    stroke="#000"
                    id="outline"
                    fill="none"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
                />
                <path
                    id="outline-bg"
                    opacity="0.05"
                    fill="none"
                    stroke="#ededed"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
                />
            </svg>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        marginLeft: '10rem',
        marginTop: '5rem',
    },
    svg: {
        transform: 'translate(-50%, -50%) matrix(1, 0, 0, 1, 0, 0)',
    },
};

export default Loader;
