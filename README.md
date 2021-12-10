# Hidden Entity Links

![GitHub issues](https://img.shields.io/github/issues-raw/earlSt1/vtt-hidden-entity-links?style=for-the-badge) 

![Latest Release Download Count](https://img.shields.io/github/downloads/earlSt1/vtt-hidden-entity-links/latest/module.zip?color=2b82fc&label=DOWNLOADS&style=for-the-badge) 

[![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fhidden-entity-links&colorB=006400&style=for-the-badge)](https://forge-vtt.com/bazaar#package=hidden-entity-links) 

![Foundry Core Compatible Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2FearlSt1%2Fvtt-hidden-entity-links%2Fmaster%2Fmodule.json&label=Foundry%20Version&query=$.compatibleCoreVersion&colorB=orange&style=for-the-badge)

![Latest Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2FearlSt1%2Fvtt-hidden-entity-links%2Fmaster%2Fmodule.json&label=Latest%20Release&prefix=v&query=$.version&colorB=red&style=for-the-badge)

[![Foundry Hub Endorsements](https://img.shields.io/endpoint?logoColor=white&url=https%3A%2F%2Fwww.foundryvtt-hub.com%2Fwp-json%2Fhubapi%2Fv1%2Fpackage%2Fhidden-entity-links%2Fshield%2Fendorsements&style=for-the-badge)](https://www.foundryvtt-hub.com/package/hidden-entity-links/)

![GitHub all releases](https://img.shields.io/github/downloads/earlSt1/vtt-hidden-entity-links/total?style=for-the-badge) 

A module for FoundryVTT which hides entities in the sidebar if players have Limited access to them. This means you can provide secret documents to your players without them seeing them in the sidebar.

![hidden_links6](./wiki/shocase_hidden_entity_link.gif)

## Instructions

In the module settings you will find options to hide each entity type (apart from Macros) from your players if they have limited access.

The concept is hide everything on the sidebar, but still have permissions , a classic use is a merchant in apsecific scene cna be used only on that scene not on the sidebar.

The graphic interaction with new choices on the sidebar context let you decide the entity/document you want to make secret with a simple right click on the specific element or the folder of the sidebar, so you can hide , unhide multiple elements with one click.

Any issues feel free to ping me on Discord (@Erceron#0370)

Here some screenshots

![img1](./wiki/scene_hide_1.png)![img2](./wiki/scene_hide_2.png)![img3](./wiki/scene_hide_3.png)![img4](./wiki/actor_hide_all.png)![img5](./wiki/actor_hide_1.png)![img6](./wiki/item_hide_1.png)![img7](./wiki/journalentry_hide_1.png)![img8](./wiki/rolltable_hide_1.png)

## Contribution

If you'd like to support my work, feel free to buy me a coffee at my kofi

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/erceron)


## Installation

It's always easiest to install modules from the in game add-on browser.

To install this module manually:
1.  Inside the Foundry "Configuration and Setup" screen, click "Add-on Modules"
2.  Click "Install Module"
3.  In the "Manifest URL" field, paste the following url:
`https://raw.githubusercontent.com/earlSt1/hidden-entity-links/master/module.json`
1.  Click 'Install' and wait for installation to complete
2.  Don't forget to enable the module in game using the "Manage Module" button

### libWrapper

This module uses the [libWrapper](https://github.com/ruipin/fvtt-lib-wrapper) library for wrapping core methods. It is a hard dependency and it is recommended for the best experience and compatibility with other modules.

### socketLib [OPTIONAL] (need some more developing...)

This module uses the [socketLib](https://github.com/manuelVo/foundryvtt-socketlib) library for socket core methods. It is a hard dependency and it is recommended for the best experience and compatibility with other modules.

## Known issue

# Build

## Install all packages

```bash
npm install
```
## npm build scripts

### build

will build the code and copy all necessary assets into the dist folder and make a symlink to install the result into your foundry data; create a
`foundryconfig.json` file with your Foundry Data path.

```json
{
  "dataPath": "~/.local/share/FoundryVTT/"
}
```

`build` will build and set up a symlink between `dist` and your `dataPath`.

```bash
npm run-script build
```

### NOTE:

You don't need to build the `foundryconfig.json` file you can just copy the content of the `dist` folder on the module folder under `modules` of Foundry

### build:watch

`build:watch` will build and watch for changes, rebuilding automatically.

```bash
npm run-script build:watch
```

### clean

`clean` will remove all contents in the dist folder (but keeps the link from build:install).

```bash
npm run-script clean
```
### lint and lintfix

`lint` launch the eslint process based on the configuration [here](./.eslintrc)

```bash
npm run-script lint
```

`lintfix` launch the eslint process with the fix argument

```bash
npm run-script lintfix
```

### prettier-format

`prettier-format` launch the prettier plugin based on the configuration [here](./.prettierrc)

```bash
npm run-script prettier-format
```

### package

`package` generates a zip file containing the contents of the dist folder generated previously with the `build` command. Useful for those who want to manually load the module or want to create their own release

```bash
npm run-script package
```

## [Changelog](./changelog.md)

## Issues

Any issues, bugs, or feature requests are always welcome to be reported directly to the [Issue Tracker](https://github.com/earlSt1/vtt-hidden-entity-links/issues ), or using the [Bug Reporter Module](https://foundryvtt.com/packages/bug-reporter/).

## License

- **[fvtt-disguise-unreachable-links](https://github.com/farling42/fvtt-disguise-unreachable-links)** : [MIT](https://github.com/farling42/fvtt-disguise-unreachable-links/blob/master/LICENSE)

This Foundry VTT module is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/) and the [Foundry Virtual Tabletop Limited License Agreement for module development](https://foundryvtt.com/article/license/).

This work is licensed under Foundry Virtual Tabletop [EULA - Limited License Agreement for module development v 0.1.6](http://foundryvtt.com/pages/license.html).

## Credit

- A little part of code is inspired from [farling42](https://github.com/farling42) and the module [fvtt-disguise-unreachable-links](https://github.com/farling42/fvtt-disguise-unreachable-links)
