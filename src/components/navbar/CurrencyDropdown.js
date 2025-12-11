import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FaMoneyBillWave } from "react-icons/fa";
import { Get_Currencies } from "../../redux/slices/GlobalSettingSlice";
import { useDispatch, useSelector } from "react-redux";

import "./NavbarDropdown.scss";
function CurrencyDropdown() {
  const dispatch = useDispatch();
  const { Currencies } = useSelector((state) => state.GlobalSetting);
  const [currentCurr, setCurrentCurr] = useState(
    localStorage.getItem("currency_symb") || "€"
  );

  const [isLoading, setIsLoading] = useState(false);

  const changeCurrency = (curr, symbol) => {
    if (symbol !== currentCurr && !isLoading) {
      setCurrentCurr(symbol); // Update state
      localStorage.setItem("currency", curr); // Persist in localStorage
      localStorage.setItem("currency_symb", symbol);
      window.location.reload();
    }
  };
  useEffect(() => {
    dispatch(Get_Currencies());
    return () => {};
  }, []);
  return (
    <Dropdown className="navbar-dropdown">
      {/* Dropdown toggle button (disabled if loading) */}
      <Dropdown.Toggle id="dropdown-basic" disabled={isLoading}>
        <div className="language-toggle-content" style={{ fontSize: "20px" }}>
          {currentCurr}
          {/* <FaMoneyBillWave className="globe-icon" /> */}
        </div>
      </Dropdown.Toggle>

      {/* Dropdown menu aligned based on current text direction */}
      <Dropdown.Menu>
        {Currencies &&
          Currencies?.map((curr, index) => (
            <Dropdown.Item
              key={index}
              href="#"
              className={`lang-item ${
                currentCurr === curr.currency_symbol ? "active" : ""
              }`}
              onClick={() =>
                changeCurrency(curr.currency_code, curr.currency_symbol)
              }
              disabled={currentCurr === curr.currency_symbol || isLoading}
            >
              <strong>
                {curr.currency_code} - {curr.currency_symbol}
              </strong>
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CurrencyDropdown;
