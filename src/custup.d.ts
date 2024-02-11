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
    * }}  options
    *
    */
    constructor(options: {
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
        external_source_style_override?: any;
        media_capture_source_style_override?: any;
        default_styles_override?: any;
        persist_styles_override_across_instances?: boolean | undefined;
        default_icons_override?: any;
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
        position_container?: "before" | "after" | "overwrite" | {
            beforeEl: string;
        } | undefined;
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
     * @private @method uiSelect
     */
    private uiSelect;
    /**
     * @private @method resumeUploaderUI
     */
    private resumeUploaderUI;
    /**
     * @private @method bareUploaderUI
     */
    private bareUploaderUI;
    /**
     * @private @method detachedUploaderUI
     */
    private detachedUploaderUI;
    /**
     * @private @method profilePictureUI
     */
    private profilePictureUI;
    /**
     * @private @method elegantUI
     */
    private elegantUI;
}
import CustUpCore from "../core/custupCore.js";
//# sourceMappingURL=custup.d.ts.map