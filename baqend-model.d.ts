import {binding, GeoPoint} from "baqend";

declare module "baqend" {

  interface baqend {
    Todo: binding.EntityFactory<model.Todo>;
    Match: binding.EntityFactory<model.Match>;
    Message: binding.EntityFactory<model.Message>;
    Stellenangebot: binding.EntityFactory<model.Stellenangebot>;
    Activity: binding.ManagedFactory<model.Activity>;
    Interger: binding.ManagedFactory<model.Interger>;
  }

  namespace model {
    interface Todo extends binding.Entity {
      listId: string;
      name: string;
      activities: Array<Activity>;
      active: boolean;
      done: boolean;
      extra: string;
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
      mitarbeitermin: number;
      mitarbeitermax: number;
      page: string;
      branche: Array<string>;
      sprache: Array<string>;
      pitch: string;
      geburt: Date;
      ausbildung: string;
      lebenslauf: string;
      skill: Array<string>;
      iscomp: boolean;
      schwerpunkt: string;
      softskill: string;
      position: string;
    }

    interface Role extends binding.Entity {
      name: string;
      users: Set<User>;
    }

    interface Device extends binding.Entity {
      deviceOs: string;
    }

    interface Message extends binding.Entity {
      name: string;
      message: string;
      date: Date;
    }

    interface Stellenangebot extends binding.Entity {
      gehalt: string;
      start: Date;
      bezeichnung: string;
      beschaeftigung: string;
      befristet: string;
      beschreibung: string;
      partner: string;
      anforderung: string;
      sprache: Array<string>;
      aktiv: boolean;
      userid: User;
      uid: User;
    }

    interface Activity extends binding.Managed {
      start: Date;
      end: Date;
    }

    interface Interger extends binding.Managed {
    }

  }
}