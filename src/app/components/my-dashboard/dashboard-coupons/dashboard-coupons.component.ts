import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/models/user';
import { TopMeasurement } from 'src/app/shared/models/top-measurement';
import { DownMeasurement } from 'src/app/shared/models/down-measurement';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard-coupons',
    templateUrl: './dashboard-coupons.component.html',
    styleUrls: ['./dashboard-coupons.component.scss']
})
export class DashboardCouponsComponent implements OnInit {
    user: User;
    photoUrl: string;
    top: TopMeasurement;
    down: DownMeasurement;

    constructor(
        private router: Router,
        private authService: AuthService,
        @Inject('environment') private environment
    ) {}

    ngOnInit(): void {
        this.getUser();
        this.getTopMeasurement();
        this.getDownMeasurement();
    }

    // get user
    getUser() {
        if (this.authService.isLoggedIn) {

            this.authService.getUser().subscribe((res) => {
                this.user = res;
                if (this.user.photoUrl != '') {
                    this.photoUrl = `${this.environment.apiUrl}/images/profile/${this.user.photoUrl}`
                }
                else {
                    this.photoUrl = 'assets/img/no-user-image.png';
                }
            },
            err => {
                if (err.status === 403)
                this.authService.signOut();
            });

        }
        else {
            this.router.navigate(['profile-authentication']);
        }
    }

    getTopMeasurement() {
        if (this.authService.isLoggedIn) {
            this.authService.getUserTopMeasurement().subscribe(top => {
                this.top = top;
            },
            err => {
                if (err.status === 403)
                this.authService.signOut();
            });
        }
        else {
            this.router.navigate(['profile-authentication']);
        }
    }
    getDownMeasurement() {
        if (this.authService.isLoggedIn) {
            this.authService.getUserDownMeasurement().subscribe(down => {
                this.down = down;
            },
            err => {
                if (err.status === 403)
                this.authService.signOut();
            });
        }
        else {
            this.router.navigate(['profile-authentication']);
        }
    }

    logOut() {
        localStorage.removeItem('user');
        this.authService.signOut();
    }

    pageTitle = [
        {
            bgImage: `assets/img/page-title/banner.jpg`, //page-title1.jpg
            title: `My Dashboard`,
        }
    ]

}