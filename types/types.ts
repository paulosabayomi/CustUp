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
    file_source_icons?: {
        video_camera: any;
        capture_image: any;
        record_audio: any;
        record_screen: any;
        url_source: any;
        google_drive_source: any;
        dropbox_source: any;
        box_source: any;
        openai_dalle_source: any;
    };
    css_font_link?: string;
    css_font_name?: string;
    external_source_style_override?: any;
    media_capture_source_style_override?: any;
    default_styles_override?: any;
    persist_styles_override_across_instances?: boolean;
    default_icons_override?: any;
    allowed_file_types?: Array<keyof typeof file_types>;
    targetRootElement: string;
    maxNumberOfFiles?: number;
    minNumberOfFiles?: number;
    minimumAllowedFileSize?: number;
    maximumAllowedFileSize?: number;
    ui_type?: "default" | "resumeUploaderUI" | "bare" | "detached" | "profilePicture";
    display_ui_tools?: boolean;
    show_ui_tools_on_mobile_devices?: boolean;
    disable_drag_n_drop?: boolean;
    disable_select_files_from_device?: boolean;
    allowed_tools?: ("upload" | "tools_dragger" | "add_file" | "added_files_count" | "clear_files")[];
    position_container?: "before" | "after" | "overwrite" | {
        beforeEl: string;
    };
    file_preview_animation_types?: ("slideInRight" | "slideInTop" | "slideInLeft" | "slideInBottom" | "zoomIn" | "fadeIn")[];
    allowMultipleUpload?: boolean;
    file_upload?: {
        endpoint_url: string;
        files_field_name: string;
        form_field?: string | HTMLFormElement;
        additional_data?: object;
        axios_settings: {
            headers: {};
            configs: {};
        };
        chunk_size: number;
        should_chunk: boolean;
    };
    allowed_sources?: ("capture_image" | "record_audio" | "record_screen" | "google_drive_source" | "dropbox_source" | "box_source" | "openai_dalle_source" | "record_video" | "link_source")[];
    display_file_sources?: boolean;
    upload_automatically?: boolean;
    show_upload_error_overlay?: boolean;
    show_upload_progress_bar?: boolean;
    file_source_config?: {
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
            };
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
    default_files?: {
        file: string | File | Blob;
        isUploadable: boolean;
        headers: any;
    }[];
    count_default_files?: boolean;
    instance_attach?: object[];
    single_upload?: boolean;
    persist_files?: boolean;
    persist_type?: "soft" | "hard";
    alert_timeout_time?: number;
    messages?: {
        timeout?: number;
    };
}