import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/globle-data';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  
  loading = true;
   dataTable = [];
  globalData: GlobalDataSummary[];
  chart={
    PieChart:"PieChart",
    ColumnChart:"ColumnChart",
    LineChart:"LineChart",

    height: 500,
    options: {
      animation:{
        duration:1000,
        easing:'out'
      },
      is3D:true
    }
  }
  constructor(private dataService: DataServiceService) { }

  initChart(caseType: string) {
    this.dataTable=[];
   // dataTable.push(["Country", "Cases"])
    this.globalData.forEach(cs => {
      let value:number;
      if (caseType == 'c')
        if (cs.confirmed > 5000)
           value=cs.confirmed;
         
      if (caseType == 'd')
        if (cs.deaths >1000)
            value=cs.deaths;
         
      if (caseType == 'r')
        if (cs.recovered > 2000)
         value=cs.recovered;
      if (caseType == 'a')
        if (cs.active > 5000)
         value=cs.active;

        this.dataTable.push([
           cs.country,value
         ])
    })

   
      
   
    
  }

  ngOnInit(): void {
    this.dataService.getGlobalData()
      .subscribe(
        {
          next: (result) => {
            console.log(result);
            const data = JSON.stringify(result)
            this.globalData = JSON.parse(data)
            result.forEach(cs => {
              if (!Number.isNaN(cs.confirmed)) {
                this.totalActive += cs.active
                this.totalConfirmed += cs.confirmed
                this.totalDeaths += cs.deaths
                this.totalRecovered += cs.active
               
              }
            })
            this.initChart('c');
          },
          complete:()=>{
            this.loading=false;
          }
        })

  }
  updateChart(input: HTMLInputElement) {
    console.log(input.value);
   this.initChart(input.value)
  }
}
