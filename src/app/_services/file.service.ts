import {Injectable} from '@angular/core';
import {db} from 'baqend';

@Injectable()
export class FileService {

    public getFilePath(): string {
        return 'users/' + db.User.me.key + '/';
    }

    public deleteFile(file) {
        return file.delete({force: true});
    }

    public uploadFile(file) {
        const image = new db.File({
            name: this.getFilePath() + file.name,
            data: file,
            type: 'blob'
        });
        return image.upload({force: true});
    }
}
