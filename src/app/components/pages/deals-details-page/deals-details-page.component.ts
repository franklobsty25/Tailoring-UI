import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Product } from '../../../shared/models/product';
import { Review } from '../../../shared/models/review';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cart } from 'src/app/shared/models/cart';
import { User } from 'src/app/shared/models/user';
import { Tailor } from 'src/app/shared/models/tailor';

@Component({
    selector: 'app-deals-details-page',
    templateUrl: './deals-details-page.component.html',
    styleUrls: ['./deals-details-page.component.scss']
})
export class DealsDetailsPageComponent implements OnInit {

    days: any;
    hours: any;
    minutes: any;
    seconds: any;
    myInterval: any;

    @ViewChild('rForm') reviewFormDirective;
    len: number;
    revLen: number;
    user: User;
    cart: Cart;
    review: Review;;
    reviewForm: FormGroup;
    productId: string;
    product: Product;
    tailor: Tailor;
    photoUrl: string;
    price: number;

    formErrors = {
        'name': '',
        'email': '',
        'review': ''
      };
  
      validationMessages = {
        'name': {
          'required': 'Name is required.',
          'minlength': 'Name must be at least 2 characters long.'
        },
        'email': {
          'required': 'Email is required.'
        },
        'review': {
            'required': 'Review is required.'
        }
        
      };

      ratingOneStar = {icon: 'bx bxs-star checked'};
      ratingTwoStars = [{icon: 'bx bxs-star checked'}, {icon: 'bx bxs-star checked'}];
      ratingThreeStars = [{icon: 'bx bxs-star checked'}, {icon: 'bx bxs-star checked'}, {icon: 'bx bxs-star checked'}];
      ratingFourStars = [{icon: 'bx bxs-star checked'}, {icon: 'bx bxs-star checked'}, {icon: 'bx bxs-star checked'}, {icon: 'bx bxs-star checked'}];
      ratingStars = [{icon: 'bx bxs-star checked'}, {icon: 'bx bxs-star checked'}, {icon: 'bx bxs-star checked'}, {icon: 'bx bxs-star checked'}, {icon: 'bx bxs-star checked'}];


    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private cookieService: CookieService,
        private fb: FormBuilder,
        @Inject('environment') private environment
    ) {}

    ngOnInit() {
        this.productId = this.route.snapshot.paramMap.get('id');
        this.getProduct(this.productId);
        this.createForm();
        this.myInterval = setInterval(() => {
            this.commingSoonTime();
        }, 0);
    }

    // get product
    getProduct(productId) {
        this.authService.getProduct(productId).subscribe(product => {
            this.product = product;
            this.getTailor(this.product.tailorId);
        },
        error => {
            console.log(error);
        });
    }
    // get tailor
    getTailor(tailorId) {
        this.authService.tailorDetail(tailorId).subscribe(tailor => {
            this.tailor = tailor;
            if (this.tailor.photoUrl == '') {
                this.photoUrl = 'assets/img/no-user-image.png';
            }
            else {
                this.photoUrl = `${this.environment.apiUrl}/images/profile/${this.tailor.photoUrl}`;
            }
        },
        err => {
            console.log(err);
        });
    }

    // create from
    createForm() {
        this.reviewForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', Validators.required],
            rating: 0,
            remember: false,
            review: ['', Validators.required]
        });
        this.reviewForm.valueChanges
        .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
        
    }

    onValueChanged(data?: any) {
        if (!this.reviewForm) { return; }
          const form = this.reviewForm;
        for (const field in this.formErrors) {
          if (this.formErrors.hasOwnProperty(field)) {
            // Clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
              const messages = this.validationMessages[field];
              for (const key in control.errors) {
                if (control.errors.hasOwnProperty(key)) {
                  this.formErrors[field] += messages[key] + '';
                }
              }
            }
          }
        }
      }

    // add to carts
    addToCart() {
        if (this.authService.isLoggedIn) {

                this.cart = {
                    tailorId: this.product.tailorId,
                    productId: this.productId,
                    name: this.product.name,
                    image: this.product.image,
                    fabric: this.product.fabric,
                    category: this.product.category,
                    price: this.price || 0,
                    delivery: this.product.delivery,
                    quantity: 1,
                    total: this.price || 0,
                    duration: this.product.duration,
                    xsmallSize: this.product.xsmallSize,
                    smallSize: this.product.smallSize,
                    mediumSize: this.product.mediumSize,
                    largeSize: this.product.largeSize,
                    xlargeSize: this.product.xlargeSize,
                    xxlargeSize: this.product.xxlargeSize
                };
                
                this.authService.addToUserCart(this.cart).subscribe((res) => {
                    if (res.success) {
                        window.alert(res.status);
                        setTimeout(() => {window.location.reload()}, 1000);
                    }
                },
                err => {
                    console.log(err);
                });

        }
        else {
            this.router.navigate(['profile-authentication']);
        }
    }
    get f() {
        return this.reviewForm.controls;
    }

    // add product review
    addReview() {
        if (this.authService.isLoggedIn) {
            this.authService.getUser().subscribe((res) => {4
                this.user = res;

                this.review = this.reviewForm.value;

                if (this.user.photoUrl == '') {
                    this.review.photoUrl = 'assets/img/no-user-image.png';
                } else {
                    this.review.photoUrl = `${this.environment.apiUrl}/images/profile/${this.user.photoUrl}`;
                }
    
                this.authService.addProductReview(this.productId,this.review).subscribe((res) => {
                    if (res.success) {
                        console.log(res.status);
    
                        if (this.f.remember) {
                            this.cookieService.set('email', this.review.email);
                        }
                        this.reviewFormDirective.resetForm();
                        this.reviewForm.reset({
                            name: '',
                            email: '',
                            rating: 0,
                            review: ''
                        });
                    }
                },
                error => {
                    console.log(error);
                });
            })
        }
        else {
            this.router.navigate(['profile-authentication']);
        }
    }

    // select price on measurement
    onPriceChange(event) {
        if (this.authService.isLoggedIn) {

            this.price = event.target.value;
            const data = {
                price: this.price,
                total: this.price
            };
            this.authService.updatePriceTotal(this.productId, data)
            .subscribe((res) => {
                if (res.success)
                console.log(res);
            },
            err => {
                console.log(err);
            });

        }
        else {
            this.router.navigate(['profile-authentication']);
        }
    }

    // count down timer
    commingSoonTime = () => {
        const endTimeParse = (Date.parse('January 20, 2022 17:00:00 PDT')) / 1000;
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


    pageTitle = [
        {
            bgImage: `assets/img/page-title/banner.jpg`, // page-title4.jpg
            title: `Detail`,
        }
    ]



    dealsDetailsImageSlides: OwlOptions = {
		items: 1,
		nav: true,
		loop: true,
		dots: false,
		autoplay: true,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
		autoplayHoverPause: true,
		navText: [
			"<i class='bx bx-left-arrow-alt'></i>",
			"<i class='bx bx-right-arrow-alt'></i>"
		]
    }

}