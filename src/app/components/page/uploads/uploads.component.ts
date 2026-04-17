import { Component } from '@angular/core';
import { Moment } from 'src/app/Moments';


@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent {
  btnText = 'Share';

  async createHandler(moment: Moment){
    const formData = new FormData();

    formData.append("title", moment.title);
    formData.append("description", moment.description);

    if (moment.image){
      formData.append('image', moment.image);
    }
  }
}
