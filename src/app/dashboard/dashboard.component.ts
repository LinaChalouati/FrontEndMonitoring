import { Component ,AfterViewInit} from '@angular/core';
import { DroppedItemsService } from '../services/droppeditems.service';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
import { timer } from 'rxjs';
import { interval } from 'rxjs';
import { HealthcheckService } from '../services/healthcheck.service';

 interface DashboardUidResponse {
  uid: string;
}

interface PanelIdResponse {
  panelIds: string[];
}
interface PanelIdBytagResponse {
  panelIds: string[];
}

interface DroppedItem {
  positionX: number;
  positionY: number;
  content: any;
}
declare const M: any; // Declare M as an external library

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

droppedItems: DroppedItem[] = [];
uid: string='';
dashboardTitle:string="";
panelIds: string[] = [];
projectName!:string;
ipAddresses!:string;
urlList: SafeResourceUrl[] = [];
urlList2: SafeResourceUrl[] = [];

showPopup = false;
status = true;
responseValue!: PanelIdResponse;
responseValueBytag!:PanelIdBytagResponse;
responseValueBytag2!:PanelIdBytagResponse;

PanelId!:String;
items = Array();
numberPrometheusdown=0;
numberGrafanadown=0;
numberAlertManagerdown=0;




  constructor(private location: Location,
    private activatedRoute: ActivatedRoute,private droppedItemsService: DroppedItemsService,
    private router: Router,private http:HttpClient,private sanitizer: DomSanitizer,private healthCheckService: HealthcheckService
    ) { }
nbms!:Number;
appType!:string;
deployment!:string;
ipAddressesArray!:string;
  ngOnInit() {
    this.checkHealth();
    interval(20 * 1000) // 60 seconds = 1 minute
      .subscribe(() => {
        this.checkHealth();
      });
    
    this.activatedRoute.params.subscribe((params) => {
    this.projectName = params['projectName'];
    this.ipAddressesArray=params['ipAddressesArray'];
     this.appType=params['appType'];
     this.nbms=Number(params['nbms']);
     this.deployment = params['deployment'];


    });
   // console.log("depl"+this.deployment);
    console.log("overhere"+this.ipAddressesArray);
    
  this.items = Array(this.nbms).fill(0);

  console.log(this.appType);
  this.getDashboardUidByName();
   
   if(this.appType.includes("Microservices")){
    this.SelectedMs=1;
    this.getGenericPanelIdsByTag();
    this.getPanelIdsByTag();

   }
   else{
  //  this.getAllPanelIds();
  this.SelectedMs=1;
  this.getGenericPanelIdsByTag();
  this.getPanelIdsByTag();

   }
  

  
  }

  

  selectedTime!: string;

onTimeChange(time:any) {
  this.selectedTime = time;
  const selectedTime = this.selectedTime;


}
SelectedMs:Number=1;
showMs:boolean=true;

getTheSelectedMs(i:Number){
  console.log("i"+i);
        this.SelectedMs=i;
        this.getGenericPanelIdsByTag();
        this.getPanelIdsByTag();
}


addToggle()
{
  this.status = !this.status;
}

  handleClose() {
    console.log("Popup closed");
  }


  getDashboardUidByName() {
    const dashboardTitle=this.projectName;
    this.http.post<DashboardUidResponse>('http://localhost:8080/api/grafana/dashboard-uid',null,{params :{
    dashboardTitle
    }})
      .subscribe((response) => {
        this.uid = response.uid;
        console.log(this.uid);
      });
  }

  i=0;


  getAllPanelIds() {

    const params = {
      dashboardTitle: this.projectName
    };
  console.log("params"+params.dashboardTitle);
  timer(1000);
    this.http.get<PanelIdResponse>('http://localhost:8080/api/grafana/allpanels', { params: params })
      .subscribe(
        (response) => {    
          this.responseValue = response;
          console.log("response"+response);
          this.getPanelsUrl();
          

          //console.log(response);
        },
        (error) => {
          console.error('Error fetching panel IDs:', error);
        }
      );
  }  


  getPanelIdsByTag() {
    const Tag=Number(this.SelectedMs);
    //const Tag=1;
    console.log("lena"+this.responseValueBytag);
  
    timer(1000);
      this.http.get<PanelIdBytagResponse>('http://localhost:8080/api/grafana/allpanelsbytag', { params: {
        dashboardTitle:this.projectName,
        tag:Tag
      } })
        .subscribe(
          (response) => {    
            console.log("response"+response);
            this.responseValueBytag = response;
            console.log("this.responseValueBytag"+this.responseValueBytag);
            this.getPanelsUrlByTag();
  
          },
          (error) => {
            console.error('Error fetching panel IDs:', error);
          }
        );
    }  


    getGenericPanelIdsByTag() {
      const Tag=0;
      //const Tag=1;
    //  console.log("lena"+this.responseValueBytag);
    
      timer(1000);
        this.http.get<PanelIdBytagResponse>('http://localhost:8080/api/grafana/allpanelsbytag', { params: {
          dashboardTitle:this.projectName,
          tag:Tag
        } })
          .subscribe(
            (response) => {    
            //  console.log("response"+response);
              this.responseValueBytag2 = response;
              console.log("this.responseValueBytag"+this.responseValueBytag2);
              this.getGenericPanelsUrlByTag();
    
            },
            (error) => {
              console.error('Error fetching panel IDs:', error);
            }
          );
      }  
  

  getGenericPanelsUrlByTag() {
    this.urlList2= [];
    
    if (Array.isArray(this.responseValueBytag2)) {
      for (const panelId of this.responseValueBytag2) {
        const panelurl = `http://localhost:3000/d-solo/${this.uid}/template?orgId=1&panelId=${panelId}&theme=light&refresh=5s`;
        const panelsecuredurl= this.sanitizer.bypassSecurityTrustResourceUrl(panelurl);
        //console.log("panelsecuredurl"+panelsecuredurl);
        //console.log("panelId"+panelId);

        this.urlList2.push(panelsecuredurl); // Add the value to the list
        console.log("urllist"+this.urlList2);
        
      }
    }  else {
      console.error('Unable to iterate over responseValue. Invalid data type.');
    }
  }
  getPanelsUrlByTag() {
    this.urlList= [];

    if (Array.isArray(this.responseValueBytag)) {
      for (const panelId of this.responseValueBytag) {
        const panelurl = `http://localhost:3000/d-solo/${this.uid}/template?orgId=1&panelId=${panelId}&theme=light&refresh=5s`;
        const panelsecuredurl= this.sanitizer.bypassSecurityTrustResourceUrl(panelurl);
       // console.log("panelsecuredurl"+panelsecuredurl);
      //  console.log("panelId"+panelId);

        this.urlList.push(panelsecuredurl); // Add the value to the list
        console.log("urllist"+this.urlList);

        
      }
    }  else {
      console.error('Unable to iterate over responseValue. Invalid data type.');
    }
  }
  

     getPanelsUrl() {

      if (Array.isArray(this.responseValue)) {
        for (const panelId of this.responseValue) {
          const panelurl = `http://localhost:3000/d-solo/${this.uid}/template?orgId=1&panelId=${panelId}&theme=light&refresh=5s`;
          const panelsecuredurl= this.sanitizer.bypassSecurityTrustResourceUrl(panelurl);
          console.log(panelsecuredurl);
          this.urlList.push(panelsecuredurl); 
        }
      }  else {
        console.error('Unable to iterate over responseValue. Invalid data type.');
      }
    }
    
  
    sanitizeUrl(url: string): SafeResourceUrl {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  
  
  goHome(){
    this.router.navigate(['/home']);  }
      
  goAlert(){
      console.log(this.ipAddresses);
   
      this.router.navigate(['/alert',{ projectName: this.projectName,
        ipAddressesArray : this.ipAddressesArray ,
        nbms:this.nbms,
        appType:this.appType,
      }]);
    
   }
   selectedItem: number = 0; // Default selected item index

   selectItem(index: number): void {
    this.selectedItem = index;
  }
  refreshPage() {
    location.reload();
  }

  addPanel(){
    this.router.navigate(['/addpanelpopup',{ projectName: this.projectName,
      ipAddressesArray : this.ipAddresses ,
      nbms:this.nbms,
      appType:this.appType,
      deployment:this.deployment}]);

  this.getAllPanelIds();

  }

  getPanelId(url: SafeResourceUrl):string{
    console.log("dkhal lena");
    const urlParts = url.toString().split('&');

    const panelIdParam = urlParts.find(part => part.startsWith('panelId'));
    
    if (panelIdParam === undefined) {
      console.log('The panelId parameter was not found in the URL.');
      return "";
    } else {
      const panelId = panelIdParam.split('=')[1];
      console.log(panelId);
      return (panelId);
    }
  }
 

  deletePanel(url: SafeResourceUrl) {
    const PanelId = this.getPanelId(url);

    if (PanelId !=="") {
      const dashboardTitle = this.projectName;
      this.http.delete('http://localhost:8080/api/grafana/delete-Panel', {
        params: {
          dashboardTitle,
          PanelId,
        },
      })
        .subscribe((response:any) => {
          this.refreshPage();


          if (response === 200) {
            this.getAllPanelIds();
            this.refreshPage();
          } else {
            // An error occurred while deleting the panel.
            console.log("Error");
          }

        });
    }
  }

  goRules(){
    this.router.navigate(['/rules']);
  }
  goEditPage(){
    this.router.navigate(['/editdash',{ projectName: this.projectName,ipAddresses:this.ipAddresses }]);
    
      }
      editOK!:Boolean;
      editPanel(url:SafeResourceUrl){  
      const PanelId = this.getPanelId(url);
      this.editOK=true;
//      this.router.navigate(['/editpanel',{ projectName: this.projectName,PanelId:this.PanelId }]);
    }


    private checkHealth(): void {
      const toast4 = document.getElementById("toast-message4")!;
      const toast2 = document.getElementById("toast-message2")!;
      const toast3 = document.getElementById("toast-message3")!;
    
      this.healthCheckService.checkPrometheusHealth().subscribe(
        (isUp) => {
          console.log('Prometheus is up:', isUp);
    
          toast4.innerHTML = isUp ? "Prometheus is UP!" : "Prometheus is DOWN!";
          toast4.classList.remove("toast4-success", "toast4-failed");
          toast4.classList.add("toast4", isUp ? "toast4-success" : "toast4-failed", "show");
          if(isUp==true){
              this.numberPrometheusdown=0;
          }
          else{
            this.numberPrometheusdown+=1;
            if(this.numberPrometheusdown==5){
              timer(3000);
              this.restartPrometheus();
            }
  
          }
          console.log("down down"+this.numberPrometheusdown);
          // Hide the toast after 3 seconds
          setTimeout(() => {
            toast4.classList.remove("show");
          }, 7000);
        },
        (error) => {
          console.error('Error occurred while checking Prometheus health:', error);
    
          toast4.innerHTML = "Error Modifying Failed!";
          toast4.classList.remove("toast4-success");
          toast4.classList.add("toast4", "toast4-failed");
          console.log("mche lenaaa");
    
          // Hide the toast after 3 seconds
          setTimeout(() => {
            toast4.classList.remove("show");
          }, 7000);
        }
      );
    
      this.healthCheckService.checkGrafanaHealth().subscribe(
        (isUp) => {
          console.log('Grafana is up:', isUp);
    
          toast2.innerHTML = isUp ? "Grafana is UP!" : "Grafana is DOWN!";
          toast2.classList.remove("toast2-success", "toast2-failed");
          toast2.classList.add("toast2", isUp ? "toast2-success" : "toast2-failed", "show");
    
       
  
          // Hide the toast after 3 seconds
          setTimeout(() => {
            toast2.classList.remove("show");
          }, 7000);
        },
        (error) => {
          console.error('Error occurred while checking Grafana health:', error);
    
          toast2.innerHTML = "Error Modifying Failed!";
          toast2.classList.remove("toast2-success");
          toast2.classList.add("toast2", "toast2-failed");
    
          // Hide the toast after 3 seconds
          setTimeout(() => {
            toast2.classList.remove("show");
          }, 7000);
        }
      );
    
      this.healthCheckService.checkAlertmanagerHealth().subscribe(
        (isUp) => {
          console.log('Alertmanager is up:', isUp);
    
          toast3.innerHTML = isUp ? "Alertmanager is UP!" : "Alertmanager is DOWN!";
          toast3.classList.remove("toast3-success", "toast3-failed");
          toast3.classList.add("toast3", isUp ? "toast3-success" : "toast3-failed", "show");
    
          if(isUp==true){
            this.numberAlertManagerdown=0;
          }
          else{
            this.numberAlertManagerdown+=1;
            if(this.numberAlertManagerdown==5){
              timer(3000);
              this.restartAlertManager();
            }
  
          }
  
          // Hide the toast after 3 seconds
          setTimeout(() => {
            toast3.classList.remove("show");
          }, 7000);
        },
        (error) => {
          console.error('Error occurred while checking Alertmanager health:', error);
    
          toast3.innerHTML = "Error Getting Status Failed!";
          toast3.classList.remove("toast3-success");
          toast3.classList.add("toast3", "toast3-failed");
    
          // Hide the toast after 3 seconds
          setTimeout(() => {
            toast3.classList.remove("show");
          }, 7000);
        }
      );
    }
  
  
    restartPrometheus(): void {
      const toast5 = document.getElementById("toast-message5")!;
    
      this.healthCheckService.restartPrometheusContainer().subscribe(
        (isRestarted) => {
          if (isRestarted) {
            toast5.innerHTML = "Prometheus Restarted!";
            toast5.classList.remove("toast5-failed");
            toast5.classList.add("toast5", "toast5-success", "show");
          } else {
            toast5.innerHTML = "Failed to restart Prometheus!";
            toast5.classList.remove("toast5-success");
            toast5.classList.add("toast5", "toast5-failed", "show");
          }
    
          // Hide the toast after 3 seconds
          setTimeout(() => {
            toast5.classList.remove("show");
          }, 7000);
        },
        (error) => {
          console.error('Error occurred while restarting Prometheus:', error);
    
          toast5.innerHTML = "Failed to restart Prometheus!";
          toast5.classList.remove("toast5-success");
          toast5.classList.add("toast5", "toast5-failed", "show");
    
          // Hide the toast after 3 seconds
          setTimeout(() => {
            toast5.classList.remove("show");
          }, 7000);
        }
      );
    }
    
    restartAlertManager(): void {
      const toast6 = document.getElementById("toast-message6")!;
    
      this.healthCheckService.restartAlertManagerContainer().subscribe(
        (isRestarted) => {
          if (isRestarted) {
            toast6.innerHTML = "AlertManager Restarted!";
            toast6.classList.remove("toast6-failed");
            toast6.classList.add("toast6", "toast6-success", "show");
          } else {
            toast6.innerHTML = "Failed to restart AlertManager!";
            toast6.classList.remove("toast6-success");
            toast6.classList.add("toast6", "toast6-failed", "show");
          }
    
          // Hide the toast after 3 seconds
          setTimeout(() => {
            toast6.classList.remove("show");
          }, 7000);
        },
        (error) => {
          console.error('Error occurred while restarting AlertManager:', error);
    
          toast6.innerHTML = "Failed to restart AlertManager!";
          toast6.classList.remove("toast6-success");
          toast6.classList.add("toast6", "toast6-failed", "show");
    
          // Hide the toast after 3 seconds
          setTimeout(() => {
            toast6.classList.remove("show");
          }, 7000);
        }
      );
    }
  
  }  
  
  
    
  

