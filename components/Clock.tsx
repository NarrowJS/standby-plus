import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'


const Clock = () => {

    //const [timeHours, setTimeHours] = useState(new Date().getHours());
    //const [timeMins, setTimeMins] = useState(new Date().getMinutes());

    var timeHours = 0;
    var timeMins = 0;
    const [time, setTime] = useState("");
    const [timeHour, setTimeHour] = useState("");

    

    const updateTime = () => {
      
        //setTimeHours( prevTimeHours => new Date().getHours());
        //setTimeMins(new Date().getMinutes());
        timeHours = new Date().getHours();
        timeMins = new Date().getMinutes();
        setTimeHour(timeHours.toString().padStart(2, '0'));
        setTime(timeMins.toString().padStart(2, '0'))
      
    }

    useEffect(() => {
      updateTime();
      const intervalId = setInterval(updateTime, 1000);

      return() => {
        clearInterval(intervalId);
      }
    }, [])

  return (
    <View>
    <Text className='text-8xl text-white'>{timeHour}</Text>
    <Text className='text-8xl text-white'>{time}</Text>
    </View>
  )
}

export default Clock