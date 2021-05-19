import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../Utils/index";

const { PRIMARY_COLOR, SECONDARY_COLOR } = colors;

export default function WeatherInfo(props) {
//   const {
//     main: { temp },
//     weather: [details],
//     name,
//   } = currentWeather;

//   const { icon, main, description } = details;
  const currentWeather = {};
  console.log(props)
  console.log(currentWeather)
  const iconUrl = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`;
  
  return (
    <View style={styles.weatherInfo}>
      <Text>{currentWeather.name}</Text>
      <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
      <Text style={styles.textPrimary}>{currentWeather.main.temp}°</Text>
      <Text style={styles.weatherDescription}>{currentWeather.weather[0].description}</Text>
      <Text style={styles.textSecondary}>{currentWeather.weather[0].main}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherInfo: {
    alignItems: "center",
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  weatherDescription: {
    textTransform: "capitalize",
  },
  textPrimary: {
    fontSize: 40,
    color: PRIMARY_COLOR,
  },
  textSecondary: {
    fontSize: 20,
    color: SECONDARY_COLOR,
    fontWeight: "500",
    marginTop: 10,
  },
});
