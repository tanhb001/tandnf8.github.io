const app = {
  currentActiveIndex: 0,
  timerId: null,

  render: () => {
    const imgElements = document.querySelectorAll('.img')
    imgElements.forEach((element, index) => {
      if (index === app.currentActiveIndex) {
        element.classList.add('show')
      } else {
        element.classList.remove('show')
      }
    })
  },

  bindingEventHandler: () => {
    // Prev and next button
    const prevButtonElement = document.querySelector('.btn-prev')
    const nextButtonElement = document.querySelector('.btn-next')

    prevButtonElement.onclick = () => {
      if (app.currentActiveIndex === 0) {
        app.currentActiveIndex = 2
      } else {
        app.currentActiveIndex--
      }
      app.render()
      app.refreshInterval()
    }

    nextButtonElement.onclick = () => {
      if (app.currentActiveIndex === 2) {
        app.currentActiveIndex = 0
      } else {
        app.currentActiveIndex++
      }
      app.render()
      app.refreshInterval()
    }

    // Dot navigate
    const dotElements = document.querySelectorAll('.btn-pagination')
    dotElements.forEach((element, index) => {
      element.onclick = () => {
        app.currentActiveIndex = index
        app.render()
        app.refreshInterval()
      }
    })
  },

  getIntervalId: () => {
    return setInterval(() => {
      app.currentActiveIndex = app.currentActiveIndex === 2 ? 0 : app.currentActiveIndex + 1;
      app.render();
    }, 3000)
  },

  refreshInterval: () => {
    clearInterval(app.timerId)
    app.timerId = app.getIntervalId()
  },

  run: () => {
    app.render();
    app.bindingEventHandler();
    app.timerId = app.getIntervalId()
  }
}

app.run()