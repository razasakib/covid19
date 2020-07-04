import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/globle-data';
import { DateWiseData } from 'src/app/models/date-wise-data';


@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  data: GlobalDataSummary[];
  countries: string[] = [];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  loading = true;
  show: boolean = false
  selectedCountryData: DateWiseData[];
  dateWiseData;

  constructor(private service: DataServiceService) { }

  ngOnInit(): void {
    //dateWiseData
    this.service.getDateWiseData().subscribe(result => {
      this.dateWiseData = result;
      // console.log(result);
    })



    this.service.getGlobalData().subscribe(result => {
      const response = JSON.stringify(result)

      this.data = JSON.parse(response);
      this.data.forEach(cs => {
        this.countries.push(cs.country)
        this.loading = false;
      })
    
    })
  }
  updateData(country: string) {
    //  console.log(country);
    this.data.forEach(cs => {
      if (cs.country == country) {
        this.totalActive = cs.active
        this.totalConfirmed = cs.confirmed
        this.totalDeaths = cs.deaths
        this.totalRecovered = cs.recovered
      }
    })
    this.selectedCountryData = this.dateWiseData[country];
    // console.log(this.selectedCountryData);

  }

}
