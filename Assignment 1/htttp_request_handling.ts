/**
 * command to compile and run this file
 * tsc http_request_handling.ts --lib "es2015","dom"
 * node http_request_handling.js
 */
class Info {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;

    constructor(info: Info) {
        this.count = info.count;
        this.next = info.next;
        this.pages = info.pages;
        this.prev = info.prev
    }
}

class Resp {
    info: Info;
    results: Episode[];

    constructor(resp: Resp) {
        this.info = new Info(resp.info);
        this.results = resp.results
    }
}

class Origin_Location {
    name: string;
    url: string;

    constructor(orgin_location: Origin_Location) {
        this.name = orgin_location.name;
        this.url = orgin_location.url;
    }
}

class Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Origin_Location;
    location: Origin_Location;
    image: string;
    episode: [string];
    url: string;
    created: string;

    constructor(character: Character) {
        this.id = character.id;
        this.name = character.name;
        this.status = character.status;
        this.species = character.species;
        this.type = character.type;
        this.gender = character.gender;
        this.origin = new Origin_Location(character.origin);
        this.location = new Origin_Location(character.location);
        this.image = character.image;
        this.episode = character.episode;
        this.url = character.url;
        this.created = character.created;
    }
}

class Episode {

    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: Character[];
    url: string;
    created: string;

    constructor(episode: any) {
        this.id = episode.id;
        this.name = episode.name;
        this.air_date = episode.air_date;
        this.episode = episode.episode;
        this.characters = [];
        this.addCharacters(episode.characters).then(chars => {
            this.characters = chars;
        });
        this.url = episode.url;
        this.created = episode.created;
    }

    async addCharacters(characters: string[]): Promise<Character[]> {
        let charIds = "";
        for (let i = 0; i < characters.length; i++) {
            charIds += characters[i].split("/")[5] + ","
        }
        return await fetch("https://rickandmortyapi.com/api/character/" + charIds)
            .then((res: any) => res.json())
            .then((res: Character[]) => {
                let chars: Character[] = [];
                for (let i = 0; i < res.length; i++)
                    chars.push(new Character(res[i]));
                return chars
            })
    }

}

class Episodes {
    list: Episode[];

    addEpisodes(episodes: Episode[]) {
        for (let i = 0; i < episodes.length; i++) {
            this.list.push(new Episode(episodes[i]));
        }
    }

    async getEpisodes(url: string): Promise<Resp> {
        return await fetch(url)
            .then((res: any) => res.json())
            .then((res: Resp) => {
                this.addEpisodes(res.results);
                return res;
            });
    }

    getAllEpisodes(url: string) {
        this.getEpisodes(url).then(res => {
            if (!!res.info.next)
                this.getAllEpisodes(res.info.next)
            else {
                setTimeout(() => { console.log(episodes.list) }, 500);
            }
        });
    }

    constructor() {
        this.list = [];
    }

}

let episodes = new Episodes();
episodes.getAllEpisodes("https://rickandmortyapi.com/api/episode");

/**
 * command to compile and run this file
 * tsc http_request_handling.ts --lib "es2015","dom"
 * node http_request_handling.js
 */