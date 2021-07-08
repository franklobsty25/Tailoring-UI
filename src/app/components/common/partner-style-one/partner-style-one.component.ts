import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-partner-style-one',
    templateUrl: './partner-style-one.component.html',
    styleUrls: ['./partner-style-one.component.scss']
})
export class PartnerStyleOneComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    sectionTitle = [
        {
            title: `Our Branding Partners`
        }
    ]
    partnerItem = [
        {
            img: `assets/img/partner/partner1.png`
        },
        {
            img: `assets/img/partner/partner2.png`
        },
        {
            img: `assets/img/partner/partner3.png`
        },
        {
            img: `assets/img/partner/partner4.png`
        },
        {
            img: `assets/img/partner/partner5.png`
        },
        {
            img: `assets/img/partner/partner6.png`
        }
    ]

}