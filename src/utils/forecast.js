const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ba398bb06f9db3108597e7b7f786be8e&query=${lat},${long}&units=m`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const data = body;
      callback(undefined, {
        description: data.current.weather_descriptions[0],
        temperature: data.current.temperature,
        humidity: data.current.humidity,
        time: data.current.observation_time,
        dayType: data.current.is_day,
      });
    }
  });
};

module.exports = forecast;
