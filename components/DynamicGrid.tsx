import React from "react";
import DraggableGrid from "react-native-draggable-grid";
import { View, Text} from "react-native";
import WidgetSmall from "./WidgetSmall";
import WidgetLarge from "./WidgetLarge";
import DynamicStack from "./DynamicStack"
import Clock from "./Clock";

interface MyTestProps {

}

interface MyTestState {
  data:{key:string, name:string}[];
}

export class DynamicGrid extends React.Component<MyTestProps, MyTestState>{

    constructor(props:MyTestProps) {
    super(props);
    this.state = {
      data:[
        {name:'1',key:'one'},
        {name:'2',key:'two'},
        {name:'3',key:'three'},
        {name:'4',key:'four'},
        {name:'5',key:'five'},
        {name:'6',key:'six'},
        {name:'7',key:'seven'},
        {name:'8',key:'eight'},
        {name:'9',key:'night'},
        {name:'0',key:'zero'},
      ],
    };
  }

  public render_item(item:{name:string, key:string}) {
    return (
      <View
        key={item.key}
        className="w-[420px] h-full "
      >
       {item.key === "one" ?(<DynamicStack/>) : (<WidgetLarge><Clock></Clock></WidgetLarge>) }
      </View>
    );
  }

  render() {
    return (
      <View className="w-full h-full p-3 ml-6 overflow-hidden mb-10">
        <DraggableGrid
          numColumns={2}
          renderItem={this.render_item}
          data={this.state.data}
          onDragRelease={(data) => {
            this.setState({data});// need reset the props data sort after drag release
          }}
        />
      </View>
    );
  }
}
