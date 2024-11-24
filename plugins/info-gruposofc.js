let media = './src/Grupo.jpg'
let handler = async (m, { conn, command }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
   // await conn.sendMessage(m.chat, { react: { text: '⚡️', key: m.key } })
 await m.react('⚡️')
let str = `*📍 GRUPO OFICIAL*

   *⏤͟͞ू⃪ ፝͜⁞𝐀𝐤𝐢𝐭𝐳𝐮⃟⌑sᴏᴘᴏʀ⃢ᴛᴇ✰⃔࿐ೄྀ*
  ┃🧸❏ https://chat.whatsapp.com/LOuWVRTooHxLtTEU10Pr6K

   *🔥༺ღ༒+18༒ღ༻🔥*
┃🧸❏ https://chat.whatsapp.com/HbZpx5kVRALHaANdR9UKAM
   
   *＊•̩̩͙✩•̩̩͙*𝑇𝑒𝑎𝑚 𝑅𝑎𝑛𝑑𝑜𝑤*•̩̩͙✩•̩̩͙＊*
┃🧸❏ https://chat.whatsapp.com/GGKxihqi5Jj0JUOyeFsZMR

   *𝑳𝒐𝒔 𝒕𝒓𝒂𝒖𝒎𝒂𝒅𝒐𝒔. 🔥*
┃❤️‍🔥❏ https://chat.whatsapp.com/IGYE9b35vIpHn5SRAh161s

   *_Canal Oficial_*
┃❤️‍🔥❏ https://whatsapp.com/channel/0029VakLSyb7DAWruqa3jn22
`
await conn.sendButton(m.chat, str, `͟͞⏤͟͞ ⁞𝙈𝙞𝙯𝙪𝙠𝙞☄️⃟ᵀᵒⁿʸ✰⃔࿐ೄྀ\n` + wm, media, [
['Menu Lista 💖', '/lista']], null, [
['⏤͟͞ ⁞𝐀𝐤𝐢𝐭𝐳𝐮⃟⌑ᴮᵒᵗ✰⃔࿐ೄྀ', `${md}`]], fkontak)}
                      
handler.command = ['grupos','linksk','gruposofc','gruposoficiales']
handler.register = true
handler.exp = 33

export default handler
