import {binding} from "baqend";

declare module "baqend" {

    interface baqend {
        Vertragsart: binding.EntityFactory<model.Vertragsart>;
        Match: binding.EntityFactory<model.Match>;
        Berufsfeld: binding.EntityFactory<model.Berufsfeld>;
        Stellenangebot: binding.EntityFactory<model.Stellenangebot>;
    }

    namespace model {
        interface Device extends binding.Entity {
            deviceOs: string;
        }

        interface Vertragsart extends binding.Entity {
            name: string;
        }

        interface Match extends binding.Entity {
            bid: User;
            userlike: boolean;
            complike: boolean;
        }

        interface User extends binding.Entity {
            email: string;
            name: string;
            strasse: string;
            hausnr: string;
            zusatz: string;
            plz: number;
            ort: string;
            telefon: number;
            gruendung: Date;
            Logo: string;
            Bilder: Array<string>;
            mitarbeiterAnzahl: number;
            page: string;
            sprache: Array<string>;
            pitch: string;
            geburt: Date;
            ausbildung: string;
            lebenslauf: string;
            skill: Array<string>;
            iscomp: boolean;
            softskill: string;
            jobBezeichnung: string;
            branche: Set<Berufsfeld>;
        }

        interface Berufsfeld extends binding.Entity {
            name: string;
        }

        interface Stellenangebot extends binding.Entity {
            gehalt: string;
            start: Date;
            bezeichnung: string;
            beschaeftigung: Set<Vertragsart>;
            beschreibung: string;
            partner: string;
            anforderung: string;
            sprache: Array<string>;
            aktiv: boolean;
            userid: User;
            befristet: boolean;
        }

        interface Role extends binding.Entity {
            name: string;
            users: Set<User>;
        }

    }
}
