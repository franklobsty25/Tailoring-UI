import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard-agents',
    templateUrl: './dashboard-agents.component.html',
    styleUrls: ['./dashboard-agents.component.scss']
})
export class DashboardAgentsComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    pageTitle = [
        {
            bgImage: `assets/img/page-title/page-title4.jpg`,
            title: `My Dashboard`,
        }
    ]

}