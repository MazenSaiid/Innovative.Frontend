import { Component,OnInit } from '@angular/core';
import { EmailService } from '../../Services/email.service';
import { MatDialog } from '@angular/material/dialog';
import { ClientAddComponent } from '../client-add/client-add.component';
import { ToastrService } from 'ngx-toastr';
import { IEmailRequest } from '../../Models/EmailRequest';
import { IClient } from '../../Models/Client';
import { ClientService } from '../../Services/client.service';
import { ClientUpdateComponent } from '../client-update/client-update.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {
  clients: IClient[] = [];
  emailRequest: IEmailRequest ={
    to: '',
    subject: '',
    body: ''
  };


  constructor(private emailService: EmailService,private clientService:ClientService,private dialog: MatDialog,private toastrService: ToastrService) { }
  ngOnInit(): void {
    this.getAll();
  }
  openAddDialog(): void {
    const dialogRef = this.dialog.open(ClientAddComponent, {
      width: '600px',
      height: '300px',
      data: {} // You can pass data to the dialog here
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // Handle the result if necessary
      
      this.getAll();
    });
  }
  openUpdateDialog(client: IClient): void {
    const dialogRef = this.dialog.open(ClientUpdateComponent, {
      width: '600px',
      height: '300px',
      data: client // Pass the selected client data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The update dialog was closed', result);
      // Refresh the list after updating a client
      this.getAll();
    });
  }
  getAll(){
    this.clientService.getAllClient().subscribe({
      next:(values:IClient[]) => {
        this.clients = values;
        console.log(this.clients);
      },
      error:(err:any)=>{
        console.log(err.message);
      }
    })
  }
  
  delete(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.clientService.deleteClient(id).subscribe({
        next: () => {
          this.toastrService.success('User Deleted Successfully!');
          this.getAll(); // Refresh the list after deletion
        },
        error: (err: any) => {
          console.log(err.message);
          this.toastrService.error('Error deleting user: ' + err.message);
        }
      });
    }
  }

  sendEmail(email: string) {
    this.emailRequest.to = email;
    this.emailRequest.body = 'This is a test email.';
    this.emailRequest.subject = 'Test Subject';

    this.emailService.sendEmail(this.emailRequest).subscribe(
      {
        next:(value:any) =>{
          console.log(value);
          this.toastrService.success("Email sent Successfully!")
        },
        error:(err:any)=>{
          console.log(err.message);
          this.toastrService.error('Error Sending Email: ' + err.message);
        }
      });
  }
}
