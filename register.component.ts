import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  control: FormControl;
  submitted = false;
  firstName : any;
  lastName : any;
  Phone : any;
  AltPhone : any;
  email : any;
  adharCard: any;
  password: any;
  confirmPassword: any;
 
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {    
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['',Validators.required],
      Phone : ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      AltPhone : [''],
      email: ['', [Validators.required, Validators.email]],
      adharCard: ['' , [Validators.required ,
        Validators.minLength(10),
        Validators.maxLength(12),
        Validators.pattern('^([0-9]){12}$')]
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],         
    confirmPasswords: ['', Validators.required],
    },
    {
      validators:this.confirmPasswordMatch('password' , 'confirmPasswords') 
    }
    )  
  }

  confirmPasswordMatch(controlName: string,machingControlName: string) { // here we have the 'passwords' group
  return(formgroup : FormGroup) => {
    const control = formgroup.controls[controlName]
    const matchingControl = formgroup.controls[machingControlName]

    if(control.value !== matchingControl.value){
      matchingControl.setErrors({confirmPasswordMatch : true})
    }
    else{
      matchingControl.setErrors(null)
    }

  }   
}
   get f() { return this.registerForm.controls; }

  onSubmit(user : any) {
    console.log(user);
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return ;
      }

      // display form values on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }




}
