import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CompanyUserList } from 'app/modal/company-user-list.model';
import { StringUtils } from 'app/services/CommonUtils';
import { CompanyUserListService } from 'app/services/company-user-list/company-user-list.service';
import { LocalDataSource } from 'ng2-smart-table';
import { UserUpdateComponent } from '../user-update/user-update.component';

@Component({
  selector: 'ngx-company-user-list',
  templateUrl: './company-user-list.component.html',
  styleUrls: ['./company-user-list.component.scss']
})
export class CompanyUserListComponent implements OnInit {

  @Output('tableRefreshed') tableRefreshed=new EventEmitter();
  show:boolean=false;
  companyUserList: any ;
  public loading:boolean=false;

  constructor(private companyuserlistservice : CompanyUserListService) { }

  ngOnInit(): void {
    this.refreshUsers()
  }

  refreshClicked(){
    this.refreshUsers();
  }

  refreshUsers(){
    this.loading= true;
    this.companyuserlistservice.getUserListByType('TYPE_USER').subscribe(
      (data:any[])=>{
        console.log(data);
        this.companyUserList = data.reverse();
        this.loading= false;
      }
    )
   
  }


  onUserAdded(event){
    this.refreshUsers();
  }

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false, 
    },
    columns: {
      fullName: {
        title: 'Full Name',
        type: 'string',
        valuePrepareFunction: function(value) {
          return StringUtils.toTitleCase(value);
        }
      },
      email :{
        title : 'Email',
        type  : 'string',
        valuePrepareFunction: (value) => {
          return (value+"").toLocaleLowerCase();
        }
      },
      active :{
        title : 'Active',
        valuePrepareFunction: (active) => {
          return (active==="true") ? "Active" : "In-Active";
        }
      },
      companyName :{
        title : 'Company Name',
        type  : 'string',
        valuePrepareFunction: function(value) {
          return StringUtils.toTitleCase(value);
        }
      },
      Edit : {
        title : 'Edit',
        type  : 'custom',
        valuePrepareFunction: (cell, row) => {
         return row;
      },
       renderComponent : UserUpdateComponent
      },  
    }}

 
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
