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

interface AlertEmailInfo{
  alertname:string;
  instance:string;
  receiver:string;
  emails:string;
}

@Component({
  selector: 'app-advancedmetricssettings',
  templateUrl: './advancedmetricssettings.component.html',
  styleUrls: ['./advancedmetricssettings.component.css']
})


// mazeli lena les deux functions taa l add panel 
// fl sonar mrigla
// fl cas taa k8s à savoir 
// mazeli bch nzid n3adi l id fl service
export class AdvancedmetricssettingsComponent implements OnInit{


projectName!:string;
ipAddressesArray!: string;
appType!: string;
nbms!: Number;
status = true;
ipAddresses!:string[];
showInfo=true;
i=0;
nbsubmit=0;
advancedMetricselected!: {id:number, column:string, title: string; metric: string; }[];
checkSonar=false;
checkK8s=false;
msID!:number[];
leeverything!:{id:number, column:string, title: string; metric: string; }[];
idms=0;
selectedms=0;
isSonar=false;
isK8s=false;
alertname!:string;
instance!:string;
emails!:string[];
receiver!:string;
SonarQubeMetric=true;  
K8sMetric=true;  


sonarQubeProjectKey = '';
sonarQubeProjectName = '';
Job='';
Label='';
Container='';
Node='';
Service='';
Pod='';
Namespace='';
dashboardUrl: string="";
uid: string='';
alertMode:boolean=false;
constructor(private router: Router, private http: HttpClient, private activatedRoute: ActivatedRoute,private dataService: DataService) {}
  filteredIPAddresses: any[] = [];

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.projectName = params['projectName'];
      this.ipAddressesArray = params['ipAddressesArray'];
      this.appType = params['appType'];
      this.nbms = params['nbms'];
      this.alertMode=params['alertMode'];
    });
    console.log("nbms"+this.nbms);
    console.log("metrics" + this.dataService.advancedMetricselected[0].metric);
    this.ipAddresses = this.ipAddressesArray.split(',');
    this.leeverything = this.dataService.advancedMetricselected;
    this.getMsId();
    console.log("msid"+this.msID);
  //  this.showTeamInfo(this.msID[0]);
  }
  
  getMsId() {
    this.msID = [];
    if (this.dataService.advancedMetricselected) {
      for (let j = 0; j < this.dataService.advancedMetricselected.length; j++) {
        if(!this.msID.includes(Number(this.dataService.advancedMetricselected[j].id -1))){
          this.msID.push(Number(this.dataService.advancedMetricselected[j].id -1) );

        }
      }
      console.log("this.msID 1: " + this.msID);
  
      this.filteredIPAddresses = this.ipAddresses.filter((_, index) => {
        console.log("index"+index);
        return this.msID.includes(index);
      });
  
      console.log("this.msID: " + this.filteredIPAddresses);
    }
  }
  
  showTeamInfo(receiver: any) {
    this.showInfo = true;
    this.instance=receiver;
    this.idms=receiver.id;
    this.i=receiver;
    console.log("receiver hereeee"+receiver);
    this.selectedms=receiver.id;

   console.log("this.dataService.advancedMetricselected"+this.dataService.advancedMetricselected[receiver].id);
   console.log("this.dataService.advancedMetricselected.length"+this.dataService.advancedMetricselected.length);
   this.checkSonarMetric(receiver) ;
    this.checkK8sMetric(receiver);
    console.log("this.isK8s"+this.isK8s);
    console.log("this.isSonar"+this.isSonar);

  }

    //bugg
    checkSonarMetric(indice: number): boolean {
      const sonarMetrics = ['bugs', 'vun', 'smells', 'dup', 'coverage', 'junit'];
      console.log(this.dataService.advancedMetricselected.length);
      console.log("this.indice"+indice);

      for (let j = 0; j < this.dataService.advancedMetricselected.length; j++) {
        console.log("f sonar"+this.dataService.advancedMetricselected[j].id);
        console.log("f sonar2"+this.dataService.advancedMetricselected[j].metric);

        if (this.dataService.advancedMetricselected[j].id == indice+1) {
          console.log("f sonar");
          const hasSonarMetric = sonarMetrics.includes(this.dataService.advancedMetricselected[j].metric);
          if (hasSonarMetric) {
            this.isSonar = true;
            console.log("this.isSonar"+this.isSonar);
            return true;
          }
        }
      }
    
      this.isSonar = false;
      return false;
    }
    

  checkK8sMetric(indice:number) {
    console.log("dkhal lena");
    const k8sMetrics = [
      "clusterpodusage",
      "clustercpuusage",
      "clustermemoryusage",
      "clusterdiskusage",
      "clusterpodcapacity",
      "clustercpucapacity",
      "clustermemorycapacity",
      "clusterdiskcapacity",
      "replicauptodate",
      "replica",
      "replicaupdated",
      "replicaunavailable",
      "nbnodes",
      "nodesoutofdisk",
      "nodesunavailable",
      "podsrunning",
      "podspending",
      "podsfailed",
      "podsuccess",
      "podsunkown",
      "containerrun",
      "containerwait",
      "containertermn",
      "containerrestart",
      "containercpu",
      "containermemo",
      "jobsuccess",
      "jobsfailed"
    ];
    this.isK8s = false;

    for (let j = 0; j < this.dataService.advancedMetricselected.length; j++) {
      console.log("hereeeeee" + (this.dataService.advancedMetricselected[j].id == indice+1));
      if (this.dataService.advancedMetricselected[j].id == indice+1) {
        const hasK8sMetric = k8sMetrics.includes(this.dataService.advancedMetricselected[j].metric);
        if (hasK8sMetric) {
          console.log("f k8s");
          this.isK8s = true;
          return true;
        }
      }
    }
  
    return false;
    }
  

  addToggle()
  {
    this.status = !this.status;
  }
  selectedItem: number = 2; 
  selectItem(index: number): void {
    this.selectedItem = index;
  }
  goHome() {
    this.router.navigate(['/home']);
  }

  goDashboard() {
    this.router.navigate(['/dashboard']);
  }


 

  saveChanges(idms:number) {
    const sonarQubeKey = this.sonarQubeProjectKey;
   // const Job = this.Job;
  //  const Label = this.Label;
 //   const Container = this.Container;
  //  const Node = this.Node;
   // const Service = this.Service;
   // const Pod = this.Pod;
 //   const Namespace = this.Namespace;
 console.log()
    const dashboardTitle = this.projectName;
    const PanelTitle= this.dataService.advancedMetricselected[idms].title;
    const target= this.dataService.advancedMetricselected[idms].metric;
    const [ip,port]=this.filteredIPAddresses[idms].split(":");
    console.log("instance"+this.filteredIPAddresses[idms]);
    const tag=this.dataService.advancedMetricselected[idms].id;
    const panelChart=this.dataService.advancedMetricselected[idms].column;
   // const id=this.advancedMetricselected[this.i].id;
   console.log("sonarkey"+sonarQubeKey);
   console.log("dashboardTitle"+dashboardTitle);

   console.log("PanelTitle"+PanelTitle);

   console.log("target"+target);

   console.log("sonarkey"+sonarQubeKey);

   console.log("ip"+ip);
   console.log("port"+port);

   console.log("panelChart"+panelChart);

   console.log("tag"+tag);

    const paneldata={
      dashboardTitle :dashboardTitle,
      PanelTitle :PanelTitle,
      target :target,
      panelChart :panelChart,
      //ip :ip,
     // port :port,
      tag :this.idms

    }
    console.log("paneldata"+paneldata);
    
    if (this.SonarQubeMetric) {
      const sonardata = {
        sonarQubeKey: sonarQubeKey,
      }
     

  timer(100)
  .pipe(
    concatMap(() => this.http.post('http://localhost:8080/panel', null, { params: { dashboardTitle, PanelTitle, target, panelChart, ip, port, tag } })),
    catchError((error) => {
      console.error('Error adding panel:', error);
      return throwError(error);
    })
  )
  .subscribe(() => {
    console.log('Panel added successfully.');
  });
     /* timer(100)
      this.http.post('http://localhost:8080/panel', null, { params: { dashboardTitle, PanelTitle, target, panelChart, ip, port, tag } })
      .pipe(
        catchError((error) => {
          console.error('Error adding panel:', error);
          return throwError(error);
        })
      )
      .subscribe(() => {
        console.log('Panel added successfully.');
      });*/
    
    }
  
   /* if (this.K8sMetric) {
      const k8sdata = {
        Job: Job,
        Label: Label,
        Container: Container,
        Node: Node,
        Service: Service,
        Pod: Pod,
        Namespace: Namespace,
      }
      // this.http.post()
    }*/
    this.nbsubmit+=1;

    this.proceedToNextMicroservice();
    this.resetInputFields();
  }
  
  proceedToNextMicroservice() {

    if(this.nbsubmit==this.msID.length){
      console.log("be3 w rawa7");
      this.showInfo=!this.showInfo;
      
      if (this.alertMode==true) {
        this.router.navigate(['/addalert', {
          projectName: this.projectName,
          ipAddressesArray: this.ipAddressesArray,
          nbms: this.nbms,
          appType: this.appType,
        }]);
      } 
      else {
        this.router.navigate(['/dashboard', {
          projectName: this.projectName,
          ipAddressesArray: this.ipAddressesArray,
          appType: this.appType,
          nbms: this.nbms
        }]);
      }
    }
    this.i+=1;
    const element = document.getElementById('top-of-page');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

  }
  
  resetInputFields() {
    this.sonarQubeProjectKey = '';
    this.sonarQubeProjectName = '';
    this.Job = '';
    this.Label = '';
    this.Container = '';
    this.Node = '';
    this.Service = '';
    this.Pod = '';
    this.Namespace = '';
  }
  
  

}