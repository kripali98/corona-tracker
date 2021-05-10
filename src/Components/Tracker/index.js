import React from "react";
import ColorHash from "color-hash";
import axios from "axios";
import MapRenderer from "./MapRenderer";
//import 'regenerator-runtime/runtime';
const Geocodio = require('geocodio-library-node');
const opencage = require('opencage-api-client');

class Tracker extends React.Component {
  state = {
    center:[20, 77],
    highcases:null,
    highcures:null,
    highdeaths:null,
    mincases:null,
    mincures:null,
    mindeaths:null,
    i:0,
    zoom:5,
    latitude:[],
    longitude:[],
 geometry:[],
    state_details:[],
    india_total_active_cases: null,
    india_change_active:null,
    india_total_cured: null,
    india_change_cured:null,
    india_total_deaths: null,
    india_change_death:null,
    selectedStateIndex: null
  };
getGeometry=(state_name)=>{
  switch(state_name){
case 'Andaman and Nicobar Islands':return [11.6,92.7]
case 'Chandigarh':return [30.7,76.9]
case 'Dadra and Nagar Haveli and Daman and Diu':return [20.4,72.8]
case 'Delhi':return [28.5,77.1]
case 'Ladakh':return [34.22,77.56]
case 'Lakshadweep':return [10.6,72.6]
case 'Puducherry':return [11.9,79.8]
case 'Telangana':return [18.11,79.01]
case 'Andhra Pradesh':return [15.91,79.74]
case 'Arunachal Pradesh':return [28.21,94.72]
case 'Assam':return [26.20,92.93]
case 'Bihar':return [25.09,85.31]
case 'Chhattisgarh':return [21.27,81.86]
case 'Goa':return [15.29,74.12]
case 'Gujarat':return [22.25,71.19]
case 'Haryana':return [29.05,76.08]
case 'Himachal Pradesh':return [31.10,77.17]
case 'Jammu and Kashmir':return [33.77,76.57]
case'Jharkhand':return [23.61,85.27]
case 'Karnataka':return [15.31,75.71]
case 'Kerala':return [10.85,76.27]
case 'Madhya Pradesh':return [22.97,78.65]
case 'Maharashtra':return [19.75,75.71]
case 'Manipur':return [24.66,93.90]
case 'Meghalaya':return [25.46,91.36]
case 'Mizoram':return [23.16,92.93]
case 'Nagaland':return [26.15,94.56]
case 'Odisha':return [20.95,85.09]
case 'Punjab':return [31.14,75.34]
case 'Rajasthan':return [27.02,74.21]
case 'Sikkim':return [27.53,88.51]
case 'Tamil Nadu':return [11.12,78.65]
case 'Tripura':return [23.94,91.98]
case 'Uttarakhand':return [30.06,79.01]
case 'Uttar Pradesh':return [26.84,80.94]
case 'West Bengal':return [22.98,87.85]
  }
  return null;
}
   componentDidMount(){
   axios.get(`https://www.mohfw.gov.in/data/datanew.json`).then(res=>{
     var india_details=res.data.pop();  
  let highcure=0;
    let highdeath=0;
    let highcase=0;
    let casename=null;
    let deathname=null;
    let curename=null;
    let mincure=Number.MAX_SAFE_INTEGER + 1;
    let mindeath=Number.MAX_SAFE_INTEGER + 1;
    let mincase=Number.MAX_SAFE_INTEGER + 1;
    let casenamemin=null;
    let deathnamemin=null;
    let curenamemin=null;
   res.data.map(item =>{
      if(Number(item.new_active)<mincase){
        casenamemin=item.state_name;
        mincase=Number(item.new_active);
             }
             if(Number(item.new_cured)<mincure){
              curenamemin=item.state_name;
              mincure=Number(item.new_cured);
                   }
                   if(Number(item.new_death)<mindeath){
                    deathnamemin=item.state_name;
                    mindeath=Number(item.new_death);
                         }
      if(Number(item.new_active)>highcase){
 casename=item.state_name;
 highcase=Number(item.new_active);
      }
      if(Number(item.new_cured)>highcure){
       curename=item.state_name;
       highcure=Number(item.new_cured);
       }
       if(Number(item.new_death)>highdeath){
         deathname=item.state_name;
         highdeath=Number(item.new_death);
         }
        
   })

     this.setState({
      highcases:casename,
      highcures:curename,
      highdeaths:deathname,
      mincases:casenamemin,
      mincures:curenamemin,
      mindeaths:deathnamemin,
      india_total_active_cases: india_details.new_active,
      india_change_active:india_details.new_active-india_details.active,
      india_total_cured: india_details.new_cured,
      india_change_cured:india_details.new_cured-india_details.cured,
      india_total_deaths: india_details.new_death,
      india_change_death:india_details.new_death-india_details.death,
       state_details:res.data.map((item)=>({ 
         id:item.sno,
         cardColor: new ColorHash().hex(item.state_name),
        state_name: item.state_name,
        total_active_cases: item.new_active,
        change_active:item.new_active-item.active,
        total_cured: item.new_cured,
        change_cured:item.new_cured-item.cured,
        total_deaths: item.new_death,
        change_death:item.new_death-item.death,
      geometry:this.getGeometry(item.state_name),
       })) 
      }); 
     
   });
  }

  render() {

    return (
     
      <React.Fragment>
        <div className="flex-container">
          <div className="card-container">
            <center>
              <b>India Details</b>
              <br/><br/>
              
              <b>Active Cases : </b>
              {this.state.india_total_active_cases +" ("}
                    {(this.state.india_change_active>0)?this.state.india_change_active:(-1*this.state.india_change_active)}
                  <span style={{color:(this.state.india_change_active<0)?'green':'red'}}>
                 <b> {(this.state.india_change_active<0)?<span><b>&#8595;</b></span>:(this.state.india_change_active?<span><b>&#8593;</b></span>:'')} </b>
                      </span>
                      {" )"}
                    <br/>
                    
                    <b>Recovered : </b>
                    {this.state.india_total_cured+" ( "}                    
                    {(this.state.india_change_cured>0)?this.state.india_change_cured:(-1*this.state.india_change_cured)}
                  <span style={{color:(this.state.india_change_cured>0)?'green':'red'}}>
                 <b> {(this.state.india_change_cured<0)?<span><b>&#8595;</b></span>:(this.state.india_change_cured?<span><b>&#8593;</b></span>:'')} </b>
                      </span>
                      {" )"}
                    <br/>
                    <b>Deaths : </b>
                    {this.state.india_total_deaths+" ( "}
                    {(this.state.india_change_death>0)?this.state.india_change_death:(-1*this.state.india_change_death)}
                  <span style={{color:(this.state.india_change_death<0)?'green':'red'}}>
                 <b> {(this.state.india_change_death<0)?<span><b>&#8595;</b></span>:(this.state.india_change_death?<span><b>&#8593;</b></span>:'')} </b>
                      </span>
                      {" )"}
                      <br/>
                      <br/>
                      
            
              
              <div id="stats">
              <b>
             <p style={{color:"blue"}}>Active Cases :</p>
             Maximum : {this.state.highcases}<br/>Minimum : {this.state.mincases}<br/>
             <p style={{color:"green"}}>Recovered Cases :</p>
             Maximum :{this.state.highcures}<br/>Minimum : {this.state.mincures}<br/>
             <p style={{color:"red"}}>Deaths :</p>
             Maximum :{this.state.highdeaths}<br/>Minimum : {this.state.mindeaths}<br/><br/>
              </b>
              </div>
              <button
                className="showall"
                onClick={() =>{
                  this.setState({
                    zoom:5,
                    center:[20,77],
                    selectedStateIndex:null
                  })
                  
                }
                }
              >
                <b>Show All States</b>
              </button>
            </center>
            <br />
            
            {this.state.state_details.map((item) => (
              <React.Fragment>
                <div>
                  <b>{item.state_name}</b>
                  <div
                    className="card"
                    style={{
                      border: "0.5px solid black",
                      borderLeftColor: item.cardColor,
                      borderLeftWidth: "7px",
                      boxShadow:
                        item.id === this.state.selectedStateIndex
                          ? "5px 6px #F0E68C"
                          : null
                    }}
                    onClick={() =>
                      this.setState({
                        selectedStateIndex: item.id,
                        center:item.geometry,
                        zoom:7,
                       
                    }) 
                  }
                  >
                    <b>Active Cases : </b>
                    {item.total_active_cases}
                    <br/>
                    <b>Change Since Yesterday : </b>
                    {(item.change_active>0)?item.change_active:(-1*item.change_active)}
                  <span style={{color:(item.change_active<0)?'green':'red'}}>
                 {(item.change_active<0)?<span><b>&#8595;</b></span>:(item.change_active?<span><b>&#8593;</b></span>:'')}
                      </span>
                    <br/>                                 
                    <b>Recovered : </b>
                    {item.total_cured}
                    <br/>
                    <b>Change Since Yesterday : </b>
                    {(item.change_cured>0)?item.change_cured:(-1*item.change_cured)}
                  <span style={{color:(item.change_cured>0)?'green':'red'}}>
                 <b> {(item.change_cured<0)?<span><b>&#8595;</b></span>:(item.change_cured?<span><b>&#8593;</b></span>:'')} </b>
                      </span>
                    <br/>
                    <b>Deaths : </b>
                    {item.total_deaths}
                    <br />
                    <b>Change Since Yesterday : </b>
                    {(item.change_death>0)?item.change_death:(-1*item.change_death)}
                  <span style={{color:(item.change_death<0)?'green':'red'}}>
                 <b> {(item.change_death<0)?<span><b>&#8595;</b></span>:(item.change_death?<span><b>&#8593;</b></span>:'')} </b>
                      </span>
                    <br/>
                    
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
         <div className="map" >
            <MapRenderer
              center={this.state.center}
              zoom={this.state.zoom}
              state_details={this.state.state_details}
              selectedStateIndex={this.state.selectedStateIndex}
            />
          </div> 
        </div>
      </React.Fragment>
    );
  }
}

export default Tracker;
