import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EmailValidator } from "@angular/forms";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  getToken() {
    return this.token;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

createUser(email: string, password: string){
  const authData: AuthData = {email: email, password: password};
this.http.post("http://localhost:3000/api/user/signup", authData)
.subscribe(response => {
  console.log(response);
});
}

login(email: string, password: string){
  const authData: AuthData = {email: email, password: password};
  this.http.post<{token: string}>("http://localhost:3000/api/user/login", authData)
  .subscribe(response => {
    const token = response.token;
    this.token = token;
    if (token){
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
    }
  })
}

}
