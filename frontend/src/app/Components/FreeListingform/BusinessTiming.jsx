"use client";
import React, { useState } from "react";
import "../../Pages/freelistingform/freelistingform.css";

const BusinessTiming = ({ setKey }) => {
  const availableTimes = [
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "1:00",
    "1:30",
    "2:00",
    "2:30",
    "3:00",
    "3:30",
    "4:00",
    "4:30",
    "5:00",
    "5:30",
    "6:00",
    "6:30",
    "7:00",
    "7:30",
    "8:00",
  ];
  const periods = ["AM", "PM"];

  const [timing, setTiming] = useState([
    { day: "Monday", openTime: "", openPeriod: "AM", closeTime: "", closePeriod: "PM", isOpen: false },
    { day: "Tuesday", openTime: "", openPeriod: "AM", closeTime: "", closePeriod: "PM", isOpen: false },
    { day: "Wednesday", openTime: "", openPeriod: "AM", closeTime: "", closePeriod: "PM", isOpen: false },
    { day: "Thursday", openTime: "", openPeriod: "AM", closeTime: "", closePeriod: "PM", isOpen: false },
    { day: "Friday", openTime: "", openPeriod: "AM", closeTime: "", closePeriod: "PM", isOpen: false },
    { day: "Saturday", openTime: "", openPeriod: "AM", closeTime: "", closePeriod: "PM", isOpen: false },
    // { day: "Sunday", openTime: "", openPeriod: "AM", closeTime: "", closePeriod: "PM", isOpen: false },
  ]);

  const [allDaysTime, setAllDaysTime] = useState({
    openTime: "",
    openPeriod: "AM",
    closeTime: "",
    closePeriod: "PM",
  });

  // Toggle individual day selection
  const handleToggleOpen = (index) => {
    const updatedTiming = [...timing];
    updatedTiming[index].isOpen = !updatedTiming[index].isOpen;
    setTiming(updatedTiming);
  };

  // Handle time changes for individual days
  const handleChange = (index, field, value) => {
    const updatedTiming = [...timing];
    updatedTiming[index][field] = value;
    setTiming(updatedTiming);
  };

  // Apply selected time to all selected days
  const applyAllDaysTime = () => {
    const updatedTiming = timing.map((item) => ({
      ...item,
      openTime: item.isOpen ? allDaysTime.openTime : item.openTime,
      openPeriod: item.isOpen ? allDaysTime.openPeriod : item.openPeriod,
      closeTime: item.isOpen ? allDaysTime.closeTime : item.closeTime,
      closePeriod: item.isOpen ? allDaysTime.closePeriod : item.closePeriod,
    }));
    setTiming(updatedTiming);
  };

  // Handle Select All Checkbox
  const handleSelectAll = () => {
    const allSelected = timing.every((item) => item.isOpen);
    const updatedTiming = timing.map((item) => ({
      ...item,
      isOpen: !allSelected,
    }));
    setTiming(updatedTiming);
  };

  // API Integration for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const timingsData = timing.map(item => ({
      day: item.day,
      openTime: item.openTime,
      openPeriod: item.openPeriod,
      closeTime: item.closeTime,
      closePeriod: item.closePeriod,
      isOpen: item.isOpen,
    }));

    try {
      const response = await fetch("http://localhost:5000/api/business/timings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ timings: timingsData }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Timings saved successfully", data);
        setKey("upgrade"); // Proceed to next step
      } else {
        const error = await response.json();
        console.error("Error saving timings", error.message);
      }
    } catch (error) {
      console.error("Error connecting to server", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="business-timing-container">
      <h5 className="section-title">
        Select Business Days & Timing<sup>*</sup>
      </h5>

      {/* Select All Button */}
      <div className="select-all-container">
        <input
          type="checkbox"
          onChange={handleSelectAll}
          checked={timing.every((item) => item.isOpen)}
        />
        <label className="ms-2">Select All Days</label>
      </div>

      {/* Opening and Closing Time for All */}
      <div className="all-days-time mb-3">
        <div className="row">
          <div className="col-md-4 time-selection-div">
            <label>Open Time</label>
            <select
              className="form-control"
              value={allDaysTime.openTime}
              onChange={(e) =>
                setAllDaysTime({ ...allDaysTime, openTime: e.target.value })
              }
            >
              <option value="">Select Time</option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            <select
              className="form-control"
              value={allDaysTime.openPeriod}
              onChange={(e) =>
                setAllDaysTime({ ...allDaysTime, openPeriod: e.target.value })
              }
            >
              {periods.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 time-selection-div">
            <label>Close Time</label>
            <select
              className="form-control"
              value={allDaysTime.closeTime}
              onChange={(e) =>
                setAllDaysTime({ ...allDaysTime, closeTime: e.target.value })
              }
            >
              <option value="">Select Time</option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            <select
              className="form-control"
              value={allDaysTime.closePeriod}
              onChange={(e) =>
                setAllDaysTime({ ...allDaysTime, closePeriod: e.target.value })
              }
            >
              {periods.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Apply to All Button */}
          <button
            type="button"
            className="btn col-md-4 btn-dark apply-time-btn"
            onClick={applyAllDaysTime}
          >
            Apply
          </button>
        </div>
      </div>

      {/* Individual Days Selection */}
      {timing.map((item, index) => (
        <div className="timing-row" key={index}>
          <input
            type="checkbox"
            checked={item.isOpen}
            onChange={() => handleToggleOpen(index)}
          />
          <label className="day-label">{item.day}</label>
          <div className="seprate-day-time">
            {item.isOpen && (
              <>
                <select
                  className="form-control time-input"
                  value={item.openTime}
                  onChange={(e) =>
                    handleChange(index, "openTime", e.target.value)
                  }
                >
                  <option value="">Select Time</option>
                  {availableTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>

                <select
                  className="form-control time-input"
                  value={item.closeTime}
                  onChange={(e) =>
                    handleChange(index, "closeTime", e.target.value)
                  }
                >
                  <option value="">Select Time</option>
                  {availableTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
        </div>
      ))}

      <button type="submit" className="btn btn-primary w-100 py-3">
        Next
      </button>
    </form>
  );
};

export default BusinessTiming;
