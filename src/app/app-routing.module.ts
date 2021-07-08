import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { DashboardAddAgentComponent } from './components/my-dashboard/dashboard-add-agent/dashboard-add-agent.component';
import { DashboardAddCouponComponent } from './components/my-dashboard/dashboard-add-coupon/dashboard-add-coupon.component';
import { DashboardAddDealComponent } from './components/my-dashboard/dashboard-add-deal/dashboard-add-deal.component';
import { DashboardAgentsComponent } from './components/my-dashboard/dashboard-agents/dashboard-agents.component';
import { DashboardCouponsComponent } from './components/my-dashboard/dashboard-coupons/dashboard-coupons.component';
import { DashboardDealsComponent } from './components/my-dashboard/dashboard-deals/dashboard-deals.component';
import { DashboardProfileComponent } from './components/my-dashboard/dashboard-profile/dashboard-profile.component';
import { DashboardStoreComponent } from './components/my-dashboard/dashboard-store/dashboard-store.component';
import { DashboardVouchersComponent } from './components/my-dashboard/dashboard-vouchers/dashboard-vouchers.component';
import { MyDashboardComponent } from './components/my-dashboard/my-dashboard.component';
import { BlogDetailsPageComponent } from './components/pages/blog-details-page/blog-details-page.component';
import { BlogGridPageComponent } from './components/pages/blog-grid-page/blog-grid-page.component';
import { BlogRightSidebarPageComponent } from './components/pages/blog-right-sidebar-page/blog-right-sidebar-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { CategoriesPageComponent } from './components/pages/categories-page/categories-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { ComingSoonPageComponent } from './components/pages/coming-soon-page/coming-soon-page.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { CouponsPageComponent } from './components/pages/coupons-page/coupons-page.component';
import { CustomerServicePageComponent } from './components/pages/customer-service-page/customer-service-page.component';
import { DealsDetailsPageComponent } from './components/pages/deals-details-page/deals-details-page.component';
import { DealsPageComponent } from './components/pages/deals-page/deals-page.component';
import { FaqPageComponent } from './components/pages/faq-page/faq-page.component';
import { GalleryPageComponent } from './components/pages/gallery-page/gallery-page.component';
import { HomeDemoOneComponent } from './components/pages/home-demo-one/home-demo-one.component';
import { HomeDemoThreeComponent } from './components/pages/home-demo-three/home-demo-three.component';
import { HomeDemoTwoComponent } from './components/pages/home-demo-two/home-demo-two.component';
import { HowItWorksPageComponent } from './components/pages/how-it-works-page/how-it-works-page.component';
import { LocationsPageComponent } from './components/pages/locations-page/locations-page.component';
import { ProductsDetailsPageComponent } from './components/pages/products-details-page/products-details-page.component';
import { ProductsListPageComponent } from './components/pages/products-list-page/products-list-page.component';
import { ProfileAuthenticationPageComponent } from './components/pages/profile-authentication-page/profile-authentication-page.component';
import { StoresDetailsPageComponent } from './components/pages/stores-details-page/stores-details-page.component';
import { StoresPageComponent } from './components/pages/stores-page/stores-page.component';

import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
    {path: '', component: HomeDemoOneComponent},
    {path: 'index-2', component: HomeDemoTwoComponent},
    {path: 'index-3', component: HomeDemoThreeComponent},
    {path: 'stores/:id', component: DealsPageComponent},
    {path: 'deals-details/:id', component: DealsDetailsPageComponent},
    {path: 'coupons', component: CouponsPageComponent},
    {path: 'all-stores', component: StoresPageComponent},
    {path: 'stores-details', component: StoresDetailsPageComponent},
    {path: 'locations', component: LocationsPageComponent},
    {path: 'categories', component: CategoriesPageComponent},
    {path: 'gallery', component: GalleryPageComponent},
    {path: 'how-it-works', component: HowItWorksPageComponent},
    {path: 'faq', component: FaqPageComponent},
    {path: 'products-list', component: ProductsListPageComponent},
    {path: 'products-details', component: ProductsDetailsPageComponent},
    {path: 'cart', component: CartPageComponent},
    {path: 'checkout/:id', component: CheckoutPageComponent},
    {path: 'customer-service', component: CustomerServicePageComponent},
    {path: 'reset-password', component: ComingSoonPageComponent},
    {path: 'profile-authentication', component: ProfileAuthenticationPageComponent},
    {path: 'blog-grid', component: BlogGridPageComponent},
    {path: 'blog-right-sidebar', component: BlogRightSidebarPageComponent},
    {path: 'blog-details', component: BlogDetailsPageComponent},
    {path: 'contact', component: ContactPageComponent},
    {path: 'dashboard', component: MyDashboardComponent, canActivate: [AuthGuard]},
    {path: 'dashboard-profile', component: DashboardProfileComponent},
    {path: 'dashboard-store', component: DashboardStoreComponent},
    {path: 'dashboard-coupons', component: DashboardCouponsComponent},
    {path: 'dashboard-add-coupon', component: DashboardAddCouponComponent},
    {path: 'dashboard-deals', component: DashboardDealsComponent},
    {path: 'dashboard-add-deal', component: DashboardAddDealComponent},
    {path: 'dashboard-vouchers', component: DashboardVouchersComponent},
    {path: 'dashboard-agents', component: DashboardAgentsComponent},
    {path: 'dashboard-add-agent', component: DashboardAddAgentComponent},
    // Here add new pages component

    {path: '**', component: NotFoundComponent} // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }