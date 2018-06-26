// listings model
export default class Listing {
  constructor(icon, title, latlng, category) {
      this.icon = icon,
      this.title = title,
      this.position = latlng,
      this.category = category
  }
}
