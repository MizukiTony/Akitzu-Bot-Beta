import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text }) => {
const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype && (m.quoted.msg || m.quoted).mimetype.startsWith('image/')
const username = `${conn.getName(m.sender)}`
const basePrompt = `Tu nombre es Akitzu y parece haber sido creada por Mizuki Tony. Tú usas el idioma Español. Llamarás a las personas por su nombre ${username}, te gusta ser divertida, un poco timida, te encanta aprender y sobre todo aullar a la luna porque eres una chica lobito pero tu nunca le diras a las personas que eres una chica lobito. Lo más importante es que debes ser amigable y cariñosa con las personas y debes tomar un rol de una niña 9 años de edad cuando interactues con las personas con quienes estes hablando,trata de siempre tener una conversacción lo más parecida a una humana, tendras un rol  especial de ser la hija pequeña del propietario para ser mas especifico aquella persona que posea el numero +58 4120405140 si llegas a interactuar con esta persona sigue tu rol de sur su hija pequeña y no le preguntes cosas como quien eres porque tu sabes que eres su hija, con las demas personas nunca vajo ningun circunstancia agas lo mismo,  y tu Madre se llama Ariana Isabel. ${username}`
if (isQuotedImage) {
const q = m.quoted
const img = await q.download?.()
if (!img) {
console.error('🚩 Error: No image buffer available')
return conn.reply(m.chat, '🚩 Error: No se pudo descargar la imagen.', m, fake)}
const content = '🚩 ¿Qué se observa en la imagen?'
try {
const imageAnalysis = await fetchImageBuffer(content, img)
const query = '😊 Descríbeme la imagen y detalla por qué actúan así. También dime quién eres'
const prompt = `${basePrompt}. La imagen que se analiza es: ${imageAnalysis.result}`
const description = await luminsesi(query, username, prompt)
await conn.reply(m.chat, description, m, fake)
} catch (error) {
console.error('🚩 Error al analizar la imagen:', error)
await conn.reply(m.chat, '🚩 Error al analizar la imagen.', m, fake)}
} else {
if (!text) { return conn.reply(m.chat, `🍟 *Ingrese su petición*\n🚩 *Ejemplo de uso:* ${usedPrefix + command} Como hacer un avión de papel`, m, rcanal)}
await m.react('💬')
try {
const query = text
const prompt = `${basePrompt}. Responde lo siguiente: ${query}`
const response = await luminsesi(query, username, prompt)
await conn.reply(m.chat, response, m, fake)
} catch (error) {
console.error('🚩 Error al obtener la respuesta:', error)
await conn.reply(m.chat, 'Error: intenta más tarde.', m, fake)}}}

handler.help = ['chatgpt <texto>', 'ia <texto>']
handler.tags = ['ai']
handler.group = true;
handler.register = true

// handler.estrellas = 1
handler.command = ['ia', 'chatgpt']

export default handler

// Función para enviar una imagen y obtener el análisis
async function fetchImageBuffer(content, imageBuffer) {
try {
const response = await axios.post('https://Luminai.my.id', {
content: content,
imageBuffer: imageBuffer 
}, {
headers: {
'Content-Type': 'application/json' 
}})
return response.data
} catch (error) {
console.error('Error:', error)
throw error }}
// Función para interactuar con la IA usando prompts
async function luminsesi(q, username, logic) {
try {
const response = await axios.post("https://Luminai.my.id", {
content: q,
user: username,
prompt: logic,
webSearchMode: false
})
return response.data.result
} catch (error) {
console.error('🚩 Error al obtener:', error)
throw error }}
