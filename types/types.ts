import { ui_styles, external_sources_ui_styles, media_capture_ui_styles } from "../utils/_styles";
import icons from "../utils/icons"
import file_types from "../utils/filetypes"

export interface ICustUpOptions {
    _custupDefaultUploadSentence?: string;
    disable_scrollbar?: boolean;
    persist_default_ui?: boolean;
    use_default_file_display_ui?: boolean;
    show_preview_file_btn?: boolean;
    autoInitialize?: boolean;
    show_file_remove_btn?: boolean;
    show_file_details_container?: boolean;
    file_source_icons?: {[key in 'video_camera' | 'capture_image' | 'record_audio' | 'record_screen' | 'url_source' | 'google_drive_source' | 'dropbox_source' | 'box_source' | 'openai_dalle_source']: any};
    css_font_link?: string;
    css_font_name?: string;
    external_source_style_override?: typeof external_sources_ui_styles;
    media_capture_source_style_override?: typeof media_capture_ui_styles;
    default_styles_override?: typeof ui_styles;
    persist_styles_override_across_instances?: boolean;
    default_icons_override?: typeof icons;
    allowed_file_types?: (keyof typeof file_types)[];
    targetRootElement?: string;
    maxNumberOfFiles?: number;
    minNumberOfFiles?: number;
    minimumAllowedFileSize?: number;
    maximumAllowedFileSize?: number;
    ui_type?: 'default' | 'resumeUploaderUI' | 'bare' | 'detached' | 'profilePicture';
    display_ui_tools?: boolean;
    show_ui_tools_on_mobile_devices?: boolean;
    disable_drag_n_drop?: boolean;
    disable_select_files_from_device?: boolean;
    allowed_tools?: Array<'tools_dragger' | 'upload' | 'add_file' | 'added_files_count' | 'clear_files'>;
    position_container?: "before" | "after" | "overwrite" | {"beforeEl": string};
    file_preview_animation_types?: Array<'slideInRight' | 'slideInTop' | 'slideInLeft' | 'slideInBottom' | 'zoomIn' | 'fadeIn'>;
    allowMultipleUpload?: boolean;
    file_upload?: {
        endpoint_url: string;
        files_field_name: string;
        form_field?: HTMLFormElement | string;
        additional_data?: object;
        axios_settings: {
            headers: {};
            configs: {};
        };
    };
    allowed_sources?: Array<'record_video' | 'capture_image' | 'record_audio' | 'record_screen' | 'link_source' | 'google_drive_source' | 'dropbox_source' | 'box_source' | 'openai_dalle_source'>;
    upload_automatically?: boolean;
    show_upload_error_overlay?: boolean;
    file_source_config?: {
       video_recording: {
            video_only: boolean;
            show_image_capture_btn: boolean;
        };
        capture_image: {
        };
        record_audio: {
        };
        record_screen: {
        };
        url_source: {
        };
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
               cancel: Function;
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
                chooseButtonLabel?: string;
                sortBy?: 'name' | 'date';
                sortDirection?: 'ASC' | 'DESC';
                logoUrl?: string;
                canUpload?: boolean;
                canSetShareAccess?: boolean;
                canCreateNewFolder?: boolean;
                sharedLink?: string;
                sharedLinkPassword?: string;
                modal?: string;
                size?: 'large' | 'small';
                isTouch?: boolean;
                autoFocus?: boolean;
                defaultView?: 'files' | 'recents';
                cancelButtonLabel?: string;
                requestInterceptor?: Function;
                responseInterceptor?: Function;
            }
        };
        openai_dalle_source: {
             endpoint: string;
             api_key: string;
             size: "1024x1024" | "1024x1792" | "1792x1024";
             n: number;
             model: "dall-e-3" | "dall-e-2";
             quality: "standard" | "hd";
        };
    };
    default_files?: Array<{file: string | File | Blob; isUploadable: boolean; headers: any}>;
    count_default_files?: boolean;
    instance_attach?: Array<any>;
    single_upload?: boolean;
    persist_files?: boolean;
    persist_type?: 'soft' | 'hard';
    alert_timeout_time?: number;
}