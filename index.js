// Express & EventEmitter setting to prevent memory leak log and 24/7 uptime in repl.it
require('events').EventEmitter.prototype._maxListeners = 100;
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


var mineflayer = require('mineflayer');
// repl.it doesn't need this package, it has own
// require('dotenv').config(); 

const config = {
  pin: '7 8 9 7'
};


// CreateBot function for automatically reconnect
function createBot(username) {
  const bot = mineflayer.createBot({ // Bot creation - AnarchyVN setting
    host: 'anarchyvn.net',
    port: 25565,
    username: username, 
    version: "1.16.5", 
    keepAlive: true,
    checkTimeoutInterval: 60*1000
  });

  bot.on('windowOpen', async (window) => { // AdvancedLogin plugin login API from MoonVN
    // Sửa dòng leak memory
    window.requiresConfirmation = false;

    /* 
     * Nhập 4 số mã pin. Nhưng cần nhập trong .env 
     * Cách nhập: Thí dụ pin là 9999, thì đặt phần pin là 9,9,9,9 ( Thí dụ: PIN=9 9 9 9 )
     */
    var v = config.pin;
    var p1 = v.split(" ")[0]; // lấy mã trước dấu cách
    var p2 = v.split(" ")[1]; // lấy mã sau dấu cách thứ 1
    var p3 = v.split(" ")[2]; // lấy mã sau dấu cách thứ 2
    var p4 = v.split(" ")[3]; // lấy mã sau dấu cách thứ 3


    if (!p1 || !p2 || !p3 || !p4) return console.log("Vui lòng kiểm tra lại mã pin, phải ghi đúng như example, hãy đặt nếu như bạn chưa đặt nó.");

    // Thực hiện các mã pin đã được đặt
    bot.clickWindow(p1, 0, 0);
    bot.clickWindow(p2, 0, 0);
    bot.clickWindow(p3, 0, 0);
    bot.clickWindow(p4, 0, 0);

    // Cho bot vào server
    setTimeout(() => { bot.chat('/anarchyvn') }, 15 * 1000); // Dùng /2y2c sau khi login xong

    setTimeout(() => { bot.clickWindow(13, 0, 0) }, 20 * 1000); // Sau đó bấm vào khung kia để vào server
  });

  bot.on('end', () => { // Log khi bot end
    console.log('reconnect...');
    setTimeout(() => { createBot(username) }, 15 * 1000);
  });

  bot.on('message', msg => { // Log message từ chat game
    console.log(msg.toString());
  });

  bot.on('spawn', () => { // setInterval spamming
    setInterval(() => {
      bot.chat(`<tin nhắn chat> | [${Math.random()}]`);
    }, 30 * 1000)
  })
}
createBot(`insert bot username here`)

// Login bot với TOKEN Discord
// client.login(config.token).catch(err => console.log(err));

// Log lỗi
// client.on("error", (e) => console.error(e));
