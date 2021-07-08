import { Component, Inject, OnInit, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Product } from 'src/app/shared/models/product';

@Component({
    selector: 'app-featured-discount-deals',
    templateUrl: './featured-discount-deals.component.html',
    styleUrls: ['./featured-discount-deals.component.scss']
})
export class FeaturedDiscountDealsComponent implements OnInit {
    @Input() tailorId = '';
    products: Product[];
    len: number;
    ratingOneStar = {icon: 'bx bxs-star', one: 1};
    ratingTwoStars = [{icon: `bx bxs-star`}, {icon: `bx bxs-star`}];
    ratingThreeStars = [{icon: `bx bxs-star`}, {icon: `bx bxs-star`}, {icon: `bx bxs-star`}];
    ratingFourStars = [{icon: `bx bxs-star`}, {icon: `bx bxs-star`}, {icon: `bx bxs-star`}, {icon: `bx bxs-star`}];
    ratingStars = [{icon: `bx bxs-star`}, {icon: `bx bxs-star`}, {icon: `bx bxs-star`}, {icon: `bx bxs-star`}, {icon: `bx bxs-star`}];

    constructor( 
        private authService: AuthService,
        @Inject('environment') private environment
         ) {}

    ngOnInit(): void {
        console.log(this.tailorId);
        this.filterRelatedProducts();
    }
    ngOnChanges() { 
    }
    // related products
    filterRelatedProducts() {
        this.authService.getProducts().subscribe((products) => {
            this.products = products.filter(tailor => tailor.tailorId == this.tailorId);
            this.len = this.products.length;
        },
        err => {
            console.log(err);
        });
    }


    sectionTitle = [
        {
            title: `Related Designs`,
            paragraph: `Designs from same store`
        }
    ]
    singleDealsBox = [
        {
            image: `assets/img/deals/deals13.jpg`,
            discount: `65% OFF`,
            trending: `Trending`,
            title: `Hand Sanitizer`,
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
        },
        {
            image: `assets/img/deals/deals14.jpg`,
            title: `Smart Shoe & Bag`,
            location: `New York, USA`,
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
            image: `assets/img/deals/deals15.jpg`,
            discount: `35% OFF`,
            title: `The Black Shrit`,
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
                    icon: `bx bx-star`
                },
                {
                    icon: `bx bx-star`
                }
            ]
        },
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
            }
        }
    }

}