# CustUp

<div align="center">
    <img src="https://github.com/paulosabayomi/CustUp/blob/master/_assets/custup.png" alt="Custup logo" width="200" style="object-fit: contain; justify-self:center;"/>
</div>

<!-- [START BADGES] -->
<!-- Please keep comment here to allow auto update -->
<p align="center">
  <a href="https://github.com/paulosabayomi/CustUp/blob/master/LICENSE"><img src="https://img.shields.io/github/license/paulosabayomi/CustUp?style=flat-square" alt="MIT License" /></a>
  <a href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript"><img src="https://img.shields.io/badge/logo-javascript-blue?logo=javascript" alt="Language" /></a>
  <a href="https://github.com/paulosabayomi/CustUp/pulls"><img src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome" /></a>
  <a href="https://github.com/paulosabayomi/CustUp/actions/workflows/node.js.yml"><img src="https://github.com/paulosabayomi/CustUp/actions/workflows/node.js.yml/badge.svg" alt="Tests" /></a>
  <a href="https://github.com/paulosabayomi/CustUp/actions/workflows/setup-node.yml"><img src="https://github.com/paulosabayomi/CustUp/actions/workflows/setup-node.yml/badge.svg" alt="Publish to NPM" /></a>
  <a href="https://typescriptlang.org"><img src="https://img.shields.io/badge/logo-typescript-blue?logo=typescript" alt="TypeScript" /></a>
  <a href="https://github.com/paulosabayomi/CustUp/actions/workflows/test-ts.js.yml"><img src="https://github.com/paulosabayomi/CustUp/actions/workflows/test-ts.js.yml/badge.svg" alt="TypeScript Test" /></a>
</p>
<!-- [END BADGES] -->
  
<div>
    <img src="https://github.com/paulosabayomi/CustUp/blob/master/_assets/custup-default.png" alt="Custup logo" width="45%" style="object-fit: contain; justify-self:center;"/>
    <img src="https://github.com/paulosabayomi/CustUp/blob/master/_assets/custup-2.png" alt="Custup logo" width="45%" style="object-fit: contain; justify-self:center;"/>
    <img src="https://github.com/paulosabayomi/CustUp/blob/master/_assets/custup-3.png" alt="Custup logo" width="45%" style="object-fit: contain; justify-self:center;"/>
    <img src="https://github.com/paulosabayomi/CustUp/blob/master/_assets/custup-4.png" alt="Custup logo" width="45%" style="object-fit: contain; justify-self:center;"/>
</div>
  
CustUp is a highly customizable JavaScript file upload library with zero dependency that can be easily adapted to a wide range of applications.  
  
## Brief Overview

CustUp which is the short for Customizable Uploader was made to be >95% customizable if not 100%, and it is very easy to customize it to suit any kind of project you're working on.  

### Things you might want to know about CustUp

- Choose the UI type that fits your project.
- Easily change the UI design or create your own UI just by overriding or adding to the CSS classes of the Elements.
- With the instance attachment feature, you can create multiple CustUp instances and upload all files at once together with form fields and/or additional data.
- You can get all the selected files and upload them manually.
- You don't need to worry about installing HTTP client to manage your upload requests because axios was bundled into CustUp which you can easily configure.

## Documentation Homepage

[CustUp documentation website](https://custup.pryxy.com)
  
## Quick Start

### Installation

Install from npm

```cmd
npm i custup
```

```js
import CustUp from 'path/to/custup/src/custup.min.js'
const instance1 = new CustUp({
    targetRootElement: '#container',
})
```

**TypeScript**

```js
import CustUp from 'path/to/custup/'
const instance1 = new CustUp({
    targetRootElement: '#container',
})
```

if you get `Uncaught SyntaxError: import declarations may only appear at top level of a module` error add `type="module"` to the javascript file where `CustUp` was imported into.  
  
OR include it via UNPKG

```js
import CustUp from 'https://unpkg.com/custup@latest/src/custup.min.js' 

// and the CSS file

<link rel="stylesheet" href="https://unpkg.com/custup@latest/src/all.min.css">
```

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

To change the font style change the `css_font_link` and or only set `css_font_name` if you want to use the application's font name.  
**Note:** CustUp currently only supports Google Fonts so only Google Fonts link may work.

```js
const options = {
    // ...
    css_font_link: "https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap",
    css_font_name: "Dancing Script",
}

const uploader = new CustUp(options)
```

To change the styles of some elements, you can override their styles by either overriding their classname or adding a css classname to the element's class name

```js
    const options = {
        // ...
        default_styles_override: {
            remove_file_btn: ['close_btn', true],
            fileDisplayUI: ['custup_inner_container', true],
            fileUIOuterContainer: ['custup_file_display_outer', true],
            fileUI: ['custup_file_ui_outer', true],
            file_wrapper_el: ['file_wrapper', true],
            fileDetailsContainer: ['file_details', true],
            UITool: ['tool_container', true],
            custupInnerContainerWrapperEl: ['inner_container_wrapper', true],
            headerContainer: 'header_cont',
            footerContainer: 'footer_container'
        },
    }

const uploader = new CustUp(options)
```

To overide the default class names the provided class name should be a string or an array with false as the second item like `fileUIOuterContainer: ['custup_file_display_outer', false],` and to append/add new css class name to the element the second item in the array should be `true` like `fileUIOuterContainer: ['custup_file_display_outer', true]`  
  
Read more on how to customize CustUp elements with [properties here](https://custup.pryxy.com/docs/properties)

File upload settings, you can also add additional data that should be sent along the files, and/or a form field data to be sent along with the upload and you can also set the axios settings

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

To set CustUp to automatically upload files immediately after files has been added to the UI set the `upload_automatically` to `true`

```js
const options = {
    // ...
    upload_automatically: true,
}

const uploader = new CustUp(options)
```

### File Select Sources

CustUp file select sources is divided into External and Media Sources  

#### External Sources are

- Google Drive
- Dropbox
- Box
- OpenAI DALL.E-3
- URL  
  
Onedrive is not currently supported, will be added in the future version

#### And Media Sources are

- Camera
- Video Recording
- Audio Recording
- Screen Recording

You can choose which sources to allow and the order in which you want them to appear on the UI

```js
const options = {
    // ...
    allowed_sources: ['dropbox_source'], // only Dropbox file source icon will be displayed on the UI    
    // allowed_sources: ['openai_dalle_source', 'capture_image', 'box_source'], // only OpenAI DALL.E-3, Image capture from media devices and Box icons will be displayed and ordered as listed in the array 
}

const uploader = new CustUp(options)
```

See more sources in the Options below.  
  
If you wants to use another HTML elements to control the upload, you can set the UI tools to not display on the default UI.

```js
const options = {
    // ...
    display_ui_tools: false,
}

const uploader = new CustUp(options)
```

When previewing a file there are in and out animations, by default the animations are randomized but you can set which animations to use or you can also disable the animations

```js
const options = {
    // ...
    file_preview_animation_types: ['slideInLeft'], // the animation previewer will only use `slideInLeft` animation type

    // file_preview_animation_types: ['slideInRight', 'zoomIn', 'slideInLeft'], // this will randomly choose between the array of the animations when displaying files

    // file_preview_animation_types: null, // to disable file preview animation set it to null
}
const uploader = new CustUp(options)
```

Even the CustUp scrolling and scrollbar are custom made so you can also customize them, to not show the scrollbar set `disable_scrollbar` to `false`

```js
const options = {
    // ...
    disable_scrollbar: false
}
const uploader = new CustUp(options)
```  
  
### Attaching instances

Guess the maximum number of CustUp instances that can be on a single page, `Infinity` and up to the maximum capacity of your user's device memory, so also it is also possible to attach one or more CustUp instances to another instance basically for collective file upload, that is if you have more than one CustUp instances on a single page and you would like to upload all the files added to all the instances together in a single upload.  
**For Example**

```js
const instance1 = new CustUp({...});
const instance2 = new CustUp({...});
const instance3 = new CustUp({...});
const instance4 = new CustUp({
    //...
    instance_attach: [instance1, instance2, instance3],
    // single_upload: true,
});
instance4.upload();
```

`single_upload` when set to true and used with `instance_attach` it is useful if all files should be uploaded at once, if `false` then upload event will be triggered for each of the files in all of the attached instances.  
  
See more guides on the [documentation page](https://custup.pryxy.com/docs/category/guides).  
  
## Options

| Option | type | default | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
targetRootElement | `string` | `<empty string>` | Required | The HTML element to spawn CustUp into
_custupDefaultUploadSentence | `string` | Drag files to upload or Click to select file from device | Not Required | The HTML element that shows the description on the default UI
disable_scrollbar | `boolean` | `false` | Not required | Whether to disable scroll bar or not
persist_default_ui | `boolean` | `false` | Not required | Whether the default UI should never be hidden
allowed_sources | `Array<'record_video' 'capture_image' 'record_audio' 'record_screen' 'link_source' 'google_drive_source' 'dropbox_source' 'box_source' 'openai_dalle_source'>` | `[]` | Not required | sources for selecting and adding files to CustUp
use_default_file_display_ui | boolean | `true` | Not required | Whether to use the default file display UI, set it to `false` if you would like to use your own UI, if `false` the UI tools and scrollbar will not be shown and selected files will not be shown on the UI
show_preview_file_btn | boolean | `true` | Not Required | whether to show file preview button or not
autoInitialize | boolean | `true` | Not required | Whether to automatically initialize and add CustUp UI to the DOM
show_file_remove_btn | boolean | `true` | Not required | Whether to show file remove button or not
show_file_details_container | boolean | `true` | Not Required | Whether to show the file details container, the container that holds the file name, size and preview icon
file_source_icons | `Object` with key of `video_camera` , `capture_image` , `record_audio` , `record_screen` , `url_source` , `google_drive_source` , `dropbox_source` , `box_source` , `openai_dalle_source` | Default file HTML and style | Not required | To override the default file source icons HTML, for example to change the HTML and style of `video_camera` set `file_source_icons: {file_source_icons: HTMLElement}`
css_font_link | `string` | `https://fonts.googleapis.com/css2?family=Lato&display=swap` | Not required | The URL to the Google Font you would like a CustUp instance to use
css_font_name | `string` | Lato | Not required | The CSS font name of the loaded font or of the application's font name if you want CustUp to use the application's font
external_source_style_override | `typeof external_sources_ui_styles` | external_sources_ui_styles | Not required | if you would like to change the CSS of the overlay UI that displays the external file sources by either overriding their CSS classnames or adding your own CSS class name
media_capture_source_style_override | `typeof media_capture_ui_styles` | media_capture_ui_styles | Not required | if you would like to change the CSS of the overlay UI that displays the media capture file sources by either overriding their CSS classnames or adding your own CSS class name
default_styles_override | `typeof ui_styles` | ui_styles | Not required | To change the styles of the default CustUp elements by either overriding their CSS classnames or adding your own CSS class name
persist_styles_override_across_instances | `boolean` | false | Not required | Whether to persists the styles that were overiding across CustUp instance after the instance
default_icons_override | typeof icons | icons | Not required | To override icons with your own icons
allowed_file_types | `keyof file_types` | All file types | Not required | To set which file types to allow to be selected and uploaded
maxNumberOfFiles | `number` | `Infinity` | Not required | The maximumn number of files that can be selected and uploaded
minNumberOfFiles | `number` | `None` | Not required | The minimum number of files that must be selected before upload
minimumAllowedFileSize | `number` | `Infinity` | Not required | The minimum allowed file size
maximumAllowedFileSize | `number` | `None` | Not required | The minimmum file size that can be selected
instance_attach | `Array<CustUp>` | `[]` | Not required | For attaching different CustUp instances together basically for joining the selected files in the attached instances to the current instance when uploading
single_upload | `boolean` | `false` | Not required | If `true` it will upload all selected files at once
persist_files | `boolean` | `false` | Not required | To persist files in the browser storage, if `true` it will temporarily save the selected files in the browser storage and the files will be restored on page reload, it will use `sessionStorage` if `persist_type` is set to `soft` which is the default and `localStorage` if `persist_type` was set to `hard`, CustUp uses the `targetRootElement` id or classname as the key to store files for an instance
persist_type | `soft` or `hard` | `soft` | Not required | To set the `persist_files` storage method, if `soft` CustUp will use `sessionStorage` to temporarily store files and if `hard` CustUp will use `localStorage` to store files.
alert_timeout_time | `number` | `300` milliseconds | Not required | The timeout for CustUp alerts  
  
There are many more other options, read the [documentation for more options](https://custup.pryxy.com/docs/category/options)  
  
## All Options

These are all the options

```js
options = {
    // Core Options
    autoInitialize: true,
    disable_scrollbar: false,
    persist_default_ui: false,
    use_default_file_display_ui: true,
    position_container: undefined,

    // UI type
    ui_type: 'default', 
    _custupDefaultUploadSentence: "Drag files to upload or Click to select file from device", // the text that displays at the top of other upload options
    
    // style customization
    default_styles_override: {},
    persist_styles_override_across_instances: false,
    external_source_style_override: undefined,
    media_capture_source_style_override: undefined,

    // icons customization
    default_icons_override: {},

    // File display
    show_preview_file_btn: true,
    show_file_remove_btn: true,
    show_file_details_container: true,
    file_preview_animation_types: [],

    // UI tools
    display_ui_tools: true,
    disable_drag_n_drop: false,
    disable_select_files_from_device: false,
    allowed_tools: [],

    // File source icons customization
    file_source_icons: {
        video_camera: icons.video_camera,
        capture_image: icons.photo_camera,
        record_audio: icons.audio,
        record_screen: icons.screen_recording,
        url_source: icons.link,
        google_drive_source: icons.google_drive,
        dropbox_source: icons.dropbox,
        box_source: icons.box_icon,
        openai_dalle_source: icons.openai_logo
    },

    allowed_sources: [],

    // Upload source config
    file_source_config: {
        video_recording: {
            video_only: false,
            show_image_capture_btn: true,
        },
        capture_image: {
        },
        record_audio: {
        },
        record_screen: {
        },
        url_source: {
        },
        google_drive_source: {
            authConfig: {
                client_id: '',
                api_key: '',
                app_id: '',
                scopes: 'https://www.googleapis.com/auth/drive.metadata.readonly'
            },
        },
        dropbox_source: {
            authConfig: {
                appKey: "",
            },
            options: {
                cancel: function() {},
            }
        },
        box_source: {
            authConfig: {
                developerToken: "",
                cssLink: "https://cdn01.boxcdn.net/platform/elements/17.1.0/en-US/picker.css",
                jsLink: "https://cdn01.boxcdn.net/platform/elements/17.1.0/en-US/picker.js",
                folder_id: '0'
            },
            pickerConfig: {
                chooseButtonLabel: 'Select Files From Box',
                sortBy: 'name', // name | date
                sortDirection: 'ASC', // ASC | DESC
                logoUrl: '', // URL to logo
                extensions: [], // e.g. png, jpg, pdf
                maxSelectable: Infinity, // Infinity | number
                canUpload: false, // whether to show upload features
                canSetShareAccess: false, // whether to enable sharing feature
                canCreateNewFolder: false, // whether user can create a new folder from the UI
                sharedLink: '', // Shared link URL, required if folder is shared and the access token doesn't belong to an owner or collaborator of the file.
                sharedLinkPassword: '', // Shared link password, required if shared link has a password.
                modal: '', // whether to display the the content picker in a modal
                size: undefined, // undefined | 'large' | 'small' - undefined make it fit to the target container
                isTouch: ( navigator.maxTouchPoints > 0 ) || ( navigator.msMaxTouchPoints > 0 ), // checks and automatically enables touch mode on devices that uses touch screen
                autoFocus: false,
                defaultView: 'files', // 'files' or 'recents'
                chooseButtonLabel: undefined, // String to re-label the Choose button
                cancelButtonLabel: undefined, // String to re-label the Cancel button
                requestInterceptor: undefined, // undefined | Function - like axios request interceptor
                responseInterceptor: undefined, // undefined | Function - like axios response interceptor
            }
        },
        openai_dalle_source: {
            endpoint: "https://api.openai.com/v1/images/generations",
            api_key: "",
            size: "1024x1024", // 256x256, 512x512, or 1024x1024
            n: 4,
            model: "dall-e-3",
            quality: "standard", // standard | hd
        }

    },

    // Custup Setup Options
    css_font_link: "https://fonts.googleapis.com/css2?family=Lato&display=swap", // link to css font and it currently supports google fonts
    css_font_name: "Lato", // name of the loaded font style 
    allowed_file_types: [], // Allowed file types, any file can be uploaded if the `allowed_file_types` parameter is not provided
    targetRootElement: undefined, // Root target element to spawn the file uploader in
    maxNumberOfFiles: undefined, // maximum allowed files that can be added, any number of files can be uploaded if not provided
    minNumberOfFiles: undefined, // minimum allowed files that must be added, no limit if the `minNumberOfFiles` parameter was not provided
    minimumAllowedFileSize: undefined, // minimum allowed file size that can be added to be uploaded, no minimum restriction will be placed if `minimumAllowedFileSize` is not provided
    maximumAllowedFileSize: undefined, // maximum allowed file size that can be added to be uploaded, no maximum restriction will be placed if `maximumAllowedFileSize` is not provided
    allowMultipleUpload: true, // whether to allow multiple file selection or not

    // File upload settings
    file_upload_settings: {
        endpoint_url: '',
        files_field_name: 'file',
        form_field: '',
        additional_data: {},
        axios_settings: {
            headers: {},
            configs: {}
        }
    },
    upload_automatically: false, // whether to upload file to the server automatically
    show_upload_error_overlay: true,

    // Default files File | Blob | link | base64
    default_files: [],
    count_default_files: true,

    instance_attach: [],
    single_upload: false,

    // File storage locally
    persist_files: false,
    persist_type: 'soft',

    // notification
    alert_timeout_time: 300
}
```

See all available options [here](https://custup.pryxy.com/docs/category/options)

## Events

CustUp has events that can be subscribed to  
  
### For example

```js
uploader.on('file.beforeAdded', (ev) => {
    console.log('CustUp:', ev)
})
```

| Event name | Description | Returns |
| ---- | ---- | ---- |
| `'library.init'` | Called after the library has finished initializing and has been painted on the UI | `null` |
| `'file.beforeAdded'` | Called just before file gets added to the memory and/or UI | `{file: File, base64: string}` |
| `'file.afterAdded'` | Called after file has been added to the memory and/or browser storage and/or UI | `{file: File, element: HTMLElement, count: number}` |
| `'file.beforePassedChecks'` | For adding additional file checks, and must return either `true` or `false` or else it is not going to be effective | `null` |
| `'file.removed'` | Called when a file has been removed from memory, UI and/or browser storage | `{file: File, files_count: number}` |
| `'file.defaultFileRemoved'` | Called when a default loaded file is being removed | `File` |
| `'file.all_removed'` | Called when all the files both selected and/or added to the UI by default has been removed from memory and/or browser storage | `Array<File>` |
| `'video.recordingStarted'` | Called when video recording has started | `{media_recorder: MediaRecorder, media_devices: MediaDevices, display_el: HTMLElement}` |
| `'upload.progress'` | Called on each file being uploaded or when files are being uploaded collectively | `{progressEvent: Event}` |
| `'upload.success'` | Called when a file or all files has successfully been uploaded | `{data: 'being returned from the server', file: File, upload_element: HTMLElement | null, file_container: HTMLElement | null}` |
| `'upload.error'` | Called when a file or collective upload was not successfully due to an error | `{err: Error, file: File, upload_element: HTMLELement | null, file_container: HTMLElement | null}` |
| `'upload.retry'` | Called when an upload is about to be retried | `{file: File, file_container: HTMLElement | null}`  |
  
And many more events, read the documentation for more events  
  
### All Events

```js
/*
    * @param { 'file.beforeAdded' | 
     *  'library.init' | 
     *  'file.afterAdded' | 
     *  'file.beforePassedChecks' | 
     *  'file.removed' | 
     *  'file.defaultFileRemoved' | 
     *  'file.all_removed' | 
     *  'video.recordingStarted' |
     *  'video.recording' | 
     *  'video.recordStop' | 
     *  'video.recordSaved' |
     *  'video.recordCancel' | 
     *  'image.captured' | 
     *  'audio.recordingStarted' | 
     *  'audio.recording' | 
     *  'audio.recordStop' | 
     *  'audio.recordSaved' | 
     *  'audio.recordCancel' | 
     *  'screen.recordingStarted' | 
     *  'screen.recording' | 
     *  'screen.recordStop' | 
     *  'screen.recordSaved' | 
     *  'screen.recordCancel' | 
     *  'upload.beforeStart' | 
     *  'upload.progress' | 
     *  'upload.success' | 
     *  'upload.error' |
     *  'upload.retry' 
     * } event
*/
```

Check out more events [here](https://custup.pryxy.com/docs/events)

## Methods

There are several methods that can be used to customize the library to your taste, example, to dynamically call the `upload` method

```js
uploader.upload() // this will trigger upload to upload al files
```

It can also take in the `id` of the file to upload in the case of uploading single file

```js
uploader.upload(file_id) // file id is the id that CustUp adds to the selected file using crypto.randomUUID()
```

| Method name | Description | param |
| ---- | ---- | ---- |
| upload | To trigger upload for all files or a single file | `file_id` . Not required
retry_upload | To trigger upload retry for all files that were not uploaded due to an error or for a single file | `file_id` . Not required |
| show_add_file_ui | The method to show the default UI for selecting new files, will not work if `use_default_file_display_ui` is set to false | `None` |
| preview_file | To preview a file, it takes the cryptographically generated id added to the file by CustUp | `file_id` . Required |
| get_selected_files | To get all the selected files excluding the default loaded files in memory, it returns all the selected excluding the default loaded files files in memory | `None` |
| get_all_files | To get all the selected files including the default loaded files in memory, it returns all the selected including the default loaded files files in memory | `None` |
| clear_files | To clear all the added files from the memory, browser storage and UI | `None` |
| get_total_file_count | Returns all total number of added files, it will only return total number of selected files if `count_default_files` is set to false | `None`   |
  
And many more, read more about [CustUp methods in the documentation](https://custup.pryxy.com/docs/methods)

## Inspiration

When I was working on a freelance project that has a custom file upload UI design some years back, I searched for libraries that can fit into the design or ones that has an option to change the UI style to fit into my project and that does not have any dependencies but I couldn't find any that fit into the description and I had to write a custom implementation for the file uploader from scratch, then I decided to build a file upload library that fits into the description of the library I couldn't find then.
  
## Upcoming Features

- [x] Typescript version/support
- [x] React js version
- [x] Chunk upload
- [ ] Upload resumable
- [ ] Onedrive implementation

## Contributing

Contributions and PRs are welcome, learn ways you can contribute [here](https://github.com/paulosabayomi/CustUp/blob/master/contributing.md)

## License

[MIT License](https://github.com/paulosabayomi/CustUp/blob/master/LICENSE)
