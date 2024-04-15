import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TeamsService } from '../teams-service/teams.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../models';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent {
  formData: any;
  team: Team = {
    name: '',
    icon: '',
    players: [],
    id: ''
  };
  edit: Boolean = false;
  constructor(private formBuilder: FormBuilder, private teamsService: TeamsService, private router: Router, private route: ActivatedRoute) {
    this.formData = this.formBuilder.group({
      name: [this.team.name, [Validators.required]],
      icon: [this.team.icon, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const name = params['name'];
      if (name) {
        this.teamsService.getTeamByName(name).subscribe(team => {
          this.team = team[0];
          // Set the initial values of the form controls
          this.formData.patchValue({
            name: this.team.name,
            icon: this.team.icon
          });
          if (team.length > 0) {
            this.edit = true;
          }
        });
      }

    });
  }

  addTeam() {
    if (this.formData.valid) {
      const id = this.team.id;
      this.team.name = this.formData.get('name')?.value;
      this.team.icon = this.formData.get('icon')?.value;
      this.team.id = this.team.name + "_";

      if (!this.edit) {
        this.teamsService.addTeam(this.team).subscribe(response => {
          if (response) {
            this.router.navigate(['/teams']);
          }
        });
      } else {
        this.team.id = id;
        this.teamsService.updateTeam(this.team.id, this.team).subscribe(response => {
          this.router.navigate(['/teams']);
        });
      }

    }
  }
}
