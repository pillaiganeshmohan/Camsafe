import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Historyhenader.js";
import Footer from "./Footer";
import "./History.css";
import image from "../assets/history.png";
import bg from "../assets/Group17.png";

function History() {
  const handleDetailView = (subId) => {
    // Implement your logic for detailed view here
  };

  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // Make a GET request when the component mounts
    axios.get('http://127.0.0.1:8000/api/subject-history/')
      .then(response => {
        // Update the state with the fetched data
        setHistoryData(response.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div>
      <Header />
      <div id="content">
        <div class="maincontent">
          <div>
            <h1 class="title" id="11">
              History
            </h1>
            <p class="para">
              Here's a list of criminals records that has been found in our
              database
            </p>
          </div>

          <img id="history" src={image} />
        </div>
        <div class="container">
          <table id="12" class="rwd-table">
            <tbody id="13">
              <tr id="14">
                <th>Subject ID</th>
                <th>Name</th>
                <th>Camera Location</th>
                <th>Date</th>
                <th>Day</th>
                <th>Footage ID</th>
                <th>Camera ID</th>
                <th>Detailed View</th>
              </tr>
              {historyData.map((item, index) => (
                <tr key={index}>
                  <td>{item.SH_subject_id}</td>
                  <td>{item.SH_subject_name}</td>
                  <td>{item.SH_camera_location_name}</td>
                  <td>{item.SH_date}</td>
                  <td>{item.SH_day}</td>
                  <td>{item.SH_footage_id}</td>
                  <td>{item.SH_camera_id}</td>
                  <td>
                    <button
                      onClick={() => handleDetailView(item.SH_subject_id)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default History;
