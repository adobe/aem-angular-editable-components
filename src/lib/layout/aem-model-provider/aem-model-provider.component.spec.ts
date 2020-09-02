/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';

import {AEMModelProviderComponent} from '../aem-model-provider/aem-model-provider.component';
import {ModelManager} from '@adobe/aem-spa-page-model-manager';
import {AEMComponentDirective} from '../aem-component.directive';

import '../../test/mapping';

describe('AEMModelProviderComponent', () => {

  const TEST_MODEL_DATA = {
    text: 'Test model data'
  };

  let component: AEMModelProviderComponent;
  let fixture: ComponentFixture<AEMModelProviderComponent>;
  let getDataSpy;

  beforeEach(() => {
    getDataSpy = spyOn(ModelManager, 'getData').and.returnValue(Promise.resolve(TEST_MODEL_DATA));

    TestBed.configureTestingModule({
      declarations: [ AEMComponentDirective, AEMModelProviderComponent ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [AEMModelProviderComponent]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(AEMModelProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call ModelManager#getData when updateItem is called', () => {
    expect(getDataSpy.calls.count()).toEqual(0);
    component.updateItem();
    expect(getDataSpy.calls.count()).toEqual(1);
  });
});
