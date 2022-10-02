import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
valami: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
 onClick(){
  const url = `${environment.api}/user/users`;
  this.http.get(url).subscribe(data=> this.valami = data);
 }
}
