export default function (to, from, savedPosition) {
  return savedPosition ? savedPosition : { x: 0, y: 0 }
}
