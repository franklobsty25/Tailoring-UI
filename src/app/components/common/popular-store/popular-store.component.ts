import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-popular-store',
    templateUrl: './popular-store.component.html',
    styleUrls: ['./popular-store.component.scss']
})
export class PopularStoreComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    popularStoreContent = [
        {
            image: `assets/img/popular-store-bg.jpg`,
            title: `Popular Store`,
            paragraph: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
            buttonText: `View All Stores`,
            buttonLink: `all-stores`
        }
    ]
    popularStoreList = [
        {
            image: `assets/img/popular-store/store1.png`,
            link: `stores-details`
        },
        {
            image: `assets/img/popular-store/store2.png`,
            link: `stores-details`
        },
        {
            image: `assets/img/popular-store/store3.png`,
            link: `stores-details`
        },
        {
            image: `assets/img/popular-store/store4.png`,
            link: `stores-details`
        },
        {
            image: `assets/img/popular-store/store5.png`,
            link: `stores-details`
        },
        {
            image: `assets/img/popular-store/store6.png`,
            link: `stores-details`
        },
        {
            image: `assets/img/popular-store/store7.png`,
            link: `stores-details`
        },
        {
            image: `assets/img/popular-store/store8.png`,
            link: `stores-details`
        },
        {
            image: `assets/img/popular-store/store9.png`,
            link: `stores-details`
        },
        {
            image: `assets/img/popular-store/store10.png`,
            link: `stores-details`
        },
        {
            image: `assets/img/popular-store/store11.png`,
            link: `stores-details`
        },
        {
            image: `assets/img/popular-store/store12.png`,
            link: `stores-details`
        }
    ]

}