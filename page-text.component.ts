import { Component, OnInit } from '@angular/core';
import { PagignationService } from '../pagignation.service';

@Component({
  selector: 'app-page-text',
  templateUrl: './page-text.component.html',
  styleUrls: ['./page-text.component.css']
})
export class PageTextComponent implements OnInit {
  userdata: any;
  totalrecord : any;
  p : number = 1;

  constructor(private service : PagignationService) {}

  ngOnInit() {
     this.service.getUserInfo().subscribe(
       
      data =>{
         this.userdata = data;
        console.log(this.userdata);
      }
       
     )
  }

}
