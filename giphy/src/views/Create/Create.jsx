import { useState } from 'react';
import './Create.css';
export default function Create() {
    const [create, setCreate] = useState([]);

    const createGifs = (e) => {
        const files = Array.from(e.target.files).map((file) => ({
            file,
            visibility: 'public',
            tags: '',
            source: '',
            collection: ''
        }));

        setCreate(files);
    };

    const submitListener = (e) => {
        e.preventDefault();

        if (create.length === 0) {
            return alert(`Please select at least one file`);
        };

        create.forEach((item, i) => {
            console.log(`Uploading: ${item.file.name}`);
            console.log(`{
            Visibility: ${item.visibility},
            Tags: ${item.tags},
            Source: ${item.source},
            Collection: ${item.collection}
        }`);



        })

        setTimeout(() => {
            alert(`Files created successfully!`);
            setCreate([])
        }, 1000);


    }
    return (
        <div className='createGif'>
            <form
                className='create-form'
                encType='multipart/form-data'
                onSubmit={submitListener}
            >
                <h1>Create Gif</h1>
                <div className='create-container'>
                    <p>Create a GIF, MP4, MOV, or WebM</p>
                    <input
                        id='file-create'
                        type='file'
                        accept="image/gif,video/mp4,video/mov,video/quicktime,video/webm,youtube,vimeo"
                        multiple
                        onChange={createGifs}
                    />
                    <button type='submit' className='create-button'>Submit</button>
                </div>
            </form>
            <div id='created-files-container'>
                {create.length > 0 ? (
                    <>
                        {create.map((item, index) => {
                            const fileURL = URL.createObjectURL(item.file);
                            const fileType = item.file.type.startsWith("video/")
                                ? "Video"
                                : item.file.type.includes("gif")
                                    ? "GIF"
                                    : "Sticker";

                            const updateField = (field, value) => {
                                const updated = [...create];
                                updated[index][field] = value;
                                setCreate(updated);
                            };

                            return (
                                <div key={index} className="upload-card">
                                    <h4 className="file-title">{item.file.name}</h4>

                                    <div className="media-preview">
                                        {fileType === "Video" ? (
                                            <video controls src={fileURL}></video>
                                        ) : (
                                            <img src={fileURL} alt={item.file.name} />
                                        )}
                                        <div className="file-label">{fileType}</div>
                                    </div>

                                    <div className="meta-section">
                                        <div className="visibility-toggle">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`visibility-${index}`}
                                                    value="public"
                                                    checked={item.visibility === "public"}
                                                    onChange={() => updateField("visibility", "public")}
                                                />
                                                Public
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`visibility-${index}`}
                                                    value="private"
                                                    checked={item.visibility === "private"}
                                                    onChange={() => updateField("visibility", "private")}
                                                />
                                                Private
                                            </label>
                                        </div>

                                        <div className="tag-section">
                                            <input
                                                type="text"
                                                placeholder="Add tags"
                                                value={item.tags}
                                                onChange={(e) => updateField("tags", e.target.value)}
                                            />
                                            <button type="button" onClick={() => updateField("tags", item.tags + ',')}>+</button>
                                        </div>

                                        <input
                                            type="text"
                                            className="source-input"
                                            placeholder="Add a source URL"
                                            value={item.source}
                                            onChange={(e) => updateField("source", e.target.value)}
                                        />

                                        <div className="collection-picker">
                                            <select
                                                value={item.collection}
                                                onChange={(e) => updateField("collection", e.target.value)}
                                            >
                                                <option value="">Choose a collection</option>
                                                <option value="Funny">Funny</option>
                                                <option value="Animals">Animals</option>
                                                <option value="Reactions">Reactions</option>
                                            </select>
                                            <button
                                                type='button'
                                                className='upload-button'
                                                onClick={submitListener}
                                            >
                                                Upload
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                ) : (
                    <p className='no-files'>No files selected yet.</p>
                )}

            </div>
        </div>
    )
}