import { Component } from '@angular/core';
import { Moment } from 'src/app/Moments';
import { MommentService } from 'src/app/services/momment/momment.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  allMoments: Moment[] = []
  moments: Moment[] = []

  constructor(private momentService: MommentService){}

  ngOnInit(){
    
  }



}
