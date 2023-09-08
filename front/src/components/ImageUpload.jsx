import React, { useState } from "react";

const ImageUpload = (props) => {
  const [previewImage, setPreviewImage] = useState(null);

  const onChange = (e) => {
    let file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = handleReaderLoaded;
      reader.readAsDataURL(file);
    }
  };

  const handleReaderLoaded = (e) => {
    let dataURL = e.target.result;
    setPreviewImage(dataURL);
    props.setter(dataURL);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    onChange({ target: { files: [file] } });
  };

  const clearImage = () => {
    setPreviewImage(null);
    props.setter("");
    document.getElementById("file").value = "";
  };

  return (
    <div>
      <input
        type="file"
        name="image"
        id="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => onChange(e)}
        style={{ display: "none" }}
      />
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          border: "2px dashed #ccc",
          borderRadius: "4px",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          position: "relative",
        }}
      >
        {previewImage ? (
          <div>
            <img
              src={previewImage}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                marginBottom: "10px",
              }}
            />
            <button
              onClick={clearImage}
              className="text-red-500 hover:text-red-700"
            >
              Annuler
            </button>
          </div>
        ) : (
          <p>
            Faites glisser et déposez une image ici ou cliquez pour choisir un
            fichier.
          </p>
        )}
        <label htmlFor="file" style={{ cursor: "pointer" }}>
          <b>Parcourir</b>
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
