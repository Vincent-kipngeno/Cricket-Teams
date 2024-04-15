export class Player {
    fullName: string;
    photo: string;
    team: string;
    price: string;
    playingStatus: string;
    role: string;

    constructor(fullName: string, photo: string, team: string, price: string, playingStatus: string, role: string) {
        this.fullName = fullName;
        this.photo = photo;
        this.team = team;
        this.price = price;
        this.playingStatus = playingStatus;
        this.role = role;
    }
}

export class Team {
    id: string;
    name: string;
    icon: string;
    players: Player[];

    constructor(id: string, name: string, icon: string, players: Player[]) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.players = players;
    }
}
export interface User {
    id?: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    token?: string;
}
