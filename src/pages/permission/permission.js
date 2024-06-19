import React from 'react';
import updateUserActivity from '../../utils/UserActivity';
const permission = () => {
    localStorage.setItem('log', new Date());
    setTimeout(() => {
        updateUserActivity("drive-permission");
    }, 5000);
    return (
        <div className=" d-flex align-items-center justify-content-center  w-100 p-2">
            UpComming...
        </div>
    );
};

export default permission;
