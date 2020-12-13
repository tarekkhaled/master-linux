import { useState } from "react";
import { uploadImage } from "../../store/actionCreators";
import { connect } from "react-redux";

function UploadImageComponent({ dispatch }) {
  const [file, setFile] = useState();
  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("NEW_BANK_IMAGE", file);
    dispatch(uploadImage(data)).then(({ payload }) => {
      window.location.reload();
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Upload Image</h3>
      <div className="form-group">
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          name="NEW_BANK_IMAGE"
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-dark btn-lg btn-block">
        upload
      </button>
    </form>
  );
}

export default connect()(UploadImageComponent);
