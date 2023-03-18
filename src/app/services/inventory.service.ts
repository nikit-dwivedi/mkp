import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { environment } from "../../environments/environment.prod";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class InventoryService {
  private apiUrl = "https://inventory.fablocdn.com";
  constructor(private http: HttpClient) {}

  token: any = "eyJhbGciOiJQUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjBhNDMyZiIsInJvbGVJZCI6IjJmMjdlYjgyIiwicm9sZSI6Mywic3ViUm9sZSI6Nzc3LCJpYXQiOjE2Nzg3MzA4MjIsImV4cCI6MTY4MTMyMjgyMn0.Jl8sMxeUe51eGPQTgifEDPGluR-hGQ7h1vtfklW41uNrXSYwuwMZtrfDXq77XvsewmiM3KxI67lbLthBXk1E2gYDH_9VRavzFDgEa4_ZK6b-_AhvlylGzXKpfAUb9mq4N7zNwe6dwjodfU0gCBWfZR-csDWYod55YCe1zcbNsk4T8aWWtS5N38ilJBJN6x8Gfg3hybVHnHKXaF5IQzQDJ4GWnUq67h0cBFRxGk_84E49xdBOOFIzW8QDI1Pyg8nCAnjsnO72Ub1teWO7-m-IraRGUTx2IOa62nMNjBgscS3TQiV7wudppTwcao2Gnm8-XJe1oOR2srCDvUv6M0ntwcvViR9nLX7M099XGrb9Vi9FESPWPMiNHM_oU03Ky-6cogPQuo-JkOXu9vvNT4_6lDAi0mmQ4rKrJ6CgB2gtEbMebdjtJyx-tcS8nsD7zhcEFXMQ-qmZlOmsB2hww913PxqAqlhebFB4ra9YSk47YtgCVzQTcivQIscNXX_t58mvUllFTnZWecTwzEgrqlK2AQq_ZWJNa-jfc_qe9pPXAbQEG9unatEpdNm_VChpWscvIvv6Dy0tK-tHBRtjDHXbMuJVCHlwV7MhxNDykEtw7shTlklGwtG3ohooA9a573YicqqbYW-CTC8XBjoIARRDUWm9TsWT3d7xuytRb3tIH98";
  httpOptions = { headers: new HttpHeaders({ Authorization: `Bearer ${this.token}` }) };


  getAllCuisine(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/outlet/cuisine", this.httpOptions).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
