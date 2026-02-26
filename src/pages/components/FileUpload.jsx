import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FileUpload = ({insertInFile}) => {
    
    const handleFileChange = (event) => {
        insertInFile(event.target.files[0])
    };


    return (
        <div>
            <div>
                <input type="file" onChange={handleFileChange} accept="image/*" />
            </div>
        </div>
    );
};

export default FileUpload;
