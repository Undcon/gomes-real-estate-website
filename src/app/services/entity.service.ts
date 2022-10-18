import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  private headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  public baseUrl = environment.url;
  public tenantId = environment.tenantId

  constructor(
    protected http: HttpClient
  ) {}

  public getAllCustomUrl(url: string = "", pageNumber: number = 0, sizeNumber: number = 10, filters?: Map<string, string>, orderBy: string = ""): any {
    let filterAsString = '';
    if (filters) {
      filters.forEach((value: string, key: string) => {
        if (value) {
          filterAsString += ',' + key + value;
        }
      });
      //Elimina a primeira vírgula do filtro
       filterAsString = filterAsString.substr(1);
    }

    let params: {};
    params = { id: this.tenantId, filter: filterAsString, page: pageNumber, size: sizeNumber, orderBy: orderBy ? orderBy : null };
    return this.http.get(`${this.baseUrl}${url}`, { params, headers: this.headers });
  }

  public get(url: string = "", id: number): any {
    const params = { id: this.tenantId };
    return this.http.get(`${this.baseUrl}${url}/${id}`, { params, headers: this.headers });
  }

  public getCustomUrl(url: string): any {
    const params = { id: this.tenantId };
    return this.http.get(`${this.baseUrl}${url}`, { params, headers: this.headers });
  }
}
