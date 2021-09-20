# AEM Remote Component

The <angular-remote-component> selector can now be used to fetch existing content from AEM and render it in the remote SPA. For example, to render the text content at `/content/test/home/jcr:content/root/text` on your AEM instance, the following snippet can be inserted at the desired location within the SPA.

```html
<aem-remote-component pagePath="/content/test-app/home" itemPath="root/text"></aem-remote-component>
```

## Prerequisites

- ModelManager is initialized
- AEM instance is up and running
- Data exists at path provided to the component
- Component corresponding to the fetched data is present on the SPA side as well and mapped to the resourceType.


