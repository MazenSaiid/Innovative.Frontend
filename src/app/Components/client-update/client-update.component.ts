import { Component } from '@angular/core';
import { ClientService } from '../../Services/client.service';
import { ClientAddComponent } from '../client-add/client-add.component';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrl: './client-update.component.css'
})
export class ClientUpdateComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ClientUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private clientService:ClientService,private toastr:ToastrService
  ) {
    this.form = this.fb.group({
      name: [data.name, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      phoneNumber: [data.phoneNumber, Validators.required],
      homeAddress: [data.homeAddress, Validators.required]
    });
  }
  onCancel() {
    this.dialogRef.close();
  }
  onSubmit(): void {
    if (this.form.valid) {
      const updatedClient = { ...this.data, ...this.form.value };
      this.clientService.updateClient(updatedClient).subscribe({
        next: () => {
          this.toastr.success("User Updated Successfully!");
          this.dialogRef.close(true); // Close the dialog and pass back the updated client
          this.clientService.getAllClient();
        },
        error: (err: any) => {
          this.toastr.error("Error updating user: " + err.message);
        }
      });
    }
  }
  
}
