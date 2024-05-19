import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { IEmailRequest } from '../Models/EmailRequest';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  
  private apiUrl = 'https://localhost:7262/api/Emails/SendEmail';

  constructor(private http: HttpClient, private toastrService:ToastrService) { }

  sendEmail(emailRequest: IEmailRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, emailRequest).pipe(
      tap(() => {
        this.toastrService.success("Email sent Successfully!");
      }),
      catchError((err) => {
        console.error("Error sending email:", err);
        this.toastrService.error("Failed to send email.");
        throw err; // Rethrow the error to propagate it to the caller
      })
    );
  }
  
}
