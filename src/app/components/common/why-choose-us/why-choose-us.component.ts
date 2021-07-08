import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-why-choose-us',
    templateUrl: './why-choose-us.component.html',
    styleUrls: ['./why-choose-us.component.scss']
})
export class WhyChooseUsComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    sectionTitle = [
        {
            title: `Why Buy on Tailoringhub?`,
            paragraph: `It's a secure platform with customer guarantee. Any order made here bound with policy protecting the customer.`
        }
    ]
    singleWhyChooseBox = [
        {
            icon: `bx bx-money`,
            title: `Money Back`,
            subTitle: `Refund in 15 days`
        },
        {
            icon: `bx bx-credit-card`,
            title: `Secure Payment`,
            subTitle: `Paystack`
        },
        {
            icon: `bx bxs-discount`,
            title: `Member Discount`,
            subTitle: `Free deals everyweek`
        }
    ]
    whyChooseContent = [
        {
            title: `Discover even more deals with Cash Back`,
            buttonText: `Join Now`,
            buttonLink: `contact`
        }
    ]

}