const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
  cursor.style.top = e.clientY + 'px';
  cursor.style.left = e.clientX + 'px';
});

const token = "YoAucXpwL-zcctPdsg9c2GO4ANoZywyv";

async function fetchData() {
  try {
    const [t1, t2, h1, h2, w1, w2, aqi1, aqi2] = await Promise.all([
      fetch(`https://blynk.cloud/external/api/get?token=${token}&V0`).then(r => r.text()), // Temperature
      fetch(`https://blynk.cloud/external/api/get?token=${token}&V3`).then(r => r.text()), // Temperature
      fetch(`https://blynk.cloud/external/api/get?token=${token}&V1`).then(r => r.text()), // Humidity
      fetch(`https://blynk.cloud/external/api/get?token=${token}&V4`).then(r => r.text()), // Humidity
      fetch(`https://blynk.cloud/external/api/get?token=${token}&V5`).then(r => r.text()), // Water Level
      fetch(`https://blynk.cloud/external/api/get?token=${token}&V6`).then(r => r.text()), // Water Level
      fetch(`https://blynk.cloud/external/api/get?token=${token}&V7`).then(r => r.text()), // Air Quality
      fetch(`https://blynk.cloud/external/api/get?token=${token}&V8`).then(r => r.text())  // Air Quality
    ]);

    const avgTemp = ((parseFloat(t1) + parseFloat(t2)) / 2).toFixed(2);
    const avgHum = ((parseFloat(h1) + parseFloat(h2)) / 2).toFixed(2);
    const avgWaterLevel = ((parseFloat(w1) + parseFloat(w2)) / 2).toFixed(2);
    const avgAqi = Math.round((parseInt(aqi1) + parseInt(aqi2)) / 2);

    document.getElementById("temp").innerText = avgTemp + " °C";
    document.getElementById("humidity").innerText = avgHum + " %";
    document.getElementById("water-level").innerText = avgWaterLevel + " cm";
    document.getElementById("air-quality").innerText = avgAqi + " ppm";

  } catch (err) {
    console.error("Error fetching data from Blynk:", err);
    document.getElementById("temp").innerText = "Error";
    document.getElementById("humidity").innerText = "Error";
    document.getElementById("water-level").innerText = "Error";
    document.getElementById("air-quality").innerText = "Error";
  }
}

setInterval(fetchData, 5000);
fetchData();
