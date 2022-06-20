import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { AuthProviderService } from 'src/app/shared/services/auth-provider.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile-authentication-page',
    templateUrl: './profile-authentication-page.component.html',
    styleUrls: ['./profile-authentication-page.component.scss']
})
export class ProfileAuthenticationPageComponent implements OnInit {
    user: User;
    error: string;
    rSuccess: string;
    rError: string;
    @ViewChild('registerForm') registerFormDirective;

    constructor(
        private router: Router,
        public authService: AuthService,
        private cookieService: CookieService,
        public authProviderService: AuthProviderService
    ) { }

    ngOnInit(): void {
    }

    onLogin(form) {
        this.authService.signIn(form.loginEmail, form.loginPassword)
        .subscribe((res) => {
            if (res.success) {
                this.router.navigate(['']);
                if (form.remember) {
                    this.cookieService.set('email', form.loginEmail);
                }
            }
            else {
                this.error = res.status;
            }
        },
        err => {
            if (err.status === 404) {
                this.error = 'Email or Password does not exists.';
            }
            else {
                this.error = 'Email or Password incorrect.';
            }
        });

    }

    onRegister(form) {
        this.user = form;
        console.log(this.user);
        this.authService.signUp(this.user).subscribe((res) => {
            if (res.success) {
                this.router.navigate(['']);
                //this.rSuccess = res.status;
                //this.rError = '';
                this.registerFormDirective.resetForm();
            }
            else {
                this.rError = res.status;
            }
        },
        err => {
            if (err.status == 500) {
                this.rError = 'Email address already exists.';
            }
        });
    }

    pageTitle = [
        {
            bgImage: `assets/img/page-title/banner.jpg`, // assets/img/page-title/page-title4.jpg
            title: `Sign in/Sign up` //Profile Authentication
        }
    ]

}
