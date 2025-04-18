import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private API_SERVER = "http://localhost:8080/persona/";

  constructor(
    private httpClient: HttpClient
  ) { }


public getAllPersonas(): Observable<any> {
  return this.httpClient.get(this.API_SERVER);
}

public savePersona(persona:any): Observable<any>{
  return this.httpClient.post(this.API_SERVER,persona);
}

}