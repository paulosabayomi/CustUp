# CustUp
<!-- [START BADGES] -->
<!-- Please keep comment here to allow auto update -->
[![MIT License](https://img.shields.io/github/license/paulosabayomi/CustUp?style=flat-square)](https://github.com/paulosabayomi/CustUp/blob/master/LICENSE)
[![Language](https://img.shields.io/badge/logo-javascript-blue?logo=javascript)](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square)](https://github.com/paulosabayomi/CustUp/pulls)
[![Tests](https://github.com/paulosabayomi/CustUp/actions/workflows/node.js.yml/badge.svg)](https://github.com/paulosabayomi/CustUp/actions/workflows/node.js.yml)
<!-- [END BADGES] -->
  
![CustUp Init](https://github.com/paulosabayomi/CustUp/blob/master/_assets/custup-default.png)  
  
CustUp is a highly customizable library with zero dependency, and can be easily adapted to a wide range of applications.  
  
## Inspiration

When I was working on a freelance project that has a custom file upload UI design some years back, I searched for libraries that can fit into the design or ones that has an option to change the UI style to fit into my project and that does not have any dependencies but I couldn't find any that fit into the description and I had to write a custom implementation for the file uploader from scratch, then I decided to build a file upload library that fits into the description of the library I couldn't find then.
  
## Quick Start

### Installation

Install from npm

```cmd
npm i custup
```

OR include it via UNPKG

```js
import CustUp from 'https://unpkg.com/custup@0.0.1/src/custup.min.js' 

// and the CSS file

<link rel="stylesheet" href="https://unpkg.com/custup@0.0.1/src/all.min.css">
```

```js
import CustUp from 'path/to/custup/src/custup.min.js'
const instance1 = new CustUp({
    targetRootElement: '#container',
})
```

if you get `Uncaught SyntaxError: import declarations may only appear at top level of a module` error add `type="module"` to the javascript file where `CustUp` was imported into

This will load the default UI which you can further customize to fit your need or the need of your application  
  
Then include the CSS file

```html
<!--All the CSS files combined together -->
<link rel="stylesheet" href="path/to/custup/src/all.min.css">

<!-- OR individual CSS files -->
<!-- Bare UI CSS file -->
<link rel="stylesheet" href="path/to/custup/src/bare.min.css">
<!-- CustUp default UI CSS file -->
<link rel="stylesheet" href="path/to/custup/src/custup.min.css">
<!-- Detached UI CSS file -->
<link rel="stylesheet" href="path/to/custup/src/detached.min.css">
<!-- ResumeUploader UI CSS file -->
<link rel="stylesheet" href="path/to/custup/src/resumeUploaderUI.min.css">
```

CustUp was developed to be fully customizable, you can customize/change CSS styles, UI order, Icons, and even remove HTML elements just by using the Options

## Example options

```js
const options = {
    allowed_file_types: ['mp3', "mp4", "jpg", "png", "jpeg","pdf"],
    targetRootElement: '#container',
    maxNumberOfFiles: 5,
    minNumberOfFiles: 3,
    maximumAllowedFileSize: 10000000,
}

const uploader = new CustUp(options)
```

Change the UI type

```js
const options = {
    // ...
    ui_type: 'detached', // the detached UI type, see more in Options sections below
}

const uploader = new CustUp(options)
```

File upload settings, you can also add additional data that should be sent along the files, and/or a form field data to be sent along with the upload including axios settings

```js
const options = {
    // ...
    file_upload: {
        endpoint_url: 'http://localhost/fileupload', // endpoint
        additional_data: { // additional data to be sent along with the 
            user_id: 123456789,
            username: 'johndoe'
        },
        form_field: '#form', // HTMLFormElement
        axios_settings: {
            headers: {}, // configure the axios header, like add a Bearer token
            configs: {}, // add a configuration to axios
        }
    },
}

const uploader = new CustUp(options)
```
  
**More documentations in progress...**
