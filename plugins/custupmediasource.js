import { media_capture_ui_styles } from "../utils/_styles.js"
import icons from "../utils/icons.js"

export default class CustUpMediaSource {
    /**
     * @protected @property {HTMLDivElement} _custupInnerContainer
     */
    _custupInnerContainer

    /**
     * @protected @property {'audio' | 'video' | 'image' | 'screen'} media_type
     */
    media_type

    /**
     * @protected @property {boolean | undefined} standalone_mode
     */
    standalone_mode

    /**
     * @private @property {MediaDevices | undefined} media_devices_instance
     */
    media_devices_instance


    /**
     * @private @property {Array | undefined} media_data
     */
    media_data = []

    /**
     * @private @property {MediaRecorder | undefined} media_recorder_instance
     */
    media_recorder_instance

    /**
     * @private @property {HTMLVideoElement | HTMLAudioElement} media_display_el
     */
    media_display_el

    /**
     * @private @property {boolean} is_recording
     */
    is_recording = false

    /**
     * @private @property {HTMLDivElement | undefined} start_action_button
     * @private @property {any} start_action_button_animation_instance
     * @private @property {HTMLDivElement | undefined} add_media_button
     * @private @property {HTMLDivElement | undefined} close_media_popup_button
     * @private @property {HTMLDivElement | undefined} capture_image_2_button
     * @private @property {HTMLDivElement | undefined} audio_rec_info_container
     */
    start_action_button
    start_action_button_animation_instance
    add_media_button
    close_media_popup_button
    capture_image_2_button
    audio_rec_info_container
    

    media_constraints = {
        audio: {audio: true},
        video: {video: true},
        both: {audio: true, video: true}
    }

    /**
     * @protected @property {HTMLDivElement} media_capture_ui_container
     * @protected @property {HTMLDivElement} media_capture_main_container
     * @protected @property {HTMLDivElement} media_capture_bottom_tools_container
     */
    media_capture_ui_container
    media_capture_main_container
    media_capture_bottom_tools_container

    /**
     * @protected @property {Function} callbackFn
     */
    callbackFn

    /**
     * @protected @property {Function} onPopupCloseCallback
     */
    onPopupCloseCallback

    /**
     * @protected @property {Function} media_config
     */
    media_config

    /**
     * @protected @property {Function} ui_styles
     */
    ui_styles = {...media_capture_ui_styles}

    /**
     * @protected @property {any} eventMethods
     */
    eventMethods = {
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

    }
    
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

    constructor({
        inner_container,
        media_type,
        standalone,
        callbackFn,
        config,
        eventMethods,
        ui_styles,
        onclose
    }) {
        if (inner_container == undefined && !standalone) {
            throw new Error('inner container of CustUp initialization is required')
        }

        this._custupInnerContainer = inner_container;
        this.media_type = media_type == undefined ? 'video' : media_type;
        this.standalone_mode = !standalone ? false : true;

        this.callbackFn = callbackFn;

        this.media_config = config;

        for (const key in eventMethods) {
            if (Object.hasOwnProperty.call(eventMethods, key)) {
                const value = eventMethods[key];
                this.eventMethods[key] = value
            }
        }

        if (ui_styles !== undefined) {
            for (const key in ui_styles) {
                if (Object.hasOwnProperty.call(ui_styles, key)) {
                    const value = ui_styles[key];
                    if (Array.isArray(value) && value.length > 1) {
                        this.ui_styles[key] = value[1] == true ? this.ui_styles[key] + " " + value[0] : value;
                    }else{
                        this.ui_styles[key] = value;
                    }
                }
            }
        }


        if (document.querySelector('._custup_media_capture_container') != null) {
            document.querySelector('._custup_media_capture_container')?.remove();
        }

        onclose !== undefined && (this.onPopupCloseCallback = onclose);

        this.initialize();
    }

    async initialize() {
        if (this.media_type == 'audio') {
            await this.initializeMediaDevices('audio');
            this.recordAudio();
        }else if (this.media_type == 'video') {
            await this.initializeMediaDevices(this.media_config.video_only == true ? 'video' : 'both');
            this.recordVideo();
        }else if (this.media_type == 'image') {
            await this.initializeMediaDevices('video');
            this.captureImage();
        }else if (this.media_type == 'screen') {
            await this.initializeScreenRecMediaDisplay();
            this.recordScreen();
        }else{
            throw new Error(`CustUp: ${this.media_type} is not implemented yet, you are welcome to implement it :)`);
        }

        // this will stop media and destroy class instance if user changes device
        this.listenToDeviceChange() 
    }

    /**
     * @protected initializeMediaDevices
     * @param {'video' | 'both' | 'image' | 'audio' | 'screen'} constraint_type - type of media
     * @returns MediaStream
     */
    async initializeMediaDevices (constraint_type) {
        this.media_devices_instance = await navigator.mediaDevices.getUserMedia(this.media_constraints[constraint_type]);
        return this.media_devices_instance
    }

    /**
     * @protected initializeMediaDevices
     * @param {string} constraint_type - type of media
     * @returns MediaStream
     */
    async initializeScreenRecMediaDisplay () {
        return this.media_devices_instance = await navigator.mediaDevices.getDisplayMedia(this.media_constraints.both);
    }

    /**
     * @private getRandChars
     * @returns {string}
     */
    getRandChars () {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        let randChars = ''
        for (let i = 0; i < 12; i++) {
            const randNum = Math.floor(Math.random() * (chars.length - 1))
            randChars += chars[randNum]
        }
        return randChars + Math.floor(Math.random() * 100000000000);
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
        const get_style_classname = this.ui_styles[style_key_name];
        element_to_style.className = get_style_classname        
    }

    get_style_classname (style_key_name) {
        return this.ui_styles[style_key_name];
    }

    /**
     * @protected createMediaCaptureUI
     * @param {'audio' | 'video' | 'image'} media_type - type of media to be displayed
     * @returns {HTMLVideoElement}
     */
    createMediaCaptureUI (media_type) {
        const _class = this

        this.media_capture_ui_container = document.createElement('div')
        this.media_capture_main_container = document.createElement('div')
        this.media_capture_bottom_tools_container = document.createElement('div')

        this.close_media_popup_button = document.createElement('div')
        this.close_media_popup_button.className = '_fynkup_m_remove_media_popup'
        this.close_media_popup_button.innerHTML = icons.cancel

        this.capture_image_2_button = document.createElement('div')
        this.capture_image_2_button.className = '_fynkup_m_capture_image_2'
        this.capture_image_2_button.innerHTML = icons.photo_camera

        this.add_media_button = document.createElement('div')
        this.add_media_button.className = '_fynkup_m_add_media'
        this.add_media_button.style.display = 'none'

        this.add_media_button.onclick = () => {
            (this.media_type == 'video' && this.eventMethods.video_recordSaved !== undefined) && this.eventMethods.video_recordSaved({data: this.media_data});
            (this.media_type == 'audio' && this.eventMethods.audio_recordSaved !== undefined) && this.eventMethods.audio_recordSaved({data: this.media_data});
            (this.media_type == 'screen' && this.eventMethods.screen_recordSaved !== undefined) && this.eventMethods.screen_recordSaved({data: this.media_data});
            this.callbackFn(this.media_data[0]);
            this.closeMediaPopup();
        }

        this.close_media_popup_button.onclick = () => this.closeMediaPopup()

        this.add_media_button.innerHTML = icons.check
        this.start_action_button = document.createElement('div')

        if (media_type == 'audio') {
            this.media_display_el = document.createElement('audio')  
            this.media_display_el.autoplay = true      
            this.media_display_el.muted = true      
            this.media_display_el.playsInline = true    
            this.start_action_button.innerHTML = icons.dot
            this.audio_rec_info_container = document.createElement('div')
            this.audio_rec_info_container.innerHTML = 'Press Start button to start recording audio'
            this.start_action_button.onclick = (e) => this.is_recording ? 
            (() => {
                _class.media_recorder_instance.stop(); 
                this.start_action_button.innerHTML = icons.refresh;
                this.start_action_button.style.backgroundColor = "rgb(0, 187, 255)";
            })() : _class.startRecording()
            
        }else if (media_type == 'video'){
            this.media_display_el = document.createElement('video')  
            this.media_display_el.autoplay = true      
            this.media_display_el.muted = true      
            this.media_display_el.playsInline = true    
            this.start_action_button.innerHTML = icons.dot
            this.start_action_button.onclick = (e) => this.is_recording ? 
            (() => {
                _class.media_recorder_instance.stop(); 
                this.start_action_button.innerHTML = icons.refresh;
                this.start_action_button.style.backgroundColor = "rgb(0, 187, 255)";
            })() : _class.startRecording()

            this.capture_image_2_button.onclick = (e) => this._snapImage()
        }else if (media_type == 'screen'){
            this.media_display_el = document.createElement('video')  
            this.media_display_el.autoplay = true      
            this.media_display_el.muted = true      
            this.media_display_el.playsInline = true    
            this.start_action_button.innerHTML = icons.dot
            this.start_action_button.onclick = (e) => this.is_recording ? 
            (() => {
                _class.media_recorder_instance.stop(); 
                this.start_action_button.innerHTML = icons.refresh;
                this.start_action_button.style.backgroundColor = "rgb(0, 187, 255)";
            })() : _class.startRecording()

            this.capture_image_2_button.onclick = (e) => this._snapImage()
        }else if (media_type == 'image') {
            this.media_display_el = document.createElement('video')  
            this.media_display_el.autoplay = true      
            this.media_display_el.muted = true      
            this.media_display_el.playsInline = true    
            this.start_action_button.innerHTML = icons.dot
            this.start_action_button.onclick = (e) => this._snapImage()
        }
        

        this.media_capture_main_container.append(this.media_display_el)
        if (this.audio_rec_info_container != undefined) {
            this.media_capture_main_container.append(this.audio_rec_info_container)            
        }
        this.set_class_name('container', this.media_capture_ui_container)
        this.set_class_name('media_capture_main_container', this.media_capture_main_container)
        this.set_class_name('media_capture_bottom_tools_container', this.media_capture_bottom_tools_container)

        this.media_capture_bottom_tools_container.append(this.start_action_button)
        this.media_capture_bottom_tools_container.append(this.add_media_button)
        this.media_capture_bottom_tools_container.append(this.close_media_popup_button)

        if (media_type == 'video' && this.media_config.show_image_capture_btn == true){
            this.media_capture_bottom_tools_container.append(this.capture_image_2_button)
        }


        this.media_capture_ui_container.append(this.media_capture_main_container)
        this.media_capture_ui_container.append(this.media_capture_bottom_tools_container)
        this._custupInnerContainer.append(this.media_capture_ui_container)
    }

    removeMediaCaptureUI () {
        this.media_capture_ui_container?.remove()
        this.media_devices_instance = undefined
        this.media_devices_instance = undefined
        this.media_data = []
    }

    stopTracks () {
        this.media_devices_instance?.getTracks().forEach(function(track) {
            track.stop();
        });
    }
    

    closeMediaPopup (silent=false) {
        this.stopTracks()
        this.media_capture_ui_container?.remove();
        this.media_capture_bottom_tools_container?.remove();
        this.media_capture_main_container?.remove();
        this.removeMediaCaptureUI();
        (this.media_type == 'video' && this.eventMethods.video_recordCancel !== undefined) && this.eventMethods.video_recordCancel();
        (this.media_type == 'audio' && this.eventMethods.audio_recordCancel !== undefined) && this.eventMethods.audio_recordCancel();
        (this.media_type == 'screen' && this.eventMethods.screen_recordCancel !== undefined) && this.eventMethods.screen_recordCancel();
        (this.onPopupCloseCallback && !silent) && this.onPopupCloseCallback();
    }

    /**
     * @protected animateStartActionButton
     * @param {boolean} stop - whether to start or stop the action button animation
     */
    animateStartActionButton (stop = false) {
        if (stop) {
            this.start_action_button_animation_instance.cancel()
        }else{
            this.start_action_button_animation_instance = this.start_action_button.animate([
                {opacity: 0.3, transform: 'scale(0.9)'},
                {opacity: 1, transform: 'scale(1)'}], 
                {duration: 1000, iterations: Infinity})
        }
    }

    recordVideo() {
        this.createMediaCaptureUI('video')
        this.media_display_el.srcObject = this.media_devices_instance 
    }

    captureImage () {
        this.createMediaCaptureUI('image')
        this.media_display_el.srcObject = this.media_devices_instance 
    }

    recordAudio () {
        this.createMediaCaptureUI('audio')
        this.media_display_el.srcObject = this.media_devices_instance 
    }

    recordScreen () {
        this.createMediaCaptureUI('screen')
        this.media_display_el.srcObject = this.media_devices_instance 
    }

    listenToDeviceChange () {
        navigator.mediaDevices.addEventListener('devicechange', event => this.removeMediaCaptureUI());
    }

    startRecording () {
        this.media_data = []
        this.media_recorder_instance = new MediaRecorder(this.media_devices_instance);
        // this.media_recorder_instance = new MediaCapture(this.media_devices_instance)
        this.media_recorder_instance.start()
        if (this.audio_rec_info_container != undefined) {
            this.audio_rec_info_container.innerHTML  = "recording..."         
            this.audio_rec_info_container.style.display = "flex"
        }
        this.is_recording = true
        this.animateStartActionButton()
        this.start_action_button.innerHTML = icons.stop
        this.start_action_button.style.backgroundColor = "red"

        if (this.media_display_el.srcObject == undefined) {
            this.media_display_el.srcObject = this.media_devices_instance             
            this.media_display_el.controls = false
            this.add_media_button.style.display = 'none'
        }

        this.media_display_el.muted = true

        const intervalListener = setInterval(() => {
            (this.media_type == 'video' && this.eventMethods.video_recording!== undefined) && this.eventMethods.video_recording(this.media_recorder_instance);
            (this.media_type == 'audio' && this.eventMethods.audio_recording !== undefined) && this.eventMethods.audio_recording(this.media_recorder_instance);
            (this.media_type == 'screen' && this.eventMethods.screen_recording !== undefined) && this.eventMethods.screen_recording(this.media_recorder_instance);
        }, 1000);

        this.media_recorder_instance.ondataavailable = (e) => {
            this.media_data.push(e.data);
            clearInterval(intervalListener)
        }

        this.handleRecorderError();
        this.listenToMediaRecorderStop();
        (this.media_type == 'video' && this.eventMethods.video_recordingStarted !== undefined) && this.eventMethods.video_recordingStarted({media_recorder: this.media_recorder_instance, media_devices: this.media_devices_instance, display_el: this.media_display_el});
        (this.media_type == 'screen' && this.eventMethods.screen_recordingStarted !== undefined) && this.eventMethods.screen_recordingStarted({media_recorder: this.media_recorder_instance, media_devices: this.media_devices_instance, display_el: this.media_display_el});
        (this.media_type == 'audio' && this.eventMethods.audio_recordingStarted !== undefined) && this.eventMethods.audio_recordingStarted({media_recorder: this.media_recorder_instance, media_devices: this.media_devices_instance, display_el: this.audio_rec_info_container});
    }

    async _snapImage () {
        // Create a canvas element to capture the image
        const canvas = document.createElement('canvas');
        canvas.width = this.media_display_el.videoWidth;
        canvas.height = this.media_display_el.videoHeight;

        // Draw the current this.media_display_el frame onto the canvas
        const context = canvas.getContext('2d');
        context.drawImage(this.media_display_el, 0, 0, canvas.width, canvas.height);

        const _class = this
        // Convert the canvas image to a data URL
        canvas.toBlob((e) => {
            _class.media_data.push(e);
            // Stop the video stream
            this.handleImageCaptured()
        }, 'image/png');

    }

    handleRecorderError () {
        const _class = this
        _class.media_recorder_instance.onerror = (e) => {
            _class.removeMediaCaptureUI()
            console.error(e);
        }
    }

    handleImageCaptured () {
        this.is_recording = false
        this.add_media_button.style.display = 'flex'
        this.media_data[0].name = this.getRandChars()
        this.callbackFn(this.media_data[0]);
        (this.media_type == 'image' && this.eventMethods.image_captured !== undefined) && this.eventMethods.image_captured({data: this.media_data});
        this.closeMediaPopup();
    }

    listenToMediaRecorderStop () {
        const _class = this
        _class.media_recorder_instance.onstop = (e) => {
            _class.animateStartActionButton(true)
            _class.media_display_el.pause()
            _class.media_display_el.srcObject = undefined

            if (this.audio_rec_info_container != undefined) {
                this.audio_rec_info_container.style.display = "none"
            }

            _class.media_display_el.innerHTML = `<source src="${window.URL.createObjectURL(new Blob(this.media_data))}" type="${this.media_data[0].type}" />`
            _class.media_display_el.controls = true
            this.media_display_el.muted = false      

            _class.is_recording = false;
            this.add_media_button.style.display = 'flex';
            this.media_data[0].name = _class.getRandChars();
            (this.media_type == 'video' && this.eventMethods.video_recordStop !== undefined) && this.eventMethods.video_recordStop({data: this.media_data, display_el: this.media_display_el});
            (this.media_type == 'audio' && this.eventMethods.audio_recordStop !== undefined) && this.eventMethods.audio_recordStop({data: this.media_data, display_el: this.media_display_el});
            (this.media_type == 'screen' && this.eventMethods.screen_recordStop !== undefined) && this.eventMethods.screen_recordStop({data: this.media_data, display_el: this.media_display_el});
        }
    }
}