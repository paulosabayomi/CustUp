export default class CustUpMediaSource {
    /**
     *
     * @param {{
     *      inner_container: HTMLDivElement;
     *      media_type: 'audio' | 'video' | 'image';
     *      standalone?: boolean;
     *      callbackFn: Function;
     *      config?: {
     *          video_only: boolean;
     *          show_image_capture_btn: boolean;
     *      };
     *      eventMethods: typeof eventMethods;
     *      ui_styles: typeof media_capture_ui_styles;
     * }}
     */
    constructor({ inner_container, media_type, standalone, callbackFn, config, eventMethods, ui_styles, onclose }: {
        inner_container: HTMLDivElement;
        media_type: 'audio' | 'video' | 'image';
        standalone?: boolean;
        callbackFn: Function;
        config?: {
            video_only: boolean;
            show_image_capture_btn: boolean;
        };
        eventMethods: typeof eventMethods;
        ui_styles: typeof media_capture_ui_styles;
    });
    /**
     * @protected @property {HTMLDivElement} _custupInnerContainer
     */
    protected _custupInnerContainer: HTMLDivElement;
    /**
     * @protected @property {'audio' | 'video' | 'image' | 'screen'} media_type
     */
    protected media_type: "audio" | "video" | "image";
    /**
     * @protected @property {boolean | undefined} standalone_mode
     */
    protected standalone_mode: boolean;
    /**
     * @private @property {MediaDevices | undefined} media_devices_instance
     */
    private media_devices_instance;
    /**
     * @private @property {Array | undefined} media_data
     */
    private media_data;
    /**
     * @private @property {MediaRecorder | undefined} media_recorder_instance
     */
    private media_recorder_instance;
    /**
     * @private @property {HTMLVideoElement | HTMLAudioElement} media_display_el
     */
    private media_display_el;
    /**
     * @private @property {boolean} is_recording
     */
    private is_recording;
    /**
     * @private @property {HTMLDivElement | undefined} start_action_button
     * @private @property {any} start_action_button_animation_instance
     * @private @property {HTMLDivElement | undefined} add_media_button
     * @private @property {HTMLDivElement | undefined} close_media_popup_button
     * @private @property {HTMLDivElement | undefined} capture_image_2_button
     * @private @property {HTMLDivElement | undefined} audio_rec_info_container
     */
    private start_action_button;
    start_action_button_animation_instance: any;
    add_media_button: any;
    close_media_popup_button: any;
    capture_image_2_button: any;
    audio_rec_info_container: any;
    media_constraints: {
        audio: {
            audio: boolean;
        };
        video: {
            video: boolean;
        };
        both: {
            audio: boolean;
            video: boolean;
        };
    };
    /**
     * @protected @property {HTMLDivElement} media_capture_ui_container
     * @protected @property {HTMLDivElement} media_capture_main_container
     * @protected @property {HTMLDivElement} media_capture_bottom_tools_container
     */
    protected media_capture_ui_container: any;
    media_capture_main_container: any;
    media_capture_bottom_tools_container: any;
    /**
     * @protected @property {Function} callbackFn
     */
    protected callbackFn: Function;
    /**
     * @protected @property {Function} onPopupCloseCallback
     */
    protected onPopupCloseCallback: any;
    /**
     * @protected @property {Function} media_config
     */
    protected media_config: {
        video_only: boolean;
        show_image_capture_btn: boolean;
    } | undefined;
    /**
     * @protected @property {Function} ui_styles
     */
    protected ui_styles: {
        container: string;
        media_capture_main_container: string;
        media_capture_bottom_tools_container: string;
    };
    /**
     * @protected @property {any} eventMethods
     */
    protected eventMethods: {
        video_recordingStarted: undefined;
        video_recording: undefined;
        video_recordStop: undefined;
        video_recordSaved: undefined;
        video_recordCancel: undefined;
        image_captured: undefined;
        audio_recordingStarted: undefined;
        audio_recording: undefined;
        audio_recordStop: undefined;
        audio_recordSaved: undefined;
        audio_recordCancel: undefined;
        screen_recordingStarted: undefined;
        screen_recording: undefined;
        screen_recordStop: undefined;
        screen_recordSaved: undefined;
        screen_recordCancel: undefined;
    };
    initialize(): Promise<void>;
    /**
     * @protected initializeMediaDevices
     * @param {'video' | 'both' | 'image' | 'audio' | 'screen'} constraint_type - type of media
     * @returns MediaStream
     */
    protected initializeMediaDevices(constraint_type: 'video' | 'both' | 'image' | 'audio' | 'screen'): Promise<any>;
    /**
     * @protected initializeMediaDevices
     * @param {string} constraint_type - type of media
     * @returns MediaStream
     */
    protected initializeScreenRecMediaDisplay(): Promise<MediaStream>;
    /**
     * @private getRandChars
     * @returns {string}
     */
    private getRandChars;
    /**
     *
     * @private set_class_name
     *
     * @param style_key_name string the name of the style
     * @param element_to_style HTMLElement
     * @returns {void}
     *
     */
    private set_class_name;
    get_style_classname(style_key_name: any): any;
    /**
     * @protected createMediaCaptureUI
     * @param {'audio' | 'video' | 'image'} media_type - type of media to be displayed
     * @returns {HTMLVideoElement}
     */
    protected createMediaCaptureUI(media_type: 'audio' | 'video' | 'image'): HTMLVideoElement;
    removeMediaCaptureUI(): void;
    stopTracks(): void;
    closeMediaPopup(silent?: boolean): void;
    /**
     * @protected animateStartActionButton
     * @param {boolean} stop - whether to start or stop the action button animation
     */
    protected animateStartActionButton(stop?: boolean): void;
    recordVideo(): void;
    captureImage(): void;
    recordAudio(): void;
    recordScreen(): void;
    listenToDeviceChange(): void;
    startRecording(): void;
    _snapImage(): Promise<void>;
    handleRecorderError(): void;
    handleImageCaptured(): void;
    listenToMediaRecorderStop(): void;
}
import { media_capture_ui_styles } from "../utils/_styles.js";
//# sourceMappingURL=custupmediasource.d.ts.map