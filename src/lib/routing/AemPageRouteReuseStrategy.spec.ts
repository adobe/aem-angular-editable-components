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

import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { AemPageRouteReuseStrategy } from './AemPageRouteReuseStrategy';

describe('AemPageRouteReuseStrategy', () => {
  let aemPageRouteReuseStrategy: AemPageRouteReuseStrategy;
  let route: ActivatedRouteSnapshot;

  beforeEach(() => {
    aemPageRouteReuseStrategy = new AemPageRouteReuseStrategy();
    route = ({} as any) as ActivatedRouteSnapshot;
  });

  it('should return false when calling shouldDetach(route)', () => {
    expect(aemPageRouteReuseStrategy.shouldDetach(route)).toBe(false);
  });

  it('should return false when calling shouldDetach(route)', () => {
    expect(aemPageRouteReuseStrategy.store({} as ActivatedRouteSnapshot, {} as DetachedRouteHandle)).toBeUndefined();
  });

  it('should return false when calling shouldAttach(route)', () => {
    expect(aemPageRouteReuseStrategy.shouldAttach(route)).toBe(false);
  });

  it('should return null when calling retrieve(route)', () => {
    expect(aemPageRouteReuseStrategy.retrieve(route)).toBeNull();
  });

  it('should return false when calling shouldReuseRoute(route)', () => {
    expect(aemPageRouteReuseStrategy.shouldReuseRoute(route, route)).toBe(false);
  });
});
