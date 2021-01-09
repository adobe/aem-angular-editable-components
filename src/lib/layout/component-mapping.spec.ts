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

import { ComponentMapping, LazyMapTo, MapTo } from './component-mapping';
import LazyComponent from '../test/lazy-component-wrapper/lazy.component';

describe('Component Mapping', () => {
  it('stores configuration', async () => {
    const Component1 = function() { /* void */ };
    const Component2 = function() { /* void */ };
    const editConfig1 = { some: 1 };
    const editConfig2 = { some: 2 };

    MapTo('component1')(Component1, editConfig1);
    MapTo('component2')(Component2, editConfig2);
    LazyMapTo('lazycomponent3')(() => new Promise<unknown>((resolve, reject) => {
      import('../test/lazy-component-wrapper/lazy.component')
          .then((Module) => { resolve(Module.LazyComponent); })
          .catch(reject);
    }));
    LazyMapTo('lazycomponent4')(() => import('../test/lazy-component-wrapper/lazy.component').then((m) => m.LazyComponent));

    expect(ComponentMapping.get('component1')).toBe(Component1);
    expect(ComponentMapping.get('component2')).toBe(Component2);

    const LoadedComp = await ComponentMapping.lazyGet('lazycomponent3');

    expect(LoadedComp).toBe(LazyComponent);

    const DefaultComp = await ComponentMapping.lazyGet('lazycomponent4');

    expect(DefaultComp).toBe(LazyComponent);

    expect(ComponentMapping.getEditConfig('component1')).toBe(editConfig1);
    expect(ComponentMapping.getEditConfig('component2')).toBe(editConfig2);
  });
});
