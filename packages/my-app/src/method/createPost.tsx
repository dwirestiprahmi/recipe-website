import React from 'react';

const createPost = async (e: any, data: any, url:any) => {
    e.preventDefault();
    try {
        const bodyString = {
            data
        };
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyString)
        });

        console.log(response);
    } catch (err: any) {
        console.error(err.message);
    }

    return <div></div>;
};

export default createPost;
