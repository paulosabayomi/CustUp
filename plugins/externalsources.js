import { external_sources_ui_styles } from "../utils/_styles.js"
import Axios from "../libs/axios/dist/esm/axios.min.js"
import icons from "../utils/icons.js"
import file_types from "../utils/filetypes.js";

export default class ExternalSource {
    _custupInnerContainer
    callbackFn
    standalone_mode // not implemented yet

    /**
     * @private @param {HTMLDivElement} container_ui_container
     * @private @param {HTMLDivElement} custup_close_btn
     * @private @param {Function | undefined} custup_show_message
     * @private @param {Function | undefined} handle_custom_scroll
     * @private @param {Array<keyof file_types>} allowed_mime_types
     * @private @param {Function | undefined} onclose
     */
    container_ui_container
    custup_close_btn
    custup_show_message_fn
    handle_custom_scroll = {
        customScroll: () => null,
        customScrollbar: () => null,
        handleSetPointerEV: () => null
    }
    allowed_mime_types = []
    onclose
    setElementMediaQuery

    /**
     * @private @param {string} source_type
     */
    source_type

    /**
     * @private @param {string} external_source_style
     */
    external_source_style = {...external_sources_ui_styles}

    /**
     * URL Source
     */
    URL_source_container
    URL_source_inner_container_1
    URL_source_inner_container_2
    URL_source_input_container
    URL_source_button_container
    URL_source_text_input
    URL_source_button

    /**
     * Google Drive Picker
     */
    googleDrivePickerTokenClient;
    accessToken = null;
    googleDrivePickerInited = false;
    gisInited = false;
    
    dropboxUIContainer

    /**
     * OneDrive source
     */
    onedriveAuthConfig = {
        msalParams: {
            auth: {
                authority: "https://login.microsoftonline.com/d5ccedd1-33d1-43e9-a934-c5e68381d83b",
                clientId: "",
                redirectUri: "http://localhost:5501"
            },
        },
        params: {
            sdk: "8.0",
            entry: {
                oneDrive: {
                    files: {},
                }
            },
            authentication: {},
            messaging: {
                origin: "http://localhost:5501",
                channelId: "27"
            },
            typesAndSources: {
                mode: "files",
                pivots: {
                    oneDrive: true,
                    recent: true,
                },
            },
        }
    }
    onedriveSetupConfig = {
        msalLink: "https://alcdn.msauth.net/browser/2.19.0/js/msal-browser.min.js",
        baseUrl: 'api://43d99db1-016a-493b-aa91-3b8990148aa0',
    }
    msalApp
    onedrivePickerWin
    onedrivePickerPort

    


    /**
     * @private @param {HTMLDivElement} dalleOuterContainer 
     */
    dalleOuterContainer
    /**
     * @public @param {HTMLDivElement} dalleInitialPageContainer 
     */
    dalleInitialPageContainer
    /**
     * @public @param {HTMLDivElement} dallePreviewPageContainer 
     */
    dallePreviewPageContainer
    
    dalleResponseData = []
    dalle_file_data = []
    dalle_selected_files = []

    config_override = {
        url: {},
        onedrive: {},
        google_drive: {
            authConfig: {
                // client_id: '428438400029-ua7f74tsdh1f6f2qrdlek4hl8m0egcjk.apps.googleusercontent.com',
                client_id: '',
                api_key: '',
                app_id: '',
                scopes: 'https://www.googleapis.com/auth/drive.metadata.readonly'
            }
        },
        clipboard: {},
        box: {
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
        dalle: {
            endpoint: "https://api.openai.com/v1/images/generations",
            api_key: "",
            model: "dall-e-3", // "dall-e-3" | "dall-e-2"
            quality: "standard", // standard | hd
            size: "1024x1024", // "1024x1024" | "1024x1792" | "1792x1024"
            n: 4,
            response_format: {
                b64: "b64_json"
            }
        },
        dropbox: {
            authConfig: {},
            options: {
                // Optional. Called when the user closes the dialog without selecting a file
                // and does not include any parameters.
                cancel: function() {},
            
                // Optional. "preview" (default) is a preview link to the document for sharing,
                // "direct" is an expiring link to download the contents of the file. For more
                // information about link types, see Link types below.
                linkType: "direct", // "preview" or "direct"
            
                // Optional. A value of false (default) limits selection to a single file, while
                // true enables multiple file selection.
                multiselect: true, // or true
            
                // Optional. This is a list of file extensions. If specified, the user will
                // only be able to select files with these extensions. You may also specify
                // file types, such as "video" or "images" in the list. For more information,
                // see File types below. By default, all extensions are allowed.
                extensions: [],
            
                // Optional. A value of false (default) limits selection to files,
                // while true allows the user to select both folders and files.
                // You cannot specify `linkType: "direct"` when using `folderselect: true`.
                folderselect: false, // or true
            
                // Optional. A limit on the size of each file that may be selected, in bytes.
                // If specified, the user will only be able to select files with size
                // less than or equal to this limit.
                // For the purposes of this option, folders have size zero.
                // sizeLimit: 1024, // or any positive number
            }
        },
        style_override: {}

    }


    /**
     * 
     * @param {{
    *      inner_container: HTMLDivElement;
    *      source_type: 'url' | 'onedrive' | 'google_drive' | 'clipboard' | 'box' | 'dalle';
    *      standalone?: boolean;
    *      callbackFn: Function;
    *      custup_close_btn?: HTMLDivElement;
    *      custup_show_message_fn?: Function;
    *      onclose?: Function;
    *      handle_custom_scroll?: {
    *       customScroll: Function;
    *       customScrollbar: Function;
    *      };
    *      allowed_mime_types: Array<keyof file_types>;
    *      config_override: {
    *          url: object;
    *          onedrive: object;
    *          google_drive: object;
    *          clipboard: object;
    *          box: object;
    *          dalle: object;
    *       };
    *       style_override: typeof external_sources_ui_styles;
    * }}
    */

    constructor({
        inner_container,
        source_type,
        standalone,
        custup_close_btn,
        callbackFn,
        custup_show_message_fn,
        handle_custom_scroll,
        allowed_mime_types,
        onclose,
        config_override,
        style_override,
        setElementMediaQuery
    }) {
        if (inner_container == undefined && !standalone) {
            throw new Error('inner container of custup initialization is required')
        }

        this._custupInnerContainer = inner_container;
        this.standalone_mode = !standalone ? false : true;

        this.source_type = source_type;

        this.custup_close_btn = custup_close_btn;

        this.callbackFn = callbackFn;
        this.custup_show_message_fn = custup_show_message_fn;
        this.handle_custom_scroll = handle_custom_scroll;
        this.allowed_mime_types = allowed_mime_types;
        this.onclose = onclose;

        Object.keys(config_override).forEach(mkey => {
            for (const key in config_override[mkey]) {
                if (Object.hasOwnProperty.call(config_override[mkey], key)) {
                    const value = config_override[mkey][key];
                    if (typeof config_override[mkey][key] == 'object' && Object.keys(config_override[mkey][key]).length > 0) {
                        this.config_override[mkey][key] = {...this.config_override[mkey][key], ...config_override[mkey][key]}
                    }else{
                        this.config_override[mkey][key] = value
                    }
                }
            }
        })

        if (style_override !== undefined) {
            for (const key in style_override) {
                if (Object.hasOwnProperty.call(style_override, key)) {
                    const value = style_override[key];
                    if (Array.isArray(value) && value.length > 1) {
                        this.external_source_style[key] = value[1] == true ? this.external_source_style[key] + " " + value[0] : value                 
                    }else{
                        this.external_source_style[key] = value
                    }
                }
            }
        }

        this.setElementMediaQuery = setElementMediaQuery;

        if (document.querySelector('._custup_external_sources_container') != null) {
            document.querySelector('._custup_external_sources_container').remove()
        }


        this.initialize();
    }

    /**
     * @deprecated because this method is very buggy and I found a new way to implement it
     * @private @method updateObjectData - sets second level object key's value
     * @param {object} targetObject - the object to update
     * @param {string} key - the first-level key to update
     * @param {any} dataObj - the data to set
     * @returns object
     */
    updateObjectData (targetObject, key, dataObj) {
        const cloneObj = {...targetObject}
        for (const dkey in dataObj) {
            if (Object.hasOwnProperty.call(dataObj, dkey)) {
                const value = dataObj[dkey];
                if (typeof value !== 'object') {
                    cloneObj[key][dkey] = value
                }else{
                    cloneObj[key][dkey] = {...cloneObj[key][dkey], ...value}
                }
            }
        }
        return cloneObj
    }

   /**
     * 
     * @private set_class_name
     * 
     * @param style_key_name string the name of the style
     * @param element_to_style HTMLElement
     * @returns {void}
     * 
     */
    set_class_name (style_key_name, element_to_style) {
        const get_style_classname = this.external_source_style[style_key_name];
        element_to_style.className = get_style_classname        
    }


    /**
     * @private getRandChars
     * @param {string} identifyer
     * @returns {string}
     */
    getRandChars (identifyer) {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        let randChars = ''
        for (let i = 0; i < 12; i++) {
            const randNum = Math.floor(Math.random() * (chars.length - 1))
            randChars += chars[randNum]
        }
        return identifyer + '_' + randChars + Math.floor(Math.random() * 100000000000);
    }

   initialize () {
        if (this.source_type == 'url') {
            this.makeURLSourceUi()
        }else if (this.source_type == "google_drive") {
            this.handleAddFileFromGoogleDrive()
        }else if (this.source_type == "dropbox") {
            this.handleAddFileFromDropbox()
        }else if (this.source_type == "box") {
            this.handleAddFileFromBox()
        }else if (this.source_type == "onedrive") {
            this.handleAddFileFromOneDrive()
        }else if (this.source_type == "dalle") {
            this.handleAddFileFromOpenaiDALLE()
        }else{
            throw new Error("CustUp Not implemented yet, you're welcome to implement it :)")
        }


    }

    loadGoogleDrivePickerScripts () {
        if (document.body.querySelector('[src="https://apis.google.com/js/api.js"]') == null) {
            const jsAPI = document.createElement('script')
            jsAPI.src = "https://apis.google.com/js/api.js"
            document.body.append(jsAPI)      
            jsAPI.onload = () => this.loadGAPI()      
        }
        if (document.body.querySelector('[src="https://accounts.google.com/gsi/client"]') == null) {
            const gsiClient = document.createElement('script')
            gsiClient.src = "https://accounts.google.com/gsi/client"
            document.body.append(gsiClient)
            gsiClient.onload = () => this.googleAPIisLoaded()
        }
    }

    loadDropboxPickerScript () {
        if (document.body.querySelector('[src*="https://www.dropbox.com/"]') == null) {
            const dropboxScr = document.createElement('script')
            dropboxScr.src = "https://www.dropbox.com/static/api/2/dropins.js"
            dropboxScr.id = "dropboxjs"
            dropboxScr.setAttribute("data-app-key", this.config_override.dropbox.authConfig.appKey)
            document.body.append(dropboxScr)      
            dropboxScr.onload = () => this.addDropboxToUI()      
        }
    }

    loadBoxPickerScript () {
        if (document.body.querySelector(`[src="${this.config_override.box.authConfig.jsLink}"]`) == null) {
            const boxCSSLink = document.createElement('link')
            boxCSSLink.rel = "stylesheet"
            boxCSSLink.href = this.config_override.box.authConfig.cssLink
            document.head.appendChild(boxCSSLink)

            const boxScr = document.createElement('script')
            boxScr.src = this.config_override.box.authConfig.jsLink
            document.body.append(boxScr)      
            boxScr.onload = () => this.addBoxPickerToUI()      
        }
    }

    loadOneDrivePickerScript () {
        if (document.body.querySelector(`[src="${this.onedriveSetupConfig.msalLink}"]`) == null) {
            const onedriveScr = document.createElement('script')
            onedriveScr.src = this.onedriveSetupConfig.msalLink
            document.body.append(onedriveScr)      
            onedriveScr.onload = () => this.addOneDrivePickerToUI()      
        }
    }

    setupCustupCloseBtn () {
        this.custup_close_btn.style.display = "flex"
        this.custup_close_btn.onclick = (e) => this.destroyContainerUI()
    }

    createContainerUI () {
        this.container_ui_container = document.createElement('div')

        this.set_class_name('container', this.container_ui_container)

        this._custupInnerContainer.append(this.container_ui_container)
    }

    destroyContainerUI (silent=false) {
        if (this.source_type == 'dalle') {
            this.resetDalleData()            
        }
        this.container_ui_container.remove();
        if (this.custup_close_btn != undefined) {
            this.custup_close_btn.onclick = () => null;
            this.custup_close_btn.style.display = 'none';
        }
        !silent && this.onclose?.();
    }

    makeURLSourceUi () {
        this.createContainerUI();
        this.setupCustupCloseBtn()
        this.URL_source_container = document.createElement('div')
        this.URL_source_inner_container_1 = document.createElement('div')
        this.URL_source_inner_container_2 = document.createElement('div')
        this.URL_source_input_container = document.createElement('div')
        this.URL_source_button_container = document.createElement('div')

        this.URL_source_text_input = document.createElement('input')
        this.URL_source_text_input.type = "text"
        this.URL_source_text_input.placeholder = "Enter URL to Add file from"

        // this.URL_source_text_input.onpaste = (e) => {} // postponed

        this.URL_source_button = document.createElement('button')
        this.URL_source_button.innerHTML = "Add"
        this.URL_source_button.onclick = (e) => this.handleAddFileFromURLSource()

        this.set_class_name('url_source_container', this.URL_source_container)
        this.set_class_name('url_source_inner_container_1', this.URL_source_inner_container_1)
        this.set_class_name('url_source_inner_container_2', this.URL_source_inner_container_2)
        this.set_class_name('url_source_input_container', this.URL_source_input_container)
        this.set_class_name('url_source_button_container', this.URL_source_button_container)

        this.URL_source_container.append(this.URL_source_inner_container_1)
        this.URL_source_container.append(this.URL_source_inner_container_2)
        this.URL_source_inner_container_2.append(this.URL_source_input_container)
        this.URL_source_inner_container_2.append(this.URL_source_button_container)
        this.URL_source_input_container.append(this.URL_source_text_input)
        this.URL_source_button_container.append(this.URL_source_button)

        this.container_ui_container.append(this.URL_source_container)

    }

    async handleAddFileFromURLSource () {
        // this.callbackFn()
        const _class = this
        _class.URL_source_button.disabled = true
        _class.URL_source_button.innerHTML = "Fetching..."
        await fetch(this.URL_source_text_input.value)
        .then(res => res.blob())
        .then(data => {
            data.name = _class.getRandChars('url')
            _class.callbackFn(data);
            _class.destroyContainerUI()
        })
        .catch(err => {
            _class.custup_show_message_fn('An error occured could not get file from URL source, please try again or try another URL', 'error')
        })
        _class.URL_source_button.innerHTML = "Add"
        _class.URL_source_button.disabled = false
    }

    dropboxIsInitialized () {
        return document.querySelector('[src*="https://www.dropbox.com/static/api/"]') != null
    }

    handleAddFileFromDropbox () {
        if (this.dropboxIsInitialized() == false) {
            this.loadDropboxPickerScript()            
        }else{
            this.addDropboxToUI()
        }
    }

    addDropboxToUI () {
        this.createContainerUI();
        this.setupCustupCloseBtn();
        this.allowed_mime_types.map(type => this.config_override.dropbox.options.extensions.push("."+type))
        this.config_override.dropbox.options.success = (files) => this.dropboxOnFileChosen(files)
        var button = Dropbox.createChooseButton(this.config_override.dropbox.options);
        this.dropboxUIContainer = document.createElement('div')
        this.set_class_name('dropbox_ui_container', this.dropboxUIContainer)
        this.dropboxUIContainer.appendChild(button)
        this.container_ui_container.appendChild(this.dropboxUIContainer)
    }

    /**
     * @private @method dropboxOnFileChosen
     * @param {Array<any>} files - files array returned from dropbox
     */
    async dropboxOnFileChosen (files) {
        const _class = this
        files.map(file => {
            fetch(file.link)
            .then(res => res.blob())
            .then(blob => {
                blob.name = _class.getRandChars('dropbox')
                this.callbackFn(blob)
            })
            .catch(err => null)
        })
        _class.destroyContainerUI()
    }

    handleAddFileFromGoogleDrive () {
        this.createContainerUI();
        this.setupCustupCloseBtn();
        if (!this.isGooglePickerScriptLoaded()) {
            this.loadGoogleDrivePickerScripts()            
        }else{
            this.googleAPIisLoaded()
        }
    
    }

    isGooglePickerScriptLoaded () {
        return document.body.querySelector('[src="https://apis.google.com/js/api.js"]') != null && document.body.querySelector('[src="https://accounts.google.com/gsi/client"]') != null
    }

    /**
     * Callback after the API client is loaded. Loads the
     * discovery doc to initialize the API.
     */
    async initializeGoogleDrivePicker() {
        await gapi.client.load('https://www.googleapis.com/discovery/v1/apis/drive/v3/rest');
        this.googleDrivePickerInited = true;
    }


    loadGAPI () {
        gapi.load('client:picker', () => this.initializeGoogleDrivePicker());
    }


    googleAPIisLoaded () {
        const _class = this
        // TODO(developer): Replace with your client ID and required scopes.
        this.googleDrivePickerTokenClient = google.accounts.oauth2.initTokenClient({
          client_id: _class.config_override.google_drive.authConfig.client_id,
          scope: 'https://www.googleapis.com/auth/drive',
        });
        this.gisInited = true;
        this.createGoogleDrivePicker()
    }

    // Create and render a Google Picker object for selecting from Drive.
    createGoogleDrivePicker() {
        const _class = this
        const mimetypes = []
        this.allowed_mime_types.map(type => {
            mimetypes.push(file_types[type])
        })
        const showPicker = () => {
            const view = new google.picker.View(google.picker.ViewId.DOCS);
            view.setMimeTypes(mimetypes.toString());
            const docsView = new google.picker.DocsUploadView()
            docsView.setParent(_class.container_ui_container)
            const picker = new google.picker.PickerBuilder()
                .enableFeature(google.picker.Feature.NAV_HIDDEN)
                .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
                .setDeveloperKey(this.config_override.google_drive.authConfig.api_key)
                .setAppId(this.config_override.google_drive.authConfig.app_id)
                .setOAuthToken(this.accessToken)
                .addView(view)
                .addView(docsView)
                .setCallback((data) => this.googleDrivePickerCallback(data))
                .build();

            picker.setVisible(true);
        
        }
    
        // Request an access token.
        this.googleDrivePickerTokenClient.callback = async (response) => {
            if (response.error !== undefined) {
                this.custup_show_message_fn("Could not get token from google", "error")
                throw (response);
            }
            this.accessToken = response.access_token;
            showPicker();
        };
    
        if (this.accessToken === null) {
            // Prompt the user to select a Google Account and ask for consent to share their data
            // when establishing a new session.
            this.googleDrivePickerTokenClient.requestAccessToken({prompt: 'consent'});
        } else {
            // Skip display of account chooser and consent dialog for an existing session.
            this.googleDrivePickerTokenClient.requestAccessToken({prompt: ''});
        }
    }

    async googleDrivePickerCallback(data) {
        try {
            if (data.action === google.picker.Action.PICKED) {
                const request_notif_msg = this.custup_show_message_fn("Adding selected files from Google Drive, please wait it may take up to few minutes", "info", true)
                const doc = data[google.picker.Response.DOCUMENTS];
                this.destroyContainerUI()
                
                for await (const file of doc) {
                    try {
                        const res = await gapi.client.drive.files.get({
                            'fileId': file[google.picker.Document.ID],
                            'fields': '*',
                            alt: 'media'
                        });
                        // Convert binary string to ArrayBuffer
                        const arrayBuffer = new Uint8Array([...res.body].map((char) => char.charCodeAt(0))).buffer;
        
                        // Create a Blob from the ArrayBuffer
                        const blob = new Blob([arrayBuffer], { type: file.mimeType });
        
                        // Use the resulting Blob as needed
                        
                        blob.name = file.name
                        this.callbackFn(blob)                        
                    } catch (error) {
                        this.custup_show_message_fn("An error occured, could not load file " + file.name + " from Google Drive", "error")
                    }
                }

                request_notif_msg();
                this.custup_show_message_fn("All files has been loaded from Google Drive", "success")
                
            }
            
        } catch (error) {
            this.custup_show_message_fn("An error occured could not add selected files, please try again", "error")
        }
        
    }

    isBoxScriptLoaded () {
        return document.querySelector(`[src*="${this.config_override.box.authConfig.jsLink}"]`) != null
    }

    handleAddFileFromBox () {
        this.createContainerUI();
        this.setupCustupCloseBtn();
        if (!this.isBoxScriptLoaded()) {
            this.loadBoxPickerScript();            
        }else{
            this.addBoxPickerToUI()
        }
    }

    addBoxPickerToUI () {
        const filePicker = new Box.FilePicker();

        // Attach event listener for when the choose button is pressed
        filePicker.addListener('choose', (items) => {
            // do something with the items array
            
            items.map(async file => {
                await fetch(file.authenticated_download_url, {
                    headers: {
                        Authorization: "Bearer " + this.config_override.box.authConfig.developerToken
                    }
                })
                .then(res => res.blob())
                .then(blob => {
                    blob.name = this.getRandChars('box')
                    this.callbackFn(blob)
                })
                .catch(err => null)
            })
            this.destroyContainerUI()
        });

        // Attach event listener for when the cancel button is pressed
        filePicker.addListener('cancel', () => {
            this.destroyContainerUI()
            // do something
        });

        // Show the file picker
        this.config_override.box.pickerConfig.container = this.container_ui_container;
        this.allowed_mime_types.map(type => {
            this.config_override.box.pickerConfig.extensions.push(type)
        })
        filePicker.show(
            this.config_override.box.authConfig.folder_id, 
            this.config_override.box.authConfig.developerToken, 
            this.config_override.box.pickerConfig
        );
    }

    handleAddFileFromOneDrive () {
        this.createContainerUI();
        this.setupCustupCloseBtn();
        this.loadOneDrivePickerScript()
    }

    addOneDrivePickerToUI () {
        this.msalApp = new msal.PublicClientApplication(this.onedriveAuthConfig.msalParams);
        this.launchPicker()
    }

    async getOneDriveToken(command) {
        let accessToken = "";
        let authParams = null;
        const _class = this
    
        switch (command.type) {
            case "SharePoint":
            case "SharePoint_SelfIssued":
                authParams = { scopes: [`${_class.combineOneDriveURL(command.resource, ".default")}`] };
                break;
            default:
                break;
        }
    
        try {
    
            // see if we have already the idtoken saved
            const resp = await this.msalApp.acquireTokenSilent(authParams);
            accessToken = resp.accessToken;
    
        } catch (e) {
            // per examples we fall back to popup
            const resp = await this.msalApp.loginPopup(authParams);
            this.msalApp.setActiveAccount(resp.account);

    
            if (resp.idToken) {
                const resp2 = await this.msalApp.acquireTokenSilent(authParams);
                accessToken = resp2.accessToken;
            }
        }
    
        return accessToken;
    }

    /**
         * Combines an arbitrary set of paths ensuring and normalizes the slashes
         *
         * @param paths 0 to n path parts to combineOneDriveURL
         */
    combineOneDriveURL(...paths) {
        return paths
            .map(path => path.replace(/^[\\|/]/, "").replace(/[\\|/]$/, ""))
            .join("/")
            .replace(/\\/g, "/");
    }

    async launchPicker() {
        const _class = this

        this.onedrivePickerWin = window.open("", "Picker", "width=800,height=600")

        const authToken = await this.getOneDriveToken({
            resource: this.onedriveSetupConfig.baseUrl,
            command: "authenticate",
            type: "SharePoint",
        });

        const queryString = new URLSearchParams({
            filePicker: JSON.stringify(this.onedriveAuthConfig.params),
        });

        const url = this.combineOneDriveURL(this.onedriveSetupConfig.baseUrl, `_layouts/15/FilePicker.aspx?${queryString}`);

        const form = this.onedrivePickerWin.document.createElement("form");
        form.setAttribute("action", url);
        form.setAttribute("method", "POST");
        this.onedrivePickerWin.document.body.append(form);

        const input = this.onedrivePickerWin.document.createElement("input");
        input.setAttribute("type", "hidden")
        input.setAttribute("name", "access_token");
        input.setAttribute("value", authToken);
        form.appendChild(input);


        window.addEventListener("message", (event) => {
            if (event.source && event.source === this.onedrivePickerWin) {

                const message = event.data;

                if (message.type === "initialize" && message.channelId === this.onedriveAuthConfig.params.messaging.channelId) {

                    this.onedrivePickerPort = event.ports[0];

                    this.onedrivePickerPort.addEventListener("message", (ev) => _class.messageListener(ev));

                    this.onedrivePickerPort.start();

                    this.onedrivePickerPort.postMessage({
                        type: "activate",
                    });
                }
            }
        });

        form.submit();

    }

    async messageListener(message) {
        const _class = this
        switch (message.data.type) {

            case "notification":
                break;

            case "command":

                this.onedrivePickerPort.postMessage({
                    type: "acknowledge",
                    id: message.data.id,
                });

                const command = message.data.data;

                switch (command.command) {

                    case "authenticate":

                        // getOneDriveToken is from scripts/auth.js
                        const token = await _class.getOneDriveToken(command);

                        // if (typeof token !== "undefined" && token !== null) {
                        if (token !== null) {

                            this.onedrivePickerPort.postMessage({
                                type: "result",
                                id: message.data.id,
                                data: {
                                    result: "token",
                                    token,
                                }
                            });

                        } else {
                            console.error(`Could not get auth token for command: ${JSON.stringify(command)}`);
                        }

                        break;

                    case "close":

                        this.onedrivePickerWin.close();
                        break;

                    case "pick":
                        document.getElementById("pickedFiles").innerHTML = `<pre>${JSON.stringify(command, null, 2)}</pre>`;

                        this.onedrivePickerPort.postMessage({
                            type: "result",
                            id: message.data.id,
                            data: {
                                result: "success",
                            },
                        });

                        this.onedrivePickerWin.close();

                        break;

                    default:

                        console.warn(`Unsupported command: ${JSON.stringify(command)}`, 2);

                        this.onedrivePickerPort.postMessage({
                            result: "error",
                            error: {
                                code: "unsupportedCommand",
                                message: command.command
                            },
                            isExpected: true,
                        });
                        break;
                }

                break;
        }
    }


    handleAddFileFromOpenaiDALLE () {
        this.createContainerUI();
        this.setupCustupCloseBtn()
        this.createDalleInitialUI()

        
    }

    createDalleInitialUI () {
        this.resetDalleData()
        if (this.dalleInitialPageContainer != undefined && this.dalleOuterContainer != undefined) {
            this.dalleInitialPageContainer.remove()
            this.dalleOuterContainer.remove()
            this.dalleOuterContainer = undefined;
            this.dalleInitialPageContainer = undefined;        
        }
        this.dalleOuterContainer = document.createElement('div')
        this.dalleInitialPageContainer = document.createElement('div')

        const initialPageContentContainer = document.createElement('div')
        const dalleIntialPageTitleContainer = document.createElement('div')
        const dalleIntialPageSearchContainer = document.createElement('div')
        const dalleIntialPageButtonContainer = document.createElement('div')

        const dalleIntialPageTitleText = document.createElement('div')
        dalleIntialPageTitleText.innerText = "Generate images with OpenAI DALL.E"

        const dalleIntialPageSearchInput = document.createElement('input')
        dalleIntialPageSearchInput.placeholder = "Type a prompt for DALL.E"

        const dalleIntialPageButton = document.createElement('button')
        dalleIntialPageButton.innerHTML = "Generate";
        dalleIntialPageButton.onclick = (e) => this.generateImageWithOpenAIDALLE(e, dalleIntialPageSearchInput);

        this.set_class_name('dalleIntialPageTitleContainer', dalleIntialPageTitleContainer)
        this.set_class_name('dalleIntialPageButtonContainer', dalleIntialPageButtonContainer)
        this.set_class_name('dalleIntialPageSearchContainer', dalleIntialPageSearchContainer)
        this.set_class_name('initialPageContentContainer', initialPageContentContainer)
        this.set_class_name('dalleInitialPageContainer', this.dalleInitialPageContainer)
        this.set_class_name('dalleOuterContainer', this.dalleOuterContainer)

        dalleIntialPageTitleContainer.append(dalleIntialPageTitleText)
        dalleIntialPageSearchContainer.append(dalleIntialPageSearchInput)
        dalleIntialPageButtonContainer.append(dalleIntialPageButton)

        initialPageContentContainer.append(dalleIntialPageTitleContainer)
        initialPageContentContainer.append(dalleIntialPageSearchContainer)
        initialPageContentContainer.append(dalleIntialPageButtonContainer)

        this.dalleInitialPageContainer.append(initialPageContentContainer)

        this.dalleOuterContainer.append(this.dalleInitialPageContainer)

        this.container_ui_container.append(this.dalleOuterContainer)
    }

    removeDalleInitialUI () {
        this.dalleInitialPageContainer.remove()
    }


    resetDalleData () {
        this.dalleResponseData = []
        this.dalle_file_data = []
        this.dalle_selected_files = []
    }

    base64ToBlob (base64, type = "image/png") {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type });
    }

    async generateImageWithOpenAIDALLE (ev, inputEl) {
        const btn = ev.currentTarget
        btn.disabled = true
        btn.innerHTML = "Generating..."
        await fetch(this.config_override.dalle.endpoint, {
            method: "POST",
            body: JSON.stringify({
                prompt: inputEl.value,
                n: this.config_override.dalle.n,
                size: this.config_override.dalle.size,
                response_format: this.config_override.dalle.response_format.b64,
                model: this.config_override.dalle.model,
                quality: this.config_override.dalle.quality
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.config_override.dalle.api_key
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error != undefined) {
                return this.custup_show_message_fn(data.error.message)
            }
            this.dalleResponseData = data.data
            this.previewGeneratedDalleImages()
        })
        .catch(err => {
            this.custup_show_message_fn(err.message)
        })

        btn.disabled = false
        btn.innerHTML = "Generate"

    }


    previewGeneratedDalleImages () {
        this.removeDalleInitialUI()
        if (this.dalleResponseData.length == 0) {
            this.createDalleInitialUI()
            return this.custup_show_message_fn("Nothing was generated, please try again")
        }
        this.dallePreviewPageContainer = document.createElement('div')

        this.dalleOuterContainer.onwheel = (e) => this.handle_custom_scroll.customScroll(e, this.dallePreviewPageContainer)

        const utils_button_container = document.createElement('div')
        const accept_files_btn = document.createElement('button')
        const accept_files_btn_check_mark = document.createElement('div')
        const accept_files_btn_files_counter = document.createElement('div');
        accept_files_btn_check_mark.innerHTML = icons.check;
        accept_files_btn_files_counter.innerHTML = this.dalleResponseData.length;

        accept_files_btn.onclick = (e) => this.acceptDalleGeneratedFiles();

        accept_files_btn.append(accept_files_btn_check_mark)
        accept_files_btn.append(accept_files_btn_files_counter)

        const fetch_again_btn = document.createElement('button')
        fetch_again_btn.innerHTML = icons.retry

        fetch_again_btn.onclick = (e) => this.createDalleInitialUI();

        utils_button_container.append(accept_files_btn)
        utils_button_container.append(fetch_again_btn)

        this.set_class_name('utils_button_container', utils_button_container)
        this.set_class_name('accept_files_btn', accept_files_btn)


        this.dalleResponseData.forEach(image => {
            const image_preview_container = document.createElement('div')
            const preview_image_el = document.createElement('img')
            image_preview_container.append(preview_image_el)
            this.set_class_name("image_preview_container", image_preview_container)
            this.setElementMediaQuery(image_preview_container)


            const fileInBlobFormat = this.base64ToBlob(image.b64_json)
            fileInBlobFormat.name = this.getRandChars("dalle")
            this.dalle_file_data.push(fileInBlobFormat)
            preview_image_el.src = window.URL.createObjectURL(fileInBlobFormat)


            image_preview_container.onclick = (e) => {
                const thisContainer = e.currentTarget
                const image_already_added = this.dalle_selected_files.findIndex(image => image.name == fileInBlobFormat.name)
                if (image_already_added > -1) {
                    this.dalle_selected_files.splice(image_already_added, 1)
                    thisContainer.querySelector('._custup_check_mark')?.remove()
                    this.updateDalleSelectedFilesCounter(accept_files_btn_files_counter)
                }else{
                    const check_mark = document.createElement('div')
                    check_mark.innerHTML = icons.check
                    check_mark.className = "_custup_check_mark"
                    thisContainer.append(check_mark)
                    this.dalle_selected_files.push(fileInBlobFormat)
                    this.updateDalleSelectedFilesCounter(accept_files_btn_files_counter)
                }
            }

            this.dallePreviewPageContainer.append(image_preview_container)
        })
        
        this.set_class_name("dallePreviewPageContainer", this.dallePreviewPageContainer)
        
        this.dalleOuterContainer.append(this.dallePreviewPageContainer)
        this.dalleOuterContainer.append(utils_button_container)
        this.handle_custom_scroll.customScrollbar(this.dallePreviewPageContainer)
        this.handle_custom_scroll.handleSetPointerEV(this.dalleOuterContainer, this.dallePreviewPageContainer);

    }

    updateDalleSelectedFilesCounter (counterElm) {
        counterElm.innerHTML = this.dalle_selected_files.length == 0 ? this.dalle_file_data.length : this.dalle_selected_files.length
    }

    acceptDalleGeneratedFiles () {
        if (this.dalle_selected_files.length == 0) {
            this.dalle_file_data.map(file => this.callbackFn(file))
        }else{
            this.dalle_selected_files.map(file => this.callbackFn(file))
        }
        this.destroyContainerUI()
        
    }

}