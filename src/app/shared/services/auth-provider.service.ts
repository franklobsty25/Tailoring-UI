import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider, SocialUser, FacebookLoginProvider, AmazonLoginProvider } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthProviderService {
  socialUser: SocialUser;

  constructor(
    public router: Router,
    public ngZone: NgZone,
    private socialAuthService: SocialAuthService
  ) { 
    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        this.socialUser = user;
        localStorage.setItem('user', JSON.stringify(this.socialUser));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // sign in with google
  async googleSignIn() {
    return await this.AuthLogin(GoogleLoginProvider.PROVIDER_ID);
  }

  // sign in with facebook
  async facebookSignIn() {
    return await this.AuthLogin(FacebookLoginProvider.PROVIDER_ID);
  }

  // sign in with amazon
  async amazonSignIn() {
    return await this.AuthLogin(AmazonLoginProvider.PROVIDER_ID);
  }

  // auth logic to run providers
  async AuthLogin(provider) {
    return await this.socialAuthService.signIn(provider)
    .then((result) => {
     this.ngZone.run(() => {
       this.router.navigate(['/']);
     });
    }).catch((error) => {
      console.log(error.message);
    });
  }
  
  // returns true when user is logged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  // sign out from provider
  async signOutProvider() {
    return await this.socialAuthService.signOut()
    .then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['profile-authentication']);
    });
   }

}
