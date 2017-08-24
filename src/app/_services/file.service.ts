import {Injectable} from '@angular/core';
import {db} from 'baqend';
import {AuthService} from './auth.service';

/**
 * Der FileService löscht, ersetzt und uploaded Dateien (Profilbilder, etc)
 */
@Injectable()
export class FileService {

    constructor(private authService: AuthService) {
    }

    public updateFile(oldFile, newFile) {
        if (oldFile && !newFile) {
            return this.deleteFile(oldFile);
        } else if (newFile && !oldFile) {
            return this.addFile(newFile);
        } else if (oldFile && newFile) {
            return this.deleteFile(oldFile).then(() => {
                return this.addFile(newFile);
            });
        } else {
            return Promise.resolve(null);
        }
    }

    public deleteFile(file) {
        return file.delete({force: true});
    }

    public addFile(file) {
        return this.authService.getOppositeRole().then((role) => {
            const image = new db.File({
                name: this.getFilePath() + file.name,
                data: file,
                type: 'blob',
                /*
                acl: new db.Acl()
                    .allowReadAccess(db.User.me)
                    .allowWriteAccess(db.User.me)
                    .allowReadAccess(role)
            */
            });
            return image.upload({force: true});
        });
    }

    private getFilePath(): string {
        return 'users/' + db.User.me.key + '/';
    }
}
