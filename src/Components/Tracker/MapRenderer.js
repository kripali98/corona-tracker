import React from "react";
import { TileLayer,CircleMarker,Popup,MapContainer,useMap} from "react-leaflet";
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}
class MapRenderer extends React.Component {
  render() {
    
    return (
      <MapContainer
        center={this.props.center}
        zoom={this.props.zoom}
        state_details={this.props.state_details}
      >
        <ChangeView center={this.props.center} zoom={this.props.zoom} /> 
        <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
        {this.props.state_details.map((item,index) =>(
          <React.Fragment>
               <CircleMarker
                color={item.cardColor}
                center={item.geometry}
                radius={item.id==this.props.selectedStateIndex?'15':'4'}
               
               // center={center}
                
              >
                <Popup>
                  <h2>{item.state_name}</h2>
                  <b> Active Cases : </b>
                  {item.total_active_cases}
                  <br />
                  <b> Recovered: </b>
                  {item.total_cured}
                  <br />
                  <b>Deaths : </b>
                  {item.total_deaths}
                  
                </Popup>
              </CircleMarker>
            </React.Fragment>
          ))}  
      </MapContainer>
    );
  }
}
export default MapRenderer;
