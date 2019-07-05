import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";

@Injectable()
export class AzureHttpClient {
  constructor(private http: Http) {
        
  }

  get(url: string, apiKey: string) {
    let headers = new Headers();
    headers.append('Ocp-Apim-Subscription-key', apiKey);
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url: any, apiKey: any, data: any) {
    let headers = new Headers();
    headers.append('Ocp-Apim-Subscription-Key', apiKey);
    return this.http.post(url, data, {
      headers: headers
    });
  }

}
