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

/**
 * Selector that identifies the node that contains the WCM mode state
 */
const WCM_MODE_META_SELECTOR:string = 'meta[property="cq:wcmmode"]';

/**
 * The editor is in one of the edition modes
 */
const EDIT_MODE:string = 'edit';

/**
 * The editor is in preview mode
 */
const PREVIEW_MODE:string = 'preview';
/**
 * Returns if we are in the browser context or not by checking for the
 * existence of the window object
 */
function isBrowser() {
    try {
        return typeof window !== 'undefined';
    } catch (e) {
        return false;
    }
}

/**
 * Returns the current WCM mode
 *
 * <p>Note that the value isn't, as of the date of this writing, updated by the editor</p>
 */
function getWCMMode() {
    if (isBrowser()) {
      const wcmModeMeta:any = document.head.querySelector(WCM_MODE_META_SELECTOR);
      return wcmModeMeta && wcmModeMeta.content;
    }
}

/**
 * Helper functions for interacting with the AEM environment
 */
export const Utils = {

    /**
     * Is the app used in the context of the AEM Page editor
     */
    isInEditor() {
        const wcmMode = getWCMMode();
        return wcmMode && (EDIT_MODE === wcmMode || PREVIEW_MODE === wcmMode);
    }
};
