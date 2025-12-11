import React from "react";
import { useTranslation } from "react-multi-lang";
import { Card, Button } from "react-bootstrap";
import "./DestinationCard.scss";
function DestinationCard({ dest }) {
  const t = useTranslation();
  return (
    <Card className="text-center border-0 circle-card">
      <div className="image-wrapper mx-auto">
        <img
          src={
            dest.img_path == null || dest.img_path == ""
              ? "/images/no-img.jpg"
              : dest.img_path
          }
          alt={dest.dest_name}
          className="circle-image"
        />

        {/* Overlay */}
        <div className="image-overlay">
          {/* <span className="overlay-text">View</span> */}
        </div>
      </div>
      {/* <Card.Img
        variant="top"
        src={
          dest.img_path == null || dest.img_path == ""
            ? "/images/no-img.jpg"
            : dest.img_path
        }
        alt={dest.dest_name}
        className="circle-image mx-auto"
      /> */}
      <Card.Body>
        <Card.Title>{dest.dest_name}</Card.Title>
      </Card.Body>
    </Card>
    // <Card className="custom-card text-white rounded-4">
    //   <Card.Img
    //     src={
    //       dest.img_path == null || dest.img_path == ""
    //         ? "/images/no-img.jpg"
    //         : dest.img_path
    //     }
    //     alt={dest.dest_name}
    //   />
    //   <Card.ImgOverlay className="overlay-content d-flex align-items-end">
    //     <div className="card-text-box">
    //       <h5 className="card-title">{dest.dest_name}</h5>
    //     </div>
    //   </Card.ImgOverlay>
    // </Card>
    // <Card>
    //   <Card.Img variant="top" src={dest.default_img} />
    //   <Card.Body>
    //     <Card.Title>{dest.dest_name}</Card.Title>
    //   </Card.Body>
    // </Card>
  );
}

export default DestinationCard;
