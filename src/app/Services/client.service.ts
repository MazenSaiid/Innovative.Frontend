import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClient } from '../Models/Client';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'https://localhost:7262/api/Clients/';

  constructor(private http: HttpClient,private toastrService:ToastrService) { }

  getAllClient(): Observable<IClient[]> {
    return this.http.get<IClient[]>(this.apiUrl + 'GetAllClients').pipe(
      catchError((err: HttpErrorResponse) => {
        console.error('Error fetching clients:', err.message);
        return throwError(err);
      })
    );
  }
  
  getClientById(id:number){
    return this.http.get<IClient>(this.apiUrl+'GetClientById/'+id);
  }
  addnewClient(newclient:IClient){
    return this.http.post(this.apiUrl+'AddClient',newclient);
  }
  updateClient(updateClient:IClient){
    return this.http.put(this.apiUrl+'UpdateClient',updateClient);
  }
  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}DeleteClient/${id}`, { responseType: 'text' }).pipe(
      map(response => {
        try {
          return JSON.parse(response);
        } catch (e) {
          return response;
        }
      }),
      catchError((err: HttpErrorResponse) => {
        console.error('Error deleting client:', err.message);
        this.toastrService.error('Error deleting client: ' + err.message);
        return throwError(err);
      })
    );
  }
  
}
