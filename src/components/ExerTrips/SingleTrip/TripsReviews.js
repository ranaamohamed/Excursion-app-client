import React, { useState, useEffect } from "react";
import { useTranslation, getLanguage } from "react-multi-lang";
import LoadingPage from "../../Loader/LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import { GetClientsReviews } from "../../../redux/slices/TripsSlice";
import ReviewCard from "./ReviewCard";
function TripsReviews({ trip_id }) {
  const t = useTranslation();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [ReviewsReq, setReviewsReq] = useState({
    trip_id: trip_id,
    trip_type: 1,
    pageNumber: currentPage,
    pageSize: itemsPerPage,
  });
  const { loading, error, success, Reviews } = useSelector(
    (state) => state.exertrips
  );
  useEffect(() => {
    dispatch(GetClientsReviews(ReviewsReq));
    return () => {};
  }, [trip_id]);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // let req = { pageNumber: page, pageSize: itemsPerPage };
      ReviewsReq["pageNumber"] = page;
      ReviewsReq["itemsPerPage"] = itemsPerPage;
      dispatch(GetClientsReviews(ReviewsReq));
    }
  };
  useEffect(() => {
    const totalPages = Math.ceil(Reviews?.totalPages / itemsPerPage);
    setTotalPages(totalPages);
    return () => {};
  }, [Reviews]);
  return (
    <>
      {Reviews && Reviews?.reviews?.length > 0 ? (
        <div className="reviews-list">
          {Reviews?.reviews?.map((review, idx) => (
            <ReviewCard review={review} key={idx} />
          ))}
          {/* Pagination */}
          <Pagination className="mt-3 justify-content-center">
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i}
                active={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      ) : (
        <div className="centerSection">
          <p>{t("Trips.NoReviews")}</p>
        </div>
      )}
    </>
  );
}

export default TripsReviews;
