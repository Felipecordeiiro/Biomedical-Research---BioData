import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser';
import { Moment } from 'src/app/Moments';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {

  @Output() onSubmit = new EventEmitter<Moment>()
  @Input() btnText!: string;

  momentForm!: FormGroup;

  constructor(){}

  ngOnInit(): void{
    this.momentForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(''),

    })
  }

  get title(){
    return this.momentForm.get('title')!;
  }
  get description(){
    return this.momentForm.get('description')!;
  }

  onFileSelected(event: any){
    const file: File = event.target.files[0];

    this.momentForm.patchValue({ image: file });
  }

  Submit(){

    if(this.momentForm.invalid){
      return
    }
    console.log(this.momentForm.value);
    
    this.onSubmit.emit(this.momentForm.value);
  }
}
