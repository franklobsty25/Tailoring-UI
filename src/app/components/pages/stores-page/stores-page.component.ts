import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-stores-page',
    templateUrl: './stores-page.component.html',
    styleUrls: ['./stores-page.component.scss']
})
export class StoresPageComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    pageTitle = [
        {
            bgImage: `assets/img/page-title/page-title1.jpg`,
            title: `All Stores`
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