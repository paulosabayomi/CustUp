# Changelog

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
