import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../../../shared/models/cart';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
    selector: 'app-navbar-style-two',
    templateUrl: './navbar-style-two.component.html',
    styleUrls: ['./navbar-style-two.component.scss']
})
export class NavbarStyleTwoComponent implements OnInit {
    len: number = 0;
    carts: Cart[];

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.getCarts();
    }

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    // get user carts
    getCarts() {
        if (this.authService.isLoggedIn) {
            this.authService.getUserCarts().subscribe(carts => {
                this.carts = carts;
                this.len = this.carts.length;
            },
            err => {
                if (err.status === 403)
                this.router.navigate(['profile-authentication']);
            });
        }
        else {
            this.len;
        }
    }

}