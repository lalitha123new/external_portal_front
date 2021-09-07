import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {DashBoardComponent } from '../app/dash-board/dash-board.component';
import {TestListComponent} from '../app/test-list/test-list.component';
import {ReactiveFormComponent} from '../app/reactive-form/reactive-form.component';
import {DescriptionComponent} from '../app/description/description.component';
import {AuthGuard} from './auth.guard';
import { NotificationComponent } from './notification/notification.component';
import { WriteMessageComponent } from './write-message/write-message.component';
import { SendMessageComponent } from './send-message/send-message.component';


const parentModuleRoutes: Routes = [
{
    path:'dashboard',
    component: DashBoardComponent,
    children: [                          //<---- child components declared here
        {
            path:'testlist',
            component: TestListComponent
        },
        {
            path:'add',
            component: ReactiveFormComponent
        },
        {
            path:'update/:sample_id',
            component: ReactiveFormComponent
        },
        {
            path:'desc/:sample_id',
            component: DescriptionComponent
        }, {
            path:'notification',
            component: NotificationComponent
        },
        {
            path:'send-message',
            component: SendMessageComponent
        },
        {
            path:'write-message',
            component: WriteMessageComponent
        }
    ],
    canActivate: [AuthGuard]
}
];

@NgModule({
    imports: [
        RouterModule.forChild(parentModuleRoutes)
    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})
export class ParentRoutingModule { 

}