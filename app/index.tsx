import { AppRegistry, Text, View } from "react-native";
import WidgetLarge from "@/components/WidgetLarge";
import Clock from "@/components/Clock";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DynamicStack from "@/components/DynamicStack";
import { Modal } from "react-native";
import { useEffect } from "react";
import * as Calendar from 'expo-calendar'
import {MeshGradientView} from 'expo-mesh-gradient';
import { StyleSheet } from "react-native";
import { StatusBar } from "react-native";


/*
<View className="flex-1 flex-row gap-4 ml-16 py-6 mr-4 overflow-hidden">
        <WidgetLarge>
          <Clock/>
        </WidgetLarge>
        <View className="flex-col h-full w-full gap-4 justify-evenly">
          <WidgetSmall>
            <Music/>
          </WidgetSmall>
          <WidgetSmall>
            <Weather/>
          </WidgetSmall>
          <WidgetSmall/>
        </View>
      </View>
*/






export default function Index() {

  
  



  return (
    <GestureHandlerRootView>
      <StatusBar hidden={true}/>
    <View className="w-full h-full bg-black p-5">
      

      <MeshGradientView
      style={StyleSheet.absoluteFill}
      columns={2}
      rows={2}
      colors={['#8fffdf', '#4287f5', '#8fffdf', '#8fffdf']}
      points={[
        [0.0, 0.0],
        [1.0, 0.0],
        [0.0, 1.0],
        [1.0, 1.0],
      ]}

      
    />
      
      <View className="flex-1 ml-10 gap-4 flex-row">
        <WidgetLarge>
          <Clock/>
        </WidgetLarge>
        <DynamicStack/>
      </View>
      
    

       
    </View>
    </GestureHandlerRootView>
  );
}
