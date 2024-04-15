import { Component } from '@angular/core';
import { TeamsService } from '../teams-service/teams.service';
import { Team } from '../models';
import { AuthService } from '../auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  teamData: any = {};
  stats: any = [];


  constructor(private teamsService: TeamsService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.teamsService.getAllTeams().subscribe((data: any) => {
      this.teamData = data;
      console.log(data);
      this.stats = [
        { title: 'Total Teams', value: this.teamData.length },
        { title: 'Total Players', value: this.getTotalPlayersCount() },
        { title: 'Average Price per Player', value: this.getAveragePrice() + ' crores' },
        { title: 'Playing Players', value: this.getPlayingPlayersCount() },
        { title: 'Non-Playing Players', value: this.getTotalPlayersCount() - this.getPlayingPlayersCount() },
        { title: 'All-Rounders', value: this.getPlayerCountByRole('All-rounder') },
        { title: 'Batsmen', value: this.getPlayerCountByRole('Batsman') },
        { title: 'Bowlers', value: this.getPlayerCountByRole('Bowler') }
      ];
    });
  }

  getCardTextColor(value: any): string {
    if (value < 5) {
      return 'text-danger'; // green
    } else if (value >= 5 && value < 10) {
      return 'text-warning'; // yellow
    } else {
      return 'text-success'; // red
    }
  }


  getTotalPlayersCount(): number {
    var count = 0;
    this.teamData.forEach((team: Team) => {
      count += team.players.length;
    });
    console.log("Player count: " + count);
    return count;
  }

  getPlayingPlayersCount(): number {
    var count = 0;
    this.teamData.forEach((team: Team) => {
      count += team.players.filter((player: any) => player.playingStatus === 'Playing').length;
    });
    return count;
  }

  getAveragePrice(): string {
    var totalPrices = 0;
    this.teamData.forEach((team: Team) => {
      totalPrices += team.players.reduce((total: number, player: any) => {
        return total + parseFloat(player.price.replace(' crores', ''));
      }, 0);
    });
    var count = 0;
    this.teamData.forEach((team: Team) => {
      count += team.players.length;
    });

    return (totalPrices / count).toPrecision(3);
  }

  getPlayerCountByRole(role: string): number {
    var count = 0;
    this.teamData.forEach((team: Team) => {
      count += team.players.filter((player: any) => player.role === role).length;
    });
    return count;
  }

}
