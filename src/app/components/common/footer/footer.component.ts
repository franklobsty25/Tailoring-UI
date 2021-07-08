import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    singleFooterWidget = [
        {
            logo: `assets/img/logo.png`,
            paragraph: `To serve the world with quality custom tailored cloth within a specific period of time at the right time for a reasonable price.`
        }
    ]

    marxaYear: number = new Date().getFullYear();

}