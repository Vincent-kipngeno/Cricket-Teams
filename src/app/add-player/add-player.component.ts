import { Component } from '@angular/core';
import { Player, Team } from '../models';
import { FormBuilder, Validators } from '@angular/forms';
import { TeamsService } from '../teams-service/teams.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent {
  formData: any;
  teams: Team[] = [];
  team: Team = {
    name: '',
    icon: '',
    players: [],
    id: " "
  };
  player: Player = {
    fullName: '',
    photo: '',
    team: '',
    price: '',
    playingStatus: '',
    role: ''
  };

  edit: Boolean = false;
  constructor(private formBuilder: FormBuilder, private teamsService: TeamsService, private router: Router, private route: ActivatedRoute) {
    this.formData = this.formBuilder.group({
      fullName: [this.player.fullName, [Validators.required]],
      photo: [this.player.photo, Validators.required],
      team: [this.team, Validators.required],
      price: [this.player.price, Validators.required],
      playingStatus: [this.player.playingStatus, Validators.required],
      role: [this.player.role, Validators.required]
    });

  }

  ngOnInit(): void {

    this.teamsService.getAllTeams().subscribe(data => {
      this.teams = data;
    });

    this.route.params.subscribe(params => {
      const teamId = params['teamId'];
      const playerName = params['playerName'];
      if (teamId) {
        this.teamsService.getTeamById(teamId).subscribe(team => {
          this.team = team[0];
          this.player = this.team.players.filter((player: any) => player.fullName === playerName)[0];
          this.formData.patchValue({
            fullName: this.player.fullName,
            photo: this.player.photo,
            team: this.team.name,
            price: this.player.price.replace(' crores', ''),
            playingStatus: this.player.playingStatus,
            role: this.player.role
          });
          this.formData.get('team').setValue(this.team.id);
          if (team.length > 0) {
            this.edit = true;
          }
        });
      }

    });
  }

  addTeam() {
    if (this.formData.valid) {
      console.log(this.formData.get('team').value, this.teams);
      const name = this.player.fullName;
      this.player = {
        fullName: this.formData.get('fullName').value,
        photo: this.formData.get('photo').value,
        team: this.teams.filter((team: any) => team.id === this.formData.get('team').value)[0].name,
        price: this.formData.get('price').value + ' crores',
        playingStatus: this.formData.get('playingStatus').value,
        role: this.formData.get('role').value
      };

      if (!this.edit) {
        this.team = this.teams.filter((team: any) => team.id === this.formData.get('team').value)[0];
        if (!this.team.players) {
          this.team.players = [];
        }
        this.team.players.push(this.player);
        this.teamsService.updateTeam(this.formData.get('team').value, this.team).subscribe(response => {
          if (response) {
            this.router.navigate(['/teams/' + this.team.name]);
          }
        });
      } else {
        this.team.players = this.team.players.filter((player: any) => player.fullName !== name);
        this.team.players.push(this.player);
        this.teamsService.updateTeam(this.team.id, this.team).subscribe(response => {
          this.router.navigate(['/teams/' + this.team.name]);
        });
      }

    }
  }
}
