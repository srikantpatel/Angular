import { EventEmitter, Output, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbToastrService } from '@nebular/theme';
import { User } from 'app/modal/user.model';
import { UserService } from 'app/services/user/user.service';


@Component({
  selector: 'ngx-company-user',
  templateUrl: './company-user.component.html',
  styleUrls: ['./company-user.component.scss']
})
export class CompanyUserComponent implements OnInit {

  @ViewChild("companyUserForm", { static: false }) companyUserForm: NgForm;
  @Output("userAdded") userAdded = new EventEmitter();


  firstForm: FormGroup;
  secondForm: FormGroup;
  companyuser: User = new User();
  constructor(private fb: FormBuilder, private userService: UserService,
    private authService: NbAuthService, private toastService: NbToastrService) {
  }

  private loggedUser: User;

  ngOnInit() {
    this.firstForm = this.fb.group({
      fullName: ['', Validators.required],
      mobileNo: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      email: ['', Validators.required],
    });
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          let payload = token.getPayload();
          this.loggedUser = {
            companyName: payload.companyName
          } as User;
        }
      });
  }
  ngAfterViewInit() {
    this.setFocus();
  }

  setFocus() {
    document.getElementById("fullName").focus();
  }

  public formsubmit() {
    console.log(this.companyuser)
    this.companyuser.type = "TYPE_USER";

    this.userService.createUser(this.companyuser).subscribe(
      (status) => {
        if (status)
          this.toastService.success("User Add successfully", "User Add Request SuccessFully");
        this.userAdded.emit();

      })
  }


  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

}
