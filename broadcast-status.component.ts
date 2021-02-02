import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BroadcastMessageService } from '../../services/broadcast-message/broadcast-message.service';
import { LocalDataSource } from 'ng2-smart-table';  
import { DownloadReportComponent } from '../cell/download-report/download-report.component';
import { DateUtils } from 'app/services/CommonUtils';

@Component({
  selector: 'ngx-broadcast-status',
  templateUrl: './broadcast-status.component.html',
  styleUrls: ['./broadcast-status.component.scss']
})
export class BroadcastStatusComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();

  @Output('tableRefreshed') tableRefreshed=new EventEmitter();
 
  constructor(private broadcastMessageService:BroadcastMessageService  ) { }

  public loading:boolean=false;

  ngOnInit(): void {
     this.refreshBroadcastTable();
  }
 
  refreshClicked() {
    this.refreshBroadcastTable();
  }

  refreshBroadcastTable() {
    this.loading=true;
    this.broadcastMessageService.getBroadcast().subscribe((data:any[]) => {  
      this.source.load(data);       
      this.loading=false;
     });
  }

  settings = {    
    actions: {
      add: false,
      edit: false,
      delete: false, 
    },
    columns: { 
      type : {
        title: 'Type',
        type: 'html',
        valuePrepareFunction: function(value) {
          return value;
        } 
      },
      broadcastName: {
        title: 'Name',
        type: 'string',
      }, 
      createdAt: {
        title: 'Submitted',
        type: 'string',
        valuePrepareFunction : (date) => {
          return DateUtils.dateDiff(date);
        }          
      },  
      statusAudit: {
        title: 'Status',
        type: 'string',
        valuePrepareFunction : (statusAudit) => {
            let outcome:string=statusAudit[statusAudit.length-1]['status'].toString();  
            return outcome;
        }        
      },
      header : {
        title: 'Details',
        type: 'string',
        valuePrepareFunction : (header) => {
            return header.message + " = " + header.senderId+ " = " + header.dlt;
        }
      },      
      submittedBy : {
        title: 'Submitted By',
        type: 'string', 
      },  
      submitterCompanyName : {
        title: 'Reseller',
        type: 'string', 
      },
      payload : {
        title: 'Volume',
        type: 'html',
        valuePrepareFunction: function(value) {
          return '<div class="smartTableNumber"> ' + value.volume.toFixed(0) + ' </div>' 
        }
      },
      downloadLink : {
        title: 'Report',
        type: 'custom',
        valuePrepareFunction: (cell, row) => {
          return row;
       },
       renderComponent: DownloadReportComponent, 
      },
    },
  };

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  } 

}
