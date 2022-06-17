import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-join-now',
    templateUrl: './join-now.component.html',
    styleUrls: ['./join-now.component.scss']
})
export class JoinNowComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    joinNowContent = [
        {
            title: `Join tailoringhub for Free`,
            paragraph: `Register as a tailor and upload your designs to the world for your customers to place order and sow for them.`,
            buttonText: `Join Now`,
            buttonLink: `http://tailor.colonkoded.com`
        }
    ]

}
