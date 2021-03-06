import {binding} from 'baqend';

declare module 'baqend' {

    interface baqend {
        Vertragsart: binding.EntityFactory<model.Vertragsart>;
        Sprache: binding.EntityFactory<model.Sprache>;
        Unternehmen: binding.EntityFactory<model.Unternehmen>;
        Berufsfeld: binding.EntityFactory<model.Berufsfeld>;
        Match: binding.EntityFactory<model.Match>;
        Stellenangebot: binding.EntityFactory<model.Stellenangebot>;
        Bewerber: binding.EntityFactory<model.Bewerber>;
        UnternehmenLikes: binding.EntityFactory<model.UnternehmenLikes>;
        Arbeitsverhaeltnis: binding.EntityFactory<model.Arbeitsverhaeltnis>;
        BewerberLikes: binding.EntityFactory<model.BewerberLikes>;
    }

    namespace model {
        interface Vertragsart extends binding.Entity {
            name: string;
        }

        interface Sprache extends binding.Entity {
            name: string;
        }

        interface Unternehmen extends binding.Entity {
            userid: User;
            name: string;
            ort: string;
            strasse: string;
            hausnummer: string;
            adresszusatz: string;
            telefonnummer: string;
            homepage: string;
            ansprechpartner: string;
            mitarbeiterAnzahl: number;
            branche: Berufsfeld;
            pitch: string;
            logo: undefined;
            bild: undefined;
            gruendung: Date;
            plz: string;
            email: string;
        }

        interface User extends binding.Entity {
            iscomp: boolean;
            isConfigCompleted: boolean;
        }

        interface Berufsfeld extends binding.Entity {
            name: string;
        }

        interface Match extends binding.Entity {
            angebot: Stellenangebot;
            bewerber: Bewerber;
        }

        interface Stellenangebot extends binding.Entity {
            bezeichnung: string;
            beschreibung: string;
            partner: string;
            anforderung: string;
            aktiv: boolean;
            unternehmen: Unternehmen;
            sprache: Set<Sprache>;
            vertragsarten: Set<Vertragsart>;
            berufsfeld: Berufsfeld;
            arbeitsort: string;
            monatsgehalt: number;
            befristetesArbeitsverhaeltnis: boolean;
            start: Date;
        }

        interface Bewerber extends binding.Entity {
            user: User;
            titel: string;
            vorname: string;
            nachname: string;
            wohnort: string;
            strasse: string;
            hausnummer: string;
            adresszusatz: string;
            telefonnummer: string;
            homepage: string;
            jobBezeichnung: string;
            ausbildung: string;
            pitch: string;
            profilbild: undefined;
            lebenslauf: undefined;
            vertragsarten: Set<Vertragsart>;
            sprachen: Set<Sprache>;
            softskills: string;
            fachkompetenzen: string;
            berufsfeld: Berufsfeld;
            arbeitsort: string;
            mindestMonatsGehalt: number;
            arbeitsverhaeltnis: Arbeitsverhaeltnis;
            geburtsdatum: Date;
            startdatum: Date;
            plz: string;
            email: string;
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

        interface Arbeitsverhaeltnis extends binding.Entity {
            name: string;
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