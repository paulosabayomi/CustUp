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
     *      show_ui_tools_on_mobile_devices: boolean;
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
     *      instance_attach: Array<object>;
     *      single_upload: boolean;
     *      persist_files: boolean;
     *      persist_type: 'soft' | 'hard';
     *      alert_timeout_time: number;
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
    constructor({ autoInitialize, disable_scrollbar, persist_default_ui, use_default_file_display_ui, _custupDefaultUploadSentence, show_preview_file_btn, show_file_remove_btn, show_file_details_container, file_preview_animation_types, default_styles_override, persist_styles_override_across_instances, css_font_link, css_font_name, external_source_style_override, media_capture_source_style_override, allowed_file_types, targetRootElement, maxNumberOfFiles, minNumberOfFiles, minimumAllowedFileSize, maximumAllowedFileSize, ui_type, position_container, allowMultipleUpload, file_upload, upload_automatically, show_upload_error_overlay, file_source_icons, allowed_sources, display_ui_tools, show_ui_tools_on_mobile_devices, disable_drag_n_drop, disable_select_files_from_device, allowed_tools, default_icons_override, file_source_config, default_files, count_default_files, instance_attach, single_upload, persist_files, persist_type, alert_timeout_time }: {
        _custupDefaultUploadSentence?: string | undefined;
        disable_scrollbar?: boolean | undefined;
        persist_default_ui?: boolean | undefined;
        use_default_file_display_ui?: boolean | undefined;
        show_preview_file_btn?: boolean | undefined;
        autoInitialize?: boolean | undefined;
        show_file_remove_btn?: boolean | undefined;
        show_file_details_container?: boolean | undefined;
        file_source_icons: {
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
            /**
             * An array that holds successfully uploaded files
             * @protected @property {File[]} successfullyUploadedFiles
             */
            fileDisplayUI: string;
            fileUIOuterContainer: string;
            fileDetailsContainer: string;
            custup_fileName: string;
            custup_fileSize: string;
            fileBottomDetails: string;
            fileUIBottomToolsContainer: string;
            file_wrapper_el: string; /**
             * Custup UI styles
             * @protected @property {FormData} ui_styles
             */
            fileUI: string;
            remove_file_btn: string;
            file_upload_overlay_ui: string;
            file_upload_overlay_inner_container: string;
            upload_progress_container: string;
            file_upload_progress: string;
            file_upload_progress_inner: string;
            retry_upload_overlay_ui: string;
            retry_upload_button: string;
            message_container: string;
            filePreviewer: string;
            filePreviewerInnerContainer: string;
        } | undefined;
        persist_styles_override_across_instances?: boolean | undefined;
        default_icons_override?: {
            add_file: string;
            add_file_2: string;
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
            /**
             * @protected handleCustomScroll
             */
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
        } | undefined;
        allowed_file_types: (keyof {
            '123': string;
            '3dml': string;
            '3ds': string;
            '3g2': string;
            '3gp': string;
            '7z': string;
            aab: string;
            aac: string;
            aam: string;
            aas: string;
            abw: string;
            ac: string;
            acc: string;
            ace: string;
            acu: string;
            /**
             * Array that holds default loaded files
             * @public @property {File[]} defaultFiles
             */
            acutc: string;
            adp: string;
            aep: string;
            afm: string;
            afp: string;
            ahead: string;
            ai: string;
            /**
             * Array that holds that could not be sent because of an error
             * @protected @property {File[]} filesNotSent
             */
            aif: string;
            aifc: string;
            aiff: string;
            air: string;
            /**
             * An array that holds successfully uploaded files
             * @protected @property {File[]} successfullyUploadedFiles
             */
            ait: string;
            ami: string;
            apk: string;
            appcache: string;
            application: string;
            apr: string;
            arc: string;
            asc: string; /**
             * Custup FormData for uploading files
             * @private @property {FormData} file_upload_form_data
             */
            asf: string;
            asm: string;
            aso: string;
            asx: string;
            atc: string;
            atom: string;
            atomcat: string;
            atomsvc: string;
            atx: string;
            au: string;
            avi: string; /**
             * Custup Axios instance for file upload
             * @private @property {axios} __axios_instance
             */
            aw: string;
            azf: string;
            azs: string;
            /**
             * Events
             * @private @property {any} eventMethods
             */
            azw: string;
            bat: string;
            bcpio: string;
            bdf: string;
            bdm: string;
            bed: string;
            bh2: string;
            bin: string;
            blb: string;
            blorb: string;
            bmi: string;
            bmp: string;
            book: string;
            box: string; /**
             * Events
             * @private @property {any} eventMethods
             */
            boz: string;
            bpk: string;
            btif: string;
            bz: string;
            bz2: string;
            c: string;
            c11amc: string;
            c11amz: string;
            c4d: string;
            c4f: string;
            c4g: string;
            c4p: string;
            c4u: string;
            cab: string;
            caf: string;
            cap: string;
            car: string;
            cat: string;
            cb7: string;
            cba: string;
            cbr: string;
            cbt: string;
            cbz: string;
            cc: string;
            cct: string;
            ccxml: string;
            cdbcmsg: string;
            cdf: string;
            cdkey: string;
            cdmia: string;
            cdmic: string;
            cdmid: string;
            cdmio: string;
            cdmiq: string;
            cdx: string;
            cdxml: string;
            cdy: string;
            cer: string;
            cfs: string;
            cgm: string;
            chat: string;
            chm: string;
            chrt: string;
            cif: string;
            cii: string;
            cil: string;
            cla: string;
            class: string;
            clkk: string;
            clkp: string;
            clkt: string;
            clkw: string;
            clkx: string;
            clp: string;
            cmc: string;
            cmdf: string;
            cml: string;
            cmp: string;
            cmx: string;
            cod: string;
            com: string;
            conf: string;
            cpio: string;
            cpp: string;
            cpt: string;
            crd: string;
            crl: string;
            crt: string;
            cryptonote: string;
            csh: string;
            csml: string;
            csp: string;
            css: string;
            cst: string;
            csv: string;
            cu: string;
            curl: string;
            cww: string;
            cxt: string;
            cxx: string;
            dae: string;
            daf: string;
            dart: string; /** Custup Options
             * @protected @param {{}} options
             *
            */
            dataless: string;
            davmount: string;
            dbk: string;
            dcr: string;
            dcurl: string;
            dd2: string;
            ddd: string;
            deb: string;
            def: string;
            deploy: string;
            der: string;
            dfac: string;
            dgc: string;
            dic: string;
            dir: string;
            dis: string;
            dist: string;
            distz: string;
            djv: string;
            djvu: string;
            dll: string;
            dmg: string;
            dmp: string;
            dms: string;
            dna: string;
            doc: string;
            docm: string;
            docx: string;
            dot: string;
            dotm: string;
            dotx: string;
            dp: string;
            dpg: string;
            dra: string;
            dsc: string;
            dssc: string;
            dtb: string;
            dtd: string;
            dts: string;
            dtshd: string;
            dump: string;
            dvb: string;
            dvi: string;
            dwf: string;
            dwg: string;
            dxf: string;
            dxp: string;
            dxr: string;
            ecelp4800: string;
            ecelp7470: string;
            ecelp9600: string;
            ecma: string;
            edm: string;
            edx: string;
            efif: string;
            ei6: string;
            elc: string;
            emf: string;
            eml: string;
            emma: string;
            emz: string;
            eol: string;
            eot: string;
            eps: string;
            epub: string;
            es3: string;
            esa: string;
            esf: string;
            et3: string;
            etx: string;
            eva: string;
            evy: string;
            exe: string;
            exi: string;
            ext: string;
            ez: string;
            ez2: string;
            ez3: string;
            f: string;
            f4v: string;
            f77: string;
            f90: string;
            fbs: string;
            fcdt: string;
            fcs: string;
            fdf: string;
            fe_launch: string;
            fg5: string;
            fgd: string;
            fh: string;
            fh4: string;
            fh5: string;
            fh7: string;
            fhc: string;
            fig: string;
            flac: string;
            fli: string;
            flo: string;
            flv: string;
            flw: string;
            flx: string;
            fly: string;
            fm: string;
            fnc: string;
            for: string;
            fpx: string;
            frame: string;
            fsc: string;
            fst: string;
            ftc: string;
            fti: string;
            fvt: string;
            fxp: string;
            fxpl: string;
            fzs: string;
            g2w: string;
            g3: string;
            g3w: string;
            gac: string;
            gam: string;
            gbr: string;
            gca: string;
            gdl: string;
            geo: string;
            gex: string;
            ggb: string;
            ggt: string;
            ghf: string;
            gif: string;
            gim: string;
            gml: string;
            gmx: string;
            gnumeric: string;
            gph: string;
            gpx: string;
            gqf: string;
            gqs: string;
            gram: string;
            gramps: string;
            gre: string;
            grv: string;
            grxml: string;
            gsf: string;
            gtar: string;
            gtm: string;
            gtw: string;
            gv: string;
            gxf: string;
            gxt: string;
            h: string;
            h261: string;
            h263: string;
            h264: string;
            hal: string;
            hbci: string;
            hdf: string;
            hh: string;
            hlp: string;
            hpgl: string;
            hpid: string;
            hps: string;
            hqx: string;
            htke: string;
            htm: string;
            html: string;
            hvd: string;
            hvp: string;
            hvs: string;
            i2g: string;
            icc: string;
            ice: string;
            icm: string;
            ico: string;
            ics: string;
            ief: string;
            ifb: string;
            ifm: string;
            iges: string;
            igl: string;
            igm: string;
            igs: string;
            igx: string;
            iif: string;
            imp: string;
            ims: string;
            in: string;
            ink: string;
            inkml: string;
            install: string;
            iota: string;
            ipfix: string;
            ipk: string;
            irm: string;
            irp: string;
            iso: string;
            itp: string;
            ivp: string;
            ivu: string;
            jad: string;
            jam: string;
            jar: string;
            java: string;
            javascript: string;
            jisp: string;
            jlt: string;
            jnlp: string;
            joda: string;
            jpe: string;
            jpeg: string;
            jpg: string;
            jpgm: string;
            jpgv: string;
            jpm: string;
            js: string;
            json: string;
            jsonml: string;
            kar: string;
            karbon: string;
            kfo: string;
            kia: string;
            kml: string;
            kmz: string;
            kne: string;
            knp: string;
            kon: string;
            kpr: string;
            kpt: string;
            kpxx: string;
            ksp: string;
            ktr: string;
            ktx: string;
            ktz: string;
            kwd: string;
            kwt: string;
            lasxml: string;
            latex: string;
            lbd: string;
            lbe: string;
            les: string;
            lha: string;
            link66: string;
            list: string;
            list3820: string;
            listafp: string;
            lnk: string;
            log: string;
            lostxml: string;
            lrf: string;
            lrm: string;
            ltf: string;
            lvp: string;
            lwp: string;
            lzh: string;
            m13: string;
            m14: string;
            m1v: string;
            m21: string;
            m2a: string;
            m2v: string;
            m3a: string;
            m3u: string;
            m3u8: string;
            m4a: string;
            m4u: string;
            m4v: string;
            ma: string;
            mads: string;
            mag: string;
            maker: string;
            man: string;
            mar: string;
            mathml: string;
            mb: string;
            mbk: string;
            mbox: string;
            mc1: string;
            mcd: string;
            mcurl: string;
            mdb: string;
            mdi: string;
            me: string;
            mesh: string;
            meta4: string;
            metalink: string;
            mets: string;
            mfm: string;
            mft: string;
            mgp: string;
            mgz: string;
            mid: string;
            midi: string;
            mie: string;
            mif: string;
            mime: string;
            mj2: string;
            mjp2: string;
            mjs: string;
            mk3d: string;
            mka: string;
            mks: string;
            mkv: string;
            mlp: string;
            mmd: string;
            mmf: string;
            mmr: string;
            mng: string;
            mny: string;
            mobi: string;
            mods: string;
            mov: string;
            movie: string;
            mp2: string;
            mp21: string;
            mp2a: string;
            mp3: string;
            mp4: string;
            mp4a: string;
            mp4s: string;
            mp4v: string;
            mpc: string;
            mpe: string;
            mpeg: string;
            mpg: string;
            mpg4: string;
            mpga: string;
            mpkg: string;
            mpm: string;
            mpn: string;
            mpp: string;
            mpt: string;
            mpy: string;
            mqy: string;
            mrc: string;
            mrcx: string;
            ms: string;
            mscml: string;
            mseed: string;
            mseq: string;
            msf: string;
            msh: string;
            msi: string;
            msl: string;
            msty: string;
            mts: string;
            mus: string;
            musicxml: string;
            mvb: string;
            mwf: string;
            mxf: string;
            mxl: string;
            mxml: string;
            mxs: string;
            mxu: string;
            'n-gage': string;
            n3: string;
            nb: string;
            nbp: string;
            nc: string;
            ncx: string;
            nfo: string;
            ngdat: string;
            nitf: string;
            nlu: string;
            nml: string;
            nnd: string;
            nns: string;
            nnw: string;
            npx: string;
            nsc: string;
            nsf: string;
            ntf: string;
            nzb: string;
            oa2: string;
            oa3: string;
            oas: string;
            obd: string;
            obj: string;
            oda: string;
            odb: string;
            odc: string;
            odf: string;
            odft: string;
            odg: string;
            odi: string;
            odm: string;
            odp: string;
            ods: string;
            odt: string;
            oga: string;
            ogg: string;
            ogv: string;
            ogx: string;
            omdoc: string;
            onepkg: string;
            onetmp: string;
            onetoc: string;
            onetoc2: string;
            opf: string;
            opml: string;
            oprc: string;
            opus: string;
            org: string;
            osf: string;
            osfpvg: string;
            otc: string;
            otf: string;
            otg: string;
            oth: string;
            oti: string;
            otp: string;
            ots: string;
            ott: string;
            oxps: string;
            oxt: string;
            p: string;
            p10: string;
            p12: string;
            p7b: string;
            p7c: string;
            p7m: string;
            p7r: string;
            p7s: string;
            p8: string;
            pas: string;
            paw: string;
            pbd: string;
            pbm: string;
            pcap: string;
            pcf: string;
            pcl: string;
            pclxl: string;
            pct: string;
            pcurl: string;
            pcx: string;
            pdb: string;
            pdf: string;
            pfa: string;
            pfb: string;
            pfm: string;
            pfr: string;
            pfx: string;
            pgm: string;
            pgn: string;
            pgp: string;
            pic: string;
            pkg: string;
            pki: string;
            pkipath: string;
            plb: string;
            plc: string;
            plf: string;
            pls: string;
            pml: string;
            png: string;
            pnm: string;
            portpkg: string;
            pot: string;
            potm: string;
            potx: string;
            ppam: string;
            ppd: string;
            ppm: string;
            pps: string;
            ppsm: string;
            ppsx: string;
            ppt: string;
            pptm: string;
            pptx: string;
            pqa: string;
            prc: string;
            pre: string;
            prf: string;
            ps: string;
            psb: string;
            psd: string;
            psf: string;
            pskcxml: string;
            ptid: string;
            pub: string;
            pvb: string;
            pwn: string;
            pya: string;
            pyv: string;
            qam: string;
            qbo: string;
            qfx: string;
            qps: string;
            qt: string;
            qwd: string;
            qwt: string;
            qxb: string;
            qxd: string;
            qxl: string;
            qxt: string;
            ra: string;
            ram: string;
            rar: string;
            ras: string;
            rcprofile: string;
            rdf: string;
            rdz: string;
            rep: string;
            res: string;
            rgb: string;
            rif: string;
            rip: string;
            ris: string;
            rl: string;
            rlc: string;
            rld: string;
            rm: string;
            rmi: string;
            rmp: string;
            rms: string;
            rmvb: string;
            rnc: string;
            roa: string;
            roff: string;
            rp9: string;
            rpss: string;
            rpst: string;
            rq: string;
            rs: string;
            rsd: string;
            rss: string;
            rtf: string;
            rtx: string;
            s: string;
            s3m: string;
            saf: string;
            sbml: string;
            sc: string;
            scd: string;
            scm: string;
            scq: string;
            scs: string;
            scurl: string;
            sda: string;
            sdc: string;
            sdd: string;
            sdkd: string;
            sdkm: string;
            sdp: string;
            sdw: string;
            see: string;
            seed: string;
            sema: string;
            semd: string;
            semf: string;
            ser: string;
            setpay: string;
            setreg: string;
            'sfd-hdstx': string;
            sfs: string;
            sfv: string;
            sgi: string;
            sgl: string;
            sgm: string;
            sgml: string;
            sh: string;
            shar: string;
            shf: string;
            sid: string;
            sig: string;
            sil: string;
            silo: string;
            sis: string;
            sisx: string;
            sit: string;
            sitx: string;
            skd: string;
            skm: string;
            skp: string;
            skt: string;
            sldm: string;
            sldx: string;
            slt: string;
            sm: string;
            smf: string;
            smi: string;
            smil: string;
            smv: string;
            smzip: string;
            snd: string;
            snf: string;
            so: string;
            spc: string;
            spf: string;
            spl: string;
            spot: string;
            spp: string;
            spq: string;
            spx: string;
            sql: string;
            src: string;
            srt: string;
            sru: string;
            srx: string;
            ssdl: string;
            sse: string;
            ssf: string;
            ssml: string;
            st: string;
            stc: string;
            std: string;
            stf: string;
            sti: string;
            stk: string;
            stl: string;
            str: string;
            stw: string;
            sub: string;
            sus: string;
            susp: string;
            sv4cpio: string;
            sv4crc: string;
            svc: string;
            svd: string;
            svg: string;
            svgz: string;
            swa: string;
            swf: string;
            swi: string;
            sxc: string;
            sxd: string;
            sxg: string;
            sxi: string;
            sxm: string;
            sxw: string;
            t: string;
            t3: string;
            taglet: string;
            tao: string;
            tar: string;
            tcap: string;
            tcl: string;
            teacher: string; /**
             * @private getRandChars
             * @param {string} identifyer
             * @returns {string}
             */
            tei: string;
            teicorpus: string;
            tex: string;
            texi: string;
            texinfo: string;
            text: string;
            tfi: string;
            tfm: string;
            tga: string;
            thmx: string;
            tif: string;
            tiff: string;
            tmo: string;
            torrent: string;
            tpl: string;
            tpt: string;
            tr: string;
            tra: string;
            trm: string;
            tsd: string;
            tsv: string;
            ttc: string;
            ttf: string;
            ttl: string;
            twd: string;
            twds: string;
            txd: string;
            txf: string;
            txt: string;
            u32: string;
            udeb: string;
            ufd: string;
            ufdl: string;
            ulx: string;
            umj: string;
            unityweb: string;
            uoml: string;
            uri: string;
            uris: string;
            urls: string;
            ustar: string;
            utz: string;
            uu: string;
            uva: string;
            uvd: string;
            uvf: string;
            uvg: string;
            uvh: string;
            uvi: string;
            uvm: string;
            uvp: string;
            uvs: string;
            uvt: string;
            uvu: string;
            uvv: string;
            uvva: string;
            uvvd: string;
            uvvf: string;
            uvvg: string;
            uvvh: string;
            uvvi: string;
            uvvm: string;
            uvvp: string;
            uvvs: string;
            uvvt: string;
            uvvu: string;
            uvvv: string;
            uvvx: string;
            uvvz: string;
            uvx: string;
            uvz: string;
            vcard: string;
            vcd: string;
            vcf: string;
            vcg: string;
            vcs: string;
            vcx: string;
            vis: string;
            viv: string;
            vob: string;
            vor: string;
            vox: string;
            vrml: string;
            vsd: string;
            vsf: string;
            vss: string;
            vst: string;
            vsw: string;
            vtu: string;
            vxml: string;
            w3d: string;
            wad: string;
            wav: string;
            wax: string;
            wbmp: string;
            wbs: string;
            wbxml: string;
            wcm: string;
            wdb: string;
            wdp: string;
            weba: string;
            webm: string;
            webm1: string;
            webp: string;
            wg: string;
            wgt: string;
            wks: string;
            wm: string;
            wma: string;
            wmd: string;
            wmf: string;
            wml: string;
            wmlc: string;
            wmls: string;
            /**
             * @protected @method read_files_from_storage - reads and loads files from browser Storage
             */
            wmlsc: string;
            wmv: string;
            wmx: string;
            wmz: string;
            woff: string;
            woff2: string;
            wpd: string;
            wpl: string;
            wps: string;
            wqd: string;
            wri: string;
            wrl: string;
            wsdl: string;
            wspolicy: string;
            wtb: string;
            wvx: string;
            x32: string;
            x3d: string;
            x3db: string;
            x3dbz: string;
            x3dv: string;
            x3dvz: string;
            x3dz: string;
            xaml: string;
            xap: string;
            xar: string;
            xbap: string;
            xbd: string;
            xbm: string;
            xdf: string;
            xdm: string;
            xdp: string;
            xdssc: string;
            xdw: string;
            xenc: string;
            xer: string;
            xfdf: string;
            xfdl: string;
            xht: string;
            xhtml: string;
            xhvml: string;
            xif: string;
            xla: string;
            xlam: string;
            xlc: string;
            xlf: string;
            xlm: string;
            xls: string;
            xlsb: string;
            xlsm: string;
            xlsx: string;
            xlt: string;
            xltm: string;
            xltx: string;
            xlw: string;
            xm: string;
            xml: string;
            xo: string;
            xop: string;
            xpi: string;
            xpl: string;
            xpm: string;
            xpr: string;
            xps: string;
            xpw: string;
            xpx: string;
            xsl: string;
            xslt: string;
            xsm: string;
            xspf: string;
            xul: string;
            xvm: string;
            xvml: string;
            xwd: string;
            xyz: string;
            xz: string;
            yang: string;
            yin: string;
            z1: string;
            z2: string;
            z3: string;
            z4: string;
            z5: string;
            z6: string;
            z7: string;
            z8: string;
            zaz: string;
            zip: string;
            zir: string;
            zirz: string;
            zmm: string;
        })[];
        targetRootElement: string;
        maxNumberOfFiles: number;
        minNumberOfFiles: number;
        minimumAllowedFileSize: number;
        maximumAllowedFileSize: number;
        ui_type: 'default' | 'resumeUploaderUI' | 'bare' | 'detached' | 'profilePicture';
        display_ui_tools: boolean;
        show_ui_tools_on_mobile_devices: boolean;
        disable_drag_n_drop: boolean;
        disable_select_files_from_device: boolean;
        allowed_tools: Array<'tools_dragger' | 'upload' | 'add_file' | 'added_files_count' | 'clear_files'>;
        position_container: "before" | "after" | "overwrite" | {
            "beforeEl": string;
        };
        file_preview_animation_types: Array<'slideInRight' | 'slideInTop' | 'slideInLeft' | 'slideInBottom' | 'zoomIn' | 'fadeIn'>;
        allowMultipleUpload: boolean;
        file_upload: {
            endpoint_url: string;
            files_field_name: string;
            form_field?: HTMLFormElement | string;
            additional_data?: object;
            axios_settings: {
                headers: {};
                configs: {};
            };
        };
        allowed_sources: Array<'record_video' | 'capture_image' | 'record_audio' | 'record_screen' | 'link_source' | 'google_drive_source' | 'dropbox_source' | 'box_source' | 'openai_dalle_source'>;
        upload_automatically?: boolean | undefined;
        show_upload_error_overlay?: boolean | undefined;
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
        default_files: Array<{
            file: string | File | Blob;
            isUploadable: boolean;
            headers: any;
        }>;
        count_default_files: boolean;
        instance_attach: Array<object>;
        single_upload: boolean;
        persist_files: boolean;
        persist_type: 'soft' | 'hard';
        alert_timeout_time: number;
    });
    /**
     * Custup library name - !!! Please do not change !!!
     * @private @param {string} libraryName - Custup library name
     */
    private libraryName;
    /**
     * Array that holds default loaded files
     * @public @property {File[]} defaultFiles
     */
    public defaultFiles: any[];
    /**
     * Array that holds all selected files
     * @public @property {File[]} selectedFiles
     */
    public selectedFiles: any[];
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
        /**
         * An array that holds successfully uploaded files
         * @protected @property {File[]} successfullyUploadedFiles
         */
        fileDisplayUI: string;
        fileUIOuterContainer: string;
        fileDetailsContainer: string;
        custup_fileName: string;
        custup_fileSize: string;
        fileBottomDetails: string;
        fileUIBottomToolsContainer: string;
        file_wrapper_el: string; /**
         * Custup UI styles
         * @protected @property {FormData} ui_styles
         */
        fileUI: string;
        remove_file_btn: string;
        file_upload_overlay_ui: string;
        file_upload_overlay_inner_container: string;
        upload_progress_container: string;
        file_upload_progress: string;
        file_upload_progress_inner: string;
        retry_upload_overlay_ui: string;
        retry_upload_button: string;
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
        /**
         * @protected handleCustomScroll
         */
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
    };
    /**
     * Custup Axios instance for file upload
     * @private @property {axios} __axios_instance
     */
    private __axios_instance;
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
    file_preview_animation_arr: any[];
    previewerAnimations: {
        slideInLeft: {
            left: string;
        }[];
        slideInBottom: {
            bottom: string;
        }[];
        slideInRight: {
            right: string;
        }[];
        slideInTop: {
            top: string;
        }[];
        zoomIn: {
            transform: string;
        }[];
        fadeIn: {
            opacity: number;
        }[];
    };
    toolDragger: undefined;
    currentToolElOffsetLeft: number;
    currentToolElOffsetBottom: number;
    lastToolOffsetBottom: number;
    lastToolOffsetLeft: number;
    fileDisplayUIElCurrentScrollHeight: number;
    scrollBarEl: undefined;
    /** Custup Options
     * @protected @param {{}} options
     *
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
        };
        upload_automatically: boolean;
        show_upload_error_overlay: boolean;
        default_files: never[];
        count_default_files: boolean;
        instance_attach: never[];
        single_upload: boolean;
        persist_files: boolean;
        persist_type: string;
        alert_timeout_time: number;
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
    map_override_styles_to_default_styles(o_style: any): void;
    map_override_icons_to_default_icons(): void;
    load_default_files(): void;
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
    public initializeUI(): false | undefined;
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
    set_file_preview_animations(): void;
    /**
     * @public @method handleRecordVideo
     * @param {'video' | 'image' | 'audio' | 'screen'} type
     */
    public handleMediaSource(type: 'video' | 'image' | 'audio' | 'screen'): void;
    /**
     * @public @method handleOpenaiDALLESource
     * @param {'url' | 'onedrive' | 'google_drive' | 'clipboard' | 'box' | 'dalle' | 'dropbox'} type - source type
     */
    public handleExternalSource(type: 'url' | 'onedrive' | 'google_drive' | 'clipboard' | 'box' | 'dalle' | 'dropbox'): void;
    /**
     * @protected makeFileDisplayUI
     */
    protected makeFileDisplayUI(): void;
    /**
     * @protected @method set_scroll_pointer_event
     * @param {HTMLElement} el
     */
    protected set_scroll_pointer_event(el: HTMLElement, targetEl?: undefined, targetScrollBarEl?: undefined): void;
    layerMoved: any;
    /**
     * @protected make_ui_tools
     */
    protected make_ui_tools(): void;
    /**
     * @protected handleAddNewFileButton
     */
    protected handleAddNewFileButton(): void;
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
    createScrollBar(targetEl?: undefined): HTMLDivElement;
    updateScrollbarHeight(targetEl?: undefined): void;
    /**
     * @protected handleCustomScroll
     */
    protected handleCustomScroll(e: any, targetEl?: undefined, targetScrollBarEl?: undefined): void;
    /**
     * @protected handleInnerElementContainerMouseDown
     */
    protected handleInnerElementContainerMouseDown(e: any): void;
    /**
     * @protected handleInnerElementContainerMouseUp
     */
    protected handleInnerElementContainerMouseUp(e: any): void;
    /**
     * @protected handleToolDraggerMouseMove
     */
    protected handleToolDraggerMouseMove(e: any): void;
    /**
     * @protected addFileToUI
     * @param {File} file
     * @param {boolean} isUploadable
     */
    protected addFileToUI(file: File, isUploadable?: boolean): void;
    file_display_width_setter(el: any): void;
    /**
     * @protected makeFileDisplayElement
     * @param {File} file - file data of the file to display
     * @param {HTMLDivElement} fileContainer
     * @param {ArrayBuffer} fileBase64 - optional to be provided only for image files
     */
    protected makeFileDisplayElement(file: File, fileContainer: HTMLDivElement, fileBase64: ArrayBuffer): void;
    /**
     * @protected makeFilePreviewer
     * @param {File} file - File object of the element to be previewed
     */
    protected makeFilePreviewer(file: File): void;
    /**
     * @protected getFileIcon
     * @param {string} file_type - the full file type of the file to return its icons
     * @returns {SVGElement}
     */
    protected getFileIcon(file_type: string): SVGElement;
    /**
     * @protected handleRemoveFile
     * @param {File} fileData
     * @param {Function} callback_fn
     */
    protected handleRemoveFile(fileData: File, callback_fn?: Function): void;
    /**
     * Removes unwanted characters from file name
     * @protected cleanFileName
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
     * @protected clipFileNameIfShouldClip
     * @param {string} file_name
     * @returns {string}
     */
    protected clipFileNameIfShouldClip(file_name: string): string;
    /**
     /// Postponed
     * @protected changeFileElementPosition
     */
    protected changeFileElementPosition(e: any): void;
    /**
     * @protected handleFileUIDragOver
     */
    protected handleFileUIDragOver(e: any): void;
    /**
     * @protected handleFileUIDragOver
     */
    protected handleFileUIDropped(e: any): void;
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
    /**
     * @private get_element_class_name
     * @param {string} style_key_name
     * @returns {string}
     */
    private get_element_class_name;
    /**
     * @protected select_file_from_device
     * @param {MouseEvent} e
     */
    protected select_file_from_device(e: MouseEvent): void;
    /**
     * @protected handle_drag_over
     * @param {Event} e
     */
    protected handle_drag_over(e: Event): void;
    /**
     * @protected handle_drag_leave
     * @param {EventListener} e
     */
    protected handle_drag_leave(e: EventListener): void;
    /**
     * @protected show_message
     * @param {string} msg
     * @param {"error" | "success" | "info"} type
     */
    protected show_message(msg: string, type: "error" | "success" | "info"): void;
    /**
     * @protected message_element_exit_call
     * This method is executed when a message element is exiting
     * @param {HTMLElement} message_container
     * @param {boolean} no_wait - specifies if the exit call should be ran inside a setTimeout or not
     */
    protected message_element_exit_call(message_container: HTMLElement, no_wait?: boolean): void;
    /**
     * @protected handle_file_drop
     * @param {Event} e
     */
    protected handle_file_drop(e: Event): void;
    /**
     * @property isfileAreadyAdded
     * @param {File} file
     */
    isfileAreadyAdded(file: File): boolean;
    /**
     * @protected parseFileSize
     * @param {number} size
     */
    protected parseFileSize: (size: number) => string;
    /**
     * @private @method isFileTypeInAcceptedTypes
     * @param {File} file - the file to check its type
     */
    private isFileTypeInAcceptedTypes;
    /**
     * @protected handle_selected_files
     * @param {Array<File>} files
     */
    protected handle_selected_files(files: Array<File>, before_add_callback_fn?: null, isUploadable?: boolean): void;
    /**
     * @protected createFileUploadOverlay
     * @param {string} file_id - id of the file to add file upload overlay to
     * @returns {HTMLDivElement}
     */
    protected createFileUploadOverlay(file_id: string): HTMLDivElement;
    /**
     * @protected createRetryUploadOverlay
     * @param {File} file
     * @param {string} file_id - id of the file element to append the retry upload overlay to
     */
    protected createRetryUploadOverlay(file: File, file_id: string): void;
    isUploadConditionsSatisfied(): boolean;
    /**
     * @protected handleUploadFile
     * @param {File} file - the file to be uploaded
     */
    protected handleUploadFile(file?: File): void;
    handleUploadAllFiles(): Promise<void>;
    /**
     * @protected fileUploadHandler
     * @param {File} file - the file to be uploaded
     */
    protected fileUploadHandler(file?: File): void;
    /**
     * @protected handleRetryFileUpload
     * @param {File} file - Blob of the file to retry
     * @param {HTMLDivElement} retry_upload_overlay_ui - html element of the retry upload overlay
     */
    protected handleRetryFileUpload(file: File, retry_upload_overlay_ui: HTMLDivElement): void;
    /**
     * @protected configure_axios
     */
    protected configure_axios(): void;
    /**
     * @private handleUploadFileToEndpoint
     * @param {File} file - file to upload to the server
     * @param {HTMLDivElement} upload_element - html element containing elements to display upload data and status
     */
    private handleUploadFileToEndpoint;
    /**
     * @private removeFileUploadOverlay
     * @param {HTMLDivElement} upload_element - html element of the overlay element
     * @param {HTMLDivElement} fileContainer - html element of the of the file container
     * @param {boolean} isSuccessful - boolean to specify if the request was successful or not
     */
    private removeFileUploadOverlay;
    /**
     * @protected handleUploadProgressEvent
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
     *  'upload.retry'
     * } event - event name
     * @param {*} callbackFn - the callback function
     */
    on(event: 'file.beforeAdded' | 'library.init' | 'file.afterAdded' | 'file.beforePassedChecks' | 'file.removed' | 'file.defaultFileRemoved' | 'file.all_removed' | 'video.recordingStarted' | 'video.recording' | 'video.recordStop' | 'video.recordSaved' | 'video.recordCancel' | 'image.captured' | 'audio.recordingStarted' | 'audio.recording' | 'audio.recordStop' | 'audio.recordSaved' | 'audio.recordCancel' | 'screen.recordingStarted' | 'screen.recording' | 'screen.recordStop' | 'screen.recordSaved' | 'screen.recordCancel' | 'upload.beforeStart' | 'upload.progress' | 'upload.success' | 'upload.error' | 'upload.retry', callbackFn: any): void;
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
     */
    add_file(file: any, skip_file_check?: boolean): void;
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
}
import { external_sources_ui_styles } from "../utils/_styles.js";
import { media_capture_ui_styles } from "../utils/_styles.js";
import { ui_styles } from "../utils/_styles.js";
import icons from '../utils/icons.js';
//# sourceMappingURL=custupCore.d.ts.map