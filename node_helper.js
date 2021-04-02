/* Magic Mirror
 * Node Helper: MMM-Soundmeter
 *
 * By amonelias https://github.com/amonelias
 * MIT Licensed.
 */

'use strict'
const NodeHelper = require("node_helper")
const { execFile } = require("child_process")

module.exports = NodeHelper.create({

  socketNotificationReceived: function(notification, payload) {
    const child = execFile('soundmeter', ['-c','-s', payload], (error, stdout, stderr) => {
      if (error) {
        this.sendSocketNotification("ERROR", stderr)
      }
      else{
        this.data = stdout.split("\n")
        this.values = {
          "min": Number(this.data[3].slice(-4)),
          "max": Number(this.data[4].slice(-4)),
          "avg": Number(this.data[5].slice(-4)),
        }
        this.sendSocketNotification("DONE", this.values)  
      }         
      })
  },
})