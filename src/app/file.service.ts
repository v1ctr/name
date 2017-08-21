import {Injectable} from '@angular/core';
import {db} from 'baqend';

@Injectable()
export class FileService {

    private path: string;

    constructor() {
        this.path = 'users/' + db.User.me.key + '/';
    }

    public saveFile(file: any) {
        const dbFile = new db.File({
            name: this.path + file.name,
            data: file,
            type: 'blob'
        });
        return dbFile.upload({force: true});
    }

    public deleteFile(file) {
        return file.delete({force: true});
    }
}
