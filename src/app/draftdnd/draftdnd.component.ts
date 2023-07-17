import {  OnInit } from '@angular/core';

import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DroppedItemsService } from '../services/droppeditems.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { throwError, timer } from 'rxjs';
import { catchError, concatMap, delay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data-service.service';


interface Droppedchart {
  positionX: number;
  positionY: number;
  chart:String;

} 
interface MsDroppedColumns {
  id: number;
  column: string;
  title: string;
  metric: string;
}

interface DashboardUidResponse {
  uid: string;
}

@Component({
  selector: 'app-draftdnd',
  templateUrl: './draftdnd.component.html',   
  styleUrls: ['./draftdnd.component.css']
})
export class DraftdndComponent implements OnInit{

  isInfraSubMenuOpen:boolean=false;
  isClusterHealth:boolean=false;
  isDeployment:boolean=false;
  isNode:boolean=false;
  isPods:boolean=false;
  isContainer:boolean=false;
  isJobs:boolean=false;
  isAppSubMenuOpen:boolean=false;
  isDBSubMenuOpen:boolean=false;
  isServerSubMenuOpen:boolean=false;
  isContainerSubMenuOpen:boolean=false;
  isVMSubMenu:boolean=false;
  alertMode:boolean=false;
  isActive: boolean = false;
  chartMenu:boolean=false;
  nbmicroservices!:number;
  parcoursms:number=0;
  showSaveButton:boolean=false;
  isJVMSubMenuOpen:boolean=false;
  isBasicSubMenuOpen = false;
  isAdvancedSubMenuOpen = false;
  isAppResourcesSubMenuOpen = false;
  isJVMetricsSubMenuOpen = false;
  isAdvancedMetric=false;

  showBasicSubMenu() {
    this.isBasicSubMenuOpen = !this.isBasicSubMenuOpen;
  }

  showAdvancedSubMenu() {
    this.isAdvancedSubMenuOpen = !this.isAdvancedSubMenuOpen;
  }

  showVMSubMenu(){
    this.isVMSubMenu=!this.isVMSubMenu;
  }
  advancedMetricSelected(){
    this.isAdvancedMetric=!this.isAdvancedMetric;
  }
  
  //c:number=1;
  test=1;

  microservices: any[] = [
    { id: 1, name: 'Microservice 1', droppedItems: [] },
    { id: 2, name: 'Microservice 2', droppedItems: [] },
    { id: 3, name: 'Microservice 3', droppedItems: [] },
  ];
  


  ismicroserviceselected: boolean=false;

  isMsActive=true;
  initialColumns = [
    { dragStart: 'ondragstart($event)' },
    { dragStart: 'ondragstart($event)' },
    { dragStart: 'ondragstart($event)' },
    { dragStart: 'ondragstart($event)' },
    { dragStart: 'ondragstart($event)' },
    { dragStart: 'ondragstart($event)' },
    { dragStart: 'ondragstart($event)' },
  ];

  
  isMicroService(index: number) {
    if(index==this.test){
       this.ismicroserviceselected=true;
    }
    this.test++;
    
  }  
  columns = [
    { dragStart: 'ondragstart($event)' },
    { dragStart: 'ondragstart($event)' },
    { dragStart: 'ondragstart($event)' },
    { dragStart: 'ondragstart($event)' },
    { dragStart: 'ondragstart($event)' },
    { dragStart: 'ondragstart($event)' },
    { dragStart: 'ondragstart($event)' },
  ];    
  
  MsColumns:MsDroppedColumns[]=[];
  AdvancedMsColumns:MsDroppedColumns[]=[];

 setMsColumns() {
  console.log("here");
  let i;

  console.log(this.MsColumns);
}
  nextMicroserviceBtn() {
      this.parcoursms++;
      this.chartMenu = false;
      if (this.nbmicroservices + 1 == this.parcoursms) {
        this.showSaveButton = true;
      }
      this.columns = [
        { dragStart: 'ondragstart($event)' },
        { dragStart: 'ondragstart($event)' },
        { dragStart: 'ondragstart($event)' },
        { dragStart: 'ondragstart($event)' },
        { dragStart: 'ondragstart($event)' },
        { dragStart: 'ondragstart($event)' },
        { dragStart: 'ondragstart($event)' },
      ];
    }
    columns2!:{dragStart:string}[];
    saveTheMicDash() {
      console.log("parcours"+this.nbmicroservices+1);
  
      this.chartMenu = false;
      if (this.nbmicroservices + 1 == this.parcoursms) {
        this.showSaveButton = true;
      }
    
      if(this.parcoursms==1){
        this.columns2 = this.columns.slice();
        console.log(this.columns2);
        console.log("lena fl 1")
        this.columns = [
          { dragStart: 'ondragstart($event)' },
          { dragStart: 'ondragstart($event)' },
          { dragStart: 'ondragstart($event)' },
          { dragStart: 'ondragstart($event)' },
          { dragStart: 'ondragstart($event)' },
          { dragStart: 'ondragstart($event)' },
          { dragStart: 'ondragstart($event)' },
        ];
      }
      if(this.parcoursms==1){
        this.columns = this.columns2;
      }
    
      this.columns = [
        { dragStart: 'ondragstart($event)' },
        { dragStart: 'ondragstart($event)' },
        { dragStart: 'ondragstart($event)' },
        { dragStart: 'ondragstart($event)' },
        { dragStart: 'ondragstart($event)' },
        { dragStart: 'ondragstart($event)' },
        { dragStart: 'ondragstart($event)' },
      ];
         
         
      
        
          
        }
    
 
    nbms!:number;
    appType!:string;
    deployment!:string;
    ipAddressAndPort!:{ ip: string; port: string; }[];
    ipAddressesArray!:string;

  toggleBasicSubMenu() {
    this.isBasicSubMenuOpen = !this.isBasicSubMenuOpen;
  }

  toggleAdvancedSubMenu() {
    this.isAdvancedSubMenuOpen = !this.isAdvancedSubMenuOpen;
  }

 
  
  // Function to toggle the "Advanced" submenu
  toggleAdvancedSubMenu2() {
    this.isAdvancedSubMenuOpen = !this.isAdvancedSubMenuOpen;
  }
  
  

    ngOnInit(){

            var menuItems = document.querySelectorAll('.site-nav > ul > li');
            for (var i = 0; i < menuItems.length; i++) {
              var menuItem = menuItems[i];
              var subMenu = menuItem.querySelector('.sub-menu');
              if (subMenu) {
                menuItem.addEventListener('click', function(event) {
                  event.preventDefault();
                  if(subMenu!=null){
                    subMenu.classList.toggle('show');

                  }
                });
                        }


         //     console.log(this.projectName);
            this.activatedRoute.params.subscribe((params) => {
              this.projectName = params['projectName'];
              this.ipAddressesArray = params['ipAddressesArray'] ;
              this.appType = params['appTyp'];
              this.deployment = params['deployment'];
              this.taille = params['nbms'];
              this.alertMode=params['alertMode'];
              this.ipAddressAndPort = this.extractIpAddressAndPort(this.ipAddressesArray);
              console.log("lip2"+(this.ipAddressesArray));
              console.log("lip2"+(this.ipAddressAndPort[0].ip));



            });



            console.log("l size"+this.taille);
            const itemsSize=Number(this.taille);
            this.nbmicroservices=Number(this.taille)-2;

         //   this.items = Array(this.nbms+1).fill(0);
          //  console.log(this.items);
       //     console.log(this.appType);
            this.items = Array(itemsSize).fill(0);



          }
         // this.setMsColumns();


  }
   taille!:Number;
  items = Array();
//  console.log(items);



 extractIpAddressAndPort(ipAddressesArray:string) {
  const ipAddresses = ipAddressesArray.split(',');
  const ipAddressAndPort = [];

  for (const ipAddress of ipAddresses) {
    const [ip, port] = ipAddress.split(':');
    ipAddressAndPort.push({
      ip: ip,
      port: port,
    });
  }

  return ipAddressAndPort;
}



  submitBtn(){
    const btn = document.querySelector("#btn");
    const btnText = document.querySelector("#btnText");
    if(btn!=null && btnText!=null){
      
        btnText.innerHTML = "Saved";
        btn.classList.add("active");
   
    }
   this.saveData();
  }






  showInfraSubMenu() {
    this.isInfraSubMenuOpen = !this.isInfraSubMenuOpen;
  }
  showClusterSubMenu() {
    this.isClusterHealth = !this.isClusterHealth;
  }
  showDeploymentSubMenu() {
    this.isDeployment = !this.isDeployment;
  }
  showNodeSubMenu() {
    this.isNode = !this.isNode;
  }
  showPodSubMenu() {
    this.isPods = !this.isPods;
  }
  showContainersSubMenu() {
    this.isContainer = !this.isContainer;
  }
  showJobsSubMenu() {
    this.isJobs = !this.isJobs;
  }
  
  isAdvancedAppSubMenuOpen=false;
  
  showAppSubMenu() {
    this.isAdvancedSubMenuOpen = false; // Close the "Advanced" submenu when toggling the "Application Resources" submenu

    this.isAppSubMenuOpen = !this.isAppSubMenuOpen;
  }

  showAdvancedAppSubMenu() {

    this.isAdvancedAppSubMenuOpen = !this.isAdvancedAppSubMenuOpen;
  }
   showDBSubMenu() {
    this.isDBSubMenuOpen = !this.isDBSubMenuOpen;
  }
  showServerSubMenu() {
    this.isServerSubMenuOpen = !this.isServerSubMenuOpen;
  }
  showContainerSubMenu() {
    this.isContainerSubMenuOpen = !this.isContainerSubMenuOpen;
  }
  showJVMSubMenu() {
    this.isJVMSubMenuOpen = !this.isJVMSubMenuOpen;
  }
  ElementSelected(){
    this.isActive=true;
  }


  showChartMenu(){
  this.chartMenu=true;
  }



  // traitement l drag and drop 



  droppedItems: Droppedchart[] = [];
  draggedItem: any;
  showSidebar = false;
  showText = true;
  dashboardUrl: string=""; // Define the dashboardUrl property
  uid: string='';
  projectName:string="";
  //ipAddressesArray: {ipaddr: string, port: string}[] = [];
  selectedMetric:string[]=[];
  i=0;
  j=2;


  constructor(
    private router: Router,private activatedRoute: ActivatedRoute,
    private droppedItemsService: DroppedItemsService,private http:HttpClient,private sanitizer: DomSanitizer,private dataService: DataService
  ) { }


  onDragStart(event: any) {
    this.draggedItem = event.target;
    event.dataTransfer.setData('text/plain', this.draggedItem.innerHTML);
    event.dataTransfer.dropEffect = 'move';
  }

  onDragOver(event: any) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    console.log("dragging");
  }
  

  onDrop(event: any) {
    let i: number = 1;
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    const target = event.target;
    if (target && target.classList.contains('dropbox')) {
      target.appendChild(this.draggedItem);
      event.target.classList.add("dropped");
  
      const chart = this.draggedItem.querySelector('h2').textContent;
      //correspondence in terms of index for the chart
      const chartGrafana = this.getTheNewChart(chart);
  
      if (this.metricselected.length > 0 && this.metricselected[0].title !== "") {
        const selectedMetricTitle = this.metricselected[0].title;
        const selectedMetric = this.metricselected[0].metric;
        console.log(this.MsColumns);
        this.MsColumns.push({
          id: this.parcoursms + 1,
          column: chartGrafana,
          title: selectedMetricTitle,
          metric: selectedMetric
        });
      }
  
      if (this.advancedMetricselected.length > 0 && this.advancedMetricselected[0].title !== "") {
        const selectedMetricTitle = this.advancedMetricselected[0].title;
        const selectedMetric = this.advancedMetricselected[0].metric;
        console.log(this.AdvancedMsColumns);
        this.AdvancedMsColumns.push({
          id: this.parcoursms + 1,
          column: chartGrafana,
          title: selectedMetricTitle,
          metric: selectedMetric
        });
      }
    }
  
    console.log("this.MsColumns", this.MsColumns);
    console.log("this.AdvancedMsColumns", this.AdvancedMsColumns);
    this.showSidebar = false;
    this.chartMenu = false;
  }
      goHome(){
      this.router.navigate(['/home']);
    }
  

  showRecentDroppedItems(parcoursms: number) {  
    // Retrieve the dropped items from the chosen microservice's array
    const currentMicroservice = this.microservices.find(ms => ms.id === this.parcoursms+1);
    const recentDroppedItems = currentMicroservice.droppedItems;
    console.log('recentDroppedItems'+recentDroppedItems);
    
    // Display the recent dropped items in the microservice UI
  }
 chosenMicroserviceId = 1;
 c=0;

extractPanelId(url: string): string {
const regex = /panelId=(\d+)/;
const match = url.match(regex);
return match ? match[1] : '';
  }

saving=false;
saveData() {


  this.addGenericPanels();
  timer(3000)
  const dashboardTitle = this.projectName;
  const columns = this.MsColumns;
  const advancedColumns = this.AdvancedMsColumns;
  this.dataService.advancedMetricselected=this.AdvancedMsColumns;
  console.log("hereee" + columns);

  if (columns && columns.length > 0) {
    console.log("lena" + columns[0].id);
    console.log("type" + this.appType);
    console.log("comparaison" + this.appType.includes("Monolithic app"));
    const ipAddressesArray2 = this.ipAddressesArray[0];

    if (this.appType.includes("Monolithic app")) {
      columns.forEach((column, index) => {
        console.log(`id: ${column.id}, column: ${column.column},title:${column.title}, metric: ${column.metric}`);
        const PanelTitle = column.title;
        const target = column.metric;
        const panelChart = column.column.toString();
        const ip = this.ipAddressAndPort[0].ip;
        const port = this.ipAddressAndPort[0].port;
        const tag = column.id;

        timer(index * 100)
          .pipe(
            concatMap(() => this.http.post('http://localhost:8080/api/grafana/panel', null, { params: { dashboardTitle, PanelTitle, target, panelChart, ip, port, tag } })),
            catchError((error) => {
              console.error('Error adding panel:', error);
              return throwError(error);
            })
          )
          .subscribe(() => {
            console.log('Panel added successfully.');
          });

        console.log("fl save" + this.ipAddressesArray);
        timer(2000).subscribe(() => {
          console.log("fl save" + this.ipAddressesArray);
          console.log("advancedColumns"+advancedColumns);

          if (advancedColumns && advancedColumns.length > 0) {
            console.log("hereee");
            this.router.navigate(['/advancedsettings', {
              projectName: this.projectName,
              ipAddressesArray: this.ipAddressesArray,
              nbms: this.taille,
              appType: this.appType,
              advancedMetricselected: JSON.stringify(this.dataService.advancedMetricselected),
              alertMode:this.alertMode

            }]);
          } 
          else {
            if (this.alertMode==true) {
              this.router.navigate(['/addalert', {
                projectName: this.projectName,
                ipAddressesArray: this.ipAddressesArray,
                nbms: this.taille,
                appType: this.appType,
              }]);
            } else {
              this.router.navigate(['/dashboard', {
                projectName: this.projectName,
                ipAddressesArray: this.ipAddressesArray,
                deployment: this.deployment,
                appType: this.appType,
                nbms: this.taille
              }]);
            }
          }
        });
      });
    } 
    
    
    else {
      columns.forEach((column, index) => {
        console.log(`id: ${column.id}, column: ${column.column},title:${column.title}, metric: ${column.metric}`);
        const PanelTitle = column.title;
        const target = column.metric;
        const panelChart = column.column.toString();
        const ip = this.ipAddressAndPort[0].ip;
        const port = this.ipAddressAndPort[0].port;
        const tag = column.id;

        timer(index * 100)
          .pipe(
            concatMap(() => this.http.post('http://localhost:8080/api/grafana/panel', null, { params: { dashboardTitle, PanelTitle, target, panelChart, ip, port, tag } })),
            catchError((error) => {
              console.error('Error adding panel:', error);
              return throwError(error);
            })
          )
          .subscribe(() => {
            console.log('Panel added successfully.');
          });

        if (advancedColumns && advancedColumns.length > 0) {
          this.router.navigate(['/advancedsettings', {
            projectName: this.projectName,
            ipAddressesArray: this.ipAddressesArray,
            nbms: this.taille,
            appType: this.appType,
            advancedMetricselected: JSON.stringify(this.dataService.advancedMetricselected),
            alertMode:this.alertMode
          }]);
        }
        else {
          if (this.alertMode==true) {
            this.router.navigate(['/addalert', {
              projectName: this.projectName,
              ipAddressesArray: this.ipAddressesArray,
              nbms: this.taille,
              appType: this.appType,
              alertMode:this.alertMode

            }]);
        }
        else {
          timer(2000).subscribe(() => {
            this.router.navigate(['/dashboard', {
              projectName: this.projectName,
              ipAddressesArray: this.ipAddressesArray,
              appType: this.appType,
              nbms: this.taille,
              alertMode:this.alertMode

            }]);
          });
        }
        } 
      });
    }
  } else {
    if (advancedColumns && advancedColumns.length > 0) {
      this.router.navigate(['/advancedsettings', {
        projectName: this.projectName,
        ipAddressesArray: this.ipAddressesArray,
        nbms: this.taille,
        appType: this.appType,
        advancedMetricselected: JSON.stringify(this.dataService.advancedMetricselected),
        alertMode:this.alertMode

      }]);
    }
  }
}

getIpAddress(){
  const ipAddressesArray=this.ipAddressesArray[0];
  console.log(ipAddressesArray);
}

  

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
  CloseSideMenu(){
    this.i++;
    if(this.i==1){
      this.showSidebar=false;
      this.i=0;
    }
  }



metricselected!:{ title: string; metric: string; }[];
advancedMetricselected!:{ title: string; metric: string; }[];


getSelectedMetric(metric:string,title:string,isAdvanced:boolean){

  this.metricselected = [];
  this.advancedMetricselected = [];

  if(isAdvanced){

    this.advancedMetricselected.push({title:title,metric:metric})
    console.log("this.metricselected"+this.advancedMetricselected[0].title);
    console.log("this.metricselected"+this.advancedMetricselected[0].metric);
  

  }
  else{
    this.metricselected.push({title:title,metric:metric})
    console.log("this.metricselected"+this.metricselected[0].title);
  
     console.log("LENAAAAAA"+this.metricselected[0].title);
  

  }
  return this.metricselected;

}
addGenericPanels(){
  const ip = this.ipAddressAndPort[0].ip;
  const port = this.ipAddressAndPort[0].port;

  timer(1500)
  .pipe(
    concatMap(() => this.http.post('http://localhost:8080/api/grafana/generic_panel', null, { params: { dashboardTitle:this.projectName,ip:ip, port:port,appType:this.appType  } })),
    catchError((error) => {
      console.error('Error adding panel:', error);
      return throwError(error);
    })
  )
  .subscribe(() => {
    console.log('Panel added successfully.');
  });


}








getTheNewChart(chart:string){

  if(chart==="Pie Chart"){
    return "piechart";


  }
  if(chart==="Gauge Chart"){

    return "gauge";

  }
  if(chart==="Line Chart"){

    return "timeseries";


  }
  
  if(chart==="Stat Chart"){
    return "stat";


  }
  if(chart==="Bar Chart"){
    return "bargauge";

  }
  if(chart==="XY Chart"){
    return "xychart";

  }
  if(chart==="Horizontal Chart"){
    return "state-timeline";

  }
 
return "";
}



saleData = [
{ name: "CPU", value: 105000 },
{ name: "Memory", value: 55000 },
{ name: "Swap", value: 15000 },
{ name: "Disk", value: 150000 },
];

lineData=[
{
"name": "CPU",
"series": [
  {
    "value": 6774,
    "name": "2016-09-23T11:57:02.465Z"
  },
  {
    "value": 3054,
    "name": "2016-09-22T00:20:58.585Z"
  },
  {
    "value": 6336,
    "name": "2016-09-20T11:28:25.409Z"
  },
  {
    "value": 5081,
    "name": "2016-09-18T13:42:49.371Z"
  },
  {
    "value": 4907,
    "name": "2016-09-19T12:26:54.914Z"
  }
]
},
{
"name": "Memory",
"series": [
  {
    "value": 6745,
    "name": "2016-09-23T11:57:02.465Z"
  },
  {
    "value": 2038,
    "name": "2016-09-22T00:20:58.585Z"
  },
  {
    "value": 3117,
    "name": "2016-09-20T11:28:25.409Z"
  },
  {
    "value": 2585,
    "name": "2016-09-18T13:42:49.371Z"
  },
  {
    "value": 4971,
    "name": "2016-09-19T12:26:54.914Z"
  }
]
},
{
"name": "Swap",
"series": [
  {
    "value": 3455,
    "name": "2016-09-23T11:57:02.465Z"
  },
  {
    "value": 6441,
    "name": "2016-09-22T00:20:58.585Z"
  },
  {
    "value": 2376,
    "name": "2016-09-20T11:28:25.409Z"
  },
  {
    "value": 3668,
    "name": "2016-09-18T13:42:49.371Z"
  },
  {
    "value": 5016,
    "name": "2016-09-19T12:26:54.914Z"
  }
]
},
{
"name": "Disk Usage",
"series": [
  {
    "value": 6514,
    "name": "2016-09-23T11:57:02.465Z"
  },
  {
    "value": 3833,
    "name": "2016-09-22T00:20:58.585Z"
  },
  {
    "value": 2890,
    "name": "2016-09-20T11:28:25.409Z"
  },
  {
    "value": 6121,
    "name": "2016-09-18T13:42:49.371Z"
  },
  {
    "value": 2474,
    "name": "2016-09-19T12:26:54.914Z"
  }
]
},

]
bubledata=[
{
  "name": "",
  "series": [
    {
      "name": "2010",
      "x": "2010",
      "y": 80.3,
      "r": 80.4
    },
    {
      "name": "2000",
      "x": "2000",
      "y": 80.3,
      "r": 78
    },
    {
      "name": "1990",
      "x": "1990",
      "y": 75.4,
      "r": 79
    }
  ]
},
{
  "name": "",
  "series": [
    {
      "name": "2010",
      "x": "2020",
      "y": 15.8,
      "r": 310
    },
    {
      "name": "2000",
      "x": "2000",
      "y": 76.9,
      "r": 283
    },
    {
      "name": "1990",
      "x": "1990",
      "y": 75.4,
      "r": 253
    }
  ]
},
{
  "name": "",
  "series": [
    {
      "name": "2010",
      "x": "2010",
      "y": 10.4,
      "r": 63
    },
    {
      "name": "2000",
      "x": "2000",
      "y": 10.1,
      "r": 59.4
    },
    {
      "name": "1990",
      "x": "1990",
      "y": 30.2,
      "r": 56.9
    }
  ]
},
{
  "name": "",
  "series": [
    {
      "name": "2010",
      "x": "2010",
      "y": 40.2,
      "r": 62.7
    },
    {
      "name": "2000",
      "x": "2000",
      "y": 20.8,
      "r": 58.9
    },
    {
      "name": "1990",
      "x": "1990",
      "y": 75.7,
      "r": 57.1
    }
  ]
}
];
heatmapdata=[
{
  "name": "column 1",
  "series": [
    {
      "name": "2010",
      "value": 40632,
      "extra": {
        "code": "de"
      }
    },
    {
      "name": "2000",
      "value": 36953,
      "extra": {
        "code": "de"
      }
    },
    {
      "name": "1990",
      "value": 31476,
      "extra": {
        "code": "de"
      }
    }
  ]
},
{
  "name": "column 2",
  "series": [
    {
      "name": "2010",
      "value": 0,
      "extra": {
        "code": "us"
      }
    },
    {
      "name": "2000",
      "value": 45986,
      "extra": {
        "code": "us"
      }
    },
    {
      "name": "1990",
      "value": 37060,
      "extra": {
        "code": "us"
      }
    }
  ]
},
{
  "name": "column 3",
  "series": [
    {
      "name": "2010",
      "value": 36745,
      "extra": {
        "code": "fr"
      }
    },
    {
      "name": "2000",
      "value": 34774,
      "extra": {
        "code": "fr"
      }
    },
    {
      "name": "1990",
      "value": 29476,
      "extra": {
        "code": "fr"
      }
    }
  ]
},
{
  "name": "column 4",
  "series": [
    {
      "name": "2010",
      "value": 36240,
      "extra": {
        "code": "uk"
      }
    },
    {
      "name": "2000",
      "value": 32543,
      "extra": {
        "code": "uk"
      }
    },
    {
      "name": "1990",
      "value": 26424,
      "extra": {
        "code": "uk"
      }
    }
  ]
}
];


treedata=[
{
  "name": "Germany",
  "value": 40632,
  "extra": {
    "code": "de"
  }
},
{
  "name": "France",
  "value": 36745,
  "extra": {
    "code": "fr"
  }
},
{
  "name": "United Kingdom",
  "value": 36240,
  "extra": {
    "code": "uk"
  }
},
{
  "name": "Spain",
  "value": 33000,
  "extra": {
    "code": "es"
  }
},
{
  "name": "Italy",
  "value": 35800,
  "extra": {
    "code": "it"
  }
},
{
  "name": "Spain",
  "value": 36620
}
]
value: number = 50;
previousValue: number = 70;
units: string = 'Alerts';

horizdata=[
{
  "name": "Swap",
  "series": [
    {
      "name": "2010",
      "value": 40632,
      "extra": {
        "code": "de"
      }
    },
    {
      "name": "2000",
      "value": 36953,
      "extra": {
        "code": "de"
      }
    },
    {
      "name": "1990",
      "value": 31476,
      "extra": {
        "code": "de"
      }
    }
  ]
},
{
  "name": "Disk",
  "series": [
    {
      "name": "2010",
      "value": 0,
      "extra": {
        "code": "us"
      }
    },
    {
      "name": "2000",
      "value": 45986,
      "extra": {
        "code": "us"
      }
    },
    {
      "name": "1990",
      "value": 37060,
      "extra": {
        "code": "us"
      }
    }
  ]
},
{
  "name": "Memory",
  "series": [
    {
      "name": "2010",
      "value": 36745,
      "extra": {
        "code": "fr"
      }
    },
    {
      "name": "2000",
      "value": 34774,
      "extra": {
        "code": "fr"
      }
    },
    {
      "name": "1990",
      "value": 29476,
      "extra": {
        "code": "fr"
      }
    }
  ]
},
{
  "name": "CPU",
  "series": [
    {
      "name": "1990",
      "value": 33216
    },
    {
      "name": "2000",
      "value": 37606
    },
    {
      "name": "2010",
      "value": 17293
    }
  ]
}
]

}
