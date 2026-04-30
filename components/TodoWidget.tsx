import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const TodoWidget = () => {
  const [eventTitle, setEventTitle] = useState(null);
  const [eventTime, setEventTime] = useState(null);

  const fetchGoogleToken = async () => {
    const googleToken = await SecureStore.getItem("google_token");

    if (googleToken) {
      return googleToken;
    } else {
      console.error("Error fetching google token");
      return null;
    }
  };

  const fetchCalenderData = async (token) => {
    const currentTime = new Date().toISOString().split(".")[0] + "Z";
    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${currentTime}&maxResults=2`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (!res.ok) {
      return { title: "Tap To Setup", date: "" };
    }

    const data = await res.json();
    console.log(data);

    return {
      title: data.items[1].summary,
      date: new Date(data.items[1].start.dateTime).toLocaleTimeString("en-US"),
    };
  };
  useEffect(() => {
    let isMounted = true;

    const fetchTasks = async () => {
      try {
        const token = await fetchGoogleToken();
        const eventInfo = await fetchCalenderData(token);

        if (isMounted) {
          console.log(eventInfo);
          setEventTitle(eventInfo.title);
          setEventTime(eventInfo.date);
        }
      } catch (error) {
        console.error("Error fetching calender data");
      }
    };

    fetchTasks();

    const intervalId = setInterval(fetchTasks, 300000); // every 5 mins

    return () => {
      isMounted = false
      clearInterval(intervalId)
    }
  }, []);
  return (
    <View className="p-4">
      <View className="w-full h-24  border-l-4 border-green-400 p-3">
        <Text className="font-bold text-xl text-white">{eventTitle}</Text>
        <Text className="text-gray-200 text-lg">{eventTime}</Text>
      </View>
    </View>
  );
};

export default TodoWidget;
