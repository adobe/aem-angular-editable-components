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

@Component({
  selector: 'test-component',
  template: `<ng-container aemComponent [cqItem]='data'></ng-container>`
})
class AEMDirectiveTestComponent {
  @Input() data;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'directive-component',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
      '[attr.attr1]': 'attr1',
      '[attr.attr2]': 'attr2'
  },
  template: `<div></div>`
})
class DirectiveComponent extends AbstractMappedComponent {
  @Input() attr1;
  @Input() attr2;
}
MapTo<DirectiveComponent>('directive/comp')(DirectiveComponent);
LazyMapTo<LazyComponentType>('some/lazy/comp')(() => import('../test/lazy-component-wrapper/lazy.component').then((m) => m.LazyComponent));

describe('AEMComponentDirective', () => {

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
      declarations: [ AEMDirectiveTestComponent, DirectiveComponent, AEMComponentDirective ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ DirectiveComponent ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AEMDirectiveTestComponent);
    component = fixture.componentInstance;
  });

  it('should correctly pass the inputs', () => {
    const componentData = {
      attr1: 'Some value',
      attr2: 'Another value',
      ':type': 'directive/comp',
      appliedCssClassNames: 'applied-css-class1'
    };

    component.data = componentData;
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const dynamicElement = element.firstElementChild;

    expect(dynamicElement.getAttribute('attr1')).toEqual(componentData['attr1']);
    expect(dynamicElement.getAttribute('attr2')).toEqual(componentData['attr2']);
    expect(dynamicElement.getAttribute('class')).toEqual(componentData['appliedCssClassNames']);

  });
  it('should correctly pass the inputs for lazy component', async() => {
    const componentData = {
      some: 'Some value',
      ':type': 'some/lazy/comp'
    };

    component.data = componentData;

    await import('../test/lazy-component-wrapper/lazy.component');
    fixture.detectChanges();

  });

  it('should setup the placeholder', () => {
    isInEditorSpy.and.returnValue(true);
    getEditConfigSpy.and.returnValue(TEST_EDIT_CONFIG_EMPTY);

    const componentData = {
      attr1: 'Some value',
      attr2: 'Another value',
      ':type': 'directive/comp'
    };

    component.data = componentData;
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const dynamicElement = element.firstElementChild;

    expect(dynamicElement.dataset.emptytext).toEqual(TEST_EDIT_CONFIG_EMPTY.emptyLabel);
  });

  it('should NOT setup the placeholder', () => {
    isInEditorSpy.and.returnValue(true);
    getEditConfigSpy.and.returnValue(TEST_EDIT_CONFIG_NOT_EMPTY);

    const componentData = {
      attr1: 'Some value',
      attr2: 'Another value',
      ':type': 'directive/comp'
    };

    component.data = componentData;
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const dynamicElement = element.firstElementChild;

    expect(dynamicElement.dataset.emptytext).toBeUndefined();
  });

  it('should correctly update the inputs', () => {
    const componentData1 = {
      attr2: 'Initial value',
      ':type': 'directive/comp'
    };

    const componentData2 = {
      attr1: 'New value',
      attr2: 'Updated value',
      ':type': 'directive/comp'
    };

    component.data = componentData1;
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const dynamicElement = element.firstElementChild;

    fixture.detectChanges();
    expect(dynamicElement.getAttribute('attr1')).toEqual(null);
    expect(dynamicElement.getAttribute('attr2')).toEqual(componentData1['attr2']);

    component.data = componentData2;
    fixture.detectChanges();
    expect(dynamicElement.getAttribute('attr1')).toEqual(componentData2['attr1']);
    expect(dynamicElement.getAttribute('attr2')).toEqual(componentData2['attr2']);
  });
});
