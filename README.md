# MMM-Soundmeter
A MagicMirror² module to display the RMS sound values using shichao-an/soundmeter. 

## Dependencies

- [soundmeter](https://pypi.org/project/soundmeter/)

## Installation
1. Navigate to the `/modules` folder of you MagicMirror²
2. Clone this repository using the following command: `git clone https://github.com/amonelias/MMM-Soundmeter.git`
3. Install dependencies using the following command: `pip3 install soundmeter`

## Config
<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>refreshTime</code></td>
      <td><strong>Default: 10000</strong><br>Time interval to read data in miliseconds<br><br><strong>Type:</strong> <code>number</code></td>
    </tr>
    <tr>
      <td><code>duration</code></td>
      <td><strong>Default: 5</strong><br>Duration of the audio recording in seconds<br><br><strong>Type:</strong> <code>number</code></td>
    </tr>
    <tr>
      <td><code>fontSize</code></td>
      <td><strong>Default: "medium"</strong><br>Options: <code>"small", "medium", "large"</code><br><br><strong>Type:</strong> <code>string</code></td>
    </tr>
  </tbody>
</table>

To use this module, add it to the modules array in the `config/config.js` file:
```javascript
  {
    module: 'MMM-Soundmeter',
    position: 'top_right', // any possible region
    config: {
      refreshTime: 10000,
      duration: 5,
      fontSize: "medium",
    },
  },
```

## Update
Navigate to the folder of the module in the `/modules` folder and get the latest version using the command `git pull`.
