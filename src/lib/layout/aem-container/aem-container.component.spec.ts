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

import { AEMContainerComponent } from './aem-container.component';
import { AEMComponentDirective } from '../aem-component.directive';
import { AEMModelProviderComponent } from '../aem-model-provider/aem-model-provider.component';
import { AEMResponsiveGridComponent } from '../aem-responsivegrid/aem-responsivegrid.component';
import { ModelManager } from '@adobe/aem-spa-page-model-manager';
import { Component1 } from '../../test/test-comp1.component';
import { Component2 } from '../../test/test-comp2.component';
import { Component3 } from '../../test/test-comp3.component';
import { Constants } from '../constants';

import '../../test/mapping';

describe('AEMContainerComponent', () => {
  let component: AEMContainerComponent;
  let fixture: ComponentFixture<AEMContainerComponent>;

  const layout = require('../../test/data/layout.json');

  beforeEach(() => {
    spyOn(ModelManager, 'addListener').and.returnValue(undefined);

    TestBed.configureTestingModule({
      declarations: [ AEMContainerComponent,
        AEMComponentDirective,
        AEMModelProviderComponent,
        Component1,
        Component2,
        Component3,
        AEMResponsiveGridComponent ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [Component1, Component2, Component3, AEMResponsiveGridComponent]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(AEMContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const checkComponent = function(element, elementName, dataPath, cssClass, content?) {
    expect(element.matches(`${elementName}${cssClass}[data-cq-data-path="${dataPath}"]`)).toBeTruthy();
    if (content) {
      expect(element.getAttribute('data-title')).toEqual(content);
    }
    return element;
  };

  it('should generate the correct layout', () => {
    component.cqItems = layout[Constants.ITEMS_PROP];
    component.cqItemsOrder = layout[Constants.ITEMS_ORDER_PROP];
    component.cqPath = layout[Constants.PATH_PROP];

    fixture.detectChanges();
    let element = fixture.nativeElement;
    element = checkComponent(element.firstElementChild.firstElementChild,
      'aem-responsivegrid', 'root', '.aem-container.test-class-names.aem-Grid\\/root');

    element = checkComponent(element.firstElementChild.firstElementChild, 'aem-responsivegrid',
      'root/responsivegrid', '.aem-container.aem-Grid\\/root\\/responsivegrid');

    element = checkComponent(element.firstElementChild, 'div',
      'root/responsivegrid/component1',
      '.aem-GridColumn\\/root\\/responsivegrid\\/component1');
    expect(element.firstElementChild.matches(`test-comp1[data-title="Component1"]`)).toBeTruthy();

    element = checkComponent(element.nextElementSibling, 'div',
      'root/responsivegrid/component3',
      '.aem-GridColumn\\/root\\/responsivegrid\\/component3');
    expect(element.firstElementChild.matches(`test-comp3[data-title="Component3"]`)).toBeTruthy();

    element = checkComponent(element.nextElementSibling, 'div',
      'root/responsivegrid/component5',
      '.aem-GridColumn\\/root\\/responsivegrid\\/component5');
    expect(element.firstElementChild.matches(`test-comp1[data-title="Component5"]`)).toBeTruthy();

    element = checkComponent(element.nextElementSibling, 'div',
      'root/responsivegrid/component2',
      '.aem-GridColumn\\/root\\/responsivegrid\\/component2');
    expect(element.firstElementChild.matches(`test-comp2[data-title="Component2"]`)).toBeTruthy();

    element = checkComponent(element.nextElementSibling, 'div',
      'root/responsivegrid/component4',
      '.aem-GridColumn\\/root\\/responsivegrid\\/component4');
    expect(element.firstElementChild.matches(`test-comp2[data-title="Component4"]`)).toBeTruthy();

    expect(component).toBeTruthy();
  });

  it('should create placeholder', () => {
    component.cqItems = layout[Constants.ITEMS_PROP];
    component.cqItemsOrder = layout[Constants.ITEMS_ORDER_PROP];
    component.classNames = layout.classNames;

    fixture.detectChanges();
    let element = fixture.nativeElement;

    element = element.firstElementChild.firstElementChild;
    expect(element.querySelector('div[data-cq-data-path="root/*"][class="new section"]')).toBeDefined();

    element = element.firstElementChild.firstElementChild;
    expect(element.querySelector('div[data-cq-data-path="root/responsivegrid/*"][class="new section"]')).toBeDefined();
  });
});
