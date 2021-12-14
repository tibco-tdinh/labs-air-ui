import { TestBed } from '@angular/core/testing';
import { Gateway } from 'src/app/shared/models/iot.model';
import {AuthService} from '../auth/auth.service';
import { DgraphService } from './dgraph.service';
import { AppConfigService } from '../config/app-config.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";


describe('DgraphService', () => {
  let dgraphService: DgraphService;
  let httpClientSpy: { get: jasmine.Spy };
  let valueServiceSpy: jasmine.SpyObj<DgraphService>;
  let httpTestingController: HttpTestingController;
  

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('DgraphService', ['get']);
    TestBed.configureTestingModule({ 
      imports: [HttpClientTestingModule],
      providers: [DgraphService, { provide: DgraphService, useValue: httpClientSpy }]
     });
    dgraphService = TestBed.inject(DgraphService);
    valueServiceSpy = TestBed.inject(DgraphService) as jasmine.SpyObj<DgraphService>;
    httpTestingController = TestBed.inject(HttpTestingController);

  });
   // Inject both the service-to-test and its (spy) dependency
  it('should return expected gateway (DgraphService called once)', (done: DoneFn) => {
    const expectedGateway: Gateway[] =
      [{uid: 1,
        description: "Manufacturing Devices",
        createdts: 0,
        updatedts: 0,
        uuid: "Plant",
        address: "",
        router: "",
        routerPort: "",
        deployNetwork: "",
        latitude: 0,
        longitude: 0,
        accessToken: "",
        platform: "",
        numDevices: 0,
        username: "",
        devicesMetadata: "",
        subscriptions: [],
        publishers: [],
        pipelines: [],
        dataStores: [],
        protocols: [],
        models: []}]

    httpClientSpy.get.and.returnValue(expectedGateway);
  
    dgraphService.getGateways().subscribe(
      response => {
        expect(response).toEqual(expectedGateway, 'expected gateways');
        done();
      },
      done.fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });


  it('should be created', () => {
    const service: DgraphService = TestBed.inject(DgraphService);
    expect(service).toBeTruthy();
  });
});
//{"data":{"resp":[]}}