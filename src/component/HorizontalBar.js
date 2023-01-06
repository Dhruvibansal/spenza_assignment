import HSBar from "react-horizontal-stacked-bar-chart";

function HorizontalBar({ data }) {
  const showData = [...data];
  const temp = [];
  data.forEach((data, index) => {
    const obj = data;
    obj["count"] = 1;
    temp.forEach((temp) => {
      if (data?.color == temp?.color) {
        console.log(data.value + temp.value);
        obj["value"] = obj["count"] + 1;
        obj["count"] = obj["count"] + 1;
        delete showData[index];
      }
    });
    temp.push(obj);
  });
  showData.forEach((data, index) => {
    let count = 1;
    temp.forEach((temp) => {
      if (data?.color == temp?.color) {
        data["value"] = temp["count"];
        count = temp["count"];
      }
    });
    let toFix = ((count * 100) / 7).toFixed(2);
    data["description"] = `${toFix}%`;
  });

  console.log(temp, showData);
  let sortedData = showData.slice(0);
  sortedData.sort(function (a, b) {
    return a.value - b.value;
  });

  return (
    <div style={{ width: "80%", marginLeft: "10%" }}>
      <HSBar
        height={50}
        showTextDown
        // outlineWidth={0.5}
        // outlineColor="black"
        id="new_id"
        fontColor="rgb(50,20,100)"
        data={sortedData}
      />
    </div>
  );
}

export default HorizontalBar;
