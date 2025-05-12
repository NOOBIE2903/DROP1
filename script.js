const cursor = document.querySelector('.cursor');

// Move custom cursor with mouse
document.addEventListener('mousemove', e => {
  cursor.style.top = e.clientY + 'px';
  cursor.style.left = e.clientX + 'px';
});

// Blynk token for API
const token = "YoAucXpwL-zcctPdsg9c2GO4ANoZywyv";

// Function to fetch data from Blynk API and update HTML
async function fetchData() {
  try {
    // Fetch data for temperature, humidity, air quality, etc.
    const [t1, t2, h1, h2, g1, g2] = await Promise.all([
      fetch(`https://blynk.cloud/external/api/get?token=${token}&V0`).then(r => r.text()),
      fetch(`https://blynk.cloud/external/api/get?token=${token}&V3`).then(r => r.text()),
      fetch(`https://blynk.cloud/external/api/get?token=${token}&V1`).then(r => r.text()),
      fetch(`https://blynk.cloud/external/api/get?token=${token}&V4`).then(r => r.text()),
      fetch(`https://blynk.cloud/external/api/get?token=${token}&V2`).then(r => r.text()),
      fetch(`https://blynk.cloud/external/api/get?token=${token}&V5`).then(r => r.text())
    ]);

    // Calculate average values
    const avgTemp = ((parseFloat(t1) + parseFloat(t2)) / 2).toFixed(2);
    const avgHum = ((parseFloat(h1) + parseFloat(h2)) / 2).toFixed(2);
    const avgAqi = Math.round((parseInt(g1) + parseInt(g2)) / 2);

    // Update HTML elements with fetched data
    document.getElementById("temp").innerText = avgTemp + " °C";
    document.getElementById("humidity").innerText = avgHum + " %";
    document.getElementById("aqi").innerText = avgAqi;

  } catch (err) {
    console.error("Error fetching data from Blynk:", err);
    document.getElementById("temp").innerText = "Error";
    document.getElementById("humidity").innerText = "Error";
    document.getElementById("aqi").innerText = "Error";
  }
}

// Fetch data every 5 seconds
setInterval(fetchData, 5000);

// Initial data fetch
fetchData();
