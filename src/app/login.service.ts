import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private apollo: Apollo) {}

  team_id: number=-1;
  private TEAMSCORE = gql`
    query teamscore($data: teamScoreQueryInput!){
      teamscore(data:$data){
        team_id
        current_round
        r1_time
        r2_time
        r3_time
        r4_time
        r5_time
        r1_clicks
        r2_clicks
        r3_clicks
        r4_clicks
        r5_clicks
      }
    }
  `;
  
  private UPDATESCORE = gql`
    mutation updateScore($data: updateScoreInput!){
      updateScore(data:$data)
    }
  `;

  private NEXTSCORE = gql`
    mutation nextRound($data: updateInput!){
      nextRound(data:$data)
    }
  `;

  getTeamScore(id: number){
    return this.apollo.watchQuery<any>({
      query: this.TEAMSCORE,
      variables: {
          data: {
              team_id: id
          },
      },
    });
  }

  updateScore(data: any){
    console.log(data);
    
    return this.apollo.mutate({
      mutation: this.UPDATESCORE,
      variables: {
        data,
      },
    });
  }

  nextRound(data: any){
    return this.apollo.mutate({
      mutation: this.NEXTSCORE,
      variables: {
        data,
      },
    });
  }

}
