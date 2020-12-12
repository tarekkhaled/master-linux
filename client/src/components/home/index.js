import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllImages, AddTagToImage,searchImage } from "../../store/actionCreators";
import Config from "../../config";

function Home({ dispatch, images }) {
  const [tag, handleTag] = useState("");
  const [searchQuery, handleSearch] = useState("");

  useEffect(() => {
    async function fetchImages() {
      await dispatch(getAllImages());
    }
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTagSubmit = (e, imageId) => {
    e.preventDefault();
    dispatch(AddTagToImage(imageId, [tag]));
  };

  const submitSearching = () => {
    dispatch(searchImage(searchQuery));
  };

  return (
    <>
      <div style={{textAlign:'center',marginTop:'20px'}}>
        <input
          type="text"
          placeholder="search image with tag"
          onChange={(e) => handleSearch(e.target.value)}
        />
      <button onClick={submitSearching}>search</button>
      </div>


      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
        }}
      >
        {images.map((image) => (
          <div style={{ margin: "10px" }}>
            <img
              alt="bank-shown"
              style={{ width: "300px" }}
              src={`${Config.server}/${image.path}`}
            />
            <p>tags</p>
            {image?.tags.map((tag) => (
              <p style={{ width: "100%" }}>{tag}</p>
            ))}
            <form>
              <input
                type="text"
                placeholder="add tag"
                onChange={(e) => handleTag(e.target.value)}
              />
              <button onClick={(e) => handleTagSubmit(e, image._id)}>
                add tag
              </button>
            </form>
          </div>
        ))}
      </div>
    </>
  );
}

Home.propTypes = {
  images: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  images: Object.values(state?.images),
});

export default connect(mapStateToProps)(Home);
