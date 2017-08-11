import {binding, GeoPoint} from "baqend";

declare module "baqend" {

  interface baqend {
    Vertragsart: binding.EntityFactory<model.Vertragsart>;
    Unternehmen: binding.EntityFactory<model.Unternehmen>;
    Berufsfeld: binding.EntityFactory<model.Berufsfeld>;
    Match: binding.EntityFactory<model.Match>;
    Stellenangebot: binding.EntityFactory<model.Stellenangebot>;
    Bewerber: binding.EntityFactory<model.Bewerber>;
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
      logo: string;
      mitarbeiterAnzahl: number;
      branche: Berufsfeld;
      pitch: string;
      bilder: Set<string>;
    }

    interface User extends binding.Entity {
      name: string;
      strasse: string;
      hausnr: string;
      plz: number;
      ort: string;
      mitarbeiterAnzahl: number;
      page: string;
      pitch: string;
      iscomp: boolean;
      jobBezeichnung: string;
    }

    interface Berufsfeld extends binding.Entity {
      name: string;
    }

    interface Match extends binding.Entity {
      bid: User;
      userlike: boolean;
      complike: boolean;
    }

    interface Role extends binding.Entity {
      name: string;
      users: Set<User>;
    }

    interface Device extends binding.Entity {
      deviceOs: string;
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
      profilbild: string;
      lebenslauf: string;
    }

  }
}