// get 参数序列化
export default function serialize(obj) {
  let ary = []
  for (var p in obj) {
    if (obj.hasOwnProperty(p) && obj[p]) {
      ary.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  }
  return '?' + ary.join('&')
}
