
const qrcode = require('qrcode-terminal');
const puppeteer = require('puppeteer');
const { Client, LocalAuth } = require('whatsapp-web.js');
const resultReq = require('./check');
const generateCombinations = require('./main');

const client = new Client({
    authStrategy : new LocalAuth(),
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == 'p') {
        msg.reply('pong');
    }
});

client.on('message', async (msg) => {
    if (msg.body.startsWith('?')) {
        let res;
        let params = msg.body.slice(1);
        if(params === "hk"){
            params = "hongkong";
        } else if (params === "sgp"){
            params = "singapore";
        } else if (params === "sdy"){
            params = "sydney";
        } else {
            params = params;
        }

        try {
            const d = params;
            res = await resultReq(d);
            nama = res[0];
            hsl = res[1];
            namad = JSON.stringify(nama).replace(/"/g, '');
            hsld = JSON.stringify(hsl).replace(/"/g, '');
            data = namad.toUpperCase()+ ' : '+hsld;
            msg.reply(data)
        } catch (error) {
            console.error(error);
            return msg.reply("Data Tidak Ditemukan.");
        }
    }
});

client.on('message', async (msg) => {
    if (msg.body === 'mas jek') {
        // let userPhone = '6285889585113';
        let userPhone = '6285702433322';
        const mentions = await msg.getMentions();
    
        for (let user of mentions) {
            console.log(`mas ${userPhone} konsisten depo yaaa`);
        }
    }
});

client.on('message', msg => {
    if (msg.body === 'yuhuuu') {
        msg.reply('madaaaang');
    }
});

client.on('message', msg => {
    if (msg.body === '.help') {
        const help = "~~Daftar bantuan perintah BOT~~"+"\n"+
                    "*Cek asil terakhir ketik ?pasaran"+"\n"+
                    "*BBFS :"+"\n"+
                    "  contoh !bbfs.2.1234 itu untuk 2d"+"\n"+
                    "  contoh !bbfs.3.1234 itu untuk 3d"+"\n"+
                    "Terima Kasih :)";

        msg.reply(help);
    }
});

client.on('message', async (msg) => {
    if (msg.body.startsWith('!bbfs')) {
        const getbb = msg.body.match(/\.\d+\./);
        const bbv = getbb[0].replace(/\./g, '');
        const bb = parseInt(bbv, 10);
        const num = msg.body.slice(8);
        let result;
        if(bb === 2 || bb === 3 || bb === 4){
            try {
                result = await generateCombinations(num, bb);
                const data = result.join('*');
                const jumlah = result.length;
                msg.reply(data);
                msg.reply("Jumlah : "+jumlah);
            } catch (error) {
                console.error(error);
                return msg.reply("Gagal Memproses.");
            }
        }else{
            console.log(bb);
            msg.reply('Format salah');
        }
    }
});

client.initialize();