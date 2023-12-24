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
    *      file_source_icons: {[key in 'video_camera' | 'capture_image' | 'record_audio' | 'record_screen' | 'url_source' | 'google_drive_source' | 'dropbox_source' | 'box_source' | 'openai_dalle_source']: any};
    *      css_font_link?: string;
    *      css_font_name?: string;
    *      external_source_style_override?: typeof external_sources_ui_styles;
    *      media_capture_source_style_override?: typeof media_capture_ui_styles;
    *      default_styles_override?: typeof ui_styles;
    *      persist_styles_override_across_instances?: boolean;
    *      default_icons_override?: typeof icons;
    *      allowed_file_types: (keyof file_types)[];
    *      targetRootElement: string; 
    *      maxNumberOfFiles: number; 
    *      minNumberOfFiles: number; 
    *      minimumAllowedFileSize: number; 
    *      maximumAllowedFileSize: number; 
    *      ui_type: 'default' | 'resumeUploaderUI' | 'bare' | 'detached' | 'profilePicture'; 
    *      display_ui_tools: boolean;
    *      disable_drag_n_drop: boolean;
    *      disable_select_files_from_device: boolean;
    *      allowed_tools: Array<'tools_dragger' | 'upload' | 'add_file' | 'added_files_count' | 'clear_files'>;
    *      position_container: "before" | "after" | "overwrite" | {"beforeEl": string};
    *      file_preview_animation_types: Array<'slideInRight' | 'slideInTop' | 'slideInLeft' | 'slideInBottom' | 'zoomIn' | 'fadeIn'>;
    *      allowMultipleUpload: boolean;
    *      file_upload: {
    *          endpoint_url: string;
    *          files_field_name: string;
    *          form_field?: HTMLFormElement | string;
    *          additional_data?: object;
    *          axios_settings: {
    *               headers: {};
    *               configs: {};
    *          };
    *      };
    *      allowed_sources: Array<'record_video' | 'capture_image' | 'record_audio' | 'record_screen' | 'link_source' | 'google_drive_source' | 'dropbox_source' | 'box_source' | 'openai_dalle_source'>;
    *      upload_automatically?: boolean;
    *      show_upload_error_overlay?: boolean;
    *      file_source_config: {
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
    *                 chooseButtonLabel?: string;
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
    *      default_files: Array<{file: string | File | Blob; isUploadable: boolean; headers: any}>;
    *      count_default_files: boolean;
    *      instance_attach: Array<CustUp>;
    *      single_upload: boolean;
    *      persist_files: boolean;
    *      persist_type: 'soft' | 'hard';
    *      alert_timeout_time: number;
    * }}  options
    * 
    */ 
    constructor (options) {
        super(options);

        this.uiSelect()
    }

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
            default:
                break;
        }
        this.map_override_styles_to_default_styles(this.options.default_styles_override)
        this.options.autoInitialize && this.initializeUI()
    }

    resumeUploaderUI () {
        const style_override = {
            outerContainer: ['RUIOuterContainer', true],
            defaultUI: ['RUIDefaultUIEl', true],
            defaultUIUploadIconsContainer: ['RUIDefaultUIUploadIconsContainer', true]
        }
        this.map_override_styles_to_default_styles(style_override);
        this.options.allowed_sources = null;
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

    bareUploaderUI () {
        const style_override = {
            outerContainer: ['BareUIOuterContainer', true],
            innerContainer: ['BareUIInnerContainer', true],
            defaultUI: ['BareUIDefaultUIEl', true],
            defaultUIUploadIconsContainer: ['BareUIDefaultUIUploadIconsContainer', true],
        }
        this.map_override_styles_to_default_styles(style_override);
        this.options.allowed_tools = null;
        this.options.allowed_sources = null;
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
        this.options.allowed_sources = null;

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

        const upload_btn = document.createElement('button')
        upload_btn.className = "DUIUploadButton"
        upload_btn.innerHTML = "Upload"
        upload_btn.type = "button"
            upload_btn.onclick = (e) => {e.currentTarget.innerHTML = "Uploading..."; this.upload()}

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
            clear_all_btn.disabled = true
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
            const item_container = this._custupFooterEl.querySelector('.inner').querySelector(`div.DUIFileContainer#${e.file.id}`)
            const progress_container = item_container.querySelector('.DHIUploadProgressContainer')
            progress_container.style.display = "flex"
            const progressText = item_container.querySelector('.DHIProgressText')
            const progressInner = progress_container.querySelector('.DHIProgressInner')
            progressInner.style.backgroundColor = 'rgb(39, 39, 148)'

            const progress_calc = ((e.progressEvent.loaded / e.progressEvent.total) * 100)
            progressInner.style.width = progress_calc + "%"
            progressText.innerHTML = progress_calc.toFixed(1)
            if (e.progressEvent.loaded >= e.progressEvent.total) {
                progressInner.style.backgroundColor = 'green'
            }
        });
        
        if (document.querySelector("[href*='all.min.']") === null && document.querySelector("[href*='detached.']") === null) {
            console.warn(this.libraryName + ": Please include the detached css file")
        }
    }

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

        this.options.allowed_sources = null
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
}