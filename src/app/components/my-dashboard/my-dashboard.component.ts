import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user';
import { Router } from '@angular/router';

@Component({
    selector: 'app-my-dashboard',
    templateUrl: './my-dashboard.component.html',
    styleUrls: ['./my-dashboard.component.scss']
})
export class MyDashboardComponent implements OnInit {
    days: any;
    hours: any;
    minutes: any;
    seconds: any;
    myInterval: any;

    user: User;
    photoUrl: string;
    deliveryDate: string;

    constructor(
        private router: Router,
        private authService: AuthService,
        @Inject('environment') private environment
    ) {}

    ngOnInit(): void {
        this.getUser();
        this.myInterval = setInterval(() => {
            this.deliveryTimer();
        }, 0);
    }

    // get user
    getUser() {
        if (this.authService.isLoggedIn) {

            this.authService.getUser().subscribe((res) => {
                this.user = res;
                this.deliveryDate = this.user.deliveryDate;
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

    // countdown
    deliveryTimer = () => {
        const duration = this.deliveryDate;
        const endTimeParse = (Date.parse(duration)) / 1000;
        const now = new Date();
        const nowParse = (Date.parse(now.toString()) / 1000);
        const timeLeft = endTimeParse - nowParse;
        const days = Math.floor(timeLeft / 86400);
        let hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        let minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
        let seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
        if (hours < 10) { hours = 0 + hours; }
        if (minutes < 10) { minutes = 0 + minutes; }
        if (seconds < 10) { seconds = 0 + seconds; }
        this.days = days;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    logOut() {
        localStorage.removeItem('user');
        this.authService.signOut();
    }

    pageTitle = [
        {
            bgImage: `assets/img/page-title/page-title5.jpg`,
            title: `My Dashboard`,
        }
    ]

}