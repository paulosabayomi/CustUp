import axios from "../libs/axios/dist/esm/axios.min.js";
import CustUpMediaSource from "../plugins/custupmediasource.js";
import ExternalSource from "../plugins/externalsources.js";
import { ui_styles, external_sources_ui_styles, media_capture_ui_styles } from "../utils/_styles.js";
import file_types from "../utils/filetypes.js";
import icons from '../utils/icons.js'


export default class CustUpCore {
    /**
     * Custup library name - !!! Please do not change !!!
     * @private @param {string} libraryName - Custup library name
     */
    libraryName = "CustUp"


    /**
     * Array that holds default loaded files
     * @protected @property {File[]} defaultFiles
     */
    defaultFiles = [];

    /**
     * Array that holds all selected files
     * @protected @property {File[]} selectedFiles
     */
    selectedFiles = [];
    
    /**
     * Array that holds that could not be sent because of an error
     * @protected @property {File[]} filesNotSent
     */
    filesNotSent = [];
    
    /**
     * An array that holds successfully uploaded files
     * @protected @property {File[]} successfullyUploadedFiles
     */
    successfullyUploadedFiles = [];
    
    /**
     * An array that holds successfully uploaded files
     * @protected @property {File[]} currentlyUploadingFiles
     */
    currentlyUploadingFiles = [];

    /**
     * UI messages items offset counter
     * @private @property {number} last_message_el_offset_bottom
     */
    last_message_el_offset_bottom = 0;

    /**
     * Custup FormData for uploading files
     * @private @property {FormData} file_upload_form_data
     */
    file_upload_form_data = undefined;

    /**
     * Custup UI styles
     * @protected @property {FormData} ui_styles
     */
    ui_styles = {...ui_styles};

    /**
     * Custup UI icons
     * @protected @property {FormData} ui_icons
     */
    ui_icons = {...icons};

    /**
     * Custup Axios instance for file upload
     * @private @property {axios} __axios_instance
     */
    __axios_instance = undefined;

    /**
     * @private @property {Object} file_chunks
     */
    file_chunks = {}

    /**
     * @private @property {Object} file_progress
     */
    file_progress = {}

    /**
     * @private @property {any} _custup_media_source_instance
     */
    _custup_media_source_instance = undefined
    

    /**
     * @private @property {any} _custup_external_source_instance
     */
    _custup_external_source_instance = undefined

    /**
     * @private @property {any} _is_secured_context
     */
    _is_secured_context = window.location.protocol === 'https:'

    /**
     * Events
     * @private @property {any} eventMethods
     */
    eventMethods = {
        library_init: undefined,
        file_beforeAdded: undefined,
        file_afterAdded: undefined,
        file_removed: undefined,
        file_defaultFileRemoved: undefined,
        file_beforePassedChecks: undefined,
        file_all_removed: undefined,
        upload_beforeStart: undefined,
        upload_progress: undefined,
        upload_success: undefined,
        upload_error: undefined,
        upload_retry: undefined,
        upload_all_finished: undefined,
        file_source_closed: undefined,
        default_ui_shown: undefined,
        default_ui_closed: undefined,
    };

    /**
     * Events
     * @private @property {any} eventMethods
     */
    deviceFileSourceEventMethods = {
        video_recordingStarted: undefined,
        video_recording: undefined,
        video_recordStop: undefined,
        video_recordSaved: undefined,
        video_recordCancel: undefined,
        
        image_captured: undefined,
        
        audio_recordingStarted: undefined,
        audio_recording: undefined,
        audio_recordStop: undefined,
        audio_recordSaved: undefined,
        audio_recordCancel: undefined,
        
        screen_recordingStarted: undefined,
        screen_recording: undefined,
        screen_recordStop: undefined,
        screen_recordSaved: undefined,
        screen_recordCancel: undefined,
    };

    // UI Options
    _custupEl = undefined; // CustUp main parent Element
    _custupHeaderEl = undefined; // custup header parent Element
    _custupFooterEl = undefined; // custup footer parent Element
    _custupSidebarLeftEl = undefined; // custup side left parent Element
    _custupSidebarRightEl = undefined; // custup sidebar right parent Element
    _custupInnerEl = undefined; // custup inner parent Element
    _custupInnerContainerWrapperEl = undefined; // custup inner parent Element
    _custupDefaultUIEl = undefined; // Custup default UI that displays when no files is selected
    _custupDefaultUIInnerContentEl = undefined; // Inner container of the default UI that displays when no files is selected
    fileDisplayUIEl = undefined; // file display UI, the container where selected files are displayed and listed
    UIToolEl = undefined; // UI tool container
    numberOfFilesDisplayTool = undefined; // the tool that displays number of selected files inside the UI tools
    clearAllFilesBtnTool = undefined; // button that clears all selected files
    addFilesUITool = undefined; // tool that opens the default UI to add more files
    uploadFilesToServerTool = undefined; // the tool that calls the method that uploads all selected file to the server
    close_popup_btn = undefined; // Custup close popup btn

    /**
     * @private @property {Array} file_preview_animation_arr
     */
    file_preview_animation_arr = []; // Custup close popup btn

    /**
     * @private @property {boolean} is_default_ui_shown
     */
    is_default_ui_shown = undefined; // Custup close popup btn

    /**
     * @private @property {Object} previewerAnimations
     */
    // file preview animations 
    previewerAnimations = {
        slideInLeft: [
            {left: '-100%'}, 
            {left: '0%'}
        ],
        slideInBottom: [
            {bottom: '-100%'},
            {bottom: '0%'}
        ],
        slideInRight: [
            {right: '-100%'},
            {right: '0%'}
        ],
        slideInTop: [
            {top: '-100%'},
            {top: '0%'}
        ],
        zoomIn: [
            {transform: 'scale(0.1)'},
            {transform: 'scale(1.1)'},
            {transform: 'scale(1)'}
        ],
        fadeIn: [
            {opacity: 0.2},
            {opacity: 1}
        ]
    }

    // tool dragger
    toolDragger = undefined; // the tool for dragging the UI tool on the UI

    /**
     * @private @property {number} currentToolElOffsetLeft
     */
    currentToolElOffsetLeft = 0;
    
    /**
     * @private @property {number} currentToolElOffsetBottom
     */
    currentToolElOffsetBottom = 0;

    /**
     * @private @property {number} lastToolOffsetBottom
     */
    lastToolOffsetBottom = 0;

    /**
     * @private @property {number} lastToolOffsetLeft
     */
    lastToolOffsetLeft = 0;

    // Custom Scrolling
    /**
     * @private @property {number} fileDisplayUIElCurrentScrollHeight
     */
    fileDisplayUIElCurrentScrollHeight = 0; // scolling position tracker

    /**
     * @public @property {number} scrollBarEl
     */
    scrollBarEl = undefined; // custom scroll bar


    /** Custup Options
     * @protected @param {{}} options
    */
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
        show_ui_tools_on_mobile_devices: true,

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
        display_file_sources: true,

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
            },
            chunk_size: 1024 * 1024,
            should_chunk: false
        },
        upload_automatically: false, // whether to upload file to the server automatically
        show_upload_error_overlay: true,
        show_upload_progress_bar: true,

        // Default files File | Blob | link | base64
        default_files: [],
        count_default_files: true,

        instance_attach: [],
        single_upload: false,

        // File storage locally
        persist_files: false,
        persist_type: 'soft',

        // notification
        alert_timeout_time: 300,

        messages: {
            timeout: 4000
        }
    }


    
    /**
     * Pass parameters   
     * 
     * @param {{ 
     *      _custupDefaultUploadSentence?: string;
     *      disable_scrollbar?: boolean;
     *      persist_default_ui?: boolean;
     *      use_default_file_display_ui?: boolean;
     *      show_preview_file_btn?: boolean;
     *      autoInitialize?: boolean;
     *      show_file_remove_btn?: boolean;
     *      show_file_details_container?: boolean;
     *      file_source_icons?: {[key in 'video_camera' | 'capture_image' | 'record_audio' | 'record_screen' | 'url_source' | 'google_drive_source' | 'dropbox_source' | 'box_source' | 'openai_dalle_source']: any};
     *      css_font_link?: string;
     *      css_font_name?: string;
     *      external_source_style_override?: typeof external_sources_ui_styles;
     *      media_capture_source_style_override?: typeof media_capture_ui_styles;
     *      default_styles_override?: typeof ui_styles;
     *      persist_styles_override_across_instances?: boolean;
     *      default_icons_override?: typeof icons;
     *      allowed_file_types?: (keyof file_types)[];
     *      targetRootElement: string; 
     *      maxNumberOfFiles?: number; 
     *      minNumberOfFiles?: number; 
     *      minimumAllowedFileSize?: number; 
     *      maximumAllowedFileSize?: number; 
     *      ui_type?: 'default' | 'resumeUploaderUI' | 'bare' | 'detached' | 'profilePicture' | 'elegant'; 
     *      display_ui_tools?: boolean;
     *      show_ui_tools_on_mobile_devices?: boolean;
     *      disable_drag_n_drop?: boolean;
     *      disable_select_files_from_device?: boolean;
     *      allowed_tools?: Array<'tools_dragger' | 'upload' | 'add_file' | 'added_files_count' | 'clear_files'>;
     *      position_container?: "before" | "after" | "overwrite" | {"beforeEl": string};
     *      file_preview_animation_types?: Array<'slideInRight' | 'slideInTop' | 'slideInLeft' | 'slideInBottom' | 'zoomIn' | 'fadeIn'>;
     *      allowMultipleUpload?: boolean;
     *      file_upload?: {
     *          endpoint_url: string;
     *          files_field_name: string;
     *          form_field?: HTMLFormElement | string;
     *          additional_data?: object;
     *          axios_settings: {
     *               headers: {};
     *               configs: {};
     *          };
     *          chunk_size: number;
     *          should_chunk: boolean;
     *      };
     *      allowed_sources?: Array<'record_video' | 'capture_image' | 'record_audio' | 'record_screen' | 'link_source' | 'google_drive_source' | 'dropbox_source' | 'box_source' | 'openai_dalle_source'>;
     *      display_file_sources?: boolean;
     *      upload_automatically?: boolean;
     *      show_upload_error_overlay?: boolean;
     *      show_upload_progress_bar?: boolean;
     *      file_source_config?: {
     *        video_recording: {
     *             video_only: boolean;
     *             show_image_capture_btn: boolean;
     *         };
     *         capture_image: {
     *         };
     *         record_audio: {
     *         };
     *         record_screen: {
     *         };
     *         url_source: {
     *         };
     *         google_drive_source: {
     *             authConfig: {
     *                client_id: string;
     *                api_key: string;
     *                app_id: string;
     *                scopes: string;
     *             };
     *         };
     *         dropbox_source: {
     *             authConfig: {
     *                appKey: string;
     *             };
     *             options: {
     *                cancel: Function;
     *             };
     *         };
     *         box_source: {
     *             authConfig: {
     *                 developerToken: string;
     *                 cssLink: string;
     *                 jsLink: string;
     *                 folder_id: string;
     *             };
     *             pickerConfig: {
     *                 chooseButtonLabel?: string;
     *                 sortBy?: 'name' | 'date';
     *                 sortDirection?: 'ASC' | 'DESC';
     *                 logoUrl?: string;
     *                 canUpload?: boolean;
     *                 canSetShareAccess?: boolean;
     *                 canCreateNewFolder?: boolean;
     *                 sharedLink?: string;
     *                 sharedLinkPassword?: string;
     *                 modal?: string;
     *                 size?: 'large' | 'small';
     *                 isTouch?: boolean;
     *                 autoFocus?: boolean;
     *                 defaultView?: 'files' | 'recents';
     *                 cancelButtonLabel?: string;
     *                 requestInterceptor?: Function;
     *                 responseInterceptor?: Function;
     *             }
     *         };
     *         openai_dalle_source: {
     *              endpoint: string;
     *              api_key: string;
     *              size: "1024x1024" | "1024x1792" | "1792x1024";
     *              n: number;
     *              model: "dall-e-3" | "dall-e-2";
     *              quality: "standard" | "hd";
     *         };
     * };
     *      default_files?: Array<{file: string | File | Blob; isUploadable: boolean; headers: any}>;
     *      count_default_files?: boolean;
     *      instance_attach?: Array<object>;
     *      single_upload?: boolean;
     *      persist_files?: boolean;
     *      persist_type?: 'soft' | 'hard';
     *      alert_timeout_time?: number;
     *      messages?: {
     *          timeout?: number;
     *      };
     * }}  
     * 
     * @param autoInitialize - Whether to automatically initialize the library
     * 
     * @param disable_scrollbar - Whether to show or not show scrollbar
     * 
     * @param persist_default_ui - Whether to show or not remove the default UI should be closable
     * 
     * @param use_default_file_display_ui - Whether to use default file display UI
     * 
     * @param allowed_file_types - Allowed file types, any file can be uploaded if the `allowed_file_types` parameter is not provided
     * 
     * @param show_preview_file_btn - Whether to show preview file btn or not
     * 
     * @param file_preview_animation_types - selected animation types
     * 
     * @param show_file_remove_btn - Whether to show remove file btn or not
     * 
     * @param show_file_details_container - Whether to show file details UI container
     * 
     * @param external_source_style_override - Override external source styles
     * 
     * @param media_capture_source_style_override - Override media capture source styles
     *
     * @param  targetRootElement - Root target container element to spawn the file uploader
     *
     * @param  default_styles_override - style override of default styles - class names to be provided in place of the current class names - {keyof ui_styles: value like string | [string, append_style: boolean]}
     * 
     * @param persist_styles_override_across_instances - whether to make style overrides to persists over multiple CustUp instances, Note: only instances declared after the instance that this option is set will persist the styles, so it is best to do this in the first CustUp initialization: default is false
     *
     * @param  default_icons_override - default icons override
     * 
     * @param  maxNumberOfFiles
     * maximum allowed files that can be added, any number of files can be uploaded if not provided
     * 
     * @param minNumberOfFiles
     * minimum allowed files that must be added, no limit if the `minNumberOfFiles` parameter was not provided
     * 
     * @param minimumAllowedFileSize
     * minimum allowed file size that can be added to be uploaded, no minimum restriction will be placed
     * if `minimumAllowedFileSize` is not provided
     * 
     * @param maximumAllowedFileSize
     * maximum allowed file size that can be added to be uploaded, no maximum restriction will be placed
     * if `maximumAllowedFileSize` is not provided
     * 
     * @param ui_type
     * specify UI type, default is 'default'
     * 
     * @param position_container
     * specify if the upload container should be inserted before other contents in the container 
     * or after all contents in the container, or it should be the only content in the container, 
     * or it should be inserted before an element in the container, if this is not provided 
     * the upload container will overwrite every other elements in the `targetRootElement`
     * 
     * @param allowMultipleUpload
     * Set whether to allow multiple upload or not, it is true by default
     * 
     * @param file_upload - options to handle file upload
     * @param upload_automatically - whether to upload file to the server automatically
     * @param show_upload_error_overlay - whether to show upload error overlay: defaults to true
     * @param file_source_icons - customize any file source icon of your choice
     * @param display_ui_tools - whether to display UI tool or not
     * @param allowed_tools - tools to display, an empty array displays all tools
     * 
     * @param default_files - array of files to be added by default after initialization
     * 
     * @param count_default_files - whether default added files should be counted as part of the added files - defaults to true
     * 
     * @param instance_attach - instances of other custup instances - majorly for attaching files
     * @param single_upload - whether to upload all files at the same time including other data
     * @param persist_files - whether to persist files and restore files when user refreshes the page or after the library finished initialization if the persist type is hard
     * @param persist_type - set the persist type to either soft or hard, if hard it will use localstorage else it will use session storage
     * @param alert_timeout_time - the timeout for Custup alerts default is 300ms
     * 
    */
    constructor ({
        autoInitialize,
        disable_scrollbar,
        persist_default_ui,
        use_default_file_display_ui,
        _custupDefaultUploadSentence,
        show_preview_file_btn,
        show_file_remove_btn,
        show_file_details_container,
        file_preview_animation_types,
        default_styles_override,
        persist_styles_override_across_instances,
        css_font_link,
        css_font_name,
        external_source_style_override,
        media_capture_source_style_override,
        allowed_file_types,
        targetRootElement,
        maxNumberOfFiles,
        minNumberOfFiles,
        minimumAllowedFileSize,
        maximumAllowedFileSize,
        ui_type,
        position_container,
        allowMultipleUpload,
        file_upload,
        upload_automatically,
        show_upload_error_overlay,
        show_upload_progress_bar,
        file_source_icons,
        allowed_sources,
        display_file_sources,
        display_ui_tools,
        show_ui_tools_on_mobile_devices,
        disable_drag_n_drop,
        disable_select_files_from_device,
        allowed_tools,

        default_icons_override,

        // File sources config
        file_source_config,

        default_files,
        count_default_files,
        instance_attach,
        single_upload,

        persist_files,
        persist_type,
        alert_timeout_time,
        messages
    }) { 

        if (targetRootElement == undefined) {
            throw new Error(`${this.libraryName}: Target Root Element is required`);            
        }

        allowed_file_types !== undefined && (this.options.allowed_file_types = allowed_file_types);
        this.options.targetRootElement = targetRootElement;
        
        maxNumberOfFiles !== undefined && (this.options.maxNumberOfFiles = maxNumberOfFiles);
        minNumberOfFiles !== undefined && (this.options.minNumberOfFiles = minNumberOfFiles);
        minimumAllowedFileSize !== undefined && (this.options.minimumAllowedFileSize = minimumAllowedFileSize);
        maximumAllowedFileSize !== undefined && (this.options.maximumAllowedFileSize = maximumAllowedFileSize);
        ui_type != undefined && (this.options.ui_type = ui_type);
        position_container !== undefined && (this.options.position_container = position_container);

        allowMultipleUpload !== undefined && (this.options.allowMultipleUpload = allowMultipleUpload);

        autoInitialize !== undefined && (this.options.autoInitialize = autoInitialize);

        css_font_link && (this.options.css_font_link = css_font_link);
        css_font_name && (this.options.css_font_name = css_font_name);
        
        upload_automatically !== undefined && (this.options.upload_automatically = upload_automatically);
        show_upload_error_overlay !== undefined && (this.options.show_upload_error_overlay = show_upload_error_overlay);
        show_upload_progress_bar !== undefined && (this.options.show_upload_progress_bar = show_upload_progress_bar);

        _custupDefaultUploadSentence !== undefined && (this.options._custupDefaultUploadSentence = _custupDefaultUploadSentence);

        if (file_source_icons != undefined) {
            for (const key in file_source_icons) {
                if (Object.hasOwnProperty.call(file_source_icons, key)) {
                    const value = file_source_icons[key];
                    this.options.file_source_icons[key] = value
                }
            }
        }

        if (file_source_config !== undefined) {
            Object.keys(file_source_config).forEach(mkey => {
                for (const key in file_source_config[mkey]) {
                    if (Object.hasOwnProperty.call(file_source_config[mkey], key)) {
                        const value = file_source_config[mkey][key];
                        if (typeof file_source_config[mkey][key] == 'object' && Object.keys(file_source_config[mkey][key]).length > 0) {
                            this.options.file_source_config[mkey][key] = {...this.options.file_source_config[mkey][key], ...file_source_config[mkey][key]}
                        }else{
                            this.options.file_source_config[mkey][key] = value
                        }
                    }
                }
            })
        }


        instance_attach !== undefined && (this.options.instance_attach = instance_attach);
        single_upload !== undefined && (this.options.single_upload = single_upload);

        persist_files !== undefined && (this.options.persist_files = persist_files);
        persist_type !== undefined && (this.options.persist_type = persist_type);

        alert_timeout_time !== undefined && (this.options.alert_timeout_time = alert_timeout_time);
        
        disable_scrollbar !== undefined && (this.options.disable_scrollbar = disable_scrollbar);
        persist_default_ui !== undefined && (this.options.persist_default_ui = persist_default_ui);
        use_default_file_display_ui !== undefined && (this.options.use_default_file_display_ui = use_default_file_display_ui);

        allowed_sources !== undefined && (this.options.allowed_sources = allowed_sources);
        display_file_sources !== undefined && (this.options.display_file_sources = display_file_sources);
        allowed_tools !== undefined && (this.options.allowed_tools = allowed_tools);
        file_preview_animation_types !== undefined && (this.options.file_preview_animation_types = file_preview_animation_types);
        
        persist_styles_override_across_instances !== undefined && (this.options.persist_styles_override_across_instances = persist_styles_override_across_instances);
        default_styles_override !== undefined && (this.options.default_styles_override = default_styles_override);
        external_source_style_override !== undefined && (this.options.external_source_style_override = external_source_style_override);
        media_capture_source_style_override !== undefined && (this.options.media_capture_source_style_override = media_capture_source_style_override);
        
        default_icons_override !== undefined && (this.options.default_icons_override = default_icons_override);
        count_default_files !== undefined && (this.options.count_default_files = count_default_files);

        this.set_file_preview_animations() // load animations

        show_preview_file_btn != undefined && (this.options.show_preview_file_btn = show_preview_file_btn);
        show_file_remove_btn != undefined && (this.options.show_file_remove_btn = show_file_remove_btn);
        show_file_details_container !== undefined && (this.options.show_file_details_container = show_file_details_container);

        default_files != undefined && (this.options.default_files = default_files);

        display_ui_tools != undefined && (this.options.display_ui_tools = display_ui_tools);
        show_ui_tools_on_mobile_devices !== undefined && (this.options.show_ui_tools_on_mobile_devices = show_ui_tools_on_mobile_devices);
        disable_drag_n_drop != undefined && (this.options.disable_drag_n_drop = disable_drag_n_drop);
        disable_select_files_from_device != undefined && (this.options.disable_select_files_from_device = disable_select_files_from_device);

        this.options.file_upload_settings.files_field_name = file_upload?.files_field_name;
        this.options.file_upload_settings.endpoint_url = file_upload?.endpoint_url;
        this.options.file_upload_settings.additional_data = file_upload?.additional_data;
        file_upload?.chunk_size !== undefined && (this.options.file_upload_settings.chunk_size = file_upload?.chunk_size);
        file_upload?.should_chunk !== undefined && (this.options.file_upload_settings.should_chunk = file_upload?.should_chunk);

        this.options.file_upload_settings.form_field = (typeof file_upload?.form_field == "string" && file_upload?.form_field != '') ? document.querySelector(file_upload?.form_field) : file_upload?.form_field;
        this.options.file_upload_settings.form_field = this.options.file_upload_settings.form_field == '' ? undefined : this.options.file_upload_settings.form_field;

        this.options.file_upload_settings.files_field_name = file_upload?.files_field_name == undefined ? 'file' : file_upload?.files_field_name;
        if (file_upload?.axios_settings !== undefined) {
            for (const key in file_upload?.axios_settings) {
                if (Object.hasOwnProperty.call(file_upload?.axios_settings, key)) {
                    const value = file_upload?.axios_settings[key];
                    this.options.file_upload_settings.axios_settings[key] = {...this.options.file_upload_settings.axios_settings[key], ...value}
                }
            }
        }
        
        if (messages !== undefined && Object.keys(messages).length > 0) {
            for (const key in messages) {
                if (Object.hasOwnProperty.call(messages, key)) {
                    const value = messages[key];
                    this.options.messages[key] = value
                }
            }
        }

        // this.map_override_styles_to_default_styles() - removed in the favour of the main child class
        this.map_override_icons_to_default_icons()
        this.loadFont()
        // this.options.autoInitialize && this.initializeUI() - removed in the favour of the main child class
        this.configure_axios()
        console.info(this.libraryName + " ready!")

    }

    /**
     * @private getRandChars
     * @param {string} identifyer
     * @returns {string}
     */
    getRandChars (identifyer, len=12) {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        let randChars = ''
        for (let i = 0; i < len; i++) {
            const randNum = Math.floor(Math.random() * (chars.length - 1))
            randChars += chars[randNum]
        }
        return identifyer + '_' + randChars + Math.floor(Math.random() * 100000000000);
    }

    /**
     * @protected loadFont
     */

    loadFont () {
        const load1 = document.createElement("link")
        load1.rel = "preconnect"
        load1.href = "https://fonts.googleapis.com"
        const load2 = document.createElement("link")
        load2.rel = "preconnect"
        load2.href = "https://fonts.gstatic.com"
        load2.crossOrigin = "true"
        const font_link = document.createElement("link")
        font_link.rel = "stylesheet"
        font_link.href = this.options.css_font_link
        document.head.append(load1)
        document.head.append(load2)
        document.head.append(font_link)
    }

    /**
     * @protected @method map_override_styles_to_default_styles - maps the provided styles to the default styles
     * @param {Object} o_style - The style to map to the default styles
     */
    map_override_styles_to_default_styles (o_style) {
        if (this.options.persist_styles_override_across_instances == true) {
            this.ui_styles = ui_styles // override cloning to the object itself
        }
        const obj = o_style || this.options.default_styles_override
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const value = obj[key];
                if (Array.isArray(value) && value.length > 1) {
                    this.ui_styles[key] = value[1] == true ? this.ui_styles[key] + " " + value[0] : value                 
                }else{
                    this.ui_styles[key] = value
                }
            }
        }

    }

    /**
     * @protected @method map_override_icons_to_default_icons - Maps the provided icons to the current icons
     */
    map_override_icons_to_default_icons () {
        for (const key in this.options.default_icons_override) {
            if (Object.hasOwnProperty.call(this.options.default_icons_override, key)) {
                const value = this.options.default_icons_override[key];
                this.ui_icons[key] = value;
            }
        }
    }

    /**
     * @protected @method load_default_files - Loads default files
     */
    load_default_files () {
        const URLFilesArr = []
        this.options.default_files.map(file_obj => {
            if (typeof file_obj.file == 'string') {
                URLFilesArr.push(file_obj)
            }else{
                file_obj.file.name == undefined && (file_obj.file.name = this.getRandChars('default'));
                file_obj.file.isDefaultFile = !file_obj.isUploadable
                this.handle_selected_files([file_obj.file], null, file_obj.isUploadable);
            }
        })
        URLFilesArr.map(async file_obj => {
            await fetch(file_obj.file, {headers: file_obj.headers})
            .then(res => res.blob())
            .then(file => {
                file.name = this.getRandChars('default')
                file.isDefaultFile = !file_obj.isUploadable
                this.handle_selected_files([file], null, file_obj.isUploadable)
            }).catch(err => this.show_message('An error occured could not load a default file', 'error'));                
        })

    }

    /**
     * @protected @method update_file_storage - updates the added files to the browser Storage
     */
    async update_file_storage () {
        const _regexp = /[^\w\d]/g
        const session_name = this.options.targetRootElement.replace(_regexp, '');
        const storage_type = this.options.persist_type == 'soft' ? window.sessionStorage : window.localStorage;
        const sess_files = [];
        let counter = 0;
        const selected_files_clone = [...this.selectedFiles];
        if (this._is_secured_context) {
            const objURLs = selected_files_clone.map(file => ({file: URL.createObjectURL(file), name: file.name, id: file.id}))
            storage_type.setItem(session_name, JSON.stringify(objURLs));            
        }else{
            selected_files_clone.map(file => {
                const reader = new FileReader();
    
                reader.onload = (event) => {
                    const b64 = event.target.result;
                    sess_files.push({file: b64, name: file.name, id: file.id})
                    counter += 1
                    if (counter == selected_files_clone.length) {
                        storage_type.setItem(session_name, JSON.stringify(sess_files))
                    }
                };

                reader.readAsDataURL(file);
            })
        }

    }

    /**
     * @protected @method read_files_from_storage - reads and loads files from browser Storage
     */
    read_files_from_storage () {
        const _regexp = /[^\w\d]/g;
        const session_name = this.options.targetRootElement.replace(_regexp, '');
        const storage_type = this.options.persist_type == 'soft' ? sessionStorage : localStorage
        const sess_files_out = JSON.parse(storage_type.getItem(session_name) || '[]');
        sess_files_out.map(file => {
            fetch(file.file)
            .then(res => res.blob())
            .then(blob => {
                blob.name = file.name
                this.handle_selected_files([blob], null, true)
            })
            .catch(err => {
                this.show_message("could not load " + file.name, 'error')
            })
        })
    }

    /**
     * @protected @method remove_file_from_storage - removes file from the browser Storage
     * @param {string} file_id - the id of the file to remove
     */
    remove_file_from_storage (file_id) {
        const _regexp = /[^\w\d]/g;
        const session_name = this.options.targetRootElement.replace(_regexp, '');
        const storage_type = this.options.persist_type == 'soft' ? sessionStorage : localStorage
        const sess_files_out = JSON.parse(storage_type.getItem(session_name) || '[]');
        const filter_files = sess_files_out.filter(file => file.id != file_id);
        this.options.persist_files && this.update_file_storage(filter_files);
    }

    /**
     * @protected @method clear_files_from_storage - clears all files from the browser Storage
     */
    clear_files_from_storage () {
        const _regexp = /[^\w\d]/g;
        const session_name = this.options.targetRootElement.replace(_regexp, '');
        const storage_type = this.options.persist_type == 'soft' ? sessionStorage : localStorage
        storage_type.removeItem(session_name)
    }

    /**
     * @public initializeUI
     */
    initializeUI () {
        const targetEl = document.querySelector(this.options.targetRootElement);
        if (targetEl == null) {
            throw new Error(`${this.libraryName}: Target Root Element not found`);   
        }

        if (targetEl.dataset.custupInit != undefined) {
            console.warn(`${this.libraryName} has already been initialized in the ${this.options.targetRootElement} container`);
            return this;
        }

        targetEl.setAttribute('data-custup-init', '_custup')

        this._custupEl = document.createElement('div');
        this._custupInnerEl = document.createElement('div');
        this._custupInnerContainerWrapperEl = document.createElement('div');
        this._custupHeaderEl = document.createElement('div');
        const _custupHeaderInnerEl = document.createElement('div');
        _custupHeaderInnerEl.className = 'inner'
        this._custupHeaderEl.append(_custupHeaderInnerEl)
        this._custupFooterEl = document.createElement('div');
        const _custupFooterInnerEl = document.createElement('div');
        _custupFooterInnerEl.className = 'inner'
        this._custupFooterEl.append(_custupFooterInnerEl)
        this._custupSidebarLeftEl = document.createElement('div');
        this._custupSidebarRightEl = document.createElement('div');

        this._custupEl.style.fontFamily = this.options.css_font_name

        if (!this.options.disable_drag_n_drop) {
            this._custupInnerEl.ondragover = (e) => this.handle_drag_over(e)
            this._custupInnerEl.ondragleave = (e) => this.handle_drag_leave(e)
            this._custupInnerEl.ondrop = (e) => this.handle_file_drop(e)
        }

        this._custupInnerEl.append(this._custupHeaderEl)
        this._custupInnerEl.append(this._custupInnerContainerWrapperEl)
        this._custupInnerEl.append(this._custupFooterEl)
        this._custupEl.append(this._custupSidebarLeftEl)
        this._custupEl.append(this._custupInnerEl)
        this._custupEl.append(this._custupSidebarRightEl)

        this.close_popup_btn = document.createElement('div')
        this.close_popup_btn.innerHTML = this.ui_icons.cancel

        this.set_class_name('outerContainer', this._custupEl)
        this.set_class_name('innerContainer', this._custupInnerEl)
        this.set_class_name('sidebarLeftContainer', this._custupSidebarLeftEl)
        this.set_class_name('sidebarRightContainer', this._custupSidebarRightEl)
        this.set_class_name('custupInnerContainerWrapperEl', this._custupInnerContainerWrapperEl)
        this.set_class_name('headerContainer', this._custupHeaderEl)
        this.set_class_name('footerContainer', this._custupFooterEl)
        this.set_class_name('close_popup_btn', this.close_popup_btn)

        this._custupInnerEl.append(this.close_popup_btn);
        if (this.options.position_container == undefined || this.options.position_container == "overwrite") {
            targetEl.innerHTML = ""
            targetEl.append(this._custupEl)
        }else if (this.options.position_container == "after") {
            targetEl.append(this._custupEl)   
        }else if (this.options.position_container == "before") {
            targetEl.prepend(this._custupEl)   
        }else if (typeof this.options.position_container == "object") {
            targetEl.insertBefore(this._custupEl, document.querySelector(this.options.position_container.beforeEl))   
        }

        this.showDefaultUI();
        this.eventMethods.library_init && this.eventMethods.library_init();
        console.info(this.libraryName + " initialized!");
        this.load_default_files()
        this.read_files_from_storage()
    }

    /**
     * @protected showDefaultUI
     * @param {boolean} after_container_init - a boolean to specify if the calcel icon should be added to the 
       content container
     */

    showDefaultUI (after_container_init = false) {
        if (this._custupDefaultUIEl != undefined) return;
        this._custupDefaultUIEl = document.createElement('div')
        this._custupDefaultUIInnerContentEl = document.createElement('div')
        const defaultUIUploadSentenceContainer = document.createElement('div')
        const uploadSentenceEl = document.createElement('div')
        const iconsContainer = document.createElement('div')

        if (after_container_init == true) {
            const cancelIcon = document.createElement('div')
            cancelIcon.innerHTML = this.ui_icons.cancel
            cancelIcon.onclick = (e) => {e.stopPropagation(); this.removeDefaultUI()}
            iconsContainer.append(cancelIcon)            
        }

        
        this.options.display_file_sources && this.get_file_sources(iconsContainer);


        // Onedrive external source --- suspended
        // const oneDriveSourceIcon = document.createElement('div')
        // oneDriveSourceIcon.innerHTML = this.ui_icons.onedrive
        // oneDriveSourceIcon.title = `Onedrive`
        // oneDriveSourceIcon.onclick = (e) => this.handleExternalSource('onedrive')
        // iconsContainer.append(oneDriveSourceIcon)                   

        uploadSentenceEl.innerHTML = this.options._custupDefaultUploadSentence;
        defaultUIUploadSentenceContainer.append(uploadSentenceEl);
        this._custupDefaultUIInnerContentEl.append(defaultUIUploadSentenceContainer);
        this._custupDefaultUIInnerContentEl.append(iconsContainer);
        this._custupDefaultUIEl.append(this._custupDefaultUIInnerContentEl);
        this.set_class_name('defaultUI', this._custupDefaultUIEl);
        this.set_class_name('defaultUIInnerContentEl', this._custupDefaultUIInnerContentEl);
        this.set_class_name('defaultUIUploadSentenceContainer', defaultUIUploadSentenceContainer);
        this.set_class_name('defaultUIUploadIconsContainer', iconsContainer);
        this._custupInnerEl.append(this._custupDefaultUIEl);
        !this.options.disable_select_files_from_device && (this._custupDefaultUIEl.onclick = (e) => this._select_file_from_device(e));
        this.eventMethods.default_ui_shown && this.eventMethods.default_ui_shown();
        this.is_default_ui_shown = true;
    }


    /**
     * @protected removeDefaultUI
     */
    removeDefaultUI () {
        if (this._custupDefaultUIEl != undefined && !this.options.persist_default_ui) {
            this._custupDefaultUIEl.remove();
            this._custupDefaultUIEl = undefined;    
            this.eventMethods.default_ui_closed && this.eventMethods.default_ui_closed();
            this.is_default_ui_shown = false;
        }
    }

    /**
     * @protected @method set_file_preview_animations
     */
    set_file_preview_animations () {
        if (this.options.file_preview_animation_types !== null && this.options.file_preview_animation_types.length == 0) {
            Object.keys(this.previewerAnimations).forEach(key => this.file_preview_animation_arr.push(this.previewerAnimations[key]));
        }else{
            if (this.options.file_preview_animation_types !== null) {
                this.options.file_preview_animation_types.forEach(type => this.file_preview_animation_arr.push(this.previewerAnimations[type]));
            }
        }
    }

    /**
     * @protected @method handleRecordVideo
     * @param {'video' | 'image' | 'audio' | 'screen'} type 
     */
    handleMediaSource (type) {
        const _class = this
        const config = {
            video: this.options.file_source_config.video_recording,
            image: this.options.file_source_config.capture_image,
            audio: this.options.file_source_config.record_audio,
            screen: this.options.file_source_config.record_screen,
        }
        const media_callback = (file) => {
            _class.handle_selected_files([file])
        }

        const handleClose = () => {
            _class.eventMethods.file_source_closed && this.eventMethods.file_source_closed();
        }

        this._custup_external_source_instance?.destroyContainerUI(true);
        this._custup_media_source_instance?.closeMediaPopup(true); // destroy CustUpMediaSource instance if already exists

        this._custup_media_source_instance = new CustUpMediaSource({
            inner_container: this._custupInnerEl,
            media_type: type,
            callbackFn: media_callback,
            onclose: handleClose,
            config: config[type],
            eventMethods: this.deviceFileSourceEventMethods,
            ui_styles: this.options.media_capture_source_style_override
        });
    }

    /**
     * @protected @method handleOpenaiDALLESource
     * @param {'url' | 'onedrive' | 'google_drive' | 'clipboard' | 'box' | 'dalle' | 'dropbox'} type - source type
     */
    handleExternalSource (type) {
        const _class = this
        const config = {
            url: this.options.file_source_config.url_source,
            google_drive: this.options.file_source_config.google_drive_source,
            box: this.options.file_source_config.box_source,
            dalle: this.options.file_source_config.openai_dalle_source,
            dropbox: this.options.file_source_config.dropbox_source,
        }
        const media_callback = (file) => {
            _class.handle_selected_files([file])
        }
        const show_message_ui = (msg, type, async) => {
            return _class.show_message(msg, type, async)
        }
        const customScroll = (e, targetEl) => {
            const targetElScrollBarEl = targetEl.parentElement.querySelector(`div[class*='scroll_bar']`)
            _class.handleCustomScroll(e, targetEl, targetElScrollBarEl)
        }
        const customScrollbar = (targetEl) => {
            !_class.options.disable_scrollbar && _class.createScrollBar(targetEl)
        }
        const handleOnClose = () => {
            _class._custupInnerEl.onwheel = (e) => _class.handleCustomScroll(e)
            _class.set_scroll_pointer_event(this._custupInnerEl);
            _class.eventMethods.file_source_closed && this.eventMethods.file_source_closed();
        }
        const handleSetPointerEV = (el, targetEl) => {
            const targetElScrollBarEl = targetEl.parentElement.querySelector(`div[class*='scroll_bar']`)
            _class.set_scroll_pointer_event(el, targetEl, targetElScrollBarEl)
        }
        const setElementMediaQuery = (el) => {
            _class.file_display_width_setter(el)
        }

        const sType = {}
        sType[type] = config[type]

        this._custup_media_source_instance?.closeMediaPopup(true)
        
        this._custup_external_source_instance = new ExternalSource({
            inner_container: this._custupInnerEl,
            source_type: type,
            callbackFn: media_callback,
            custup_close_btn: this.close_popup_btn,
            custup_show_message_fn: show_message_ui,
            handle_custom_scroll: {customScroll,customScrollbar,handleSetPointerEV},
            allowed_mime_types: this.options.allowed_file_types,
            onclose: handleOnClose,
            config_override: sType,
            style_override: this.options.external_source_style_override,
            setElementMediaQuery
        })
    }


    /**
     * @protected @method makeFileDisplayUI
     */
    makeFileDisplayUI () {
        if (this.fileDisplayUIEl !== undefined || !this.options.use_default_file_display_ui) return
        // if (this.fileDisplayUIEl !== undefined) return
        this.fileDisplayUIEl = document.createElement('div')
        this.set_class_name("fileDisplayUI", this.fileDisplayUIEl);
        this.make_ui_tools();
        !this.options.disable_scrollbar && this.createScrollBar();
        this._custupInnerContainerWrapperEl.append(this.fileDisplayUIEl);
        this._custupInnerEl.onwheel = (e) => this.handleCustomScroll(e);
        // removed because tool dragging is no more available on touch devices, the tool on
        // this._custupInnerEl.onpointerdown = (e) => this.handleInnerElementContainerPointerDown(e);
        this.set_scroll_pointer_event(this._custupInnerEl);
    }

    /**
     * @protected @method set_scroll_pointer_event
     * @param {HTMLElement} el
     */
    set_scroll_pointer_event (el, targetEl=undefined, targetScrollBarEl=undefined) {
        if (el == undefined) return;
        el.ontouchstart = (e) => {
            e.stopPropagation();
            this.layerMoved = e.layerY
            el.ontouchmove = (e) => {
                e.preventDefault();
                window.requestAnimationFrame(() => this.handleCustomScroll(e, targetEl, targetScrollBarEl));
            };
        }
        el.ontouchend = (e) => {
            el.ontouchmove = () => null;
            this.handleInnerElementContainerMouseUp(e);
        }
    }

    /**
     * @protected @method make_ui_tools
     */
    make_ui_tools () {
        this.UIToolEl = document.createElement('div')
        this.set_class_name("UITool", this.UIToolEl)
        // tools making
        this.numberOfFilesDisplayTool = document.createElement('div')
        this.clearAllFilesBtnTool = document.createElement('div')
        this.addFilesUITool = document.createElement('div')
        this.uploadFilesToServerTool = document.createElement('div')
        this.toolDragger = document.createElement('div')
        this.toolDragger.className = "_custup_dragger_tool"
        this.setNumberOfFiles()
        this.uploadFilesToServerTool.title = "Upload Files"
        this.uploadFilesToServerTool.innerHTML = this.ui_icons.send
        this.uploadFilesToServerTool.onclick = (e) => this.fileUploadHandler()
        this.clearAllFilesBtnTool.title = "Clear all files"
        this.clearAllFilesBtnTool.innerHTML = this.ui_icons.clear
        this.clearAllFilesBtnTool.onclick = (e) => this.handleClearAllFiles()
        this.addFilesUITool.title = "Add more files"
        this.addFilesUITool.onclick = (e) => this.handleAddNewFileButton()
        this.addFilesUITool.innerHTML = this.ui_icons.add_file_2

        const tools_arr = {
            added_files_count: () => {
                this.UIToolEl.append(this.numberOfFilesDisplayTool);
                (this.options.display_ui_tools && screen.width <= 768 && this.options.show_ui_tools_on_mobile_devices) && this._custupHeaderEl.querySelector('.inner').append(this.numberOfFilesDisplayTool);
            },
            add_file: () => {
                this.UIToolEl.append(this.addFilesUITool);
                (this.options.display_ui_tools && screen.width <= 768 && this.options.show_ui_tools_on_mobile_devices) && this._custupHeaderEl.querySelector('.inner').append(this.addFilesUITool);
            },
            clear_files: () => {
                this.UIToolEl.append(this.clearAllFilesBtnTool);
                (this.options.display_ui_tools && screen.width <= 768 && this.options.show_ui_tools_on_mobile_devices) && this._custupHeaderEl.querySelector('.inner').append(this.clearAllFilesBtnTool);
            },
            upload: () => {
                this.UIToolEl.append(this.uploadFilesToServerTool);
                (this.options.display_ui_tools && screen.width <= 768 && this.options.show_ui_tools_on_mobile_devices) && this._custupHeaderEl.querySelector('.inner').append(this.uploadFilesToServerTool);
            },
            tools_dragger: () => {
                this.UIToolEl.append(this.toolDragger);
            }
        }
        
        if (this.options.allowed_tools !== null && this.options.allowed_tools.length == 0) {
            Object.keys(tools_arr).forEach(key => tools_arr[key]())
        }else{
            if (this.options.allowed_tools !== null) {
                this.options.allowed_tools.forEach(tool => tools_arr[tool]())
            }
        }
        
        if (screen.width > 768) {
            this.options.display_ui_tools && this._custupInnerEl.append(this.UIToolEl)            
        }else{
            if (this.options.display_ui_tools && this.options.allowed_tools !== null) {
                this._custupHeaderEl.classList.add('_custup_mobile_768_screen_tools_container');
                this._custupInnerContainerWrapperEl.classList.add('_custup_inner_container_wrapper_container_768');
            }
        }
    }
    
    /**
     * @protected @method handleAddNewFileButton
     */
    handleAddNewFileButton () {
        if (this.options.maxNumberOfFiles != undefined && this._get_total_file_count() == this.options.maxNumberOfFiles) return this.show_message("Maximum number of allowed files reached", 'info')
        this.showDefaultUI(true)
    }

    /**
     * @protected @method attempt_clear_mobile_tools - This methods clears the ui tools if on mobile devices, if no tools were displayed it does nothing
     */
    attempt_clear_mobile_tools () {
        this._custupHeaderEl.classList.contains('_custup_mobile_768_screen_tools_container') && (this._custupHeaderEl.querySelector('.inner').innerHTML = '');
        this._custupHeaderEl.classList.remove('_custup_mobile_768_screen_tools_container');
        this._custupInnerContainerWrapperEl.classList.remove('_custup_inner_container_wrapper_container_768');
    }
    
    /**
     * @protected handleClearAllFiles
     * @param {MouseEvent | null} e 
     */
    handleClearAllFiles () {
        this.fileDisplayUIEl?.remove()
        this.fileDisplayUIEl = undefined;
        this.UIToolEl?.remove();
        this.attempt_clear_mobile_tools();
        this.UIToolEl = undefined;
        this.eventMethods.file_all_removed && this.eventMethods.file_all_removed([...this.defaultFiles, ...this.selectedFiles]);
        this.selectedFiles = []
        this.defaultFiles = []
        this.successfullyUploadedFiles = [];
        this.filesNotSent = [];
        this.options.use_default_file_display_ui && this.showDefaultUI();
        this.scrollBarEl?.remove();
        this.clear_files_from_storage()
    }

    /**
     * @protected setNumberOfFiles
     * @param {boolean} file_removed
     */
    setNumberOfFiles (file_removed = false) {
        if (!this.options.use_default_file_display_ui) return;
        this.numberOfFilesDisplayTool.innerHTML = this._get_total_file_count()
        if (this._get_total_file_count() == 0 && file_removed) {
            this.handleClearAllFiles()
        }
    }

    /**
     * @protected @method createScrollBar
     * @param {HTMLElement | undefined} targetEl - The scrollbar parent container
     * @returns {HTMLElement}
     */
    createScrollBar (targetEl=undefined) {
        const custupCustomScrollBar = document.createElement("div")
        this.set_class_name("scrollBarEl", custupCustomScrollBar)
        if (targetEl) {
            targetEl.parentElement.append(custupCustomScrollBar)
        }else{
            this.scrollBarEl = custupCustomScrollBar
            this._custupInnerContainerWrapperEl.append(this.scrollBarEl)
        };
        this.updateScrollbarHeight(targetEl);
        return custupCustomScrollBar;
    }

    /**
     * @protected @method updateScrollbarHeight
     * @param {HTMLElement} targetEl - The scrollbar parent container
     */
    updateScrollbarHeight (targetEl=undefined) {
        setTimeout(() => {
            const targetScrollbarEl = targetEl ? targetEl.parentElement.querySelector(`.${this.get_element_class_name("scrollBarEl")}`) : this.scrollBarEl
            const scrollHeightDiff = (targetEl ?? this.fileDisplayUIEl)?.scrollHeight - this._custupInnerContainerWrapperEl?.clientHeight;
            const calcScrollBarHeight = scrollHeightDiff < 0 ? 0 : (100 - ((scrollHeightDiff / (targetEl ?? this.fileDisplayUIEl)?.scrollHeight) * 100));
            targetScrollbarEl && (targetScrollbarEl.style.height = calcScrollBarHeight + "%");
        }, 500);
    }

    /**
     * @protected @method handleCustomScroll
     * @param {Event} e - Mouse wheel event or touch event for touch devices
     * @param {HTMLElement | undefined} targetEl - The scrolling container parent container
     * @param {HTMLElement | undefined} targetScrollBarEl - The main scroll bar element
     */
    handleCustomScroll (e, targetEl=undefined, targetScrollBarEl=undefined) {
        e.preventDefault();
        e.stopPropagation();
        const outsetElementsHeight = Math.abs(this._custupInnerContainerWrapperEl?.clientHeight - (targetEl ?? this.fileDisplayUIEl)?.scrollHeight);
        
        if (e.type == "wheel") {
            this.fileDisplayUIElCurrentScrollHeight += Math.floor(e.deltaY);
        }else{
            this.fileDisplayUIElCurrentScrollHeight += this.layerMoved - e.layerY;
        }

        if (this.fileDisplayUIElCurrentScrollHeight >= outsetElementsHeight) {
            this.fileDisplayUIElCurrentScrollHeight = outsetElementsHeight;
        }
        if (this.fileDisplayUIElCurrentScrollHeight <= 0) {
            this.fileDisplayUIElCurrentScrollHeight = 0;
        }

        const scrollBody = targetEl ?? this.fileDisplayUIEl;
        scrollBody && (scrollBody.style.top = -this.fileDisplayUIElCurrentScrollHeight + "px");
        const percentageScrolled = (Math.abs((targetEl ?? this.fileDisplayUIEl)?.offsetTop) / (targetEl ?? this.fileDisplayUIEl)?.scrollHeight) * 100;
        const scrollBarEl = targetScrollBarEl ?? this.scrollBarEl;
        scrollBarEl && (scrollBarEl.style.top = percentageScrolled + "%");
    }

    /**
     * removed because tool dragging has been removed for touch devices, 
     * the upload tool on bigger screens has been changed to a static tool which is displayed inside the header on mobile devices
     * @deprecated @protected @method handleInnerElementContainerPointerDown
     */
    handleInnerElementContainerPointerDown (e) {
        e.preventDefault();
        e.stopPropagation();
        this.lastToolOffsetBottom = e.clientY
        this.lastToolOffsetLeft = e.clientX
        if (e.target.classList.contains("_custup_dragger_tool")) {
            this._custupInnerEl.onmousemove = (e) => this.handleToolDraggerMouseMove(e)           
            this._custupInnerEl.onpointermove = (e) => this.handleToolDraggerMouseMove(e)           
            this._custupInnerEl.onmouseup = (e) => this.handleInnerElementContainerMouseUp(e)
            this._custupInnerEl.onpointerup = (e) => {e.stopPropagation();this.handleInnerElementContainerMouseUp(e)} 
        }else if (e.target.classList.contains("_custup_file_ui") || e.target.parentElement.classList.contains("_custup_file_ui")) {
            /**
             * TODO: implement changing of file position on the UI
             */
        }
    }

    /**
     * @protected @method handleInnerElementContainerMouseUp
     */
    handleInnerElementContainerMouseUp (e) {
        this._custupInnerEl.onmousemove = null
        this._custupInnerEl.onpointermove = null
    }

    /**
     * @protected @method handleToolDraggerMouseMove
     */
    handleToolDraggerMouseMove (e) {
        e.preventDefault();
        e.stopPropagation();
        const addToolElStyleLeft = this.currentToolElOffsetLeft == 0 ? this.UIToolEl.offsetLeft : 0;
        
        if (e.clientX > this.lastToolOffsetLeft) {
            this.currentToolElOffsetLeft += Math.abs(this.lastToolOffsetLeft - e.clientX) + addToolElStyleLeft;
        }else if (e.clientX < this.lastToolOffsetLeft) {
            if (this.currentToolElOffsetLeft <= 0) {
                this.currentToolElOffsetLeft = this.currentToolElOffsetLeft;
            }else{
                this.currentToolElOffsetLeft -= Math.abs(this.lastToolOffsetLeft - e.clientX) + addToolElStyleLeft;
            }
        }else{
            if (addToolElStyleLeft != 0) {
                this.currentToolElOffsetLeft = addToolElStyleLeft                
            }else{
                this.currentToolElOffsetLeft = this.currentToolElOffsetLeft
            }
        }
        
        
        this.UIToolEl.style.left = this.currentToolElOffsetLeft + "px"
        this.lastToolOffsetLeft = e.clientX
    }

    /**
     * @protected @method addFileToUI
     * @param {File} file
     * @param {boolean} isUploadable
     * @param {number | null} index
     */
    addFileToUI (file, isUploadable=true, index=null) {
        const _class = this
        file.id = _class.get_unique_uuid()
        if (_class.fileDisplayUIEl == undefined) {
            this.makeFileDisplayUI()
            this.removeDefaultUI()
        }
        this.eventMethods.file_beforeAdded && (() => 
            {
                if (file.type.split('/')[0].toLowerCase() == 'image') {
                    const fr = new FileReader()
                    fr.onload = (e) => {
                        this.eventMethods.file_beforeAdded({file, base64: e.target.result});
                    }
                    fr.readAsDataURL(file)            
                }else{
                    this.eventMethods.file_beforeAdded({file});
                }
            })();

        isUploadable && (index !== null ? this.selectedFiles.splice(index, 0, file) : this.selectedFiles.push(file));
        file.isDefaultFile && this.defaultFiles.push(file);
            
        const fileUIContainer = document.createElement('div')
        const fileUI = document.createElement('div')
        const fileDetailsContainer = document.createElement('div')
        const fileName = document.createElement('div')
        const fileSize = document.createElement('div')
        
        const fileBottomDetails = document.createElement('div')
        const fileUIBottomToolsContainer = document.createElement('div')
        const fileBottomIconEdit = document.createElement('div')
        fileBottomIconEdit.innerHTML = this.ui_icons.edit
        fileBottomIconEdit.title = 'edit'
        const fileBottomIconView = document.createElement('div')
        fileBottomIconView.innerHTML = this.ui_icons.eye
        fileBottomIconView.title = 'View'

        const remove_file_btn = document.createElement('div')
        remove_file_btn.innerHTML = this.ui_icons.remove
        remove_file_btn.onclick = (e) => _class.handleRemoveFile(file)
        fileUIContainer.id = file.id
        
        if (file.type.split('/')[0].toLowerCase() == 'image') {
            const fr = new FileReader()
            fr.onload = (e) => {
                _class.makeFileDisplayElement(file, fileUI, e.target.result) 
            }
            fr.readAsDataURL(file)            
        }else{
            _class.makeFileDisplayElement(file, fileUI) 
        }
        this.set_class_name("fileUIOuterContainer", fileUIContainer)
        this.set_class_name("fileDetailsContainer", fileDetailsContainer)
        this.set_class_name("custup_fileName", fileName)
        this.set_class_name("fileBottomDetails", fileBottomDetails)
        this.set_class_name("fileUIBottomToolsContainer", fileUIBottomToolsContainer)
        this.set_class_name("custup_fileSize", fileSize)
        this.set_class_name("fileUI", fileUI)
        this.set_class_name("remove_file_btn", remove_file_btn)

        this.file_display_width_setter(fileUIContainer)

        fileName.innerHTML = this.clipFileNameIfShouldClip(file.name)
        fileName.title = file.name
        fileSize.innerHTML = this.parseFileSize(file.size)
        
        this.options.show_preview_file_btn && fileUIBottomToolsContainer.append(fileBottomIconView)
        // fileUIBottomToolsContainer.append(fileBottomIconEdit) --- suspended

        fileBottomDetails.append(fileSize)
        if (this.is_file_previewable(file)) {
            fileBottomIconView.onclick = (e) => this.makeFilePreviewer(file)
            fileBottomDetails.append(fileUIBottomToolsContainer)            
        }

        fileDetailsContainer.append(fileName)
        fileDetailsContainer.append(fileBottomDetails)

        fileUI.style.userSelect = "none";
        fileUIContainer.draggable = true;
        fileUIContainer.append(fileUI);
        this.options.show_file_details_container && fileUIContainer.append(fileDetailsContainer);

        this.options.show_file_remove_btn && fileUIContainer.append(remove_file_btn);
        /// Postponed - for changing file position on the UI
        // fileUI.ondragstart = (e) => this.changeFileElementPosition(e)
        // fileUI.ondragover = (e) => this.handleFileUIDragOver(e)
        // fileUI.ondrop = (e) => this.handleFileUIDropped(e)

        this.options.use_default_file_display_ui && this.setNumberOfFiles();

        this.options.use_default_file_display_ui  && this.fileDisplayUIEl.append(fileUIContainer);

        this.eventMethods.file_afterAdded && this.eventMethods.file_afterAdded({file, element: fileUIContainer, count: this._get_total_file_count()});
        
        (!this.options.disable_scrollbar && this.options.use_default_file_display_ui) && this.updateScrollbarHeight();

        ((this.options.upload_automatically && isUploadable) || this.currentlyUploadingFiles.length > 0) && _class.handleUploadFile(file);
        this.options.persist_files && this.update_file_storage();
    }

    /**
     * @public @method is_file_previewable
     * @param {File} file - The file to check whether CustUp can preview it
     * @returns {boolean}
     */
    is_file_previewable (file) {
        return ['image', 'video', 'audio'].includes(file.type.split('/')[0].toLowerCase());
    }

    /**
     * @protected @method file_display_width_setter
     * @param {HTMLElement} el - The file display width setter only for default UI type
     */
    file_display_width_setter (el) {
        const custupElWidth = this._custupEl.clientWidth;
        if (custupElWidth >= 1400) {
            el.classList.add('w10perc');
        }else if (custupElWidth >= 1200 && custupElWidth < 1400) {
            el.classList.add('w14perc');
        }else if (custupElWidth >= 890 && custupElWidth < 1200) {
            el.classList.add('w16perc');
        }else if (custupElWidth >= 700 && custupElWidth < 890) {
            el.classList.add('w25perc');
        }else if (custupElWidth >= 500 && custupElWidth < 700) {
            el.classList.add('w33perc');
        }else if (custupElWidth >= 340 && custupElWidth < 500) {
            this.fileDisplayUIEl?.classList.add('flexSpaceBetween');
            el.classList.add('w45perc');
        }else{
            el.classList.add('w100perc');
        }
    }

    /**
     * @protected @method makeFileDisplayElement
     * @param {File} file - file data of the file to display
     * @param {HTMLDivElement} fileContainer
     * @param {ArrayBuffer} fileBase64 - optional to be provided only for image files
     */
    makeFileDisplayElement (file, fileContainer, fileBase64) {
        const file_type = file.type.split('/')[0].toLowerCase()
        const fileWrapperEl = document.createElement('div')
        this.set_class_name('file_wrapper_el', fileWrapperEl)
        fileContainer.append(fileWrapperEl)
        if (file_type == 'image') {
            const fileImgElement = document.createElement('img')
            fileImgElement.src = fileBase64
            fileImgElement.draggable = false
            fileWrapperEl.append(fileImgElement)
        }else{
            const othersFileElement = document.createElement('div')
            othersFileElement.className = 'other-file-el'
            othersFileElement.innerHTML = this.getFileIcon(file.type)
            fileWrapperEl.append(othersFileElement)
        }
        
    }

    /**
     * @protected @method makeFilePreviewer
     * @param {File} file - File object of the element to be previewed
     */
    makeFilePreviewer (file) {
        const file_main_type = file.type.split('/')[0]

        const animation = this.file_preview_animation_arr[Math.floor(Math.random() * this.file_preview_animation_arr.length)]

        const filePreviewer = document.createElement('div')
        const filePreviewerInnerContainer = document.createElement('div')

        this.set_class_name('filePreviewer', filePreviewer)
        this.set_class_name('filePreviewerInnerContainer', filePreviewerInnerContainer)

        let previewElement = null

        
        if (file_main_type == 'image') {
            previewElement = document.createElement('img')
            const fr = new FileReader()
            fr.onload = (e) => {
                previewElement.src = e.target.result
            }
            fr.readAsDataURL(file)
        }else if (file_main_type.toLowerCase() == 'video') {
            previewElement = document.createElement('video');
            previewElement.controls = false;
            previewElement.autoplay = true;
            previewElement.innerHTML = `<source src="${URL.createObjectURL(file)}" type="${file.type}">`;
        }else if (file_main_type.toLowerCase() == 'audio') {
            previewElement = document.createElement('audio');
            previewElement.controls = false;
            previewElement.autoplay = true;
            previewElement.replay = true;
            previewElement.innerHTML = `<source src="${URL.createObjectURL(file)}" type="${file.type}">`;
        }

        this.close_popup_btn.onclick = () => {
            if (animation == undefined) return filePreviewer.remove();
            const animation_clone = animation && [...animation]
            animation_clone && filePreviewer.animate(animation_clone.reverse(), {duration: 200});
            setTimeout(() => {
                filePreviewer.remove()
            }, 200);
            this.close_popup_btn.onclick = () => null
            this.close_popup_btn.style.display = 'none'
        }
        
        filePreviewerInnerContainer.append(previewElement)
        filePreviewer.append(filePreviewerInnerContainer)
        this.close_popup_btn.style.display = 'flex'

        
        this._custupInnerEl.append(filePreviewer)

        const filePreviewerHalfWidth = filePreviewer.clientWidth / 2
        animation && filePreviewer.animate(animation, {duration: 300});
    }

    /**
     * @protected @method getFileIcon
     * @param {string} file_type - the full file type of the file to return its icons
     * @returns {SVGElement}
     */
    getFileIcon (file_type) {
        const file_type_icons = {
            video: this.ui_icons.video_file,
            audio: this.ui_icons.audio_file,
            pdf: this.ui_icons.pdf_file,
            txt: this.ui_icons.txt_file,
            doc: this.ui_icons.docx_file,
            docx: this.ui_icons.docx_file,
            xls: this.ui_icons.excel_file,
            xlsx: this.ui_icons.excel_file,
            ppt: this.ui_icons.ppt_file,
            pptx: this.ui_icons.pptx_file,
            html: this.ui_icons.html_file,
            psd: this.ui_icons.psd_file,
            eps: this.ui_icons.eps_file,
            csv: this.ui_icons.csv_file,
            css: this.ui_icons.css_file,
            js: this.ui_icons.javascript_file,
            unknown: this.ui_icons.unknown_file,
            exe: this.ui_icons.exe_file,
            dmg: this.ui_icons.dmg_file,
            bin: this.ui_icons.bin_file,
            rar: this.ui_icons.rar_file,
            tar: this.ui_icons.tar_file,
            '7z': icons["7z_file"],
            zip: this.ui_icons.zip_file
        }

        const file_main_type = file_type.split('/')[0]

        if (file_main_type == 'video') {
            return file_type_icons.video
        }else if (file_main_type == 'audio') {
            return file_type_icons.audio
        }else{
            let file_type_nd_ext = ''
            for (const key in file_types) {
                if (Object.hasOwnProperty.call(file_types, key)) {
                    const file_format = file_types[key];
                    if (file_format == file_type) {
                        file_type_nd_ext = key
                    }
                }
            }
            const file_icon = file_type_icons[file_type_nd_ext]
            if (file_icon == undefined) {
                return file_type_icons.unknown
            }else{
                return file_icon
            }
        }
    }

    /**
     * @protected @method handleRemoveFile
     * @param {File} fileData
     * @param {Function} callback_fn
     */
    handleRemoveFile (fileData, callback_fn=undefined) {
        const current_file_index = this.selectedFiles.findIndex(file => file.name == fileData.name)
        this.fileDisplayUIEl?.querySelector(`#${fileData.id}`).remove() 
        this.selectedFiles.splice(current_file_index, 1)

        const findFileInSuccessfullyUploadedFiles = this.successfullyUploadedFiles.findIndex(file => file.name == fileData.name)
        if (findFileInSuccessfullyUploadedFiles != -1) {
            this.successfullyUploadedFiles.splice(findFileInSuccessfullyUploadedFiles, 1)
        }

        const findFileInNotUploadedFiles = this.filesNotSent.findIndex(file => file.name == fileData.name)
        if (findFileInNotUploadedFiles != -1) {
            this.filesNotSent.splice(findFileInNotUploadedFiles, 1)
        }

        const default_file = this.defaultFiles.findIndex(file => file.id == fileData.id);
        (default_file > -1 && this.eventMethods.file_defaultFileRemoved) && this.eventMethods.file_defaultFileRemoved(this.defaultFiles[default_file]);
        (default_file > -1) && this.defaultFiles.splice(default_file, 1);


        this.setNumberOfFiles(true);
        !this.options.disable_scrollbar && this.updateScrollbarHeight();
        callback_fn && callback_fn();
        this.eventMethods.file_removed && this.eventMethods.file_removed({file: fileData, files_count: this._get_total_file_count()});
        this.remove_file_from_storage(fileData.id)
    }

    /**
     * Removes unwanted characters from file name
     * @protected @method cleanFileName
     * @param {string} file_name - the file name to remove unwanted characters from
     * @returns {string}
     */
    cleanFileName (file_name) {
        return this.libraryName + '_' + file_name.replace(/[\s\.\'\"\(\)\[\]\{\}]+/g, '_')
    }

    /**
     * @protected @method get_unique_uuid
     * @returns {string}
     */
    get_unique_uuid () {
        const __uuid = crypto.randomUUID ? crypto.randomUUID() : this.getRandChars('crypt',25);
        return "custup_"+__uuid;
    }

    /**
     * @protected @method clipFileNameIfShouldClip
     * @param {string} file_name
     * @returns {string}
     */
    clipFileNameIfShouldClip (file_name) {
        let treated_file_name = file_name
        if (file_name.length > 30) {
            treated_file_name = file_name.slice(0, 8) + "..." + file_name.slice(-8)
        }
        return treated_file_name
    }

    
    /**
     * /// Postponed
     * @protected @method changeFileElementPosition 
     * @param {Event} e 
     */
    changeFileElementPosition (e) {
        // e.preventDefault()
        e.stopPropagation()
        e.dataTransfer.setData("text/html", e.currentTarget.outerHTML);
        // this.fileDisplayUIEl
    }

    /**
     * @protected @method handleFileUIDragOver
     * @param {Event} e 
     */
    handleFileUIDragOver (e) {
        e.preventDefault()
        e.stopPropagation()
        e.dataTransfer.dropEffect = "move";
    }

    /**
     * @protected @method handleFileUIDragOver
     * @param {Event} e 
     */
    handleFileUIDropped (e) {
        e.preventDefault()
        e.stopPropagation()
    }
    
    /**
     * 
     * @private @method set_class_name
     * 
     * @param style_key_name string the name of the style
     * @param element_to_style HTMLElement
     * @returns {void}
     * 
     */
    set_class_name (style_key_name, element_to_style) {
        const get_style_classname = this.ui_styles[style_key_name];
        element_to_style.className = get_style_classname        
    }

    /**
     * @private @method get_element_class_name
     * @param {string} style_key_name 
     * @returns {string}
     */
    get_element_class_name (style_key_name) {
        return this.ui_styles[style_key_name]
    }

    /**
     * @protected @method _select_file_from_device
     * @param {MouseEvent | TouchEvent} e
     */

    _select_file_from_device (e) {
        const _class = this;
        const fileEl = document.createElement('input')
        fileEl.type = "file"
        fileEl.multiple = this.options.allowMultipleUpload
        const accepted_types = []
        this.options.allowed_file_types.map(type => {
            if (file_types[type] != undefined) {
                accepted_types.push(file_types[type])                
            }
        })
        fileEl.accept = accepted_types.join(',')

        fileEl.onchange = (e) => {
            const files = e.currentTarget.files
            const callback_fn = () => _class.removeDefaultUI();
            this.handle_selected_files(files, callback_fn)
        }

        fileEl.click()

    }

    /**
     * @protected @method handle_drag_over
     * @param {DragEvent} e
     */
    handle_drag_over (e) {
        e.preventDefault()
        e.dataTransfer.dropEffect = "copy";
        this._custupInnerEl.style.backgroundColor = "rgb(230,230,230)"
        if (this._custupDefaultUIEl !== undefined) {
            this._custupDefaultUIEl.style.opacity = .2            
        }
    }

    /**
     * @protected @method handle_drag_leave
     * @param {DragEvent} e
     */
    handle_drag_leave (e) {
        e.preventDefault()
        this._custupInnerEl.style.backgroundColor = "transparent"
        if (this._custupDefaultUIEl !== undefined) {
            this._custupDefaultUIEl.style.opacity = 1           
        }
    }

    /**
     * @protected @method show_message
     * @param {string} msg
     * @param {"error" | "success" | "info"} type
     * @param {boolean} async - for async messages that doesn't hide until the request is done
     * @param {number} timeout - timeout for hiding the message
     */
    show_message (msg, type, async = false, timeout = this.options.messages.timeout) {
        const _class = this
        const message_container = document.createElement("div")
        _class.set_class_name("message_container", message_container)
        message_container.style.cursor = "pointer"
        const message_icon = document.createElement('div')
        const message_content = document.createElement('div')
        let currentElOffsetBottom = 30
        if (_class.last_message_el_offset_bottom == 0) {
            _class._custupInnerEl.querySelectorAll('._custup_message_container')
            .forEach(messageEl => {
                currentElOffsetBottom += messageEl.clientHeight + 5
            })
        }else{
            currentElOffsetBottom += _class.last_message_el_offset_bottom + 5
        }
        if (async) {
            message_icon.innerHTML = this.ui_icons.loading_partial;
            message_icon.animate(
                [{transform: 'rotate(360deg)'}], 
                {duration: 500, iterations: Infinity})
        }else{
            if (type == "error") {
                message_icon.innerHTML = this.ui_icons.warning            
            }else if (type == "success") {
                message_icon.innerHTML = this.ui_icons.success     
            }else if (type == "info") {
                message_icon.innerHTML = this.ui_icons.info    
            }
        }
        message_content.innerHTML = msg
        message_container.append(message_icon)
        message_container.append(message_content)
        message_container.style.bottom = currentElOffsetBottom + 'px'
        message_container.animate([
                { bottom: '-20px' },
                { bottom: '40px' },
                { bottom: currentElOffsetBottom + 'px' }
        ], {duration: 300, iterations: 1, easing: "cubic-bezier(0.42, 0, 0.58, 1)"})
        _class._custupInnerEl.append(message_container)
        _class.last_message_el_offset_bottom = currentElOffsetBottom

        message_container.onclick = (e) => async ? null : _class.message_element_exit_call(e.currentTarget)  
        
        if (async) {
            return () => _class.message_element_exit_call(message_container);
        }

        setTimeout(() => {
            _class.message_element_exit_call(message_container, false)             
        }, timeout);
    }

    /**
     * @protected @method message_element_exit_call
     * This method is executed when a message element is exiting
     * @param {HTMLElement} message_container 
     */

    message_element_exit_call (message_container) {
        message_container.classList.add("peakout-anim")
        setTimeout(() => {
            const message_container_height = message_container.offsetHeight
            message_container.remove()  
            if (this._custupInnerEl.querySelectorAll('._custup_message_container').length == 0) {
                this.last_message_el_offset_bottom = 0
            }
            this._custupInnerEl.querySelectorAll('._custup_message_container')
            .forEach(messageEl => {
                const distance_to_be_displaced_downward = (this._custupInnerEl.clientHeight - (messageEl.offsetTop + messageEl.clientHeight)) - message_container_height
                messageEl.style.bottom = distance_to_be_displaced_downward + 'px'
            }) 
            this.last_message_el_offset_bottom = this.last_message_el_offset_bottom == 0 ? 0 : (this.last_message_el_offset_bottom - message_container_height)
        }, this.options.alert_timeout_time);
    }

    /**
     * @protected @method handle_file_drop
     * @param {Event} e
     */
    handle_file_drop (e) {
        e.preventDefault()
        this._custupInnerEl.style.backgroundColor = "transparent";
        this._custupDefaultUIEl && (this._custupDefaultUIEl.style.opacity = 1)
        const before_add_callback = () => {
            this.removeDefaultUI()
        }
        this.handle_selected_files(e.dataTransfer.files, before_add_callback)
    }

    /**
     * @property @method isfileAreadyAdded
     * @param {File} file
     */
    isfileAreadyAdded (file) {
        const _check = this.selectedFiles.find(e => e.name == file.name)
        return _check !== undefined
    }

    /**
     * @protected @method parseFileSize
     * @param {number} size
     */
    parseFileSize = (size) => {
        var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
        return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    }

    /**
     * @private @method isFileTypeInAcceptedTypes
     * @param {File} file - the file to check its type
     */
    isFileTypeInAcceptedTypes (file) {
        return this.options.allowed_file_types.findIndex(file_type => file_types[file_type] == file.type) > -1 || this.options.allowed_file_types.length === 0
    }

    /**
     * @protected @method handle_selected_files
     * @param {Array<File>} files
     * @param {Function | null} before_add_callback_fn
     * @param {boolean} isUploadable
     * @param {number | null} index
     */
    handle_selected_files (files, before_add_callback_fn=null, isUploadable=true, index=null) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (this.isfileAreadyAdded(file)) {
                this.show_message(`file ${file.name} is already added to UI, cannot add duplicate file`, "error")
                continue
            } else if (file.size > this.options.maximumAllowedFileSize) {
                this.show_message(`file ${file.name} file size (${this.parseFileSize(file.size)}) is more than the maximum allowed file size, maximum allow file size is ${this.parseFileSize(this.options.maximumAllowedFileSize)}`, "error")
                continue                
            } else if (file.size < this.options.minimumAllowedFileSize) {
                this.show_message(`file ${file.name} file size (${this.parseFileSize(file.size)}) is lesser than the minimum allowed file size, minimum allow file size is ${this.parseFileSize(this.options.minimumAllowedFileSize)}`, "error")
                continue                
            }
            if (!this.isFileTypeInAcceptedTypes(file)) {
                this.show_message(`file ${file.name} file type (${file.type}) is not allowed, allowed file types are ${this.options.allowed_file_types.toString()}`, "error")
                continue;
            }
            if (this._get_total_file_count() >= this.options.maxNumberOfFiles) {
                this.show_message(`Maximum number of files that can be uploaded is ${this.options.maxNumberOfFiles}`, "error")
                break;
            }
            const customCheck = this.eventMethods.file_beforePassedChecks !== undefined ? this.eventMethods.file_beforePassedChecks(file) : undefined
            if (customCheck !== undefined && (customCheck[0] === false || customCheck === false)) {
                customCheck[1] && this.show_message(customCheck?.[1], "error");
                continue;
            }
            before_add_callback_fn && before_add_callback_fn()
            this.addFileToUI(file, isUploadable, index)
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////// Uploading of files /////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @protected @method createFileUploadOverlay
     * @param {string} file_id - id of the file to add file upload overlay to
     * @returns {HTMLDivElement}
     */
    createFileUploadOverlay (file_id) {
        if (!this.options.use_default_file_display_ui) return undefined;
        const upload_file_element = this.fileDisplayUIEl.querySelector(`#${file_id}`).querySelector('._custup_file_ui')
        const file_upload_overlay_ui = document.createElement('div')
        const file_upload_overlay_inner_container = document.createElement('div')

        const upload_progress_container = document.createElement('div')
        const file_upload_progress = document.createElement('div')
        const file_upload_progress_inner = document.createElement('div')
        const file_upload_progress_text_left = document.createElement('div')
        file_upload_progress_text_left.className = "upload-text"
        file_upload_progress_text_left.innerHTML = '0%'

        
        this.set_class_name('file_upload_overlay_ui', file_upload_overlay_ui)
        this.set_class_name('file_upload_overlay_inner_container', file_upload_overlay_inner_container)
        this.set_class_name('upload_progress_container', upload_progress_container)
        this.set_class_name('file_upload_progress', file_upload_progress)
        this.set_class_name('file_upload_progress_inner', file_upload_progress_inner)

        file_upload_progress.append(file_upload_progress_inner);
        upload_progress_container.append(file_upload_progress);
        upload_progress_container.append(file_upload_progress_text_left);
        this.options.show_upload_progress_bar && file_upload_overlay_inner_container.append(upload_progress_container);
        file_upload_overlay_ui.append(file_upload_overlay_inner_container);

        upload_file_element.append(file_upload_overlay_ui)
        file_upload_overlay_ui.animate([{opacity: 0}, {opacity: 1}], {duration: 500})

        return file_upload_overlay_ui
    }

    /**
     * @protected @method createRetryUploadOverlay
     * @param {File} file
     * @param {string} file_id - id of the file element to append the retry upload overlay to
     */
    createRetryUploadOverlay (file, file_id) {
        if (!this.options.use_default_file_display_ui) return;
        const upload_file_element = this.fileDisplayUIEl.querySelector(`#${file_id}`).querySelector('._custup_file_ui')
        const retry_upload_overlay_ui = document.createElement('div')
        const retry_upload_button = document.createElement('div')

        retry_upload_button.innerHTML = this.ui_icons.retry

        retry_upload_button.onclick = (e) => this.handleRetryFileUpload(file, retry_upload_overlay_ui)

        this.set_class_name('retry_upload_overlay_ui', retry_upload_overlay_ui)
        this.set_class_name('retry_upload_button', retry_upload_button)

        retry_upload_overlay_ui.append(retry_upload_button)
        retry_upload_overlay_ui.animate([{scale: 1.5}, {scale: 1}], {duration: 400})
        upload_file_element.append(retry_upload_overlay_ui)
    }

    /**
     * @protected @method isUploadConditionsSatisfied
     * @returns {boolean}
     */
    isUploadConditionsSatisfied () {
        if (this.options.maxNumberOfFiles != undefined && this._get_total_file_count() > this.options.maxNumberOfFiles) {
            this.show_message('Number of file to be uploaded should not be greater than ' + this.options.maxNumberOfFiles, 'error')
            return false
        }else if (this.options.minNumberOfFiles !== undefined && this._get_total_file_count() < this.options.minNumberOfFiles){
            this.show_message('Number of file required to be uploaded must be at least ' + this.options.minNumberOfFiles, 'error')
            return false            
        }
        return true
    }
    
    /**
     * @protected @method handleUploadFile
     * @param {File} file - the file to be uploaded
     */
    handleUploadFile (file=undefined) {
        if (!this.isUploadConditionsSatisfied()) return;
        const _class = this
        _class.file_upload_form_data = new FormData(_class.options.file_upload_settings.form_field)

        if (!file) {
            const files_to_upload = _class.selectedFiles.filter(file => _class.successfullyUploadedFiles.findIndex(f => f.name == file.name && f.size == file.size) == -1)
            
            files_to_upload.map(file => {
                const upload_element = _class.createFileUploadOverlay(file.id)
                _class.handleUploadFileToEndpoint(file, upload_element)
            })            
        }else{
            const upload_element = _class.createFileUploadOverlay(file.id)
            _class.handleUploadFileToEndpoint(file, upload_element)
        }

    }

    /**
     * @private @method handleUploadAllFiles
     * @returns {Promise<void>}
     */
    async handleUploadAllFiles () {
        if (!this.isUploadConditionsSatisfied()) return;
        const _class = this
        _class.file_upload_form_data = new FormData(_class.options.file_upload_settings.form_field)

        if (_class.options.file_upload_settings.additional_data != undefined) { 
            for (const key in _class.options.file_upload_settings.additional_data) {
                if (Object.hasOwnProperty.call(_class.options.file_upload_settings.additional_data, key)) {
                    const data = _class.options.file_upload_settings.additional_data[key];
                    _class.file_upload_form_data.append(key, data)
                }
            }
        }

        this.selectedFiles.map(file => _class.file_upload_form_data.append(_class.options.file_upload_settings.files_field_name, file))

        let attached_files = []
        this.options.instance_attach.map(_instance => {
            attached_files = [...attached_files, ..._instance.get_selected_files()];
            if (_instance.options.file_upload_settings.additional_data != undefined) { 
                for (const key in _instance.options.file_upload_settings.additional_data) {
                    if (Object.hasOwnProperty.call(_instance.options.file_upload_settings.additional_data, key)) {
                        const data = _instance.options.file_upload_settings.additional_data[key];
                        _class.file_upload_form_data.append(key, data)
                    }
                }
            }
        })
        attached_files.map(file => _class.file_upload_form_data.append(_class.options.file_upload_settings.files_field_name, file))
        
        const all_files = [...this.selectedFiles, ...attached_files];
        const beforeUploadStartCheck = this.eventMethods.upload_beforeStart && (await this.eventMethods.upload_beforeStart({files: all_files, formData: _class.file_upload_form_data, form: this.options.file_upload_settings.form_field}));
        if (beforeUploadStartCheck !== undefined && (beforeUploadStartCheck[0] === false || beforeUploadStartCheck === false)) {
            beforeUploadStartCheck?.[1] && this.show_message(beforeUploadStartCheck?.[1], "error");
            return;
        }

        await _class.__axios_instance.post('', _class.file_upload_form_data, {
            onUploadProgress: progressEvent => {
                this.eventMethods.upload_progress && this.eventMethods.upload_progress({progressEvent, all_files});
            }
        })
        .then((data) => {
            this.eventMethods.upload_success && this.eventMethods.upload_success({data, files: all_files, formData: _class.file_upload_form_data});
        })
        .catch(err => {
            this.show_message(err.message, 'error');
            this.eventMethods.upload_error && this.eventMethods.upload_error({err, files: all_files, formData: _class.file_upload_form_data});
        });

        this.eventMethods.upload_all_finished({not_uploaded_files: this.filesNotSent, uploaded_files: this.successfullyUploadedFiles});

    }

    /**
     * @protected @method fileUploadHandler
     * @param {File} file - the file to be uploaded
     */
    fileUploadHandler (file=undefined) {
        if (this.options.single_upload == true) {
            this.handleUploadAllFiles()
        }else{
            this.handleUploadFile(file)
        }
    }

    /**
     * @protected @method handleRetryFileUpload
     * @param {File} file - Blob of the file to retry
     * @param {HTMLDivElement} retry_upload_overlay_ui - html element of the retry upload overlay
     */
    handleRetryFileUpload (file, retry_upload_overlay_ui) {
        retry_upload_overlay_ui?.remove()

        const file_index = this.filesNotSent.findIndex(_file => _file.name == file.name);
        this.filesNotSent.splice(file_index, 1);

        const upload_element = this.createFileUploadOverlay(file.id);
        this.handleUploadFileToEndpoint(file, upload_element);
        this.eventMethods.upload_retry && this.eventMethods.upload_retry({file, file_container: this.fileDisplayUIEl.querySelector(`#${file.id}`)});
    }

    /**
     * @protected @method configure_axios
     */
    configure_axios () {
        this.__axios_instance = axios.create({
            baseURL: this.options.file_upload_settings.endpoint_url,
            timeout: 2000000,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                ...this.options.file_upload_settings.axios_settings.headers
            },
            ...this.options.file_upload_settings.axios_settings.configs
        })
    }

    /**
     * @private @method handleUploadFileToEndpoint
     * @param {File} file - file to upload to the server
     * @param {HTMLDivElement} upload_element - html element containing elements to display upload data and status
     * @param {boolean} chunking
     */
    
    handleUploadFileToEndpoint (file, upload_element, chunking = false) {
        const _class = this;
        const chunk_size = _class.options.file_upload_settings.chunk_size;

        const uniq_formdata = new FormData(_class.options.file_upload_settings.form_field)

        if (_class.options.file_upload_settings.should_chunk) {
            if (Object.keys(this.file_chunks).includes(file.id)) {
                const fileChunkObj = this.file_chunks[file.id]
                this.file_chunks[file.id].endByte = Math.min(fileChunkObj.startByte + chunk_size, file.size)
                this.file_chunks[file.id].batch += 1
            }else{
                this.file_chunks[file.id] = {
                    startByte: 0,
                    endByte: chunk_size > file.size ? file.size : Math.min(chunk_size, file.size),
                    batch: 1,
                }
            }
    
            const file_split = file.slice(this.file_chunks[file.id].startByte, this.file_chunks[file.id].endByte)
    
            uniq_formdata.set(file.id, file_split, file.name);            
        }else{
            uniq_formdata.append(_class.options.file_upload_settings.files_field_name, file);
        }

        


        if (!chunking && this.filesNotSent.length > 0 && this.options.use_default_file_display_ui) {
            upload_element.style.boxShadow = 'none'
            const upload_file_element = this.fileDisplayUIEl.querySelector(`#${file.id}`).querySelector('._custup_file_ui')
            upload_file_element.querySelector(`.${this.get_element_class_name('retry_upload_overlay_ui')}`)?.remove()
            const file_index = this.filesNotSent.findIndex(_file => _file.name == file.name);
            this.filesNotSent.splice(file_index, 1);
        }

        // if additional data to be sent along with request was provided then add it to the request
        if (((_class.options.file_upload_settings.should_chunk && this.file_chunks[file.id].endByte >= file.size) && _class.options.file_upload_settings.additional_data != undefined) ||
        (_class.options.file_upload_settings.additional_data != undefined && !_class.options.file_upload_settings.should_chunk)) { 
            for (const key in _class.options.file_upload_settings.additional_data) {
                if (Object.hasOwnProperty.call(_class.options.file_upload_settings.additional_data, key)) {
                    const data = _class.options.file_upload_settings.additional_data[key];
                    uniq_formdata.append(key, data);
                }
            }
        }

        this.eventMethods.upload_beforeStart && this.eventMethods.upload_beforeStart({file, upload_element});

        const fileContainer = _class.fileDisplayUIEl?.querySelector(`#${file.id}`);

        _class.successfullyUploadedFiles.map(file => uniq_formdata.delete(file.id));

        _class.options.file_upload_settings.should_chunk && (_class.__axios_instance.defaults.headers.post['Content-Range'] = "bytes " + this.file_chunks[file.id].startByte + "-" + this.file_chunks[file.id].endByte + "/" + file.size);
        this.currentlyUploadingFiles.push(file)
        _class.__axios_instance.post('', uniq_formdata, {
            onUploadProgress: progressEvent => {
                const should_use_chunking = this.options.file_upload_settings.should_chunk;
                if (should_use_chunking) {
                    const chunk_loaded = this.file_chunks[file.id].startByte + progressEvent.loaded;
                    this.file_progress[file.id] = {
                        total: file.size,
                        loaded: chunk_loaded > file.size ? file.size : chunk_loaded,
                        progress: (chunk_loaded > file.size ? file.size : chunk_loaded) / file.size,
                    }                    
                }
                progressEvent.loaded = should_use_chunking ? this.file_progress[file.id].loaded : progressEvent.loaded;
                progressEvent.total = should_use_chunking ? this.file_progress[file.id].total : progressEvent.total;
                progressEvent.progress = should_use_chunking ? this.file_progress[file.id].progress : progressEvent.progress;
                this.eventMethods.upload_progress && this.eventMethods.upload_progress({progressEvent, file, upload_element});
                _class.handleUploadProgressEvent(progressEvent, upload_element);
            }
        })
        .then((data) => {
            _class.options.file_upload_settings.should_chunk && (this.file_chunks[file.id].startByte = this.file_chunks[file.id].endByte);
            
            this.currentlyUploadingFiles.splice(this.currentlyUploadingFiles.indexOf(file), 1);

            if (_class.options.file_upload_settings.should_chunk && this.file_chunks[file.id].startByte < file.size) {
                _class.handleUploadFileToEndpoint (file, upload_element, true)
            }else{
                _class.successfullyUploadedFiles.push(file);
                _class.removeFileUploadOverlay(upload_element, fileContainer, true);
                this.eventMethods.upload_success && this.eventMethods.upload_success({data, file, upload_element, file_container: fileContainer});
                delete this.file_chunks[file.id];
                delete this.file_progress[file.id];
                (this.currentlyUploadingFiles.length == 0 && this.eventMethods.upload_all_finished !== undefined) && this.eventMethods.upload_all_finished({not_uploaded_files: this.filesNotSent, uploaded_files: this.successfullyUploadedFiles});
            }


        })
        .catch(err => {
            this.options.show_upload_error_overlay && _class.createRetryUploadOverlay(file, file.id);
            _class.removeFileUploadOverlay(upload_element, fileContainer, false);
            _class.filesNotSent.push(file);
            this.show_message(err.message, 'error');
            this.eventMethods.upload_error && this.eventMethods.upload_error({err, file, upload_element, file_container: fileContainer});
            this.currentlyUploadingFiles.splice(this.currentlyUploadingFiles.indexOf(file), 1);
        });
    }

    /**
     * @private @method removeFileUploadOverlay
     * @param {HTMLDivElement} upload_element - html element of the overlay element
     * @param {HTMLDivElement} fileContainer - html element of the of the file container
     * @param {boolean} isSuccessful - boolean to specify if the request was successful or not
     */
    removeFileUploadOverlay (upload_element, fileContainer, isSuccessful) {
        if (!this.options.use_default_file_display_ui) return;
        this.options.show_upload_error_overlay && (fileContainer.querySelector('._custup_file_ui').style.boxShadow = isSuccessful ? "0px 0px 20px 2px rgba(0, 150, 20, 0.4) " : "0px 0px 20px 2px rgba(150, 15, 20, 0.4)")
        upload_element.animate([{opacity: 1}, {opacity: 0}], {duration: 500})
        setTimeout(() => {
            upload_element.style.opacity = 0;            
            upload_element.remove();
        }, 500);
    }


    /**
     * @protected @method handleUploadProgressEvent
     * @param {ProgressEvent} event - upload progress event
     * @param {HTMLDivElement} upload_element - HTML element to display the file upload status
     */
    handleUploadProgressEvent (event, upload_element) {
        if (!this.options.use_default_file_display_ui) return;
        const upload_progress_inner = upload_element.querySelector(`.${this.get_element_class_name('file_upload_progress_inner')}`)
        const percentage_uploaded_element = upload_element.querySelector('.upload-text')
        upload_progress_inner != null && (upload_progress_inner.style.width = Math.floor(event.progress * 100) + '%');
        percentage_uploaded_element != null && (percentage_uploaded_element.innerHTML = Math.floor(event.progress * 100) + '%');
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////// Event Handlers //////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * on - listen for an event
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
     *  'upload.retry' |
     *  'upload.all_finished' |
     *  'file_source.closed' |
     *  'default_ui.shown' |
     *  'default_ui.closed'
     * } event - event name
     * @param {Function} callbackFn - the callback function
     */    

    on (event, callbackFn) {
        switch (event) {
            case 'library.init':
                this.eventMethods.library_init = callbackFn
                break;

            case 'file.beforeAdded':
                this.eventMethods.file_beforeAdded = callbackFn
                break;

            case 'file.afterAdded':
                this.eventMethods.file_afterAdded = callbackFn
                break;

            case 'file.beforePassedChecks':
                this.eventMethods.file_beforePassedChecks = callbackFn
                break;

            case 'file.removed':
                this.eventMethods.file_removed = callbackFn
                break;

            case 'file.defaultFileRemoved':
                this.eventMethods.file_defaultFileRemoved = callbackFn
                break;

            case 'file.all_removed':
                this.eventMethods.file_all_removed = callbackFn
                break;

            case 'video.recordingStarted':
                this.deviceFileSourceEventMethods.video_recordingStarted = callbackFn
                break;

            case 'video.recording':
                this.deviceFileSourceEventMethods.video_recording = callbackFn
                break;

            case 'video.recordStop':
                this.deviceFileSourceEventMethods.video_recordStop = callbackFn
                break;

            case 'video.recordSaved':
                this.deviceFileSourceEventMethods.video_recordSaved = callbackFn
                break;

            case 'video.recordCancel':
                this.deviceFileSourceEventMethods.video_recordCancel = callbackFn
                break;

            case 'image.captured':
                this.deviceFileSourceEventMethods.image_captured = callbackFn
                break;

            case 'audio.recordingStarted':
                this.deviceFileSourceEventMethods.audio_recordingStarted = callbackFn
                break;

            case 'audio.recording':
                this.deviceFileSourceEventMethods.audio_recording = callbackFn
                break;

            case 'audio.recordStop':
                this.deviceFileSourceEventMethods.audio_recordStop = callbackFn
                break;

            case 'audio.recordSaved':
                this.deviceFileSourceEventMethods.audio_recordSaved = callbackFn
                break;

            case 'audio.recordCancel':
                this.deviceFileSourceEventMethods.audio_recordCancel = callbackFn
                break;

            case 'screen.recordingStarted':
                this.deviceFileSourceEventMethods.screen_recordingStarted = callbackFn
                break;

            case 'screen.recording':
                this.deviceFileSourceEventMethods.screen_recording = callbackFn
                break;

            case 'screen.recordStop':
                this.deviceFileSourceEventMethods.screen_recordStop = callbackFn
                break;

            case 'screen.recordSaved':
                this.deviceFileSourceEventMethods.screen_recordSaved = callbackFn
                break;

            case 'screen.recordCancel':
                this.deviceFileSourceEventMethods.screen_recordCancel = callbackFn
                break;

            case 'upload.beforeStart':
                this.eventMethods.upload_beforeStart = callbackFn
                break;

            case 'upload.progress':
                this.eventMethods.upload_progress = callbackFn
                break;

            case 'upload.success':
                this.eventMethods.upload_success = callbackFn
                break;

            case 'upload.error':
                this.eventMethods.upload_error = callbackFn
                break;

            case 'upload.retry':
                this.eventMethods.upload_retry = callbackFn
                break;

            case 'upload.all_finished':
                this.eventMethods.upload_all_finished = callbackFn
                break;

            case 'file_source.closed':
                this.eventMethods.file_source_closed = callbackFn
                break;

            case 'default_ui.shown':
                this.eventMethods.default_ui_shown = callbackFn
                break;

            case 'default_ui.closed':
                this.eventMethods.default_ui_closed = callbackFn
                break;
        
            default:
                break;
        }
    }

    /////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////// Methods ////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////

    /**
     * @method upload - the method to upload file to the endpoint
     * @param {string | undefined} file_id - the id of the file to upload in the case of a single file, all the files will be uploaded serially if not provided
     */
    upload (file_id) {
        const file = this.selectedFiles.find(fl => fl.id == file_id)
        this.fileUploadHandler(file)
    }

    /**
     * @method retry_upload - to retry uploading a file
     * @param {string} file_id - the id of the file to retry
     */
    retry_upload (file_id) {
        const file = this.selectedFiles.find(f => f.id == file_id)
        const retry_upload_file_element = this.fileDisplayUIEl?.querySelector(`#${file.id}`).querySelector('._custup_file_ui').querySelector('.retry_upload_overlay_ui')
        this.handleRetryFileUpload(file, retry_upload_file_element)
    }

    /**
     * @method show_add_file_ui - the method to open the add new file UI
     */
    show_add_file_ui () {
        this.handleAddNewFileButton()
    }

    /**
     * @method preview_file - the method to preview a file
     * @param {string} file_id - the file ID
     */
    preview_file (file_id) {
        const file = this.selectedFiles.find(f => f.id == file_id)
        if (!this.is_file_previewable(file)) return;
        this.makeFilePreviewer(file);
    }

    /**
     * @method get_selected_files - return all the selected files
     */
    get_selected_files () {
        return this.selectedFiles
    }

    /**
     * @method get_default_files - return all the default files
     */
    get_default_files () {
        return this.defaultFiles
    }

    /**
     * @method get_all_files - return all the selected files
     */
    get_all_files () {
        return [...this.selectedFiles, ...this.defaultFiles]
    }

    /**
     * @method clear_files - clear all files
     */
    clear_files () {
        this.handleClearAllFiles()
    }

    /**
     * @private @method _get_total_file_count - get total number of added files
     * @returns {number}
     */
    _get_total_file_count () {
        return this.options.count_default_files ? this.selectedFiles.length + this.defaultFiles.length : this.selectedFiles.length
    }

    /**
     * @method get_total_file_count - get total number of added files
     * @returns {number}
     */
    get_total_file_count () {
        return this._get_total_file_count()
    }

    /**
     * @method get_upload_unsuccessful_files_count - get total number of files that were not uploaded due to an error
     * @returns {number}
     */
    get_upload_unsuccessful_files_count () {
        return this.filesNotSent.length
    }

    /**
     * @method get_successfully_uploaded_files_count - get total number of files that were successfully uploaded
     * @returns {number}
     */
    get_successfully_uploaded_files_count () {
        return this.successfullyUploadedFiles.length
    }

    /**
     * @method get_upload_unsuccessful_files - get the files that were not uploaded due to an error
     * @returns {number}
     */
    get_upload_unsuccessful_files () {
        return this.filesNotSent
    }

    /**
     * @method get_successfully_uploaded_files - get the files that were successfully uploaded
     * @returns {number}
     */
    get_successfully_uploaded_files () {
        return this.successfullyUploadedFiles
    }

    /**
     * @method remove_file - remove file from the UI
     * @param {string} file_id - the id of the file to be removed
     * @param {Function} callback_fn - the callback that will be called after the file has been removed from the UI
     */
    remove_file (file_id, callback_fn) {
        let file = this.selectedFiles.find(f => f.id == file_id)
        file = file === undefined ? this.defaultFiles.find(f => f.id == file_id) : file
        this.handleRemoveFile(file, callback_fn)
    }

    /**
     * @method add_file - add a file to the UI
     * @param {File} file 
     * @param {boolean} [skip_file_check=false] 
     * @param {number | null} [index=null] 
     */
    add_file (file, skip_file_check=false, index=null) {
        const fileArr = Array.isArray(file) ? file : [file]
        if (skip_file_check === true) {
            fileArr.map(file => this.addFileToUI(file, undefined, index))
        }else{
            this.handle_selected_files(fileArr, undefined, undefined, index)
        }
    }

    /**
     * @method record_video - launch the video recording UI
     */
    record_video () {
        this.handleMediaSource('video')
    }

    /**
     * @method record_audio - launch the audio recording UI
     */
    record_audio () {
        this.handleMediaSource('audio')
    }

    /**
     * @method capture_image - launch the image capture UI
     */
    capture_image () {
        this.handleMediaSource('image')
    }

    /**
     * @method record_screen - launch the screen recorder UI
     */
    record_screen () {
        this.handleMediaSource('screen')
    }

    /**
     * @method launch_url_source - launch the URL file source UI
     */
    launch_url_source () {
        this.handleExternalSource('url')
    }

    /**
     * @method launch_dropbox_source - launch the Dropbox file source UI
     */
    launch_dropbox_source () {
        this.handleExternalSource('dropbox')
    }

    /**
     * @method launch_box_source - launch the Box file source UI
     */
    launch_box_source () {
        this.handleExternalSource('box')
    }

    /**
     * @method launch_dalle_source - launch the OpenAI Dall.E file source UI
     */
    launch_dalle_source () {
        this.handleExternalSource('dalle')
    }

    /**
     * @method clear_persisted_files
     */
    clear_persisted_files () {
        this.clear_files_from_storage();
    }

    /**
     * @method select_file_from_device
     */
    select_file_from_device () {
        this._select_file_from_device();
    }

    /**
     * @method close_file_source_popup
     */
    close_file_source_popup () {
        this._custup_external_source_instance?.destroyContainerUI(true);
        this._custup_media_source_instance?.closeMediaPopup(true); // destroy CustUpMediaSource instance if already exists
    }

    /**
     * @method hide_add_file_ui
     */
    hide_add_file_ui () {
        this.removeDefaultUI();
    }

    /**
     * @method is_add_file_ui_shown
     * @returns {boolean}
     */
    is_add_file_ui_shown () {
        return this.is_default_ui_shown;
    }

    /**
     * @method get_file_sources - Returns all the allowed file sources icons wrapped in HTML element
     * @param {HTMLElement | null} iconsContainer - An HTML element to automatically append the icons to
     * @param {Function | null} allElOnClick - A callback function to be attached to the onClick event of every icons
     * @param {Object<Function | {}>} additionalElOnClickEv - An object containing the function to be attached to the onClick event of the specified icons
     * @returns {Array<HTMLElement>}
     */
    get_file_sources (iconsContainer=null, allElOnClick=null, additionalElOnClickEv = {}) {
        const file_sources = []
        
        const file_sources_arr = {
            record_video: () => {
                const recordVideoIcon = document.createElement('div')
                recordVideoIcon.innerHTML = this.options.file_source_icons.video_camera
                recordVideoIcon.title = `Record Video`
                recordVideoIcon.onclick = (e) => {
                    e.stopPropagation(); 
                    this.handleMediaSource('video');
                    additionalElOnClickEv['record_video'] && additionalElOnClickEv['record_video'](e);
                    allElOnClick && allElOnClick(e);
                }
                iconsContainer && iconsContainer.append(recordVideoIcon);
                file_sources.push(recordVideoIcon);
            },
            capture_image: () => {
                const captureImageIcon = document.createElement('div')
                captureImageIcon.innerHTML = this.options.file_source_icons.capture_image 
                captureImageIcon.title = `Capture Image`
                captureImageIcon.onclick = (e) => {
                    e.stopPropagation(); 
                    this.handleMediaSource('image');
                    additionalElOnClickEv['capture_image'] && additionalElOnClickEv['capture_image'](e);
                    allElOnClick && allElOnClick(e);
                }
                iconsContainer && iconsContainer.append(captureImageIcon);
                file_sources.push(captureImageIcon);
            },
            record_audio: () => {
                const recordAudioIcon = document.createElement('div')
                recordAudioIcon.innerHTML = this.options.file_source_icons.record_audio
                recordAudioIcon.title = `Record Audio`
                recordAudioIcon.onclick = (e) => {
                    e.stopPropagation(); 
                    this.handleMediaSource('audio');
                    additionalElOnClickEv['record_audio'] && additionalElOnClickEv['record_audio'](e);
                    allElOnClick && allElOnClick(e);
                }
                iconsContainer && iconsContainer.append(recordAudioIcon);
                file_sources.push(recordAudioIcon);
            },
            record_screen: () => {
                const recordScreenIcon = document.createElement('div')
                recordScreenIcon.innerHTML = this.options.file_source_icons.record_screen
                recordScreenIcon.title = `Record Screen`
                recordScreenIcon.onclick = (e) => {
                    e.stopPropagation(); 
                    this.handleMediaSource('screen');
                    additionalElOnClickEv['record_screen'] && additionalElOnClickEv['record_screen'](e);
                    allElOnClick && allElOnClick(e);
                }
                iconsContainer && iconsContainer.append(recordScreenIcon);
                file_sources.push(recordScreenIcon);
            },
            link_source: () => {
                const linkSourceIcon = document.createElement('div')
                linkSourceIcon.innerHTML = this.options.file_source_icons.url_source
                linkSourceIcon.title = `Link`
                linkSourceIcon.onclick = (e) => {
                    e.stopPropagation(); 
                    this.handleExternalSource("url");
                    additionalElOnClickEv['link_source'] && additionalElOnClickEv['link_source'](e);
                    allElOnClick && allElOnClick(e);
                }
                iconsContainer && iconsContainer.append(linkSourceIcon);
                file_sources.push(linkSourceIcon);
            },
            google_drive_source: () => {
                const googleDriveSourceIcon = document.createElement('div')
                googleDriveSourceIcon.innerHTML = this.options.file_source_icons.google_drive_source
                googleDriveSourceIcon.title = `Google Drive`
                googleDriveSourceIcon.onclick = (e) => {
                    e.stopPropagation(); 
                    this.handleExternalSource('google_drive');
                    additionalElOnClickEv['google_drive_source'] && additionalElOnClickEv['google_drive_source'](e);
                    allElOnClick && allElOnClick(e);
                }
                iconsContainer && iconsContainer.append(googleDriveSourceIcon);
                file_sources.push(googleDriveSourceIcon);
            },
            dropbox_source: () => {
                const dropboxSourceIcon = document.createElement('div')
                dropboxSourceIcon.innerHTML = this.options.file_source_icons.dropbox_source
                dropboxSourceIcon.title = `Dropbox`
                dropboxSourceIcon.onclick = (e) => {
                    e.stopPropagation(); 
                    this.handleExternalSource('dropbox');
                    additionalElOnClickEv['dropbox_source'] && additionalElOnClickEv['dropbox_source'](e);
                    allElOnClick && allElOnClick(e);
                }
                iconsContainer && iconsContainer.append(dropboxSourceIcon);
                file_sources.push(dropboxSourceIcon);
            },
            box_source: () => {
                const boxSourceIcon = document.createElement('div')
                boxSourceIcon.innerHTML = this.options.file_source_icons.box_source 
                boxSourceIcon.title = `Box`
                boxSourceIcon.onclick = (e) => {
                    e.stopPropagation(); 
                    this.handleExternalSource('box');
                    additionalElOnClickEv['box_source'] && additionalElOnClickEv['box_source'](e);
                    allElOnClick && allElOnClick(e);
                }
                iconsContainer && iconsContainer.append(boxSourceIcon);
                file_sources.push(boxSourceIcon);
            },
            openai_dalle_source: () => {
                const openAIDALLESourceIcon = document.createElement('div')
                openAIDALLESourceIcon.innerHTML = this.options.file_source_icons.openai_dalle_source
                openAIDALLESourceIcon.title = `DALL.E`
                openAIDALLESourceIcon.onclick = (e) => {
                    e.stopPropagation(); 
                    this.handleExternalSource('dalle');
                    additionalElOnClickEv['openai_dalle_source'] && additionalElOnClickEv['openai_dalle_source'](e);
                    allElOnClick && allElOnClick(e);
                }
                iconsContainer && iconsContainer.append(openAIDALLESourceIcon);
                file_sources.push(openAIDALLESourceIcon);
            }
        }

        if (this.options.allowed_sources.length > 0) {
            this.options.allowed_sources.map(source => file_sources_arr[source]());              
        }else{
            Object.keys(file_sources_arr).forEach(source => file_sources_arr[source]())
        }

        return file_sources;
    }

    /**
     * @public @method display_message - display pop up message
     * @param {string} msg - The message to be displayed
     * @param {"error" | "success" | "info"} type - The message type
     * @param {boolean} async - for async messages that doesn't hide until the request is done
     * @param {number} timeout - timeout for hiding the message
     * @returns {Function | void}
     */
    display_message (msg, type, async = false, timeout = this.options.messages.timeout) {
        return this.show_message(msg, type, async, timeout)
    }
}

