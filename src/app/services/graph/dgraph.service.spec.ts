import { TestBed } from '@angular/core/testing';
import { Gateway } from 'src/app/shared/models/iot.model';

import { DgraphService } from './dgraph.service';

describe('DgraphService', () => {
  let dgraphService: DgraphService;
  let httpClientSpy: { get: jasmine.Spy };
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  });
  it('should return expected gateway (HttpClient called once)', (done: DoneFn) => {
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
    const service: DgraphService = TestBed.get(DgraphService);
    expect(service).toBeTruthy();
  });
});
//{"data":{"resp":[]}}