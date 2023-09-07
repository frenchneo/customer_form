const ImageUpload = (props) => {
  const onChange = (e) => {
    let file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = handleReaderLoaded;
      reader.readAsBinaryString(file);
    }
  };

  const handleReaderLoaded = (e) => {
    let binaryString = e.target.result;
    props.setter("data:image/png;base64," + btoa(binaryString));
  };

  return (
    <input
      type="file"
      name="image"
      id="file"
      accept=".jpg, .jpeg, .png"
      onChange={(e) => onChange(e)}
    />
  );
};

export default ImageUpload;
