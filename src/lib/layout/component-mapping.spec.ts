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
import { Input, Type, Directive } from '@angular/core';
import LazyComponent, { LazyComponentType } from '../test/lazy-component-wrapper/lazy.component';

interface TestProperties extends MappedComponentProperties {
   some: string;
}

interface TestProperties2 {
  some: string;
}


@Directive()
class ComponentTest1 extends AbstractMappedComponent implements TestProperties {
  @Input() some = 'defaultValue';
}

@Directive()
class ComponentTest2 extends AbstractMappedComponent implements  TestProperties2 {
  @Input() some = 'otherDefaultValue';
}

describe('Component Mapping', () => {
  it('stores configuration - loosely typed for backwards compatibility', async () => {

    const editConfig1:EditConfig = { isEmpty: (props) => !!props.some };
    const editConfig2:EditConfig = { isEmpty: (props) => !!props.some };

    const editConfig3:EditConfig = { isEmpty: (props) => !!props.otherValue };
    MapTo('component1')(ComponentTest1, editConfig1);
    MapTo('component2')(ComponentTest2, editConfig2);
    LazyMapTo('lazycomponent3')(() => new Promise<Type<any>>((resolve, reject) => {
      import('../test/lazy-component-wrapper/lazy.component')
          .then((Module) => { resolve(Module.LazyComponent); })
          .catch(reject);
    }));
    LazyMapTo('lazycomponent4')(() => import('../test/lazy-component-wrapper/lazy.component').then((m) => m.LazyComponent), editConfig3);

    const LoadedComp = await ComponentMapping.lazyGet<LazyComponentType>('lazycomponent3');

    expect(LoadedComp).toBe(LazyComponent);

    expect(ComponentMapping.get('component1')).toBe(ComponentTest1);
    expect(ComponentMapping.get('component2')).toBe(ComponentTest2);
    const DefaultComp = await ComponentMapping.lazyGet('lazycomponent4');
    expect(DefaultComp).toBe(LazyComponent);

    expect(ComponentMapping.getEditConfig('component1')).toBe(editConfig1);
    expect(ComponentMapping.getEditConfig('component2')).toBe(editConfig2);
  });


  it('stores configuration - strongly typed with a generic for better typechecking', async () => {

    const editConfig1:EditConfig<TestProperties> = { isEmpty: (props) => !!props.some };
    const editConfig2:EditConfig = { isEmpty: (props) => !!props.some };
    const editConfig3:EditConfig<LazyComponentType> = { isEmpty: (props) => !!props.otherValue };


    MapTo<TestProperties>('component1')(ComponentTest1, editConfig1);
    MapTo('component2')(ComponentTest2, editConfig2);
    LazyMapTo<LazyComponentType>('lazycomponent3')(() => new Promise<Type<LazyComponentType>>((resolve, reject) => {
      import('../test/lazy-component-wrapper/lazy.component')
          .then((Module) => { resolve(Module.LazyComponent); })
          .catch(reject);
    }));

    LazyMapTo<LazyComponentType>('lazycomponent4')(() => import('../test/lazy-component-wrapper/lazy.component').then((m) => m.LazyComponent), editConfig3);

    const LoadedComp:Type<LazyComponentType> = await ComponentMapping.lazyGet<LazyComponentType>('lazycomponent3');

    expect(LoadedComp).toBe(LazyComponent);

    expect(ComponentMapping.get<TestProperties>('component1')).toBe(ComponentTest1);
    expect(ComponentMapping.get('component2')).toBe(ComponentTest2);
    const DefaultComp:Type<LazyComponentType> = await ComponentMapping.lazyGet('lazycomponent4');
    expect(DefaultComp).toBe(LazyComponent);

    expect(ComponentMapping.getEditConfig<TestProperties>('component1')).toBe(editConfig1);
    expect(ComponentMapping.getEditConfig('component2')).toBe(editConfig2);
  });
});
