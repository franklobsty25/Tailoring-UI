import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    sectionTitle = [
        {
            title: `Our Latest News`,
            paragraph: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
        }
    ]

    singleBlogPost = [
        {
            image: `assets/img/blog/blog1.jpg`,
            tag: `Travel`,
            tagLink: `blog-grid`,
            title: `The top 5 destinations for travel in July 2020: New edition`,
            paragraph: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.`,
            detailsText: `Read More`,
            detailsLink: `blog-details`
        },
        {
            image: `assets/img/blog/blog2.jpg`,
            tag: `Business`,
            tagLink: `blog-grid`,
            title: `A 10-step guide to decarbonising your travel business`,
            paragraph: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.`,
            detailsText: `Read More`,
            detailsLink: `blog-details`
        },
        {
            image: `assets/img/blog/blog3.jpg`,
            tag: `Europe`,
            tagLink: `blog-grid`,
            title: `10 things you’ll experience on an Intrepid Retreat in Europe`,
            paragraph: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.`,
            detailsText: `Read More`,
            detailsLink: `blog-details`
        }
    ]

}