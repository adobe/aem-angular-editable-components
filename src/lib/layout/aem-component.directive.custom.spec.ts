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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { AEMComponentDirective } from './aem-component.directive';
import { Component, Input } from '@angular/core';
import { ComponentMapping, MapTo, LazyMapTo, AbstractMappedComponent } from './component-mapping';
import { Utils } from './utils';
import { LazyComponentType } from "../test/lazy-component-wrapper/lazy.component";
import {CustomDefaultRenderer} from "../test/aem-component-directive/custom-default-renderer";
import {CustomDirective} from "../test/aem-component-directive/customdirective";





@Component({
  selector: 'test-component',
  template: `<ng-container CustomDirective [cqItem]='data'></ng-container>`
})
class AEMDirectiveTestComponent {
  @Input() data;
}



@Component({
  selector: 'directive-component',
  host: {
    '[attr.attr1]': 'attr1',
    '[attr.attr2]': 'attr2',
    '[class]': 'hostClasses'
  },
  template: `<div></div>`
})
class DirectiveComponent extends AbstractMappedComponent {
  @Input() attr1;
  @Input() attr2;

  get hostClasses() {
    return 'component-class';
  }
}
MapTo<DirectiveComponent>('directive/comp')(DirectiveComponent);
LazyMapTo<LazyComponentType>('some/lazy/comp')(() => import('../test/lazy-component-wrapper/lazy.component').then((m) => m.LazyComponent));

describe('AEMComponentDirective - Custom', () => {

  const EDIT_CONFIG_EMPTY_LABEL = 'Edit config empty label';

  const TEST_EDIT_CONFIG_EMPTY = {
    emptyLabel: EDIT_CONFIG_EMPTY_LABEL,
    isEmpty: () => {
      return true;
    }
  };

  const TEST_EDIT_CONFIG_NOT_EMPTY = {
    emptyLabel: EDIT_CONFIG_EMPTY_LABEL,
    isEmpty: function() {
      return false;
    }
  };

  let component: AEMDirectiveTestComponent;
  let fixture: ComponentFixture<AEMDirectiveTestComponent>;

  let isInEditorSpy;
  let getEditConfigSpy;

  beforeEach(async(() => {
    isInEditorSpy = spyOn(Utils, 'isInEditor').and.returnValue(false);
    getEditConfigSpy = spyOn(ComponentMapping, 'getEditConfig').and.returnValue(undefined);

    TestBed.configureTestingModule({
      declarations: [ AEMDirectiveTestComponent, DirectiveComponent,CustomDefaultRenderer,CustomDirective, AEMComponentDirective ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ DirectiveComponent,  CustomDefaultRenderer,CustomDirective ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AEMDirectiveTestComponent);
    component = fixture.componentInstance;
  });

  it('should render the fallback component', async () => {
    const componentData = {
      attr1: 'Some value',
      attr2: 'Another value',
      ':customType': 'missing/directive/comp'
    };

    component.data = componentData;
    fixture.detectChanges();

    await fixture.whenStable();

    const element = fixture.nativeElement;
    const dynamicElement = element.firstElementChild;

    expect(dynamicElement.innerHTML).toEqual("<div id=\"myCustomComponent\">test</div>")
  });



});
