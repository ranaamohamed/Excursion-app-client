import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { useTranslation, getLanguage } from "react-multi-lang";

function TripGallery({ images }) {
  const t = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const visibleImages = images?.slice(0, 5);
  // 👇 define max heights
  const bigImageStyle = { height: "400px", objectFit: "cover", width: "100%" };
  const smallImageStyle = {
    height: "195px",
    objectFit: "cover",
    width: "100%",
  };
  const mobileImageStyle = {
    height: "160px",
    objectFit: "cover",
    width: "100%",
  };
  return images && images.length > 0 ? (
    <div>
      {/* Desktop / tablet layout */}
      <Row className="d-none d-md-flex g-2">
        {/* Big image left */}
        <Col md={8}>
          <div
            className="position-relative"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setIsOpen(true);
              setPhotoIndex(0);
            }}
          >
            <img
              src={images.filter((f) => f.is_default == true)[0]?.img_path}
              alt="Main"
              className="img-fluid rounded"
              style={bigImageStyle}
            />
          </div>
        </Col>

        {/* Right grid */}
        <Col md={4}>
          <Row className="g-2">
            {visibleImages.slice(1, 5).map((img, i) => {
              const index = i + 1;
              const isLast = index === 4 && images.length > 5;

              return (
                <Col xs={6} key={index}>
                  <div
                    className="position-relative"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setIsOpen(true);
                      setPhotoIndex(index);
                    }}
                  >
                    <img
                      src={img.img_path}
                      alt={`travel_ ${img.img_name}`}
                      className="img-fluid rounded"
                      style={smallImageStyle}
                    />
                    {isLast && (
                      <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 text-white fw-bold rounded">
                        +{images.length - 4}
                      </div>
                    )}
                  </div>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>

      {/* Mobile */}
      <Row className="d-flex d-md-none g-2">
        {visibleImages.map((img, index) => {
          const isLast = index === 4 && images.length > 5;
          return (
            <Col xs={6} key={index}>
              <div
                className="position-relative"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsOpen(true);
                  setPhotoIndex(index);
                }}
              >
                <img
                  src={img.img_path}
                  alt={`travel_ ${img.img_name}`}
                  className="img-fluid rounded"
                  style={mobileImageStyle}
                />
                {isLast && (
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 text-white fw-bold rounded">
                    +{images.length - 4}
                  </div>
                )}
              </div>
            </Col>
          );
        })}
      </Row>

      {/* Lightbox */}
      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex].img_path}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </div>
  ) : (
    <div>{t("Trips.NoImages")}</div>
  );
}

export default TripGallery;
