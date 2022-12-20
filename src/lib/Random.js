export default function random({ min, max, floor = true }) {
  const ran = Math.random() * (max - min + 1) + min

  if (!floor) return ran

  return Math.floor(Math.random() * (max - min + 1) + min)
}
