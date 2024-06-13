const fetch = require('node-fetch').default;
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function deleterAction(TOKEN_DELETER, VANITY_URL, GUİLDİD) {
    try {
        const responseDelete = await fetch(`https://discord.com/api/v10/invites/${VANITY_URL}`, {
            method: 'DELETE',
            headers: { "Authorization": TOKEN_DELETER }
        });
        console.log(`Davet bağlantısı silme işlemi: ${responseDelete.status}\u001b[0m`);

        const requestBody = JSON.stringify({ code: VANITY_URL });
        const responsePatch = await fetch(`https://discord.com/api/v7/guilds/${GUİLDİD}/vanity-url`, {
            method: 'PATCH',
            headers: {
                "Authorization": TOKEN_DELETER,
                "Content-Type": "application/json"
            },
            body: requestBody,
        });
        console.log(`Sunucu URL'sini değiştirme işlemi: ${responsePatch.status}\u001b[0m`);
    } catch (error) {
        console.error('\u001b[31mHata oluştu:\u001b[0m', error);
    }
}

rl.question('URLyi taşicak olan token: \u001b[0m', (TOKEN_DELETER) => {
    rl.question('Vanity URL: \u001b[0m', (VANITY_URL) => {
        rl.question('Taşıncağı sunucu: \u001b[0m', (GUİLDİD) => {
            deleterAction(TOKEN_DELETER, VANITY_URL, GUİLDİD)
                .then(() => rl.close())
                .catch((err) => {
                    console.error('\u001b[32mHata oluştu:\u001b[0m', err);
                    rl.close();
                });
        });
    });
});
