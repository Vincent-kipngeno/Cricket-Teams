import { Component } from '@angular/core';
import { Team } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamsService } from '../teams-service/teams.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent {
  noPlayers: any;
  team?: Team;

  constructor(private route: ActivatedRoute, private teamsService: TeamsService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const name = params['name'];
      console.log(params);
      // Use the name to query the team from the TeamsService
      this.teamsService.getTeamByName(name).subscribe(team => {
        console.log(team);
        this.team = team[0];
        this.noPlayers = this.team.players.length === 0;
      });
    });
  }

  delete(id: string) {
    console.log(id + " id");
    this.teamsService.deleteTeam(id).subscribe(response => {
      this.router.navigate(["/"]);
    });
  }

  deletePlayer(playerName: string) {
    this.team!.players = this.team!.players.filter((player: any) => player.fullName !== playerName);
    this.teamsService.updateTeam(this.team!.id, this.team!).subscribe(response => {
      this.router.navigate(['/teams/' + this.team?.name]);
    });
  }
}
