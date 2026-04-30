import React, { useEffect, type FunctionComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import WidgetSmall from "./WidgetSmall";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";

const NUM_ITEMS = 3;


type Item = {
  key: string;
  label: string;
  height: number;
};

const initialData: Item[] = [...Array(NUM_ITEMS)].map((d, index) => {

  return {
    key: `item-${index}`,
    label: String(index) + "",
    height: 100,
  };
});



export const DynamicStack : FunctionComponent = () => {
  const [data, setData] = useState(initialData);

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          onPress={() => {router.push(`/config?type=${item.key}`)}}
          disabled={isActive}
          
          style={[
            styles.rowItem,
            
          ]}
        >
          <WidgetSmall type={item.key}/>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };


  const fetchData = async() => {
    try {
      const value = await AsyncStorage.getItem('widgetData');
      if (value != null) {
        console.log("got token: "+value);
        setData(JSON.parse(value))
      }
      
    } catch (error) {
      console.error("error fetching token: ",error);
    }
  }

  const ItemSeperator = () => {
    return <View className="h-3"></View>
  }

  const setWidgetData = async(widget_data) => {
    try {
      const value = await AsyncStorage.setItem('widgetData', JSON.stringify(widget_data));
      setData(widget_data)
      
    } catch (error) {
      console.error("error setting token: ",error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])



  return (
  <View className="flex-1 mr-3">
   <DraggableFlatList
      data={data}
      onDragEnd={({ data }) => setWidgetData(data)}
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeperator}
    />
    </View>
  )
}

export default DynamicStack


const styles = StyleSheet.create({
  rowItem: {
    flex: 1,
    height: 118,
    alignItems: "center",
    justifyContent: "center",
  },
});
