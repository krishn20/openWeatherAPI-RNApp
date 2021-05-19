import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, ToastAndroid, Text, View } from "react-native";
import * as Location from "expo-location";
import WeatherInfo from "./components/WeatherInfo";
import axios from "axios";

const WEATHER_API_KEY = "113de8373333a16f92015f4c87c4d7ae";
const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";

export default function App() {
  // --------------------------------------------------------------------------------//

  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState("metric");

  useEffect(() => {
    load();
  }, []);

  // useEffect(() => setErrorMessage("empty"), [errorMessage]);

  // const ShowToast = ({message}) => {
  //   if (message != "empty") {
  //     ToastAndroid.showWithGravityAndOffset(
  //       message,
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM,
  //       25,
  //       50
  //     );
  //     return null;
  //   }
  //   return null;
  // };

  // --------------------------------------------------------------------------------//

  function load() {
    try {
      // let { status } = await Location.requestPermissionsAsync();
      Location.requestForegroundPermissionsAsync().then((status) => {
        if (status !== "granted") {
          setErrorMessage("Access to location is needed to run the app!");
          return;
        } else {
          // Getting the LatLon values using the expo-location library.
          // const location = await Location.getCurrentPositionAsync();
          Location.getCurrentPositionAsync().then((location) => {
            const { latitude, longitude } = location.coords;
            // alert(`Latitude : ${latitude}, Longitude: ${longitude}`);

            // Sending the LatLon value to the OpenWeatherAPI and getting the resultant current weather of that region (in JSON).
            const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;
            // const response = await fetch(weatherUrl);
            // const result = response.json();

            // if (response.ok) {
            //   console.log(result);
            //   setCurrentWeather(result);
            // } else {
            //   setErrorMessage(result.message);
            // }
            // fetch(weatherUrl)
            //   .then((res) => {
            //     console.log(res.json());
            //   })
            //   .catch((error) => {
            //     setErrorMessage(error);
            //   });

            axios.get(weatherUrl).then((res) => {
              console.log(res.data);
            }).catch((error) => {
              console.log(error);
            });

          });
        }
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  // --------------------------------------------------------------------------------//

  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        {/* <ShowToast message={errorMessage} /> */}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}

// --------------------------------------------------------------------------------//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  main: {
    justifyContent: "center",
    flex: 1,
  },
});
