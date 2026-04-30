import { View, Text } from 'react-native'
import React, {ReactNode} from 'react'
import Music from './Music';
import Weather from './Weather';
import { useState } from 'react';
import TodoWidget from './TodoWidget';



interface selectorProps {
  type: String;
}



const WidgetSelector = (props : selectorProps) => {
  switch (props.type) {
    case "item-2":
      return <Music/>
    case "item-1":
      return <Weather/>
    default:
      return <TodoWidget/>
  }
}

const WidgetSmall = ({type} : selectorProps) => {
  

  return (
      <View className='bg-zinc-800 h-full w-full rounded-2xl opacity-90 border-zinc-400 border-2' >
          <WidgetSelector type={type}></WidgetSelector>
       
        
      </View>
  )
}

export default WidgetSmall