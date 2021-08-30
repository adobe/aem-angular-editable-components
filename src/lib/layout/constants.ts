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

import { Constants as PMConstants } from '@adobe/aem-spa-page-model-manager';

export const Constants = {

    /**
     * Class names associated with a new section component
     *
     */
    NEW_SECTION_CLASS_NAMES: 'new section',

    TYPE_PROP: PMConstants.TYPE_PROP,

    /**
     * List of child items of an item
     *
     */
    ITEMS_PROP: PMConstants.ITEMS_PROP,

    /**
     * Order in which the items should be listed
     *
     */
    ITEMS_ORDER_PROP: PMConstants.ITEMS_ORDER_PROP,

    /**
     * Path of the item
     *
     */
    PATH_PROP: PMConstants.PATH_PROP,

    /**
     * Children of an item
     *
     */
    CHILDREN_PROP: PMConstants.CHILDREN_PROP,

    /**
     * Path of the resource in the model
     *
     */
    DATA_PATH_PROP: ':dataPath',

    /**
     * Hierarchical type of the item
     */
    HIERARCHY_TYPE_PROP: PMConstants.HIERARCHY_TYPE_PROP,

    /**
     * Event which indicates that content of remote component has been fetched and loaded in the app
     */
     ASYNC_CONTENT_LOADED_EVENT: 'cq-async-content-loaded'
};
