import { Component, Inject, OnInit } from '@angular/core';
import { Cart } from 'src/app/shared/models/cart';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-cart-page',
    templateUrl: './cart-page.component.html',
    styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

    message: string;
    len: number;
    total: number = 0;
    subtotal: number = 0;
    delivery: number = 0;
    userId: string;
    carts: Cart[];
    token: string;

    constructor( 
        private authService: AuthService,
        @Inject('environment') private environment
        )
         {}

    ngOnInit(): void {
        this.getCartsList();
    }

    // get user carts
    getCartsList() {
        if (this.authService.isLoggedIn) {
            const user = JSON.parse(localStorage.getItem('user'));
            this.token = user.access_token;
            this.authService.getUserCarts().subscribe((carts) => {

                this.carts = carts;
                this.len = this.carts.length;
        
                this.subtotal = this.carts.reduce((accumulator, current) => accumulator + current.total, 0);
                this.delivery = this.carts.reduce((accumulator, current) => accumulator + current.delivery, 0);
        
                this.total = Number(this.subtotal) + Number(this.delivery);

            },
            err => {
                console.log(err);
            });

        }
        else {
            this.message = 'Please login to see your carts...';
        }
    }

    // quantity change
    onChangeEvent(event, cart) {
        const price = cart.price;
        const quantity = Number(event.target.value);
        const total = price * quantity;

        const data = {
            quantity: quantity,
            total: total
        };
        
        this.authService.updateCart(cart._id, data).subscribe((res) => {
            if (res.success) {
                this.getCartsList();
            }
        },
        err => {
            console.log(err);
        });

    }

    deleteCart(cartId: String) {
        this.authService.removeFromCart(cartId).subscribe((res) => {
            if (res.success) {
                console.log(res.status);
                this.getCartsList();
            }
        },
        err => {
            console.log(err);
        });
    }
    

    pageTitle = [
        {
            bgImage: `assets/img/page-title/banner.jpg`, // page-title5.jpg
            title: `Cart`,
        }
    ]

}