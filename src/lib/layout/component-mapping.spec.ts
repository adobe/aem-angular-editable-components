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

import { ComponentMapping, MapTo, MappedComponentProperties, EditConfig, AbstractMappedComponent, LazyMapTo } from './component-mapping';
import { Input, Type } from '@angular/core';
import LazyComponent from '../test/lazy-component-wrapper/lazy.component';

interface TestProperties extends MappedComponentProperties{
   some: string;
}

class ComponentTest1 extends AbstractMappedComponent {
  @Input() some = 'defaultValue';
}

class ComponentTest2 extends AbstractMappedComponent {
  @Input() some = 'otherDefaultValue';
}

describe('Component Mapping', () => {
  it('stores configuration', async () => {

    const editConfig1:EditConfig<TestProperties> = { isEmpty: (props) => !!props.some };
    const editConfig2:EditConfig<TestProperties> = { isEmpty: (props) => !!props.some };

    MapTo<TestProperties>('component1')(ComponentTest1, editConfig1);
    MapTo<TestProperties>('component2')(ComponentTest2, editConfig2);
    LazyMapTo('lazycomponent3')(() => new Promise<Type<MappedComponentProperties>>((resolve, reject) => {
      import('../test/lazy-component-wrapper/lazy.component')
          .then((Module) => { resolve(Module.LazyComponent); })
          .catch(reject);
    }));

    const LoadedComp = await ComponentMapping.lazyGet('lazycomponent3');

    expect(LoadedComp).toBe(LazyComponent);

    expect(ComponentMapping.get('component1')).toBe(ComponentTest1);
    expect(ComponentMapping.get('component2')).toBe(ComponentTest2);
    expect(ComponentMapping.getEditConfig('component1')).toBe(editConfig1);
    expect(ComponentMapping.getEditConfig('component2')).toBe(editConfig2);

    expect(ComponentMapping.getEditConfig('component1')).toBe(editConfig1);
    expect(ComponentMapping.getEditConfig('component2')).toBe(editConfig2);
  });
});
