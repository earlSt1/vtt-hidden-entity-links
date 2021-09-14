'use strict';
import {libWrapper} from './shim.js';
const mod = "hidden-entity-links";

export class Settings{
    static registerSettings(){
        game.settings.register(mod,'hide-actors',{
            name:'Hide Actors',
            hint:'If enabled, users with limited access to actors will not see them in the sidebar',
            scope:'world',
            config:true,
            type:Boolean,
            default:false
        });
        game.settings.register(mod,'hide-items',{
            name:'Hide Items',
            hint:'If enabled, users with limited access to items will not see them in the sidebar',
            scope:'world',
            config:true,
            type:Boolean,
            default:false
        });
        game.settings.register(mod,'hide-journals',{
            name:'Hide Journal Entries',
            hint:'If enabled, users with limited access to journals will not see them in the sidebar',
            scope:'world',
            config:true,
            type:Boolean,
            default:false
        });
        game.settings.register(mod,'hide-rolltables',{
            name:'Hide Roll Tables',
            hint:'If enabled, users with limited access to rolltables will not see them in the sidebar',
            scope:'world',
            config:true,
            type:Boolean,
            default:false
        });
    }
}
Hooks.once('setup',async function(){
    Settings.registerSettings();
    if (game.settings.get(mod,'hide-journals')){
        libWrapper.register(mod,'JournalSheet.prototype._inferDefaultMode', function (wrapped, ...args) {
            if (this.object.limited && this.object.data.content){
                return 'text';
            }
            return wrapped(...args);
        },'MIXED');
    }
    if (game.settings.get(mod,'hide-items')){
        libWrapper.register(mod,'Item.prototype.visible', function (wrapped, ...args) {
            return this.testUserPermission(game.user, "OBSERVER");
        },'OVERRIDE');
    }
    if (game.settings.get(mod,'hide-actors')){
        libWrapper.register(mod,'Actor.prototype.visible', function (wrapped, ...args) {
            return this.testUserPermission(game.user, "OBSERVER");
        },'OVERRIDE');
    }
    if (game.settings.get(mod,'hide-rolltables')){
        libWrapper.register(mod,'RollTable.prototype.visible',function (wrapped, ...args) {
            return this.testUserPermission(game.user, "OBSERVER");
        },'OVERRIDE');
        libWrapper.register(mod,'RollTableConfig.defaultOptions',function (wrapped, ...args){
            return foundry.utils.mergeObject(wrapped(...args),{viewPermission:CONST.ENTITY_PERMISSIONS.LIMITED})
        },'WRAPPER');
    }
});