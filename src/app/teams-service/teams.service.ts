import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private baseUrl = 'http://localhost:3000/teams';

  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.baseUrl);
  }

  getTeamByName(name: string): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}?name=${name}`);
  }

  getTeamById(id: string): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}?id=${id}`);
  }

  addTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.baseUrl, team);
  }

  updateTeam(id: string, team: Team): Observable<Team> {
    return this.http.patch<Team>(`${this.baseUrl}/${id}`, team);
  }

  deleteTeam(id: string): Observable<Team> {
    return this.http.delete<Team>(`${this.baseUrl}/${id}`);
  }
}
