module.exports = {
  decodeUtf8: bytes => decodeURIComponent(bytes),
  encodeUtf8: text => encodeURIComponent(text)
}
