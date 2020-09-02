module.exports = {
    out: './docs/',
    readme: 'none',
    includes: './projects/aem-angular-editable-components/src/lib',
    mode: 'file',
    exclude: [
        '**/test/**/*',
        '**/aem-angular-editable-components.module.ts'
    ],
    excludeExternals: true,
    excludeNotExported: true,
    excludePrivate: true,
    target: 'ES6'
};
