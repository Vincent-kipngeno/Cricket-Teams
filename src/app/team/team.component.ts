import { Component } from '@angular/core';
import { TeamsService } from '../teams-service/teams.service';
import { Team } from '../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  no_teams: any;
  teams!: Team[];

  constructor(private teamsService: TeamsService, private router: Router) { }

  ngOnInit(): void {
    this.teamsService.getAllTeams().subscribe(teams => {
      this.teams = teams;
      this.no_teams = (teams.length == 0);
    });
  }

  delete(id: string) {
    console.log(id + " id");
    this.teamsService.deleteTeam(id).subscribe(response => {
      this.router.navigate(["/"]);
    });
  }
}
