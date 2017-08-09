import {binding} from 'baqend';

declare module 'baqend' {

  interface baqend {
    Message: binding.EntityFactory<model.Message>;
  }

  namespace model {
    interface Device extends binding.Entity {
      deviceOs: string;
    }

    interface Role extends binding.Entity {
      name: string;
      users: Set<User>;
    }

    interface User extends binding.Entity {
      username: string;
      inactive: boolean;
        email: string;
        name: string;
        strasse: string;
        hausnr: string;
        zusatz: string;
        plz: number;
        ort: string;
        telefon: number;
        gruendung: Date;
        logo: string;
        bilder: string[];
        mitarbeitermin: number;
        mitarbeitermax: number;
        page: string;
        branche: string[];
        sprache: string[];
        pitch: string;
        iscomp: boolean;
        geburt: Date;
        ausbildung: string[];
        lebenslauf: string;
        skill: string[];
        schwerpunkt: string;
        softskill: string[];
        position: string;
    }

    interface Message extends binding.Entity {
      name: string;
      text: string;
      face: string;
    }

    interface Stellenangebot extends binding.Entity {
      uid: string;
      gehalt: string;
      start: string;
      bezeichnung: string;
      beschaeftigung: string;
      befristet: string;
      beschreibung: string;
      partner: string;
      anforderung: string;
      sprache: string[];
      aktiv: boolean;
      userid: string;
    }

  }
}
