import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from '../../Services/client.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrl: './client-add.component.css'
})
export class ClientAddComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ClientAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private clientService:ClientService,private toastr:ToastrService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      homeAddress: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
      this.clientService.addnewClient(this.form.value).subscribe({
        next:()=>{
          this.toastr.success("User Added Successfully!");
          this.dialogRef.close(true); 
          this.clientService.getAllClient();
        },
        error:(err:any)=>{
          console.log(err.message);
        }
      })
      
    }
  }
  add(){
    this.clientService.getAllClient().subscribe({
      next:() => {
        
      },
      error:(err:any)=>{
        console.log(err.message);
      }
    })
  }

  onCancel() {
    this.dialogRef.close();
  }
}
