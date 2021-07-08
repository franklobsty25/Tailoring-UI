import { Component, OnInit, ViewChild } from '@angular/core';
import { Message } from '../../../shared/models/message';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-contact-page',
    templateUrl: './contact-page.component.html',
    styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {
    @ViewChild('contactForm') contactFormDirective;
    success: string;
    message: Message;

    constructor( private authService: AuthService ) { }

    ngOnInit(): void {
    }

    submit(form){
        this.message = form.value;
        this.authService.contactMessage(this.message)
        .subscribe(res => {
            if (res.success)
            this.success = res.status;
            this.contactFormDirective.resetForm();
        },
        err => {
            console.log(err);
        });
    }

    pageTitle = [
        {
            bgImage: `assets/img/page-title/banner.jpg`, // page-title3.jpg
            title: `Contact Us`,
            paragraph: `Feel free to contact us and we will get back to you as soos as we can!`
        }
    ]

}