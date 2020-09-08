export default {
  beforeDestroy () {
    if (this.introInstance) {
      this.introInstance.clear()
      this.introInstance = null
    }
  }
}
