import React, {useRef} from 'react';

const FileUploader = ({ onFileSelectSuccess, onFileSelectError }) => {
    const fileInput = useRef(null)

    const handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0];
        onFileSelectSuccess(file);
        // if (file.size > 2048)
        //   onFileSelectError({ error: "File size cannot exceed more than 1MB" });
        // else onFileSelectSuccess(file);
      };

    return (
        <div className="file-uploader">
            <input type="file" onChange={handleFileInput}/>
        </div>
    )
}

export default FileUploader