import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-deals-page',
    templateUrl: './deals-page.component.html',
    styleUrls: ['./deals-page.component.scss']
})
export class DealsPageComponent implements OnInit {

    dealsGrid: number = 1;
    products: Product[];
    revLen: number;
    len: number;
    max: number;
    min: number;
    category: string;

    ratingOneStar = {icon: 'bx bxs-star'};
    ratingTwoStars = [{icon: `bx bxs-star`}, {icon: `bx bxs-star`}];
    ratingThreeStars = [{icon: `bx bxs-star`}, {icon: `bx bxs-star`}, {icon: `bx bxs-star`}];
    ratingFourStars = [{icon: `bx bxs-star`}, {icon: `bx bxs-star`}, {icon: `bx bxs-star`}, {icon: `bx bxs-star`}];
    ratingStars = [{icon: `bx bxs-star`}, {icon: `bx bxs-star`}, {icon: `bx bxs-star`}, {icon: `bx bxs-star`}, {icon: `bx bxs-star`}];

    constructor( 
        private route: ActivatedRoute,
        private authService: AuthService,
        @Inject('environment') private environment
    ) {}

    ngOnInit(): void {
        this.category = this.route.snapshot.paramMap.get('id');
        this.getProductsList();
    }

    // get category products
    getProductsList() {
        this.authService.getProducts().subscribe(products => {
            const max = products.reduce((max, val) => max.xxlargeSize > val.xxlargeSize ? max : val);
            this.max = max.xxlargeSize;
            const min = products.reduce((min, val) => min.xsmallSize < val.xsmallSize ? min : val);
            this.min = min.xsmallSize;

            this.products = products.filter(product => product.category == this.category);
            this.len = this.products.length;

            const reviews = products.filter(rev => rev.reviews);
            this.revLen = reviews.length;
        }, 
        error => {
            console.log(error);
        });
    }

    // all products
    getAllProductsList() {
        this.authService.getProducts().subscribe(products => {
            this.products = products;
            this.len = this.products.length;
        }, 
        error => {
            console.log(error.message);
        });
    }

    // search
    querySearch(event) {
        this.authService.getProducts().subscribe(products => {

            if (event.target.value) {
                const filterValue = (event.target as HTMLInputElement).value;
                this.products = products.filter(product => product.name == filterValue.trim() || product.category == event.target.value || product.xsmallSize <= event.target.value || product.xxlargeSize >= event.target.value);
                this.len = this.products.length;
            }
            else {
                this.getProductsList();
            }
        },
        error => {
            console.log(error);
        });
    }

    queryFreeDelivery(event) {
        this.authService.getProducts().subscribe(products => {

            if (event.target.value) {
                this.products = products.filter(product => product.delivery == event.target.value);
                this.len = this.products.length;
            }
            else {
                this.getProductsList();
            }
        },
        error => {
            console.log(error);
        });
    }

    queryDeliveryWithFee(event) {
        this.authService.getProducts().subscribe(products => {

            if (event.target.value) {
                this.products = products.filter(product => product.delivery >= event.target.value);
                this.len = this.products.length;
            }
            else {
                this.getProductsList();
            }
        },
        error => {
            console.log(error.message);
        });
    }

    

    pageTitle = [
        {
            bgImage: `assets/img/page-title/banner.jpg`, // page-title5.jpg
            title: `Search`
        }
    ]
    singleDealsBox = [
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
        },
        {
            image: `assets/img/deals/deals2.jpg`,
            title: `The Music Studio`,
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
            image: `assets/img/deals/deals3.jpg`,
            discount: `35% OFF`,
            title: `Times Square Restaurant`,
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
            image: `assets/img/deals/deals4.jpg`,
            discount: `65% OFF`,
            trending: `Trending`,
            title: `Las Vegas Strip`,
            location: `Las Vegas, NAV`,
            oldPrice: `$110`,
            newPrice: `$75`,
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
                    icon: `bx bxs-star-half`
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
            couponCode: `#020202`,
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
            couponCode: `#541235`,
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
            image: `assets/img/deals/deals9.jpg`,
            discount: `65% OFF`,
            trending: `Trending`,
            title: `The Perfect Fit`,
            location: `Las Vegas, NAV`,
            oldPrice: `$350`,
            newPrice: `$110`,
            detailsLink: `deals-details`,
            couponCode: `#101001`,
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
            image: `assets/img/deals/deals10.jpg`,
            title: `Bally Total Fitness`,
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
            image: `assets/img/deals/deals11.jpg`,
            discount: `35% OFF`,
            title: `Co-Working Place`,
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
            image: `assets/img/deals/deals12.jpg`,
            discount: `65% OFF`,
            trending: `Trending`,
            title: `Beauty and Spa`,
            location: `Las Vegas, Nevada`,
            oldPrice: `$110`,
            newPrice: `$75`,
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
            image: `assets/img/deals/deals4.jpg`,
            discount: `65% OFF`,
            trending: `Trending`,
            title: `Las Vegas Strip`,
            location: `Las Vegas, NAV`,
            oldPrice: `$110`,
            newPrice: `$75`,
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
                    icon: `bx bxs-star-half`
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
            couponCode: `#020202`,
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
            couponCode: `#541235`,
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
            image: `assets/img/deals/deals9.jpg`,
            discount: `65% OFF`,
            trending: `Trending`,
            title: `The Perfect Fit`,
            location: `Las Vegas, NAV`,
            oldPrice: `$350`,
            newPrice: `$110`,
            detailsLink: `deals-details`,
            couponCode: `#101001`,
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
            image: `assets/img/deals/deals10.jpg`,
            title: `Bally Total Fitness`,
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
            image: `assets/img/deals/deals11.jpg`,
            discount: `35% OFF`,
            title: `Co-Working Place`,
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
            image: `assets/img/deals/deals12.jpg`,
            discount: `65% OFF`,
            trending: `Trending`,
            title: `Beauty and Spa`,
            location: `Las Vegas, Nevada`,
            oldPrice: `$110`,
            newPrice: `$75`,
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
        },
        {
            image: `assets/img/deals/deals2.jpg`,
            title: `The Music Studio`,
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
            image: `assets/img/deals/deals3.jpg`,
            discount: `35% OFF`,
            title: `Times Square Restaurant`,
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
        }
    ]

}