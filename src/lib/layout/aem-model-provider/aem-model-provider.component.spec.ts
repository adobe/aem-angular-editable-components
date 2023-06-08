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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { AEMModelProviderComponent } from '../aem-model-provider/aem-model-provider.component';
import { Model, ModelManager } from '@adobe/aem-spa-page-model-manager';
import { AEMComponentDirective } from '../aem-component.directive';
import '../../test/mapping';

describe('AEMModelProviderComponent', () => {

  const TEST_MODEL_DATA = {
    text: 'Test model data'
  };

  let component: AEMModelProviderComponent;
  let fixture: ComponentFixture<AEMModelProviderComponent>;
  let getDataSpy;

  beforeEach(() => {
    spyOn(ModelManager, 'addListener').and.returnValue(undefined);
    getDataSpy = spyOn(ModelManager, 'getData').and.returnValue(Promise.resolve(TEST_MODEL_DATA as Model));

    TestBed.configureTestingModule({
      declarations: [ AEMComponentDirective, AEMModelProviderComponent ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {}
    }).compileComponents();

    fixture = TestBed.createComponent(AEMModelProviderComponent);
    component = fixture.componentInstance;
  });

  it('should call ModelManager#getData when updateItem is called', () => {
    fixture.detectChanges();
    expect(getDataSpy.calls.count()).toEqual(0);
    component.updateItem();
    expect(getDataSpy.calls.count()).toEqual(1);
  });

  it('should emit event to update path for remote spa', () => {
    spyOn(component.updateDataPath, 'emit');
    component.pagePath = '/test';
    fixture.detectChanges();
    expect(component.updateDataPath.emit).toHaveBeenCalledWith({ cqPath: '/test' });
  });

  it('should fetch model for remote spa', () => {
    expect(getDataSpy.calls.count()).toEqual(0);
    component.pagePath = '/test';
    fixture.detectChanges();
    expect(getDataSpy.calls.count()).toEqual(1);
  });
});
