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

import { ActivatedRouteSnapshot, RouteReuseStrategy, DetachedRouteHandle } from '@angular/router';

/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Implements RouteReuseStrategy to customize route reuse.
 */
export class AemPageRouteReuseStrategy implements RouteReuseStrategy {
  /** Determines if this route (and its subtree) should be detached to be reused later. */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  /** Not storing deteached route. */
  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void { /* void */ }

  /** Determines if this route (and its subtree) should be reattached. */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  /** Retrieves the previously stored route. */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null;
  }

  /** Determines if a route should be reused */
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return false;
  }
}
