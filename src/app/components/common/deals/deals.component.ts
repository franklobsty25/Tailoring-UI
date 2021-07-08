import { Component, OnInit, Inject } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from '../../../shared/models/product';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-deals',
    templateUrl: './deals.component.html',
    styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {

    ratingOneStar = {icon: 'bx bxs-star', one: 1};
    ratingTwoStars = [{icon: `bx bxs-star`}, {icon: `bx bxs-star`}];
    ratingThreeStars = [{icon: `bx bxs-star`}, {icon: `bx bxs-star`}, {icon: `bx bxs-star`}];
    ratingFourStars = [{icon: `bx bxs-star`}, {icon: `bx bxs-star`}, {icon: `bx bxs-star`}, {icon: `bx bxs-star`}];
    ratingStars = [{icon: `bx bxs-star`}, {icon: `bx bxs-star`}, {icon: `bx bxs-star`}, {icon: `bx bxs-star`}, {icon: `bx bxs-star`}];
    products: Product[];
    len: number;

    constructor( 
        private authService: AuthService,
        @Inject('environment') private environment
         ) {}

    ngOnInit(): void {
        this.getProductsList();
    }

    // get woment products
    getProductsList() {
        this.authService.getProducts().subscribe(products => {
            this.products = products.filter(product => product.category == 'Women');
            this.len = this.products.length;
        }, 
        error => {
            console.log(error);
        });
    }



    sectionTitle = [
        {
            title: `Women Designs`,
            paragraph: `Best designs for our ladies of today.`
        }
    ]
    singleDealsBox = [
        {
            image: `assets/img/deals/deals5.jpg`,
            trending: `Trending`,
            title: `Universal Studios`,
            location: `Orlando, Florida`,
            newPrice: `$50`,
            detailsLink: `deals-details`,
            ratingCount: `18`,
            ratingStar: [
                {
                    icon: `bx bxs-star`
                },
                {
                    icon: `bx bxs-star`
                },
                {
                    icon: `bx bxs-star`
                },
                {
                    icon: `bx bxs-star`
                },
                {
                    icon: `bx bxs-star`
                }
            ]
        },
        {
            image: `assets/img/deals/deals6.jpg`,
            title: `Hoover Dam`,
            location: `Colorado River`,
            newPrice: `$99`,
            detailsLink: `deals-details`,
            ratingCount: `25`,
            ratingStar: [
                {
                    icon: `bx bxs-star`
                },
                {
                    icon: `bx bxs-star`
                },
                {
                    icon: `bx bxs-star`
                },
                {
                    icon: `bx bxs-star`
                },
                {
                    icon: `bx bx-star`
                }
            ]
        },
        {
            image: `assets/img/deals/deals7.jpg`,
            discount: `35% OFF`,
            title: `Light Essence`,
            location: `Las Vegas, NAV`,
            oldPrice: `$100`,
            newPrice: `$85`,
            detailsLink: `deals-details`,
            ratingCount: `22`,
            ratingStar: [
                {
                    icon: `bx bxs-star`
                },
                {
                    icon: `bx bxs-star`
                },
                {
                    icon: `bx bxs-star`
                },
                {
                    icon: `bx bxs-star`
                },
                {
                    icon: `bx bxs-star`
                }
            ]
        },
        {
            image: `assets/img/deals/deals8.jpg`,
            discount: `65% OFF`,
            trending: `Trending`,
            title: `The Paradise Inn`,
            location: `Las Vegas, Nevada`,
            oldPrice: `$350`,
            newPrice: `$110`,
            detailsLink: `deals-details`,
            ratingCount: `20`,
            ratingStar: [
                {
                    icon: `bx bxs-star`
                },
                {
                    icon: `bx bxs-star`
                },
                {
                    icon: `bx bxs-star`
                },
                {
                    icon: `bx bxs-star`
                },
                {
                    icon: `bx bx-star`
                }
            ]
        },
        {
            image: `assets/img/deals/deals1.jpg`,
            discount: `65% OFF`,
            trending: `Trending`,
            title: `The Start Hotel, Casino`,
            location: `Las Vegas, NAV`,
            oldPrice: `$350`,
            newPrice: `$110`,
            detailsLink: `deals-details`,
            ratingCount: `35`,
            ratingStar: [
                {
                    icon: `bx bxs-star`
                },
                {
                    icon: `bx bxs-star`
                },
                {
                    icon: `bx bxs-star`
                },
                {
                    icon: `bx bxs-star`
                },
                {
                    icon: `bx bxs-star`
                }
            ]
        }
    ]
    dealsSlides: OwlOptions = {
        nav: true,
        margin: 30,
        loop: true,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        navText: [
            "<i class='bx bx-chevron-left'></i>",
            "<i class='bx bx-chevron-right'></i>"
        ],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    }

}