export default class CustUpCore {
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
     * }}
     *
     * @param autoInitialize - Whether to automatically initialize the library
     *
     * @param disable_scrollbar - Whether to show or not show scrollbar
     *
     * @param persist_default_ui - Whether to show or not remove the default UI should be closable
     *
     * @param use_default_file_display_ui - Whether to use default file display UI
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
     * @param file_upload - options to handle file upload
     * @param upload_automatically - whether to upload file to the server automatically
     * @param show_upload_error_overlay - whether to show upload error overlay: defaults to true
     * @param file_source_icons - customize any file source icon of your choice
     * @param display_ui_tools - whether to display UI tool or not
     * @param allowed_tools - tools to display, an empty array displays all tools
     *
     * @param default_files - array of files to be added by default after initialization
     *
     * @param count_default_files - whether default added files should be counted as part of the added files - defaults to true
     *
     * @param instance_attach - instances of other custup instances - majorly for attaching files
     * @param single_upload - whether to upload all files at the same time including other data
     * @param persist_files - whether to persist files and restore files when user refreshes the page or after the library finished initialization if the persist type is hard
     * @param persist_type - set the persist type to either soft or hard, if hard it will use localstorage else it will use session storage
     * @param alert_timeout_time - the timeout for Custup alerts default is 300ms
     *
    */
    constructor({ autoInitialize, disable_scrollbar, persist_default_ui, use_default_file_display_ui, _custupDefaultUploadSentence, show_preview_file_btn, show_file_remove_btn, show_file_details_container, file_preview_animation_types, default_styles_override, persist_styles_override_across_instances, css_font_link, css_font_name, external_source_style_override, media_capture_source_style_override, allowed_file_types, targetRootElement, maxNumberOfFiles, minNumberOfFiles, minimumAllowedFileSize, maximumAllowedFileSize, ui_type, position_container, allowMultipleUpload, file_upload, upload_automatically, show_upload_error_overlay, show_upload_progress_bar, file_source_icons, allowed_sources, display_file_sources, display_ui_tools, show_ui_tools_on_mobile_devices, disable_drag_n_drop, disable_select_files_from_device, allowed_tools, default_icons_override, file_source_config, default_files, count_default_files, instance_attach, single_upload, persist_files, persist_type, alert_timeout_time, messages }: {
        _custupDefaultUploadSentence?: string | undefined;
        disable_scrollbar?: boolean | undefined;
        persist_default_ui?: boolean | undefined;
        use_default_file_display_ui?: boolean | undefined;
        show_preview_file_btn?: boolean | undefined;
        autoInitialize?: boolean | undefined;
        show_file_remove_btn?: boolean | undefined;
        show_file_details_container?: boolean | undefined;
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
        } | undefined;
        css_font_link?: string | undefined;
        css_font_name?: string | undefined;
        external_source_style_override?: {
            container: string;
            url_source_container: string;
            url_source_inner_container_1: string;
            url_source_inner_container_2: string;
            url_source_input_container: string;
            url_source_button_container: string;
            dropbox_ui_container: string;
            dalleOuterContainer: string;
            dalleInitialPageContainer: string;
            initialPageContentContainer: string;
            dalleIntialPageSearchContainer: string;
            dalleIntialPageButtonContainer: string;
            dalleIntialPageTitleContainer: string;
            dallePreviewPageContainer: string;
            image_preview_container: string;
            utils_button_container: string;
            accept_files_btn: string;
        } | undefined;
        media_capture_source_style_override?: {
            container: string;
            media_capture_main_container: string;
            media_capture_bottom_tools_container: string;
        } | undefined;
        default_styles_override?: {
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
            UITool: string;
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
            /**
             * @private @property {Object} file_progress
             */
            message_container: string;
            filePreviewer: string;
            filePreviewerInnerContainer: string;
        } | undefined;
        persist_styles_override_across_instances?: boolean | undefined;
        default_icons_override?: {
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
        } | undefined;
        allowed_file_types?: ("t" | "html" | "p" | "pre" | "s" | "sub" | "tr" | "json" | "text" | "svg" | "ms" | "dir" | "frame" | "box" | "123" | "3dml" | "3ds" | "3g2" | "3gp" | "7z" | "aab" | "aac" | "aam" | "aas" | "abw" | "ac" | "acc" | "ace" | "acu" | "acutc" | "adp" | "aep" | "afm" | "afp" | "ahead" | "ai" | "aif" | "aifc" | "aiff" | "air" | "ait" | "ami" | "apk" | "appcache" | "application" | "apr" | "arc" | "asc" | "asf" | "asm" | "aso" | "asx" | "atc" | "atom" | "atomcat" | "atomsvc" | "atx" | "au" | "avi" | "aw" | "azf" | "azs" | "azw" | "bat" | "bcpio" | "bdf" | "bdm" | "bed" | "bh2" | "bin" | "blb" | "blorb" | "bmi" | "bmp" | "book" | "boz" | "bpk" | "btif" | "bz" | "bz2" | "c" | "c11amc" | "c11amz" | "c4d" | "c4f" | "c4g" | "c4p" | "c4u" | "cab" | "caf" | "cap" | "car" | "cat" | "cb7" | "cba" | "cbr" | "cbt" | "cbz" | "cc" | "cct" | "ccxml" | "cdbcmsg" | "cdf" | "cdkey" | "cdmia" | "cdmic" | "cdmid" | "cdmio" | "cdmiq" | "cdx" | "cdxml" | "cdy" | "cer" | "cfs" | "cgm" | "chat" | "chm" | "chrt" | "cif" | "cii" | "cil" | "cla" | "class" | "clkk" | "clkp" | "clkt" | "clkw" | "clkx" | "clp" | "cmc" | "cmdf" | "cml" | "cmp" | "cmx" | "cod" | "com" | "conf" | "cpio" | "cpp" | "cpt" | "crd" | "crl" | "crt" | "cryptonote" | "csh" | "csml" | "csp" | "css" | "cst" | "csv" | "cu" | "curl" | "cww" | "cxt" | "cxx" | "dae" | "daf" | "dart" | "dataless" | "davmount" | "dbk" | "dcr" | "dcurl" | "dd2" | "ddd" | "deb" | "def" | "deploy" | "der" | "dfac" | "dgc" | "dic" | "dis" | "dist" | "distz" | "djv" | "djvu" | "dll" | "dmg" | "dmp" | "dms" | "dna" | "doc" | "docm" | "docx" | "dot" | "dotm" | "dotx" | "dp" | "dpg" | "dra" | "dsc" | "dssc" | "dtb" | "dtd" | "dts" | "dtshd" | "dump" | "dvb" | "dvi" | "dwf" | "dwg" | "dxf" | "dxp" | "dxr" | "ecelp4800" | "ecelp7470" | "ecelp9600" | "ecma" | "edm" | "edx" | "efif" | "ei6" | "elc" | "emf" | "eml" | "emma" | "emz" | "eol" | "eot" | "eps" | "epub" | "es3" | "esa" | "esf" | "et3" | "etx" | "eva" | "evy" | "exe" | "exi" | "ext" | "ez" | "ez2" | "ez3" | "f" | "f4v" | "f77" | "f90" | "fbs" | "fcdt" | "fcs" | "fdf" | "fe_launch" | "fg5" | "fgd" | "fh" | "fh4" | "fh5" | "fh7" | "fhc" | "fig" | "flac" | "fli" | "flo" | "flv" | "flw" | "flx" | "fly" | "fm" | "fnc" | "for" | "fpx" | "fsc" | "fst" | "ftc" | "fti" | "fvt" | "fxp" | "fxpl" | "fzs" | "g2w" | "g3" | "g3w" | "gac" | "gam" | "gbr" | "gca" | "gdl" | "geo" | "gex" | "ggb" | "ggt" | "ghf" | "gif" | "gim" | "gml" | "gmx" | "gnumeric" | "gph" | "gpx" | "gqf" | "gqs" | "gram" | "gramps" | "gre" | "grv" | "grxml" | "gsf" | "gtar" | "gtm" | "gtw" | "gv" | "gxf" | "gxt" | "h" | "h261" | "h263" | "h264" | "hal" | "hbci" | "hdf" | "hh" | "hlp" | "hpgl" | "hpid" | "hps" | "hqx" | "htke" | "htm" | "hvd" | "hvp" | "hvs" | "i2g" | "icc" | "ice" | "icm" | "ico" | "ics" | "ief" | "ifb" | "ifm" | "iges" | "igl" | "igm" | "igs" | "igx" | "iif" | "imp" | "ims" | "in" | "ink" | "inkml" | "install" | "iota" | "ipfix" | "ipk" | "irm" | "irp" | "iso" | "itp" | "ivp" | "ivu" | "jad" | "jam" | "jar" | "java" | "javascript" | "jisp" | "jlt" | "jnlp" | "joda" | "jpe" | "jpeg" | "jpg" | "jpgm" | "jpgv" | "jpm" | "js" | "jsonml" | "kar" | "karbon" | "kfo" | "kia" | "kml" | "kmz" | "kne" | "knp" | "kon" | "kpr" | "kpt" | "kpxx" | "ksp" | "ktr" | "ktx" | "ktz" | "kwd" | "kwt" | "lasxml" | "latex" | "lbd" | "lbe" | "les" | "lha" | "link66" | "list" | "list3820" | "listafp" | "lnk" | "log" | "lostxml" | "lrf" | "lrm" | "ltf" | "lvp" | "lwp" | "lzh" | "m13" | "m14" | "m1v" | "m21" | "m2a" | "m2v" | "m3a" | "m3u" | "m3u8" | "m4a" | "m4u" | "m4v" | "ma" | "mads" | "mag" | "maker" | "man" | "mar" | "mathml" | "mb" | "mbk" | "mbox" | "mc1" | "mcd" | "mcurl" | "mdb" | "mdi" | "me" | "mesh" | "meta4" | "metalink" | "mets" | "mfm" | "mft" | "mgp" | "mgz" | "mid" | "midi" | "mie" | "mif" | "mime" | "mj2" | "mjp2" | "mjs" | "mk3d" | "mka" | "mks" | "mkv" | "mlp" | "mmd" | "mmf" | "mmr" | "mng" | "mny" | "mobi" | "mods" | "mov" | "movie" | "mp2" | "mp21" | "mp2a" | "mp3" | "mp4" | "mp4a" | "mp4s" | "mp4v" | "mpc" | "mpe" | "mpeg" | "mpg" | "mpg4" | "mpga" | "mpkg" | "mpm" | "mpn" | "mpp" | "mpt" | "mpy" | "mqy" | "mrc" | "mrcx" | "mscml" | "mseed" | "mseq" | "msf" | "msh" | "msi" | "msl" | "msty" | "mts" | "mus" | "musicxml" | "mvb" | "mwf" | "mxf" | "mxl" | "mxml" | "mxs" | "mxu" | "n-gage" | "n3" | "nb" | "nbp" | "nc" | "ncx" | "nfo" | "ngdat" | "nitf" | "nlu" | "nml" | "nnd" | "nns" | "nnw" | "npx" | "nsc" | "nsf" | "ntf" | "nzb" | "oa2" | "oa3" | "oas" | "obd" | "obj" | "oda" | "odb" | "odc" | "odf" | "odft" | "odg" | "odi" | "odm" | "odp" | "ods" | "odt" | "oga" | "ogg" | "ogv" | "ogx" | "omdoc" | "onepkg" | "onetmp" | "onetoc" | "onetoc2" | "opf" | "opml" | "oprc" | "opus" | "org" | "osf" | "osfpvg" | "otc" | "otf" | "otg" | "oth" | "oti" | "otp" | "ots" | "ott" | "oxps" | "oxt" | "p10" | "p12" | "p7b" | "p7c" | "p7m" | "p7r" | "p7s" | "p8" | "pas" | "paw" | "pbd" | "pbm" | "pcap" | "pcf" | "pcl" | "pclxl" | "pct" | "pcurl" | "pcx" | "pdb" | "pdf" | "pfa" | "pfb" | "pfm" | "pfr" | "pfx" | "pgm" | "pgn" | "pgp" | "pic" | "pkg" | "pki" | "pkipath" | "plb" | "plc" | "plf" | "pls" | "pml" | "png" | "pnm" | "portpkg" | "pot" | "potm" | "potx" | "ppam" | "ppd" | "ppm" | "pps" | "ppsm" | "ppsx" | "ppt" | "pptm" | "pptx" | "pqa" | "prc" | "prf" | "ps" | "psb" | "psd" | "psf" | "pskcxml" | "ptid" | "pub" | "pvb" | "pwn" | "pya" | "pyv" | "qam" | "qbo" | "qfx" | "qps" | "qt" | "qwd" | "qwt" | "qxb" | "qxd" | "qxl" | "qxt" | "ra" | "ram" | "rar" | "ras" | "rcprofile" | "rdf" | "rdz" | "rep" | "res" | "rgb" | "rif" | "rip" | "ris" | "rl" | "rlc" | "rld" | "rm" | "rmi" | "rmp" | "rms" | "rmvb" | "rnc" | "roa" | "roff" | "rp9" | "rpss" | "rpst" | "rq" | "rs" | "rsd" | "rss" | "rtf" | "rtx" | "s3m" | "saf" | "sbml" | "sc" | "scd" | "scm" | "scq" | "scs" | "scurl" | "sda" | "sdc" | "sdd" | "sdkd" | "sdkm" | "sdp" | "sdw" | "see" | "seed" | "sema" | "semd" | "semf" | "ser" | "setpay" | "setreg" | "sfd-hdstx" | "sfs" | "sfv" | "sgi" | "sgl" | "sgm" | "sgml" | "sh" | "shar" | "shf" | "sid" | "sig" | "sil" | "silo" | "sis" | "sisx" | "sit" | "sitx" | "skd" | "skm" | "skp" | "skt" | "sldm" | "sldx" | "slt" | "sm" | "smf" | "smi" | "smil" | "smv" | "smzip" | "snd" | "snf" | "so" | "spc" | "spf" | "spl" | "spot" | "spp" | "spq" | "spx" | "sql" | "src" | "srt" | "sru" | "srx" | "ssdl" | "sse" | "ssf" | "ssml" | "st" | "stc" | "std" | "stf" | "sti" | "stk" | "stl" | "str" | "stw" | "sus" | "susp" | "sv4cpio" | "sv4crc" | "svc" | "svd" | "svgz" | "swa" | "swf" | "swi" | "sxc" | "sxd" | "sxg" | "sxi" | "sxm" | "sxw" | "t3" | "taglet" | "tao" | "tar" | "tcap" | "tcl" | "teacher" | "tei" | "teicorpus" | "tex" | "texi" | "texinfo" | "tfi" | "tfm" | "tga" | "thmx" | "tif" | "tiff" | "tmo" | "torrent" | "tpl" | "tpt" | "tra" | "trm" | "tsd" | "tsv" | "ttc" | "ttf" | "ttl" | "twd" | "twds" | "txd" | "txf" | "txt" | "u32" | "udeb" | "ufd" | "ufdl" | "ulx" | "umj" | "unityweb" | "uoml" | "uri" | "uris" | "urls" | "ustar" | "utz" | "uu" | "uva" | "uvd" | "uvf" | "uvg" | "uvh" | "uvi" | "uvm" | "uvp" | "uvs" | "uvt" | "uvu" | "uvv" | "uvva" | "uvvd" | "uvvf" | "uvvg" | "uvvh" | "uvvi" | "uvvm" | "uvvp" | "uvvs" | "uvvt" | "uvvu" | "uvvv" | "uvvx" | "uvvz" | "uvx" | "uvz" | "vcard" | "vcd" | "vcf" | "vcg" | "vcs" | "vcx" | "vis" | "viv" | "vob" | "vor" | "vox" | "vrml" | "vsd" | "vsf" | "vss" | "vst" | "vsw" | "vtu" | "vxml" | "w3d" | "wad" | "wav" | "wax" | "wbmp" | "wbs" | "wbxml" | "wcm" | "wdb" | "wdp" | "weba" | "webm" | "webm1" | "webp" | "wg" | "wgt" | "wks" | "wm" | "wma" | "wmd" | "wmf" | "wml" | "wmlc" | "wmls" | "wmlsc" | "wmv" | "wmx" | "wmz" | "woff" | "woff2" | "wpd" | "wpl" | "wps" | "wqd" | "wri" | "wrl" | "wsdl" | "wspolicy" | "wtb" | "wvx" | "x32" | "x3d" | "x3db" | "x3dbz" | "x3dv" | "x3dvz" | "x3dz" | "xaml" | "xap" | "xar" | "xbap" | "xbd" | "xbm" | "xdf" | "xdm" | "xdp" | "xdssc" | "xdw" | "xenc" | "xer" | "xfdf" | "xfdl" | "xht" | "xhtml" | "xhvml" | "xif" | "xla" | "xlam" | "xlc" | "xlf" | "xlm" | "xls" | "xlsb" | "xlsm" | "xlsx" | "xlt" | "xltm" | "xltx" | "xlw" | "xm" | "xml" | "xo" | "xop" | "xpi" | "xpl" | "xpm" | "xpr" | "xps" | "xpw" | "xpx" | "xsl" | "xslt" | "xsm" | "xspf" | "xul" | "xvm" | "xvml" | "xwd" | "xyz" | "xz" | "yang" | "yin" | "z1" | "z2" | "z3" | "z4" | "z5" | "z6" | "z7" | "z8" | "zaz" | "zip" | "zir" | "zirz" | "zmm")[] | undefined;
        targetRootElement: string;
        maxNumberOfFiles?: number | undefined;
        minNumberOfFiles?: number | undefined;
        minimumAllowedFileSize?: number | undefined;
        maximumAllowedFileSize?: number | undefined;
        ui_type?: "default" | "resumeUploaderUI" | "bare" | "detached" | "profilePicture" | "elegant" | undefined;
        display_ui_tools?: boolean | undefined;
        show_ui_tools_on_mobile_devices?: boolean | undefined;
        disable_drag_n_drop?: boolean | undefined;
        disable_select_files_from_device?: boolean | undefined;
        allowed_tools?: ("upload" | "tools_dragger" | "add_file" | "added_files_count" | "clear_files")[] | undefined;
        position_container?: {
            beforeEl: string;
        } | "before" | "after" | "overwrite" | undefined;
        file_preview_animation_types?: ("slideInRight" | "slideInTop" | "slideInLeft" | "slideInBottom" | "zoomIn" | "fadeIn")[] | undefined;
        allowMultipleUpload?: boolean | undefined;
        file_upload?: {
            endpoint_url: string;
            files_field_name: string;
            form_field?: string | HTMLFormElement | undefined;
            additional_data?: object | undefined;
            axios_settings: {
                headers: {};
                configs: {};
            };
            chunk_size: number;
            should_chunk: boolean;
        } | undefined;
        allowed_sources?: ("capture_image" | "record_audio" | "record_screen" | "google_drive_source" | "dropbox_source" | "box_source" | "openai_dalle_source" | "record_video" | "link_source")[] | undefined;
        display_file_sources?: boolean | undefined;
        upload_automatically?: boolean | undefined;
        show_upload_error_overlay?: boolean | undefined;
        show_upload_progress_bar?: boolean | undefined;
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
        } | undefined;
        default_files?: {
            file: string | File | Blob;
            isUploadable: boolean;
            headers: any;
        }[] | undefined;
        count_default_files?: boolean | undefined;
        instance_attach?: object[] | undefined;
        single_upload?: boolean | undefined;
        persist_files?: boolean | undefined;
        persist_type?: "soft" | "hard" | undefined;
        alert_timeout_time?: number | undefined;
        messages?: {
            timeout?: number | undefined;
        } | undefined;
    });
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
        UITool: string;
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
        /**
         * @private @property {Object} file_progress
         */
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
     * Events
     * @private @property {any} eventMethods
     */
    private eventMethods;
    /**
     * Events
     * @private @property {any} eventMethods
     */
    private deviceFileSourceEventMethods;
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
    UIToolEl: undefined;
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
    toolDragger: undefined;
    /**
     * @private @property {number} currentToolElOffsetLeft
     */
    private currentToolElOffsetLeft;
    /**
     * @private @property {number} currentToolElOffsetBottom
     */
    private currentToolElOffsetBottom;
    /**
     * @private @property {number} lastToolOffsetBottom
     */
    private lastToolOffsetBottom;
    /**
     * @private @property {number} lastToolOffsetLeft
     */
    private lastToolOffsetLeft;
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
    protected set_file_preview_animations(): void;
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
     * removed because tool dragging has been removed for touch devices,
     * the upload tool on bigger screens has been changed to a static tool which is displayed inside the header on mobile devices
     * @deprecated @protected @method handleInnerElementContainerPointerDown
     */
    protected handleInnerElementContainerPointerDown(e: any): void;
    /**
     * @protected @method handleInnerElementContainerMouseUp
     */
    protected handleInnerElementContainerMouseUp(e: any): void;
    /**
     * @protected @method handleToolDraggerMouseMove
     */
    protected handleToolDraggerMouseMove(e: any): void;
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
     * on - listen for an event
     * @param { 'file.beforeAdded' |
     *  'library.init' |
     *  'file.afterAdded' |
     *  'file.beforePassedChecks' |
     *  'file.removed' |
     *  'file.defaultFileRemoved' |
     *  'file.all_removed' |
     *  'video.recordingStarted' |
     *  'video.recording' |
     *  'video.recordStop' |
     *  'video.recordSaved' |
     *  'video.recordCancel' |
     *  'image.captured' |
     *  'audio.recordingStarted' |
     *  'audio.recording' |
     *  'audio.recordStop' |
     *  'audio.recordSaved' |
     *  'audio.recordCancel' |
     *  'screen.recordingStarted' |
     *  'screen.recording' |
     *  'screen.recordStop' |
     *  'screen.recordSaved' |
     *  'screen.recordCancel' |
     *  'upload.beforeStart' |
     *  'upload.progress' |
     *  'upload.success' |
     *  'upload.error' |
     *  'upload.retry' |
     *  'upload.all_finished' |
     *  'file_source.closed' |
     *  'default_ui.shown' |
     *  'default_ui.closed'
     * } event - event name
     * @param {Function} callbackFn - the callback function
     */
    on(event: 'file.beforeAdded' | 'library.init' | 'file.afterAdded' | 'file.beforePassedChecks' | 'file.removed' | 'file.defaultFileRemoved' | 'file.all_removed' | 'video.recordingStarted' | 'video.recording' | 'video.recordStop' | 'video.recordSaved' | 'video.recordCancel' | 'image.captured' | 'audio.recordingStarted' | 'audio.recording' | 'audio.recordStop' | 'audio.recordSaved' | 'audio.recordCancel' | 'screen.recordingStarted' | 'screen.recording' | 'screen.recordStop' | 'screen.recordSaved' | 'screen.recordCancel' | 'upload.beforeStart' | 'upload.progress' | 'upload.success' | 'upload.error' | 'upload.retry' | 'upload.all_finished' | 'file_source.closed' | 'default_ui.shown' | 'default_ui.closed', callbackFn: Function): void;
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
import { external_sources_ui_styles } from "../utils/_styles.js";
import { media_capture_ui_styles } from "../utils/_styles.js";
import { ui_styles } from "../utils/_styles.js";
import icons from '../utils/icons.js';
//# sourceMappingURL=custupCore.d.ts.map