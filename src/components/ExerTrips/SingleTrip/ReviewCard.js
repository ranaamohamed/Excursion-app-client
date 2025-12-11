import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useTranslation, getLanguage } from "react-multi-lang";
const ReviewCard = ({ review }) => {
  const t = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const toggleReadMore = (e) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  return (
    <Card className="review-card mb-3">
      <Card.Body className="d-flex justify-content-between">
        <div
          className="d-flex justify-content-between align-items-start"
          style={{ flex: 1 }}
        >
          {/* Avatar circle */}
          <div className="avatar">
            {review?.client_name.charAt(0).toUpperCase()}
          </div>
          {/* Review content */}
          <div className="review-content">
            {/* Top Row */}
            <div className="review-header">
              {/* Name  */}
              <h6 className="review-name">{review?.client_name}</h6>
              {/* LEFT → rating + stars */}
              <div className="rating-block">
                <span className="rating-value">{review?.review_rate}</span>
                <span className="stars">
                  {"★".repeat(Math.floor(review?.review_rate))}
                  {"☆".repeat(5 - Math.floor(review?.review_rate))}
                </span>
              </div>

              {/* RIGHT → date */}
              <div className="date">{review.entry_dateStr}</div>
            </div>
          </div>
        </div>
        {/* Review Text */}
        <div className="review-text">
          {expanded ? (
            <>
              {review.review_description}{" "}
              <a href="#" className="read-more" onClick={toggleReadMore}>
                {t("Trips.ReadLess")}
              </a>
            </>
          ) : (
            <>
              {review.review_description.slice(0, 120)}
              {review.review_description.length > 120 && (
                <>
                  ...{" "}
                  <a href="#" className="read-more" onClick={toggleReadMore}>
                    {t("Trips.ReadMore")}
                  </a>
                </>
              )}
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
