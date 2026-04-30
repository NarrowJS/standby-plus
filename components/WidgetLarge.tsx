import { View, Text } from 'react-native'
import React, {ReactNode} from 'react'
import { StyleSheet } from 'react-native';

import { MeshGradientView } from 'expo-mesh-gradient';

interface WrapperProps {
  children: ReactNode;
}

const WidgetLarge = ({children} : WrapperProps) => {
  return (

    
    <View className="h-full w-1/2 items-center justify-center rounded-3xl border-zinc-100 border-2 bg-black opacity-60 overflow-hidden">
        
      <MeshGradientView
      style={StyleSheet.absoluteFill}
      columns={2}
      rows={2}
      colors={['#737373', '#242424', '#242424', '#242424']}
      points={[
        [0.0, 0.0],
        [1.0, 0.0],
        [0.0, 1.0],
        [1.0, 1.0],
      ]}

      
    >
           
          </MeshGradientView>
 
   {children} 
    </View>

  )
}

export default WidgetLarge