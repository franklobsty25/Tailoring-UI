import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-how-it-works-page',
    templateUrl: './how-it-works-page.component.html',
    styleUrls: ['./how-it-works-page.component.scss']
})
export class HowItWorksPageComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    pageTitle = [
        {
            bgImage: `assets/img/page-title/banner.jpg`, // page-title5.jpg
            title: `Company Profile`,
        }
    ]
    singleHowItWorkBox = [
        {
            title: `Company Profile`,
            paragraph: `We ignite opportunity by setting the world of design and tailoring in motion.`,
            paragraph2: `Good things happen when people look good, whether the design or designer is local or foreign. Opportunities appear, open up and become reality. What started as a way to tap a button to get a custom design clothing will led to millions of textile, designs and designers connect to as many people around the world to custom design and receive them in the shot possible time with the help of our technology.`,
            paragraph3: `Tailoringhub ltd was incorporated in 2021 West Africa Ghana to serve as a platform that bring together industry players in textiles, designs and designers onto a single platform open to everyone on earth who has internet connection. Individuals and groups now have the opportunity to choose among varieties of designs created on the platform or use our unique algorithms to create their custom designs for them self.`,
            paragraph4: `This platform seeks to brake national and cultural barriers in the world of fashion and designs by allowing creative conceptual designers make money of their intellectual properties and bring on board large poll of professional tailors from around the world to provide their services to the world.   `,
            buttonText: `Register`,
            buttonLink: `profile-authentication`,
            img: `assets/img/how-it-works/about-logo.jpg`
        },
        {
            title: `Mission`,
            paragraph: `To serve the world with quality custom tailored cloth within a specific period of time at the right time for a reasonable price.`,
            title2: `Vision`,
            paragraph5: `To tailor the world with custom design cloths.`,
            img: `assets/img/how-it-works/about-logo.jpg`
        },
        {
            title: `Integrity`,
            paragraph: `Our word is our bond. At Tailoringhub, what we genuinely care about most is the trust between all parties.`,
            title2: `Excellence`,
            title3: `Speed`,
            title4: `Customer-centric`,
            paragraph5: `Our high standards drive us to achieve nothing but excellence with each design and product.`,
            paragraph6: `Time is an extremely limited resource and we understand that. That is why speed is a priority to us.`,
            paragraph7: `Our aim to make customer experience exceptional is what drives us to always be customer centric.`,
            img: `assets/img/how-it-works/about-logo.jpg`
        }
    ]

}