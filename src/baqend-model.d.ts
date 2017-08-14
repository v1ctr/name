import {binding} from "baqend";

declare module "baqend" {

    interface baqend {
        Vertragsart: binding.EntityFactory<model.Vertragsart>;
        Unternehmen: binding.EntityFactory<model.Unternehmen>;
        Berufsfeld: binding.EntityFactory<model.Berufsfeld>;
        Match: binding.EntityFactory<model.Match>;
        Stellenangebot: binding.EntityFactory<model.Stellenangebot>;
        Bewerber: binding.EntityFactory<model.Bewerber>;
        UnternehmenLikes: binding.EntityFactory<model.UnternehmenLikes>;
        BewerberLikes: binding.EntityFactory<model.BewerberLikes>;
    }

    namespace model {
        interface Vertragsart extends binding.Entity {
            name: string;
        }

        interface Unternehmen extends binding.Entity {
            userid: User;
            name: string;
            ort: string;
            plz: number;
            strasse: string;
            hausnummer: string;
            adresszusatz: string;
            telefonnummer: string;
            homepage: string;
            ansprechpartner: string;
            gruendung: Date;
            mitarbeiterAnzahl: number;
            branche: Berufsfeld;
            pitch: string;
            logo: undefined;
            bilder: Array<undefined>;
        }

        interface User extends binding.Entity {
            iscomp: boolean;
        }

        interface Berufsfeld extends binding.Entity {
            name: string;
        }

        interface Match extends binding.Entity {
            angebot: Stellenangebot;
            bewerber: Bewerber;
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
            befristet: boolean;
            unternehmen: Unternehmen;
        }

        interface Bewerber extends binding.Entity {
            user: User;
            titel: string;
            vorname: string;
            nachname: string;
            geburtsdatum: Date;
            plz: number;
            wohnort: string;
            strasse: string;
            hausnummer: string;
            adresszusatz: string;
            telefonnummer: string;
            homepage: string;
            sprachen: Set<string>;
            jobBezeichnung: string;
            ausbildung: string;
            fachkompetenzen: Set<string>;
            softskills: Set<string>;
            pitch: string;
            profilbild: undefined;
            lebenslauf: undefined;
            vertragsarten: Set<Vertragsart>;
        }

        interface Role extends binding.Entity {
            name: string;
            users: Set<User>;
        }

        interface UnternehmenLikes extends binding.Entity {
            unternehmen: Unternehmen;
            bewerber: Bewerber;
            like: boolean;
        }

        interface Device extends binding.Entity {
            deviceOs: string;
        }

        interface BewerberLikes extends binding.Entity {
            bewerber: Bewerber;
            angebot: Stellenangebot;
            like: boolean;
        }

    }
}