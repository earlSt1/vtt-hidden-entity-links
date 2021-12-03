
const mod = 'hidden-entity-links';

export class Settings {
  static registerSettings() {
    game.settings.register(mod, 'hide-actors', {
      name: `${mod}.settings.hide-actors.name`,
      hint: `${mod}.settings.hide-actors.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
    game.settings.register(mod, 'hide-items', {
      name: `${mod}.settings.hide-items.name`,
      hint: `${mod}.settings.hide-items.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
    game.settings.register(mod, 'hide-journals', {
      name: `${mod}.settings.hide-journals.name`,
      hint: `${mod}.settings.hide-journals.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
    game.settings.register(mod, 'hide-rolltables', {
      name: `${mod}.settings.hide-rolltables.name`,
      hint: `${mod}.settings.hide-rolltables.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
    game.settings.register(mod, 'hide-scenes', {
      name: `${mod}.settings.hide-scenes.name`,
      hint: `${mod}.settings.hide-scenes.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
    game.settings.register(mod, 'hide-scenes-nav', {
      name: `${mod}.settings.hide-scenes-nav.name`,
      hint: `${mod}.settings.hide-scenes-nav.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
  }
}

async function updateHiddenEntityLinks(entityData, html, data){
  if (!game.user.isGM){
    return;
  }
  let list =
    html.find('li.directory-item.document')?.length > 0
      ? html.find('li.directory-item.document')
      : html.find('li.directory-item.entity');
  for (let li of list) {
    li = $(li);
    if(entityData.id == li.attr('data-document-id') || entityData.id == li.attr('data-entity-id')){
      let isHidden = data.flags["hidden-entity-links"].hidden;
      if (isHidden && li.find('.hidden-entity-links').length <= 0) {
        let div = $(
          `<div class="hidden-entity-links" style="position:absolute;padding-left:45px;">
            <i class="fas fa-lightbulb" style="color:darkRed; text-shadow: 0 0 8px darkRed;"/>
          </div>`,
        );
        li.find('h4').before(div);
      }else{
        li.find('.hidden-entity-links').remove();
      }
    }
  }
}

// /**
//  * For each folder
// */
// async function directoryRenderedHiddenFolderEntityLinks(obj, html, data) {
//   if (!game.user.isGM){
//     return;
//   }
//   let collectionFolder = obj.folders;
//   let listFolder = html.find('li.directory-item.folder')
//   for (let liFolder of listFolder) {
//     liFolder = $(liFolder);
//     let folder = collectionFolder.find((f) => {
//       return f.id == liFolder.attr('data-folder-id');
//     });
//     if(folder){
//       let isHidden = folder.getFlag(mod, 'hidden');
//       if (isHidden && liFolder.find('.hidden-entity-links').length <= 0) {
//         let div = $(
//           `<div class="hidden-entity-links" style="position:absolute;padding-left:20px;">
//             <i class="fas fa-lightbulb" style="color:darkRed; text-shadow: 0 0 8px darkRed;"/>
//           </div>`,
//         );
//         liFolder.find('h3').before(div);
//       }
//     }
//   }
// }

/**
 * For each entity/document of the actor
*/
async function directoryRenderedHiddenEntityLinks(obj, html, data) {
  if (!game.user.isGM){
    return;
  }
  // const contextOptions = obj._getEntryContextOptions();
  // let collection = obj.constructor.collection;
  let collection = game.actors.directory.documents;

  let list =
    html.find('li.directory-item.document')?.length > 0
      ? html.find('li.directory-item.document')
      : html.find('li.directory-item.entity');
  for (let li of list) {
    li = $(li);
    // let document = collection.get(li.attr('data-document-id'))
    //   ? collection.get(li.attr('data-document-id'))
    //   : collection.get(li.attr('data-entity-id'));
    let document = collection.find((d) => {
      return d.id == li.attr('data-document-id') || d.id == li.attr('data-entity-id');
    });

    if(document){
      // let isHidden = data._id == document.id && data.flags["hidden-entity-links"]?.hidden 
      //   ? data.flags["hidden-entity-links"]?.hidden
      //   : document.getFlag(mod, 'hidden');
      let isHidden = document.getFlag(mod, 'hidden');
      if (isHidden && li.find('.hidden-entity-links').length <= 0) {
        let div = $(
          `<div class="hidden-entity-links" style="position:absolute;padding-left:45px;">
            <i class="fas fa-lightbulb" style="color:darkRed; text-shadow: 0 0 8px darkRed;"/>
          </div>`,
        );
        li.find('h4').before(div);
      }
    }
  }
}

Hooks.once('ready', async function () {
  // Hooks.on('renderJournalDirectory', directoryRenderedHiddenEntityLinks);
  // Hooks.on('renderSceneDirectory', directoryRenderedHiddenEntityLinks);
  Hooks.on('renderActorDirectory', (obj, html, data) => {
    directoryRenderedHiddenEntityLinks(obj, html, data);
    // directoryRenderedHiddenFolderEntityLinks(obj, html, data);
  });
  // Hooks.on('renderItemDirectory', directoryRenderedHiddenEntityLinks);
  // Hooks.on('renderMacroDirectory', directoryRenderedHiddenEntityLinks);
  // Hooks.on('renderRollTableDirectory', directoryRenderedHiddenEntityLinks);
  // Hooks.on('renderCardsDirectory', directoryRenderedHiddenEntityLinks);

  Hooks.on('updateActor', (entityData, data) => {
    let html = $('#actors.sidebar-tab');
    updateHiddenEntityLinks(entityData, html, data);
  });

  // Hooks.on('updateFolder', (entityData, data) => {
  //   let html = $('.sidebar-tab');
  //   if (!game.user.isGM){
  //     return;
  //   }
  //   let listFolder = html.find('li.directory-item.folder')
  //   for (let liFolder of listFolder) {
  //     liFolder = $(liFolder);
  //     if(entityData.id == liFolder.attr('data-folder-id')){
  //       let isHidden = data.flags["hidden-entity-links"].hidden;
  //       if (isHidden && liFolder.find('.hidden-entity-links').length <= 0) {
  //         let div = $(
  //           `<div class="hidden-entity-links" style="position:absolute;padding-left:45px;">
  //             <i class="fas fa-lightbulb" style="color:darkRed; text-shadow: 0 0 8px darkRed;"/>
  //           </div>`,
  //         );
  //         liFolder.find('h4').before(div);
  //       }else{
  //         liFolder.find('.hidden-entity-links').remove();
  //       }
  //     }
  //   }
  // });
});

Hooks.once('setup', async function () {
  Settings.registerSettings();

  // =======================
  // Journal
  // =======================

  if (game.settings.get(mod, 'hide-journals')) {
    libWrapper.register(
      mod,
      'JournalSheet.prototype._inferDefaultMode',
      function (wrapped, ...args) {
        if (game.user.isGM) {
          return wrapped(...args);
        }
        if (!this.getFlag(mod, 'hidden')) {
          if (this.object.limited && this.object.data.content) {
            return 'text';
          }
        }
        return wrapped(...args);
      },
      'MIXED',
    );
  }

  // =======================
  // Items
  // =======================

  if (game.settings.get(mod, 'hide-items')) {
    libWrapper.register(
      mod,
      'Item.prototype.visible',
      function (wrapped, ...args) {
        if (game.user.isGM) {
          return true;
        }
        if (!this.getFlag(mod, 'hidden')) {
          return this.testUserPermission(game.user, 'OBSERVER');
        }
      },
      'OVERRIDE',
    );
  }

  // =======================
  // Actors
  // =======================

  if (game.settings.get(mod, 'hide-actors')) {
    libWrapper.register(
      mod,
      'Actor.prototype.visible',
      function (wrapped, ...args) {
        if (game.user.isGM) {
          return true;
        }
        if (!this.getFlag(mod, 'hidden')) {
          return this.testUserPermission(game.user, 'OBSERVER');
        }
      },
      'OVERRIDE',
    );

    libWrapper.register(
      mod,
      'ActorDirectory.prototype._getEntryContextOptions',
      function (wrapped, ...args) {
        const options = SidebarDirectory.prototype._getEntryContextOptions.call(this);
        return [
          {
            name: game.i18n.localize(`${mod}.label.hide-entity`),
            icon: '<i class="far fa-lightbulb"></i>',
            condition: (li) => {
              const actor = game.actors.get(li.data('entityId'))
                ? game.actors.get(li.data('entityId'))
                : game.actors.get(li.data('documentId'));
              if (game.user.isGM && !actor.getFlag(mod, 'hidden')) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const actor = game.actors.get(li.data('entityId'))
                ? game.actors.get(li.data('entityId'))
                : game.actors.get(li.data('documentId'));
              await actor.setFlag(mod, 'hidden', true);
            },
          },
          {
            name: game.i18n.localize(`${mod}.label.show-entity`),
            icon: '<i class="fas fa-lightbulb"></i>',
            condition: (li) => {
              const actor = game.actors.get(li.data('entityId'))
                ? game.actors.get(li.data('entityId'))
                : game.actors.get(li.data('documentId'));
              if (game.user.isGM && actor.getFlag(mod, 'hidden')) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const actor = game.actors.get(li.data('entityId'))
                ? game.actors.get(li.data('entityId'))
                : game.actors.get(li.data('documentId'));
              await actor.setFlag(mod, 'hidden', false);
            },
          },
        ].concat(options);
      },
      'MIXED',
    );

    libWrapper.register(mod, 'ActorDirectory.prototype._getFolderContextOptions', function (wrapped, ...args) {
      const options = SidebarDirectory.prototype._getFolderContextOptions.call(this);
      return [
        {
          name: game.i18n.localize(`${mod}.label.hide-folder`),
          icon: '<i class="far fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
            if (game.user.isGM && !folderObject.getFlag(mod, 'hidden')) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
            const updates = game.actors
              .filter((actor) => actor.data.folder === folderObject.id)
              .map(async (actor) => {
                await actor.setFlag(mod, 'hidden', true);
              });
            await folderObject.setFlag(mod, 'hidden', true);
            //return Actor.update(updates);
          },
        },
        {
          name: game.i18n.localize(`${mod}.label.show-folder`),
          icon: '<i class="fas fa-lightbulb"></i>',
          condition: (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
            if (game.user.isGM && folderObject.getFlag(mod, 'hidden')) {
              return true;
            } else {
              return false;
            }
          },
          callback: async (header) => {
            const folderId = header.parent().data('folderId');
            const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
            const updates = game.actors
              .filter((actor) => actor.data.folder === folderObject.id)
              .map(async (actor) => {
                await actor.setFlag(mod, 'hidden', false);
              });
            await folderObject.setFlag(mod, 'hidden', false);
            //return Actor.update(updates);
          },
        },
      ].concat(options);
    });
  }

  // =======================
  // Rolltable
  // =======================

  if (game.settings.get(mod, 'hide-rolltables')) {
    libWrapper.register(
      mod,
      'RollTable.prototype.visible',
      function (wrapped, ...args) {
        if (game.user.isGM) {
          return true;
        }
        if (!this.getFlag(mod, 'hidden')) {
          return this.testUserPermission(game.user, 'OBSERVER');
        }
      },
      'OVERRIDE',
    );
    libWrapper.register(
      mod,
      'RollTableConfig.defaultOptions',
      function (wrapped, ...args) {
        return foundry.utils.mergeObject(wrapped(...args), {
          viewPermission: CONST.ENTITY_PERMISSIONS.LIMITED,
        });
      },
      'WRAPPER',
    );
  }

  // =======================
  // Scene
  // =======================
});
