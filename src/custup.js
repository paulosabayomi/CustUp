import CustUpCore from "../core/custupCore.js";
import _customStyles from "../utils/_customStyles.js";
import file_types from '../utils/filetypes.js'

export default class CustUp extends CustUpCore {
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
    * }}  options
    * 
    */ 
    constructor (options) {
        super(options);
        this.uiSelect();
    }

    /**
     * @private @method uiSelect
     */
    uiSelect () {
        switch (this.options.ui_type) {
            case 'resumeUploaderUI':
                this.resumeUploaderUI();
                break;
            case 'bare':
                this.bareUploaderUI();
                break;
            case 'detached':
                this.detachedUploaderUI();
                break;
            case 'profilePicture':
                this.profilePictureUI();
                break;
            case 'elegant':
                this.elegantUI();
                break;
            default:
                break;
        }
        this.map_override_styles_to_default_styles(this.options.default_styles_override)
        this.options.autoInitialize && this.initializeUI()
    }

    /**
     * @private @method resumeUploaderUI
     */
    resumeUploaderUI () {
        const style_override = {
            outerContainer: ['RUIOuterContainer', true],
            defaultUI: ['RUIDefaultUIEl', true],
            defaultUIUploadIconsContainer: ['RUIDefaultUIUploadIconsContainer', true]
        }
        this.map_override_styles_to_default_styles(style_override);
        this.options.display_file_sources = false;
        this.options._custupDefaultUploadSentence = `<div style="color: gray; line-height: 30px; pointer-events: none;">
            <div><b style="color: black;">Upload a file</b> or drag and drop here</div>
            <div>Accepted Files: ${this.options.allowed_file_types.length == 0 ? 'All' : this.options.allowed_file_types.join(', ').toUpperCase()}
            Up to ${this.parseFileSize(this.options.maximumAllowedFileSize)}
            </div>
        </div>`;
        this.options.allowed_tools = null;
        
        if (document.querySelector("[href*='all.min.']") === null && document.querySelector("[href*='resumeUploaderUI.']") === null) {
            console.warn(this.libraryName + ": Please include the resumeUploaderUI css file")
        }
    }

    /**
     * @private @method bareUploaderUI
     */
    bareUploaderUI () {
        const style_override = {
            outerContainer: ['BareUIOuterContainer', true],
            innerContainer: ['BareUIInnerContainer', true],
            defaultUI: ['BareUIDefaultUIEl', true],
            defaultUIUploadIconsContainer: ['BareUIDefaultUIUploadIconsContainer', true],
        }
        this.map_override_styles_to_default_styles(style_override);
        this.options.allowed_tools = null;
        this.options.display_file_sources = false;
        this.options.disable_scrollbar = true;

        const defaultUIInnerContentWrapper = document.createElement('div')
        const defaultUIInnerContent = document.createElement('div')
        defaultUIInnerContent.className = "BareUIDefaultUIInnerContent"
        const firstItem = document.createElement('div')
        firstItem.style.width = "50px";
        firstItem.style.height = "50px";
        firstItem.innerHTML = this.ui_icons.upload_circle
        const secondItem = document.createElement('div')
        secondItem.innerHTML = '<b style="color: black;">Drop files here</b>'
        const lastItem = document.createElement('div')
        lastItem.className = "BareUIDefaultUIInnerContentLastItem"
        lastItem.innerHTML = "or <span>Select files</span>"
        defaultUIInnerContent.appendChild(firstItem)
        defaultUIInnerContent.appendChild(secondItem)
        defaultUIInnerContent.appendChild(lastItem)
        defaultUIInnerContentWrapper.appendChild(defaultUIInnerContent)
        this.options._custupDefaultUploadSentence = defaultUIInnerContentWrapper.innerHTML;

        if (document.querySelector("[href*='all.min.']") === null && document.querySelector("[href*='bare.']") === null) {
            console.warn(this.libraryName + ": Please include the bare css file")
        }
    }

    /**
     * @private @method detachedUploaderUI
     */
    detachedUploaderUI () {
        const style_override = {
            outerContainer: ['DUIOuterContainer', true],
            innerContainer: ['DUIInnerContainer', true],
            custupInnerContainerWrapperEl: ['DUIInnerContainerWrapper', true],
            defaultUI: ['DUIDefaultUI', true],
            footerContainer: 'DUIFooterContainer',
            headerContainer: 'DUIHeaderContainer',
            file_wrapper_el: 'DHIFileInnerWrapper'
        }
        this.options.use_default_file_display_ui = false;
        this.options.persist_default_ui = true
        this.options.display_file_sources = false;

        const defaultContElWrapper = document.createElement('div')
        const defaultContElMain = document.createElement('div')
        defaultContElMain.style.lineHeight = "30px"
        const iconCont = document.createElement('div')
        iconCont.innerHTML = this.ui_icons.unknown_file
        iconCont.className = "DUIIconContainer"
        const textCont1 = document.createElement('div')
        textCont1.innerHTML = "Drag and drop your files here"
        textCont1.className = "DUITextContainer1"
        const textCont2 = document.createElement('div')
        textCont2.innerHTML = "or Click to browse from your computer"

        
        defaultContElMain.appendChild(iconCont)
        defaultContElMain.appendChild(textCont1)
        defaultContElMain.appendChild(textCont2)
        defaultContElWrapper.append(defaultContElMain)
        this.options._custupDefaultUploadSentence = defaultContElWrapper.innerHTML

        const button_container = document.createElement('div')
        button_container.className = "DUIBottomButtonContainer"

        const upload_btn = document.createElement('button');
        upload_btn.className = "DUIUploadButton";
        upload_btn.innerHTML = "Upload";
        upload_btn.type = "button";
        upload_btn.onclick = (e) => this.upload();

        const clear_all_btn = document.createElement('button')
        clear_all_btn.className = "DUIClearButton"
        clear_all_btn.innerHTML = "Clear"
        clear_all_btn.type = "button"
        clear_all_btn.onclick = () => {
            this.clear_files();
            button_container.style.display = 'none';
            this._custupFooterEl.querySelector('.inner').innerHTML = '';
        }

        const clear_btn_allowed = (this.options.allowed_tools?.length == 0 || this.options.allowed_tools?.includes('clear_files'));
        const upload_btn_allowed = (this.options.allowed_tools?.length == 0 || this.options.allowed_tools?.includes('upload'));

        clear_btn_allowed && button_container.appendChild(clear_all_btn);
        upload_btn_allowed && button_container.appendChild(upload_btn);

        this.map_override_styles_to_default_styles(style_override);

        this.on('file.beforeAdded', (e) => {
            const item = document.createElement('div')
            item.style.width = '100%'
            item.className = "DUIFileContainer"
            item.id = e.file.id
            
            const file_preview_el = document.createElement('div')
            file_preview_el.className = "DHIFilePreviewEl"
            this.makeFileDisplayElement(e.file, file_preview_el, e.base64) 

            const file_details = document.createElement('div')
            file_details.className = "DHIFileDetails"
            const textContainer = document.createElement('div')
            textContainer.className = "DHITextContainer"
            const file_name = document.createElement('div')
            const file_size = document.createElement('div')
            file_size.className = "DHIFilesizeContainer"
            file_size.innerHTML = this.parseFileSize(e.file.size);
            const progress_text = document.createElement('div')
            progress_text.className = "DHIProgressText"
            file_name.innerHTML = this.clipFileNameIfShouldClip(e.file.name)
            textContainer.appendChild(file_name)
            textContainer.appendChild(progress_text)

            const uploadProgressContainer = document.createElement('div')
            uploadProgressContainer.className = "DHIUploadProgressContainer"
            const progress = document.createElement('div')
            progress.className = "DHIMainProgress"
            const progressInner = document.createElement('div')
            progressInner.className = "DHIProgressInner"
            progress.appendChild(progressInner)
            uploadProgressContainer.appendChild(progress)
            progressInner.style.width = '0%'

            file_details.appendChild(textContainer)
            file_details.appendChild(file_size)
            file_details.appendChild(uploadProgressContainer)

            const close_btn_container = document.createElement('div');
            close_btn_container.className = "DHICloseBtnContainer";
            close_btn_container.innerHTML = this.ui_icons.red_circle_cancel;
            close_btn_container.onclick = () => this.remove_file(e.file.id, () => item.remove())
            
            item.appendChild(file_preview_el)
            item.appendChild(file_details)
            item.appendChild(close_btn_container)

            this._custupFooterEl.querySelector('.inner').append(item);
            button_container.style.display = 'flex';
            
        });

        this.on('library.init', () => {
            this._custupFooterEl.append(button_container)
        });
        
        this.on('file.removed', (e) => {
            e.files_count == 0 && (button_container.style.display = 'none');
        });

        this.on("upload.beforeStart", () => {
            upload_btn.disabled = true
            clear_all_btn.disabled = true;
            upload_btn.innerHTML = "Uploading...";
        });

        this.on("upload.success", (e) => {
            upload_btn.disabled = false
            clear_all_btn.disabled = false
            upload_btn.innerHTML = "Upload"
        })

        this.on("upload.error", (e) => {
            upload_btn.disabled = false
            clear_all_btn.disabled = false
            upload_btn.innerHTML = "Upload"

            const item_container = this._custupFooterEl.querySelector('.inner').querySelector(`div.DUIFileContainer#${e.file.id}`)
            const progress_container = item_container.querySelector(`.DHIUploadProgressContainer`)
            const progressInner = progress_container.querySelector('.DHIProgressInner')
            progressInner.style.backgroundColor = 'red'
            const progressText = item_container.querySelector('.DHIProgressText')

            const retryButton = document.createElement('div')
            retryButton.className = "DHIRetryButton";
            retryButton.innerHTML = 'Retry'
            retryButton.onclick = () => this.retry_upload(e.file.id)
            !this.options.single_upload && (progressText.innerHTML = '');
            !this.options.single_upload && progressText.append(retryButton);

        })

        this.on('upload.progress', (e) => {
            if (this.options.single_upload) return;
            const item_container = this._custupFooterEl.querySelector('.inner').querySelector(`div.DUIFileContainer#${e.file.id}`)
            const progress_container = item_container.querySelector('.DHIUploadProgressContainer')
            progress_container.style.display = "flex"
            const progressText = item_container.querySelector('.DHIProgressText')
            const progressInner = progress_container.querySelector('.DHIProgressInner')
            progressInner.style.backgroundColor = 'rgb(39, 39, 148)'

            const progress_calc = ((e.progressEvent.loaded / e.progressEvent.total) * 100)
            progressInner.style.width = progress_calc + "%"
            progressText.innerHTML = progress_calc == 100 ? '100%' : progress_calc.toFixed(1) + "%";
            if (e.progressEvent.loaded >= e.progressEvent.total) {
                progressInner.style.backgroundColor = 'green'
            }
        });
        
        if (document.querySelector("[href*='all.min.']") === null && document.querySelector("[href*='detached.']") === null) {
            console.warn(this.libraryName + ": Please include the detached css file")
        }
    }

    /**
     * @private @method profilePictureUI
     */
    profilePictureUI () {
        const style_override = {
            outerContainer: ['PPUIOuterContainer', true],
            innerContainer: ['PPUIInnerContainer', true],
            custupInnerContainerWrapperEl: ['PPUIInnerContainerWrapper', true],
            fileDisplayUI: ['PPUIFileDisplayUI', true],
            fileUIOuterContainer: ['PPUIFileUIOuter', true],
            fileUI: ['PPUIFileUI', true],
            defaultUI: ['PPUIDefaultUI', true],
            footerContainer: 'PPUIFooterContainer',
        }

        this.options.display_file_sources = false
        this.options.display_ui_tools = false
        this.options.disable_scrollbar = true
        this.options.minNumberOfFiles = 1
        this.options.maxNumberOfFiles = 1
        this.options.show_file_remove_btn = false
        this.options.show_file_details_container = false
        this.options.allowed_file_types = ["jpg", "png", "jpeg", "jpg"]

        this.map_override_styles_to_default_styles(style_override)

        const defaultUIInner = document.createElement('div')
        defaultUIInner.className = "PPUIDefaultUIInner"
        const defaultUIInnerIconContainer = document.createElement('div')
        defaultUIInnerIconContainer.className = "PPUIDefaultUIInnerIcon"
        defaultUIInnerIconContainer.innerHTML = this.ui_icons.plus
        const defaultUIInnerTextContainer = document.createElement('div')
        defaultUIInnerTextContainer.innerHTML = "Upload Profile Picture"
        defaultUIInner.appendChild(defaultUIInnerIconContainer)
        defaultUIInner.appendChild(defaultUIInnerTextContainer)

        this.options._custupDefaultUploadSentence = defaultUIInner.innerHTML

        const buttonToolsContainer = document.createElement('div')
        buttonToolsContainer.className = "PPUIButtonToolsContainer"
        const uploadBtn = document.createElement('button')
        uploadBtn.className = "PPUIUploadBtn"
        uploadBtn.innerHTML = "Upload"
        uploadBtn.type = "button"
        uploadBtn.onclick = () => this.upload()

        const clearBtn = document.createElement('button')
        clearBtn.className = "PPUIClearBtn"
        clearBtn.type = "button"
        clearBtn.innerHTML = "Clear";
        clearBtn.onclick = () => this.clear_files()

        const clear_btn_allowed = (this.options.allowed_tools?.length == 0 || this.options.allowed_tools?.includes('clear_files'));
        const upload_btn_allowed = (this.options.allowed_tools?.length == 0 || this.options.allowed_tools?.includes('upload'));

        clear_btn_allowed && buttonToolsContainer.appendChild(clearBtn);
        upload_btn_allowed && buttonToolsContainer.appendChild(uploadBtn);

        this.on('file.afterAdded', () => {
            this._custupFooterEl.querySelector('.inner').append(buttonToolsContainer)
        });

        this.on('file.all_removed', () => {
            this._custupFooterEl.querySelector('.inner').innerHTML = ''
        });

        if (document.querySelector("[href*='all.min.']") === null && document.querySelector("[href*='profilePicture.']") === null) {
            console.warn(this.libraryName + ": Please include the profilePicture css file")
        }
    }

    /**
     * @private @method elegantUI
     */
    elegantUI () {
        
        const style_override = {
            outerContainer: ['EUIOuterContainer', true],
            innerContainer: ['EUIInnerContainer', true],
            sidebarLeftContainer: ['EUISidebarLeftContainer', true],
            custupInnerContainerWrapperEl: ['EUIInnerContainerWrapper', true],
            headerContainer: ['EUIHeaderContainer', true],
            defaultUI: ['EUIDefaultUI', true],
            defaultUIInnerContentEl: ['EUIDefaultUIInnerContentEl', true],
            filePreviewer: ['EUIFilePreviewer', true],
            fileDisplayUI: ['EUIFileDisplayUI', true],
            fileUIOuterContainer: ['EUIFileUIOuterContainer', true],
            fileUI: ['EUIFileUIMainContainer', true],
            close_popup_btn: ['EUIClosePopupBtn', true],
            footerContainer: ['EUIFooterContainer', true],
            defaultUIUploadSentenceContainer: ['EUIDefaultUIUploadSentenceContainer', true],
            footerContainer: 'EUIFooterContainer',
        }

        const is_mobile = () => window.screen.width <= 768;

        this.map_override_styles_to_default_styles(style_override)

        this.options.display_file_sources = false
        this.options.use_default_file_display_ui = true
        this.options.display_ui_tools = false
        this.options.show_file_remove_btn = false
        this.options.show_file_details_container = false
        this.options.disable_scrollbar = true
        this.options.show_upload_progress_bar = false;
        this.options.show_upload_error_overlay = false;
        this.options.disable_select_files_from_device = is_mobile();

        this.options.external_source_style_override = {
            ...this.options.external_source_style_override,
            container: ["EUIExternalSourceContainer", true]
        }

        this.options.media_capture_source_style_override = {
            ...this.options.media_capture_source_style_override,
            container: ["EUIMediaSourceContainer", true]
        }

        this.options.css_font_name = "Roboto-regular, Roboto, sans-serif"

        // default UI file tip
        const fileTipWrapper = document.createElement('div')
        const defaultUIFileTip = document.createElement('div')
        defaultUIFileTip.className = "EUIDefaultUIFileSelectTip"
        const fileTipIconContainer = document.createElement('div')
        fileTipIconContainer.className = "EUIFileTipIconContainer"
        fileTipIconContainer.innerHTML = this.ui_icons.add_file_filled
        const fileTipText1 = document.createElement('div')
        fileTipText1.className = "EUIFileTipText1"
        fileTipText1.innerHTML = "Select Files to Upload"
        const fileTipText2 = document.createElement('div')
        fileTipText2.className = "EUIFileTipText2"
        fileTipText2.innerHTML = "or Drag and Drop Files"

        defaultUIFileTip.appendChild(fileTipIconContainer)
        defaultUIFileTip.appendChild(fileTipText1)
        defaultUIFileTip.appendChild(fileTipText2)
        fileTipWrapper.appendChild(defaultUIFileTip)

        this.options._custupDefaultUploadSentence = fileTipWrapper.innerHTML
        // end of default UI file tip


        this.on('library.init', () => {
            // scope variable declaration
            let footerContainerFilled = false;
            let submitBtnEl_clone = null;
            let selectFromDeviceSourceIcon_clone = null;

            const showAddFileUI = (e) => {
                this.show_add_file_ui();
                this._custupEl.querySelectorAll('[data-custup-icon-active="true"]').forEach(el => el.removeAttribute("data-custup-icon-active"));
                selectFromDeviceSourceIcon_clone && (selectFromDeviceSourceIcon_clone.dataset.custupIconActive = "true");
                headerTitleBar.innerHTML = e?.currentTarget.innerHTML == undefined ? 'Select from' : e.currentTarget.innerHTML;
                hideHeaderUtils();
                clearUtilsButtonsFromFooter()
                this.close_file_source_popup();
            }
            const selectFileToggleBtn = document.createElement('div');
            selectFileToggleBtn.className = "EUISelectFileToggleBtn";
            selectFileToggleBtn.innerHTML = this.ui_icons.bars;
            selectFileToggleBtn.onclick = (e) => {
                if (this.is_add_file_ui_shown() && this.get_total_file_count() > 0) {
                    this.hide_add_file_ui();
                }else{
                    showAddFileUI();
                    list_file_sources();
                }

            }
            this._custupEl.append(selectFileToggleBtn);

            // function that creates the utils buttons in the footer container
            const createUtilsButtonsInFooter = () => {
                const clearFilesButtonContainer = document.createElement('div')
                const clearFilesButton = document.createElement('button')
                clearFilesButton.innerHTML = "Deselect All";
                clearFilesButton.type = "button";
                clearFilesButton.onclick = () => this.clear_files();
                clearFilesButtonContainer.appendChild(clearFilesButton);

                const uploadButtonContainer = document.createElement('div')
                const uploadButton = document.createElement('button')
                uploadButton.type = "button"
                uploadButton.innerHTML = "Upload"
                uploadButtonContainer.appendChild(uploadButton)
                uploadButton.onclick = () => this.upload();
                submitBtnEl_clone = uploadButton;

                this._custupFooterEl.querySelector('.inner').append(clearFilesButtonContainer)
                this._custupFooterEl.querySelector('.inner').append(uploadButtonContainer)

                this._custupEl.style.setProperty('--footer-container-height', this._custupFooterEl.clientHeight + "px")
                footerContainerFilled = true
            }

            const clearUtilsButtonsFromFooter = () => {
                this._custupFooterEl.querySelector('.inner').innerHTML = "";
                this._custupEl.style.setProperty('--footer-container-height', this._custupFooterEl.clientHeight + "px")
                footerContainerFilled = false;
            }

            


            // create the header title
            const headerTitleBar = document.createElement('div')
            headerTitleBar.className = "EUIHeaderTitleBar"
            this._custupHeaderEl.querySelector('.inner').append(headerTitleBar)
            headerTitleBar.innerHTML = is_mobile() ? "Select from" : this.ui_icons.desktop_device;

            // create the filter box
            const filterBoxContainer = document.createElement('div')
            filterBoxContainer.className = "EUIFilterBoxContainer"

            const filterBoxInputWrapper = document.createElement('div')
            filterBoxInputWrapper.className = "EUIFilterBoxInputWrapper"
            const filterBox = document.createElement('input')
            filterBox.placeholder = "Filter"
            filterBox.className = "EUIFilterBox"
            const filterBoxInputIcon = document.createElement('div')
            filterBoxInputIcon.innerHTML = this.ui_icons.search_icon;
            filterBox.onkeyup = (e) => {
                const value = e.currentTarget.value
                const filter_not_match = this.get_all_files().filter(file => file.name.toLowerCase().indexOf(value.toLowerCase()) == -1)
                this.get_all_files().forEach(file => {
                    if (value != '') {
                        if (filter_not_match.includes(file)) {
                            this._custupEl.querySelector("#"+file.id).style.setProperty("display", "none", "important")
                        }else{
                            this._custupEl.querySelector("#"+file.id).style.setProperty("display", "flex", "important")
                        }                        
                    }else{
                        this._custupEl.querySelector("#"+file.id).style.setProperty("display", "flex", "important")
                    }
                })
            }
            
            filterBoxInputWrapper.appendChild(filterBoxInputIcon)
            filterBoxInputWrapper.appendChild(filterBox)
            filterBoxContainer.appendChild(filterBoxInputWrapper)
            this._custupHeaderEl.querySelector('.inner').append(filterBoxContainer)
            // end of filter box

            // create file state info
            const fileStateInfoContainer = document.createElement('div')
            fileStateInfoContainer.className = "EUIFileStateInfoContainer"
            const fileStateInfoContainerText = document.createElement('div')
            fileStateInfoContainerText.className = "EUIFileStateInfoContainerText"
            fileStateInfoContainerText.innerHTML = "Files"

            fileStateInfoContainer.appendChild(fileStateInfoContainerText)
            this._custupHeaderEl.querySelector('.inner').append(fileStateInfoContainer)
            // end of create file state info

            const hideHeaderUtils = () => {
                this._custupHeaderEl.style.setProperty('height', 'auto', 'important');;
                filterBoxContainer.style.display = "none";
                fileStateInfoContainer.style.display = "none";
                this._custupEl.style.setProperty('--header-container-height', this._custupHeaderEl.offsetHeight + 'px');
            }

            const showHeaderUtils = () => {
                this._custupHeaderEl.style.setProperty('height', 'auto', 'important');;
                filterBoxContainer.style.display = "flex"
                fileStateInfoContainer.style.display = "flex"
                this._custupEl.style.setProperty('--header-container-height', this._custupHeaderEl.offsetHeight + 'px');
            }

            

            const setIconActiveCallbackFn = (e) => {
                this._custupEl.querySelectorAll('[data-custup-icon-active="true"]').forEach(el => el.removeAttribute("data-custup-icon-active"))
                e.currentTarget.dataset.custupIconActive = "true"
                headerTitleBar.innerHTML = e.currentTarget.innerHTML;
                headerTitleBar.querySelector('div')?.remove(); // for mobile screen UI that contains title wrapped in a div
                hideHeaderUtils()
            }

            // create the other file source icons
            const list_file_sources = () => {
                this._custupSidebarLeftEl.innerHTML = "";

                // create the select from user's device icon
                const selectFromDeviceSourceIcon = document.createElement('div');
                selectFromDeviceSourceIcon_clone = selectFromDeviceSourceIcon
                

                if (is_mobile()) {
                    this._custupDefaultUIInnerContentEl.innerHTML = "";
                    const file_source_icons = this.get_file_sources();

                    selectFromDeviceSourceIcon.innerHTML = this.ui_icons.mobile_device;
                    selectFromDeviceSourceIcon.classList.add('file-source');
                    const device_icon_title = document.createElement('div');
                    device_icon_title.innerHTML = "Select from Device";
                    selectFromDeviceSourceIcon.appendChild(device_icon_title);
                    selectFromDeviceSourceIcon.onclick = (e) => this.select_file_from_device(e);

                    this._custupDefaultUIInnerContentEl.append(selectFromDeviceSourceIcon)
                    file_source_icons.map(source_el => {
                        source_el.classList.add('file-source');
                        const source_icon_title = document.createElement('div')
                        source_icon_title.innerHTML = source_el.title
                        source_el.append(source_icon_title);
                        source_el.addEventListener('click', setIconActiveCallbackFn)
                        this._custupDefaultUIInnerContentEl.append(source_el)
                    })
                    this.set_scroll_pointer_event(this._custupDefaultUIEl, this._custupDefaultUIInnerContentEl);
                    selectFileToggleBtn.style.display = 'flex'
                }else{
                    selectFileToggleBtn.style.display = 'none'
                    this._custupDefaultUIInnerContentEl.innerHTML = this.options._custupDefaultUploadSentence;
                    
                    selectFromDeviceSourceIcon.innerHTML = this.ui_icons.desktop_device;
                    this._custupSidebarLeftEl.append(selectFromDeviceSourceIcon);
                    selectFromDeviceSourceIcon.dataset.custupIconActive = "true";
                    selectFromDeviceSourceIcon.onclick = (e) => showAddFileUI(e)
                }

                !is_mobile() && this.get_file_sources(this._custupSidebarLeftEl, setIconActiveCallbackFn);
            }
            list_file_sources();
            window.onresize = (e) => {
                list_file_sources();
            }

            
            this.on('file_source.closed', () => {
                this._custupEl.querySelectorAll('[data-custup-icon-active="true"]').forEach(el => el.removeAttribute("data-custup-icon-active"))
                headerTitleBar.innerHTML = is_mobile() ? "Select from" : this.ui_icons.desktop_device;
                this.get_total_file_count() > 0 && showHeaderUtils();
            });

    
            this.on('file.afterAdded', ({file, element, count}) => {
                !footerContainerFilled && createUtilsButtonsInFooter();

                const fileDetailsContainer = document.createElement('div');
                fileDetailsContainer.className = "EUIFileDetailsContainer"

                const filenameSizeContainer = document.createElement('div')
                filenameSizeContainer.className = "EUIFilenameSizeContainer"
                const fileName = document.createElement('div')
                fileName.innerHTML = file.name
                const fileSize = document.createElement('div')
                fileSize.innerHTML = this.parseFileSize(file.size)
                filenameSizeContainer.appendChild(fileName)
                filenameSizeContainer.appendChild(fileSize)

                const fileDisplayToolsContainer = document.createElement('div')
                fileDisplayToolsContainer.className = 'EUIFileDisplayToolsContainer'
                const removeFileBtn = document.createElement('div')
                removeFileBtn.innerHTML = this.ui_icons.cancel
                removeFileBtn.onclick = (e) => {
                    this.remove_file(file.id)
                }
                const previewFileBtn = document.createElement('div')
                previewFileBtn.innerHTML = this.ui_icons.eye;
                previewFileBtn.onclick = (e) => {
                    this.preview_file(file.id)
                }
                const retryUploadBtn = document.createElement('div')
                retryUploadBtn.innerHTML = this.ui_icons.retry;
                retryUploadBtn.id = "retry_" + file.id
                retryUploadBtn.style.display = "none"
                retryUploadBtn.onclick = (e) => {
                    this.retry_upload(file.id)
                }

                fileDisplayToolsContainer.appendChild(retryUploadBtn)
                this.is_file_previewable(file) && fileDisplayToolsContainer.appendChild(previewFileBtn);
                
                fileDisplayToolsContainer.appendChild(removeFileBtn)

                const progressIndicatorContainer = document.createElement('div')
                progressIndicatorContainer.className = "EUIProgressIndicatorContainer"
                const progressIndicatorInner = document.createElement('div')
                progressIndicatorContainer.appendChild(progressIndicatorInner)

                fileDetailsContainer.appendChild(filenameSizeContainer)
                fileDetailsContainer.appendChild(fileDisplayToolsContainer)
                element.appendChild(fileDetailsContainer)
                element.appendChild(progressIndicatorContainer)

                headerTitleBar.innerHTML = "Selected Files " + count;

                showHeaderUtils();
            });

            this.on("file.all_removed", (e) => {
                clearUtilsButtonsFromFooter();
                headerTitleBar.innerHTML = is_mobile() ? "Select from" : this.ui_icons.desktop_device;
                hideHeaderUtils();
                setTimeout(() => {
                    list_file_sources();
                }, 100);
            });

            this.on("file.removed", (e) => {
                headerTitleBar.innerHTML = "Selected Files " + e.files_count
            });

            this.on("upload.error", (e) => {
                const file_error_el = this._custupEl.querySelector('#'+e.file.id).querySelector('[id*="retry_"]');
                file_error_el.style.display = "flex";
                submitBtnEl_clone.innerHTML = "Upload";
                submitBtnEl_clone.disabled = false;
            });

            this.on("upload.retry", (e) => {
                const file_error_el = this._custupEl.querySelector('#'+e.file.id).querySelector('[id*="retry_"]');
                file_error_el.style.display = "none";
            });

            this.on("upload.progress", (e) => {
                if (this.options.single_upload) return;
                const uploadHTMLEl = this._custupEl.querySelector('#'+e.file.id);
                const progressFileSize = uploadHTMLEl.querySelector('.EUIFilenameSizeContainer div:last-child')
                const progressIndicator = uploadHTMLEl.querySelector('.EUIProgressIndicatorContainer div')
                progressIndicator.style.width = (e.progressEvent.progress * 100) + "%";
                progressFileSize.innerHTML = this.parseFileSize(e.progressEvent.loaded) + " / " + this.parseFileSize(e.progressEvent.total);
            });

            this.on('upload.beforeStart', (e) => {
                submitBtnEl_clone.innerHTML = "Uploading...";
                submitBtnEl_clone.disabled = true;
            });

            this.on('upload.all_finished', (e) => {
                submitBtnEl_clone.innerHTML = "Upload";
                submitBtnEl_clone.disabled = false;
            });

            this.on('default_ui.closed', () => {
                this._custupEl.querySelectorAll('[data-custup-icon-active="true"]').forEach(el => el.removeAttribute("data-custup-icon-active"));
                headerTitleBar.innerHTML = "Selected Files";
                this.get_total_file_count() > 0 && showHeaderUtils();
                createUtilsButtonsInFooter();
            });
        });

    }
}