import React, { useState, useEffect } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useTranslation, getLanguage } from "react-multi-lang";
import { GetDestinations } from "../../../redux/slices/destinationSlice";
import { useDispatch, useSelector } from "react-redux";
export default function SearchPlace({ setSelectedDest }) {
  const t = useTranslation();
  const dispatch = useDispatch();
  const { loading, error, success, DestinationList } = useSelector(
    (state) => state.destinations
  );
  const [Places, setPlaces] = useState([]);
  const [placeId, setPlaceId] = useState(0);
  // const Places = [
  //   {
  //     id: 0,
  //     name: "Safaga",
  //   },
  //   {
  //     id: 1,
  //     name: "Red Sea",
  //   },
  //   {
  //     id: 2,
  //     name: "Cairo, Egypt",
  //   },
  //   {
  //     id: 3,
  //     name: "Marsa Alam",
  //   },
  //   {
  //     id: 4,
  //     name: "Hurghada",
  //   },
  // ];
  useEffect(() => {
    let formData = {
      country_code: "",
      lang_code: localStorage.getItem("lang") || getLanguage(),
      currency_code: "",
      leaf: true,
    };
    dispatch(GetDestinations(formData));
    return () => {};
  }, [dispatch]);
  useEffect(() => {
    if (DestinationList != null && DestinationList.length > 0) {
      const result = DestinationList.map((item) => ({
        id: item.destination_id,
        name: item.dest_name,
      }));

      setPlaces(result);
    }

    return () => {};
  }, [DestinationList]);

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
    setPlaceId(item?.id);
    setSelectedDest(item?.id);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };
  console.log("DestinationList ", Places);
  return (
    <>
      {DestinationList !== null && DestinationList.length > 0 ? (
        <ReactSearchAutocomplete
          items={Places}
          // items={DestinationList}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          // autoFocus
          formatResult={formatResult}
          //placeholder={t("Navbar.Destinations")}
          showIcon={false}
          className="pick_input"
          //fuseOptions={{ keys: ["dest_name"] }}
        />
      ) : (
        <></>
      )}
    </>
  );
}
