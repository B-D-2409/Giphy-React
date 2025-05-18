import { useState } from "react"
import styles from "./Upload.module.css";
export default function Upload() {
    const [upload, setUpload] = useState([]);


    const uploadGifs = (e) => {
        const files = Array.from(e.target.files);
        console.log(`Selected files: ${files}`);
        setUpload(files)
    }

    const submitListener = (e) => {
        e.preventDefault();

        if (upload.length === 0) {
            return alert(`Please select at least one gif`)
        }

        console.log(`Uploading files: ${upload}`);

        setTimeout(() => {
            alert(`Files uploaded successfully!`);
            setUpload([])
        }, 1000);

    }

    return (
        <div>

            <div className={styles[`upload-container`]}>
                <form
                    className={styles[`upload-form`]}
                    encType="multipart/form-data"
                    onSubmit={submitListener}
                >
                    <h3>Giphy Upload</h3>
                    <div className={styles[`upload-button-container`]}>
                        <p>Upload a GIF, MP4, MOV, or WebM</p>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/gif,video/mp4,video/mov,video/quicktime,video/webm,youtube,vimeo"
                            multiple
                            onChange={uploadGifs}
                        />
                        <button type="submit" className={styles[`upload-button`]}>Submit</button>
                    </div>
                </form>

                <div id={styles[`uploaded-gifs-container`]}>
                    {upload.length > 0 ? (
                        <>
                            <ul>
                                {upload.map((file, index) => (
                                    <li key={index}>{file.name}</li>
                                ))}
                            </ul>
                            <div className={styles[`uploaded-files-preview`]}>
                                {upload.map((file, index) => {
                                    const fileURL = URL.createObjectURL(file);

                                    if (file.type.startsWith('image/')) {
                                        return (
                                            <div key={index} className={styles[`preview-item`]}>
                                                <img
                                                    src={fileURL}
                                                    alt={file.name}
                                                    style={{ maxWidth: '200px', marginTop: '10px' }}
                                                />
                                            </div>
                                        );
                                    } else if (file.type.startsWith('video/')) {
                                        return (
                                            <div key={index} className={styles[`preview-item`]}>
                                                <video
                                                    controls
                                                    style={{ maxWidth: '200px', marginTop: '10px' }}
                                                >
                                                    <source src={fileURL} type={file.type} />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                            </div>
                        </>
                    ) : (
                        <p>No files selected yet.</p>
                    )}
                </div>
            </div>
        </div>
    );


}