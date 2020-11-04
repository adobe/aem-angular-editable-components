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

import { ActivatedRouteSnapshot } from '@angular/router';
import { AemPageDataResolver } from './AemPageDataResolver';

describe('AemPageDataResolver', () => {
  it('should return absolute resource path without extension (/conteent/abc)', () => {
    const route = ({ url: [ 'content', 'abc' ] } as any) as ActivatedRouteSnapshot;
    const aemPageDataResolver = new AemPageDataResolver();

    expect(aemPageDataResolver.resolve(route)).toBe('/content/abc');
  });

  it('should return absolute resource path without extension (/content/abc/def/ghi)', () => {
    const route = ({ url: [ 'content', 'abc', 'def', 'ghi.html' ] } as any) as ActivatedRouteSnapshot;
    const aemPageDataResolver = new AemPageDataResolver();

    expect(aemPageDataResolver.resolve(route)).toBe('/content/abc/def/ghi');
  });
});
