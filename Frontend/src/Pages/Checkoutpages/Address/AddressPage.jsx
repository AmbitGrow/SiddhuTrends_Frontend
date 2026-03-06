import React, { useState, useEffect } from "react";
import "./AddressPage.css";
import StepProgress from "../StepProgress";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../../context/CheckoutContext";

function AddressPage() {
  const navigate = useNavigate();
  const { setAddress } = useCheckout();

  const [formData, setFormData] = useState({
    country: "India",
    firstName: "",
    lastName: "",
    phone: "",
    addressLine: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    saveAddress: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;

    const updatedValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: updatedValue,
    });

    // remove error when user edits input
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    // PINCODE AUTO DETECT
    if (name === "pincode" && value.length === 6) {
      try {
        const res = await fetch(
          `https://api.postalpincode.in/pincode/${value}`,
        );

        const data = await res.json();

        if (data[0].Status === "Success") {
          const postOffice = data[0].PostOffice[0];

          setFormData((prev) => ({
            ...prev,
            city: postOffice.District,
            state: postOffice.State,
          }));
        } else {
          alert("Invalid Pincode");
        }
      } catch (error) {
        console.error("Pincode API error", error);
      }
    }
  };
  const handleAutoFill = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`,
          );

          const data = await res.json();
          const address = data.address || {};

          const addressLine =
            address.house_number && address.road
              ? `${address.house_number}, ${address.road}`
              : address.road || address.neighbourhood || address.suburb || "";

          const area =
            address.suburb ||
            address.neighbourhood ||
            address.residential ||
            address.city_district ||
            "";

          const city =
            address.city_district ||
            address.state_district ||
            address.county ||
            address.city ||
            address.town ||
            address.village ||
            "";

          const state = address.state || "";

          const pincode = address.postcode || "";

          setFormData((prev) => ({
            ...prev,
            addressLine,
            area,
            city,
            state,
            pincode,
          }));
        } catch (error) {
          console.log("Location fetch error", error);
        }
      },
      () => {
        alert("Location permission denied");
      },
    );
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!/^[A-Za-z ]+$/.test(formData.firstName)) {
      newErrors.firstName = "Only letters allowed";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "Name must be at least 2 characters";
    }

    if (formData.lastName && !/^[A-Za-z ]+$/.test(formData.lastName)) {
      newErrors.lastName = "Only letters allowed";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter valid Indian mobile number";
    }

    if (!formData.addressLine.trim()) {
      newErrors.addressLine = "House / Building required";
    } else if (formData.addressLine.length < 5) {
      newErrors.addressLine = "Address too short";
    }

    if (!formData.area.trim()) {
      newErrors.area = "Area / Street required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City required";
    } else if (!/^[A-Za-z ]+$/.test(formData.city)) {
      newErrors.city = "City must contain letters only";
    }

    if (!formData.state.trim()) {
      newErrors.state = "Please select a state";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode required";
    } else if (!/^[1-9][0-9]{5}$/.test(formData.pincode)) {
      newErrors.pincode = "Enter valid 6 digit pincode";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Continue Button
  const handleContinue = () => {
    if (!validate()) return;

    setAddress(formData);

    if (formData.saveAddress) {
      const existingAddresses =
        JSON.parse(localStorage.getItem("savedAddresses")) || [];

      const newAddress = {
        id: Date.now(),
        ...formData,
      };

      existingAddresses.push(newAddress);

      localStorage.setItem("savedAddresses", JSON.stringify(existingAddresses));
    }

    navigate("/checkout/summary");
  };
  const [savedAddresses, setSavedAddresses] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("savedAddresses")) || [];
    setSavedAddresses(data);
  }, []);
  return (
    <>
      <div className="address-page">
        <div className="attribute-title">
          <p>Delivery Details</p>
        </div>
        <div className="autofill-box">
          <p>Save time. Autofill your current location.</p>
          <button onClick={handleAutoFill}>Autofill</button>
        </div>
        <div className="input-details">
          <div className="row1">
            <div
              className={`form-input floating ${formData.country ? "active" : ""}`}
            >
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="India">India</option>
              </select>

              <label>Country / Region</label>
            </div>
          </div>
          <div className="row2">
            <div
              className={`form-input ${errors.firstName ? "error-border" : ""}`}
            >
              <input
                name="firstName"
                placeholder="First name"
                onChange={handleChange}
              />
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}
            </div>
            <div className="form-input">
              <input
                name="lastName"
                placeholder="Last name"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row3">
            <div className={`form-input ${errors.phone ? "error-border" : ""}`}>
              <input
                name="phone"
                placeholder="Phone number"
                maxLength="10"
                onChange={handleChange}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
          </div>
          <div className="row4">
            <div
              className={`form-input ${errors.addressLine ? "error-border" : ""}`}
            >
              <input
                name="addressLine"
                placeholder="Flat, House no., Building, company , Apartment"
                onChange={handleChange}
                value={formData.addressLine}
              />
              {errors.addressLine && (
                <span className="error">{errors.addressLine}</span>
              )}
            </div>
          </div>
          <div className="row5">
            <div className={`form-input ${errors.area ? "error-border" : ""}`}>
              <input
                name="area"
                placeholder="Area, Street , Sector , Village"
                onChange={handleChange}
                value={formData.area}
              />
              {errors.area && <span className="error">{errors.area}</span>}
            </div>
            <div className="form-input">
              <input
                name="landmark"
                placeholder="Landmark"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row6">
            <div
              className={`form-input ${errors.pincode ? "error-border" : ""}`}
            >
              <input
                name="pincode"
                placeholder="Pincode"
                minLength="6"
                onChange={handleChange}
                value={formData.pincode}
              />
              {errors.pincode && (
                <span className="error">{errors.pincode}</span>
              )}
            </div>
            <div className={`form-input ${errors.city ? "error-border" : ""}`}>
              {" "}
              <input
                name="city"
                placeholder="City"
                onChange={handleChange}
                value={formData.city}
              />
              {errors.city && <span className="error">{errors.city}</span>}
            </div>
            <div
              className={`form-input floating ${errors.state ? "error-border" : ""}`}
            >
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden></option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Kerala">Kerala</option>
                <option value="Karnataka">Karnataka</option>
              </select>

              <label>State</label>

              {errors.state && <span className="error">{errors.state}</span>}
            </div>
          </div>

          <div className="save-address">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                name="saveAddress"
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              <p>Save this address for next time</p>
            </label>
          </div>

          <div className="continue-btn">
            <button className="primary-btn" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddressPage;
