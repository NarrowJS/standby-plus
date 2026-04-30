import { View, Text } from 'react-native'
import React from 'react'
import { Canvas, Rect, RoundedRect, LinearGradient, vec } from "@shopify/react-native-skia";
import { useState } from 'react';

const ProgressBar = ({progress, duration}) => {


  let barWidth = 350

    if (progress != null) {
      barWidth = (( progress / duration ) * 350)
    }
   

  return (
    <View className='w-[350px] h-1 justify-center bg-gray-900 rounded-full'>
    <Canvas style={{ flex: 1 }}>
      <RoundedRect x={0} y={0} width={barWidth} height={3} r={25} color="lightblue">
        <LinearGradient
          start={vec(0, 0)}
          end={vec(100, 150)}
          colors={["#00ff87", "#60efff"]}
        />
      </RoundedRect>
    </Canvas>
    </View>
  )
}

export default ProgressBar