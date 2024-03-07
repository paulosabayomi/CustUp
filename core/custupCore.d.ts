export default class CustUpCore extends EventTarget {
    /**
     * Pass parameters
     *
     * @typedef {import('../types/types-jsdoc.js').TCustupOptions} TCustupOptions
     *
     * @param {TCustupOptions}  passedOptions
     *
     * @param autoInitialize - Whether to automatically initialize the library
     *
     * @param disable_scrollbar - Whether to show or not show scrollbar
     *
     * @param persist_default_ui - Whether to show or not remove the default UI should be closable
     *
     * @param use_default_file_display_ui - Whether to use default file display UI
     *
     * @param _custupDefaultUploadSentence - The HTML Element that holds default text that displays on the default UI
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
     * @param css_font_link - To set the CSS font link to be used by CustUp
     *
     * @param css_font_name - To set the CSS font name to be used by CustUp
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
     * @param file_upload_settings - options to handle file upload
     * @param upload_automatically - whether to upload file to the server automatically
     * @param show_upload_error_overlay - whether to show upload error overlay: defaults to true
     * @param show_upload_progress_bar - whether to show progress bar overlay over file display container
     * @param file_source_icons - customize any file source icon of your choice
     * @param display_ui_tools - whether to display UI tool or not
     * @param allowed_tools - tools to display, an empty array displays all tools
     * @param allowed_sources - For setting the file sources that should be listed on the UI
     * @param display_file_sources - Whether to display file source icons on the default UI
     * @param disable_drag_n_drop - Whether to allow drag and drop feature or not
     * @param disable_select_files_from_device - Whether to disable select files from device feature that get called when the default UI is being clicked
     *
     * @param default_files - array of files to be added by default after initialization
     *
     * @param file_source_config - To configure/setup the file sources, like to provide API keys and other stuffs
     *
     * @param count_default_files - whether default added files should be counted as part of the added files - defaults to true
     *
     * @param instance_attach - instances of other custup instances - majorly for attaching files
     * @param single_upload - whether to upload all files at the same time including other data
     * @param persist_files - whether to persist files and restore files when user refreshes the page or after the library finished initialization if the persist type is hard
     * @param persist_type - set the persist type to either soft or hard, if hard it will use localstorage else it will use session storage
     * @param alert_timeout_time - the timeout for Custup alerts default is 300ms
     * @param messages - For configuring the CustUp messages or notifications
     *
    */
    constructor(passedOptions: import("../types/types-jsdoc.js").TCustupOptions);
    /**
     * Custup library name - !!! Please do not change !!!
     * @private @param {string} libraryName - Custup library name
     */
    private libraryName;
    /**
     * Array that holds default loaded files
     * @protected @property {File[]} defaultFiles
     */
    protected defaultFiles: any[];
    /**
     * Array that holds all selected files
     * @protected @property {File[]} selectedFiles
     */
    protected selectedFiles: any[];
    /**
     * Array that holds that could not be sent because of an error
     * @protected @property {File[]} filesNotSent
     */
    protected filesNotSent: any[];
    /**
     * An array that holds successfully uploaded files
     * @protected @property {File[]} successfullyUploadedFiles
     */
    protected successfullyUploadedFiles: any[];
    /**
     * An array that holds successfully uploaded files
     * @protected @property {File[]} currentlyUploadingFiles
     */
    protected currentlyUploadingFiles: any[];
    /**
     * UI messages items offset counter
     * @private @property {number} last_message_el_offset_bottom
     */
    private last_message_el_offset_bottom;
    /**
     * Custup FormData for uploading files
     * @private @property {FormData} file_upload_form_data
     */
    private file_upload_form_data;
    /**
     * Custup UI styles
     * @protected @property {FormData} ui_styles
     */
    protected ui_styles: {
        outerContainer: string;
        innerContainer: string;
        sidebarLeftContainer: string;
        sidebarRightContainer: string;
        custupInnerContainerWrapperEl: string;
        headerContainer: string;
        footerContainer: string;
        close_popup_btn: string;
        scrollBarEl: string;
        defaultUI: string;
        defaultUIInnerContentEl: string;
        defaultUIUploadSentenceContainer: string;
        defaultUIUploadIconsContainer: string;
        fileDisplayUI: string;
        fileUIOuterContainer: string;
        fileDetailsContainer: string;
        custup_fileName: string;
        custup_fileSize: string;
        fileBottomDetails: string;
        fileUIBottomToolsContainer: string;
        file_wrapper_el: string;
        fileUI: string;
        remove_file_btn: string;
        file_upload_overlay_ui: string;
        file_upload_overlay_inner_container: string;
        upload_progress_container: string;
        file_upload_progress: string;
        file_upload_progress_inner: string;
        retry_upload_overlay_ui: string;
        retry_upload_button: string;
        message_container: string;
        filePreviewer: string;
        filePreviewerInnerContainer: string;
    };
    /**
     * Custup UI icons
     * @protected @property {FormData} ui_icons
     */
    protected ui_icons: {
        add_file: string;
        add_file_2: string;
        add_file_filled: string;
        delete_filled: string;
        delete: string;
        edit: string;
        eye: string;
        retry: string;
        warning: string;
        success: string;
        info: string;
        error: string;
        send: string;
        clear: string;
        cancel: string;
        remove: string;
        plus: string;
        video_file: string;
        audio_file: string;
        pdf_file: string;
        txt_file: string;
        docx_file: string;
        excel_file: string;
        ppt_file: string;
        pptx_file: string;
        html_file: string;
        rar_file: string;
        psd_file: string;
        eps_file: string;
        csv_file: string;
        css_file: string;
        javascript_file: string;
        unknown_file: string;
        exe_file: string;
        dmg_file: string;
        bin_file: string;
        zip_file: string;
        '7z_file': string;
        tar_file: string;
        video_camera: string;
        photo_camera: string;
        check: string;
        dot: string;
        stop: string;
        refresh: string;
        audio: string;
        screen_recording: string;
        link: string;
        clipboard: string;
        google_drive: string;
        /**
         * @protected @method show_message
         * @param {string} msg
         * @param {"error" | "success" | "info"} type
         * @param {boolean} async - for async messages that doesn't hide until the request is done
         * @param {number} timeout - timeout for hiding the message
         */
        dropbox: string;
        box_icon: string;
        onedrive: string;
        openai_logo: string;
        red_circle_cancel: string;
        upload_circle: string;
        loading_partial: string;
        desktop_device: string;
        mobile_device: string;
        search_icon: string;
        bars: string;
    };
    /**
     * Custup Axios instance for file upload
     * @private @property {axios} __axios_instance
     */
    private __axios_instance;
    /**
     * @private @property {Object} file_chunks
     */
    private file_chunks;
    /**
     * @private @property {Object} file_progress
     */
    private file_progress;
    /**
     * @private @property {any} _custup_media_source_instance
     */
    private _custup_media_source_instance;
    /**
     * @private @property {any} _custup_external_source_instance
     */
    private _custup_external_source_instance;
    /**
     * @private @property {any} _is_secured_context
     */
    private _is_secured_context;
    /**
     * @protected @property {typeof eventNames} event_names
     */
    protected event_names: {
        library_init: string;
        library_beforeInit: string;
        file_beforeAdded: string;
        file_afterAdded: string;
        file_beforePassedChecks: string;
        file_removed: string;
        file_defaultFileRemoved: string;
        file_all_removed: string;
        upload_beforeStart: string;
        upload_progress: string;
        upload_success: string;
        upload_error: string;
        upload_retry: string;
        upload_all_finished: string; /**
         * Custup FormData for uploading files
         * @private @property {FormData} file_upload_form_data
         */
        file_source_closed: string;
        default_ui_shown: string;
        default_ui_closed: string;
        video_recordingStarted: string;
        video_recording: string;
        video_recordStop: string;
        video_recordSaved: string;
        video_recordCancel: string;
        image_captured: string;
        audio_recordingStarted: string;
        audio_recording: string;
        audio_recordStop: string;
        audio_recordSaved: string;
        audio_recordCancel: string;
        screen_recordingStarted: string; /**
         * @private @property {any} _custup_media_source_instance
         */
        screen_recording: string;
        screen_recordStop: string;
        screen_recordSaved: string;
        screen_recordCancel: string;
    };
    _custupEl: undefined;
    _custupHeaderEl: undefined;
    _custupFooterEl: undefined;
    _custupSidebarLeftEl: undefined;
    _custupSidebarRightEl: undefined;
    _custupInnerEl: undefined;
    _custupInnerContainerWrapperEl: undefined;
    _custupDefaultUIEl: undefined;
    _custupDefaultUIInnerContentEl: undefined;
    fileDisplayUIEl: undefined;
    numberOfFilesDisplayTool: undefined;
    clearAllFilesBtnTool: undefined;
    addFilesUITool: undefined;
    uploadFilesToServerTool: undefined;
    close_popup_btn: undefined;
    /**
     * @private @property {Array} file_preview_animation_arr
     */
    private file_preview_animation_arr;
    /**
     * @private @property {boolean} is_default_ui_shown
     */
    private is_default_ui_shown;
    /**
     * @private @property {Object} previewerAnimations
     */
    private previewerAnimations;
    /**
     * @private @property {number} fileDisplayUIElCurrentScrollHeight
     */
    private fileDisplayUIElCurrentScrollHeight;
    /**
     * @public @property {number} scrollBarEl
     */
    public scrollBarEl: undefined;
    /** Custup Options
     * @protected @param {{}} options
    */
    protected options: {
        autoInitialize: boolean;
        disable_scrollbar: boolean;
        persist_default_ui: boolean;
        use_default_file_display_ui: boolean;
        position_container: undefined;
        ui_type: string;
        _custupDefaultUploadSentence: string;
        default_styles_override: {};
        persist_styles_override_across_instances: boolean;
        external_source_style_override: undefined;
        media_capture_source_style_override: undefined;
        default_icons_override: {};
        show_preview_file_btn: boolean;
        show_file_remove_btn: boolean;
        show_file_details_container: boolean;
        file_preview_animation_types: never[];
        display_ui_tools: boolean;
        disable_drag_n_drop: boolean;
        disable_select_files_from_device: boolean;
        allowed_tools: never[];
        show_ui_tools_on_mobile_devices: boolean;
        file_source_icons: {
            video_camera: string;
            capture_image: string;
            record_audio: string;
            record_screen: string;
            url_source: string;
            google_drive_source: string;
            dropbox_source: string;
            box_source: string;
            openai_dalle_source: string;
        };
        allowed_sources: never[];
        display_file_sources: boolean;
        file_source_config: {
            video_recording: {
                video_only: boolean;
                show_image_capture_btn: boolean;
            };
            capture_image: {};
            record_audio: {};
            record_screen: {};
            url_source: {};
            google_drive_source: {
                authConfig: {
                    client_id: string;
                    api_key: string;
                    app_id: string;
                    scopes: string;
                };
            };
            dropbox_source: {
                authConfig: {
                    appKey: string;
                };
                options: {
                    cancel: () => void;
                };
            };
            box_source: {
                authConfig: {
                    developerToken: string;
                    cssLink: string;
                    jsLink: string;
                    folder_id: string;
                };
                pickerConfig: {
                    chooseButtonLabel: string;
                    sortBy: string;
                    sortDirection: string;
                    logoUrl: string;
                    extensions: never[];
                    maxSelectable: number;
                    canUpload: boolean;
                    canSetShareAccess: boolean;
                    canCreateNewFolder: boolean;
                    sharedLink: string;
                    sharedLinkPassword: string;
                    modal: string;
                    size: undefined;
                    isTouch: boolean;
                    autoFocus: boolean;
                    defaultView: string;
                    cancelButtonLabel: undefined;
                    requestInterceptor: undefined;
                    responseInterceptor: undefined;
                };
            };
            openai_dalle_source: {
                endpoint: string;
                api_key: string;
                size: string;
                n: number;
                model: string;
                quality: string;
            };
        };
        css_font_link: string;
        css_font_name: string;
        allowed_file_types: never[];
        targetRootElement: undefined;
        maxNumberOfFiles: undefined;
        minNumberOfFiles: undefined;
        minimumAllowedFileSize: undefined;
        maximumAllowedFileSize: undefined;
        allowMultipleUpload: boolean;
        file_upload_settings: {
            endpoint_url: string;
            files_field_name: string;
            form_field: string;
            additional_data: {};
            axios_settings: {
                headers: {};
                configs: {};
            };
            chunk_size: number;
            should_chunk: boolean;
        };
        upload_automatically: boolean;
        show_upload_error_overlay: boolean;
        show_upload_progress_bar: boolean;
        default_files: never[];
        count_default_files: boolean;
        instance_attach: never[];
        single_upload: boolean;
        persist_files: boolean;
        persist_type: string;
        alert_timeout_time: number;
        messages: {
            timeout: number;
        };
    };
    /**
     * @private getRandChars
     * @param {string} identifyer
     * @returns {string}
     */
    private getRandChars;
    /**
     * @protected loadFont
     */
    protected loadFont(): void;
    /**
     * @public @method setOptions
     * @typedef {import('../types/types-jsdoc.js').TCustupOptions} TCustupOptions
     * @param {TCustupOptions} option - The option(s) to update
     * @param {boolean} [no_update=false] - To set whether the function that needs to be called for some options to be updated should be called, the functions are called by default
     * @returns {void}
     */
    public setOptions(option: import("../types/types-jsdoc.js").TCustupOptions, no_update?: boolean | undefined): void;
    /**
     * @private @method setObjectValue
     * @param {Object} objectParent - The Object to update
     * @param {Object} value - The object holding the values to update to target object
     * @returns {Object}
     */
    private setObjectValue;
    /**
     * @protected @method map_override_styles_to_default_styles - maps the provided styles to the default styles
     * @param {Object} o_style - The style to map to the default styles
     */
    protected map_override_styles_to_default_styles(o_style: Object): void;
    /**
     * @protected @method map_override_icons_to_default_icons - Maps the provided icons to the current icons
     */
    protected map_override_icons_to_default_icons(): void;
    /**
     * @protected @method load_default_files - Loads default files
     */
    protected load_default_files(): void;
    /**
     * @protected @method update_file_storage - updates the added files to the browser Storage
     */
    protected update_file_storage(): Promise<void>;
    /**
     * @protected @method read_files_from_storage - reads and loads files from browser Storage
     */
    protected read_files_from_storage(): void;
    /**
     * @protected @method remove_file_from_storage - removes file from the browser Storage
     * @param {string} file_id - the id of the file to remove
     */
    protected remove_file_from_storage(file_id: string): void;
    /**
     * @protected @method clear_files_from_storage - clears all files from the browser Storage
     */
    protected clear_files_from_storage(): void;
    /**
     * @public initializeUI
     */
    public initializeUI(): this | undefined;
    /**
     * @protected showDefaultUI
     * @param {boolean} after_container_init - a boolean to specify if the calcel icon should be added to the
       content container
     */
    protected showDefaultUI(after_container_init?: boolean): void;
    /**
     * @protected removeDefaultUI
     */
    protected removeDefaultUI(): void;
    /**
     * @protected @method set_file_preview_animations
     */
    protected set_file_preview_animations(override?: boolean): void;
    /**
     * @protected @method handleRecordVideo
     * @param {'video' | 'image' | 'audio' | 'screen'} type
     */
    protected handleMediaSource(type: 'video' | 'image' | 'audio' | 'screen'): void;
    /**
     * @protected @method handleOpenaiDALLESource
     * @param {'url' | 'onedrive' | 'google_drive' | 'clipboard' | 'box' | 'dalle' | 'dropbox'} type - source type
     */
    protected handleExternalSource(type: 'url' | 'onedrive' | 'google_drive' | 'clipboard' | 'box' | 'dalle' | 'dropbox'): void;
    /**
     * @protected @method makeFileDisplayUI
     */
    protected makeFileDisplayUI(): void;
    /**
     * @protected @method set_scroll_pointer_event
     * @param {HTMLElement} el
     */
    protected set_scroll_pointer_event(el: HTMLElement, targetEl?: undefined, targetScrollBarEl?: undefined): void;
    layerMoved: any;
    /**
     * @protected @method make_ui_tools
     */
    protected make_ui_tools(): void;
    /**
     * @protected @method handleAddNewFileButton
     */
    protected handleAddNewFileButton(): (() => void) | undefined;
    /**
     * @protected @method attempt_clear_mobile_tools - This methods clears the ui tools if on mobile devices, if no tools were displayed it does nothing
     */
    protected attempt_clear_mobile_tools(): void;
    /**
     * @protected handleClearAllFiles
     * @param {MouseEvent | null} e
     */
    protected handleClearAllFiles(): void;
    /**
     * @protected setNumberOfFiles
     * @param {boolean} file_removed
     */
    protected setNumberOfFiles(file_removed?: boolean): void;
    /**
     * @protected @method createScrollBar
     * @param {HTMLElement | undefined} targetEl - The scrollbar parent container
     * @returns {HTMLElement}
     */
    protected createScrollBar(targetEl?: HTMLElement | undefined): HTMLElement;
    /**
     * @protected @method updateScrollbarHeight
     * @param {HTMLElement} targetEl - The scrollbar parent container
     */
    protected updateScrollbarHeight(targetEl?: HTMLElement): void;
    /**
     * @protected @method handleCustomScroll
     * @param {Event} e - Mouse wheel event or touch event for touch devices
     * @param {HTMLElement | undefined} targetEl - The scrolling container parent container
     * @param {HTMLElement | undefined} targetScrollBarEl - The main scroll bar element
     */
    protected handleCustomScroll(e: Event, targetEl?: HTMLElement | undefined, targetScrollBarEl?: HTMLElement | undefined): void;
    /**
     * @protected @method handleInnerElementContainerMouseUp
     */
    protected handleInnerElementContainerMouseUp(e: any): void;
    /**
     * @protected @method addFileToUI
     * @param {File} file
     * @param {boolean} isUploadable
     * @param {number | null} index
     */
    protected addFileToUI(file: File, isUploadable?: boolean, index?: number | null): void;
    /**
     * @public @method is_file_previewable
     * @param {File} file - The file to check whether CustUp can preview it
     * @returns {boolean}
     */
    public is_file_previewable(file: File): boolean;
    /**
     * @protected @method file_display_width_setter
     * @param {HTMLElement} el - The file display width setter only for default UI type
     */
    protected file_display_width_setter(el: HTMLElement): void;
    /**
     * @protected @method makeFileDisplayElement
     * @param {File} file - file data of the file to display
     * @param {HTMLDivElement} fileContainer
     * @param {ArrayBuffer} fileBase64 - optional to be provided only for image files
     */
    protected makeFileDisplayElement(file: File, fileContainer: HTMLDivElement, fileBase64: ArrayBuffer): void;
    /**
     * @protected @method makeFilePreviewer
     * @param {File} file - File object of the element to be previewed
     */
    protected makeFilePreviewer(file: File): void;
    /**
     * @protected @method getFileIcon
     * @param {string} file_type - the full file type of the file to return its icons
     * @returns {SVGElement}
     */
    protected getFileIcon(file_type: string): SVGElement;
    /**
     * @protected @method handleRemoveFile
     * @param {File} fileData
     * @param {Function} callback_fn
     */
    protected handleRemoveFile(fileData: File, callback_fn?: Function): void;
    /**
     * Removes unwanted characters from file name
     * @protected @method cleanFileName
     * @param {string} file_name - the file name to remove unwanted characters from
     * @returns {string}
     */
    protected cleanFileName(file_name: string): string;
    /**
     * @protected @method get_unique_uuid
     * @returns {string}
     */
    protected get_unique_uuid(): string;
    /**
     * @protected @method clipFileNameIfShouldClip
     * @param {string} file_name
     * @returns {string}
     */
    protected clipFileNameIfShouldClip(file_name: string): string;
    /**
     * /// Postponed
     * @protected @method changeFileElementPosition
     * @param {Event} e
     */
    protected changeFileElementPosition(e: Event): void;
    /**
     * @protected @method handleFileUIDragOver
     * @param {Event} e
     */
    protected handleFileUIDragOver(e: Event): void;
    /**
     * @protected @method handleFileUIDragOver
     * @param {Event} e
     */
    protected handleFileUIDropped(e: Event): void;
    /**
     *
     * @private @method set_class_name
     *
     * @param style_key_name string the name of the style
     * @param element_to_style HTMLElement
     * @returns {void}
     *
     */
    private set_class_name;
    /**
     * @private @method get_element_class_name
     * @param {string} style_key_name
     * @returns {string}
     */
    private get_element_class_name;
    /**
     * @protected @method _select_file_from_device
     * @param {MouseEvent | TouchEvent} e
     */
    protected _select_file_from_device(e: MouseEvent | TouchEvent): void;
    /**
     * @protected @method handle_drag_over
     * @param {DragEvent} e
     */
    protected handle_drag_over(e: DragEvent): void;
    /**
     * @protected @method handle_drag_leave
     * @param {DragEvent} e
     */
    protected handle_drag_leave(e: DragEvent): void;
    /**
     * @protected @method show_message
     * @param {string} msg
     * @param {"error" | "success" | "info"} type
     * @param {boolean} async - for async messages that doesn't hide until the request is done
     * @param {number} timeout - timeout for hiding the message
     */
    protected show_message(msg: string, type: "error" | "success" | "info", async?: boolean, timeout?: number): (() => void) | undefined;
    /**
     * @protected @method message_element_exit_call
     * This method is executed when a message element is exiting
     * @param {HTMLElement} message_container
     */
    protected message_element_exit_call(message_container: HTMLElement): void;
    /**
     * @protected @method handle_file_drop
     * @param {Event} e
     */
    protected handle_file_drop(e: Event): void;
    /**
     * @property @method isfileAreadyAdded
     * @param {File} file
     */
    isfileAreadyAdded(file: File): boolean;
    /**
     * @protected @method parseFileSize
     * @param {number} size
     */
    protected parseFileSize: (size: number) => string;
    /**
     * @private @method isFileTypeInAcceptedTypes
     * @param {File} file - the file to check its type
     */
    private isFileTypeInAcceptedTypes;
    /**
     * @protected @method handle_selected_files
     * @param {Array<File>} files
     * @param {Function | null} before_add_callback_fn
     * @param {boolean} isUploadable
     * @param {number | null} index
     */
    protected handle_selected_files(files: Array<File>, before_add_callback_fn?: Function | null, isUploadable?: boolean, index?: number | null): void;
    /**
     * @protected @method createFileUploadOverlay
     * @param {string} file_id - id of the file to add file upload overlay to
     * @returns {HTMLDivElement}
     */
    protected createFileUploadOverlay(file_id: string): HTMLDivElement;
    /**
     * @protected @method createRetryUploadOverlay
     * @param {File} file
     * @param {string} file_id - id of the file element to append the retry upload overlay to
     */
    protected createRetryUploadOverlay(file: File, file_id: string): void;
    /**
     * @protected @method isUploadConditionsSatisfied
     * @returns {boolean}
     */
    protected isUploadConditionsSatisfied(): boolean;
    /**
     * @protected @method handleUploadFile
     * @param {File} file - the file to be uploaded
     */
    protected handleUploadFile(file?: File): void;
    /**
     * @private @method handleUploadAllFiles
     * @returns {Promise<void>}
     */
    private handleUploadAllFiles;
    /**
     * @protected @method fileUploadHandler
     * @param {File} file - the file to be uploaded
     */
    protected fileUploadHandler(file?: File): void;
    /**
     * @protected @method handleRetryFileUpload
     * @param {File} file - Blob of the file to retry
     * @param {HTMLDivElement} retry_upload_overlay_ui - html element of the retry upload overlay
     */
    protected handleRetryFileUpload(file: File, retry_upload_overlay_ui: HTMLDivElement): void;
    /**
     * @protected @method configure_axios
     */
    protected configure_axios(): void;
    /**
     * @private @method get_attached_form_field
     */
    private get_attached_form_field;
    /**
     * @private @method handleUploadFileToEndpoint
     * @param {File} file - file to upload to the server
     * @param {HTMLDivElement} upload_element - html element containing elements to display upload data and status
     * @param {boolean} chunking
     */
    private handleUploadFileToEndpoint;
    /**
     * @private @method removeFileUploadOverlay
     * @param {HTMLDivElement} upload_element - html element of the overlay element
     * @param {HTMLDivElement} fileContainer - html element of the of the file container
     * @param {boolean} isSuccessful - boolean to specify if the request was successful or not
     */
    private removeFileUploadOverlay;
    /**
     * @protected @method handleUploadProgressEvent
     * @param {ProgressEvent} event - upload progress event
     * @param {HTMLDivElement} upload_element - HTML element to display the file upload status
     */
    protected handleUploadProgressEvent(event: ProgressEvent, upload_element: HTMLDivElement): void;
    /**
     * @public @method triggerEvent - triggers an event
     * @param {keyof eventNames} eventName - event name
     * @param {any} data - the callback function
     * @param {boolean} cancelable - whether the event should be cancelable with preventDefault
     */
    public triggerEvent(eventName: keyof {
        library_init: string;
        library_beforeInit: string;
        file_beforeAdded: string;
        file_afterAdded: string;
        file_beforePassedChecks: string;
        file_removed: string;
        file_defaultFileRemoved: string;
        file_all_removed: string;
        upload_beforeStart: string;
        upload_progress: string;
        upload_success: string;
        upload_error: string;
        upload_retry: string;
        upload_all_finished: string; /**
         * Custup FormData for uploading files
         * @private @property {FormData} file_upload_form_data
         */
        file_source_closed: string;
        default_ui_shown: string;
        default_ui_closed: string;
        video_recordingStarted: string;
        video_recording: string;
        video_recordStop: string;
        video_recordSaved: string;
        video_recordCancel: string;
        image_captured: string;
        audio_recordingStarted: string;
        audio_recording: string;
        audio_recordStop: string;
        audio_recordSaved: string;
        audio_recordCancel: string;
        screen_recordingStarted: string; /**
         * @private @property {any} _custup_media_source_instance
         */
        screen_recording: string;
        screen_recordStop: string;
        screen_recordSaved: string;
        screen_recordCancel: string;
    }, data?: any, cancelable?: boolean): boolean;
    /**
     * @method upload - the method to upload file to the endpoint
     * @param {string | undefined} file_id - the id of the file to upload in the case of a single file, all the files will be uploaded serially if not provided
     */
    upload(file_id: string | undefined): void;
    /**
     * @method retry_upload - to retry uploading a file
     * @param {string} file_id - the id of the file to retry
     */
    retry_upload(file_id: string): void;
    /**
     * @method show_add_file_ui - the method to open the add new file UI
     */
    show_add_file_ui(): void;
    /**
     * @method preview_file - the method to preview a file
     * @param {string} file_id - the file ID
     */
    preview_file(file_id: string): void;
    /**
     * @method get_selected_files - return all the selected files
     */
    get_selected_files(): any[];
    /**
     * @method get_default_files - return all the default files
     */
    get_default_files(): any[];
    /**
     * @method get_all_files - return all the selected files
     */
    get_all_files(): any[];
    /**
     * @method clear_files - clear all files
     */
    clear_files(): void;
    /**
     * @private @method _get_total_file_count - get total number of added files
     * @returns {number}
     */
    private _get_total_file_count;
    /**
     * @method get_total_file_count - get total number of added files
     * @returns {number}
     */
    get_total_file_count(): number;
    /**
     * @method get_upload_unsuccessful_files_count - get total number of files that were not uploaded due to an error
     * @returns {number}
     */
    get_upload_unsuccessful_files_count(): number;
    /**
     * @method get_successfully_uploaded_files_count - get total number of files that were successfully uploaded
     * @returns {number}
     */
    get_successfully_uploaded_files_count(): number;
    /**
     * @method get_upload_unsuccessful_files - get the files that were not uploaded due to an error
     * @returns {number}
     */
    get_upload_unsuccessful_files(): number;
    /**
     * @method get_successfully_uploaded_files - get the files that were successfully uploaded
     * @returns {number}
     */
    get_successfully_uploaded_files(): number;
    /**
     * @method remove_file - remove file from the UI
     * @param {string} file_id - the id of the file to be removed
     * @param {Function} callback_fn - the callback that will be called after the file has been removed from the UI
     */
    remove_file(file_id: string, callback_fn: Function): void;
    /**
     * @method add_file - add a file to the UI
     * @param {File} file
     * @param {boolean} [skip_file_check=false]
     * @param {number | null} [index=null]
     */
    add_file(file: File, skip_file_check?: boolean | undefined, index?: number | null | undefined): void;
    /**
     * @method record_video - launch the video recording UI
     */
    record_video(): void;
    /**
     * @method record_audio - launch the audio recording UI
     */
    record_audio(): void;
    /**
     * @method capture_image - launch the image capture UI
     */
    capture_image(): void;
    /**
     * @method record_screen - launch the screen recorder UI
     */
    record_screen(): void;
    /**
     * @method launch_url_source - launch the URL file source UI
     */
    launch_url_source(): void;
    /**
     * @method launch_dropbox_source - launch the Dropbox file source UI
     */
    launch_dropbox_source(): void;
    /**
     * @method launch_box_source - launch the Box file source UI
     */
    launch_box_source(): void;
    /**
     * @method launch_dalle_source - launch the OpenAI Dall.E file source UI
     */
    launch_dalle_source(): void;
    /**
     * @method clear_persisted_files
     */
    clear_persisted_files(): void;
    /**
     * @method select_file_from_device
     */
    select_file_from_device(): void;
    /**
     * @method close_file_source_popup
     */
    close_file_source_popup(): void;
    /**
     * @method hide_add_file_ui
     */
    hide_add_file_ui(): void;
    /**
     * @method is_add_file_ui_shown
     * @returns {boolean}
     */
    is_add_file_ui_shown(): boolean;
    /**
     * @public @method on - Custom and shothand event listener
     * @typedef {import('../utils/eventNames.js').TEventNames} TEventNames
     * @param {TEventNames} eventName
     * @param {(e: Event & {detail?: any}) => any} callback
     */
    public on(eventName: import("../utils/eventNames.js").TEventNames, callback: (e: Event & {
        detail?: any;
    }) => any): void;
    /**
     * @method get_file_sources - Returns all the allowed file sources icons wrapped in HTML element
     * @param {HTMLElement | null} iconsContainer - An HTML element to automatically append the icons to
     * @param {Function | null} allElOnClick - A callback function to be attached to the onClick event of every icons
     * @param {Object<Function | {}>} additionalElOnClickEv - An object containing the function to be attached to the onClick event of the specified icons
     * @returns {Array<HTMLElement>}
     */
    get_file_sources(iconsContainer?: HTMLElement | null, allElOnClick?: Function | null, additionalElOnClickEv?: any): Array<HTMLElement>;
    /**
     * @public @method display_message - display pop up message
     * @param {string} msg - The message to be displayed
     * @param {"error" | "success" | "info"} type - The message type
     * @param {boolean} async - for async messages that doesn't hide until the request is done
     * @param {number} timeout - timeout for hiding the message
     * @returns {Function | void}
     */
    public display_message(msg: string, type: "error" | "success" | "info", async?: boolean, timeout?: number): Function | void;
}
//# sourceMappingURL=custupCore.d.ts.map