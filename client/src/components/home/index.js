import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllImages } from "../../store/actionCreators";
import Config from "../../config";

function Home({ dispatch, images }) {
  const [tag, handleTag] = useState("");
  const [tags,addTags] = useState([]);
  

  useEffect(() => {
    async function fetchImages() {
      await dispatch(getAllImages());
    }
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
            style={{ width: "300px" }}
            src={`${Config.server}/${image.path}`}
          />
          <p>tags</p>
          {image?.tags.map((tag) => (
            <span>{tag}</span>
          ))}
          <form>
            <input
              type="text"
              placeholder="add tag"
              onChange={(e) => handleTag(e.target.value)}
            />
            <button onClick={addTags}>add tag</button>
          </form>
        </div>
      ))}
    </div>
  );
}

Home.propTypes = {
  images: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  images: Object.values(state?.images),
});

export default connect(mapStateToProps)(Home);
