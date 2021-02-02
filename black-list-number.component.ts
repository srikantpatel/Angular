import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { BlackListService } from 'app/services/black-list-number/black-list.service';
import { SenderIdService } from 'app/services/sender-Id/sender-id.service';

@Component({
  selector: "ngx-black-list-number",
  templateUrl: "./black-list-number.component.html",
  styleUrls: ["./black-list-number.component.scss"],
})
export class BlackListNumberComponent implements OnInit {
  show: boolean = false;
  senderIdData: any[];

  constructor(
    private blackListService: BlackListService,
    private router: Router,
    private toastService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.blackListService.getBlackListNumber().subscribe((data: any[]) => {
      this.senderIdData = data.reverse();
    });
  }

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      blackListNumber: {
        title: "BlackList Number",
        type: "string",
      },
      createdBy: {
        title: "CreatedBy",
        type: "string",
      },
      createdAt: {
        title: "CreatedAt",
        type: "string",
      },
    },
  };

  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      console.log(event.data.senderId);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
