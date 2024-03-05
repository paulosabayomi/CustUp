/**
 * Types of CustUp event types
*  @typedef {'library.init' | 
*   'library.beforeInit' | 
*   'file.beforeAdded' | 
*   'file.afterAdded' | 
*   'file.beforePassedChecks' | 
*   'file.removed' | 
*   'file.defaultFileRemoved' | 
*   'file.all_removed' | 
*   'upload.beforeStart' | 
*   'upload.progress' | 
*   'upload.success' | 
*   'upload.error' |
*   'upload.retry' |
*   'upload.all_finished' |
*   'file_source.closed' |
*   'default_ui.shown' |
*   'default_ui.closed' |
*   'video.recordingStarted' |
*   'video.recording' | 
*   'video.recordStop' | 
*   'video.recordSaved' |
*   'video.recordCancel' | 
*   'image.captured' | 
*   'audio.recordingStarted' | 
*   'audio.recording' | 
*   'audio.recordStop' | 
*   'audio.recordSaved' | 
*   'audio.recordCancel' | 
*   'screen.recordingStarted' | 
*   'screen.recording' | 
*   'screen.recordStop' | 
*   'screen.recordSaved' | 
*   'screen.recordCancel'
* } TEventNames
* 
*/

export default { 
    library_init: 'library.init', 
    library_beforeInit: 'library.beforeInit', 
    file_beforeAdded: 'file.beforeAdded', 
    file_afterAdded: 'file.afterAdded', 
    file_beforePassedChecks: 'file.beforePassedChecks', 
    file_removed: 'file.removed', 
    file_defaultFileRemoved: 'file.defaultFileRemoved', 
    file_all_removed: 'file.all_removed', 

    // file upload
    upload_beforeStart: 'upload.beforeStart', 
    upload_progress: 'upload.progress', 
    upload_success: 'upload.success', 
    upload_error: 'upload.error',
    upload_retry: 'upload.retry',
    upload_all_finished: 'upload.all_finished',

    file_source_closed: 'file_source.closed',
    default_ui_shown: 'default_ui.shown',
    default_ui_closed: 'default_ui.closed',

    // media source events
    video_recordingStarted: 'video.recordingStarted',
    video_recording: 'video.recording', 
    video_recordStop: 'video.recordStop', 
    video_recordSaved: 'video.recordSaved',
    video_recordCancel: 'video.recordCancel', 
    image_captured: 'image.captured', 
    audio_recordingStarted: 'audio.recordingStarted', 
    audio_recording: 'audio.recording', 
    audio_recordStop: 'audio.recordStop', 
    audio_recordSaved: 'audio.recordSaved', 
    audio_recordCancel: 'audio.recordCancel', 
    screen_recordingStarted: 'screen.recordingStarted', 
    screen_recording: 'screen.recording', 
    screen_recordStop: 'screen.recordStop', 
    screen_recordSaved: 'screen.recordSaved', 
    screen_recordCancel: 'screen.recordCancel', 
}
