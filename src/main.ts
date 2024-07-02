/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(async () => {
    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

    await WA.players.configureTracking({
        players: true,
        movement: false,
    });


    if (WA.room.hashParameters.bot) {
        console.log('Bot detected');
        initBot();
    }

}).catch(e => console.error(e));

function initBot() {
    WA.player.proximityMeeting.onJoin().subscribe((players) => {
        console.log('BUBBLE DETECTED', players);
        WA.chat.sendChatMessage('Hello there!', { scope: 'bubble' });
    });

    WA.chat.onChatMessage((message) => {
        console.log('Chat message received', message);
    });
}

export {};
