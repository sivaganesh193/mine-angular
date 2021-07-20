import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql} from 'apollo-angular';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private apollo:Apollo,private loginService: LoginService) { }
  ibox:number
  errorMsg: string="Invalid / Expired Code"
  hasError:boolean=false;
  ngOnInit(): void {
    
  }

  getGameData(id:number) {
    const req = gql`
      query teamscore($data: teamScoreQueryInput!){
        teamscore(data:$data){
          team_id
        }
      }
    `;
    this.apollo.watchQuery<any>({
      query: req,
      variables: {
          data: {
              team_id: id
          },
      },
    }).valueChanges.subscribe((result) => {
      if(result.data.teamscore==null){
        this.errorMsg="Invalid Code";
        this.hasError=true;
      }
      else if(result.data.teamscore.team_id==null){
        this.errorMsg="5 rounds over";
        this.hasError=true;
      }
      else{
        this.loginService.team_id=result.data.teamscore.team_id;
        this.router.navigateByUrl('game');
      }
   
    });
  }
  
  oset(){
    this.hasError=false;
    console.log(this.loginService.team_id);
    
  }

  onClick(){
    this.getGameData(this.ibox);
  }

}
