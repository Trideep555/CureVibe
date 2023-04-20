import { VictoryLegend, VictoryPie} from 'victory'
function Analytics(){
    return (<>
    <div style={{height: '500px', width: '650px',marginLeft: '30%'}}>
    <p align="center" style={{fontSize:"xx-large",fontWeight:"700",color:"#605448"}}>Analytics</p>
    <p align="center" style={{fontSize:"large",fontWeight:"500",color:"blue"}}>Test Results</p>
    <VictoryPie
    colorScale={["tomato", "orange", "gold", "cyan"]}
    
  data={[
    { x: "Depression(45%)", y: 45 },
    { x: "PTSD(40%)", y: 40 },
    { x: "Anxiety(25%)", y: 25 },
    { x: "Bipolar(30%)", y: 30 },
  ]}
/>

</div>
    </>)
}
export default Analytics;