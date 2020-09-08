export default {
  created () {
    this.steps = []
    this.$on('add', this.addSteps)
  },
  methods: {
    getSteps () {
      return this.steps
    },
    addSteps (step) {
      this.steps.push(step)
    },
    clear (step) {
      this.steps = []
    }
  }
}
