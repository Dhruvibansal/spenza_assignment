import React, { useState } from "react";
import { MapContainer, CircleMarker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import worldData from "../utils/worldData";
import resData from "../utils/data";
import HorizontalBar from './HorizontalBar';


function MapComponent() {
  let minLat = -6.1751;
  const maxLat = 55.7558;
  const minLong = 37.6173;
  const maxLong = 139.6917;
  const resultArray = [];

  function getColor(useageData) {
    if (useageData < 300) {
      return "#E57373";
    } else if (useageData > 300 && useageData < 500) {
      return "#F44336";
    } else if (useageData > 500 && useageData < 700) {
      return "#D32F2F";
    } else {
      return "#B71C1C";
    }
  }

  function getRanking(useageData) {
    if (useageData < 300) {
      return '<300';
    } else if (useageData > 300 && useageData < 500) {
      return '300-500';
    } else if (useageData > 500 && useageData < 700) {
      return '500-700';
    } else {
      return '>700';
    }
  }


  resData.forEach((data, index) => {
    const obj = data;
    worldData?.ref_country_codes?.forEach((world, index) => {
      if (data?.region === world?.alpha2) {
        obj["name"] = getRanking(data?.data);
        obj["coordinates"] = [world?.longitude, world?.latitude];
        obj["color"] = getColor(data?.data);
        obj['value']=data?.data
        obj['description']=''
      }
      resultArray.push(obj);
    });
  });



  const centerLat = (minLat + maxLat) / 2;
  const distanceLat = maxLat - minLat;
  const bufferLat = distanceLat * 0.05;
  const centerLong = (minLong + maxLong) / 2;
  const distanceLong = maxLong - minLong;
  const bufferLong = distanceLong * 0.05;
  const [clickData, setClickData] = useState({});

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Data Usages:</h3>
      <MapContainer
        style={{ height: "480px", width: "100%" }}
        zoom={1}
        center={[centerLat, centerLong]}
        bounds={[
          [minLat - bufferLat, minLong - bufferLong],
          [maxLat + bufferLat, maxLong + bufferLong],
        ]}
      >
        <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {resData.map((world) => {
          // console.log("hjhhd", city)
          return (
            <CircleMarker
              key={world?.id}
              center={[world["coordinates"][1], world["coordinates"][0]]}
              radius={10 * Math.log(world["data"] / 100)}
              fillOpacity={0.7}
              stroke={false}
              color={world?.color}
              eventHandlers={{
                click: (e) => {
                  setClickData(world);
                },
              }}
            >
              <Popup>
                <span>
                  {"Region: " +
                    clickData?.region +
                    ": " +
                    "Data Usage: " +
                    clickData?.data}
                </span>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
      <HorizontalBar data={resData}/>
    </div>
  );
}

export default MapComponent;
