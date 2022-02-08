import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppConfigService } from './services/config/app-config.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgxHeatmapModule } from 'ngx-heatmap';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { StarterAppComponent } from './routes/starter-app/starter-app.component';
import { SplashComponent } from './routes/splash/splash.component';

import { HomeComponent } from './routes/home/home.component';
import { IotHomeCockpitComponent } from './components/iot-home-cockpit/iot-home-cockpit.component';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { GraphService } from './services/graph/graph.service';
import { DgraphService } from './services/graph/dgraph.service';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { IotGatewayEndpointComponent } from './components/iot-gateway-endpoint/iot-gateway-endpoint.component';
import { IgeModelsComponent } from './components/iot-gateway-endpoint/ige-models/ige-models.component';
import { IgeDataStoresComponent } from './components/iot-gateway-endpoint/ige-data-stores/ige-data-stores.component';
import { IgeProtocolsComponent } from './components/iot-gateway-endpoint/ige-protocols/ige-protocols.component';
import { IotEdgeDataPipelineComponent } from './components/iot-edge-data-pipeline/iot-edge-data-pipeline.component';
import { FilteringComponent } from './components/iot-edge-data-pipeline/filtering/filtering.component';
import { InferencingComponent } from './components/iot-edge-data-pipeline/inferencing/inferencing.component';
import { RulesComponent } from './components/iot-edge-data-pipeline/rules/rules.component';
import { IotGatewayDashboardComponent } from './components/iot-gateway-dashboard/iot-gateway-dashboard.component';
import { SpotfireDashboardComponent } from './components/spotfire-dashboard/spotfire-dashboard.component';
import { IotStoreSimulatorComponent } from './components/iot-simulator/iot-store-simulator/iot-store-simulator.component';
import { IotTextileSimulatorComponent } from './components/iot-simulator/iot-textile-simulator/iot-textile-simulator.component';
import { IotDashboardComponent } from './components/iot-dashboard/iot-dashboard.component';

import { CommonLibraryModule } from 'common';

const appInitializerFn = (appConfig: AppConfigService) => {
    return () => {
        return appConfig.loadAppConfig();
    };
};

@NgModule({
    declarations: [
        AppComponent,
        StarterAppComponent,
        SplashComponent,
        HomeComponent,
        IotHomeCockpitComponent,
        NavBarComponent,
        IotGatewayEndpointComponent,
        IgeModelsComponent,
        IgeDataStoresComponent,
        IgeProtocolsComponent,
        IotEdgeDataPipelineComponent,
        FilteringComponent,
        InferencingComponent,
        RulesComponent,
        IotGatewayDashboardComponent,
        SpotfireDashboardComponent,
        IotStoreSimulatorComponent,
        IotTextileSimulatorComponent,
        IotDashboardComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        NgxHeatmapModule,
        Ng2GoogleChartsModule,
        NgChartsModule,
        CommonLibraryModule
    ],
    providers: [
        AppConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFn,
            multi: true,
            deps: [AppConfigService],
        },
        DatePipe,
        { provide: GraphService, useClass: DgraphService },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
