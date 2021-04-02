/* global Module */

/* Magic Mirror
 * Module: MMM-Soundmeter
 *
 * By amonelias https://github.com/amonelias
 * MIT Licensed.
 */

Module.register("MMM-Soundmeter", {

  defaults: {
    refreshTime: 10000,
    duration: 5,
    fontSize: "medium"
  },

  start: function () {
    this.sendSocketNotification("", this.config.duration)
    let timer = setInterval(()=>{
      this.sendSocketNotification("", this.config.duration)
    }, this.config.refreshTime)

    if(this.config.fontSize === "small"){
      this.fontSizeHeader = "xsmall"
    }
    else if(this.config.fontSize === "medium"){
        this.fontSizeHeader = "small"
    }
    else if(this.config.fontSize === "large"){
        this.fontSizeHeader = "medium"
    }
    else{
        this.config.fontSize = "medium"
        this.fontSizeHeader = "small"
    }
  },

  getDom: function() {
    let element = document.createElement("div")
    element.id = "soundmeter"

    let header = document.createElement("div")
    header.id = "soundmeter-header"
    header.classList.add("normal", this.fontSizeHeader, "regular")

    let content = document.createElement("div")
    content.id = "soundmeter-content"

    let minmax = document.createElement("div")
    minmax.id = "soundmeter-min"
    minmax.classList.add("bright", this.config.fontSize, "regular")

    let avg = document.createElement("div")
    avg.id = "soundmeter-avg"
    avg.classList.add("bright", this.config.fontSize, "regular")

    header.innerHTML = "Soundmeter:"
    minmax.innerHTML = "Min: ... Max: ..."
    avg.innerHTML = "Avg: ..."

    content.appendChild(minmax)
    content.appendChild(avg)
    element.appendChild(header)
    element.appendChild(content)
    return element
  },

  socketNotificationReceived: function(notification, payload) {
    let element = document.getElementById("soundmeter")
    document.getElementById("soundmeter-content").remove()
    let content = document.createElement("div")
    content.id = "soundmeter-content"
    switch(notification) {
      case "ERROR":
        let error = document.createElement("div")
        error.id = "soundmeter-error"
        error.style.color = "#ff0033"
        error.classList.add(this.config.fontSize, "regular")
        error.innerHTML = "ERROR"
        console.error("Error Soundmeter: ", payload)
        content.appendChild(error)
        break
      case "DONE":
        let minmax = document.createElement("div")
        minmax.id = "soundmeter-min"
        minmax.classList.add("bright", this.config.fontSize, "regular")
    
        let avg = document.createElement("div")
        avg.id = "soundmeter-avg"
        avg.classList.add("bright", this.config.fontSize, "regular")

        minmax.innerHTML = "Min: <b>" + payload["min"] + "</b> " + "Max: <b>" + payload["max"] + "</b>"
        avg.innerHTML = "Avg: <b>" + payload["avg"] + "</b>"

        content.appendChild(minmax)
        content.appendChild(avg)

        this.sendNotification("SOUNDMETER_DATA_MIN", Number(payload["min"]))
        this.sendNotification("SOUNDMETER_DATA_MAX", Number(payload["max"]))
        this.sendNotification("SOUNDMETER_DATA_AVG", Number(payload["avg"]))
        break
    }
    element.appendChild(content)
  },

})