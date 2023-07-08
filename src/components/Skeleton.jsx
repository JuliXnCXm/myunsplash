import React from "react";
import "../styles/photos.css"
const Skeleton = () => {
    return (
        <>
            {Array.from(
            Array.from(Array(20 + 1).keys())
                .slice(1)
            ).map((index) => {
            return (
              <div key={index} className="container--image skeleton">
                <img alt="" className="skeleton" style={{"width": "auto"}}/>
                <div className="infoContainer skeleton skeleton-text">
                  <span className="skeleton"></span>
                </div>
              </div>
            );
            })}
        </>
    );
};

export default Skeleton;
