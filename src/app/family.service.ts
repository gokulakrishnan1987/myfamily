import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FamilyService {

  	constructor(private http:HttpClient) {}

    auth() {
        return this.http.get('http://localhost:8080/api/auth');
    }

  	getTest() {
        return this.http.get('http://localhost:8080/api');
    }

    getRelationships(familyId) {
        return this.http.get('http://localhost:8080/api/relationships?familyId='+ familyId);
    }

    getfamilies() {    	
        return this.http.get('http://localhost:8080/api/family');
    }

    getUser(emailId) {    	
        return this.http.get('http://localhost:8080/api/user?emailId='+ emailId);
    }

    newUser(user) {
    	return this.http.post('http://localhost:8080/api/new-user',user);
    }

    newMember(member) {    	
    	return this.http.post('http://localhost:8080/api/new-member',member);
    }

    newFamily(family) {        
        return this.http.post('http://localhost:8080/api/family',family);
    }

    newRelationship(newRelationship) {
    	console.log(newRelationship);
    	return this.http.post('http://localhost:8080/api/new-relationship',newRelationship);
    }

    getMembers(userId) {    	
        return this.http.get('http://localhost:8080/api/members?familyId='+ userId);
    }

}
