export const HIDDEN_ENTITY_LINKS_MODULE_NAME = 'hidden-entity-links';

// ==================
// SETTINGS SUPPORT
// ==================

class Settings {
  static registerSettings() {
    game.settings.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-actors', {
      name: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-actors.name`,
      hint: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-actors.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
    game.settings.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-items', {
      name: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-items.name`,
      hint: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-items.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
    game.settings.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-journals', {
      name: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-journals.name`,
      hint: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-journals.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
    game.settings.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-rolltables', {
      name: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-rolltables.name`,
      hint: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-rolltables.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
    game.settings.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-scenes', {
      name: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-scenes.name`,
      hint: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-scenes.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
    game.settings.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-scenes-nav', {
      name: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-scenes-nav.name`,
      hint: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.hide-scenes-nav.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
    game.settings.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'no-background-only-symbol', {
      name: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.no-background-only-symbol.name`,
      hint: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.no-background-only-symbol.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
    game.settings.register(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'disguise-unreachable-links', {
      name: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.disguise-unreachable-links.name`,
      hint: `${HIDDEN_ENTITY_LINKS_MODULE_NAME}.settings.disguise-unreachable-links.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
  }
}

// ==================
// API SUPPORT
// ==================

class HiddentEntityLinks {
  static API = 'hiddentEntityLinks';

  socket = undefined;

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

  updateHiddenEntityLinks = async function (entityData, html, data) {
    let list =
      html.find('li.directory-item.document')?.length > 0
        ? html.find('li.directory-item.document')
        : html.find('li.directory-item.entity');
    for (let li of list) {
      li = $(li);
      if (entityData.id == li.attr('data-document-id') || entityData.id == li.attr('data-entity-id')) {
        let isHidden = data.flags['hidden-entity-links']?.hidden; // why is undefined ??
        if (isHidden) {
          if (!game.user.isGM) {
            //setProperty(entityData, 'visible', false);
            // TODO why i must do this ?????
            // li.hide();
          } else {
            // let div = $(
            //   `<div class="hidden-entity-links" style="position:absolute;padding-left:45px;">
            //     <i class="fas fa-lightbulb" style="color:darkRed; text-shadow: 0 0 8px darkRed;"/>
            //   </div>`,
            // );
            // li.find('.entity-name').before(div);
            if (
              entityData instanceof Scene ||
              game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'no-background-only-symbol')
            ) {
              if (li.find('.hidden-entity-links-scene').length <= 0) {
                let div = $(
                  `<div class="hidden-entity-links-scene">
                    <i class="fas fa-lightbulb"/>
                  </div>`,
                );
                //li.find('.entity-name').after(div);
                li.append(div);
              }
            } else {
              if (li.find('.hidden-entity-links').length <= 0) {
                li.addClass('hidden-entity-links');
              }
            }
          }
        } else {
          if (!game.user.isGM) {
            //setProperty(entityData, 'visible', true);
            // TODO why i must do this ?????
            // li.show();
          } else {
            // li.find('.hidden-entity-links').remove();
            if (
              entityData instanceof Scene ||
              game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'no-background-only-symbol')
            ) {
              // if(li.find('.hidden-entity-links-scene').length > 0){
              li.find('.hidden-entity-links-scene').remove();
              // }
            } else {
              // if(li.find('.hidden-entity-links').length > 0){
              li.removeClass('hidden-entity-links');
              // }
            }
          }
        }
        // ui.sidebar.render(true);
        break;
      }
    }
  };

  /**
   * For each entity/document
   */
  directoryRenderedHiddenEntityLinks = async function (obj, html, data, entities) {
    // const contextOptions = obj._getEntryContextOptions();
    // let collection = obj.constructor.collection;
    let collection = entities.directory?.documents;
    if (!collection || collection.length == 0) {
      return;
    }

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

      if (document) {
        try {
          // let isHidden = data._id == document.id && data.flags["hidden-entity-links"]?.hidden
          //   ? data.flags["hidden-entity-links"]?.hidden
          //   : document.getFlag(mod, 'hidden');
          let isHidden = document.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden');
          if (isHidden) {
            if (!game.user.isGM) {
              //setProperty(document, 'visible', false);
              // TODO why i must do this ?????
              // li.hide();
            } else {
              // let div = $(
              //   `<div class="hidden-entity-links" style="position:absolute;padding-left:45px;">
              //     <i class="fas fa-lightbulb" style="color:darkRed; text-shadow: 0 0 8px darkRed;"/>
              //   </div>`,
              // );
              // li.find('.entity-name').before(div);
              if (
                obj instanceof SceneDirectory ||
                game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'no-background-only-symbol')
              ) {
                if (li.find('.hidden-entity-links-scene').length <= 0) {
                  let div = $(
                    `<div class="hidden-entity-links-scene">
                      <i class="fas fa-lightbulb"/>
                    </div>`,
                  );
                  //li.find('.entity-name').after(div);
                  li.append(div);
                }
              } else {
                if (li.find('.hidden-entity-links').length <= 0) {
                  li.addClass('hidden-entity-links');
                }
              }
            }
          } else {
            if (!game.user.isGM) {
              //setProperty(document, 'visible', true);
              // TODO why i must do this ?????
              // li.show();
            } else {
              //
            }
          }
        } catch (e) {
          // This is just a patch for a bug during the beta of the beta
          // we can probably remove in the future
          if (hasProperty(document.data, `flags.${HIDDEN_ENTITY_LINKS_MODULE_NAME}`)) {
            await document.unsetFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'true');
            await document.unsetFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'false');
          }
          throw e;
        }
      }
    }
  };

  /**
   * For any link in the text which points to a document which is not visible to the current player
   * it will be replaced by the non-link text (so the player will be NOT aware that a link exists)
   * @param {ActorSheet} [sheet] Sheet for renderJournalSheet and renderActorSheet hooks
   * @param {jQuery}     [html]  HTML  for renderJournalSheet and renderActorSheet hooks
   * @param {Object}     [data]  Data for renderJournalSheet and renderActorSheet hooks
   */
  hideRenderedHiddenEntityLinks = function (sheet, html, data) {
    if (!game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'disguise-unreachable-links')) {
      return;
    }
    if (game.user.isGM) {
      return;
    }
    // If the "data-id" isn't observable by the current user, then replace with just "plain text"
    html
      .find('a.entity-link')
      .filter((index, a) => {
        // This filter function needs to return true if the link is to be replaced by normal text
        const dataentity = a.getAttribute('data-entity'); // RollTable, JournalEntry, Actor
        if (!dataentity) {
          // Compendium packs are only limited at the PACK level, not an individual document level
          return game.packs.get(a.getAttribute('data-pack'))?.private;
        }
        const entity = _EntityMap[dataentity];
        if (!entity) {
          console.warn(`checkRenderLinks#EntityMap does not have '${entity}'`);
          return false;
        }
        const item = game[entity].get(a.getAttribute('data-id'));
        return !item || !item.testUserPermission(game.user, 'LIMITED');
      })
      .replaceWith((index, a) => {
        const pos = a.indexOf('</i> ');
        return pos < 0 ? a : a.slice(pos + 5);
      });
  };

  hideEntityLink = async function (entityID, entities) {
    let entityData = entities.find((e) => {
      return e && e.id == entityID;
    });
    if (entityData) {
      let isHidden = entityData.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden');
      if (isHidden) {
        // Do nothing
      } else {
        await entityData.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', true);
      }
    }
  };

  unhideEntityLink = async function (entityID, entities) {
    let entityData = entities.find((e) => {
      return e && e.id == entityID;
    });
    if (entityData) {
      let isHidden = entityData.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden');
      if (isHidden) {
        await entityData.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', false);
      } else {
        // Do nothing
      }
    }
  }
}

// ==================
// SOCKET SUPPORT (We don' needed for now)
// ==================
/*
export let hiddentEntityLinksSocket;

Hooks.once('socketlib.ready', () => {
  hiddentEntityLinksSocket = socketlib.registerModule(HIDDEN_ENTITY_LINKS_MODULE_NAME);
  hiddentEntityLinksSocket.register(
    'updateHiddenEntityLinks',
    HiddentEntityLinksSocketFunctions.updateHiddenEntityLinks,
  );
  hiddentEntityLinksSocket.register(
    'directoryRenderedHiddenEntityLinks',
    HiddentEntityLinksSocketFunctions.directoryRenderedHiddenEntityLinks,
  );
  hiddentEntityLinksSocket.register(
    'hideRenderedHiddenEntityLinks',
    HiddentEntityLinksSocketFunctions.hideRenderedHiddenEntityLinks,
  );
});

class HiddentEntityLinksSocketFunctions {
  static updateHiddenEntityLinks(entityData, html, data) {
    game.hiddentEntityLinks.updateHiddenEntityLinks(entityData, html, data);
  }

  static directoryRenderedHiddenEntityLinks(obj, html, data, entities) {
    game.hiddentEntityLinks.directoryRenderedHiddenEntityLinks(obj, html, data, entities);
  }

  static hideRenderedHiddenEntityLinks(sheet, html, data) {
    game.hiddentEntityLinks.hideRenderedHiddenEntityLinks(sheet, html, data);
  }
}
*/
Hooks.once('ready', async function () {
  if (!game.modules.get('lib-wrapper')?.active && game.user.isGM) {
    ui.notifications.error(
      `The '${HIDDEN_ENTITY_LINKS_MODULE_NAME}' module requires to install and activate the 'libWrapper' module.`,
    );
    return;
  }

  // if (!game.modules.get('socketlib')?.active && game.user.isGM) {
  //   ui.notifications.error(
  //     `The '${HIDDEN_ENTITY_LINKS_MODULE_NAME}' module requires to install and activate the 'socketlib' module.`,
  //   );
  //   return;
  // }

  // game[HiddentEntityLinks.API].socket = hiddentEntityLinksSocket;

  Hooks.on('updateJournalEntry', (entityData, data) => {
    if (data.flags && data.flags['hidden-entity-links']) {
      let html = $('#journal.sidebar-tab');
      // hiddentEntityLinksSocket.executeForEveryone('updateHiddenEntityLinks', entityData, html, data);
      game[HiddentEntityLinks.API].updateHiddenEntityLinks(entityData, html, data);
    }
  });
  Hooks.on('updateScene', (entityData, data) => {
    if (data.flags && data.flags['hidden-entity-links']) {
      let html = $('#scenes.sidebar-tab');
      // hiddentEntityLinksSocket.executeForEveryone('updateHiddenEntityLinks', entityData, html, data);
      game[HiddentEntityLinks.API].updateHiddenEntityLinks(entityData, html, data);
    }
  });
  Hooks.on('updateActor', (entityData, data) => {
    if (data.flags && data.flags['hidden-entity-links']) {
      let html = $('#actors.sidebar-tab');
      // hiddentEntityLinksSocket.executeForEveryone('updateHiddenEntityLinks', entityData, html, data);
      game[HiddentEntityLinks.API].updateHiddenEntityLinks(entityData, html, data);
    }
  });
  Hooks.on('updateItem', (entityData, data) => {
    if (data.flags && data.flags['hidden-entity-links']) {
      let html = $('#items.sidebar-tab');
      // hiddentEntityLinksSocket.executeForEveryone('updateHiddenEntityLinks', entityData, html, data);
      game[HiddentEntityLinks.API].updateHiddenEntityLinks(entityData, html, data);
    }
  });
  // Hooks.on('updateMacro', directoryRenderedHiddenEntityLinks);
  Hooks.on('updateRollTable', (entityData, data) => {
    if (data.flags && data.flags['hidden-entity-links']) {
      let html = $('#tables.sidebar-tab');
      // hiddentEntityLinksSocket.executeForEveryone('updateHiddenEntityLinks', entityData, html, data);
      game[HiddentEntityLinks.API].updateHiddenEntityLinks(entityData, html, data);
    }
  });
  Hooks.on('updateCards', (entityData, data) => {
    if (data.flags && data.flags['hidden-entity-links']) {
      let html = $('#cards.sidebar-tab');
      // hiddentEntityLinksSocket.executeForEveryone('updateHiddenEntityLinks', entityData, html, data);
      game[HiddentEntityLinks.API].updateHiddenEntityLinks(entityData, html, data);
    }
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

Hooks.once('init', async function () {
  // Do anything once the module is ready
  if (!game.modules.get('lib-wrapper')?.active && game.user.isGM) {
    ui.notifications.error(
      `The '${HIDDEN_ENTITY_LINKS_MODULE_NAME}' module requires to install and activate the 'libWrapper' module.`,
    );
    return;
  }

  // if (!game.modules.get('socketlib')?.active && game.user.isGM) {
  //   ui.notifications.error(
  //     `The '${HIDDEN_ENTITY_LINKS_MODULE_NAME}' module requires to install and activate the 'socketlib' module.`,
  //   );
  //   return;
  // }

  game[HiddentEntityLinks.API] = new HiddentEntityLinks();
});

Hooks.once('setup', async function () {
  Settings.registerSettings();

  // Do anything once the module is ready
  if (!game.modules.get('lib-wrapper')?.active && game.user.isGM) {
    ui.notifications.error(
      `The '${HIDDEN_ENTITY_LINKS_MODULE_NAME}' module requires to install and activate the 'libWrapper' module.`,
    );
    return;
  }

  // if (!game.modules.get('socketlib')?.active && game.user.isGM) {
  //   ui.notifications.error(
  //     `The '${HIDDEN_ENTITY_LINKS_MODULE_NAME}' module requires to install and activate the 'socketlib' module.`,
  //   );
  //   return;
  // }

  Hooks.on('renderJournalDirectory', (obj, html, data) => {
    const entities = game.journal;
    // if (hiddentEntityLinksSocket) {
    //   hiddentEntityLinksSocket.executeForEveryone('directoryRenderedHiddenEntityLinks', obj, html, data, entities);
    //   hiddentEntityLinksSocket.executeForEveryone('hideRenderedHiddenEntityLinks', obj, html, data);
    // } else {
    game[HiddentEntityLinks.API].directoryRenderedHiddenEntityLinks(obj, html, data, entities);
    game[HiddentEntityLinks.API].hideRenderedHiddenEntityLinks(obj, html, data);
    // }
  });
  Hooks.on('renderSceneDirectory', (obj, html, data) => {
    const entities = game.scenes;
    // if (hiddentEntityLinksSocket) {
    //   hiddentEntityLinksSocket.executeForEveryone('directoryRenderedHiddenEntityLinks', obj, html, data, entities);
    //   hiddentEntityLinksSocket.executeForEveryone('hideRenderedHiddenEntityLinks', obj, html, data);
    // } else {
    game[HiddentEntityLinks.API].directoryRenderedHiddenEntityLinks(obj, html, data, entities);
    game[HiddentEntityLinks.API].hideRenderedHiddenEntityLinks(obj, html, data);
    // }
  });
  Hooks.on('renderActorDirectory', (obj, html, data) => {
    const entities = game.actors;
    // if (hiddentEntityLinksSocket) {
    //   hiddentEntityLinksSocket.executeForEveryone('directoryRenderedHiddenEntityLinks', obj, html, data, entities);
    //   hiddentEntityLinksSocket.executeForEveryone('hideRenderedHiddenEntityLinks', obj, html, data);
    // } else {
    game[HiddentEntityLinks.API].directoryRenderedHiddenEntityLinks(obj, html, data, entities);
    game[HiddentEntityLinks.API].hideRenderedHiddenEntityLinks(obj, html, data);
    // }
  });
  Hooks.on('renderItemDirectory', (obj, html, data) => {
    const entities = game.items;
    // if (hiddentEntityLinksSocket) {
    //   hiddentEntityLinksSocket.executeForEveryone('directoryRenderedHiddenEntityLinks', obj, html, data, entities);
    //   hiddentEntityLinksSocket.executeForEveryone('hideRenderedHiddenEntityLinks', obj, html, data);
    // } else {
    game[HiddentEntityLinks.API].directoryRenderedHiddenEntityLinks(obj, html, data, entities);
    game[HiddentEntityLinks.API].hideRenderedHiddenEntityLinks(obj, html, data);
    // }
  });
  // Hooks.on('renderMacroDirectory', directoryRenderedHiddenEntityLinks);
  Hooks.on('renderRollTableDirectory', (obj, html, data) => {
    const entities = game.tables;
    // if (hiddentEntityLinksSocket) {
    //   hiddentEntityLinksSocket.executeForEveryone('directoryRenderedHiddenEntityLinks', obj, html, data, entities);
    //   hiddentEntityLinksSocket.executeForEveryone('hideRenderedHiddenEntityLinks', obj, html, data);
    // } else {
    game[HiddentEntityLinks.API].directoryRenderedHiddenEntityLinks(obj, html, data, entities);
    game[HiddentEntityLinks.API].hideRenderedHiddenEntityLinks(obj, html, data);
    // }
  });
  Hooks.on('renderCardsDirectory', (obj, html, data) => {
    const entities = game.cards;
    // if (hiddentEntityLinksSocket) {
    //   hiddentEntityLinksSocket.executeForEveryone('directoryRenderedHiddenEntityLinks', obj, html, data, entities);
    //   hiddentEntityLinksSocket.executeForEveryone('hideRenderedHiddenEntityLinks', obj, html, data);
    // } else {
    game[HiddentEntityLinks.API].directoryRenderedHiddenEntityLinks(obj, html, data, entities);
    game[HiddentEntityLinks.API].hideRenderedHiddenEntityLinks(obj, html, data);
    // }
  });

  // =======================
  // Journal
  // =======================

  libWrapper.register(
    HIDDEN_ENTITY_LINKS_MODULE_NAME,
    'JournalEntry.prototype.visible',
    function (wrapped, ...args) {
      if (game.user.isGM) {
        return true;
      }
      if (!this.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden')) {
        return this.testUserPermission(game.user, 'OBSERVER');
      }
    },
    'OVERRIDE',
  );

  if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-journals')) {
    // libWrapper.register(
    //   mod,
    //   'JournalSheet.prototype._onShowPlayers',
    //   function (wrapped, ...args) {
    //     // event.preventDefault();
    //     // await this.submit();
    //     if (game.user.isGM) {
    //       return wrapped(...args);
    //     }
    //     if (this.object.getFlag(mod, 'hidden')) {
    //       return;
    //     }
    //     // return this.object.show(this._sheetMode, true);
    //     return wrapped(...args);
    //   },
    //   'MIXED',
    // );

    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'JournalSheet.prototype._inferDefaultMode',
      function (wrapped, ...args) {
        if (game.user.isGM) {
          return wrapped(...args);
        }
        if (this.object.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden')) {
          if (this.object.limited && this.object.data.content) {
            return 'text';
          }
          if (this.object.limited && this.object.data.img) {
            // Removed limited we use a flag now
            return 'image';
          }
        }
        return wrapped(...args);
      },
      'MIXED',
    );

    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'JournalDirectory.prototype._getEntryContextOptions',
      function (wrapped, ...args) {
        const options = SidebarDirectory.prototype._getEntryContextOptions.call(this);
        return [
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.hide-entity`),
            icon: '<i class="far fa-lightbulb"></i>',
            condition: (li) => {
              const journal = game.journal.get(li.data('entityId'))
                ? game.journal.get(li.data('entityId'))
                : game.journal.get(li.data('documentId'));
              if (game.user.isGM && !journal.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden')) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const journal = game.journal.get(li.data('entityId'))
                ? game.journal.get(li.data('entityId'))
                : game.journal.get(li.data('documentId'));
              await journal.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', true);
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.show-entity`),
            icon: '<i class="fas fa-lightbulb"></i>',
            condition: (li) => {
              const journal = game.journal.get(li.data('entityId'))
                ? game.journal.get(li.data('entityId'))
                : game.journal.get(li.data('documentId'));
              if (game.user.isGM && journal.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden')) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const journal = game.journal.get(li.data('entityId'))
                ? game.journal.get(li.data('entityId'))
                : game.journal.get(li.data('documentId'));
              await journal.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', false);
            },
          },
        ].concat(options);
      },
      'MIXED',
    );

    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'JournalDirectory.prototype._getFolderContextOptions',
      function (wrapped, ...args) {
        const options = SidebarDirectory.prototype._getFolderContextOptions.call(this);
        return [
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.hide-folder`),
            icon: '<i class="far fa-lightbulb"></i>',
            condition: (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              if (game.user.isGM) {
                // && !folderObject.getFlag(mod, 'hidden')) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              const updates = game.journal
                .filter((journal) => journal.data.folder === folderObject.id)
                .map(async (journal) => {
                  await journal.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', true);
                });
              //await folderObject.setFlag(mod, 'hidden', true);
              //return Journal.update(updates);
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.show-folder`),
            icon: '<i class="fas fa-lightbulb"></i>',
            condition: (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              if (game.user.isGM) {
                // && folderObject.getFlag(mod, 'hidden')) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              const updates = game.journal
                .filter((journal) => journal.data.folder === folderObject.id)
                .map(async (journal) => {
                  await journal.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', false);
                });
              //await folderObject.setFlag(mod, 'hidden', false);
              //return Journal.update(updates);
            },
          },
        ].concat(options);
      },
      'MIXED',
    );
  }

  // =======================
  // Items
  // =======================

  if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-items')) {
    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'Item.prototype.visible',
      function (wrapped, ...args) {
        if (game.user.isGM) {
          return true;
        }
        if (!this.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden')) {
          return this.testUserPermission(game.user, 'OBSERVER');
        }
      },
      'OVERRIDE',
    );

    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'ItemDirectory.prototype._getEntryContextOptions',
      function (wrapped, ...args) {
        const options = SidebarDirectory.prototype._getEntryContextOptions.call(this);
        return [
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.hide-entity`),
            icon: '<i class="far fa-lightbulb"></i>',
            condition: (li) => {
              const item = game.items.get(li.data('entityId'))
                ? game.items.get(li.data('entityId'))
                : game.items.get(li.data('documentId'));
              if (game.user.isGM && !item.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden')) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const item = game.items.get(li.data('entityId'))
                ? game.items.get(li.data('entityId'))
                : game.items.get(li.data('documentId'));
              await item.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', true);
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.show-entity`),
            icon: '<i class="fas fa-lightbulb"></i>',
            condition: (li) => {
              const item = game.items.get(li.data('entityId'))
                ? game.items.get(li.data('entityId'))
                : game.items.get(li.data('documentId'));
              if (game.user.isGM && item.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden')) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const item = game.items.get(li.data('entityId'))
                ? game.items.get(li.data('entityId'))
                : game.items.get(li.data('documentId'));
              await item.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', false);
            },
          },
        ].concat(options);
      },
      'MIXED',
    );

    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'ItemDirectory.prototype._getFolderContextOptions',
      function (wrapped, ...args) {
        const options = SidebarDirectory.prototype._getFolderContextOptions.call(this);
        return [
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.hide-folder`),
            icon: '<i class="far fa-lightbulb"></i>',
            condition: (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              if (game.user.isGM) {
                // && !folderObject.getFlag(mod, 'hidden')) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              const updates = game.items
                .filter((item) => item.data.folder === folderObject.id)
                .map(async (item) => {
                  await item.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', true);
                });
              //await folderObject.setFlag(mod, 'hidden', true);
              //return Item.update(updates);
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.show-folder`),
            icon: '<i class="fas fa-lightbulb"></i>',
            condition: (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              if (game.user.isGM) {
                // && folderObject.getFlag(mod, 'hidden')) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              const updates = game.items
                .filter((item) => item.data.folder === folderObject.id)
                .map(async (item) => {
                  await item.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', false);
                });
              //await folderObject.setFlag(mod, 'hidden', false);
              //return Item.update(updates);
            },
          },
        ].concat(options);
      },
      'MIXED',
    );
  }

  // =======================
  // Actors
  // =======================

  if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-actors')) {
    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'Actor.prototype.visible',
      function (wrapped, ...args) {
        if (game.user.isGM) {
          return true;
        }
        if (!this.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden')) {
          return this.testUserPermission(game.user, 'OBSERVER');
        }
      },
      'OVERRIDE',
    );

    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'ActorDirectory.prototype._getEntryContextOptions',
      function (wrapped, ...args) {
        const options = SidebarDirectory.prototype._getEntryContextOptions.call(this);
        return [
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.hide-entity`),
            icon: '<i class="far fa-lightbulb"></i>',
            condition: (li) => {
              const actor = game.actors.get(li.data('entityId'))
                ? game.actors.get(li.data('entityId'))
                : game.actors.get(li.data('documentId'));
              if (game.user.isGM && !actor.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden')) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const actor = game.actors.get(li.data('entityId'))
                ? game.actors.get(li.data('entityId'))
                : game.actors.get(li.data('documentId'));
              await actor.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', true);
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.show-entity`),
            icon: '<i class="fas fa-lightbulb"></i>',
            condition: (li) => {
              const actor = game.actors.get(li.data('entityId'))
                ? game.actors.get(li.data('entityId'))
                : game.actors.get(li.data('documentId'));
              if (game.user.isGM && actor.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden')) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const actor = game.actors.get(li.data('entityId'))
                ? game.actors.get(li.data('entityId'))
                : game.actors.get(li.data('documentId'));
              await actor.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', false);
            },
          },
        ].concat(options);
      },
      'MIXED',
    );

    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'ActorDirectory.prototype._getFolderContextOptions',
      function (wrapped, ...args) {
        const options = SidebarDirectory.prototype._getFolderContextOptions.call(this);
        return [
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.hide-folder`),
            icon: '<i class="far fa-lightbulb"></i>',
            condition: (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              if (game.user.isGM) {
                // && !folderObject.getFlag(mod, 'hidden')) {
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
                  await actor.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', true);
                });
              //await folderObject.setFlag(mod, 'hidden', true);
              //return Actor.update(updates);
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.show-folder`),
            icon: '<i class="fas fa-lightbulb"></i>',
            condition: (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              if (game.user.isGM) {
                // && folderObject.getFlag(mod, 'hidden')) {
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
                  await actor.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', false);
                });
              //await folderObject.setFlag(mod, 'hidden', false);
              //return Actor.update(updates);
            },
          },
        ].concat(options);
      },
      'MIXED',
    );
  }

  // =======================
  // Rolltable
  // =======================

  if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-rolltables')) {
    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'RollTable.prototype.visible',
      function (wrapped, ...args) {
        if (game.user.isGM) {
          return true;
        }
        if (!this.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden')) {
          return this.testUserPermission(game.user, 'OBSERVER');
        }
      },
      'OVERRIDE',
    );

    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'RollTableConfig.defaultOptions',
      function (wrapped, ...args) {
        return foundry.utils.mergeObject(wrapped(...args), {
          viewPermission: CONST.ENTITY_PERMISSIONS.LIMITED,
        });
      },
      'WRAPPER',
    );

    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'RollTableDirectory.prototype._getEntryContextOptions',
      function (wrapped, ...args) {
        const options = SidebarDirectory.prototype._getEntryContextOptions.call(this);
        return [
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.hide-entity`),
            icon: '<i class="far fa-lightbulb"></i>',
            condition: (li) => {
              const rolltable = game.tables.get(li.data('entityId'))
                ? game.tables.get(li.data('entityId'))
                : game.tables.get(li.data('documentId'));
              if (game.user.isGM && !rolltable.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden')) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const rolltable = game.tables.get(li.data('entityId'))
                ? game.tables.get(li.data('entityId'))
                : game.tables.get(li.data('documentId'));
              await rolltable.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', true);
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.show-entity`),
            icon: '<i class="fas fa-lightbulb"></i>',
            condition: (li) => {
              const rolltable = game.tables.get(li.data('entityId'))
                ? game.tables.get(li.data('entityId'))
                : game.tables.get(li.data('documentId'));
              if (game.user.isGM && rolltable.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden')) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const rolltable = game.tables.get(li.data('entityId'))
                ? game.tables.get(li.data('entityId'))
                : game.tables.get(li.data('documentId'));
              await rolltable.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', false);
            },
          },
        ].concat(options);
      },
      'MIXED',
    );

    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'RollTableDirectory.prototype._getFolderContextOptions',
      function (wrapped, ...args) {
        const options = SidebarDirectory.prototype._getFolderContextOptions.call(this);
        return [
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.hide-folder`),
            icon: '<i class="far fa-lightbulb"></i>',
            condition: (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              if (game.user.isGM) {
                // && !folderObject.getFlag(mod, 'hidden')) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              const updates = game.tables
                .filter((rolltable) => rolltable.data.folder === folderObject.id)
                .map(async (rolltable) => {
                  await rolltable.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', true);
                });
              //await folderObject.setFlag(mod, 'hidden', true);
              //return Rolltable.update(updates);
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.show-folder`),
            icon: '<i class="fas fa-lightbulb"></i>',
            condition: (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              if (game.user.isGM) {
                // && folderObject.getFlag(mod, 'hidden')) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              const updates = game.tables
                .filter((rolltable) => rolltable.data.folder === folderObject.id)
                .map(async (rolltable) => {
                  await rolltable.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', false);
                });
              //await folderObject.setFlag(mod, 'hidden', false);
              //return Rolltable.update(updates);
            },
          },
        ].concat(options);
      },
      'MIXED',
    );
  }

  // =======================
  // Scene
  // =======================

  if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-scenes')) {
    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'Scene.prototype.visible',
      function (wrapped, ...args) {
        if (game.user.isGM) {
          return true;
        }
        if (!this.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden')) {
          return this.testUserPermission(game.user, 'OBSERVER');
        }
      },
      'OVERRIDE',
    );

    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'SceneDirectory.prototype._getEntryContextOptions',
      function (wrapped, ...args) {
        const options = SidebarDirectory.prototype._getEntryContextOptions.call(this);
        return [
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.hide-entity`),
            icon: '<i class="far fa-lightbulb"></i>',
            condition: (li) => {
              const scene = game.scenes.get(li.data('entityId'))
                ? game.scenes.get(li.data('entityId'))
                : game.scenes.get(li.data('documentId'));
              if (game.user.isGM && !scene.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden')) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const scene = game.scenes.get(li.data('entityId'))
                ? game.scenes.get(li.data('entityId'))
                : game.scenes.get(li.data('documentId'));
              await scene.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', true);
              if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-scenes-nav')) {
                const updates = [
                  {
                    _id: scene.id,
                    navigation: false,
                    permission: {
                      default: 0,
                    },
                  },
                ];
                return Scene.update(updates);
              }
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.show-entity`),
            icon: '<i class="fas fa-lightbulb"></i>',
            condition: (li) => {
              const scene = game.scenes.get(li.data('entityId'))
                ? game.scenes.get(li.data('entityId'))
                : game.scenes.get(li.data('documentId'));
              if (game.user.isGM && scene.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden')) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (li) => {
              const scene = game.scenes.get(li.data('entityId'))
                ? game.scenes.get(li.data('entityId'))
                : game.scenes.get(li.data('documentId'));
              await scene.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', false);
              if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-scenes-nav')) {
                const updates = [
                  {
                    _id: scene.id,
                    navigation: true,
                  },
                ];
                return Scene.update(updates);
              }
            },
          },
        ].concat(options);
      },
      'MIXED',
    );

    libWrapper.register(
      HIDDEN_ENTITY_LINKS_MODULE_NAME,
      'SceneDirectory.prototype._getFolderContextOptions',
      function (wrapped, ...args) {
        const options = SidebarDirectory.prototype._getFolderContextOptions.call(this);
        return [
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.hide-folder`),
            icon: '<i class="far fa-lightbulb"></i>',
            condition: (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              if (game.user.isGM) {
                // && !folderObject.getFlag(mod, 'hidden')) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              const updates = game.scenes
                .filter((scene) => scene.data.folder === folderObject.id)
                .map(async (scene) => {
                  await scene.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', true);
                });
              //await folderObject.setFlag(mod, 'hidden', true);
              if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-scenes-nav')) {
                const updates = game.scenes
                  .filter((scene) => scene.data.folder === folderObject.id)
                  .map((scene) => ({
                    _id: scene.id,
                    navigation:
                      !scene.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden') && scene.navigation
                        ? false
                        : scene.navigation,
                    permission: {
                      default:
                        !scene.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden') && scene.navigation
                          ? 0
                          : scene.permission.default,
                    },
                  }));
                return Scene.update(updates);
              }
            },
          },
          {
            name: game.i18n.localize(`${HIDDEN_ENTITY_LINKS_MODULE_NAME}.label.show-folder`),
            icon: '<i class="fas fa-lightbulb"></i>',
            condition: (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              if (game.user.isGM) {
                // && folderObject.getFlag(mod, 'hidden')) {
                return true;
              } else {
                return false;
              }
            },
            callback: async (header) => {
              const folderId = header.parent().data('folderId');
              const folderObject = game.folders.get(folderId) || game.folders.getName(folderId);
              const updates = game.scenes
                .filter((scene) => scene.data.folder === folderObject.id)
                .map(async (scene) => {
                  await scene.setFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden', false);
                });
              //await folderObject.setFlag(mod, 'hidden', false);
              if (game.settings.get(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hide-scenes-nav')) {
                const updates = game.scenes
                  .filter((scene) => scene.data.folder === folderObject.id)
                  .map((scene) => ({
                    _id: scene.id,
                    navigation:
                      scene.getFlag(HIDDEN_ENTITY_LINKS_MODULE_NAME, 'hidden') && !scene.navigation
                        ? true
                        : scene.navigation,
                  }));
                return Scene.update(updates);
              }
            },
          },
        ].concat(options);
      },
      'MIXED',
    );
  }
});
