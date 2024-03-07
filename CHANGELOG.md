# Changelog

## 1.1.5 (2024-03-05)

- Fix: Typescript bugs caused by not setting optional options as optional.

- Fix: The bug caused by not selecting the provided form field element by query selector before passing it to the FormData object.

- Fix: Bug caused by trying to get `file` key from the returned data in the progress event listener in the elegant UI type before file upload.

## 1.1.4 (2024-03-05)

- Fix: A bug caused by trying to update `_custupDefaultUploadSentence` option in `setOptions` method.

## 1.1.3 (2024-03-05)

- Fix: Corrected the type mistake made in version 1.1.2 by removing `targetRootElement`, it is now optional in type but still required by CustUp.

## 1.1.2 (2024-03-05)

- Fix: Fixed setOptions type bug by removing `targetRootElement` which is required by CustUp but cannot be set with `setOptions`.

## 1.1.1 (2024-03-05)

- New: Moved the option types to a new file
- New: Added option types to the `setOptions` method

## 1.1.0 (2024-03-05)

- New: CustUp now extends `EventTarget` and it can now trigger events, and events triggered by CustUp can be listened for by calling the `addEventListener` or the `on` method
- New: Options are now set with the setOptions method
- New: Added setOptions method
- New: Added `on` method as a shortcut for listening for CustUp events
- Fix: Default UI tool dragger removed and replaced with tools in the header
- Fix: Bug caused by former event emitter
- Fix: Bugs in the documentation bugs
- Remove: Tool dragger has been removed

## 1.0.5

- Fix: Unhandled fetch exception when loading default files.

## 1.0.4

- Fix: Added toggle button to toggle add new file UI visible or hidden to the Elegant UI type.
- New: Added hide_add_file_ui method
- New: Added is_add_file_ui_shown

## 1.0.0

- New: Added chunk upload
- New: Added new UI type: elegant
- Fix: file persistent storage method, files are now stored as ObjectURL on https and base64 on http
- New: Added auto upload for files added to the UI when files are still uploading
- New: Added option display_file_sources: if set to false the file sources will not be listed on the default UI.
- New: New event: 'file_source.closed' event that gets triggered when file source popup is closed.
- New: New method: display_message
- New: New method: get_file_sources
- New: Added two options to file_upload option: chunk_size and should_chunk.
- New: Added messages option for configuring messages with timeout option.
- New: Added event 'default_ui.shown' and 'default_ui.closed'.
- New: Added clear_persisted_files method.
- New: Added close_file_source_popup method.
- New: Added new option show_upload_progress_bar.
- New: Added upload_all_finished event.
- New: Added select_file_from_device method.

## 0.2.0

- New: Added custup options typescript types

## 0.1.0

- New: Added typescript support

## 0.0.7 (2023-01-05)

- Fix: a bug in custom scroll on touch devices caused by a test case that I forgot to remove.

## 0.0.6 (2023-01-04)

- Fix: Custom scroll on touch devices.
- New: Added file size to detached UI type.
- New: Handled mobile device tools, in which tools are displayed currently in the header for default UI on mobile devices and the movable panel on bigger screens.
- New: Added new option `show_ui_tools_on_mobile_devices` for specifying if the header container should be filled with tools on mobile devices or not.
