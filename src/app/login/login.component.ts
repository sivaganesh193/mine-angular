import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Apollo, gql, QueryRef} from 'apollo-angular';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private apollo:Apollo,private loginService: LoginService) { }
  
  ucode:number
  rollno:number
  errorMsg1: string=""
  errorMsg2: string=""
  hasError1:boolean=false;
  hasError2:boolean=false;
  loginForm: FormGroup;
  queryRef: QueryRef<any>;
  teamData:any;
  
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      UCode: new FormControl('',Validators.required),
      RollNo: new FormControl('',Validators.required)
    });
  }

  getGameData(id:number) {
    // const req = gql`
    //   query teamscore($data: teamScoreQueryInput!){
    //     teamscore(data:$data){
    //       team_id
    //     }
    //   }
    // `;
    // this.apollo.watchQuery<any>({
    //   query: req,
    //   variables: {
    //       data: {
    //           team_id: id
    //       },
    //   },
    // }).valueChanges.subscribe((result) => {
    //   if(result.data.teamscore==null){
    //     this.errorMsg="Invalid Code";
    //     this.hasError=true;
    //   }
    //   else if(result.data.teamscore.team_id==null){
    //     this.errorMsg="5 rounds over";
    //     this.hasError=true;
    //   }
    //   else{
    //     this.loginService.team_id=result.data.teamscore.team_id;
    //     this.router.navigateByUrl('game');
    //   }
   
    // });
  }
  
  setError1() {
    this.errorMsg1 = "Team code doesnt exist";
    this.hasError1 = true;
    this.hasError2 = false;
  }

  setError2() {
    this.errorMsg2 = "Invalid roll no";
    this.hasError2 = true;
    this.hasError1 = false;
  }

  setError3() {
    this.errorMsg2 = "5 Rounds over";
    this.hasError2 = true;
    this.hasError1 = false;
  }

  submit(){
    this.loginService.login(this.loginForm.value).valueChanges.subscribe((result) => {
      this.teamData=result.data.teamLogin;
      console.log(this.teamData);
      
      if(this.teamData==null){
        this.setError1();
      }

      if(this.teamData.roll_no===this.loginForm.value.RollNo){
        if(this.teamData.current_round===5){
          this.setError3();
        }
        else{
          console.log("hello");
          this.loginService.team_id=this.teamData.team_id;
          this.router.navigateByUrl('game');
        }      
      }
      else{
        this.setError2();
      }

    });

    // this.getGameData(this.ucode);
  }

}
