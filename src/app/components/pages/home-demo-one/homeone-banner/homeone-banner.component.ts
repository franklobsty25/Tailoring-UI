import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-homeone-banner',
    templateUrl: './homeone-banner.component.html',
    styleUrls: ['./homeone-banner.component.scss']
})
export class HomeoneBannerComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    mainBannerContent = [
        {
            title: `Categories of Designs`,
            categoriesList: [
                {
                    icon: `bx bx-male`,
                    title: `Men`,
                    link: `stores`
                },
                {
                    icon: `bx bx-female`,
                    title: `Women`,
                    link: `stores`
                },
                {
                    icon: `bx bxs-baby-carriage`,
                    title: `Kids`,
                    link: `stores`
                }
            ],
            buttonText: `View All Categories`,
            buttonLink: `stores`
        }
    ]
    mainBannerBox = [
        {
            image: `assets/img/men.jpg`, // banner-img1.jpg
            title: `Men designs`,
            paragraph: `Men designs from great tailors.`,
            buttonText: `Show Men Designs`,
            buttonLink: `stores`,
            category: 'Men'
        },
        {
            image: `assets/img/women.jpg`, // banner-img2.jpg
            title: `Women professional designs`,
            paragraph: `Beautiful designs from professional seamstress.`,
            buttonText: `Show Women Designs`,
            buttonLink: `stores`,
            category: 'Women'
        },
        {
            image: `assets/img/kids.jpg`, // banner-img3.jpg
            title: `Beautiful Kids designs`,
            paragraph: `Our future kids will look good in world.`,
            buttonText: `Show Kids Designs`,
            buttonLink: `stores`,
            category: 'Kids'
        }
    ]

    homeSlides: OwlOptions = {
		loop: true,
		nav: false,
		dots: false,
		autoplayHoverPause: true,
		autoplay: true,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		items: 1,
		navText: [
			"<i class='bx bx-left-arrow-alt'></i>",
			"<i class='bx bx-right-arrow-alt'></i>"
		],
		responsive: {
			0: {
				autoHeight: true
			},
			992: {
				autoHeight: false
			}
		}
    }

}