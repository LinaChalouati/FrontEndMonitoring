import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DroppedItemsService } from '../services/droppeditems.service';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
@Component({
  selector: 'app-paneledit',
  templateUrl: './paneledit.component.html',
  styleUrls: ['./paneledit.component.css']
})
export class PaneleditComponent implements OnInit {
  @Input() PanelId: String | undefined;
  @Output() closed = new EventEmitter<boolean>();

  constructor( private activatedRoute: ActivatedRoute,private http:HttpClient,private route : Router) { }
  Status=false;
  projectName!:string;
  ipAddresses: {ipaddr: string, port: string}[] = [];

  ngOnInit() {
      
console.log("this.PanelId"+this.PanelId);
  }


  closeModal() {
    console.log("Close button clicked");
    this.closed.emit();
    }

    panelNewName!:string;
    onSubmit(){
     
      const newChartTpe=this.getTheNewChart();
      console.log(newChartTpe);
      if(this.panelNewName!=""){
        const newChartName=this.panelNewName;
        console.log(newChartName);
      }



      

    }

    barchart=false;
    piechart=false;
    gaugechart=false;
    linechart=false;
    xychart=false;
    heatmapchart=false;
    statchart=false;
    horizchart=false;
    getTheNewChart(){
      if(this.barchart){
        return "barchart";

      }
      if(this.piechart){
        return "piechart";


      }
      if(this.gaugechart){

        return "gauge";

      }
      if(this.linechart){

        return "timeseries";


      }
      
      if(this.statchart){
        return "stat";


      }
      if(this.horizchart){
        return "bargauge";


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
