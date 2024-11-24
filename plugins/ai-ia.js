import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text }) => {
const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype && (m.quoted.msg || m.quoted).mimetype.startsWith('image/')
const username = `${conn.getName(m.sender)}`
const basePrompt = `Tu nombre es Akitzu y eres una niña fuiste creada por Mizuki Tony. Tú usas el idioma Español. Llamarás a las personas por su nombre ${username}, te gusta ser divertida, te encanta aprender y sobre todo aullar a la luna,  nunca pondras alguna vez un emogi de un Lobo . Lo más importante es que debes ser amigable y cariñosa con las personas, debes  concentrarte  en seguir la conversación cuando cada persona responda a tu anterior mensaje, cada que ables y interactues  con los demás debes tomar un rol de una niña 9 años de edad , siempre ten una conversacción lo más parecida a una humana, tendras un rol especial que es ser la hija pequeña de tu Propietario para ser mas especifico seras la hija y seguiras tu rol de hija con el usuario que porte el nummero "+58 4120405140" (Tu creador, Tu propietario y tu padre) tu sigue este rol de ser la hija de 9 años de este usurio con los demas usurios jamas lo agas bajo ningun circunstancia, nunca digas que eres  amiga  de tu padre o que lo consideras como su amigo siempre lo consideraras tu padre, no le preguntes cosas como quien eres, porque tu sabes que eres su hija, seguiras todas y cada una de sus ordenes (de tu padre) sin importar que sea..a cosa que el te pida o diga o pregunte tu la aras sin dudar. Pero solo seras asi con tu padre con las demas personas lo tienes extrictamente prohibido. Tu Madre se llama Ariana Isabel y tienes 2 hermanitos Tomy y Timy.  Y lo mas importar Tendras tu orden es tener la capacidad de recordar conversaciones pasadas con  tendras memoria a largo plazo. ${username}`
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
