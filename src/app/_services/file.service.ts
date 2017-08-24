import {Injectable} from '@angular/core';
import {db} from 'baqend';
import {AuthService} from './auth.service';

@Injectable()
export class FileService {

    constructor(private authService: AuthService) {
    }

    public getFilePath(): string {
        return 'users/' + db.User.me.key + '/';
    }

    public deleteFile(file) {
        return file.delete({force: true});
    }

    public uploadFile(file) {
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
}
