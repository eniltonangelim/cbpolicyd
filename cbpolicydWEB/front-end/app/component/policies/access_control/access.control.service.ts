import {Injectable}         from '@angular/core';
import {Response, Http, Headers}    from '@angular/http';
import {AccessControl}         from '../../../model/access.control';
import '../../../rxjs/rxjs-extensions';

@Injectable()
export class AccessControlService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private accessControlURL = 'api/accessControl';

    constructor(private http: Http) {}

    getAccessControls(): Promise<AccessControl[]>{
        return this.http.get(this.accessControlURL)
            .toPromise()
            .then(response => response.json().data as AccessControl[]);
    }

    getAccessControl(id: number): Promise<AccessControl> {
    const url = `${this.accessControlURL}/${id}`;
    return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as AccessControl);
    }

    delete(id: number): Promise<void> {
        const url = `${this.accessControlURL}/${id}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    create(name: string): Promise<any> {
        return this.http
        .post(this.accessControlURL, JSON.stringify({name: name}), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
    }

    update(accessControl: AccessControl): Promise<AccessControl> {
        const url = `${this.accessControlURL}/${accessControl.id}`;
        return this.http
        .put(url, JSON.stringify(accessControl), {headers: this.headers})
        .toPromise()
        .then(() => accessControl)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}